import Document, {Html, Head, Main, NextScript} from "next/document";

class MyDocument extends Document {
    render(): JSX.Element {
        return (
            <Html lang="zh-tw">
                <Head/>
                <body>
                <div id="overlay"></div>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        )
    }
}
export default MyDocument;