import { Link } from "react-router-dom";
import styles from "./TaskCard.module.scss";
import HighlighterIcon from "./HighlighterIcon";
import { useContext, useState } from "react";
import { TaskContext } from "../../contexts/TaskContextProvider";
import { deleteTaskById, getAllTasks, markTaskStatus, markTaskPriority } from "../../services/task-services";
import DeleteIcon from "./DeleteIcon";

const TaskCard = ({ task }) => {
    const { tasks, setTasks } = useContext(TaskContext);
    
    const [status, setStatus] = useState(task.status);
    const [priority, setPriority] = useState(task.priority);
    
    const toggleStatus = async () => {
        const taskStatus = !status;
        setStatus(taskStatus);

        await markTaskStatus(task._id, taskStatus);

        task.status = taskStatus;

        console.log(task);

        if (taskStatus) {
            getAllTasks()
                .then((data) => {
                    const updatedData = data.filter((task) => !task.status);
                    setTasks(updatedData);
                })
                .catch((e) => console.warn(e));
        } else {
            getAllTasks()
                .then((data) => {
                    const updatedData = data.filter((task) => task.status);
                    setTasks(updatedData);
                })
                .catch((e) => console.warn(e));
        }
    }

    const togglePriority = async () => {
        const taskPriority = !priority;
        setPriority(taskPriority);

        await markTaskPriority(task._id, taskPriority);

        task.priority = taskPriority;

        console.log(task);
    }

    const taskClassNames = [
        styles.Task,
        status && styles.Completed,
        priority && styles.Priority
      ]
        .filter(Boolean)
        .join(' ');

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
        }
    }

    return(
        <article className={styles.TaskCard}>
            <div className={styles.CheckboxContainer}>
                <input
                    className={styles.Checkbox}
                    type="checkbox"
                    checked={status}
                    onChange={toggleStatus}
                />
            </div>

            <Link 
                className={styles.TaskInfo}
                key={task._id}
                // to={`tasks/${task._id}/edit`}
                to={'/'}
            >
                <h2 className={taskClassNames}>{task.task}</h2>
            </Link>

            <button className={styles.HighlighterContainer} onClick={togglePriority}>
                <HighlighterIcon />
            </button>

            <button className={styles.DeleteContainer} onClick={() => onDelete(task._id)}>
                <DeleteIcon />
            </button>
        </article>
    )
}

export default TaskCard;