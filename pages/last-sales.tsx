import {GetStaticProps, InferGetStaticPropsType, NextPage} from "next";
import {useEffect, useState} from "react";
import useSWR from 'swr';

interface ISale {
    id: string;
    username: string;
    volume: number
}

const LastSalesPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = props => {
    const [sales, setSales] = useState<ISale[]>(props.sales);
    console.log({sales});
    // const [isLoading, setIsLoading] = useState(false);

    const {data, error} =
        useSWR<any>('https://nick-tong-yu-func-testing-default-rtdb.firebaseio.com/sales.json', (url) =>
            fetch(url).then(it => it.json())
        )

    useEffect(() => {
        if (data) {
            const transformedSales: ISale[] = [];
            for (const key in data) {
                const sale = {
                    id: key as string,
                    username: data[key].username as string,
                    volume: data[key].volume as number
                }
                transformedSales.push(sale)
            }
            setSales(transformedSales);
        }

    }, [data]);

    // useEffect(() => {
    //     setIsLoading(true);
    //     const fetchSalesAsync = async () => {
    //         const response =
    //             await fetch('https://nick-tong-yu-func-testing-default-rtdb.firebaseio.com/sales.json')
    //         const data = await response.json()
    //         const transformedSales: ISale[] = [];
    //         for (const key in data) {
    //             const sale = {
    //                 id: key as string,
    //                 username: data[key].username as string,
    //                 volume: data[key].volume as number
    //             }
    //             transformedSales.push(sale)
    //         }
    //         setSales(transformedSales)
    //         setIsLoading(false);
    //     }
    //     fetchSalesAsync();
    // }, [])
    // if (isLoading) {
    //     return <p>Loadddddddddding...</p>
    // }
    if (error) {
        return <p>Faillled to load</p>
    }
    if (!data && !sales) {
        return <p>Loadddddddddding...</p>
    }
    // if (!sales) {
    //     return <p>No Data YET!!!</p>
    // }
    return (
        <ul>
            {sales?.map(sale => <li key={sale.id}>{sale.username} - ${sale.volume}</li>)}
        </ul>
    );
}
export default LastSalesPage;

export const getStaticProps: GetStaticProps<{ sales: ISale[] }> = async context => {
    console.log('GET STATTTIC')
    const fetchSalesAsync: () => Promise<ISale[]> = async () => {
        const response =
            await fetch('https://nick-tong-yu-func-testing-default-rtdb.firebaseio.com/sales.json')
        const data = await response.json()
        const transformedSales: ISale[] = [];
        for (const key in data) {
            const sale = {
                id: key as string,
                username: data[key].username as string,
                volume: data[key].volume as number
            }
            transformedSales.push(sale)
        }
        return transformedSales;
    }
    const sales = await fetchSalesAsync();
    return {
        props: {sales},
        revalidate: 20
    }


}