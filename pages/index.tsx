import {NextPage} from "next";
import {FormEvent, useRef, useState} from "react";
import {IFeedback} from "./api/feedback";

interface IReqBody {
    email: string;
    text: string;
}

const HomePage: NextPage = props => {
    const [feedbackList, setFeedbackList] = useState<IFeedback[]>([]);
    const emailInputRef = useRef<HTMLInputElement>(null);
    const feedbackInputRef = useRef<HTMLTextAreaElement>(null);

    const submitHandlerAsync = async (event: FormEvent) => {
        event.preventDefault();
        const emailValue = emailInputRef.current?.value;
        const feedbackValue = feedbackInputRef.current?.value;
        if (emailValue && feedbackValue) {
            const reqBody: IReqBody =
                {email: emailValue, text: feedbackValue}
            const res = await fetch('/api/feedback', {
                method: 'POST',
                body: JSON.stringify(reqBody),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await res.json();
            console.log({responseData: data})
        }
    }
    const loadFeedbackListHandlerAsync = async () => {
        const res = await fetch('/api/feedback');
        const data: { feedbackList: IFeedback[] } = await res.json();
        setFeedbackList(data.feedbackList);
    }
    return (
        <div>
            <h1>The Home Page</h1>
            <form onSubmit={submitHandlerAsync}>
                <div>
                    <label htmlFor="email">email</label>
                    <input type="email" id="email" ref={emailInputRef}/>
                </div>
                <div>
                    <label htmlFor="feedback">feedback</label>
                    <textarea id="feedback" rows={5} ref={feedbackInputRef}/>
                </div>
                <button>Send Feedback</button>
            </form>
            <hr/>
            <hr/>
            <button onClick={loadFeedbackListHandlerAsync}>Load feedback list</button>
            <div>
                <ul>
                    {feedbackList.map(it => <li key={it.id}>{it.text}</li>)}
                </ul>
            </div>
        </div>
    )
}
export default HomePage;