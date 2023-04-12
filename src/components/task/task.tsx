import { Component } from "react";
import "./task.css";

import { ITask } from "../app/app";

interface TaskProps extends ITask {
  todo: ITask;
  onDeleted: () => void;
  onClicked: () => void;
}

export default class Task extends Component<TaskProps> {
  render() {
    const { completed } = this.props.todo;
    let classNames = "description";
    if (completed) classNames += " completed";
    return (
      <div className="view">
        <input className="toggle" type="checkbox" />
        <label>
          <span className={classNames} onClick={this.props.onClicked}>
            {this.props.description}
          </span>
          <span className="created">{this.props.shownDate}</span>
        </label>
        <button className="icon icon-edit"></button>
        <button
          className="icon icon-destroy"
          onClick={this.props.onDeleted}
        ></button>
      </div>
    );
  }
}
