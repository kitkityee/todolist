interface Props {
    children: React.ReactNode,
    visible: boolean
}

export default function DropdownMenu ({children, visible} : Props) {
    return ( 
        <>                  
        <div className={`absolute text-white -translate-x-[4px] hidden ${!visible ? "" : "lg:block"}`}>
            <svg className="fill-current rotate-180 w-[32px] h-[13px]" xmlns="http://www.w3.org/2000/svg">
                <path className="arrow" d="M0-.5h32v1c-1.835 0-3.582.754-4.805 2.072l-7.873 8.492c-1.775 1.915-4.869 1.915-6.644 0L4.805 2.572A6.554 6.554 0 000 .5v-1z"  stroke="#D3D3D3" fill="inherit"></path></svg>
        </div>
        <div className={`absolute -translate-x-[160px] translate-y-2 w-48 ${!visible ? "hidden" : ""}`}>
            <div className="rounded-lg py-1 flex flex-col bg-white border-[#D3D3D3] border-[1.2px] drop-shadow-lg">
                {children}
            </div>
        </div>
        </>
    )
}