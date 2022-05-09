import {NextPage} from "next";
import {useRouter} from "next/router";
import {getFilteredEvents} from "../../dummy-data";
import EventList from "../../components/events/event-list";
import {Fragment} from "react";
import ResultsTitle from "../../components/events/results-title";
import ErrorAlert from "../../components/ui/error-alert";
import Button from "../../components/ui/button";

const FilteredEventsPage: NextPage = () => {
    const router = useRouter();
    const slug = router.query.slug;
    if (!slug) {
        return (
            <p className='center'>Loading</p>
        )
    }
    const [year, month] = (router.query.slug as string[]).map(it => +it);
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
                <ErrorAlert>無效的篩選條件, 請重新選擇</ErrorAlert>
                <div className='center'>
                    <Button link='/events'>觀看全部活動</Button>
                </div>
            </Fragment>
        )
    }
    const filteredEvents = getFilteredEvents({year, month});
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
    return (
        <Fragment>
            <ResultsTitle date={new Date(year, month)}/>
            <EventList items={filteredEvents}/>
        </Fragment>
    )
};

export default FilteredEventsPage;