import type { Task } from "../../types/task";
import css from "./TaskList.module.css";

interface TaskListProps {
  tasks: Task[];
}

export default function TaskList({ tasks }: TaskListProps) {
  return (
    <ul className={css.list}>
      {tasks.map((task) => (
        <li key={task.id} className={css.item}>
          <span className={css.text}>{task.text}</span>
        </li>
      ))}
    </ul>
  );
}