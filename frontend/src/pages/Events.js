import { Suspense } from 'react';
import { useLoaderData, json, defer, Await } from 'react-router';

import EventsList from '../components/EventsList';

function EventsPage() {
    const { events } = useLoaderData();

    return (
        <Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>}>
            <Await resolve={events}>
                {(loadedEvents) => <EventsList events={loadedEvents} />}
            </Await>
        </Suspense>
    )
}

export default EventsPage;


export async function loadEvents () {
    const response = await fetch('http://localhost:8080/events');
    if (!response.ok) {
        // alternative way to throw error as Response using stringify to convert the objects to json 
        // throw new Response(JSON.stringify({message: '...Could not fetch events....'}), {status: 500});
        // alternative utility function to throw error..directly converts to objects
        throw json({message: '...Could not fetch events....'}, {status: 500});
    } else {
        const resData = await response.json();
        return resData.events;
    }
}
export function loader () {
    return defer({
        events: loadEvents()
    })
}
