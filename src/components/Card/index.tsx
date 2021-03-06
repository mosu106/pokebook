import { FC } from 'react'
import style from './style.module.scss'
import Link from 'next/link'
import { TypeTag } from '../TypeTag'
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

type ContainerProps = {
    id: string
    number?: string | null,
    name?: string | null,
    types?: (string | null)[] | null,
    image?: string | null
}

type Props = ContainerProps

console.log(publicRuntimeConfig.basePath)

const Component: React.FC<Props> = props => (
    <Link href={`${publicRuntimeConfig.basePath}/[name]`} as={`${publicRuntimeConfig.basePath}/${props.name?.toLowerCase()}`}>
        <a className={style.wrap}>
            <div className={style.card}>
                <div className={style.image}>
                    {props.name && props.image && <img src={props.image} alt={props.name} title={props.name}></img>}
                </div>
                <div className={style.detail}>
                    <span className={style.name}>{props.number}:{props.name}</span>
                    <div className={style.typeWrap}>
                        {props.types && props.types.filter((v): v is NonNullable<typeof v> => v != null).map((v, index) => (<div className={style.typeTag} key={props.id + index} ><TypeTag type={v} /></div>))}
                    </div>
                </div>
            </div>
        </a>
    </Link >
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