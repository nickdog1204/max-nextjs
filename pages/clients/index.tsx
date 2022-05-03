import Link from "next/link";

const ClientsPage = () => {
    const clientList = [
        {id: 'max', name: 'Maximillan'},
        {id: 'manu', name: 'Manuel'},
        {id: 'nick', name: '謝東宇'}
    ]
    return (
        <div>
            <h1>Clients Index Page</h1>
            <ul>
                {clientList.map(client => {
                    return (
                        <li key={client.id}>
                            <Link href={{
                                pathname: '/clients/[id]',
                                query: {id: client.id}
                            }}>{client.name}</Link>
                        </li>
                    )
                })}
            </ul>

        </div>

    )
}
export default ClientsPage;