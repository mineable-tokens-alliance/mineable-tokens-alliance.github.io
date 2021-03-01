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
                  disableInput=false

                               />  
          </div> 

          </div>
      </div>


       <div class="  border-0 border-gray-500 m-6 p-2 ">
        <div class="w-3/4" style="margin:0 auto">
           
          <div>   <TokenAmountInput 
                  v-bind:web3Plug="web3Plug"  
                  labeltext="Select Coin to Purchase" 
                  disableInput=true

                               />  
          </div> 

          </div>
      </div>

        <div class="  border-0 border-gray-500 m-6 p-2 ">
        <div class="w-3/4" style="margin:0 auto">
           
          <div>   <NumericAmountInput 
                  v-bind:web3Plug="web3Plug"  
                  labeltext="Select Steps" 
                  v-bind:selectionOptions="['10%']"

                               />  
          </div> 

          </div>
      </div>

        <div class="  border-0 border-gray-500 m-6 p-2 ">
        <div class="w-3/4" style="margin:0 auto">
           
          <div>   <NumericAmountInput 
                  v-bind:web3Plug="web3Plug"  
                  labeltext="Select Purchase Interval" 
                  v-bind:selectionOptions="['Days']"

                               />  
          </div> 

          </div>
      </div>


    <div v-if="depositAsset && purchaseAsset">
     <div class="  text-center">Auto-financing Schedule</div>
      <div class=" border-2 border-gray-500 m-6 p-6 text-center">
      The Step Finance contract will purchase {{depositAmount}} {{depositAsset.name}} () worth of {{purchaseAsset.name}} every 10 Days.
    
     </div>
  </div>
   
 <div class="mt-12" v-if="depositAsset">
    <div class="cursor-pointer bg-green-400 hover:bg-green-500 border-2 border-gray-300 p-4 m-4 text-center text-gray-100 font-bold">
    Approve {{depositAsset.name}}
    </div>

 <div class="cursor-pointer bg-green-400 hover:bg-green-500 border-2 border-gray-300 p-4 m-4 text-center text-gray-100 font-bold">
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
    }
  },
  methods: {
  }

}
</script>
