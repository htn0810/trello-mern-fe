import Column from "@/pages/Boards/BoardContent/ListColumns/Column/Column";
import Card from "@/pages/Boards/BoardContent/ListColumns/Column/ListCards/Card/Card";
import ListColumns from "@/pages/Boards/BoardContent/ListColumns/ListColumns";
import { mapOrder } from "@/utils/sorts";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { Box } from "@mui/material";
import { cloneDeep } from "lodash";
import { useEffect, useState } from "react";

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: "ACTIVE_DRAG_ITEM_TYPE_COLUMN",
  CARD: "ACTIVE_DRAG_ITEM_TYPE_CARD",
};

const BoardContent = ({ board }) => {
  const mouseSensor = useSensor(MouseSensor, {
    // Require the mouse to move by 10 pixels before activating
    activationConstraint: {
      distance: 10,
    },
  });
  const touchSensor = useSensor(TouchSensor, {
    // Press delay of 250ms, with tolerance of 5px of movement
    activationConstraint: {
      delay: 250,
      tolerance: 500,
    },
  });
  const sensors = useSensors(mouseSensor, touchSensor);
  const [orderedColumns, setOrderedColumns] = useState([]);
  const [activeDragItemId, setActiveDragItemId] = useState(null);
  const [activeDragItemType, setActiveDragItemType] = useState(null);
  const [activeDragItemData, setActiveDragItemData] = useState(null);
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] =
    useState(null);

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, "_id"));
  }, [board]);

  const findColumnByCardId = (cardId) => {
    return orderedColumns.find((column) =>
      column?.cards.map((card) => card._id)?.includes(cardId)
    );
  };

  const handleDragStart = (event) => {
    setActiveDragItemId(event?.active?.id);
    if (!!event?.active?.data?.current?.columnId) {
      setActiveDragItemType(ACTIVE_DRAG_ITEM_TYPE.CARD);
      setOldColumnWhenDraggingCard(findColumnByCardId(event?.active?.id));
    } else {
      setActiveDragItemType(ACTIVE_DRAG_ITEM_TYPE.COLUMN);
    }
    setActiveDragItemData(event?.active?.data?.current);
  };

  // Trigger khi kéo 1 phần tử
  const handleDragOver = (event) => {
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return;
    const { active, over } = event;
    if (!over || !active) return;

    const {
      id: activeDraggingCardId,
      data: { current: activeDraggingCardData },
    } = active;
    const { id: overCardId } = over;

    // tìm các column theo cardId
    const activeColumn = findColumnByCardId(activeDraggingCardId);
    const overColumn = findColumnByCardId(overCardId);

    if (!activeColumn || !overColumn) return;

    if (activeColumn._id !== overColumn._id) {
      setOrderedColumns((prevColumns) => {
        const overCardIndex = overColumn?.cards?.findIndex(
          (card) => card._id === overCardId
        );

        let newCardIndex;
        const isBelowOverItem =
          active.rect.current.translated &&
          active.rect.current.translated.top > over.rect.top + over.rect.height;
        const modifier = isBelowOverItem ? 1 : 0;
        newCardIndex =
          overCardIndex >= 0
            ? overCardIndex + modifier
            : overColumn?.cards?.length + 1;

        const nextColumns = cloneDeep(prevColumns);

        const nextActiveColumn = nextColumns.find(
          (column) => column._id === activeColumn._id
        );
        const nextOverColumn = nextColumns.find(
          (column) => column._id === overColumn._id
        );

        if (nextActiveColumn) {
          nextActiveColumn.cards = nextActiveColumn.cards.filter(
            (card) => card._id !== activeDraggingCardId
          );

          nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(
            (card) => card._id
          );
        }

        if (nextOverColumn) {
          nextOverColumn.cards = nextOverColumn.cards.filter(
            (card) => card._id !== activeDraggingCardId
          );

          nextOverColumn.cards = nextOverColumn.cards.toSpliced(
            newCardIndex,
            0,
            activeDraggingCardData
          );

          nextOverColumn.cardOrderIds = nextOverColumn.cards.map(
            (card) => card._id
          );
        }
        return nextColumns;
      });
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      console.log("Hành động kéo thả Card");
      const {
        id: activeDraggingCardId,
        data: { current: activeDraggingCardData },
      } = active;
      const { id: overCardId } = over;

      // tìm các column theo cardId
      const activeColumn = findColumnByCardId(activeDraggingCardId);
      const overColumn = findColumnByCardId(overCardId);

      if (!activeColumn || !overColumn) return;

      console.log(
        "🚀 ~ handleDragEnd ~ oldColumnWhenDraggingCard:",
        oldColumnWhenDraggingCard
      );
      if (oldColumnWhenDraggingCard?._id !== overColumn._id) {
        console.log("kéo thả card giữa 2 column khác nhau");
      } else {
        // get old index from oldColumnWhenDraggingCard
        const oldCardIdx = oldColumnWhenDraggingCard?.cards?.findIndex(
          (card) => card._id === activeDragItemId
        );
        // get new index from overColumn
        const newCardIdx = overColumn?.cards?.findIndex(
          (card) => card._id === overCardId
        );
        const dndOrderedCards = arrayMove(
          oldColumnWhenDraggingCard?.cards,
          oldCardIdx,
          newCardIdx
        );

        setOrderedColumns((prevColumns) => {
          const nextColumns = cloneDeep(prevColumns);

          const targetColumn = nextColumns.find(
            (col) => col._id === overColumn._id
          );
          targetColumn.cards = dndOrderedCards;
          targetColumn.cardOrderIds = dndOrderedCards.map((card) => card._id);

          return nextColumns;
        });
      }
    }

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      console.log("Hành động kéo thả Column");
      if (active.id !== over.id) {
        setOrderedColumns((columns) => {
          // get old index from active
          const oldIdx = columns.findIndex((col) => col._id === active.id);
          // get new index from over
          const newIdx = columns.findIndex((col) => col._id === over.id);
          // get all columns ids
          // const dndOrderedColumnsIds = columns.map((col) => col._id);
          // move column to new index
          return arrayMove(columns, oldIdx, newIdx);
        });
      }
    }

    setActiveDragItemId(null);
    setActiveDragItemType(null);
    setActiveDragItemData(null);
    setOldColumnWhenDraggingCard(null);
  };

  const customDropAnimation = {
    sideEffect: defaultDropAnimationSideEffects({
      styles: { active: { opacity: "0.5" } },
    }),
  };
  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      collisionDetection={closestCorners}
      sensors={sensors}
    >
      <Box
        sx={{
          width: "100%",
          height: (theme) => theme.trello.boardContentHeight,
          backgroundColor: "primary.main",
          p: "10px 0",
          m: "5px 0",
        }}
      >
        <ListColumns columns={orderedColumns} />
        <DragOverlay dropAnimation={customDropAnimation}>
          {!activeDragItemType && null}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN ? (
            <Column column={activeDragItemData} />
          ) : (
            <Card card={activeDragItemData} />
          )}
        </DragOverlay>
      </Box>
    </DndContext>
  );
};

export default BoardContent;
