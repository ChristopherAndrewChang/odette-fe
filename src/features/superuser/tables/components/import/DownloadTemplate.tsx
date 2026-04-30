"use client";

function DownloadTemplate() {
    const getCsvURL = () => {
        const csvContent = "number,new_number";

        const csvFile = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(csvFile);

        return url;
    }

    const onDownloadTemplate = () => {
        const a = document.createElement("a");

        a.href = getCsvURL();
        a.download = "Table Management Template.csv";

        a.click();
    }

    return (
        <p
            onClick={onDownloadTemplate}
            className="border-b inline text-blue-600 cursor-pointer hover:border-b-blue-600 transition-all w-fit">Download template here</p>
    )
}

export default DownloadTemplate;
