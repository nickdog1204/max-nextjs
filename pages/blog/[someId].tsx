import {useRouter} from "next/router";

const SomeId = () => {
    const router = useRouter();
    console.log(router.query);

    return (
        <div>
            <h1>Some id</h1>
        </div>
    )
}
export default SomeId;