"use client";

type TFillingGuidlines = {
    onClick?: () => void;
}

function FillingGuidlines({ onClick }: TFillingGuidlines) {
    return (
        <p
            onClick={onClick}
            className="border-b inline text-blue-600 cursor-pointer hover:border-b-blue-600 transition-all w-fit">See The Filling Guidelines</p>
    )
}

export default FillingGuidlines
