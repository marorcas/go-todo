import { useContext, useEffect } from "react";
import { TaskContext } from "../../contexts/TaskContextProvider";
import { TabSelectionContext } from "../../contexts/TabSelectionContextProvider";
import { getAllTasks } from "../../services/task-services";
import TasksPage from "../../pages/TasksPage/TasksPage";
import { TabSelection } from "../../enums/TabSelection";

const TasksContainer = () => {
    const { tasks, setTasks } = useContext(TaskContext);
    const { selectedTab } = useContext(TabSelectionContext);

    useEffect(() => {
        if (selectedTab === TabSelection.COMPLETED) {
            getAllTasks()
                .then((data) => {
                    const updatedData = data.filter((task) => task.status);
                    setTasks(updatedData);
                })
                .catch((e) => console.warn(e));
        } else if (selectedTab === TabSelection.PRIORITY) {
            getAllTasks()
                .then((data) => {
                    const updatedData = data.filter((task) => !task.status && task.priority);
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
    }, [selectedTab]);

    return (
        <TasksPage tasks={tasks} />
    )
}

export default TasksContainer;