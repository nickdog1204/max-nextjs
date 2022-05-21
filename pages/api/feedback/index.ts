import {NextApiHandler, NextApiRequest, NextApiResponse} from "next";
import path from "path";
import * as fs from "fs";

export interface IFeedback {
    id: string;
    email: string;
    text: string;
}

export const buildFilePath = () => {
    return path.join(process.cwd(), 'data', 'feedback.json');
}
export const extractFeedbackListFromFile = (filePath: string): IFeedback[] => {
    const fileData = fs.readFileSync(filePath);
    return JSON.parse(fileData.toString())
}

const handler: NextApiHandler = (req: NextApiRequest, res: NextApiResponse) => {
    if ('POST' === req.method) {
        const {body} = req;
        try {
            if (
                'email' in body &&
                typeof body.email === 'string' &&
                'text' in body &&
                typeof body.text === 'string'
            ) {
                const newFeedback: IFeedback = {
                    id: new Date().toISOString(),
                    email: body.email,
                    text: body.text
                }
                const filePath = buildFilePath();
                const data = extractFeedbackListFromFile(filePath)
                data.push(newFeedback)
                fs.writeFileSync(filePath, JSON.stringify(data));
                res.status(201).json({message: 'SUCCESSSS', feedback: newFeedback})
            }
            throw new Error("email or text is not a string");

        } catch (e) {
            res.status(403).json({err: "ERRRRRRORRRR!!!"})
        }
    } else {
        const filePath = buildFilePath();
        const feedbackList = extractFeedbackListFromFile(filePath)
        res.status(200).json({feedbackList})
    }
}
export default handler;