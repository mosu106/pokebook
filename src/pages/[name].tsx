import { NextPage } from 'next'
import style from "../style/index.module.scss"
import { useRouter } from "next/router";
import { Detail } from "../components/Detail"
import DefaultErrorPage from 'next/error'
import { ApolloProvider } from '@apollo/client';
import { GetAllPokemonsDocument, GetAllPokemonsQuery, GetPokemonDocument, GetPokemonQuery } from "../types.d"
import client from "../../apollo-client";
import { GetStaticProps, GetStaticPaths } from 'next';


export const getStaticPaths: GetStaticPaths = async () => {
    const { data } = await client.query<GetAllPokemonsQuery>({
        query: GetAllPokemonsDocument,
    });

    if (!data.pokemons) {
        return {
            paths: [],
            fallback: false
        }
    }

    const paths = data.pokemons.flatMap(pokemon => (pokemon?.name ? {
        params: { name: pokemon?.name },
    } : []))

    return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async context => {
    const params = context.params

    if (!params?.name) {
        throw Error('404')
    }
    const { data } = await client.query<GetPokemonQuery>({
        query: GetPokemonDocument,
        variables: {
            name: params.name
        }
    });

    return {
        props: {
            pokemon: data.pokemon
        },
    };

}


const DetailPage: NextPage<GetPokemonQuery> = ({ pokemon }) => {
    const router = useRouter();
    const { name } = router.query;

    if (typeof name !== "string") {
        return <DefaultErrorPage statusCode={404} />
    }

    if (!pokemon?.name || !pokemon?.types) {
        return <DefaultErrorPage statusCode={404} />
    }

    return (
        <ApolloProvider client={client}>
            <div className={style.main}>
                {pokemon && <Detail id={pokemon.id} name={pokemon.name} />}
            </div>
        </ApolloProvider>
    )
}

export default DetailPage
