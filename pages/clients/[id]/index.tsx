import {useRouter} from "next/router";


const ClientProjectIndexPage = () => {
    const router = useRouter();
    console.log(router.query);
    const loadProjectAHandler = () => {
        router.push({
            pathname: '/clients/[id]/[clientProjectId]',
            query: {
                id: router.query.id,
                clientProjectId: 'projectAAAA'
            }
        })
    }
    return (
        <div>
            <h1>All projects for a given client</h1>
            <button onClick={loadProjectAHandler}>觀看Project A的細節</button>
        </div>
    )
}

export default ClientProjectIndexPage;