"use client";

import type { ReactNode } from "react";

import { Dialog, DialogContent } from "@mui/material";

import { useColor } from "@/hooks/color";

type TPaymentDialog = {
    open: boolean;
    onClose: () => void;
    renderButton: ReactNode;
}

function PaymentDialog({ onClose, open, renderButton }: TPaymentDialog) {
    const { DARKBLUE, DARKGRAY } = useColor();

    const _onClose = () => {
        onClose();
    }

    return (
        <Dialog open={open} onClose={_onClose} fullWidth>
            <DialogContent style={{ backgroundColor: DARKBLUE }}>
                <p className="font-outfit text-xl font-semibold text-white mb-4">Hello 👋 <br />you need to pay first before proceeding your request</p>

                <div style={{ backgroundColor: DARKGRAY }} className="p-4 rounded-lg flex flex-col gap-2 border border-gray-700 mb-4">
                    <p className="text-gray-400 font-outfit font-semibold">Payment Instruction</p>
                    <p className="text-gray-300">{"> Scan the QRIS code below using GoPay, OVO, DANA, or your mobile banking app"}</p>
                    <p className="text-gray-300">{"> "}Please make sure the payment amount matches exactly: <span className="font-semibold text-white">Rp</span></p>
                    <p className="text-gray-300"><span className="font-semibold text-white">{"> "}Required: Include the payment note/reference</span> with [Table Number] [Name] [Request Type]</p>
                </div>

                <div style={{ backgroundColor: DARKGRAY }} className="p-4 rounded-lg border border-gray-700 mb-4">
                    <p className="text-gray-400 font-outfit font-semibold text-lg mb-4">Scan Here to Pay</p>
                    <div className="grid lg:grid-cols-2 gap-2">
                        <div className="bg-white flex-1 w-full h-64 rounded-lg" />
                        <div className="flex flex-col gap-1 flex-1">
                            <p className="text-xl font-outfit font-medium text-white">BCA - Odette Buffet</p>
                            <p className="text-gray-400 font-outfit">a.n. Odette Buffet Lounge</p>

                            <div className="flex flex-wrap gap-1 border-t border-gray-800 pt-2">
                                <div className="border border-gray-600 rounded-lg px-2 py-1 text-gray-500 text-xs">
                                    M-Banking
                                </div>

                                <div className="border border-gray-600 rounded-lg px-2 py-1 text-gray-500 text-xs">
                                    Gopay
                                </div>

                                <div className="border border-gray-600 rounded-lg px-2 py-1 text-gray-500 text-xs">
                                    OVO
                                </div>

                                <div className="border border-gray-600 rounded-lg px-2 py-1 text-gray-500 text-xs">
                                    DANA
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* form */}
                <div style={{ backgroundColor: DARKGRAY }} className="p-4 rounded-lg border border-gray-700">
                    <div className="flex items-center gap-2 mb-4">
                        <p className="text-gray-300 font-semibold text-lg font-outfit">NOTES</p>
                        <div className="bg-red-950 px-3 py-1 rounded-full border border-red-800">
                            <p className="text-red-300 text-xs">Important</p>
                        </div>
                    </div>

                    <p className="text-gray-400 font-outfit font-semibold mb-2">You are required to include a payment note/reference when making the transfer</p>
                    <div className="p-4 border rounded-lg border-gray-600">
                        <p className="text-gray-400 font-outfit font-semibold">Contoh</p>
                        <p className="text-gray-100 font-outfit font-semibold text-lg">Table A1 - Dea - Running Text</p>
                        <p className="text-gray-400 font-outfit">[Table Number] [Name] [Request Type]</p>
                    </div>

                    {/* <input
                        placeholder="e.g. Starboy"
                        className="block w-full p-4 rounded-xl border text-white font-poppins text-lg focus:outline-none"
                        style={{
                            backgroundColor: DARKBLUE,
                            borderWidth: 0.4,
                            borderColor: false ? "#ef4444" : `${GRAY}70`
                        }}

                    // value={value}
                    // onChange={e => onChange(e.target.value)}
                    /> */}
                </div>

                {renderButton}
            </DialogContent>
        </Dialog>
    )
}

export default PaymentDialog
