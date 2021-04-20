import { NextPage } from 'next'
import client from "../../apollo-client";
import { GetAllPokemonsDocument, GetAllPokemonsQuery } from "../types.d"
import { Card } from "./../components/Card"
import style from "../style/index.module.scss"

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
    <div className={style.main}>
      {pokemons && pokemons.map((pokemon, index) =>
        pokemon && (
          <Card key={pokemon.id} id={pokemon.id} number={pokemon.number} name={pokemon.name} types={pokemon.types} image={pokemon.image} />)
      )}
    </div>
  )
}

export default Home
