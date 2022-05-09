import classes from './error-alert.module.css';
import {FC, ReactNode} from "react";

const ErrorAlert: FC<{ children: ReactNode }> = (props) => {
    return <div className={classes.alert}>{props.children}</div>;
}

export default ErrorAlert;
