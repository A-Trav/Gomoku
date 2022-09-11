import style from './css/DropDown.module.css'

type DropDownProp = {
    defaultText: string
    from: number
    to: number
    setSelectedOption: (value: number) => void
}

export default function DropDown(props: DropDownProp) {
    const { setSelectedOption, defaultText, from, to } = props
    return (
        <select className={style.dropDown}
            defaultValue={'default'}
            onChange={(e) => { setSelectedOption(parseInt(e.target.value)) }}>
            <option value="default" disabled hidden >{defaultText}</option>
            {
                Array.from(Array(to - from + 1).keys()).map(x => x + from).map((x) =>
                    <option key={x} value={x}>{x}</option>)
            }
        </select >
    )
}
