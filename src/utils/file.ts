// TODO: add handleFileResponse to planviu-core

export const handleFileResponse = (data: BlobPart, type: string) => {
    const blob = new Blob([data], { type: type });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');

    link.href = url;
    link.target = "_blank";

    link.click();
    link.remove();
}
