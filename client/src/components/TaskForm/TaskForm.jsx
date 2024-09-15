import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { schema } from "./schema";
import styles from "./TaskForm.module.scss";
import { useContext, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { TaskContext } from "../../contexts/TaskContextProvider";
import { deleteTaskById } from "../../services/task-services";

const TaskForm = ({
    formType = 'ADD', 
    defaultValues = {task: ''}, 
    onSubmit 
}) => {

    const {
        reset,
        register, 
        formState: { errors, isSubmitSuccessful }, 
        handleSubmit,
    } = useForm({ resolver: zodResolver(schema), defaultValues });

    const { tasks, setTasks } = useContext(TaskContext);

    const { id } = useParams();
    const idNumber = parseInt(id);

    const navigate = useNavigate();
   
    const [task, setTask] = useState(defaultValues.task);

    const handleTaskChange = (event) => {
        setTask(event.target.value);
    }

    const onDelete = async (id) => {
        const confirmed = confirm("Are you sure you want to delete this task?");
        if (!confirmed) {
            return;
        }

        const isDeleted = await deleteTaskById(id)
            .catch((e) => {
                console.log(e)
                return false;
            });

        if (isDeleted) {
            const updatedTasks = tasks.filter(task => task._id !== id);
            setTasks(updatedTasks);
            navigate("/");
        }
    }

    isSubmitSuccessful && reset();

    return(
        <>
            <form 
            className={styles.Form} 
            onSubmit={handleSubmit(() => onSubmit({task}))}
            >

                <div className={styles.Field}>
                    <label htmlFor="task">Task</label>
                    <input 
                        id="task" 
                        type="text" {...register('task')} 
                        onChange={handleTaskChange}
                        placeholder="Enter task..."
                    />
                    {errors?.task && 
                        <small className={styles.ErrorText}>
                            {errors.task.message}
                        </small>
                    }
                </div>

                <div className={styles.Buttons}>
                    {formType === "EDIT" && <button className={styles.Button} onClick={() => onDelete(idNumber)}>Delete</button>}
                    
                    <button className={styles.Button} type="submit">{formType === 'ADD' ? 'Add' : 'Edit'}</button>
                </div>
            </form>

            <Link className={styles.Cancel} to="/">Cancel</Link>
        </>
    )
}

export default TaskForm;