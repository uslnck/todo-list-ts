import TaskList from "../task-list";
import NewTaskForm from "../new-task-form";
import Footer from "../footer";

import { Component } from "react";
import "./app.css";
import fnsDate from "../../utils/helpers/fnsDate";

export interface ITask {
  description: string;
  created: Date;
  id: number;
  completed: boolean;
  shownDate: string;
}

interface IState {
  taskData: ITask[];
  filter: string;
}

export default class App extends Component<{}, IState> {
  state = {
    taskData: [
      {
        description: "First task",
        created: new Date(),
        id: 1,
        completed: false,
        shownDate: fnsDate(),
      },
      {
        description: "Second task",
        created: new Date(),
        id: 2,
        completed: false,
        shownDate: fnsDate(),
      },
      {
        description: "Third task",
        created: new Date(),
        id: 3,
        completed: false,
        shownDate: fnsDate(),
      },
    ],
    filter: "all",
  };

  maxId = 10;

  setFilter = (pressedFilter: string): void => {
    switch (pressedFilter) {
      case "all":
        this.setState({ filter: "all" });
        break;
      case "active":
        this.setState({ filter: "active" });
        break;
      case "completed":
        this.setState({ filter: "completed" });
        break;
      default:
        break;
    }
  };

  onTaskClick = (id: number): void => {
    this.setState(({ taskData }) => {
      const idx = taskData.findIndex((el) => el.id === id);
      const updatedElement = Object.assign(taskData[idx], {
        completed: !taskData[idx].completed,
      });
      const newTaskData = [
        ...taskData.slice(0, idx),
        updatedElement,
        ...taskData.slice(idx + 1),
      ];
      return { taskData: newTaskData };
    });
  };

  deleteTask = (id: number): void => {
    this.setState(({ taskData }) => {
      const idx = taskData.findIndex((el) => el.id === id);
      const newTaskData = [
        ...taskData.slice(0, idx),
        ...taskData.slice(idx + 1),
      ];
      return { taskData: newTaskData };
    });
  };

  deleteCompleted = (): void => {
    this.setState(({ taskData }) => {
      const newTaskData = [...taskData].filter(({ completed }) => !completed);
      return { taskData: newTaskData };
    });
  };

  calculateRemainingCount = (): number => {
    let counter = 0;
    this.state.taskData.forEach(({ completed }) => {
      if (!completed) counter++;
    });
    return counter;
  };

  addTask = (text: string): void => {
    const newItem: ITask = {
      description: text,
      created: new Date(),
      id: this.maxId++,
      completed: false,
      shownDate: fnsDate(),
    };

    this.setState(({ taskData }) => {
      const newTaskData = [...taskData, newItem];
      return { taskData: newTaskData };
    });

    this.refreshDates();
  };

  refreshDates = (): void => {
    this.setState(({ taskData }) => {
      const newTaskData = taskData.map((todo) => ({
        ...todo,
        shownDate: fnsDate(todo.created),
      }));

      return { taskData: newTaskData };
    });
  };

  render() {
    const count = this.calculateRemainingCount();

    return (
      <div>
        <NewTaskForm onTaskAdded={this.addTask} />
        <TaskList
          todos={this.state.taskData}
          onDeleted={this.deleteTask}
          onClicked={this.onTaskClick}
          filter={this.state.filter}
        />
        <Footer
          setFilter={this.setFilter}
          deleteCompleted={this.deleteCompleted}
          remainingCount={count}
          filter={this.state.filter}
        />
      </div>
    );
  }
}
