import { MouseSensor, TouchSensor } from "@/customLibraries/DndKitSensors";
import Column from "@/pages/Boards/BoardContent/ListColumns/Column/Column";
import Card from "@/pages/Boards/BoardContent/ListColumns/Column/ListCards/Card/Card";
import ListColumns from "@/pages/Boards/BoardContent/ListColumns/ListColumns";
import {
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners,
  DndContext,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { Box } from "@mui/material";
import { cloneDeep } from "lodash";
import { useEffect, useState } from "react";

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: "ACTIVE_DRAG_ITEM_TYPE_COLUMN",
  CARD: "ACTIVE_DRAG_ITEM_TYPE_CARD",
};

const BoardContent = ({
  board,
  createNewColumn,
  createNewCard,
  moveColumn,
  moveCardInSameColumn,
  moveCardToDifferentColumns,
  deleteColumn,
}) => {
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
    setOrderedColumns(board?.columns);
  }, [board]);

  const findColumnByCardId = (cardId) => {
    return orderedColumns.find((column) =>
      column?.cards.map((card) => card._id)?.includes(cardId)
    );
  };

  const moveCardBetweenDifferentColumns = (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeDraggingCardId,
    activeDraggingCardData,
    triggerFrom
  ) => {
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
        (column) => column._id === overColumn?._id
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

        const rebuild_activeDraggingCardData = {
          ...activeDraggingCardData,
          columnId: nextOverColumn._id,
        };

        nextOverColumn.cards = nextOverColumn.cards.toSpliced(
          newCardIndex,
          0,
          rebuild_activeDraggingCardData
        );

        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(
          (card) => card._id
        );
      }
      if (triggerFrom === "handleDragEnd") {
        moveCardToDifferentColumns(
          activeDraggingCardId,
          oldColumnWhenDraggingCard._id,
          nextOverColumn._id,
          nextColumns
        );
      }
      return nextColumns;
    });
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

    // Trường hợp kéo card vào column rỗng
    const emptyColumn = orderedColumns.find((col) => col._id === overCardId);
    if (!!emptyColumn?.cards) {
      setOrderedColumns((prevColumns) => {
        const nextColumns = cloneDeep(prevColumns);

        const nextActiveColumnIdx = nextColumns.findIndex(
          (col) => col._id === activeColumn._id
        );

        const nextOverColumnIdx = nextColumns.findIndex(
          (col) => col._id === overCardId
        );

        const nextActiveColumn = {
          ...activeColumn,
          cards: activeColumn?.cards?.filter(
            (card) => card._id !== activeDraggingCardId
          ),
          cardOrderIds: activeColumn?.cardOrderIds?.filter(
            (id) => id !== activeDraggingCardId
          ),
        };

        const nextOverColumn = {
          ...emptyColumn,
          cards: [activeDragItemData],
          cardOrderIds: [activeDragItemId],
        };
        nextColumns[nextActiveColumnIdx] = nextActiveColumn;
        nextColumns[nextOverColumnIdx] = nextOverColumn;
        return nextColumns;
      });
    }

    // if (!activeColumn || !overColumn) return;

    if (activeColumn._id !== overColumn?._id) {
      moveCardBetweenDifferentColumns(
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggingCardId,
        activeDraggingCardData,
        "handleDragOver"
      );
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      const {
        id: activeDraggingCardId,
        data: { current: activeDraggingCardData },
      } = active;
      const { id: overCardId } = over;

      // tìm các column theo cardId
      const activeColumn = findColumnByCardId(activeDraggingCardId);
      const overColumn = findColumnByCardId(overCardId);

      if (!activeColumn || !overColumn) return;

      if (oldColumnWhenDraggingCard?._id !== overColumn._id) {
        moveCardBetweenDifferentColumns(
          overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeDraggingCardId,
          activeDraggingCardData,
          "handleDragEnd"
        );
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

        const dndOrderCardIds = dndOrderedCards.map((card) => card._id);

        setOrderedColumns((prevColumns) => {
          const nextColumns = cloneDeep(prevColumns);

          const targetColumn = nextColumns.find(
            (col) => col._id === overColumn._id
          );
          targetColumn.cards = dndOrderedCards;
          targetColumn.cardOrderIds = dndOrderCardIds;

          return nextColumns;
        });
        moveCardInSameColumn(
          dndOrderedCards,
          dndOrderCardIds,
          oldColumnWhenDraggingCard._id
        );
      }
    }

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      if (active.id !== over.id) {
        // get old index from active
        const oldIdx = orderedColumns.findIndex((col) => col._id === active.id);
        // get new index from over
        const newIdx = orderedColumns.findIndex((col) => col._id === over.id);
        // move column to new index
        const dndOrderedColumns = arrayMove(orderedColumns, oldIdx, newIdx);

        setOrderedColumns(dndOrderedColumns);
        moveColumn(dndOrderedColumns);
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
        <ListColumns
          columns={orderedColumns}
          createNewColumn={createNewColumn}
          createNewCard={createNewCard}
          deleteColumn={deleteColumn}
        />
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
