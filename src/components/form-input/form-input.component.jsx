import "./form-input.styles.scss";

export const FormInput = ({ label, ...otherProps }) => {
    return (
        <div className="group">
            <input className="form-input" {...otherProps}></input>
            {
                label && (
                    <label className={`${otherProps.value.length ? 'shrink' : null} form-input-label`}>{label}</label>
                )}
        </div>
    )
}