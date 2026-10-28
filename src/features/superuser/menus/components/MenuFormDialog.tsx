"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { Button, Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import { getErrorMessage, PvButtonForm, PvInput } from "@ozanplanviu/planviu-core";
import type { TAutocomplete } from "@ozanplanviu/planviu-core";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { useQueryClient } from "@tanstack/react-query";

import { useMenuMutation } from "../hooks/menus";
import type { TMenus } from "../types/menus";
import { QUERY_KEY } from "@/data/internal/query-keys";
import { toPageProtocol } from "@/utils/string";

const MAX_COVER_SIZE = 10 * 1024 * 1024; // 10MB, same as backend
const COVER_TYPES = ["image/jpeg", "image/png"];

type TMenuFormDialog = {
    open: boolean;
    onClose: () => void;
    defaultPdfType: string;

    // when set the dialog edits this pdf, otherwise it uploads a new one
    data?: TMenus | null;
}

type TRequest = {
    pdf_type: TAutocomplete | null;
    title: string;
    description: string;
    order: string;
}

// backend returns field errors as { field: ["message"] }, so keep the field name in the toast
const getFieldErrorMessage = (err: any) => {
    const data = err?.response?.data;
    const field = data && typeof data === "object" ? Object.keys(data)[0] : null;

    if (field && Array.isArray(data[field])) {
        return `${field}: ${data[field][0]}`;
    }

    return getErrorMessage(err);
}

