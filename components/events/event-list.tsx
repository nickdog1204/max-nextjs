import {FC} from "react";
import {IEventItem} from "../../models/events";
import EventItem from "./event-item";
import classes from "./event-list.module.css";

const EventList: FC<{ items: IEventItem[] }> = props => {
    const {items} = props;
    return (
        <ul className={classes.list}>
            {items.map(event => (
                <EventItem
                    key={event.id}
                    id={event.id}
                    title={event.title}
                    description={event.description}
                    location={event.location}
                    date={event.date}
                    image={event.image} isFeatured={event.isFeatured}/>
            ))}
        </ul>
    )
}
export default EventList;