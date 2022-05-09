import {FC, FormEventHandler, useRef} from "react";
import Button from "../ui/button";
import classes from "./events-search.module.css";

const EventsSearch: FC<{
    onFormValuesCaptured: (myYear: string, month: string) => void
}> = props => {
    const yearRef = useRef<HTMLSelectElement>(null);
    const monthRef = useRef<HTMLSelectElement>(null);
    const {onFormValuesCaptured} = props;

    const submitHandler: FormEventHandler = (event) => {
        event.preventDefault();
        const yearVal = yearRef.current?.value;
        const monthVal = monthRef.current?.value;
        if (yearVal && monthVal) {
            onFormValuesCaptured(yearVal, monthVal);
        } else {
            throw new Error('year and month cannot be nullllllllllll');
        }
    }
    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <div className={classes.controls}>
                <div className={classes.control}>
                    <label htmlFor="year">年</label>
                    <select name="year"
                            id="year"
                            ref={yearRef}>
                        <option value="2021">二零二一年</option>
                        <option value="2022">二零二二年</option>
                    </select>
                </div>
                <div className={classes.control}>
                    <label htmlFor="month">月份</label>
                    <select name="month"
                            id="month"
                            ref={monthRef}>
                        <option value="0">一月</option>
                        <option value="1">二月</option>
                        <option value="2">三月</option>
                        <option value="3">四月</option>
                        <option value="4">五月</option>
                        <option value="5">六月</option>
                        <option value="6">七月</option>
                        <option value="7">八月</option>
                        <option value="8">九月</option>
                        <option value="9">十月</option>
                        <option value="10">十一月</option>
                        <option value="11">十二月</option>
                    </select>
                </div>
                <Button link={null}>篩選</Button>
            </div>
        </form>
    )
}

export default EventsSearch;