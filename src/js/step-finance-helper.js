/* eslint-disable */

//https://docs.metamask.io/guide/ethereum-provider.html#using-the-provider
const tokenContractABI = require('../contracts/ERC20ABI.json')
const uniswapRouterContractABI = require('../contracts/UniswapV2Router.json')
const uniswapPairContractABI = require('../contracts/UniPairABI.json')

const contractData = require('../config/contractdata.json')

const BigNumber = require('bignumber.js');

const axios = require('axios')

const Web3 = require('web3');
const web3utils = Web3.utils;


var helper = {

    async getUniswapRouterContract(web3, contractAddress)
    {

      var pairContract = new web3.eth.Contract(uniswapRouterContractABI,contractAddress)

      return pairContract;
    },

  async getUniswapPairContract(web3, contractAddress)
  {

    var pairContract = new web3.eth.Contract(uniswapPairContractABI,contractAddress)

    return pairContract;
  },

  async get0xSwapQuote(  buyToken , sellToken , sellAmount, networkId) {
    try {
      const TIMEOUT = 30000;
      const HEADERS = {
        "Content-Type": "application/json;charset=utf-8",
        Accept: "*/*",
      };
      var HOST = "https://api.0x.org";

      if(networkId == 42){
        HOST = "https://kovan.api.0x.org";
      }

      const instance = axios.create({
        baseURL: HOST,
        timeout: TIMEOUT,
        headers: HEADERS,
      });

      const response = await instance.get(
        HOST +
          "/swap/v1/quote?buyToken=" +
          buyToken +
          "&sellToken=" +
          sellToken +
          "&sellAmount=" +
          sellAmount
      );

      const quote = response.data;
      console.log(
        `zapper.get0xSwapQuote(): Retrieved swap 0x quote for buyToken ${buyToken}, sellToken ${sellToken}, amount ${sellAmount}, quote ${JSON.stringify(quote)}`
      );

      return quote;
    } catch (err) {
      console.log(JSON.stringify(err));
      throw err;
    }
  },


  async getMarketPairPriceEstimate(pairContract){

    let priceEstimates = []

       await new Promise((resolve, reject) => {
        pairContract.methods.price0CumulativeLast( ).call( {}  )
         .then(function(result){
           priceEstimates[0] = result
           resolve(result);
         })
         .catch(function(err){
           console.error(err)
           reject(err)
         })
       });

       await new Promise((resolve, reject) => {
        pairContract.methods.price1CumulativeLast( ).call( {}  )
         .then(function(result){
           priceEstimates[1] = result
           resolve(result);
         })
         .catch(function(err){
           console.error(err)
           reject(err)
         })
       });

       return priceEstimates

  },

  async getMarketPairReserves(pairContract){

    let reserves = null

       await new Promise((resolve, reject) => {
        pairContract.methods.getReserves( ).call( {}  )
         .then(function(result){
           reserves = result
           resolve(result);
         })
         .catch(function(err){
           console.error(err)
           reject(err)
         })
       });


       return reserves

  },



    async getUniSwapEstimate(uniRouterContract, amountIn, reserveIn, reserveOut){

      let amountOut = 0

         await new Promise((resolve, reject) => {
          uniRouterContract.methods.getAmountOut(amountIn, reserveIn, reserveOut).call( {}  )
           .then(function(result){
             amountOut = result
             resolve(result);
           })
           .catch(function(err){
             console.error(err)
             reject(err)
           })
         });


         return amountOut

    },



  async getTotalLPTokenSupply(pairContract){

    let reserves = null

       await new Promise((resolve, reject) => {
        pairContract.methods.totalSupply( ).call( {}  )
         .then(function(result){
           reserves = result
           resolve(result);
         })
         .catch(function(err){
           console.error(err)
           reject(err)
         })
       });


       return reserves

  }
}



export default helper
