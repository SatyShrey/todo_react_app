import { Menu, X } from "lucide-react";
import { useTodos } from "./Provider";
const daisyuiThemes: string[] = [
    "light",
    "dark",
    "corporate",
    "synthwave",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "fantasy",
    "luxury",
    "dracula",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
    "dim",
    "nord",
    "sunset"
];
export default function Header() {
    const { changeTheme, theme } = useTodos();

    const toogleNav = () => {
        const modal = document.getElementById("nav") as HTMLDialogElement | null;
        if (modal) {
            if (modal.open) { modal.close() }
            else { modal.showModal() }
        }
    }

    return (
        <div>
            <header className="flex justify-between items-center text-primary">
                <h1 className="text-2xl font-bold ms-2 sm:text-3xl">Todo</h1>
                <button className="text-primary btn" onClick={toogleNav}>
                    <Menu />
                </button>
            </header>

            <dialog id="nav" className="modal modal-end">
                <nav className="w-60 sm:w-96 bg-base-200 p-2 h-screen modal-box flex flex-col">
                    <form method="dialog">
                        <button className="btn"><X /></button>
                    </form>
                    <h2 className="text-xl font-semibold border-b text-center mt-2">Themes</h2>
                    <ul className="text-center gap-1 flex-1 overflow-scroll pb-14 py-2 grid sm:grid-cols-2">
                        {daisyuiThemes.map((item) => {
                            return <li data-theme={item} key={item} className={`${theme === item ? "" : "btn-outline"} btn btn-primary btn-block`} onClick={() => {
                                localStorage.setItem("theme", item);
                                changeTheme(item);
                                toogleNav();
                            }}>{item}</li>
                        })}
                    </ul>
                </nav>
            </dialog>
        </div>
    )
}
