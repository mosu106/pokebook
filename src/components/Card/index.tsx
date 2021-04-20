import { FC } from 'react'
import style from './style.module.scss'

type ContainerProps = {
    id: string
    number?: string | null,
    name?: string | null,
    types?: (string | null)[] | null,
    image?: string | null
}

type Props = ContainerProps

const Component: React.FC<Props> = props => (
    <div className={style.wrap}>
        <div className={style.card}>
            <h3>{props.number}:{props.name}</h3>
            {props.name && props.image && <img className={style.image} src={props.image} alt={props.name} title={props.name}></img>}
            {props.types && props.types.map((v, index) => (<span key={props.id + index}>{v}</span>))}
        </div>
    </div>
)

export const Card: FC<ContainerProps> = props => {
    return (
        <Component
            id={props.id}
            number={props.number}
            name={props.name}
            types={props.types}
            image={props.image}
        />
    )
}