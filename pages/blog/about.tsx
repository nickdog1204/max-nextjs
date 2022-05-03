import {useRouter} from "next/router";

const About = () => {
    const router = useRouter();
    console.log(router.query);
    return (
        <div>
            <h1>About the blog</h1>
        </div>
    )
}
export default About;