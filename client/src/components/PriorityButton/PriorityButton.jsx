import { useContext, useState } from "react";
import styles from "./PriorityButton.module.scss";
import { TaskContext } from "../../contexts/TaskContextProvider";
import { getAllTasks } from "../../services/task-services";

const PriorityButton = () => {
    const { tasks, setTasks } = useContext(TaskContext);

    const [priority, setPriority] = useState(false);

    const togglePriority = async () => {
        const priorityStatus = !priority;
        setPriority(priorityStatus);

        if (priorityStatus) {
            const updatedData = tasks.filter((task) => task.priority);
            setTasks(updatedData);
        } else {
            getAllTasks()
                .then((data) => {
                    const updatedData = data.filter((task) => !task.status);
                        setTasks(updatedData);
                })
                .catch((e) => console.warn(e));
        }
    }


    const priorityClassNames = [
        styles.PriorityButton,
        priority ? styles.PrioritySelected : styles.PriorityUnselected
      ]
        .filter(Boolean)
        .join(' ');

    return (
        <button className={priorityClassNames} onClick={togglePriority}>
            Priority
        </button>
    );
}

export default PriorityButton;