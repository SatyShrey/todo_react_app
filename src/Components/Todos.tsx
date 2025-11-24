import { useTodos } from "./Provider";
import { AnimatePresence, motion } from "framer-motion";
import { Trash2 } from "lucide-react";

export default function Todos() {
  const { todos, toggleTodoCompleted, handleDeleteTodo, handleSetItem } = useTodos();
  let filteredData = todos;

  if (!filteredData || !filteredData[0]) {
    return <div className="text-center mt-24 text-warning">Empty</div>
  }

  return (<>
    <ul className="max-w-full overflow-x-hidden overflow-y-scroll bar-0 grid sm:grid-cols-2 gap-2 py-2">
      <AnimatePresence>
        {" "}
        {filteredData.map((item) => {
          return (
            <motion.li
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              exit={{ opacity: 0, x: 50 }}
              key={item.id}
              className="p-2 bg-base-100 rounded-xl overflow-hidden flex gap-2 items-center mx-0.5 shadow-[0_0_2px] shadow-primary"
            >
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => toggleTodoCompleted(item.id)}
                className="cursor-pointer h-8 w-8 checkbox"
              />
              <div
                className="cursor-pointer flex-1 overflow-hidden"
                onClick={() => {
                  const modal = document.getElementById("modal") as HTMLDialogElement | null;
                  if (!modal) return;
                  handleSetItem(item)
                  modal.showModal()
                }}
              >
                <p
                  className={`text-xl whitespace-nowrap text-ellipsis overflow-hidden ${item.completed ? "text-error line-through" : ""
                    }`}
                >
                  {item.task}
                </p>
                <span className="text-warning text-xs">
                  {item.createdAt.substring(4, 24)}
                </span>
              </div>
              <AnimatePresence>
                {item.completed && (
                  <motion.button
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => handleDeleteTodo(item.id)}
                    className="p-2 text-error cursor-pointer"
                  >
                    <Trash2 />
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.li>
          );
        })}
      </AnimatePresence>
    </ul>

  </>
  );
}
