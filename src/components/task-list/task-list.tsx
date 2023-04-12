import Task from "../task";
import { Component } from "react";
import "./task-list.css";
import { ITask } from "../app/app";

interface TaskListProps {
  todos: ITask[];
  onDeleted: (id: number) => void;
  onClicked: (id: number) => void;
  filter: string;
}

export default class TaskList extends Component<TaskListProps> {
  render() {
    const { todos, onDeleted, onClicked, filter } = this.props;
    const elements = todos
      .filter((todo) => {
        const { completed } = todo;
        if (filter === "all") return true;
        else if (filter === "completed") return completed;
        else if (filter === "active") return !completed;
        else throw new Error();
      })
      .map((todo) => {
        const { id, ...todoProps } = todo;
        return (
          <li key={id}>
            <Task
              id={id}
              {...todoProps}
              onDeleted={() => onDeleted(id)}
              onClicked={() => onClicked(id)}
              todo={todo}
            />
          </li>
        );
      });
    return <ul className="todo-list">{elements}</ul>;
  }
}
