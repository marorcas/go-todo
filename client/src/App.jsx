import { BrowserRouter, Route, Routes } from "react-router-dom";
import TaskContextProvider from "./contexts/TaskContextProvider";
import CreateTaskPage from "./pages/CreateTaskPage/CreateTaskPage";
import TasksContainer from "./containers/TasksContainer/TasksContainer";
import TabSelectionContextProvider from "./contexts/TabSelectionContextProvider";
// import EditTaskPage from "./pages/EditTaskPage/EditTaskPage";

function App() {

  return (
    <>
      <TabSelectionContextProvider>
        <TaskContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<TasksContainer />} />
              <Route path="/tasks/new" element={<CreateTaskPage />} />
              {/* <Route path="/tasks/:id/edit" element={<EditTaskPage />} /> */}
            </Routes>
          </BrowserRouter>
        </TaskContextProvider>
      </TabSelectionContextProvider>
    </>
  )
}

export default App
