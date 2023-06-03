import { Component, ChangeEvent } from "react";
import "./new-task-form.css";

interface NewTaskFormProps {
  onTaskAdded: (
    text: string,
    mm: number,
    ss: number,
    hh: number,
    dd: number
  ) => void;
}

interface NewTaskFormState {
  label: string;
  seconds: number;
  hours: number;
  minutes: number;
  days: number;
}

export default class NewTaskForm extends Component<
  NewTaskFormProps,
  NewTaskFormState
> {
  state: NewTaskFormState = {
    label: "",
    seconds: 0,
    hours: 0,
    minutes: 0,
    days: 0,
  };

  onLabelChange = (e: ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      label: e.target.value,
    });
  };

  onMinutesChange = (e: ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      minutes: Number(e.target.value),
    });
  };

  onHoursChange = (e: ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      hours: Number(e.target.value),
    });
  };

  onDaysChange = (e: ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      days: Number(e.target.value),
    });
  };

  onSecondsChange = (e: ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      seconds: Number(e.target.value),
    });
  };

  handleGlobalKeyDown = (event: any) => {
    if (event.key === "Enter") {
      this.props.onTaskAdded(
        this.state.label,
        this.state.minutes,
        this.state.seconds,
        this.state.hours,
        this.state.days
      );
      this.setState({ label: "" });
      this.setState({ seconds: 0 });
      this.setState({ minutes: 0 });
      this.setState({ hours: 0 });
      this.setState({ days: 0 });
    }
  };

  componentDidMount() {
    document.addEventListener("keydown", this.handleGlobalKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleGlobalKeyDown);
  }

  render() {
    return (
      <>
        <form>
          <header className="header">
            <input
              className="new-todo"
              placeholder="What needs to be done?"
              autoFocus
              onChange={this.onLabelChange}
              value={this.state.label}
              onKeyDown={this.handleGlobalKeyDown}
            />
          </header>
        </form>
        <div className="timer-values">
          <span className="timer-name">DD:</span>
          <input
            className="timer-values__timer"
            type="number"
            value={this.state.days}
            onChange={this.onDaysChange}
          />
          <span className="timer-name">HH:</span>
          <input
            className="timer-values__timer"
            type="number"
            value={this.state.hours}
            onChange={this.onHoursChange}
          />
          <span className="timer-name">MM:</span>
          <input
            className="timer-values__timer"
            type="number"
            value={this.state.minutes}
            onChange={this.onMinutesChange}
          />
          <span className="timer-name">SS:</span>
          <input
            className="timer-values__timer"
            type="number"
            value={this.state.seconds}
            onChange={this.onSecondsChange}
          />
        </div>
      </>
    );
  }
}
