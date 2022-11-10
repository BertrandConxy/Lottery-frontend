import React from 'react';
import { useState } from 'react';

const EnterForm = () => {
    const [value, setValue] = useState('');

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(value);
    }
  return (
    <form onSubmit={handleSubmit}>
        <h4>Want to try your luck?</h4>
        <div className='container-form'>
            <label>Units of Ether to invest:</label>
            <input type="number" placeholder='Enter Ether' onChange={handleChange} value={value} className="form-control" />
            <input type="submit" value="Enter" className='btn-submit' />
        </div>
    </form>
  )
}

export default EnterForm;