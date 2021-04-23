import { FC } from 'react'
import style from './style.module.scss'

type ContainerProps = {
    type: string
}

type Props = ContainerProps

const Component: React.FC<Props> = props => (
    <span className={style.type} data-type={props.type.toLowerCase()}>
        {props.type}
    </span>
)

export const TypeTag: FC<ContainerProps> = props => {
    return (
        <Component
            type={props.type}
        />
    )
}