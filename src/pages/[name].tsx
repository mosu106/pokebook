import { NextPage } from 'next'
import style from "../style/index.module.scss"
import { useRouter } from "next/router";
import { Detail } from "../components/Detail"
import DefaultErrorPage from 'next/error'
import { ApolloProvider } from '@apollo/client';
import client from "../../apollo-client";


const DetailPage: NextPage = () => {
    const router = useRouter();
    const { name } = router.query;

    if (typeof name !== "string") {
        return <DefaultErrorPage statusCode={404} />
    }

    return (
        <ApolloProvider client={client}>
            <div className={style.main}>
                <Detail name={name} />
            </div>
        </ApolloProvider>
    )
}

export default DetailPage
