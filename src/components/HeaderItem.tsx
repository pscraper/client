import React from "react";


interface HeaderItemProps {
    text: string
    onClick: (e: React.MouseEvent<HTMLElement>) => void
}


const HeaderItem = ({text, onClick}: HeaderItemProps) => {
    return (
        <button onClick={e => onClick(e)}>
            <p className="font-sans font-semibold text-[#DEEBFF] text-14">{text}</p>
        </button>
    )
}


export default HeaderItem;