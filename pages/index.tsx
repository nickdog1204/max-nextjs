import EventList from "../components/events/event-list";
import {getFeaturedEvents, getFilteredEvents} from "../dummy-data";
import {GetStaticProps, InferGetStaticPropsType, NextPage} from "next";
import {IEventItem} from "../models/events";
import {fetchEventsAsync} from "../services";

const HomePage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = props => {
    const {featuredEvents} = props;
    // const featuredEvents = getFeaturedEvents();
    return (
        <div>
            <EventList items={featuredEvents}/>
        </div>
    )
}
export default HomePage;

export const getStaticProps: GetStaticProps<{
    featuredEvents: IEventItem[]
}> = async context => {
    const transformedEvents = await fetchEventsAsync();
    const featuredEvents = transformedEvents.filter(it => it.isFeatured)
    return {
        props: {
            featuredEvents
        },
        revalidate: 1800
    }
}