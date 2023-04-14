import Task from "../task";
import { Component, MouseEvent } from "react";
import "./task-list.css";
import { ITask } from "../app/app";

interface TaskListProps {
  todos: ITask[];
  onDelete: (e: MouseEvent, id: number) => void;
  onClick: (e: MouseEvent, id: number) => void;
  filter: string;
}

export default class TaskList extends Component<TaskListProps> {
  render() {
    const { todos, onDelete, onClick, filter } = this.props;
    const elements = todos
      .filter((todo: ITask) => {
        const { completed } = todo;
        if (filter === "all") return true;
        else if (filter === "completed") return completed;
        else if (filter === "active") return !completed;
        else throw new Error();
      })
      .map((todo: ITask) => {
        const { id, ...todoProps } = todo;
        return (
          <li key={id}>
            <Task
              id={id}
              {...todoProps}
              onDelete={(e: MouseEvent) => onDelete(e, id)}
              onClick={(e: MouseEvent) => onClick(e, id)}
              todo={todo}
            />
          </li>
        );
      });
    return <ul className="todo-list">{elements}</ul>;
  }
}
