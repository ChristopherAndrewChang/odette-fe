"use client";

import Image from "next/image";

import { Dialog, DialogContent, Divider } from "@mui/material";

import MenuImage from "@/assets/menus/menu-1.jpg";

type TMenuDetailDialog = {
    open: boolean;
    onClose: () => void;
}

function MenuDetailDialog({ onClose, open }: TMenuDetailDialog) {
    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogContent className="bg-gray-200">
                <Image src={MenuImage.src} alt="Menu Image" width={350} height={350} className="w-full h-64 object-cover mb-4 rounded-xl" />
                <div>
                    <p className="text-xl font-semibold font-poppins">Menu Detail</p>
                    <p className="font-poppins">Rp150.000</p>
                </div>
                <Divider className="my-3" />
                <div>
                    <p className="font-semibold mb-1">Description</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem rem neque tenetur delectus impedit veniam, harum vel quas iste cupiditate. Dolorem nulla cum ut eius quidem numquam eum vero ducimus!</p>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default MenuDetailDialog
