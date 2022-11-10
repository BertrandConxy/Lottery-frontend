import React from 'react';
import { useState } from 'react';
import web3 from '../web3';
import lottery from '../lottery';

const EnterForm = () => {
    const [value, setValue] = useState('');
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const accounts = await web3.eth.getAccounts();
        setMessage('Waiting on transaction success...');
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei(value, 'ether')
        });
        setMessage('You have been entered!');

        setValue('');
    }
  return (
    <form onSubmit={handleSubmit}>
        <h4 className='heading'>Want to try your luck?</h4>
        {
            message ? <h6>{message}</h6> : null
        }
        <div className='container-form'>
            <label>Units of Ether to invest:</label>
            <input type="number" placeholder='Enter Ether' onChange={handleChange} value={value} className="form-control" min={0.1} />
            <input type="submit" value="Enter" className='btn-submit' />
        </div>
    </form>
  )
}

export default EnterForm;