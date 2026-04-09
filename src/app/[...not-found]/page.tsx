"use client";

import Image from "next/image";

import OdetteLogo from "@assets/logo/odette-logo.png";

// Component Imports
// import Providers from '@components/Providers'
// import BlankLayout from '@layouts/BlankLayout'

const NotFoundPage = () => {

  return (

    // <Providers direction={"ltr"}>
    // {/* <BlankLayout systemMode={"light"}> */ }
    <div className="w-screen min-h-screen flex items-center justify-center">
      <Image src={OdetteLogo.src} alt="Odette Logo" width={250} height={250} />
    </div>

    // </BlankLayout>
    // </Providers>
  )
}

export default NotFoundPage
