"use client";

import Image from "next/image";

import OdetteLogo from "@assets/logo/odette-logo.png";
import { useIsPWA } from "@/hooks/pwa";

// Component Imports
// import Providers from '@components/Providers'
// import BlankLayout from '@layouts/BlankLayout'

const NotFoundPage = () => {
  const isPwa = useIsPWA();

  return (

    // <Providers direction={"ltr"}>
    // {/* <BlankLayout systemMode={"light"}> */ }
    <div className="w-screen min-h-screen flex items-center justify-center">
      <Image src={OdetteLogo.src} alt="Odette Logo" width={250} height={250} />

      {isPwa && (
        <p className="text-center mt-4 text-lg text-gray-600">
          PWA
        </p>
      )}
    </div>

    // </BlankLayout>
    // </Providers>
  )
}

export default NotFoundPage
