function Input({type, value = null, setValue = null}) {
    return (
        <input type={type} value={value} onChange={(e) => setValue(e.target.value)} />
    )
}

export default Input;