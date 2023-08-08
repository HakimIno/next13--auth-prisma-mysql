"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

const SigninButton = () => {

    const { data: session } = useSession();
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        setLoading(false);
    }, [session]);

    if (loading) {
        return <p>Loading...</p>;
    }

   

    return (
        <button onClick={() => signIn()} className="text-green-600 ml-auto">
            Sign In
        </button>
    );
};

export default SigninButton;