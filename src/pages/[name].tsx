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
        params: { name: pokemon?.name.toLowerCase() },
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

    if (!pokemon?.number
        || !pokemon?.name
        || !pokemon?.types
        || !pokemon?.resistant
        || !pokemon?.classification
        || !pokemon?.weaknesses
        || !pokemon?.image
        || !pokemon.height?.maximum
        || !pokemon.height?.minimum
        || !pokemon.weight?.maximum
        || !pokemon.weight?.minimum

    ) {
        return <DefaultErrorPage statusCode={404} />
    }

    return (
        <ApolloProvider client={client}>
            <div className={style.namePage}>
                {pokemon && <Detail
                    id={pokemon.id}
                    number={pokemon.number}
                    name={pokemon.name}
                    classification={pokemon.classification}
                    resistant={pokemon.resistant}
                    types={pokemon.types}
                    weekness={pokemon.weaknesses}
                    image={pokemon.image}
                    maxHeight={pokemon.height.maximum}
                    minHeight={pokemon.height.minimum}
                    maxWeight={pokemon.weight.maximum}
                    minWeight={pokemon.weight.minimum}
                />}
            </div>
        </ApolloProvider>
    )
}

export default DetailPage
