import {GetServerSideProps, InferGetServerSidePropsType, NextPage} from "next";

const UserPage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = props => {
    return (
        <h1>{props.id}</h1>
    )
}
export default UserPage;

export const getServerSideProps: GetServerSideProps<{ id: string }, { uid: string }> = async context => {
    const {params, req, res} = context;
    if (!params) {
        return {
            notFound: true
        }
    }
    const {uid} = params;
    return {
        props: {
            id: 'userId-' + uid
        }
    }


}