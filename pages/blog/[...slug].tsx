import {useRouter} from "next/router";

const BlogPage = () => {
    const router = useRouter();
    console.log(router.query);
    return (
        <div>
            <h1>The blog page</h1>
        </div>
    )
};

export default BlogPage;