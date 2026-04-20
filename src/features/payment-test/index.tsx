// "use client";

// import { useEffect } from "react";

// import { Button } from "@mui/material";

// function PaymentTest() {
//     useEffect(() => {
//         const script = document.createElement("script");

//         script.type = "text/javascript";
//         script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
//         script.setAttribute("data-client-key", "Mid-client-cKtFFbx7uGU3oE9H");

//         document.body.appendChild(script);

//         return () => {
//             document.body.removeChild(script);
//         };
//     }, []);

//     return (
//         <Button
//             variant="outlined"
//             onClick={() => {
//                 window?.snap?.pay("95a61eea-2d31-4b59-99ea-5f6b006a07b1", {
//                     onSuccess: function (result: any) { console.log('success'); console.log(result); },
//                     onPending: function (result: any) { console.log('pending'); console.log(result); },
//                     onError: function (result: any) { console.log('error'); console.log(result); },
//                     onClose: function () {
//                         console.log('customer closed the popup without finishing the payment');
//                     }
//                 })
//             }}>Klik untuk bayar</Button>
//     )
// }

// export default PaymentTest;
