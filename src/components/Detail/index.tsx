import { FC } from 'react'
import style from './style.module.scss'
import { TypeTag } from '../TypeTag'

type ContainerProps = {
    id: string
    number: string
    name: string
    types: (string | null)[]
    classification: string
    weekness: (string | null)[]
    resistant: (string | null)[]
    image: string
    maxHeight: string
    minHeight: string
    maxWeight: string
    minWeight: string
}

type Props = ContainerProps

const Component: React.FC<Props> = props => (
    <>
        <div className={style.basicInfo}>
            <div className={style.image}>
                <img src={props.image} alt={props.name} title={props.name} />
            </div>
            <div className={style.nameTypes}>
                <span className={style.name}>{props.number}:{props.name}</span>
                <div className={style.types}>
                    {props.types.filter((v): v is NonNullable<typeof v> => v != null).map((v, index) => (<div className={style.typeTag} key={props.id + index} ><TypeTag type={v} size='large' /></div>))}
                </div>
            </div>
        </div>
        <div className={style.detailInfo}>
            <div className={style.classification}>
                <div className={style.head}><span className={style.classificationText}>Classification:</span> {props.classification}</div>
                <div className={style.head}><span className={style.classificationText}>Height:</span> {props.minHeight} ~ {props.maxHeight}</div>
                <div className={style.head}><span className={style.classificationText}>Weight:</span> {props.minWeight} ~ {props.maxWeight}</div>
            </div>
            <div className={style.compatibility}>
                <div className={style.compatibilityText}>Resistant: {props.resistant.filter((v): v is NonNullable<typeof v> => v != null).map((v, index) => (<div className={style.typeTag} key={props.id + index} ><TypeTag type={v} /></div>))}</div>
                <div className={style.compatibilityText}>Weekness: {props.weekness.filter((v): v is NonNullable<typeof v> => v != null).map((v, index) => (<div className={style.typeTag} key={props.id + index} ><TypeTag type={v} /></div>))}</div>
            </div>
        </div >
    </>
)

export const Detail: FC<ContainerProps> = props => {
    return <Component
        id={props.id}
        name={props.name}
        number={props.number}
        types={props.types}
        classification={props.classification}
        weekness={props.weekness}
        resistant={props.resistant}
        image={props.image}
        maxHeight={props.maxHeight}
        minHeight={props.minHeight}
        maxWeight={props.maxWeight}
        minWeight={props.minWeight}
    />
}
