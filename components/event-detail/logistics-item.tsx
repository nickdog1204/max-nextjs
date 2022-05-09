import classes from './logistics-item.module.css';
import {Component, FC, ReactNode} from "react";

const LogisticsItem: FC<{ icon: FC; children: ReactNode }> = props => {
    const {icon: Icon} = props;

    return (
        <li className={classes.item}>
            <span className={classes.icon}>
                <Icon/>
            </span>
            <span className={classes.content}>{props.children}</span>
        </li>
    );
}

export default LogisticsItem;
