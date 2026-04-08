"use client";

import { useState } from "react";

import { CircularProgress } from "@mui/material";

import UserContainer from "../shared/components/UserContainer";
import UserBackButton from "../shared/components/UserBackButton";
import MenuDetailDialog from "./components/MenuDetailDialog";
import { useColor } from "@/hooks/color";
import { useMenusQuery } from "@/features/superuser/menus/hooks/menus";
import { usePromosQuery } from "@/features/superuser/menus/hooks/promos";

function MenuPage() {
    const [open, setOpen] = useState(false);
    const { DARKBLUE, GOLD, DARKGRAY } = useColor();

    const { data: menus, isFetching: fetchingMenus } = useMenusQuery({}, true);
    const { data: promos, isFetching: fetchingPromos } = usePromosQuery({}, true);

    return (
        <>
            <MenuDetailDialog
                open={open}
                onClose={() => {
                    setOpen(false);
                }}
            />
            <UserContainer>
                <header className="flex flex-col gap-2 mb-16">
                    <UserBackButton href="/user/home" />
                    <p className="font-poppins text-4xl text-gray-300">Select our <span className="font-semibold text-white">best menu</span>, and <span className="font-semibold text-white">enjoy your night</span></p>
                </header>

                {(!!promos?.data?.results?.length) ? (
                    <section className="flex flex-col gap-4 mb-8">
                        <div>
                            <p className="text-2xl font-semibold text-white">Promo</p>
                            <p className="text-xs" style={{ color: GOLD }}>Click the promo list to show the promo</p>
                        </div>

                        {fetchingPromos ? (
                            <CircularProgress size={18} className="text-white" />
                        ) : (
                            <>
                                {promos?.data?.results?.map((promo, i) => (
                                    <a href={promo.file_url} target="_blank" key={promo.id} className="block border rounded-xl cursor-pointer" style={{
                                        backgroundColor: DARKBLUE,
                                        borderColor: DARKGRAY
                                    }}>
                                        <p className="font-poppins text-white py-2 px-4">Promo {i + 1}<span className="text-xs italic">{" "}(click for full preview)</span></p>
                                        <iframe src={promo?.file_url?.replace("http://", "https://")} frameBorder="0" className="w-full pointer-events-none"></iframe>
                                    </a>
                                ))}
                            </>
                        )}
                    </section>
                ) : null}

                <section className="flex flex-col gap-4">
                    <div>
                        <p className="text-2xl font-semibold text-white">Menu</p>
                        <p className="text-xs" style={{ color: GOLD }}>Click the menu list to show the menu</p>
                    </div>

                    {fetchingMenus ? (
                        <CircularProgress size={18} className="text-white" />
                    ) : (
                        <>
                            {menus?.data?.results?.map((menu, i) => (
                                <a href={menu.file_url} target="_blank" key={menu.id} className="block border rounded-xl cursor-pointer" style={{
                                    backgroundColor: DARKBLUE,
                                    borderColor: DARKGRAY
                                }}>
                                    <p className="font-poppins text-white py-2 px-4">Menu {i + 1} <span className="text-xs italic">(click for full preview)</span></p>
                                    <iframe src={menu?.file_url?.replace("http://", "https://")} frameBorder="0" className="w-full pointer-events-none"></iframe>
                                </a>
                            ))}
                        </>
                    )}

                </section>

                {/* custom search for user */}
                {/* <CustomTextField
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
                /> */}

                {/* category */}
                {/* <section className="flex overflow-x-auto gap-2 scrollbar-hide mb-6 sticky -top-6 py-4 px-2 border" style={{
                    backgroundColor: DARKBG
                }}>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
                        <Link href={`#salad-${i}`} key={i} className="block bg-gray-900 px-4 py-2 rounded-xl border border-gray-700 flex-shrink-0">
                            <p className="text-white">Salad {i}</p>
                        </Link>
                    ))}
                </section> */}

                {/* menu */}
                {/* {[1, 2, 3].map(j => (
                    <section key={j} className="grid grid-cols-2 gap-4 mb-8" id={`salad-${j}`}>
                        <p className="col-span-2 font-poppins text-white text-xl">Salad {j}</p>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
                            <div
                                onClick={() => {
                                    setOpen(true);
                                }}
                                key={i}
                                className="rounded-xl border overflow-hidden"
                                style={{
                                    // backgroundColor: `${GOLD}15`,
                                    borderColor: OLD_GOLD
                                }}
                            >
                                <Image src={MenuImage.src} alt="Menu Image" width={250} height={250} className="w-full h-32 object-cover" />
                                <div className="p-4">
                                    <p className="text-white font-semibold font-poppins text-xl">Menu {i}</p>
                                    <p className="font-poppins text-white">Rp150.000</p>
                                </div>
                            </div>
                        ))}
                    </section>
                ))} */}
            </UserContainer>
        </>
    )
}

export default MenuPage;
