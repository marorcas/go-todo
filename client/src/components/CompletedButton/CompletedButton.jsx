import { useContext, useState } from "react";
import styles from "./CompletedButton.module.scss";
import { TaskContext } from "../../contexts/TaskContextProvider";
import { getAllTasks } from "../../services/task-services";

const CompletedButton = () => {
    const { tasks, setTasks } = useContext(TaskContext);

    const [status, setStatus] = useState(false);

    const toggleCompleted = async () => {
        const taskStatus = !status;
        setStatus(taskStatus);

        if (taskStatus) {
            getAllTasks()
                .then((data) => {
                    const updatedData = data.filter((task) => task.status);
                    setTasks(updatedData);
                })
                .catch((e) => console.warn(e));
        } else {
           getAllTasks()
                .then((data) => {
                    const updatedData = data.filter((task) => !task.status);
                    setTasks(updatedData);
                })
                .catch((e) => console.warn(e));
        }
    }

    const completedClassNames = [
        styles.CompletedButton,
        status ? styles.CompletedSelected : styles.CompletedUnselected
      ]
        .filter(Boolean)
        .join(' ');

    return (
        <button className={completedClassNames} onClick={toggleCompleted}>
            Completed
        </button>
    );
}

export default CompletedButton;