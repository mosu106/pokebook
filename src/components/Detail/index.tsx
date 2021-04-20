import { FC } from 'react'
import { useGetPokemonQuery, GetPokemonQuery } from "../../types.d"
import style from './style.module.scss'

type ContainerProps = {
    name: string
}

type Props = {
    data: GetPokemonQuery | undefined
}

const Component: React.FC<Props> = props => (
    <div className={style.wrap}>
        {props.data?.pokemon && props.data.pokemon.name}
    </div>
)

export const Detail: FC<ContainerProps> = props => {
    const { data, error, loading } = useGetPokemonQuery({
        variables: { name: props.name }
    })
    return <Component data={data} />
}
