const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const getAllTasks = async () => {
    const response = await fetch(`${apiBaseUrl}/task`);
    if (!response.ok) {
        throw new Error('Failed to fetch');
    }

    const data = await response.json();

    if (data === null) {
        return [];
    }

    return data;
}

// export const getTaskById = async (id) => {
//     const response = await fetch(`${apiBaseUrl}/task/${id}`);

//     console.log("Hello")
//     if (!response.ok) {
//         if (response.status === 404) {
//             throw new Error(await response.text());
//         }
//         throw new Error('Something went wrong');
//     }

//     return await response.json();
// }

export const createTask = async (data) => {
    const response = await fetch(`${apiBaseUrl}/task`, {
        method: 'POST',
        body: JSON.stringify(data),
    });
    if (!response) {
        throw new Error('Failed to post');
    }

    return await response.json();
}

// export const editTaskById = async (id, data) => {
//     const response = await fetch(`${apiBaseUrl}/task/${id}`, {
//         method: 'PUT',
//         body: JSON.stringify(data),
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     });
  
//     if (!response.ok) {
//         throw new Error('Something went wrong');
//     }

//     return await response.json();
// }

export const markTaskPriority = async (id, taskPriority) => {
    let address;
    if (taskPriority) {
        address = "prioritizeTask";
    } else {
        address = "unprioritizeTask"
    }

    const response = await fetch(`${apiBaseUrl}/${address}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(
            {
                "priority": taskPriority
            }
        ),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response) {
        throw new Error('Failed to post');
    }

    return await response.json();
}

export const markTaskStatus = async (id, taskStatus) => {
    let address;
    if (taskStatus) {
        address = "completeTask";
    } else {
        address = "undoTask"
    }

    const response = await fetch(`${apiBaseUrl}/${address}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(
            {
                "status": taskStatus
            }
        ),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response) {
        throw new Error('Failed to post');
    }

    return await response.json();
}

export const deleteTaskById = async (id) => {
    const response = await fetch(`${apiBaseUrl}/deleteTask/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error('Failed to delete');
    }
    
    return true;
}

// export const deleteAllTasks = async () => {
//     const response = await fetch(`${apiBaseUrl}/deleteAllTask`, {
//         method: 'DELETE'
//     });
//     if (!response.ok) {
//         throw new Error('Failed to delete');
//     }
    
//     return true;
// }