import type {NextPage} from "next";
import Link from 'next/link';


const Home: NextPage = () => {
    return (
        <div>
            <h1>Home Page!!!</h1>
            <ul>
                <li>
                    <Link href={"/clients"}>Clients</Link>
                </li>
            </ul>
        </div>
    )
}
export default Home;