import {IEventItem} from "../models/events";

export const fetchEventsAsync: () => Promise<IEventItem[]> = async () => {
    const res = await fetch('https://nick-tong-yu-func-testing-default-rtdb.firebaseio.com/events.json');
    const data = await res.json();
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
    return transformedEvents;
}

export async function getFilteredEventsAsync(dateFilter: { year: number, month: number }) {
    const {year, month} = dateFilter;
    return (await fetchEventsAsync()).filter((event) => {
        const eventDate = new Date(event.date);
        const dateFullYear = eventDate.getFullYear();
        const dateMonth = eventDate.getMonth();
        console.log({dateFullYear, dateMonth});
        return eventDate.getFullYear() === year && eventDate.getMonth() === month;
    });
}

export function getFilteredEventsWithList(dateFilter: { year: number, month: number }, list: IEventItem[]) {
    const {year, month} = dateFilter;

    return list.filter((event) => {
        const eventDate = new Date(event.date);
        const dateFullYear = eventDate.getFullYear();
        const dateMonth = eventDate.getMonth();
        console.log({dateFullYear, dateMonth});
        return eventDate.getFullYear() === year && eventDate.getMonth() === month;
    });
}
