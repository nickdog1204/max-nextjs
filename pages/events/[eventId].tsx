import {GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage} from "next";
import {useRouter} from "next/router";
import {getEventById} from "../../dummy-data";
import {Fragment} from "react";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";
import {ParsedUrlQuery} from "querystring";
import {fetchEventsAsync} from "../../services";
import {IEventItem} from "../../models/events";

interface IParams extends ParsedUrlQuery {
    eventId: string
}

interface IProps {
    foundEvent: IEventItem | null;
    eventId: string
}

const EventDetailsPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = props => {
    const router = useRouter();
    if (router.isFallback) {
        return (
            <ErrorAlert>
                <p>讀取中，讀取中</p>
            </ErrorAlert>
        )
    }
    // const eventId = router.query.eventId as string;
    const {foundEvent, eventId} = props;
    if (!foundEvent) {
        return (
            <ErrorAlert>
                <p>無法找到id為{eventId}的頁面</p>
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

export const getStaticPaths: GetStaticPaths<IParams> = async context => {
    const eventIds = (await fetchEventsAsync())
        .filter(event => event.isFeatured)
        .map(event => event.id);
    const paths = eventIds.map(eventId => ({params: {eventId}}))
    return {
        paths,
        fallback: true
    }
}
export const getStaticProps: GetStaticProps<IProps, IParams> = async context => {
    const {eventId} = context.params!!
    const events = await fetchEventsAsync();
    const foundEvent = events.find(event => event.id === eventId);
    if (!foundEvent) {
        return {
            props: {
                foundEvent: null,
                eventId,
            },
            revalidate: 30
        }

    }
    return {
        props: {
            foundEvent,
            eventId
        },
        revalidate: 30
    }
}