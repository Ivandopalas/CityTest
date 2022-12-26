import React from 'react'
import './SearchText.scss'

function SearchText({value, setValue}) {
    return (
        <div className="form-group search-input">
            <label className="label">SEARCH: </label>
            <input className="form-control form-control-lg" type="text" value={value}
                   onChange={(el) => setValue(el.target.value)}/>
            <button className="btn-primary" onClick={() => window.location.href = '/logout'}>Logout</button>
        </div>
    );
}

export default SearchText;
