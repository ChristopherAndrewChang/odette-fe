// TODO: add handleFileResponse to planviu-core

export const handleFileResponse = (data: BlobPart, type: string, mode?: "download" | "view") => {
    const blob = new Blob([data], { type: type });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');

    link.href = url;

    if (mode === "download") {
        link.download = "Document";
        link.click();
    } else {
        link.target = "_blank";

        link.click();
    }

    link.remove();
}
