import Addtodo from "./Components/Addtodo";
import Header from "./Components/Header";
import Todos from "./Components/Todos";

export default function App() {
  return (
    <main className="p-2">
      <Header />
      <Addtodo />
      <Todos />
    </main>
  )
}