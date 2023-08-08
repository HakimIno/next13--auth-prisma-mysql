"use client";

import { ThemeProvider } from "@material-tailwind/react";
import React, { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
interface Props {
    children: ReactNode;
}

const Providers = ({ children }: Props) => {
    return (
        <ThemeProvider>
            <SessionProvider>
                {children}
            </SessionProvider>
        </ThemeProvider>
    );
};

export default Providers;