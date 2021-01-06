import { IState, ITodo } from "../typings";
import {
  REMOVE_TODO,
  SET_DOING,
  SET_STATUS,
  SET_TODO,
  SET_TODO_LIST,
} from "./actionTypes";

export default {
  [SET_TODO](state: IState, todo: ITodo) {
    state.todoList.unshift(todo);
  },
  [SET_TODO_LIST](state: IState, todoList: Array<ITodo>) {
    state.todoList = todoList;
  },
  [REMOVE_TODO](state: IState, id: string) {
    state.todoList = state.todoList.filter((item) => {
      return item.id !== id;
    });
  },
  [SET_STATUS](state: IState, id: string) {
    state.todoList = state.todoList.map((item) => {
      if (item.id === id) {
        switch (item.status) {
          case "FINISHED":
            item.status = "WILLDO";
            break;
          case "WILLDO":
            item.status = "FINISHED";
            break;
          case "DOING":
            item.status = "FINISHED";
            break;
          default:
            break;
        }
      }
      return item;
    });
  },
  [SET_DOING](state: IState, id: string) {
    state.todoList = state.todoList.map((item) => {
      if (item.id !== id) {
        if (item.status === "DOING") {
          item.status = "WILLDO";
        }
      } else {
        item.status = item.status === "WILLDO" ? "DOING" : "WILLDO";
      }

      return item;
    });
  },
};
