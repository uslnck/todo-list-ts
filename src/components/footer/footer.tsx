import { Component } from "react";
import TasksFilter from "../tasks-filter";
import "./footer.css";

interface FooterProps {
  setFilter: (filter: string) => void;
  deleteCompleted: () => void;
  filter: string;
  remainingCount: number;
}

export default class Footer extends Component<FooterProps> {
  render() {
    const { setFilter, deleteCompleted, filter, remainingCount } = this.props;
    return (
      <footer className="footer">
        <span className="todo-count">{`${remainingCount} items left`}</span>
        <ul className="filters">
          <TasksFilter setFilter={setFilter} filter={filter} />
        </ul>
        <button onClick={deleteCompleted} className="clear-completed">
          Clear completed
        </button>
      </footer>
    );
  }
}
