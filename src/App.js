import './App.css';
import web3 from './web3';

function App() {
  const getAccount = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
  };
  return (
    <div className="App">
      <button onClick={getAccount}>Get Accounts</button>
    </div>
  );
}

export default App;
