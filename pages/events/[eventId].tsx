import {NextPage} from "next";
import {useRouter} from "next/router";
import {getEventById} from "../../dummy-data";
import {Fragment} from "react";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";

const EventDetailsPage: NextPage = () => {
    const router = useRouter();
    const eventId = router.query.eventId as string;
    const foundEvent = getEventById(eventId);
    if (!foundEvent) {
        return (
            <ErrorAlert>
                <p>無法找到頁面</p>
            </ErrorAlert>
        )
    }
    const {
        title,
        date,
        location,
        image,
        description
    } = foundEvent;
    return (
        <div>
            <Fragment>
                <EventSummary title={title}/>
                <EventLogistics
                    date={date}
                    address={location}
                    image={image}
                    imageAlt={title}/>
                <EventContent>
                    {description}
                </EventContent>

            </Fragment>
        </div>
    )

};
export default EventDetailsPage;