import {GetServerSideProps, InferGetServerSidePropsType, NextPage} from "next";


type PagePropsType = InferGetServerSidePropsType<typeof getServerSideProps>;

const UserProfilePage: NextPage<PagePropsType> = props => {
    const {userName} = props;
    return (
        <div>
            <h1>{userName}</h1>
        </div>
    )
}
export default UserProfilePage;

export const getServerSideProps:
    GetServerSideProps<{ userName: string }> =
    async context => {
        return {
            props: {
                userName: '謝東宇'
            }
        }
    }