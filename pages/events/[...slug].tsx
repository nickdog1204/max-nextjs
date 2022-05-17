import {GetServerSideProps, InferGetServerSidePropsType, NextPage} from "next";
import {useRouter} from "next/router";
import {getFilteredEvents} from "../../dummy-data";
import EventList from "../../components/events/event-list";
import {Fragment} from "react";
import ResultsTitle from "../../components/events/results-title";
import ErrorAlert from "../../components/ui/error-alert";
import Button from "../../components/ui/button";
import {IEventItem} from "../../models/events";
import {getFilteredEventsAsync} from "../../services";

const FilteredEventsPage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = props => {
    // const router = useRouter();
    // const slug = router.query.slug;
    const {filteredEvents, hasError, year, month} = props;
    // if (!slug) {
    //     return (
    //         <p className='center'>Loading</p>
    //     )
    // }
    // const [year, month] = (router.query.slug as string[]).map(it => +it);
    if (
        hasError
    ) {
        return (
            <Fragment>
                <ErrorAlert>無效的篩選條件, 請重新選擇</ErrorAlert>
                <div className='center'>
                    <Button link='/events'>觀看全部活動</Button>
                </div>
            </Fragment>
        )
    }
    // const filteredEvents = getFilteredEvents({year, month});
    if (!filteredEvents || filteredEvents.length === 0) {
        return (
            <Fragment>
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
            <ResultsTitle date={new Date(year, month)}/>
            <EventList items={filteredEvents}/>
        </Fragment>
    )
};

export default FilteredEventsPage;

export const getServerSideProps:
    GetServerSideProps<{
    filteredEvents: IEventItem[] | null;
    hasError: boolean;
    year: number;
    month: number;
}> = async context => {
    const {slug} = context.params!!;
    const [year, month] = (slug as string[]).map(it => +it);
    if (
        isNaN(year) ||
        isNaN(month) ||
        year > 2030 ||
        year < 2021 ||
        month < 0 ||
        month > 12
    ) {
        return {
            props: {
                filteredEvents: null,
                hasError: true,
                year,
                month
            }
        }
    }
    const filteredEvents = await getFilteredEventsAsync({year, month});
    return {
        props: {
            filteredEvents,
            hasError: false,
            year,
            month
        }
    }
}