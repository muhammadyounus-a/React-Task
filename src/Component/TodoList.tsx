import React, { useState } from 'react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

type Task = {
  id: number;
  text: string;
};

const ItemTypes = {
  TASK: 'task',
};

function Task({ task, index, moveTask }: { task: Task, index: number, moveTask: (dragIndex: number, hoverIndex: number) => void }) {
  const [, ref] = useDrop({
    accept: ItemTypes.TASK,
    hover: (draggedItem: { index: number }) => {
      if (draggedItem.index !== index) {
        moveTask(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.TASK,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.5 : 1;

  return (
    <div ref={(node) => drag(ref(node))} style={{ opacity }} className="bg-white p-2 mb-2 rounded shadow">
      <span className="font-bold mr-2">{index + 1}.</span> {/* Display index */}
      {task.text}
    </div>
  );
}

export default function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskText, setTaskText] = useState('');

  const addTask = () => {
    if (taskText.trim()) {
      setTasks([...tasks, { id: tasks.length + 1, text: taskText }]);
      setTaskText('');
    }
  };

  const moveTask = (dragIndex: number, hoverIndex: number) => {
    const updatedTasks = [...tasks];
    const [draggedTask] = updatedTasks.splice(dragIndex, 1);
    updatedTasks.splice(hoverIndex, 0, draggedTask);
    setTasks(updatedTasks);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex justify-center h-auto mt-10">
        <div className="w-[50rem] bg-gray-400 p-4">
          <h2 className="font-medium text-center text-2xl">TodoList</h2>
          <div className="flex gap-2">
          <input
              type="text"
              placeholder="Enter task..."
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  addTask();
                }
              }}
              className="p-3 w-full mt-3"
            />
            <button onClick={addTask} className="bg-blue-500 text-white p-2 mt-3 w-[10rem]">
              Add Task
            </button>

          </div>
          <div className="mt-4">
            {tasks.map((task, index) => (
              <Task key={task.id} task={task} index={index} moveTask={moveTask} />
            ))}
          </div>
        </div>
      </div>
    </DndProvider>
  );
}