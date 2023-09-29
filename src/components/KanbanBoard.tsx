import PlusIcon from "../icons/PlusIcon";
import React, { useMemo, useState } from "react";
import { Column, Id, Task } from "../types";
import ColumnContainer from "./ColumnContainer";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useDraggable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import TaskCard from "./TaskCard";
import ColumnContainerControl from "./ColumnContainerControl";


const defaultControl: Column = {
  id: "control",
  title: "control",
};
const defaultCols: Column[] = [
  {
    id: "todo",
    title: "control",
  }

];
function button() {
  return (<div>
    <button className="bg-red-500 ">aaaa</button>
  </div>)
}
function textarea() {
  return (<div>
    <textarea className="bg-current">aaaádasda sadfasd áda đá áda sdasd ád ád a</textarea>
  </div>)
}
const defaultTasksControl: Task[] = [
  {
    id: "2",
    columnId: "control",
    content: "Tiêu đề và mô tả1",
    component: button()
  },
  {
    id: "3",
    columnId: "control",
    content: "Câu trả lời ngắn2",
    component: textarea()
  },
  {
    id: "4",
    columnId: "control",
    content: "Tiêu đề và mô tả3",
    component: button()
  },
  {
    id: "5",
    columnId: "control",
    content: "Câu trả lời ngắn4",
    component: textarea()
  },
  {
    id: "6",
    columnId: "control",
    content: "Tiêu đề và mô tả5",
    component: button()
  },
  {
    id: "7",
    columnId: "control",
    content: "Câu trả lời ngắn6",
    component: textarea()
  }
]
const defaultTasks: Task[] = [
  {
    id: "1",
    columnId: "todo",
    content: "title and sub",
  },
];
function KanbanBoard() {


  const [columns, setColumns] = useState<Column[]>(defaultCols);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);
  const [tasks, setTasks] = useState<Task[]>(defaultTasks);

  const [activeColumn, setActiveColumn] = useState<Column | null>(null);

  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [overIndexS, setOverIndexS] = useState<number>(-1);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );
  React.useEffect(() => {
    console.log(tasks);

  }, [tasks])
  return (
    <div
      className="
        m-auto
        flex
        min-h-screen
        w-full
        items-center
        overflow-x-auto
        overflow-y-hidden
        px-[40px]
    "
    >

      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className="m-auto flex gap-4">
          <div className="flex gap-4">
            <SortableContext items={[defaultControl.id]}>
              <ColumnContainerControl
                key={defaultControl.id}
                column={defaultControl}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
                createTask={createTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
                tasks={defaultTasksControl}
              />
            </SortableContext>
          </div>
        </div>
        <div className="m-auto flex gap-4">
          <div className="flex gap-4">
            <SortableContext items={columnsId}>
              {columns.map((col) => (
                <ColumnContainer
                  key={col.id}
                  column={col}
                  deleteColumn={deleteColumn}
                  updateColumn={updateColumn}
                  createTask={createTask}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                  tasks={tasks.filter((task) => task.columnId === col.id)}
                  overIndexs={overIndexS}
                />
              ))}
            </SortableContext>
          </div>
        </div>

        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
                createTask={createTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
                tasks={tasks.filter(
                  (task) => task.columnId === activeColumn.id
                )}
                overIndexs={overIndexS}
              />
            )}
            {activeTask && (
              <TaskCard
                task={activeTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
                overIndexs
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );

  function createTask(columnId: Id) {
    const newTask: Task = {
      id: generateId(),
      columnId,
      content: `Task ${tasks.length + 1}`,
    };

    setTasks([...tasks, newTask]);
  }

  function deleteTask(id: Id) {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  }

  function updateTask(id: Id, content: string) {
    const newTasks = tasks.map((task) => {
      if (task.id !== id) return task;
      return { ...task, content };
    });

    setTasks(newTasks);
  }

  function createNewColumn() {
    const columnToAdd: Column = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };

    setColumns([...columns, columnToAdd]);
  }

  function deleteColumn(id: Id) {
    const filteredColumns = columns.filter((col) => col.id !== id);
    setColumns(filteredColumns);

    const newTasks = tasks.filter((t) => t.columnId !== id);
    setTasks(newTasks);
  }

  function updateColumn(id: Id, title: string) {
    const newColumns = columns.map((col) => {
      if (col.id !== id) return col;
      return { ...col, title };
    });

    setColumns(newColumns);
  }

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null);
    setActiveTask(null);

    console.log(event);
    console.log(1);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;
    console.log(2);
    if (activeId === overId) return;

    console.log(3);

    console.log(4);


    console.log(overIndexS)
    const overIndex = tasks.findIndex((t) => t.id === overId);
    const newItem: Task = event.active.data.current?.task;
    const temp = [...tasks];
    if (newItem.columnId !== "todo") {
      if (overIndex === -1) {
        temp.push({ ...newItem, id: generateId(), columnId: "todo" });
        setTasks(temp);
        console.log(4.0);
      }else if(overIndex === tasks.length - 1 && overIndex !== 0){
        temp.splice(overIndex, 0, { ...newItem, id: generateId(), columnId: "todo" })
        setTasks(temp);
      }
      else if (overIndex === 0) {
        console.log(4.1);
        
        const temp1 = [...tasks];
        temp1.unshift({ ...newItem, id: generateId(), columnId: "todo" })
        setTasks(temp1)
      } else {
        console.log(4.2);
        temp.splice(overIndex, 0, { ...newItem, id: generateId(), columnId: "todo" })
        // let aray = arrayMove(temp, overIndexS, overIndexS + 1 )
        setTasks(temp)
      }
    }else{
      const activeIndex = tasks.findIndex((t) => t.id === activeId);
      return arrayMove(tasks, activeIndex, overIndex)
    }


    const isActiveAColumn = active.data.current?.type === "Column";
    if (!isActiveAColumn) return;



    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId);

      const overColumnIndex = columns.findIndex((col) => col.id === overId);

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    console.log(5);
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;
    console.log(6);
    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";
    console.log(7);
    if (!isActiveATask) return;

    // Im dropping a Task over another Task
    if (isActiveATask && isOverATask) {

      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);
        if (activeIndex === -1 && overIndex === -1) {
          console.log(8);
          console.log("overIndex", overIndex);

          return tasks
        } else {
          // Fix introduced after video recording
          if (activeIndex === -1 && overIndex !== -1) {
            console.log(8.5);
            console.log("overIndex", overIndex);
            setOverIndexS(overIndex)
          }
          console.log(9);
          console.log("activeIndex",activeIndex);
          
          console.log("overIndex", overIndex);
          setOverIndexS(overIndex)

          return tasks;  
        }
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";

    // Im dropping a Task over a column
    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        if (activeIndex !== -1) {
          tasks[activeIndex].columnId = overId;
          tasks[activeIndex].id = generateId()
          console.log(10);
          console.log("activeIndex", activeIndex);
          return arrayMove(tasks, activeIndex, activeIndex);
        }
        else {
          // const newItem: Task = event.active.data.current?.task;
          // const temp = [...tasks];
          // temp.push({ ...newItem, id: generateId(), columnId: "todo" });
          // setTasks(temp);
          console.log(11);
          console.log("activeIndex", activeIndex);
          return tasks;
        }

      });
    }
  }
}

function generateId() {
  /* Generate a random number between 0 and 10000 */
  return Math.floor(Math.random() * 10001);
}

export default KanbanBoard;
