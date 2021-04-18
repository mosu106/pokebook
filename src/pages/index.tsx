import { NextPage } from 'next'
import client from "../../apollo-client";
import { GetAllPokemonsDocument, GetAllPokemonsQuery } from "../types.d"

export async function getServerSideProps() {

  const { data } = await client.query<GetAllPokemonsQuery>({
    query: GetAllPokemonsDocument,
  });

  return {
    props: {
      pokemons: data.pokemons
    },
  };
}

const Home: NextPage<GetAllPokemonsQuery> = ({ pokemons }) => {
  return (
    <div >
      {pokemons && pokemons.map((pokemon) => (
        <div key={pokemon?.number} >
          <h3>{pokemon?.number}:{pokemon?.name}</h3>
          {pokemon?.name && pokemon?.image && <img src={pokemon.image} alt={pokemon.name} title={pokemon.name}></img>}
          {pokemon?.types && pokemon.types.map((v) => (<span>{v}</span>))}
        </div>
      ))}
    </div>
  )
}

export default Home