function MenuFormDialog({ onClose, open, defaultPdfType, data }: TMenuFormDialog) {
    const isEdit = !!data;

    const queryClient = useQueryClient();

    const pdfInputRef = useRef<HTMLInputElement>(null);
    const coverInputRef = useRef<HTMLInputElement>(null);

    const [menuPdf, setMenuPdf] = useState<File | null>(null);
    const [coverImage, setCoverImage] = useState<File | null>(null);
    const [removeCover, setRemoveCover] = useState(false);

    const { control, handleSubmit, reset } = useForm<TRequest>({
        defaultValues: {
            pdf_type: { label: data?.pdf_type || defaultPdfType, value: data?.pdf_type || defaultPdfType },
            title: data?.title || "",
            description: data?.description || "",
            order: String(data?.order ?? 0)
        }
    });

    const coverPreview = useMemo(() => {
        if (coverImage) return URL.createObjectURL(coverImage);
        if (isEdit && !removeCover && data?.cover_url) return toPageProtocol(data.cover_url);

        return null;
    }, [coverImage, isEdit, removeCover, data?.cover_url]);

    useEffect(() => {
        return () => {
            if (coverImage && coverPreview) URL.revokeObjectURL(coverPreview);
        }
    }, [coverImage, coverPreview]);

    const _onClose = () => {
        onClose();
    }

    const { mutate, isPending } = useMenuMutation({
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.MENUS.INDEX]
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.MENUS.PROMOS]
            });
            toast.success("Success");
            reset();
            setMenuPdf(null);
            setCoverImage(null);
            setRemoveCover(false);
            _onClose();
        },
        onError: (err) => {
            toast.error(getFieldErrorMessage(err));
        }
    });

    const onCoverChange = (file?: File) => {
        if (!file) return;

        if (!COVER_TYPES.includes(file.type)) {
            toast.error("Thumbnail must be a JPG or PNG");

            return;
        }

        if (file.size > MAX_COVER_SIZE) {
            toast.error("Thumbnail must be 10MB or smaller");

            return;
        }

        setCoverImage(file);
        setRemoveCover(false);
    }

    const onSubmit = (form: TRequest) => {
        const order = Number(form.order || 0);

        if (!Number.isInteger(order) || order < 0) {
            toast.error("Order must be 0 or greater");

            return;
        }

        if (!isEdit) {
            if (!menuPdf) {
                toast.error("File is required");

                return;
            }

            const formData = new FormData();

            formData.append("pdf_type", form.pdf_type?.value || "");
            formData.append("title", form.title.trim());
            formData.append("file", menuPdf);
            if (form.description.trim()) formData.append("description", form.description.trim());
            if (coverImage) formData.append("cover_image", coverImage);
            formData.append("order", String(order));

            mutate({ method: "POST", data: formData });

            return;
        }

        // edit: only send what changed
        const changes: Record<string, string | number | boolean> = {};

        if (form.title.trim() !== data.title) changes.title = form.title.trim();
        if (form.description.trim() !== (data.description || "")) changes.description = form.description.trim();
        if (order !== data.order) changes.order = order;
        if (removeCover && !coverImage) changes.remove_cover = true;

        if (!Object.keys(changes).length && !coverImage) {
            _onClose();

            return;
        }

        if (coverImage) {
            // multipart is required when a file is sent
            const formData = new FormData();

            Object.entries(changes).forEach(([key, value]) => formData.append(key, String(value)));
            formData.append("cover_image", coverImage);

            mutate({ method: "PATCH", id: String(data.id), data: formData });
        } else {
            mutate({ method: "PATCH", id: String(data.id), data: changes });
        }
    }

    return (
        <Dialog open={open} onClose={_onClose} fullWidth>
            <DialogTitle>{isEdit ? "Edit Menu" : "Menu"}</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <PvInput
                        control={control}
                        name="pdf_type"
                        label="Pdf Type"
                        isSelectInput
                        disabled={isEdit}
                        selectOption={[
                            { label: "menu", value: "menu" },
                            { label: "promo", value: "promo" }
                        ]}
                    />

                    <PvInput
                        control={control}
                        name="title"
                        label="Title"
                        rules={{
                            required: "Title is required",
                            maxLength: { value: 100, message: "Title can't be longer than 100 characters" },
                            validate: v => (typeof v === "string" && !!v.trim()) || "Title is required"
                        }}
                    />

                    <PvInput
                        control={control}
                        name="description"
                        label="Description"
                        rules={{
                            maxLength: { value: 255, message: "Description can't be longer than 255 characters" }
                        }}
                    />

                    <PvInput
                        control={control}
                        name="order"
                        label="Order (lower shows first)"
                        type="number"
                    />

                    {/* pdf can't be replaced on edit, backend ignores `file` */}
                    {!isEdit ? (
                        <div>
                            <Typography className="mb-1">Upload your menu here</Typography>
                            <div onClick={() => pdfInputRef.current?.click()}>
                                <input
                                    ref={pdfInputRef}
                                    type="file"
                                    className="hidden"
                                    accept=".pdf"
                                    onChange={e => {
                                        if (!!e.target?.files?.[0]) {
                                            setMenuPdf(e.target.files[0]);
                                        }
                                    }}
                                />
                                <div className="p-6 w-full border rounded-lg flex items-center justify-center gap-2 mb-2 border-dashed cursor-pointer transition-all hover:border-blue-400 hover:border-solid">
                                    <i className="tabler-file text-lg text-gray-500"></i>
                                    <Typography className="text-gray-500">Select File</Typography>
                                </div>
                            </div>
                            {!!menuPdf ? (
                                <div className="flex items-start gap-2 bg-gray-50 py-1 px-2 rounded-xl border">
                                    <i
                                        onClick={() => setMenuPdf(null)}
                                        className="tabler-trash w-8 text-lg text-error cursor-pointer"></i>
                                    <Typography className="overflow-auto"><span className="text-black w-full">{menuPdf.name}</span></Typography>
                                </div>
                            ) : null}
                        </div>
                    ) : null}

                    <div>
                        <Typography className="mb-1">Thumbnail</Typography>
                        <Typography variant="caption" className="block mb-2 text-gray-500">
                            Optional. Landscape works best (e.g. 1200×600). Leave empty to use the first page of the PDF.
                        </Typography>

                        <input
                            ref={coverInputRef}
                            type="file"
                            className="hidden"
                            accept="image/jpeg,image/png"
                            onChange={e => {
                                onCoverChange(e.target.files?.[0]);
                                e.target.value = "";
                            }}
                        />

                        {coverPreview ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={coverPreview} alt="Thumbnail preview" className="w-full max-h-48 object-contain rounded-lg border mb-2" />
                        ) : null}

                        <div className="flex gap-2">
                            <Button variant="outlined" size="small" onClick={() => coverInputRef.current?.click()}>
                                {coverPreview ? "Change thumbnail" : "Select thumbnail"}
                            </Button>
                            {coverImage ? (
                                <Button variant="text" size="small" color="error" onClick={() => setCoverImage(null)}>
                                    Discard
                                </Button>
                            ) : null}
                            {isEdit && data?.cover_url && !coverImage && !removeCover ? (
                                <Button variant="text" size="small" color="error" onClick={() => setRemoveCover(true)}>
                                    Remove thumbnail
                                </Button>
                            ) : null}
                        </div>
                        {removeCover ? (
                            <Typography variant="caption" className="block mt-1 text-gray-500">
                                Thumbnail will go back to the first page of the PDF when you save.
                            </Typography>
                        ) : null}
                    </div>

                    <PvButtonForm
                        variant="modal"
                        onClose={_onClose}
                        isPending={isPending}
                    />
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default MenuFormDialog
