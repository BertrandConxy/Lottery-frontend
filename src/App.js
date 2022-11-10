import './App.css'
import web3 from './web3'
import { useEffect, useState } from 'react'
import lottery from './lottery'
import EnterForm from './components/EnterForm'
import PickWinner from './components/PickWinner'

function App() {
  const [manager, setManager] = useState('')
  const [players, setPlayers] = useState([])
  const [balance, setBalance] = useState('')

  useEffect(() => {
    async function fetchData() {
      const manager = await lottery.methods.manager().call()
      const players = await lottery.methods.getPlayers().call()
      const balance = await web3.eth.getBalance(lottery.options.address)
      setManager(manager)
      setPlayers(players)
      setBalance(balance)
    }
    fetchData()
  }, [])

  const validateManager = async () => {
    const accounts = await web3.eth.getAccounts();
    const manager = await lottery.methods.manager().call();
    return accounts[0] === manager;
 }

 const getLastWinner = async () => {
    const lastWinner = await lottery.methods.lastWinner().call();
    return lastWinner;
  }

  return (
    <div className="App">
      <h2>Lottery Contract</h2>
      <div className="flex-container">
        <span>
          This contract is managed by{' '}
          <strong className="address">{manager}</strong>.
        </span>
        {players.length > 0 ? (
          <>
            <span>
              There are currently <strong>{players.length}</strong> people
              entered,
            </span>
            <span>
              competing to win{' '}
              <strong>{web3.utils.fromWei(balance, 'ether')}</strong> ether!
            </span>
          </>
        ) : (
          <>
            <span>There are currently no players entered,</span>
            <span>Be the first one!</span>
          </>
        )}
      </div>
      <hr />
      <EnterForm />
      <hr />
      {
        validateManager() ? <PickWinner /> : null
      }


    </div>
  )
}

export default App
