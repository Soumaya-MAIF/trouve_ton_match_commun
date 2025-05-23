import { useEffect, useRef, useState, forwardRef} from "react";
import './champ-info.css';
import './../global.css';

export const ChampInfo = ({ label, name, value}) => {

    return (
        <div className="champ-info">
            <label htmlFor={name} className="form-label-type">{label}</label>
            <span className= "custom-input">{value}</span>
        </div>
    );
};