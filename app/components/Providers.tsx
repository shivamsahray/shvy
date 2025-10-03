"use client";

import React from "react"
import { ImageKitProvider } from "imagekitio-next";
import { SessionProvider } from "next-auth/react";

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;
const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;



export default function Providers({children}: {children: React.ReactNode}) {
    const authenticator = async () => {
    try{
        const response = await fetch("/api/imagekit");
        if(!response.ok){
            const errorText = await response.text();
            throw new Error(`Request failed with status ${response.status}: ${errorText}`)
        }
        const data = await response.json();
        const { signature, expire, token } = data;
        return { signature, expire, token };
    } catch (error) {
        console.log(error);
        throw new Error(`Authentication request failed ${error}`);
    }
    }
    return (
        <SessionProvider>
            <ImageKitProvider
                urlEndpoint={urlEndpoint}
                publicKey={publicKey}
                authenticator={authenticator}
            >
                {children}
            </ImageKitProvider>
        </SessionProvider>
    )
}