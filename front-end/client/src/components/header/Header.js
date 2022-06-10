import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { ModalBootstrap } from '../subComponents/ModalBootstrap';
import { CoinbaseWallet, fortmatic, Injected, portis, WalletConnect } from '../wallets/connectors';


import "./header.css";

export const Header = () => {
  const { contractOwner, userInfo , setUserInfo, active , activate , deactivate , account , chainId } = useAuth()


  async function conToMetaMask() {
    if (typeof window.ethereum == 'undefined') {
      alert('MetaMask is Not installed!');
    }
    await activate(Injected)


    
  }

  const disconnect = async () => {
   deactivate(Injected)
  }

  const logout = () => {
    disconnect()
    sessionStorage.removeItem('userinfo');
    setUserInfo('')
  }


  return (
    <>


    <div className='container-fluid navbar-expand-lg navbar-light '>
      
    <Link style={{position: 'absolute'}} className="navbar-brand p-3" to="/"> 
    <img className="logo" width="100px" src="https://santastellarealestate.com/wp-content/uploads/2021/06/logo-transparent.png" alt="logo" /> </Link>
    
      <div className="row text-end">
        <div className="col-12 bg-dark py-1">
         
         {userInfo? 
         <div>
            <span className='text-light'> {userInfo.email}</span>
           <button className='btn btn-color py-0  m-1'  onClick={() => logout()}>
           logout</button> 
         </div>
          :
          <div>
            <Link to='/register'> <button className='btn btn-color py-0  m-1'>register</button> </Link> 
          <Link to='/login'> <button className='btn btn-color  py-0 m-1'>login</button> </Link>
        </div>
        }
          
         

       </div>
        <div className="col-12 py-2 second_line_nav">
          <button className="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end px-3 py-2" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className='nav-link px-3 text-dark fs-5' to="/">Home</Link>
            <Link className='nav-link px-3 text-dark fs-5' to="/buy">Buy</Link>

            {userInfo && userInfo.role === 'owner' ?
            <Link className='nav-link px-3 text-dark fs-5' to="/dashboard">Owner Dashboard</Link>   
            : userInfo && userInfo.role === 'admin' ? 
            <Link className='nav-link px-3 text-dark fs-5' to="/dashboard">Admin Dashboard</Link>   
            : userInfo && userInfo.role === 'user' ?
            <Link className='nav-link px-3 text-dark fs-5' to="/dashboard">Dashboard</Link> : ''
            }
            <Link className='nav-link px-3 text-dark fs-5' to="/sell">Sell</Link>
            <Link className='nav-link px-3 text-dark fs-5' to="/contact">Contact</Link>
            <Link className='nav-link px-3 text-dark fs-5' to="/about">About</Link>
            {userInfo &&
            <>
              {active ? <button className='btn btn-secondary' title="Disconnect From Wallet" onClick={disconnect}>{`${contractOwner === account ? 'Owner' : ''}  ${account.slice(0,5)}...${account.slice(-5)}`}</button> : 
              <ModalBootstrap 
              connectToMetaMask={conToMetaMask} 
              connectToWalletConnect={() => { activate(WalletConnect) }} 
              connectToCoinBase={() => { activate(CoinbaseWallet) }}
              connectToPortis = {() => { activate(portis) }}
              connectToFortmatic= {() => { activate(fortmatic) }}
              />}
            </>
            }
          </div>
        </div>
        </div>
      </div>
    
    </div>

          
    </>
  )
}
