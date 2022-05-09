import {FC, ReactNode} from "react";
import Link from "next/link";
import classes from "./button.module.css";


const Button: FC<{ children: ReactNode, link: string | null }> = props => {
    const {children, link} = props;
    if (link) {
        return (
            <Link href={link}>
                <a className={classes.btn}>{children}</a>
            </Link>
        )
    }
    return (
        <button className={classes.btn}>{children}</button>
    )

}
export default Button;