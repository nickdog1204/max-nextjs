import EventList from "../../components/events/event-list";
import {getAllEvents} from "../../dummy-data";
import {Fragment} from "react";
import EventsSearch from "../../components/events/events-search";
import {useRouter} from "next/router";

const AllEventsPage = () => {
    const events = getAllEvents();
    const router = useRouter();
    const formValuesCapturedHandler = (year: string, month: string) => {
        console.log({year, month});
        router.push(`/events/${year}/${month}`);
    };
    return (
        <Fragment>
            <EventsSearch onFormValuesCaptured={formValuesCapturedHandler}/>
            <EventList items={events}/>
        </Fragment>
    )
};
export default AllEventsPage;