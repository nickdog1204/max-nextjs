import Button from '../ui/button';
import classes from './results-title.module.css';
import {FC} from "react";

const ResultsTitle: FC<{ date: Date }> = (props) => {
    const {date} = props;

    const humanReadableDate = new Date(date).toLocaleDateString('zh-TW', {
        month: 'long',
        year: 'numeric',
    });

    return (
        <section className={classes.title}>
            <h1>Events in {humanReadableDate}</h1>
            <Button link='/events'>Show all events</Button>
        </section>
    );
}

export default ResultsTitle;
