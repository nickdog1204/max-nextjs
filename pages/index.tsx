import {GetStaticProps, InferGetStaticPropsType, NextPage} from "next";
import fs from 'fs/promises';
import path from 'path';
import {IProduct} from "../models/product";
import Link from "next/link";

export const getStaticProps: GetStaticProps<{ products: IProduct[] }> = async context => {
    console.log('(Re-)generating')
    const dataPath = path.join(process.cwd(), 'data', 'dummy-backend.json');
    const response = await fs.readFile(dataPath);
    const data: { products: IProduct[] } = JSON.parse(response.toString());
    // if (!data) {
    //     return {
    //         props: {products: []},
    //         redirect: {
    //             destination: '/no-data'
    //         }
    //     }
    // }
    // if (0 === data.products.length) {
    //     return {
    //         notFound: true
    //     }
    // }
    return {
        props: {products: data.products},
        revalidate: 10
    }
}

const HomePage: NextPage<{ products: IProduct[] }> = ({products}: InferGetStaticPropsType<typeof getStaticProps>) => {

    return (
        <div>
            <ul>
                {products.map(product =>
                    <li key={product.id}>
                        <Link href={`/products/${product.id}`}>
                            <a>{product.title}</a>
                        </Link>
                    </li>)}
            </ul>
        </div>
    )
}
export default HomePage;