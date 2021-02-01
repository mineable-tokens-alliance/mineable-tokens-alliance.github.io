
const Web3 = require('web3');
const web3utils = Web3.utils;
const BigNumber = Web3.utils.BN;


 var activeNetworkId;
 var activeAccountAddress;

/*
Change this so it emits events
*/

const EventEmitter = require('events');
class Web3PlugEmitter extends EventEmitter {}

const web3PlugEmitter = new Web3PlugEmitter();

export default class Web3Plug {

  async connectWeb3(   ){

    console.log('connectWeb3')

    if (window.ethereum) {
         window.web3 = new Web3(window.ethereum);
         window.ethereum.enable();

         window.ethereum.on('accountsChanged', (accounts) => {
                  activeAccountAddress = window.ethereum.selectedAddress
                  web3PlugEmitter.emit('stateChanged', this.getConnectionState() )

          });

         window.ethereum.on('chainChanged', (chainId) => {
                  activeNetworkId = window.ethereum.chainId
                  web3PlugEmitter.emit('stateChanged', this.getConnectionState() )

           });



        activeAccountAddress = window.ethereum.selectedAddress
        activeNetworkId = window.ethereum.chainId
        web3PlugEmitter.emit('stateChanged', this.getConnectionState() )


      }else{
        web3PlugEmitter.emit('error', "No web3 provider found." )
      }
  }

  getPlugEventEmitter(){
    return web3PlugEmitter
  }

  getConnectionState(){
    return {
      activeAccountAddress:activeAccountAddress,
      activeNetworkId:activeNetworkId
    }
  }

  mainnetChainID()
  {
    return 1
  }
  kovanChainID()
  {
    return 42
  }
/*
  getActiveAccountAddress(){
      return activeAccountAddress
  }
  getActiveNetworkId(){
      return activeNetworkId
  }
*/
  getWeb3NetworkName(networkId){

    if(networkId == this.mainnetChainID()){
      return 'mainnet'
    }

    if(networkId == this.kovanChainID()){
      return 'kovan'
    }

     console.error('Invalid network Id: ',networkId)
    return null
  }


  getContractDataForNetworkID(networkId){
    let netName = this.getWeb3NetworkName(networkId)

    if(netName){
        return contractData[netName].contracts
    }

    return undefined
  }


  async getConnectedAccounts()
  {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    return accounts;
  }


  async getTokenContract(web3, contractAddress)
  {

    var tokenContract = new web3.eth.Contract(tokenContractABI,contractAddress)

    return tokenContract;
  }


  async getCustomContract(web3, contractABI, contractAddress)
  {

    var contract = new web3.eth.Contract(contractABI,contractAddress)

    return contract;
  }

  async getETHBalance(ownerAddress)
  {
    var web3 = new Web3(Web3.givenProvider);

    return web3.eth.getBalance(ownerAddress);
  }

  async getTokenBalance(contractAddress, ownerAddress)
  {
    var web3 = new Web3(Web3.givenProvider);

    var tokenContract = new web3.eth.Contract(tokenContractABI, contractAddress, {});


    var balance = await tokenContract.methods.balanceOf(ownerAddress).call();

    return balance;
  }


  rawAmountToFormatted(amount,decimals)
  {
    console.log('formatting',amount,decimals)
    return (amount * Math.pow(10,-1 * decimals)).toFixed(decimals);
  }

  formattedAmountToRaw(amountFormatted,decimals)
  {

    var multiplier = new BigNumber( 10 ).exponentiatedBy( decimals ) ;


    return multiplier.multipliedBy(amountFormatted).toFixed() ;
  }

/*
  async connect()
  {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    return accounts
  },

  async disconnect()
  {
    console.log('disconnecting')
    const accounts = await window.ethereum.request({
     method: "eth_requestAccounts",
     params: [
       {
         eth_accounts: {}
       }
     ]
   });
   window.location.reload();
 }*/



}
