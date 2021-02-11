<template> 
<div>
  <label for="price" class="block text-md font-medium text-gray-700">{{labeltext}}</label>
  <div class="mt-1 relative rounded-md shadow-sm">
    
    <input type="text" name="price" id="price" class="text-gray-900 font-bold text-xl focus:ring-indigo-500 focus:border-indigo-500 block w-full py-4 pl-7 pr-12   border-gray-300 rounded-md" placeholder="0.00">
    <div class="absolute inset-y-0 right-0 flex items-center my-2 mr-2 bg-black rounded select-none">
      <label for="currency" class="hidden sr-only">Currency</label>


      <div @click="clickedMax" class="bg-white text-black font-bold hover:bg-gray-300 rounded px-2 mx-2 cursor-pointer"> MAX </div> 

      <img v-bind:src="getTokenIcon()" width="16px" class="mx-2" /> 

      
      <select @change="onChange($event)" id="currency" name="currency" class="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-100   rounded-md">
        <option v-for="token in tokenList"  >  {{token.name}} </option>
       
      </select>



    </div>



  </div>
    <div class="text-xs p-2">
   Balance: {{currentBalance}}
  </div>
</div>
</template> 


<script>
 

export default {
  name: 'TokenAmountInput',
  props: [ 'labeltext' ],
  components: { },
  data() {
    return {
      currentBalance: "0.0",
      tokenList: [{ name:"DAI", imgurl:"/assets/images/tokens/dai.png", contractaddress:""   },{ name:"USDC", imgurl:"", contractaddress:""   }],
      selectedTokenData: {}
    }
  },
  created(){
    this.selectedTokenData = this.tokenList[0]
  },
  methods: {
    onChange(event) {        
        this.selectTokenByName(event.target.value)
    },
    selectTokenByName(tokenName){
      for(let tokenData of this.tokenList){
        if(tokenData.name == (tokenName)){
          this.selectedTokenData = tokenData
          return
        }
      }
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
