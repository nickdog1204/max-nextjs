import {GetServerSideProps, InferGetServerSidePropsType, NextPage} from "next";
import {useRouter} from "next/router";
import EventList from "../../components/events/event-list";
import {Fragment} from "react";
import ResultsTitle from "../../components/events/results-title";
import ErrorAlert from "../../components/ui/error-alert";
import Button from "../../components/ui/button";
import {IEventItem} from "../../models/events";
import {getFilteredEventsAsync, getFilteredEventsWithList} from "../../services";
import useSWR from 'swr';
import Head from "next/head";


const FilteredEventsPage: NextPage = props => {
    const router = useRouter();
    const slug = router.query.slug;
    const {data, error} = useSWR('https://nick-tong-yu-func-testing-default-rtdb.firebaseio.com/events.json',
        url => fetch(url).then(it => it.json()));
    if (!data) {
        return <h1>讀取中!!!!!!!!!!!!!!!!</h1>
    }
    const transformedEvents: IEventItem[] = [];
    for (const key in data) {
        const val = data[key];
        const eventItem: IEventItem = {
            id: key,
            date: val.date, description: val.description,
            image: val.image, isFeatured: val.isFeatured, location: val.location, title: val.title
        }
        transformedEvents.push(eventItem)
    }
    let pageHeader = (
        <Head>
            <title>篩選後的事件</title>
            <meta
                name="description"
                content="slug 讀取中"/>
        </Head>
    )

    // const {filteredEvents, hasError, year, month} = props;
    if (!slug) {
        return (
            <Fragment>
                {pageHeader}
                <p className='center'>Loadingggggggggggggggggggggggggggggggg</p>
            </Fragment>
        )
    }
    const [year, month] = (router.query.slug as string[]).map(it => +it);
    pageHeader = (
        <Head>
            <title>篩選後的事件</title>
            <meta
                name="description"
                content={`All events for the month: ${month + 1}/${year}`}/>
        </Head>
    )
    if (
        isNaN(year) ||
        isNaN(month) ||
        year > 2030 ||
        year < 2021 ||
        month < 0 ||
        month > 12
    ) {
        return (
            <Fragment>
                {pageHeader}
                <ErrorAlert>無效的篩選條件, 請重新選擇</ErrorAlert>
                <div className='center'>
                    <Button link='/events'>觀看全部活動</Button>
                </div>
            </Fragment>
        )
    }
    const filteredEvents = getFilteredEventsWithList({year, month}, transformedEvents);
    if (!filteredEvents || filteredEvents.length === 0) {
        return (
            <Fragment>
                {pageHeader}
                <ErrorAlert>沒有符合條件的活動</ErrorAlert>
                <div className='center'>
                    <Button link='/events'>觀看全部</Button>
                </div>
            </Fragment>
        )
    }
    // return (
    //     <Fragment>
    //         <ResultsTitle date={new Date(year, month)}/>
    //         <EventList items={filteredEvents}/>
    //     </Fragment>
    // )
    return (
        <Fragment>
            {pageHeader}
            <ResultsTitle date={new Date(year, month)}/>
            <EventList items={filteredEvents}/>
        </Fragment>
    )
};

export default FilteredEventsPage;

// export const getServerSideProps:
//     GetServerSideProps<{
//         filteredEvents: IEventItem[] | null;
//         hasError: boolean;
//         year: number;
//         month: number;
//     }> = async context => {
//     const {slug} = context.params!!;
//     const [year, month] = (slug as string[]).map(it => +it);
//     if (
//         isNaN(year) ||
//         isNaN(month) ||
//         year > 2030 ||
//         year < 2021 ||
//         month < 0 ||
//         month > 12
//     ) {
//         return {
//             props: {
//                 filteredEvents: null,
//                 hasError: true,
//                 year,
//                 month
//             }
//         }
//     }
//     const filteredEvents = await getFilteredEventsAsync({year, month});
//     return {
//         props: {
//             filteredEvents,
//             hasError: false,
//             year,
//             month
//         }
//     }
// }