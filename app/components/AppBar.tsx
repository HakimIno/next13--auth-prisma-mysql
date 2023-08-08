"use client";

import Link from 'next/link'
import React from 'react'
import SigninButton from './SigninButton'
import { Button, IconButton, MobileNav, Navbar, Typography } from '@material-tailwind/react';
import { signOut, useSession } from 'next-auth/react';

const AppBar = () => {

    const [openNav, setOpenNav] = React.useState(false);

    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false)
        );
    }, []);

    const navList = (
        <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <Link className="flex items-center" href={"/"}>
                    หน้าแรก
                </Link>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <Link className="flex items-center" href={"/UserPost"}>
                    สร้าง
                </Link>
            </Typography>

        </ul>
    );

    const { data: session } = useSession();

    return (
        <>

            <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4">
                <div className="flex items-center justify-between text-blue-gray-900">
                    <div className=" items-center flex">
                        <Typography
                            as="a"
                            href="/"
                            className="mr-4 cursor-pointer py-1.5 font-medium"
                        >
                            SSKRU
                        </Typography>
                        {session?.user && (
                            <div className="mr-4 hidden lg:block">{navList}</div>
                        )}

                    </div>
                    {session?.user && (
                        <div className="flex items-center gap-4">
                            <div className="hidden lg:block">
                                <div className="flex gap-4 ml-auto">
                                    <p className=" text-black hidden lg:block">{session.user.name}</p>
                                    <button onClick={() => signOut()} className="text-red-600">
                                        Sign Out
                                    </button>
                                </div>
                            </div>

                            <IconButton
                                variant="text"
                                className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                                ripple={false}
                                onClick={() => setOpenNav(!openNav)}
                            >
                                {openNav ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        className="h-6 w-6"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                )}
                            </IconButton>
                        </div>
                    )}
                </div>
                <MobileNav open={openNav}>
                    {navList}
                    {session?.user && (
                        <button onClick={() => signOut()} className="text-red-600">
                            Sign Out
                        </button>
                    )}
                </MobileNav>
            </Navbar>
        </>
    )
}

export default AppBar