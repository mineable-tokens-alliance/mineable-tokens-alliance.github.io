
<template>
    <div class="bg-gray-800 p-2">

      <div  class="bg-gray-200 flex flex-row p-2 ">
            <h3 class="text-xl font-bold inline text-gray-900 text-center flex-grow"> {{getTitle()}} </h3>


            <div v-if="connectedToWeb3() == false" @click="connectToWeb3" class="button bg-gray-500 hover:bg-gray-700 text-white font-bold my-2 py-2 px-4 rounded cursor-pointer">Connect to Web3</div>

            <div v-if="connectedToWeb3() "   class="truncate  text-gray-800 p-2" style="max-width:250px;  ">

            <Web3NetButton
               v-bind:providerNetworkID="activeNetworkId"
             />

              <span class="  " style="max-width:120px">
              <a   v-bind:href="getEtherscanBaseURL()+'/address/'+activeAccountAddress" class="text-gray-800  "   target="_blank">  {{activeAccountAddress}} </a>
             </span>
             </div>


      </div>



      <div v-if="web3Error" class="p-8 bg-red-200">
        {{web3Error}}
      </div>





      <div v-if=" connectedToWeb3() " class="m-2 p-2 text-gray-200" >



        <DashboardPanel v-if="activeSection=='home'" />
        <TradingPanel v-if="activeSection=='trading'" />





        </div>



      </div>







      </div>








    </div>
</template>

<script>

const Web3 = require('web3')

var BN = Web3.utils.BN;

import Web3NetButton from './Web3NetButton.vue'

import DashboardPanel from './subpanels/Dashboard.vue'
import TradingPanel from './subpanels/Trading.vue'

const CryptoAssets = require('../../config/cryptoassets.json')


import StepFinanceHelper from '../../js/step-finance-helper.js'

