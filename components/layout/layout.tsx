import {FC, Fragment, ReactNode} from "react";
import MainHeader from "./main-header";

const Layout: FC<{ children: ReactNode }> = props => {
    const {children} = props;
    return (
        <Fragment>
            <MainHeader/>
            <main>
                {children}
            </main>
        </Fragment>
    )
}
export default Layout;