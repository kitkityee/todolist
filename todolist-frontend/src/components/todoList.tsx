import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { addTodos, completeTodo, getTodos } from "../pages/api/my-api";
import { todosKey } from "../../query-keys";
import TodoItem from "./todoItem";
import { useContext, MouseEventHandler, MouseEvent } from "react";
import ItemShowContext from "@/store/item-show-context";

interface Props {
  resetContent : () => boolean
}

export default function TodoList () {
    const queryClient = useQueryClient();
    const ctx = useContext(ItemShowContext);

    const todosQuery = useQuery({ queryKey: [todosKey], queryFn: getTodos })

    const mutation = useMutation({
        mutationFn: (data: {id: number, isCompleted: boolean}) => completeTodo(data.id, data.isCompleted),
        onSuccess: () => {
          // Invalidate and refetch
          queryClient.invalidateQueries({ queryKey: [todosKey] })
        }
      })
    
    const addItemMutation = useMutation ({
      mutationFn: (data: {id?:number, content:string}) => addTodos( data.content, data.id),
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: [todosKey] })
        ctx.onNotAdd();
        ctx.onAdd();
      }
    })

    const completedItems = todosQuery.data?.filter((todo)=> todo.isCompleted) ?? []
    const incompletedItems = todosQuery.data?.filter((todo)=> !todo.isCompleted) ?? []

    const shownItems = ctx.showItems ? [...incompletedItems, ...completedItems] : incompletedItems


    const todoItems = shownItems.map((todo) => (
        <TodoItem 
        key = {todo.id}
        todo = {todo}
        onClick = {()=>mutation.mutate({id: todo.id!, isCompleted: !todo.isCompleted})}
        onSubmit = {(content,id) => addItemMutation.mutate({content: content, id:id})}
        ></TodoItem>
    ))

    return (
      <div className="grow overflow-y-auto" onClick={ctx.onAdd}>
        <ul onClick={(e : MouseEvent<HTMLUListElement>) => {e.stopPropagation();}} className="grow overflow-y-auto">
          {todoItems}
          {ctx.addState && 
          <TodoItem 
          onSubmit={(content:string, id?:number)=> addItemMutation.mutate({content: content, id:id})} />}
        </ul>
      </div>
    )
}