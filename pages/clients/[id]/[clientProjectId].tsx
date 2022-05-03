import {useRouter} from "next/router";

const ClientProjectDetailsPage = () => {
    const router = useRouter();
    console.log(router.query);
    return (
        <div>
            <h1>The project details page for a selected client</h1>
        </div>
    )
}
export default ClientProjectDetailsPage;