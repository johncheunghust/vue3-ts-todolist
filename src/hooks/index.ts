import { watchEffect } from "vue";
import { useStore } from "vuex";
import {
  REMOVE_TODO,
  SET_DOING,
  SET_STATUS,
  SET_TODO,
  SET_TODO_LIST,
} from "../store/actionTypes";
import { IState, ITodo } from "../typings";

//生成guid
function guid(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function useTodo() {
  const store = useStore<IState>();

  const { getLocalList, setLocalList } = useLocalStorage();

  const localStorageTodoList = getLocalList();

  function setTodo(value: string): void {
    const todo: ITodo = {
      id: guid(),
      content: value,
      status: "WILLDO",
    };
    store.dispatch(SET_TODO, todo);
    setLocalList(store.state.todoList);
  }

  function setTodoList() {
    store.dispatch(SET_TODO_LIST, localStorageTodoList);
  }

  function removeTodo(id: string) {
    store.dispatch(REMOVE_TODO, id);
    setLocalList(store.state.todoList);
  }

  function setStatus(id: string) {
    store.dispatch(SET_STATUS, id);
    setLocalList(store.state.todoList);
  }

  function setDoing(id: string) {
    store.dispatch(SET_DOING, id);
  }

  watchEffect(() => {
    setLocalList(store.state.todoList);
  });

  return {
    setTodo,
    setTodoList,
    removeTodo,
    setStatus,
    setDoing,
  };
}

function useLocalStorage() {
  function getLocalList(): Array<ITodo> {
    return JSON.parse(localStorage.getItem("todolist") || "[]");
  }

  function setLocalList(todolist: Array<ITodo>): void {
    localStorage.setItem("todolist", JSON.stringify(todolist));
  }

  return {
    getLocalList,
    setLocalList,
  };
}

export { useTodo };