export default {
  name: 'AppPanel',
  props: ['activeSection','web3Plug'],
  components:{ Web3NetButton,DashboardPanel,TradingPanel  },
  data() {
    return {
      activeAccountAddress: null,
      activeNetworkId: null,

      cryptoAssets: CryptoAssets,

      currentBalances: {eth:0  },


      web3Error: null
    }
  },
 async  mounted()
  {

    // setInterval(this.refreshBalances, 10*1000);
 /*


    setInterval(this.updateBalance, 10000);

    setInterval(this.updateFormMode, 6000);

    setInterval(this.updateEstimatedEarnings, 100);*/
  },
  updated()
  {

    //this.updateAll();
  },
  methods: {

    connectToWeb3(){
      this.web3Plug.connectWeb3(this.web3RefreshCallback,this.web3ErrorCallback)
    },

    web3RefreshCallback(activeAccountAddress,activeNetworkId){
      console.log('web3RefreshCallback',activeAccountAddress,activeNetworkId )
      this.activeAccountAddress=activeAccountAddress;
      this.activeNetworkId=activeNetworkId;
    },
    web3ErrorCallback(errorMessage){
        console.log('web3ErrorCallback', errorMessage)
        this.web3Error = errorMessage
    },

    getTitle(){

      switch(this.activeSection){
        case 'home': return 'Dashboard';
        case 'trading': return 'Trading';
        case 'staking': return 'Staking';
        case 'analytics': return 'Analytics';

        default: return '??';
      }

    },



/*
   async refreshBalances(){

      let contractData = Web3Helper.getContractDataForNetworkID(this.providerNetworkID)

      let zcbtcTokenAddress = contractData["0xbitcoin"].address
      let lpTokenAddress = contractData["0xbitcoinmarketpair"].address

      let zapInContractAddress = contractData["uniswapv2add"].address
      let zapOutContractAddress = contractData["uniswapv2remove"].address

       this.currentBalances.eth = await Web3Helper.getETHBalance(this.activeAccountAddress)
       this.currentBalances.zxbtc = await Web3Helper.getTokenBalance(zcbtcTokenAddress, this.activeAccountAddress)

       this.currentBalances.lpToken = await Web3Helper.getTokenBalance(lpTokenAddress, this.activeAccountAddress)

       this.zapOutLPTokensApproved= await Web3Helper.getTokensAllowance(lpTokenAddress,  this.activeAccountAddress, zapOutContractAddress)
       this.zapInZXBTCApproved=  await Web3Helper.getTokensAllowance(zcbtcTokenAddress,  this.activeAccountAddress, zapInContractAddress)

       let zapOutEstimate = await this.estimateZapOutAmountFromLPTokens()

       this.currentBalances.calcZxbtcFromLP = zapOutEstimate[0]
       this.currentBalances.calcEthFromLP = zapOutEstimate[1]

    },


  async estimateZapOutAmountFromLPTokens(){
         let myLpTokenBalance =  this.currentBalances.lpToken

         let networkId = this.providerNetworkID

         let contractData =  Web3Helper.getContractDataForNetworkID(networkId)
         let uniswapPairContractAddress = contractData["0xbitcoinmarketpair"].address
         let uniswapRouterContractAddress = contractData["uniswapv2router"].address

         let uniswapRouterContract = await Web3Helper.getUniswapRouterContract( window.web3, uniswapRouterContractAddress )
         let uniswapPairContract = await Web3Helper.getUniswapPairContract( window.web3, uniswapPairContractAddress )


         let totalLpTokenSupply =  await Web3Helper.getTotalLPTokenSupply(uniswapPairContract)

        /// let priceEstimate = await Web3Helper.getMarketPairPriceEstimate(uniswapPairContract)
         let pairReserves  = await Web3Helper.getMarketPairReserves(uniswapPairContract)



         console.log("pairReserves ",  pairReserves  )



         let myLpTokenFraction =  (myLpTokenBalance / totalLpTokenSupply)

      //   let priceRatioEstimated = Web3Helper.rawAmountToFormatted(priceEstimate[0], 18) / Web3Helper.rawAmountToFormatted(priceEstimate[1], 8)


         let myPooledZXBTCTokenShare = Math.floor( myLpTokenFraction *  pairReserves[0] )
         let myPooledEthShare = Math.floor( myLpTokenFraction *  pairReserves[1] )

           console.log("myPooledZXBTCTokenShare", myPooledZXBTCTokenShare)
             console.log("myPooledEthShare", myPooledEthShare)

             if(myLpTokenFraction <= 0.0000000001){
                 return [0 , 0]
             }

         let myPooledEthShareInTermsOfZXBTC = await Web3Helper.getUniSwapEstimate(uniswapRouterContract, myPooledEthShare.toString(), pairReserves[1], pairReserves[0] )
         let myPooledZXBTCShareInTermsOfETH = await Web3Helper.getUniSwapEstimate(uniswapRouterContract, myPooledZXBTCTokenShare.toString(), pairReserves[0], pairReserves[1] )

            console.log("myPooledEthShareInTermsOfZXBTC", myPooledEthShareInTermsOfZXBTC)

            console.log("myPooledZXBTCShareInTermsOfETH",  myPooledZXBTCShareInTermsOfETH)

          let myTotalZapoutZXBTCEstimate = parseInt(myPooledZXBTCTokenShare) + parseInt(myPooledEthShareInTermsOfZXBTC)
          let myTotalZapoutEthEstimate = parseInt(myPooledEthShare) + parseInt(myPooledZXBTCShareInTermsOfETH)

          console.log("myTotalZapoutZXBTCEstimate", myTotalZapoutZXBTCEstimate )
          console.log("myTotalZapoutEthEstimate", myTotalZapoutEthEstimate )


          return [myTotalZapoutZXBTCEstimate , myTotalZapoutEthEstimate]

  },
*/



/*
    async connectWeb3(){
      console.log('connect')
      if (window.ethereum) {
           window.web3 = new Web3(window.ethereum);
           window.ethereum.enable();

           window.ethereum.on('accountsChanged', (accounts) => {
                  this.refreshWeb3Accounts()
            });

          ethereum.on('chainChanged', (chainId) => {
                  this.refreshWeb3Accounts()
             });


          this.refreshWeb3Accounts()


         }
    },

  async  refreshWeb3Accounts(){
      if ( window.ethereum.selectedAddress) {
        this.providerNetworkID = await Web3Helper.getProviderNetworkID();
        this.activeAccountAddress = window.ethereum.selectedAddress

          console.log('this.activeAccountAddress ',this.activeAccountAddress )

          this.refreshBalances()
      }

    },*/

    connectedToWeb3(){

      return  this.activeAccountAddress != null
    },


    checkNetworkProviderIdValid(){

        if(this.providerNetworkID !=  1 )
        {
          this.networkProviderIdError = "Please switch your Web3 Provider to Ethereum Mainnet to call these methods."
          return false
        }


      //this.networkProviderIdError = null;
      return true;
    },

    getEtherscanBaseURL(){
        if(this.providerNetworkID == 42){
          return  'https://kovan.etherscan.io'
        }

        return 'https://etherscan.io'
    },



    hasApprovalToZapOut(){

      return this.zapOutLPTokensApproved > 0
    },


    canZapInETH(){
        return   this.zapInETHAmount > 0
    },

    canZapInZXBTCTokens(){
        return this.hasApprovalToZapInZXBTCTokens() && this.zapInZXBTCAmount > 0
    },

    hasApprovalToZapInZXBTCTokens(){
        return this.zapInZXBTCApproved > 0
    },


       async approveZapInZXBTCTokens(){

         let networkId = this.providerNetworkID

         var userAddress = this.activeAccountAddress;

         const UnlimitedAmount = 100000000
         var amtRaw  = Web3Helper.formattedAmountToRaw(UnlimitedAmount, CryptoAssets.assets['0xBTC']['Decimals']);

         let contractData =  Web3Helper.getContractDataForNetworkID(networkId)

         let tokenAddress = contractData["0xbitcoin"].address

         var tokenContract = await Web3Helper.getTokenContract(web3,tokenAddress)

         var zapInContractAddress = contractData["uniswapv2add"].address

         tokenContract.methods.approve(zapInContractAddress,amtRaw).send({from: userAddress })
         .then(function(receipt){
           console.log(receipt)

           this.refreshWeb3Accounts()
             // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
         }.bind(this));




       },


   async approveZapOutLPTokens(){

     let networkId = this.providerNetworkID

     var userAddress = this.activeAccountAddress;

     const UnlimitedAmount = 100000000000000
     var amtRaw  = Web3Helper.formattedAmountToRaw(UnlimitedAmount, CryptoAssets.assets['LPToken']['Decimals']);

     let contractData =  Web3Helper.getContractDataForNetworkID(networkId)

     let tokenAddress = contractData["0xbitcoinmarketpair"].address

     var tokenContract = await Web3Helper.getTokenContract(web3,tokenAddress)

     var zapOutContractAddress = contractData["uniswapv2remove"].address

     tokenContract.methods.approve(zapOutContractAddress,amtRaw).send({from: userAddress })
     .then(function(receipt){
       console.log(receipt)

       this.refreshWeb3Accounts()
         // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
     }.bind(this));




   },

    async zapInEth()
    {
      let networkId = this.providerNetworkID

      let assetName = 'ETH'

      var userAddress = this.activeAccountAddress;
      var amtRaw  = Web3Helper.formattedAmountToRaw(this.zapInETHAmount, CryptoAssets.assets[assetName]['Decimals']);

      console.log('zap in eth!', userAddress, amtRaw)

      var zapInContract = await Web3Helper.getZapInContract( window.web3, Web3Helper.getWeb3NetworkName( networkId ) );

       const wethContractAddress = Web3Helper.getContractDataForNetworkID(networkId)["weth"].address
      const zxbtcContractAddress = Web3Helper.getContractDataForNetworkID(networkId)["0xbitcoin"].address// "0xb6ed7644c69416d67b522e20bc294a9a9b405b31"

      var tokenAddress =  "0x0000000000000000000000000000000000000000"
      var marketPairAddress = Web3Helper.getContractDataForNetworkID(networkId)["0xbitcoinmarketpair"].address



      //should this be 0.45 multiplier ??
      var swapQuote = await Web3Helper.get0xSwapQuote(zxbtcContractAddress, 'ETH',  amtRaw , this.providerNetworkID);
      var swapData = swapQuote.data

      var allowanceTarget = swapQuote.to
      var swapTarget = swapQuote.to

      var minPoolTokens = Math.floor(swapQuote.buyAmount*0.05) //for now -- helps against front running
      let tokensAmount = 0//swapQuote.buyAmount

      zapInContract.methods.ZapIn(tokenAddress,marketPairAddress, tokensAmount, minPoolTokens, allowanceTarget, swapTarget, swapData )
      .send({from: userAddress, value: amtRaw })
      .then(function(receipt){
        console.log(receipt)
        this.refreshWeb3Accounts()
          // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
      }.bind(this));




    },



      ///Need approval?
        async zapInToken()
        {
          let networkId = this.providerNetworkID


          var userAddress = this.activeAccountAddress;
          var amtRaw  = Web3Helper.formattedAmountToRaw(this.zapInZXBTCAmount, CryptoAssets.assets['0xBTC']['Decimals']);

          console.log('zap in 0xBTC!', userAddress, amtRaw)

          var zapInContract = await Web3Helper.getZapInContract( window.web3, Web3Helper.getWeb3NetworkName( networkId ) );

           const wethContractAddress = Web3Helper.getContractDataForNetworkID(networkId)["weth"].address
          const zxbtcContractAddress = Web3Helper.getContractDataForNetworkID(networkId)["0xbitcoin"].address// "0xb6ed7644c69416d67b522e20bc294a9a9b405b31"

          var tokenAddress =  zxbtcContractAddress
          var marketPairAddress = Web3Helper.getContractDataForNetworkID(networkId)["0xbitcoinmarketpair"].address



          //should this be 0.45 multiplier ??
          var swapQuote = await Web3Helper.get0xSwapQuote('ETH', zxbtcContractAddress,  amtRaw , this.providerNetworkID);
          var swapData = swapQuote.data

          var allowanceTarget = swapQuote.to
          var swapTarget = swapQuote.to

          var minPoolTokens = 0 // for now -- helps against front running
          let tokensAmount =  swapQuote.sellAmount

          zapInContract.methods.ZapIn(tokenAddress,marketPairAddress, tokensAmount, minPoolTokens, allowanceTarget, swapTarget, swapData )
          .send({from: userAddress })
          .then(function(receipt){
            console.log(receipt)
            this.refreshWeb3Accounts()
              // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
          }.bind(this));




        },



   ///Need approval?
    async ZapOutToEth( ){

      let networkId = this.providerNetworkID
      var userAddress = this.activeAccountAddress;

      var zapOutContract = await Web3Helper.getZapOutContract( window.web3, Web3Helper.getWeb3NetworkName( networkId ) );


        console.log('zapout' )

      var tokenAddress =  "0x0000000000000000000000000000000000000000" //to receive ETh
      var marketPairAddress = Web3Helper.getContractDataForNetworkID(networkId)["0xbitcoinmarketpair"].address

      var incomingLP = this.currentBalances.lpToken //all of them

      var minTokensRecieved = 0 //for now ...

      console.log('zapout',tokenAddress,marketPairAddress, incomingLP, minTokensRecieved)

      zapOutContract.methods.ZapOut(tokenAddress,marketPairAddress, incomingLP, minTokensRecieved  )
      .send({from: userAddress })
      .then(function(receipt){
        console.log(receipt)
        this.refreshWeb3Accounts()
          // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
      }.bind(this));


    },

      ///Need approval?
    async ZapOutToToken( ){

      let networkId = this.providerNetworkID
      var userAddress = this.activeAccountAddress;

      var zapOutContract = await Web3Helper.getZapOutContract( window.web3, Web3Helper.getWeb3NetworkName( networkId ) );


        console.log('zapout' )

      var tokenAddress =  Web3Helper.getContractDataForNetworkID(networkId)["0xbitcoin"].address
      var marketPairAddress = Web3Helper.getContractDataForNetworkID(networkId)["0xbitcoinmarketpair"].address

      var incomingLP =  this.currentBalances.lpToken //all of them

      var minTokensRecieved = 0 //for now ...

      console.log('zapout',tokenAddress,marketPairAddress, incomingLP, minTokensRecieved)

      zapOutContract.methods.ZapOut(tokenAddress,marketPairAddress, incomingLP, minTokensRecieved  )
      .send({from: userAddress })
      .then(function(receipt){
        console.log(receipt)

        this.refreshWeb3Accounts()
          // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
      }.bind(this));


    },



  }
}

</script>
