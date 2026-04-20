"use client";

import { useState } from "react";

import { Controller, useForm } from "react-hook-form";

import { Button, CircularProgress } from "@mui/material";

import toast from "react-hot-toast";

import { getErrorMessage } from "@ozanplanviu/planviu-core";

import { useQueryClient } from "@tanstack/react-query";


import { APP_URL } from "@/data/internal/app-route";
import UserBackButton from "../shared/components/UserBackButton";
import UserContainer from "../shared/components/UserContainer";
import { useColor } from "@/hooks/color";
import GroupTitle from "../screen-takeover/components/GroupTitle";
import HistoryButton from "../shared/components/HistoryButton";
import ListRequestSongDrawer from "./components/ListRequestSongDrawer";
import { useSongRequestMutation } from "./hooks/song-request";
import { QUERY_KEY } from "@/data/internal/query-keys";

type TRequest = {
    song_title: string;
    artist: string;
    donation_amount: string;
    donation: string;
};

function SongRequest() {
    const defaultValue: TRequest = ({
        artist: "",
        donation_amount: "",
        song_title: "",
        donation: ""
    });

    const queryClient = useQueryClient();

    const { DARKBLUE, GOLD, GRAY, PURPLE } = useColor();

    const { control, setValue, watch, handleSubmit, reset } = useForm<TRequest>({
        defaultValues: defaultValue
    })

    const { mutate, isPending } = useSongRequestMutation({
        onSuccess: () => {
            toast.success("Success");
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.MY_SONG_REQUEST.INDEX]
            });
            reset(defaultValue);
        },
        onError: (err) => {
            toast.error(getErrorMessage(err));
        }
    });

    // const { data, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useMySongRequestInfiniteQuery();
    // const songs = data?.pages.flatMap(song => song?.data?.results);

    // const { lastElementRef, nextPageFetchingIndicator } = useInfiniteScroll({
    //     onNextPage: fetchNextPage,
    //     props: {
    //         hasNextPage: hasNextPage,
    //         isFetching: isFetching,
    //         isFetchingNextPage: isFetchingNextPage,
    //         isLoading: isLoading
    //     }
    // });

    // const [openDialog, setOpenDialog] = useState(false);
    const [openRequestSongList, setOpenRequestSongList] = useState(false);

    const onSubmit = (data: TRequest) => {
        if (!data?.donation || (data?.donation === "custom" && !data?.donation_amount)) {
            toast.error("Invalid Tip Amount");
        }

        mutate({
            method: "POST",
            data: {
                ...data,
                donation_amount: data?.donation === "custom" ? data?.donation_amount : data?.donation
            }
        });
    }

    return (
        <>
            {/* <SubmitRequestDialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
            /> */}

            <ListRequestSongDrawer
                open={openRequestSongList}
                onClose={() => {
                    setOpenRequestSongList(false);
                }}
            />
            <UserContainer>
                <div className="mb-4 flex justify-between gap-4 items-center">
                    <UserBackButton href={APP_URL.USER_HOME.INDEX} />
                    <HistoryButton
                        onClick={() => {
                            setOpenRequestSongList(true);
                        }}
                    />
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* TODO: make the input below into component */}
                    <div className="mb-4">
                        <GroupTitle title="Song Title" />
                        <Controller
                            control={control}
                            name="song_title"
                            rules={{
                                required: {
                                    value: true,
                                    message: "This field is required"
                                }
                            }}
                            render={({ field: { value, onChange }, fieldState: { error } }) => (
                                <>
                                    <input
                                        placeholder="e.g. Starboy"
                                        className="block w-full p-4 rounded-xl border text-white font-poppins text-lg focus:outline-none"
                                        style={{
                                            backgroundColor: DARKBLUE,
                                            borderWidth: 0.4,
                                            borderColor: !!error?.message ? "#ef4444" : `${GRAY}70`
                                        }}
                                        value={value}
                                        onChange={e => onChange(e.target.value)}
                                    />
                                    {!!error?.message ? (
                                        <p className="mt-2 text-red-500">This field is required</p>
                                    ) : null}
                                </>
                            )}
                        />
                    </div>

                    <div className="mb-8">
                        <GroupTitle title="Artist" />
                        <Controller
                            control={control}
                            name="artist"
                            rules={{
                                required: {
                                    value: true,
                                    message: "This field is required"
                                }
                            }}
                            render={({ field: { value, onChange }, fieldState: { error } }) => (
                                <>
                                    <input
                                        placeholder="e.g. The Weekend"
                                        className="block w-full p-4 rounded-xl border text-white font-poppins text-lg focus:outline-none"
                                        style={{
                                            backgroundColor: DARKBLUE,
                                            borderWidth: 0.4,
                                            borderColor: !!error?.message ? "#ef4444" : `${GRAY}70`
                                        }}
                                        value={value}
                                        onChange={e => onChange(e.target.value)}
                                    />
                                    {!!error?.message ? (
                                        <p className="mt-2 text-red-500">This field is required</p>
                                    ) : null}
                                </>
                            )}
                        />
                    </div>

                    <div className="mb-4">
                        <GroupTitle title="Tip Amount" />
                        <div className="grid grid-cols-3 gap-4 mb-4">
                            {[10000, 25000, 50000, 100000, 250000, 500000].map(num => (
                                <div
                                    key={num}
                                    onClick={() => {
                                        setValue("donation", num?.toString());
                                    }}
                                    className="py-2 px-4 rounded-xl"
                                    style={{
                                        borderWidth: 0.2,
                                        borderColor: (watch("donation") !== num?.toString()) ? `${GRAY}80` : PURPLE,
                                        backgroundColor: (watch("donation") !== num?.toString()) ? DARKBLUE : `${PURPLE}60`,
                                        color: (watch("donation") !== num?.toString()) ? GRAY : GOLD
                                    }}
                                >
                                    <p className="font-poppins text-center text-gray-400 font-medium">Rp{num.toLocaleString("ID")}</p>
                                </div>
                            ))}

                            <div
                                onClick={() => {
                                    setValue("donation", "custom");
                                }}
                                className="py-2 px-4 rounded-xl"
                                style={{
                                    borderWidth: 0.2,
                                    borderColor: (watch("donation") !== "custom") ? `${GRAY}80` : PURPLE,
                                    backgroundColor: (watch("donation") !== "custom") ? DARKBLUE : `${PURPLE}60`,
                                    color: (watch("donation") !== "custom") ? GRAY : GOLD
                                }}
                            >
                                <p className="font-poppins text-center text-gray-400 font-medium">Custom</p>
                            </div>

                            <Controller
                                control={control}
                                name="donation_amount"
                                render={({ field: { value, onChange } }) => (
                                    <input
                                        type="text"
                                        placeholder="Type Custom Amount"
                                        value={value}
                                        onChange={onChange}
                                        className="block col-span-2 w-full px-4 py-2 rounded-xl border text-white font-poppins placeholder:text-gray-400 focus:outline-none"
                                        disabled={(watch("donation") !== "custom")}
                                        style={{
                                            backgroundColor: (watch("donation") === "custom") ? DARKBLUE : `${GRAY}70`,
                                            borderWidth: 0.4,
                                            borderColor: `${GRAY}70`
                                        }}
                                    />
                                )}
                            />
                        </div>
                    </div>

                    {/* submit button */}
                    <Button
                        type="submit"

                        // color="warning"
                        size="large"
                        variant="contained"
                        fullWidth
                        className="text-white my-3 bg-purple-950"
                        style={{
                            // backgroundImage: `linear-gradient(to right, ${GOLD}, ${GOLD},${GOLD}, ${GOLD}, ${GOLD},${GOLD}90)`
                        }}>
                        {isPending ? <CircularProgress size={20} className="text-white" /> : "Send and Pay"}
                    </Button>

                    <p className="text-gray-400 text-sm text-center">Min tip Rp10.000 - Subject to approval</p>
                </form>

                {/* <main className="flex flex-col gap-4">
                    <Button onClick={() => setOpenDialog(true)} fullWidth variant="tonal" className="bg-gray-800 text-white">New Request</Button>

                    {isFetching ? (
                        <CircularProgress size={18} className="text-white" />
                    ) : (
                        <>
                            {songs?.map((songReq, i) => (
                                <>
                                    <div key={songReq.id} style={{ backgroundColor: DARKBLUE }} className="rounded-xl p-4">
                                        <p className="font-poppins text-white">{songReq.song_title}</p>
                                        <p className="font-poppins" style={{ color: GOLD }}>{songReq.artist}</p>
                                        <p className="font-poppins" style={{ color: GRAY }}>Status: {songReq.status}</p>
                                    </div>

                                    {(((i + 1) === songs.length) && hasNextPage) ? (
                                        <div ref={lastElementRef}>
                                            {nextPageFetchingIndicator}
                                        </div>
                                    ) : null}
                                </>
                            ))}
                        </>
                    )}
                </main> */}
            </UserContainer>
        </>
    )
}

export default SongRequest;
