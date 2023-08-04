import { Outlet } from "react-router";
import { useLoaderData, useSubmit } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import { useEffect } from "react";
import { getTokenDuration } from "../util/auth";

const RootLayout = () => {
    const token = useLoaderData();
    const submit = useSubmit();

    useEffect(() => {
        if(!token) {
            return;
        }
        if(token === 'EXPIRED') {
            submit(null, {action: '/logout', method: 'post'});
        }
        const tokenDuration = getTokenDuration();
        console.log(tokenDuration);
        setTimeout(() => {
            submit(null,{action: '/logout', method: 'post'});
        }, 3600000);

    }, [token, submit])

    return (
        <>
            <MainNavigation />
            <main>
                <Outlet />
            </main>
        </>
    )
}

export default RootLayout;