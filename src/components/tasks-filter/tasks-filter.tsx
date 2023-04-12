import { Component } from "react";
import "./tasks-filter.css";

interface TasksFilterProps {
  filter: string;
  setFilter: (filter: string) => void;
}

export default class TasksFilter extends Component<TasksFilterProps> {
  chooseSelection = (currentFilter: string) => {
    if (this.props.filter === currentFilter) return "selected";
    else return "";
  };

  render() {
    const { setFilter } = this.props;
    return (
      <div>
        <li>
          <button
            onClick={() => setFilter("all")}
            className={this.chooseSelection("all")}
          >
            All
          </button>
        </li>
        <li>
          <button
            onClick={() => setFilter("active")}
            className={this.chooseSelection("active")}
          >
            Active
          </button>
        </li>
        <li>
          <button
            onClick={() => setFilter("completed")}
            className={this.chooseSelection("completed")}
          >
            Completed
          </button>
        </li>
      </div>
    );
  }
}
