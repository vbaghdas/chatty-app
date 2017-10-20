import React from 'react';

export function renderInput({ input, label, type, meta: {error, touched} }){
    return (
        <div className="input-field col s12">
            <input {...input} type={type} placeholder={label} />
            <p className="red-text">{ touched && error }</p>
        </div>
    )
}