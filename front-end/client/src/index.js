import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter} from 'react-router-dom';
import App from './components/App';

import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from "@ethersproject/providers";
import { AuthProvider } from './components/AuthContext';

const getLibrary = async (provider) => {
  return new Web3Provider(provider)
}


ReactDOM.render(
  <Web3ReactProvider getLibrary={getLibrary}>
      <BrowserRouter>
        <AuthProvider>
           <App />
        </AuthProvider>
      </BrowserRouter>
  </Web3ReactProvider>,
  document.getElementById('root')
);
