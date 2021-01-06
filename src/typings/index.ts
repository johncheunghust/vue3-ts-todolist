interface ITodo{
    id:string;
    content:string;
    status:'WILLDO'|'DOING'|'FINISHED';
}

interface IState{
    todoList:Array<ITodo>;
}

export {
    ITodo,
    IState
}