import { createContext, useEffect, useState, ReactNode } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { clearCompleted, addTodos } from "@/pages/api/my-api"
import { todosKey } from "../../query-keys"

interface ItemShowContext {
  showItems: boolean
  addState: boolean
  onShow: () => void
  onHide: () => void
  onClear: () => void
  onAdd: () => void
  onNotAdd: ()=> void
}

interface Props {
  children: ReactNode
}

const ItemShowConetxt = createContext({} as ItemShowContext)

export function ItemShowConetextProvider({children}: Props) {

  const [showItemsState, setShowItemsState] = useState(false);
  const [addItemState, setAddItemState] = useState(false);
  const queryClient = useQueryClient();

  const clearMutation = useMutation({
    mutationFn: clearCompleted,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [todosKey] })
    }
  })

    return (
        <ItemShowConetxt.Provider 
        value={{
          showItems: showItemsState,
          addState: addItemState,
          onShow: ()=>setShowItemsState(true),
          onHide: ()=>setShowItemsState(false),
          onClear:() => clearMutation.mutate(),
          onAdd: () => setAddItemState(true),
          onNotAdd: () => setAddItemState(false)
        }}>{children}</ItemShowConetxt.Provider>
    )
}

export default ItemShowConetxt;