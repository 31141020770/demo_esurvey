import { useState } from "react";
import TrashIcon from "../icons/TrashIcon";
import { Id, Task } from "../types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import SVGCopy from "./svgComponent/svgCopy";
import SVGMove from "./svgComponent/svgMove";
import SVGTrash from "./svgComponent/svgTrash";

interface Props {
  task: Task;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, content: string) => void;
  overIndexs: boolean
}

function TaskCard({ task, deleteTask, updateTask, overIndexs }: Props) {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(true);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,

  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    setMouseIsOver(false);
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="
        opacity-30
        bg-gray-50 p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl border-2 border-rose-500  cursor-grab relative
      "
      />
    );
  }

  if (editMode) {
    return (

      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="bg-gray-50 p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-grab relative"
      >
        <input
          onBlur={toggleEditMode}
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.shiftKey) {
              toggleEditMode();
            }
          }}
          className="
          h-[90%]
          w-full resize-none border-none rounded bg-transparent text-white focus:outline-none
          "
          value={task.content}

          placeholder="Task content here"


          onChange={(e) => updateTask(task.id, e.target.value)}
        />
      </div>
    );
  }

  return (
    <div className="relative">
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        onClick={toggleEditMode}
        className="bg-gray-50 border-gray-400 border-solid 
        border p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-grab relative task"
        onMouseEnter={() => {
          setMouseIsOver(true);
        }}
        onMouseLeave={() => {
          setMouseIsOver(false);
        }}
      >
        <p className="my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap">
          {task.content}
        </p>

        {mouseIsOver && (
        <div className="absolute -left-10 top-3 flex flex-col justify-center">
          <button
            onClick={() => {
              deleteTask(task.id);
            }}
            className=" -translate-y-1/2 p-2 rounded opacity-60 hover:opacity-100"
          >
            <SVGMove />
          </button>
          <button
            onClick={() => {
              deleteTask(task.id);
            }}
            className=" -translate-y-1/2 p-2 rounded opacity-60 hover:opacity-100"
          >
            <SVGCopy />
          </button>
          <button
            onClick={() => {
              deleteTask(task.id);
            }}
            className="stroke-white  -translate-y-1/2 p-2 rounded opacity-60 hover:opacity-100"
          >
            <SVGTrash />
          </button>

        </div>

        )}
      </div>

      {overIndexs && <hr style={{ color: "red", width: "100%", display: "block", position: "absolute", top: 0 }} />}
    </div>

  );
}

export default TaskCard;
