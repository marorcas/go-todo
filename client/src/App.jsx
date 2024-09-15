import { BrowserRouter, Route, Routes } from "react-router-dom";
import TasksPage from "./pages/TasksPage/TasksPage";
import TaskContextProvider from "./contexts/TaskContextProvider";
import CreateTaskPage from "./pages/CreateTaskPage/CreateTaskPage";
// import EditTaskPage from "./pages/EditTaskPage/EditTaskPage";

function App() {

  return (
    <>
      <TaskContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<TasksPage />} />
            <Route path="/tasks/new" element={<CreateTaskPage />} />
            {/* <Route path="/tasks/:id/edit" element={<EditTaskPage />} /> */}
          </Routes>
        </BrowserRouter>
      </TaskContextProvider>
    </>
  )
}

export default App
