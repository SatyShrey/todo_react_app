import { useEffect, useState } from "react"
import { useTodos } from "./Provider";

export default function Modal() {
    const [text, settext] = useState('');
    const { handleEditTodo, item,setitem } = useTodos();
    useEffect(() => {
        if (item) { settext(item.task) }
    }, [item])
    return (
        <dialog id="modal" className="modal modal-top">
            <div className="modal-box mx-auto max-w-3xl">
                <h3 className="font-bold text-lg">Edit Note</h3>
                <textarea
                    name="text"
                    id="text"
                    className="w-full resize-none p-2 border-0 outline-0 h-52 shadow-[0_0_2px]"
                    value={text}
                    onChange={(e) => settext(e.target.value)}
                ></textarea>
                <div className="modal-action">
                    <form method="dialog" className="space-x-2">
                        {(item && text !== item?.task) &&
                            <button
                                className="btn btn-success"
                                onClick={() => {
                                    if (!item) { return null }
                                    handleEditTodo(item.id, text);
                                }}
                            >Save</button>}
                        <button className="btn btn-outline" onClick={()=>{setitem(null);settext('')}}>Close</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}