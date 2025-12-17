import {useMutation} from "@tanstack/react-query"

import { createTask } from "../../services/taskService";
import css from "./TaskForm.module.css";

interface TaskFormProps {
    onSuccess: () => void;
}

export default function TaskForm({ onSuccess }: TaskFormProps) {

    const { mutate, isPending } = useMutation({
        mutationFn: createTask,
        onSuccess: () => {
            onSuccess();
        },
        onError: (error) => {
            console.log(error);
        }
    });

    const handleSubmit = (formData: FormData) => {
        const text = formData.get("text") as string;
        mutate({ text });
    };

    return (
        <form className={css.form} action={handleSubmit}>
        <label className={css.label}>
            Task text
            <textarea name="text" className={css.input} rows={5} />
        </label>

        <button type="submit" className={css.button} disabled={isPending}>
            Create
        </button>
        </form>
    );
}
