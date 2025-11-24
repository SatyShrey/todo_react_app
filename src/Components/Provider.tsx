import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
export type TodosProviderProps = {
  children: ReactNode;
};
export type Todo = {
  id: string;
  task: string;
  completed: boolean;
  createdAt: string;
};
export type TodosContexts = {
  todos: Todo[];
  handleAddTodo: (task: string) => void;
  toggleTodoCompleted: (id: string) => void;
  handleDeleteTodo: (id: string) => void;
  handleSetItem: (item: Todo | null) => void;
  changeTheme: (theme: string) => void;
  item: Todo | null;
  theme:string;
  handleEditTodo:(id:string,task:string)=>void;
};

const TodoContexts = createContext<TodosContexts | null>(null);

export const ToDoProvider = ({ children }: TodosProviderProps) => {
  const [todos, settodos] = useState<Todo[]>(() => {
  const stored = localStorage.getItem("todos");
  try {
    return stored ? JSON.parse(stored) as Todo[] : [];
  } catch {
    return [];
  }
});
  const [item, setitem] = useState<Todo | null>(null);
  const [theme, settheme] = useState<string>('dark');

  const changeTheme=(theme:string)=>{
    settheme(theme);
  }

  const handleAddTodo = (task: string) => {
    if (!task) {
      return;
    }
    settodos((prev) => {
      const newTodos: Todo[] = [
        {
          id: Date.now().toString(),
          task: task,
          completed: false,
          createdAt: new Date().toString(),
        },
        ...prev,
      ];
      return newTodos;
    });
  };

  const handleEditTodo=(id:string,task:string)=>{
    settodos((prev) => {
      let newTodos = prev.map((item) => {
        if (id === item.id) {
          return { ...item, task };
        } else {
          return item;
        }
      });
      return newTodos;
    });
  }

  const handleDeleteTodo = (id: string) => {
    settodos((prev) => prev.filter((a) => a.id !== id));
  };

  const toggleTodoCompleted = (id: string) => {
    settodos((prev) => {
      let newTodos = prev.map((item) => {
        if (id === item.id) {
          return { ...item, completed: !item.completed };
        } else {
          return item;
        }
      });
      return newTodos;
    });
  };

  const handleSetItem = (item: Todo | null) => {
    setitem(item);
  };

  useEffect(() => {
    localStorage.setItem('todos',JSON.stringify(todos));
},[todos]);

useEffect(()=>{
  const theme=localStorage.getItem("theme");
  if(theme){settheme(theme)}
},[])

  return (
    <TodoContexts.Provider
      value={{
        todos,
        handleAddTodo,
        toggleTodoCompleted,
        handleDeleteTodo,
        handleSetItem,
        item,changeTheme,theme,
        handleEditTodo
      }}
    >
     <div data-theme={theme} className="min-h-dvh bg-base-300 duration-600 transition-all">
       {children}
     </div>
      
    </TodoContexts.Provider>
  );
};

export const useTodos = () => {
  const todoConsumer = useContext(TodoContexts);
  if (!todoConsumer) {
    throw new Error("useTodos used outside of Provider");
  }
  return todoConsumer;
};
