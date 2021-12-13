import './styles/App.css';
import { ethers } from "ethers";
import twitterLogo from './assets/twitter-logo.svg';
import React, { useEffect, useState } from "react";
import ercAbi from './utils/erc721.json';

const TWITTER_HANDLE1 = 'anandsinha07';
const TWITTER_LINK1 = `https://twitter.com/${TWITTER_HANDLE1}`;

// const CONTRACT_ADDRESS = "0x34d26Ff81d570C2706c145434F9Da325Fb86cb07";
const CONTRACT_ADDRESS = "0x29272CD1C805090424E306846a8d9Fa5b0e5B7a7";


const App = () => {

    const [currentAccount, setCurrentAccount] = useState("");
    const [msg1, setMsg1] = useState("");
    const [msg2, setMsg2] = useState("");
    const [msg3, setMsg3] = useState("");

    const checkIfWalletIsConnected = async () => {
      const { ethereum } = window;

      if (!ethereum) {
          console.log("Make sure you have metamask!");
          return;
      } else {
          console.log("We have the ethereum object", ethereum);
      }

      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length !== 0) {
          const account = accounts[0];
          console.log("Found an authorized account:", account);
          setCurrentAccount(account)

          // Setup listener! This is for the case where a user comes to our site
          // and ALREADY had their wallet connected + authorized.
          setupEventListener()
      } else {
          console.log("No authorized account found")
      }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await askContractToMintNft();
    console.log(res);
  }

  /*
  * Implement your connectWallet method here
  */
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      /*
      * Fancy method to request access to account.
      */
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      /*
      * Boom! This should print out public address once we authorize Metamask.
      */
      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);


      // Setup listener! This is for the case where a user comes to our site
      // and connected their wallet for the first time.
      setupEventListener();

    } catch (error) {
      console.log(error)
    }
  }

  // Setup our listener.
  const setupEventListener = async () => {
      try {
        const { ethereum } = window;
  
        if (ethereum) {
          // Same stuff again
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();// eslint-disable-next-line
          const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, erc721.abi, signer);
  
          console.log("Setup event listener!")
  
        } else {
          console.log("Ethereum object doesn't exist!");
        }
      } catch (error) {
        console.log(error)
      }
  }

  const askContractToMintNft = async () => {
      try {
        const { ethereum } = window;
  
        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, ercAbi.abi, signer);
  
          console.log("Going to pop wallet now to pay gas...")
          // eslint-disable-next-line
          // let nftTxn = await connectedContract.mintItem(msg);
          let nftTxn = await connectedContract.transferFrom(msg1,msg2,msg3);

  
        } else {
          console.log("Ethereum object doesn't exist!");
        }
      } catch (error) {
        console.log(error)
      }
  }

  useEffect(() => {
    checkIfWalletIsConnected();// eslint-disable-next-line
  }, [])

  const renderNotConnectedContainer = () => (
    
    <button onClick={connectWallet} className="cta-button connect-wallet-button">
      Connect to Wallet!
    </button>
  );

  const renderMintUI = () => (
    
    <form onSubmit={handleSubmit} className='form'>
      <p className="sub-text">
            Enter from address
          </p>
      <label>
        <input
          type="text" 
          value={msg1}
          onChange={(e) => setMsg1(e.target.value)}
        />
      </label>
      {/* <input type="submit" /> */}
      <br></br>
      <p className="sub-text">
            Enter to address
          </p>
      <label>
        <input
          type="text" 
          value={msg2}
          onChange={(e) => setMsg2(e.target.value)}
        />
      </label>
      <p className="sub-text">
            Enter tokenId
          </p>
      <label>
        <input
          type="text" 
          value={msg3}
          onChange={(e) => setMsg3(e.target.value)}
        />
      </label>
      <br></br>
      <br></br>

      <button type='submit' className="cta-button connect-wallet-button">Transfer NFT</button>
    </form>
  )

  /*
  * Added a conditional render! We don't want to show Connect to Wallet if we're already conencted :).
  */
  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">Artist Collections</p>
          <p className="sub-text">
            Each unique and elegant. Mint your NFTs!
          </p>
          {currentAccount === "" ? renderNotConnectedContainer() : renderMintUI()}
        </div>
        <br/><h1>
          <a
            href={"https://testnets.opensea.io/collection/"}
            target="_blank"
            rel='noreferrer'
          > 
                    <p className="header gradient-text">View NFT Heroes on OpenSea!
</p>
          </a></h1>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK1}
            target="_blank"
            rel="noreferrer"
          >{`built by @${TWITTER_HANDLE1}`}</a>
          <br></br>
          {/* <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} /> */}
        </div>
      
      </div>
    </div>
  );
};

export default App;
