import { useNavigate } from "react-router-dom";
import TaskForm from "../../components/TaskForm/TaskForm";
import { createTask } from "../../services/task-services";
import styles from "./CreateTaskPage.module.scss";

const CreateTaskPage = () => {
    const navigate = useNavigate();
    
    const onSubmit = async (data) => {
        createTask(data)
            .then((task) => {
                console.log(task)
                navigate('/');
            })
            .catch((e) => console.log(e));
    }
    return(
        <div className={styles.CreateTaskPage}>
            <h1>Create New Task</h1>
            <TaskForm onSubmit={onSubmit} />
        </div>
    )
}

export default CreateTaskPage;