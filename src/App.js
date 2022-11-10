import './App.css';
import web3 from './web3';
import { useEffect, useState } from 'react';
import lottery from './lottery';
import EnterForm from './components/EnterForm';

function App() {
  const [manager, setManager] = useState('');
  const [players, setPlayers] = useState([]);
  const [balance, setBalance] = useState('');

useEffect(() => {
  async function fetchData() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);
    setManager(manager);
    setPlayers(players);
    setBalance(balance);
  }
  fetchData();
}, []);

  return (
    <div className="App">
      <h2>Lottery Contract</h2>
      <div className='flex-container'>
        <span>
          This contract is managed by <strong className='address'>{manager}</strong>.
        </span>
        <span>
          There are currently <strong>{players.length}</strong> people entered,
        </span>
        <span>
          competing to win <strong>{web3.utils.fromWei(balance, 'ether')}</strong> ether!
        </span>
      </div>
      <hr />
      <EnterForm />
    </div>
  );
}

export default App;
