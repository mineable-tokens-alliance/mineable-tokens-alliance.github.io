<template> 
<div>
  <label for="price" class="block text-md font-bold font-medium text-gray-500 text-center">{{labeltext}}</label>
  <div class="mt-1 relative rounded-md shadow-sm">
    
    <input type="text" name="price" v-bind:value="inputAmount" v-on:change="handleInputAmountChanged" :disabled="disableInput == 'true'" class="text-gray-900 font-bold text-xl focus:ring-indigo-500 focus:border-indigo-500 block w-full py-4 pl-7 pr-12   border-gray-300 rounded-md" placeholder="0.00">
   
   
   
    <div class="absolute inset-y-0 right-0 flex items-center my-2 mr-2 bg-black rounded select-none">
      <label for="currency" class="hidden sr-only">Currency</label>


       
     

       <t-dropdown class="select-none" ref="optionDropdown">
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
              class="flex items-center px-3   text-gray-100 transition duration-150 ease-in-out bg-transparent border-2 border-gray-200   focus:outline-none focus:shadow-solid"
              :class="{ 'border-gray-300 bg-gray-500 text-white ': isShown }"
              aria-label="User menu"
              aria-haspopup="true"
              @mousedown="mousedownHandler"
              @focus="focusHandler"
              @blur="blurHandler"
              @keydown="keydownHandler"
            >
               

              {{selectedOption}}

              <span>
              <svg class="svg-icon mx-2" viewBox="0 0 20 20" style="stroke: #aaaaaa;">
                <path d="M13.962,8.885l-3.736,3.739c-0.086,0.086-0.201,0.13-0.314,0.13S9.686,12.71,9.6,12.624l-3.562-3.56C5.863,8.892,5.863,8.611,6.036,8.438c0.175-0.173,0.454-0.173,0.626,0l3.25,3.247l3.426-3.424c0.173-0.172,0.451-0.172,0.624,0C14.137,8.434,14.137,8.712,13.962,8.885 M18.406,10c0,4.644-3.763,8.406-8.406,8.406S1.594,14.644,1.594,10S5.356,1.594,10,1.594S18.406,5.356,18.406,10 M17.521,10c0-4.148-3.373-7.521-7.521-7.521c-4.148,0-7.521,3.374-7.521,7.521c0,4.147,3.374,7.521,7.521,7.521C14.148,17.521,17.521,14.147,17.521,10"></path>
              </svg>
              </span>

            </button>
          </div>

          <div slot-scope="{ hide, blurHandler }" ref="optionSelect" class="border-2 border-white"> 
            <button 
                @click="  onChange($event, hide); "
               v-for="selectOption in selectionOptions"
              class="block w-full px-4 py-2 text-sm leading-5 text-gray-100 transition duration-150 ease-in-out bg-black hover:bg-gray-800 focus:outline-none focus:bg-gray-100"
              role="menuitem"
              @blur="blurHandler"
              v-bind:value="selectOption"
            > 
              

              {{ selectOption }}   
              
            </button>
            

           
          </div>
        </t-dropdown>

      
      <select @change="onChange($event)"  name="currency" class=" hidden focus:ring-indigo-500 focus:border-indigo-500 border-0 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-100   rounded-md">
        <option v-for="selectOption in selectionOptions" class="bg-black text-white" >  {{ selectOption }} </option>
       
      </select>



    </div>



  </div>
     
</div>
</template> 


<script>
  
 import Web3Plug from '../../../js/web3-plug.js' 

export default {
  name: 'NumericAmountInput',
  props: [ 'web3Plug', 'labeltext', 'inputAmount', 'disableInput', 'selectionOptions', 'onSelectCallback', 'onAmountChangedCallback' ],
  components: { },
  data() {
    return {
     // currentAmount: 0,
      selectedOption: null,
      networkName: 'mainnet'
    }
  },
  created(){
    

    let networkId = this.web3Plug.getConnectionState().activeNetworkId
    this.networkName = Web3Plug.getWeb3NetworkName(networkId)
    
    this.selectedOption = this.selectionOptions[0]
  },
  methods: {
    onChange(event, hideMethod) {        
        
         hideMethod() 

         this.selectOption(event.target.value)
    },
    selectOption(opt){
     console.log('selected opt')

     this.selectedOption = opt;
     this.onSelectCallback(opt)

    },
     handleInputAmountChanged(event){
      let newValue = event.target.value
      console.log('handleInputAmountChanged ',newValue)

      this.onAmountChangedCallback(newValue)
    },
    

  }
}
</script>
