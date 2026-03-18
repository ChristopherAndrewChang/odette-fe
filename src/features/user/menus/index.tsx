"use client";

import { useState } from "react";

import Image from "next/image";

import Link from "next/link";

import { InputAdornment } from "@mui/material";

import UserContainer from "../shared/components/UserContainer";
import UserBackButton from "../shared/components/UserBackButton";
import CustomTextField from "@/@core/components/mui/TextField";
import MenuImage from "@/assets/menus/menu-1.jpg";
import MenuDetailDialog from "./components/MenuDetailDialog";

function MenuPage() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <MenuDetailDialog
                open={open}
                onClose={() => {
                    setOpen(false);
                }}
            />
            <UserContainer>
                <header className="flex flex-col gap-2 mb-8">
                    <UserBackButton href="/user/home" />
                    <p className="font-poppins text-4xl text-gray-300">Select our <span className="font-semibold text-white">best menu</span>, and <span className="font-semibold text-white">enjoy your night</span></p>
                </header>

                {/* custom search for user */}
                <CustomTextField
                    size="medium"
                    className="text-white bg-gray-300 rounded-lg w-full mb-6"
                    placeholder="Search your favourite menu"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <i className="tabler-search"></i>
                            </InputAdornment>
                        )
                    }}
                />

                {/* category */}
                <section className="flex overflow-x-auto gap-2 scrollbar-hide mb-6 sticky -top-6 bg-[#110232] py-4 px-2 border">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
                        <Link href={`#salad-${i}`} key={i} className="block bg-gray-900 px-4 py-2 rounded-xl border border-gray-700 flex-shrink-0">
                            <p className="text-white">Salad {i}</p>
                        </Link>
                    ))}
                </section>

                {/* menu */}
                {[1, 2, 3].map(j => (
                    <section key={j} className="grid grid-cols-2 gap-4 mb-8" id={`salad-${j}`}>
                        <p className="col-span-2 font-poppins text-white text-xl">Salad {j}</p>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
                            <div
                                onClick={() => {
                                    setOpen(true);
                                }}
                                key={i}
                                className="rounded-xl border bg-[#1b034b] border-[#250369] overflow-hidden"
                            >
                                <Image src={MenuImage.src} alt="Menu Image" width={250} height={250} className="w-full h-32 object-cover" />
                                <div className="p-4">
                                    <p className="text-white font-semibold font-poppins text-xl">Menu {i}</p>
                                    <p className="font-poppins text-white">Rp150.000</p>
                                </div>
                            </div>
                        ))}
                    </section>
                ))}
            </UserContainer>
        </>
    )
}

export default MenuPage;
