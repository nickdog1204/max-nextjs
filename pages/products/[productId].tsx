import {GetStaticPaths, GetStaticProps, NextPage} from "next";
import {IProduct} from "../../models/product";
import {ParsedUrlQuery} from "querystring";
import path from "path";
import fs from "fs/promises";
import {Fragment} from "react";
import {useRouter} from "next/router";

interface IParams extends ParsedUrlQuery {
    productId: string
}

interface IProps {
    loadedProduct: IProduct | null
    productId?: string
}

const ProductDetailsPage: NextPage<IProps> = props => {
    const router = useRouter();
    if (router.isFallback) {
        return <h1>LOOOAAADDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDING</h1>
    }
    const {loadedProduct, productId} = props;
    // if(!loadedProduct) {
    //     throw new Error('UUUUUUUUUU')
    // }
    if (loadedProduct) {
        return (
            <Fragment>
                <h1>{loadedProduct.title}</h1>
                <p>{loadedProduct.description}</p>
            </Fragment>
        )
    }
    return (
        <h1>Page with id: {productId} does not exist</h1>
    )
}
export default ProductDetailsPage;

const getDataFromFileSystemAsync: () => Promise<IProduct[]> = async () => {
    const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
    const jsonString = (await fs.readFile(filePath)).toString();
    const {products} = JSON.parse(jsonString);
    return products
}

export const getStaticProps: GetStaticProps<IProps, IParams> = async context => {
    if (context.params) {
        const {productId} = context.params;
        if (!productId) {
            throw new Error('IIIIIIII')
        }
        const products = await getDataFromFileSystemAsync();
        const loadedProduct = (products as IProduct[]).find(product => product.id === productId)
        if (loadedProduct) {
            return {
                props: {loadedProduct}
            }
        } else {
            return {
                props: {loadedProduct: null, productId}
            }
            // return {
            //     notFound: true
            // }
            // throw new Error('NOOOOOOTTTT FOUND')
        }


    } else {
        throw new Error('NOOOOTTTT FOUND')
        // return {
        //     notFound: true
        // }
    }
}
export const getStaticPaths: GetStaticPaths<IParams> = async () => {
    const products = await getDataFromFileSystemAsync();
    const paths = products.map(product => {
        return {
            params: {productId: product.id}
        }
    })
    return {
        paths,
        fallback: true
    }
}