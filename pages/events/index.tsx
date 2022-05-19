import EventList from "../../components/events/event-list";
import {getAllEvents} from "../../dummy-data";
import {Fragment} from "react";
import EventsSearch from "../../components/events/events-search";
import {useRouter} from "next/router";
import {GetStaticProps, InferGetStaticPropsType, NextPage} from "next";
import {IEventItem} from "../../models/events";
import {fetchEventsAsync} from "../../services";
import Head from "next/head";

const AllEventsPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = props => {
    const {events} = props;
    const router = useRouter();
    const formValuesCapturedHandler = (year: string, month: string) => {
        console.log({year, month});
        router.push(`/events/${year}/${month}`);
    };
    return (
        <Fragment>
            <Head>
                <title>所有事件</title>
                <meta
                    name="description"
                    content="Find a lot of great events that allow you to evolve"/>
            </Head>

            <EventsSearch onFormValuesCaptured={formValuesCapturedHandler}/>
            <EventList items={events}/>
        </Fragment>
    )
};
export default AllEventsPage;

export const getStaticProps: GetStaticProps<{
    events: IEventItem[]
}> = async context => {
    const events = await fetchEventsAsync();
    return {
        props: {events},
        revalidate: 60
    }
}