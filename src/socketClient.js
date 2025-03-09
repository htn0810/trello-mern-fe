import { io } from "socket.io-client";
import { API_ROOT } from "@/utils/constants";
// init socket io instance
export const socketIOInstance = io(API_ROOT);
