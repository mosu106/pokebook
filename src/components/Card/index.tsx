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
            <div className={style.image}>
                {props.name && props.image && <img src={props.image} alt={props.name} title={props.name}></img>}
            </div>
            <div className={style.detail}>
                <span className={style.name}>{props.number}:{props.name}</span>
                <div className={style.type}>
                    {props.types && props.types.map((v, index) => (<span key={props.id + index}>{v}</span>))}
                </div>
            </div>
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