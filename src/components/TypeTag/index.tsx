import { FC } from 'react'
import style from './style.module.scss'

type ContainerProps = {
    type: string
    size?: 'medium' | 'large'
}

type Props = ContainerProps

const Component: React.FC<Props> = props => (
    <span className={style.type} data-type={props.type.toLowerCase()} data-size={props.size}>
        {props.type}
    </span >
)

export const TypeTag: FC<ContainerProps> = ({ type, size = 'medium' }) => {
    return (
        <Component
            type={type}
            size={size}
        />
    )
}