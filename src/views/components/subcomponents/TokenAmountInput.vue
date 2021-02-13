<template> 
<div>
  <label for="price" class="block text-md font-medium text-gray-700">{{labeltext}}</label>
  <div class="mt-1 relative rounded-md shadow-sm">
    
    <input type="text" name="price" id="price" :disabled="disableInput == 'true'" class="text-gray-900 font-bold text-xl focus:ring-indigo-500 focus:border-indigo-500 block w-full py-4 pl-7 pr-12   border-gray-300 rounded-md" placeholder="0.00">
   
   
   
    <div class="absolute inset-y-0 right-0 flex items-center my-2 mr-2 bg-black rounded select-none">
      <label for="currency" class="hidden sr-only">Currency</label>


      <div @click="clickedMax" v-if="disableInput == 'false'" class="bg-white text-black font-bold hover:bg-gray-300 rounded px-2 mx-2 cursor-pointer"> MAX </div> 

     

       <t-dropdown class="select-none" ref="tokenDropdown">
          <div
            slot="trigger"
            slot-scope="{
              mousedownHandler,
              focusHandler,
              blurHandler,
              keydownHandler,
              isShown
            }"
          >
            <button
              id="user-menu"
              class="flex items-center pr-3   text-gray-100 transition duration-150 ease-in-out bg-transparent border-2 border-gray-200   focus:outline-none focus:shadow-solid"
              :class="{ 'border-gray-300 bg-gray-500 text-white ': isShown }"
              aria-label="User menu"
              aria-haspopup="true"
              @mousedown="mousedownHandler"
              @focus="focusHandler"
              @blur="blurHandler"
              @keydown="keydownHandler"
            >
              <img class="  mx-2" v-bind:src="getTokenIcon()" width="16px"  alt="">

              {{selectedTokenData.name}}   

              <span>
              <svg class="svg-icon mx-2" viewBox="0 0 20 20" style="stroke: #aaaaaa;">
                <path d="M13.962,8.885l-3.736,3.739c-0.086,0.086-0.201,0.13-0.314,0.13S9.686,12.71,9.6,12.624l-3.562-3.56C5.863,8.892,5.863,8.611,6.036,8.438c0.175-0.173,0.454-0.173,0.626,0l3.25,3.247l3.426-3.424c0.173-0.172,0.451-0.172,0.624,0C14.137,8.434,14.137,8.712,13.962,8.885 M18.406,10c0,4.644-3.763,8.406-8.406,8.406S1.594,14.644,1.594,10S5.356,1.594,10,1.594S18.406,5.356,18.406,10 M17.521,10c0-4.148-3.373-7.521-7.521-7.521c-4.148,0-7.521,3.374-7.521,7.521c0,4.147,3.374,7.521,7.521,7.521C14.148,17.521,17.521,14.147,17.521,10"></path>
              </svg>
              </span>

            </button>
          </div>

          <div slot-scope="{ hide, blurHandler }" ref="tokenSelect" class="border-2 border-white"> 
            <button 
                @click="  onChange($event, hide); "
               v-for="token in tokenList"
              class="block w-full px-4 py-2 text-sm leading-5 text-gray-100 transition duration-150 ease-in-out bg-black hover:bg-gray-800 focus:outline-none focus:bg-gray-100"
              role="menuitem"
              @blur="blurHandler"
              v-bind:value="token.name"
            > 
             <img class="  mx-2" v-bind:src="token.imgurl" width="16px"  alt="">

              {{token.name}}   
              
            </button>
            

           
          </div>
        </t-dropdown>

      
      <select @change="onChange($event)" id="currency" name="currency" class=" hidden focus:ring-indigo-500 focus:border-indigo-500 border-0 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-100   rounded-md">
        <option v-for="token in tokenList" class="bg-black text-white" >  {{token.name}} </option>
       
      </select>



    </div>



  </div>
    <div class="text-xs p-2">
   Balance: {{currentBalance}}
  </div>
</div>
</template> 


<script>
 
 const tokenlist = require('../../../../shared/tokenlist.json')
 import Web3Plug from '../../../js/web3-plug.js' 

export default {
  name: 'TokenAmountInput',
  props: [ 'web3Plug', 'labeltext', 'disableInput' ],
  components: { },
  data() {
    return {
      currentBalance: "0.0",
      tokenList: [{ name:"DAI", imgurl:"/assets/images/tokens/dai.png", contractaddress:""   },{ name:"USDC", imgurl:"", contractaddress:""   }],
      selectedTokenData: {},
      networkName: 'mainnet'
    }
  },
  created(){
    console.log('meep',this.disableInput )

    let networkId = this.web3Plug.getConnectionState().activeNetworkId
    this.networkName = Web3Plug.getWeb3NetworkName(networkId)
    this.tokenList = tokenlist.networks[this.networkName]
    this.selectedTokenData = this.tokenList[0]
  },
  methods: {
    onChange(event, hideMethod) {        
        
         hideMethod() 

        this.selectTokenByName(event.target.value)
    },
    selectTokenByName(tokenName){
      for(let tokenData of this.tokenList){
        if(tokenData.name == (tokenName)){
          
          this.handleSelectedTokenChanged(tokenData)
          return
        }
      }
    },
    handleSelectedTokenChanged(tokenData){
      this.selectedTokenData = tokenData
      console.log('selected token changed', tokenData)
    },
    getTokenIcon(){
      return this.selectedTokenData.imgurl
    },
    clickedMax(){
      console.log('clicked max')
    }


  }
}
</script>
