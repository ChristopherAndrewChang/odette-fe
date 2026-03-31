"use client";

import { Controller, useForm } from "react-hook-form";

import classNames from "classnames";

import { useColor } from "@/hooks/color";
import UserBackButton from "../shared/components/UserBackButton";
import UserContainer from "../shared/components/UserContainer";

import GroupTitle from "./components/GroupTitle";

const CONTENT_TYPE_DATA: { label: string; icon: string; key: string; }[] = [
    { key: "text", label: "Text", icon: "tabler-message" },
    { key: "image", label: "Image", icon: "tabler-photo" },
    { key: "video", label: "Video", icon: "tabler-video" }
]

type TRequest = {
    content_type: string;
    message: string;
}

function ScreenTakeover() {
    const { control, setValue, watch } = useForm<TRequest>({
        defaultValues: {
            content_type: "text",
            message: ""
        }
    });

    const { OLD_GOLD, GOLD, GRAY, DARKBG, DARKBLUE } = useColor();

    return (
        <UserContainer>
            <header className="mb-8">
                <div className="mb-6">
                    <UserBackButton href="/user/home" />
                </div>
                <p className="text-white font-poppins font-semibold text-center text-3xl">Screen Takeover</p>
            </header>

            <main>
                {/* content type */}
                <div className="mb-8">
                    <GroupTitle title="Content Type" />
                    <div className="grid grid-cols-3 gap-4">
                        {CONTENT_TYPE_DATA.map((contentType) => (
                            <div
                                key={contentType.key}
                                onClick={() => {
                                    setValue("content_type", contentType.key);
                                }}
                                className="flex items-center justify-center gap-2 text-white p-4 border border-gray-800 rounded-xl"
                                style={{
                                    borderWidth: 0.2,
                                    borderColor: (watch("content_type") !== contentType.key) ? `${GRAY}80` : GOLD,
                                    backgroundColor: (watch("content_type") !== contentType.key) ? DARKBG : OLD_GOLD,
                                    color: (watch("content_type") !== contentType.key) ? GRAY : GOLD
                                }}
                            >
                                <i className={classNames(contentType.icon, "text-lg")}></i>
                                <p className="font-poppins">{contentType.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* message */}
                <div className="mb-8">
                    <GroupTitle title="Your Message" />
                    <Controller
                        control={control}
                        name="message"
                        render={({ field: { value, onChange } }) => (
                            <textarea
                                placeholder="e.g. Happy Birthday You"
                                className="block w-full p-4 rounded-xl border text-white font-poppins text-lg focus:outline-none"
                                style={{
                                    backgroundColor: DARKBLUE,
                                    borderWidth: 0.4,
                                    borderColor: `${GRAY}70`
                                }}
                                value={value}
                                onChange={e => onChange(e.target.value)}
                            />
                        )}
                    />
                </div>

                {/* sawer amount */}
                <div className="">
                    <GroupTitle title="Sawer Amount" />
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        {[10000, 25000, 50000, 100000, 250000, 500000].map(num => (
                            <div key={num} className="py-2 px-4 rounded-xl" style={{ backgroundColor: DARKBLUE, borderWidth: 0.4, borderColor: `${GRAY}70` }}>
                                <p className="font-poppins text-center text-gray-400 font-medium">Rp{num.toLocaleString("ID")}</p>
                            </div>
                        ))}

                        <input
                            type="text"
                            placeholder="Or Type Custom Amount"
                            className="block col-span-3 w-full p-4 rounded-xl border text-white font-poppins placeholder:text-gray-400 focus:outline-none"
                            style={{
                                backgroundColor: DARKBLUE,
                                borderWidth: 0.4,
                                borderColor: `${GRAY}70`
                            }}
                        />
                    </div>
                </div>

                {/* submit button */}
                <div className="p-4 text-black font-poppins text-lg text-center font-semibold rounded-xl mb-4" style={{
                    backgroundImage: `linear-gradient(to right, ${GOLD}, ${GOLD},${GOLD}, ${GOLD}, ${GOLD},${GOLD}90)`
                }}>
                    <p>Kirim dan Bayar</p>
                </div>

                <p className="text-gray-400 text-sm text-center">Min sawer Rp10.000 - Subject to approval</p>
            </main>
        </UserContainer>
    )
}

export default ScreenTakeover;
