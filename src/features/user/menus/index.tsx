"use client";

import { useState } from "react";

import { CircularProgress, Tab, Tabs } from "@mui/material";

import UserContainer from "../shared/components/UserContainer";
import UserBackButton from "../shared/components/UserBackButton";
import MenuDetailDialog from "./components/MenuDetailDialog";
import MenuPdfCard from "./components/MenuPdfCard";
import { useColor } from "@/hooks/color";
import { useMenusQuery } from "@/features/superuser/menus/hooks/menus";
import { usePromosQuery } from "@/features/superuser/menus/hooks/promos";

function MenuPage() {
    const [open, setOpen] = useState(false);
    const { GOLD } = useColor();
    const [tab, setTab] = useState<"promo" | "menu" | null>(null);

    const { data: menus, isFetching: fetchingMenus, isLoading: loadingMenus } = useMenusQuery({ page_size: 100 }, true);
    const { data: promos, isFetching: fetchingPromos, isLoading: loadingPromos } = usePromosQuery({ page_size: 100 }, true);

    // promo tab only exists when there is an active promo, and opens first like before
    const hasPromo = !!promos?.data?.results?.length;
    const activeTab = (tab === "promo" && !hasPromo) ? "menu" : (tab ?? (hasPromo ? "promo" : "menu"));
    const isPromoTab = activeTab === "promo";

    const list = isPromoTab ? promos?.data?.results : menus?.data?.results;
    const isFetching = isPromoTab ? fetchingPromos : fetchingMenus;

    // hide the tabs until both lists are known, otherwise the tab jumps from menu to promo
    const isInitialLoading = loadingMenus || loadingPromos;

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

                {isInitialLoading ? (
                    <CircularProgress size={18} className="text-white" />
                ) : (
                    <>
                        <Tabs
                            value={activeTab}
                            onChange={(_, val) => setTab(val)}
                            variant="fullWidth"
                            className="mb-6"
                            sx={{
                                "& .MuiTab-root": { color: "rgba(255,255,255,0.6)", fontWeight: 600 },
                                "& .Mui-selected": { color: `${GOLD} !important` },
                                "& .MuiTabs-indicator": { backgroundColor: GOLD }
                            }}
                        >
                            {hasPromo ? <Tab label="Promo" value="promo" /> : null}
                            <Tab label="Menu" value="menu" />
                        </Tabs>

                        <section className="flex flex-col gap-4">
                            <p className="text-xs" style={{ color: GOLD }}>
                                {isPromoTab ? "Click the promo list to show the promo" : "Click the menu list to show the menu"}
                            </p>

                            {isFetching ? (
                                <CircularProgress size={18} className="text-white" />
                            ) : (
                                <>
                                    {list?.map(item => (
                                        <MenuPdfCard key={item.id} menu={item} />
                                    ))}
                                </>
                            )}
                        </section>
                    </>
                )}

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
