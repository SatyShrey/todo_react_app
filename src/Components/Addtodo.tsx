import { useState, type FormEvent } from "react";
import { useTodos } from "./Provider";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";

export default function Addtodo() {
  const [todo, settodo] = useState("");
  const { handleAddTodo } = useTodos();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!todo){return}
    handleAddTodo(todo);
    settodo("");
  };
  
  return (
    <form
      onSubmit={handleSubmit}
      className="flex h-16 bg-base-100 items-center overflow-x-hidden rounded-xl focus-within:border shadow-[0_0_2px] shadow-primary border-primary p-2 max-w-2xl mx-auto my-2"
    >
      <textarea
        placeholder="Write a note..."
        value={todo}
        onChange={(e) => settodo(e.target.value)}
        className="outline-0 flex-1 px-2 resize-none"
      />
      <AnimatePresence>
        {todo && (
          <motion.button
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
            type="submit"
            className="btn btn-primary rounded-xl h-full"
          >
            <Plus />
          </motion.button>
        )}
      </AnimatePresence>
    </form>
  );
}
