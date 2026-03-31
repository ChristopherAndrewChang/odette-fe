"use client";

type TGroupTitle = {
    title: string;
}

function GroupTitle({ title }: TGroupTitle) {
    return (
        <p className="uppercase font-poppins text-gray-500 mb-2">{title}</p>
    )
}

export default GroupTitle;
