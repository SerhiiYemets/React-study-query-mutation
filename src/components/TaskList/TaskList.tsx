import { useMutation, useQueryClient} from "@tanstack/react-query"
import type { Task, UpdateTaskData } from "../../types/task";
import css from "./TaskList.module.css";
import { deleteTask, updateTask } from "../../services/taskService"

interface TaskListProps {
    tasks: Task[];
}

export default function TaskList({ tasks }: TaskListProps) {
    const queryClient = useQueryClient();

    const updateTaskM = useMutation({
        mutationFn: ([taskId, payLoad]: [Task["id"], UpdateTaskData]) => {
            return updateTask(taskId, payLoad);
        },
        onSuccess: (task) => {
            console.log("Updated task:", task);
        },
        onError: (error) => {
            console.log(error);
        } 
    })
    
    const deleteTaskM = useMutation({
        mutationFn: deleteTask,
        onSuccess: () => {
            console.log("Success");
            queryClient.invalidateQueries({queryKey: ["tasks"]})
        },
        onError: (error) => {
            console.log(error);
        } 
    })
    
    return (
        <ul className={css.list}>
        {tasks.map((task) => (
            <li key={task.id} className={css.item}>
                <input type="checkbox"
                    defaultChecked={task.completed}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        updateTaskM.mutate([task.id, {completed: event.target.checked}])
                }/>
                <span className={css.text}>{task.text}</span>
                <button
                    type="button"
                    className={css.button}
                    disabled={deleteTaskM.isPending}
                    onClick={() => deleteTaskM.mutate(task.id)}>Delete</button>
            </li>
        ))}
        </ul>
    );
}