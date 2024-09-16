import styles from "./TasksPage.module.scss";
import TaskCard from "../../components/TaskCard/TaskCard";
import CompletedButton from "../../components/CompletedButton/CompletedButton";
import { Link } from "react-router-dom";
import PriorityButton from "../../components/PriorityButton/PriorityButton";

const TasksPage = ({ tasks }) => {
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
        </div>
    )
}

export default TasksPage;