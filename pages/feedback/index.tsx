import {GetStaticProps, InferGetStaticPropsType, NextPage} from "next";
import {buildFilePath, extractFeedbackListFromFile, IFeedback} from "../api/feedback";
import {IFeedbackResponseData} from "../api/feedback/[feedbackId]";
import {useState} from "react";

const FeedbackPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = props => {
    const {feedbackItems} = props;
    const [foundFeedbackItem, setFoundFeedbackItem] = useState<IFeedback>();
    const getDetailsHandlerAsync = async (id: string) => {
        const res = await fetch(`/api/feedback/${id}`)
        if (res.ok) {
            const data: IFeedbackResponseData = await res.json();
            if (data.foundFeedbackItem) {
                setFoundFeedbackItem(data.foundFeedbackItem)
            }
        } else {
        }

    }
    return (
        <div>
            <hr/>
            {foundFeedbackItem && foundFeedbackItem.text}
            <hr/>
            <ul>
                {feedbackItems.map(feedback =>
                    (
                        <li key={feedback.id}>
                            {feedback.text}
                            <button onClick={getDetailsHandlerAsync.bind(null, feedback.id)}>Get Details</button>
                        </li>
                    )
                )}
            </ul>
        </div>
    )

}
export default FeedbackPage;

export const getStaticProps: GetStaticProps<{ feedbackItems: IFeedback[] }> = context => {
    const filePath = buildFilePath();
    const feedbackItems = extractFeedbackListFromFile(filePath);
    return {
        props: {
            feedbackItems
        }
    }
}