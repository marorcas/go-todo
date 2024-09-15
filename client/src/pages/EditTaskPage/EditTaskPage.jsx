import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TaskForm from "../../components/TaskForm/TaskForm";
import styles from "./EditTaskPage.module.scss";
 
const EditTaskPage = () => {
    // console.log("Got to edit page")

    // const { id } = useParams();

    // const navigate = useNavigate();
    
    // const [fetchStatus, setFetchStatus] = useState('IDLE');
    // const [error, setError] = useState(null);
    // const [task, setTask] = useState(null);

    // useEffect(() => {
    //     setFetchStatus('LOADING');

    //     console.log("I am here")

    //     getTaskById(id)
    //         .then(task => {
    //             setFetchStatus('SUCCESS');
    //             setTask(task);
    //             console.log("Successfully grabbed the task")
    //         })
    //         .catch((e) => {
    //             setFetchStatus('FAILURE');
    //             setError(e);
    //         });
    // }, []);

    // const onSubmit = async (data) => {
    //     console.log(data)
    //     const dataTask = editTaskById(idNumber, data)
    //         .then((task) => {
    //             console.log(task)
    //             navigate('/')
    //         })
    //         .catch(() => alert('Failed to update post'));
    //     console.log(dataTask)
    // }

    return (
        <div className={styles.EditTaskPage}>
            <h1>Edit Task</h1>
            {/* {fetchStatus === 'LOADING' && <p>Loading...</p>}

            {fetchStatus === 'FAILURE' && (
                <p style={{color: 'red'}}>
                    {error?.message}
                </p>
            )}

            {fetchStatus === 'SUCCESS' && task && 
                <TaskForm 
                    formType='EDIT' 
                    defaultValues={{task: task.task}}
                    onSubmit={onSubmit} 
                />
            } */}
        </div>
    )
}

export default EditTaskPage;