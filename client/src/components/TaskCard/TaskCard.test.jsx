// import { render, screen } from '@testing-library/react';
// import TaskCard from './TaskCard';
// import * as taskServices from '../../services/task-services';
// import { TaskContext } from '../../contexts/TaskContextProvider';

// const testTask = {
//     _id: 1,
//     task: "Test task",
//     status: false,
//     priority: false
// }

// // mocks for task-services.js
// jest.mock('../../services/task-services');

// const renderWithContext  = (ui, { providerProps, ...renderOptions }) => {
//     return render(
//         <TaskContext {...providerProps}>(ui)</TaskContext>,
//         renderOptions
//     );
// };

// describe("Task Card", () => {
//     test("should render a task description based on task in props", () => {
//         render(<TaskCard task={testTask} />);
//         const taskDescription = screen.getByText("Test task");
//         expect(taskDescription).toBeInTheDocument();
//     })
// })