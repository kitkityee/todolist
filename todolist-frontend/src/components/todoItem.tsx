import Todo from "@/models/todo"
import ItemShowConetxt from "@/store/item-show-context"
import { FormEvent, ChangeEvent, useState, useEffect, useRef, MutableRefObject, useContext, RefObject } from "react"
import { CheckedIcon, UncheckedIcon } from "./ui-components/icons";

interface Props {
  onClick?: () => void
  todo?: Todo
  onSubmit: (content:string, id?:number) => void
  onReset?: () => void
}

export default function TodoItem ( {onClick, onSubmit, onReset, todo} : Props ) {
  const [inputContent, setInputContent] = useState(todo?.content ?? "")
  const ctx = useContext(ItemShowConetxt)
  const inputRef:RefObject<HTMLInputElement> = useRef(null);

  const submitHandler = (e : FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit?.(inputContent,todo?.id)
    setInputContent("")
  }

  useEffect(()=> {
    if(ctx.addState && todo === undefined) {
      inputRef.current?.focus();
    }
  }, [ctx.addState])

  return (
    <li className="flex items-center">
      <button onClick={onClick}>
        {todo?.isCompleted ?
        <CheckedIcon/> : <UncheckedIcon/>}
      </button>
      <form onSubmit={submitHandler} className="ml-1 select-none border-b border-aliceblue grow pt-1 pb-1 text-xl">
        <input
        className="focus:outline-none"
        value= {inputContent}
        required
        onChange = {(e: ChangeEvent<HTMLInputElement>)=>setInputContent(e.target.value) }
        ref={inputRef}
        onBlur={ctx.onNotAdd}
        type="text"
        >
        </input>
      </form>
    </li>
  )
}