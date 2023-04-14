import { useRef, useState, useEffect } from "react";
import "./task.css";

import { ITask } from "../app/app";

interface TaskProps extends ITask {
  todo: ITask;
  onDelete: (e: React.MouseEvent) => void;
  onClick: (e: React.MouseEvent) => void;
}

const Task: React.FC<TaskProps> = ({
  todo,
  description,
  shownDate,
  onDelete,
  onClick,
}: TaskProps) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { completed } = todo;
  let classNames = "description";
  if (completed) classNames += " completed";

  const [isEditing, setEditing] = useState<boolean>(false);
  const [savedDescription, setSavedDescription] = useState<string>("");
  const [isChecked, setIsChecked] = useState<boolean>(completed);

  const handleEditButtonClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.stopPropagation();
    setEditing(true);
  };

  const handleInputBlur = (): void => {
    setEditing(false);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [isEditing]);

  const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>): void => {
    setSavedDescription(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === "Enter") setEditing(false);
    if (e.key === "Escape") {
      e.currentTarget.value = savedDescription;
      setEditing(false);
    }
  };

  const handleClick = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>
  ): void => {
    if (!isEditing) onClick(e);
  };

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setIsChecked(e.target.checked);
  };

  return (
    <>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          onClick={handleClick}
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <textarea
          defaultValue={description}
          className={classNames}
          onBlur={handleInputBlur}
          ref={inputRef}
          disabled={!isEditing}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
        />
        <span className="created">{shownDate}</span>
      </div>
      <button
        className="icon icon-edit"
        onClick={handleEditButtonClick}
      ></button>
      <button className="icon icon-destroy" onClick={onDelete}></button>
    </>
  );
};

export default Task;
