interface Props {
  onClick: () => void
  children: React.ReactNode;
}

export default function DropdownItem ( {onClick , children} : Props ) {
    return ( 
      <button onClick={onClick} className="text-xl py-1 px-2 hover:bg-aliceblue text-black">
          {children}
      </button>
    )
}