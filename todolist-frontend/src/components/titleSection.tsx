import ItemShowConetxt from "@/store/item-show-context";
import { useContext, useState } from "react";
import DropdownItem from "./ui-components/dropdownMenu/dropdownItem";
import DropdownMenu from "./ui-components/dropdownMenu/dropdownMenu";
import { AddItemIcon, MenuIcon } from "./ui-components/icons";

export default function TitleSection () {

  const [isDropdownVisible, setIsDropDownVisible] = useState(false);
  const ctx = useContext(ItemShowConetxt);

  const showCompletedHandler = () => {
    ctx.onShow();
    setIsDropDownVisible(false);

  }

  const hideCompletedHandler = () => {
    ctx.onHide();
    setIsDropDownVisible(false);
  
  }

  const clearCompletedHandler = () => {
    ctx.onClear();
    ctx.onHide();
    setIsDropDownVisible(false);
  }

  return (
    <div className="flex text-uclablue items-center h-8">
    <div className="flex-1 font-bold text-xl ">Todo List</div>
    <button onClick={ctx.onAdd}>
      <AddItemIcon/>
    </button>
    <div className="relative h-8">
      <button onClick={()=>setIsDropDownVisible(!isDropdownVisible)}>
        <MenuIcon />
      </button>
      <DropdownMenu visible={isDropdownVisible}>
        {!ctx.showItems ? 
        <DropdownItem onClick={showCompletedHandler}> Show Completed</DropdownItem> 
        : 
        <>
        <DropdownItem onClick={hideCompletedHandler}>Hide Completed</DropdownItem>
        <DropdownItem onClick={clearCompletedHandler}>Clear Completed</DropdownItem>
        </>}
        
      </DropdownMenu>
    </div>
    </div>
  )
}