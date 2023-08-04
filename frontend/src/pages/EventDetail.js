import { useRouteLoaderData, json, redirect } from "react-router";

import EventItem from '../components/EventItem';
import { getAuthToken } from "../util/auth";

const EventDetailPage = () => {
    const data = useRouteLoaderData('event-detail');
    return (
        <>
            <EventItem event={data.event} />
        </>
    )
}

export default EventDetailPage;

export async function loader ({request,params}) {
    const id = params.eventId;
    const response = await fetch('http://localhost:8080/events/' + id);
    if(!response.ok) {
        throw json({message: '...Could not fetch details for the selected event....'}, {status: 500});
    } else {
        return response;
    }
}

export async function action({params, request}) {
    const eventId = params.eventId;
    const token = getAuthToken();
    const response = await fetch('http://localhost:8080/events/' + eventId, {
        method: request.method,
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });

    if(!response.ok) {
        throw json({message: '...Event could not be deleted...'}, {status: 500});
    }

    return redirect('/events');
}