"use client";

import { useRouter } from "next/navigation";

import { LuDices, LuMonitor, LuUtensilsCrossed } from "react-icons/lu";

import { PiMusicNotesPlus } from "react-icons/pi";

import { Button, CircularProgress } from "@mui/material";

import CardMenu from "./components/CardMenu";
import UserContainer from "../shared/components/UserContainer";
import { STORAGE_KEY } from "@/data/internal/storage";
import Logo from "@/components/layout/shared/Logo";
import { useGetSettings } from "@/features/superuser/settings/hooks/settings";
import { onLogout } from "@/utils/logout";
import { APP_URL } from "@/data/internal/app-route";

function HomePage() {
    const router = useRouter();
    const { data, isFetching } = useGetSettings();

    return (
        <UserContainer>
            {/* velvet header */}
            {/* <div className="flex items-center gap-2 mb-8">
                <HiSparkles className="text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" />
                <p
                    className="text-yellow-400 text-lg font-bold font-poppins drop-shadow-[0_0_5px_rgba(250,204,21,0.3)]"
                    style={{ letterSpacing: 8 }}
                >ODETTE</p>
                <HiSparkles className="text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" />
            </div> */}

            <div className="mb-8 flex justify-center">
                <Logo
                    noText
                />
            </div>

            {/* welcome */}
            <section className="flex flex-col gap-2 mb-8">
                <Button variant="outlined" color="error" size="small" onClick={() => {
                    onLogout();
                    router.push(APP_URL.USER_SCAN.INDEX);
                }} className="w-fit mb-4">
                    Logout
                </Button>
                <p className="text-gray-300 text-lg font-poppins">Welcome Back,</p>
                <p className="text-5xl text-white font-bold font-poppins mb-4">Mr/Ms. {localStorage.getItem(STORAGE_KEY.USER_NAME)}</p>

                {/* table badge */}
                <div className="px-4 py-1 rounded-full border border-yellow-600/50 w-fit bg-[#281F27] shadow-[0_0_15px_rgba(202,138,4,0.15)]">
                    <p className="text-yellow-500 font-medium font-poppins">Table {localStorage.getItem(STORAGE_KEY.USER_TABLE)}</p>
                </div>
            </section>

            {isFetching ? <CircularProgress size={20} className="text-white" /> : (
                <section className="grid grid-cols-2 mt-16 gap-4">
                    {/* card food and drinks - Purple Theme */}
                    {data?.data?.menu_enabled ? (
                        <CardMenu
                            href="/user/menus"
                            icon={<LuUtensilsCrossed className="text-5xl text-purple-300 mb-6 drop-shadow-[0_0_12px_rgba(216,180,254,0.4)]" />}
                            textHeading="Food & Drinks"
                            textSubtitle="View Menu"
                            bgAndBorderClassName="bg-gradient-to-r from-[#1E0A35] via-[#1E0A35] to-[#230D46] border-purple-900/50 shadow-lg shadow-purple-900/20"
                        />
                    ) : null}

                    {/* card screen takeover - Blue Theme */}
                    {data?.data?.screen_request_enabled ? (
                        <CardMenu
                            href="/user/screen-takeover"
                            icon={<LuMonitor className="text-5xl text-blue-300 mb-6 drop-shadow-[0_0_12px_rgba(147,197,253,0.4)]" />}
                            textHeading="Screen"
                            textSubtitle="Takeover"
                            bgAndBorderClassName="bg-gradient-to-r from-[#0B1F39] to-[#0E2A53] border-blue-900/50 shadow-lg shadow-blue-900/20"
                        />
                    ) : null}

                    {/* card request a song - Red Theme */}
                    {data?.data?.song_request_enabled ? (
                        <CardMenu
                            href="/user/song-request"
                            icon={<PiMusicNotesPlus className="text-5xl text-red-300 mb-6 drop-shadow-[0_0_12px_rgba(252,165,165,0.4)]" />}
                            textHeading="Request"
                            textSubtitle="A Song"
                            bgAndBorderClassName="bg-gradient-to-r from-[#260C0A] to-[#440D0E] border-red-950/50 shadow-lg shadow-red-900/20"
                        />
                    ) : null}

                    {/* card mini games - Green Theme */}
                    <CardMenu
                        href="/user/games"
                        icon={<LuDices className="text-5xl text-emerald-300 mb-6 drop-shadow-[0_0_12px_rgba(110,231,183,0.4)]" />}
                        textHeading="Mini"
                        textSubtitle="Games"
                        bgAndBorderClassName="bg-gradient-to-r from-[#0C1912] to-[#102513] border-green-950/50 shadow-lg shadow-green-900/20"
                    />

                    {/* card now playing */}
                    {/* <div className="flex flex-col gap-1 bg-gradient-to-r from-[#171723] to-[#161723] p-4 rounded-2xl border border-gray-800 col-span-2 shadow-lg shadow-black/50">
                    <div className="flex items-center gap-2 mb-1">
                        <LuMusic className="text-gray-400 animate-pulse" />
                        <p className="text-gray-500 cursor-pointer font-poppins text-sm uppercase tracking-wider">Now Playing</p>
                    </div>
                    <p className="text-lg font-poppins font-semibold text-white">The Beatles - Hey Jude</p>
                    <LottieMusicWaves />
                </div> */}
                </section>
            )}
        </UserContainer>
    )
}

export default HomePage;
