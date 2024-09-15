import { useContext, useEffect } from "react";
import { TaskContext } from "../../contexts/TaskContextProvider";
import styles from "./TasksPage.module.scss";
import { getAllTasks } from "../../services/task-services";
import TaskCard from "../../components/TaskCard/TaskCard";
import CompletedButton from "../../components/CompletedButton/CompletedButton";
import { Link } from "react-router-dom";
import PriorityButton from "../../components/PriorityButton/PriorityButton";

const TasksPage = () => {
    const { tasks, setTasks } = useContext(TaskContext);

    useEffect(() => {
        getAllTasks()
            .then((data) => {
                const updatedData = data.filter((task) => !task.status);
                setTasks(updatedData);
            })
            .catch((e) => console.warn(e));
    }, []);

    // const onDelete = async () => {
    //     const confirmed = confirm("Are you sure you want to delete all tasks?");
    //     if (!confirmed) {
    //         return;
    //     }
    
    //     const isDeleted = await deleteAllTasks()
    //         .catch((e) => {
    //             console.log(e)
    //             return false;
    //         });
    
    //     if (isDeleted) {
    //         setTasks([]);
    //     }
    // }

    return (
        <div className={styles.TasksPage}>
            <h1>My To-Do List</h1>

            <div className={styles.Links}>
                <Link to="/tasks/new">Create task</Link>
            </div>

            <div className={styles.FilterTabs}>
                <CompletedButton />

                <PriorityButton />
            </div>

            <div className={styles.TasksContainer}>
                {tasks.length === 0 ? (
                    <p>No current pending tasks</p>
                ) : (
                    tasks.map((task) => (
                        <TaskCard key={task._id} task={task} />
                    ))
                )}
            </div>

            {/* <button className={styles.ClearButton} onClick={() => onDelete()}>
                Clear all tasks
            </button> */}
        </div>
    )
}

export default TasksPage;