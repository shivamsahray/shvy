"use client";

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react'

function Header(){

    const { data: session } = useSession();
    const {showNotification} = useNotification();

    const handleSignOut = async () => {
        try {
            await signOut();
        } catch (error) {
            
        }
    }

    return (
        <div>
            <button onClick={handleSignOut}>Sign Out</button>
            <Link href="/login">Login</Link>
            <Link href='/register'>Register</Link>
        </div>
    )
}

export default Header;