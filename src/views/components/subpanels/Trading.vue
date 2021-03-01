<template>
  <div>


  <div class="uppercase font-bold">Trade</div>
  <hr class="font-bold"> 


  <div class="bg-black p-2 m-4 font-sans">

      <div class="  border-0 border-gray-500 m-6 p-2 ">
        <div class="w-3/4" style="margin:0 auto">
           
          <div>   <TokenAmountInput 
                  v-bind:web3Plug="web3Plug"  
                  labeltext="Select Coin to Deposit"
                  v-bind:inputAmount="depositAmount"
                  disableInput=false
                  v-bind:onSelectCallback="onSelectDepositAsset"
                  v-bind:onAmountChangedCallback="onDepositAmountChanged"

                               />  
          </div> 

          </div>
      </div>


       <div class="  border-0 border-gray-500 m-6 p-2 ">
        <div class="w-3/4" style="margin:0 auto">
           
          <div>   <TokenAmountInput 
                  v-bind:web3Plug="web3Plug"  
                  labeltext="Select Coin to Purchase" 
                  v-bind:inputAmount="purchaseAmount"
                  disableInput=true
                  v-bind:onSelectCallback="onSelectPurchaseAsset"
                  v-bind:onAmountChangedCallback="onPurchaseAmountChanged"

                               />  
          </div> 

          </div>
      </div>

        <div class="  border-0 border-gray-500 m-6 p-2 ">
        <div class="w-3/4" style="margin:0 auto">
           
          <div>   <NumericAmountInput 
                  v-bind:web3Plug="web3Plug"  
                  labeltext="Select Steps" 
                  v-bind:inputAmount="sellAmountPerStep"
                  disableInput=true
                  v-bind:selectionOptions="[1,5,10]"
                  v-bind:onSelectCallback="onSelectSteps"


                               />  
          </div> 

          </div>
      </div>

        <div class="  border-0 border-gray-500 m-6 p-2 ">
        <div class="w-3/4" style="margin:0 auto">
           
          <div>   <NumericAmountInput 
                  v-bind:web3Plug="web3Plug"  
                  labeltext="Select Purchase Interval" 
                  v-bind:inputAmount="intervalMultiplier"
                  disableInput=false
                  v-bind:selectionOptions="['days']"
                  v-bind:onSelectCallback="onSelectInterval"
                  v-bind:onAmountChangedCallback="onIntervalMultiplierChanged"
                               />  
          </div> 

          </div>
      </div>


    <div v-if="depositAsset && purchaseAsset">
     <div class="  text-center">Auto-financing Schedule</div>
      <div class=" border-2 border-gray-500 m-6 p-6 text-center">
      The Step Finance contract will purchase {{sellAmountPerStep}} {{depositAsset.name}} ({{this.selectedStepInversePercent}}%) worth of {{purchaseAsset.name}} every {{this.intervalMultiplier}} {{this.selectedInterval}}.
    
     </div>
  </div>
   
 <div class="mt-12 flex flex-row w-full" v-if="depositAsset">
    <div class="flex-grow cursor-pointer bg-green-400 hover:bg-green-500 border-2 border-gray-300 p-4 m-4 text-center text-gray-100 font-bold">
    Approve {{depositAsset.name}}
    </div>

    <div class="flex-grow cursor-pointer bg-green-400 hover:bg-green-500 border-2 border-gray-300 p-4 m-4 text-center text-gray-100 font-bold">
    Deposit {{depositAsset.name}}
    </div>


</div>
  

</div>




  </div>
</template>

<script>

const Web3 = require('web3')

import TokenAmountInput from '../subcomponents/TokenAmountInput'
import NumericAmountInput from '../subcomponents/NumericAmountInput'

export default {
  name: 'Trading',
  props: ['web3Plug'],
  components:{  TokenAmountInput , NumericAmountInput},
  data() {
    return {
      depositAmount: 0,
      depositAsset: null,
      purchaseAmount: 0,
      purchaseAsset: null,
      selectedSteps: 1,
      
      selectedInterval: 'days',

      sellAmountPerStep:0,
      intervalMultiplier:1
    }
  },
  watch: {
    
    depositAmount: function (newValue, oldValue) {
      this.updateSellAmountPerStep()
    },
    selectedSteps: function (newValue, oldValue) {
      this.updateSellAmountPerStep()
    }
  },
  computed: {
    selectedStepInversePercent: function(){
      return 100 / this.selectedSteps
    }
  },
  methods: {

    onSelectDepositAsset(tokenAsset){
      this.depositAsset = tokenAsset
    },
     onSelectPurchaseAsset(tokenAsset){
       this.purchaseAsset = tokenAsset
    },
     onSelectSteps(opt){
       this.selectedSteps = opt
    },
     onSelectInterval(opt){
       this.selectedInterval = opt
    },
    onDepositAmountChanged(amount){
      this.depositAmount = parseInt(amount)
    },
     onPurchaseAmountChanged(amount){
       this.purchaseAmount = parseInt(amount)
    },
    onIntervalMultiplierChanged(amount){
       this.intervalMultiplier = parseInt(amount)
    },

    updateSellAmountPerStep(){
      this.sellAmountPerStep = parseInt(this.depositAmount) / parseInt(this.selectedSteps)
      console.log('sellAmountPerStep',this.sellAmountPerStep)
    }
  }

}
</script>
