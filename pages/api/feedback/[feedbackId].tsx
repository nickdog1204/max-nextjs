import {NextApiRequest, NextApiResponse} from "next";
import {buildFilePath, extractFeedbackListFromFile, IFeedback} from "./index";

export interface IFeedbackResponseData {
    foundFeedbackItem?: IFeedback;
    errMsg?: string
}

const handler = (req: NextApiRequest, res: NextApiResponse<IFeedbackResponseData>) => {
    const targetFeedbackId: string = req.query.feedbackId as string;
    const filePath = buildFilePath();
    const feedbackItems: IFeedback[] = extractFeedbackListFromFile(filePath);
    const foundFeedbackItem: IFeedback | undefined
        = feedbackItems.find(feedbackItem => feedbackItem.id === targetFeedbackId);
    if (foundFeedbackItem) {
        res.status(200).json({foundFeedbackItem})
    } else {
        res.status(400).json({errMsg: `Cannot find the feedback with id:\"${targetFeedbackId}\"`})
    }
}
export default handler;