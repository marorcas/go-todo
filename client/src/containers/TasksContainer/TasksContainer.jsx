import { useContext, useEffect } from "react";
import { TaskContext } from "../../contexts/TaskContextProvider";
import { TabSelectionContext } from "../../contexts/TabSelectionContextProvider";
import { getAllTasks } from "../../services/task-services";
import TasksPage from "../../pages/TasksPage/TasksPage";
import { TabSelection } from "../../enums/TabSelection";

const TasksContainer = () => {
    const { tasks, setTasks } = useContext(TaskContext);
    const { 
        selectedTab, 
        setCompletedTab, 
        setPriorityTab 
    } = useContext(TabSelectionContext);

    useEffect(() => {
        if (selectedTab === TabSelection.COMPLETED) {
            getAllTasks()
                .then((data) => {
                    const updatedData = data.filter((task) => task.status);
                    setTasks(updatedData);
                    setCompletedTab(true);
                    setPriorityTab(false);
                })
                .catch((e) => console.warn(e));
        } else if (selectedTab === TabSelection.PRIORITY) {
            getAllTasks()
                .then((data) => {
                    const updatedData = data.filter((task) => !task.status && task.priority);
                    setTasks(updatedData);
                    setPriorityTab(true);
                    setCompletedTab(false);
                })
                .catch((e) => console.warn(e));
        } else {
            getAllTasks()
            .then((data) => {
                const updatedData = data.filter((task) => !task.status);
                setTasks(updatedData);
                setCompletedTab(false);
                setPriorityTab(false);
            })
            .catch((e) => console.warn(e));
        }
    }, [selectedTab]);

    return (
        <TasksPage tasks={tasks} />
    )
}

export default TasksContainer;