import classes from './event-content.module.css';
import {FC, ReactNode} from "react";

const EventContent: FC<{ children: ReactNode }> = props => {
    return (
        <section className={classes.content}>
            {props.children}
        </section>
    );
}

export default EventContent;
