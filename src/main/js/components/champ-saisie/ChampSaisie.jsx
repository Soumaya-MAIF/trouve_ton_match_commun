import { useEffect, useRef, useState, forwardRef} from "react";
import './champ-saisie.css';
import './../global.css';

export const ChampSaisie = forwardRef(({ setValue, label, name, value, regex }, ref) => {

    const [errMsg, setErrMsg] = useState("");
    const [validInput, setValidInput] = useState(false);
    const [focusInput, setFocusInput] = useState(false);

    useEffect(() => {
        const result = regex.test(value);
        setValidInput(result);
    }, [value, regex]);

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    const addMsgError = (msgParam, focusSetter, validElement) => {
        focusSetter(false);
        const newMsg = validElement ? "" : msgParam;
        setErrMsg(newMsg);
    };

    return (
        <div className='row-champ'>
            <div className="col-champ">
                {
                    (!validInput && value && !focusInput) && <div className="message-erreur" role="alert">
                        {errMsg}
                    </div>
                }
                <label htmlFor={name} className="form-label-type">{label}</label>
                <div className="custom-container">
                    <input 
                        ref={ref}
                        onChange={handleChange}
                        value={value}
                        name={name}
                        onBlur={() => addMsgError('Format de saisie non respecté !', setFocusInput, validInput)}
                        onFocus={() => { setFocusInput(true) }}
                        type="text-champ"
                        className={`custom-input ${!value ? "" : validInput ? "is-valid" : "is-invalid"}`}
                        disabled={false}
                        id={name}
                    />
                </div>
            </div>
        </div>
    );
});