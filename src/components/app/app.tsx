import TaskList from "../task-list";
import NewTaskForm from "../new-task-form";
import Footer from "../footer";
import { Component, MouseEvent } from "react";
import "./app.css";
import fnsDate from "../../utils/helpers/fnsDate";

export interface ITask {
  description: string;
  created: Date;
  id: number;
  completed: boolean;
  shownDate: string;
  countdownValues: any;
}

interface IState {
  taskData: ITask[];
  filter: string;
  // currentTime: Date;
}

export default class App extends Component<{}, IState> {
  state: IState = {
    taskData: [
      {
        description: "First task",
        created: new Date(),
        id: 1,
        completed: false,
        shownDate: fnsDate(),
        countdownValues: [59, 59, 23, 1],
      },
      {
        description: "Second task",
        created: new Date(),
        id: 2,
        completed: false,
        shownDate: fnsDate(),
        countdownValues: [59, 59, 23, 0],
      },
      {
        description: "Third task",
        created: new Date(),
        id: 3,
        completed: false,
        shownDate: fnsDate(),
        countdownValues: [59, 59, 23, 2],
      },
    ],
    filter: "all",
    // currentTime: new Date(),
  };

  startId = 10;

  saveTodos() {
    this.startId += Math.floor(Math.random() * 1000000);
    localStorage.setItem("todos", JSON.stringify(this.state.taskData));
  }
  //из локалстоража он берёт дейт для фнса, который при сохранении берёт текущую дату
  componentDidUpdate() {
    this.saveTodos();
    // setInterval(() => {
    //   this.refreshDates();
    // }, 100);
  }

  componentDidMount() {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) this.setState({ taskData: JSON.parse(storedTodos) });
  }

  // componentWillUnmount() {
  //   clearInterval(this.time);
  // }

  // updateCurrentTime = () => {
  //   const currentTime = new Date();
  //   localStorage.setItem('currentTime', JSON.stringify(currentTime));
  //   this.setState({ currentTime });
  // };

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

  handleTaskClick = (e: MouseEvent, id: number): void => {
    e.stopPropagation();
    this.setState(({ taskData }) => {
      const idx = taskData.findIndex((el) => el.id === id);
      const updatedElement: ITask = Object.assign(taskData[idx], {
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

  handleTaskDelete = (e: MouseEvent, id: number): void => {
    e.stopPropagation();
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

  addTask = (
    text: string,
    mm: number,
    ss: number,
    hh: number,
    dd: number
  ): void => {
    const newItem: ITask = {
      description: text,
      created: new Date(),
      id: this.startId,
      completed: false,
      shownDate: fnsDate(),
      countdownValues: [mm, ss, hh, dd],
    };

    this.setState(({ taskData }) => {
      const newTaskData = [...taskData, newItem];
      return { taskData: newTaskData };
    });
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
          // refreshDates={this.refreshDates}
          todos={this.state.taskData}
          onDelete={this.handleTaskDelete}
          onClick={this.handleTaskClick}
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
