import style from './css/Input.module.css'

export default function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input className={style.input}
            type="text"
            autoComplete="false"
            {...props}
        />
    )
}
