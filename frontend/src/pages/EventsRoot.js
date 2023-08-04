import { Outlet } from "react-router";
import EventsNavigation from "../components/EventsNavigation";

const EventsRootLayout = () => {
    return (
        <>
            <EventsNavigation />
            <main>
                <Outlet />
            </main>
        </>
    )
}

export default EventsRootLayout;