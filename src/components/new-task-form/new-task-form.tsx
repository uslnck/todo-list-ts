import { Component, FormEvent } from "react";
import "./new-task-form.css";

interface NewTaskFormProps {
  onTaskAdded: (text: string) => void;
}

interface NewTaskFormState {
  label: string;
}

export default class NewTaskForm extends Component<
  NewTaskFormProps,
  NewTaskFormState
> {
  state: NewTaskFormState = {
    label: "",
  };

  onLabelChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      label: e.target.value,
    });
  };

  onSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    this.props.onTaskAdded(this.state.label);
    this.setState({ label: "" });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <header className="header">
          <h1>todos</h1>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
            onChange={this.onLabelChange}
            value={this.state.label}
          />
        </header>
      </form>
    );
  }
}
