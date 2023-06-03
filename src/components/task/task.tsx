//@ts-nocheck
import { useRef, useState, useEffect } from "react";
import "./task.css";
import { ITask } from "../app/app";
import Countdown from "react-countdown";

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
  id,
  countdownValues,
}: TaskProps) => {
  const [mm, ss, hh, dd] = countdownValues;

  const { completed } = todo;
  let classNames = "description";
  if (completed) classNames += " completed";

  const handleEditButtonClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.stopPropagation();
    setEditing(true);
  };

  const handleInputBlur = (): void => {
    setEditing(false);
  };

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

  const formatTimeValue = (value: any) => {
    return value.toString().padStart(2, "0");
  };

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    // setIsChecked(e.target.checked);
    if (localStorage.getItem(`task_${id}_checked`))
      localStorage.removeItem(`task_${id}_checked`);
    else localStorage.setItem(`task_${id}_checked`, 1);

    if (localStorage.getItem(`task_${id}_paused`)) {
      localStorage.removeItem(`task_${id}_paused`);
    } else {
      localStorage.setItem(`task_${id}_paused`, 1);
    }
    setTimerPaused(!timerPaused);
    if (countdownRef.current) {
      if (timerPaused) {
        countdownRef.current.start();
      } else {
        countdownRef.current.pause();
      }
    }
  };

  const countdownRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  const handlePause = () => {
    setIsPaused(!isPaused);
    if (countdownRef.current) {
      if (isPaused) {
        countdownRef.current.start();
      } else {
        countdownRef.current.pause();
      }
    }
  };

  const handleTimerCompleted = () => {
    localStorage.setItem(`task_${id}_expired`, 1);
    setTimerCompleted(true);
  };

  const handlePauseResume = () => {
    if (localStorage.getItem(`task_${id}_paused`)) {
      localStorage.removeItem(`task_${id}_paused`);
    } else {
      localStorage.setItem(`task_${id}_paused`, 1);
    }
    setTimerPaused(!timerPaused);
    if (countdownRef.current) {
      if (timerPaused) {
        countdownRef.current.start();
      } else {
        countdownRef.current.pause();
      }
    }
  };

  const timerRenderer = ({ days, hours, minutes, seconds }: any): any => {
    if (localStorage.getItem(`task_${id}_empty`))
      return <span>Timer hasn't been set</span>;

    if (localStorage.getItem(`task_${id}_expired`)) {
      return <span>Timer expired</span>;
    } else if (timerPaused) {
      return (
        <>
          <span>
            Paused on {days}d {formatTimeValue(hours)}:
            {formatTimeValue(minutes)}:{formatTimeValue(seconds)}
          </span>
          <button onClick={handlePauseResume}> Resume</button>
        </>
      );
    } else {
      return (
        <>
          <span>
            {days}d {formatTimeValue(hours)}:{formatTimeValue(minutes)}:
            {formatTimeValue(seconds)}
          </span>
          <button onClick={handlePauseResume}> Pause</button>
        </>
      );
    }
  };

  const [isEditing, setEditing] = useState<boolean>(false);
  const [savedDescription, setSavedDescription] = useState<string>("");
  // const [isChecked, setIsChecked] = useState<boolean>(completed);
  const [timerCompleted, setTimerCompleted] = useState(false);
  const [timerPaused, setTimerPaused] = useState(false);
  const [isCountdownVisible, setCountdownVisible] = useState(false);

  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const time = (dd * 86400 + hh * 3600 + mm * 60 + ss) * 1000;

    //без этой коррекции интервалом время рассчитывается неверно при паузах/обновлениях
    //наименьший интервал = лучшая коррекция, иначе придётся много обновлять страницу
    setInterval(() => {
      const startTime = localStorage.getItem(`task_${id}_startTime`);
      const remainingMs = localStorage.getItem(`task_${id}_remainingMs`);

      if (startTime && remainingMs) {
        if (localStorage.getItem(`task_${id}_paused`)) {
          setTimerPaused(true);
          localStorage.setItem(`task_${id}_startTime`, Date.now());
          localStorage.setItem(`task_${id}_remainingMs`, remainingMs);
          setCountdownVisible(true);
          return;
        }

        const elapsedTime = Date.now() - parseInt(startTime);
        const updatedRemainingMs = parseInt(remainingMs) - elapsedTime;
        localStorage.setItem(`task_${id}_startTime`, Date.now());
        localStorage.setItem(`task_${id}_remainingMs`, updatedRemainingMs);
        setCountdownVisible(true);
      } else {
        if (!time) localStorage.setItem(`task_${id}_empty`, 1);
        if (!localStorage.getItem(`task_${id}_expired`)) {
          localStorage.setItem(`task_${id}_startTime`, Date.now());
          localStorage.setItem(`task_${id}_remainingMs`, time);
        }
      }
      return;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, [isEditing]);

  return (
    <>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          onClick={handleClick}
          checked={localStorage.getItem(`task_${id}_checked`) === "1"}
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
        <div className="created">
          {isCountdownVisible && (
            <Countdown
              date={
                Date.now() +
                parseInt(localStorage.getItem(`task_${id}_remainingMs`))
              }
              ref={countdownRef}
              onComplete={handleTimerCompleted}
              renderer={timerRenderer}
              // onPause={handlePauseResume}
            />
          )}
        </div>
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
