import { FC } from 'react'
import style from './style.module.scss'

type ContainerProps = {
    id: string
    name: string
}

type Props = {
    id: string
    name: string
}

const Component: React.FC<Props> = props => (
    <div className={style.wrap}>
        {props.id}:{props.name}
    </div>
)

export const Detail: FC<ContainerProps> = props => {
    return <Component id={props.id} name={props.name} />
}
