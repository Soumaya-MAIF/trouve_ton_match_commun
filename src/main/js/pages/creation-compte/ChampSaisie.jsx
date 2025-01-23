import { useEffect, useRef, useState } from "react";
import './champSaisie.css';

export function ChampSaisie({ setValue, label, name, value, regex }) {

    const [errMsg, setErrMsg] = useState("");
    const [validInput, setValidInput] = useState(false);
    const [focusInput, setFocusInput] = useState(false);

    const inputRef = useRef();

    useEffect(() => {
        inputRef.current.focus();
    }, []);

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
                    (!validInput && value && !focusInput) && <div className="alert-format" role="alert">
                        {errMsg}
                    </div>
                }
                <label htmlFor={name} className="form-label-type">{label}</label>
                <div className="custom-container">
                    <input 
                        ref={inputRef}
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
}