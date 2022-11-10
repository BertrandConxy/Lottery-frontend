import React from 'react';
import { useState } from 'react';
import web3 from '../web3';
import lottery from '../lottery';

const PickWinner = () => {
    const [message, setMessage] = useState('');

    const handleClick = async (e) => {
        e.preventDefault();
        const accounts = await web3.eth.getAccounts();
        setMessage('Waiting on transaction success...');
        await lottery.methods.pickWinner().send({
            from: accounts[0]
        });
        setMessage('A winner has been picked!');
    }
  return (
    <div className='container-pick'>
        <h4 className='heading'>Ready to pick a winner?</h4>
        <button className='btn-submit' onClick={handleClick}>Pick a winner!</button>
        {
            message ? <h6>{message}</h6> : null
        }
    </div>
  )
}

export default PickWinner;