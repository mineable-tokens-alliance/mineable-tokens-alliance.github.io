<template>

<div>




   <div class="section bg-gray-200 px-0 lg:px-1 border-b-2 border-gray-500">

     <div class=" ">
       <Navbar
       v-bind:web3Plug="web3Plug"


        />
     </div>


   </div>

   <div class="section bg-gray-100 autospacing mb-16">
     <div class="w-container pt-8">

       <div class="grid   md:grid-flow-col   md:grid-cols-6 gap-4">

         <div class="col-span-5 md:col-span-1  ">
                    Mineable Tokens Alliance
                    
         </div>

         <div class="col-span-5 py-2 ">



         </div>
       </div>









     </div>
   </div>

   <div class="section ctas  ">
     <div class="autospacing w-container">
       <div class="w-row">

       </div>
       <div class="w-row">
         <div class="column w-col w-col-6  ">



            <span class="text-yellow-500 text-md"> Neutral, True, and Immortal </span>
            <br>
          
            <a class="text-white-500 text-xs text-white" href="https://github.com/ethereum/EIPs/blob/master/EIPS/eip-918.md"> Pure Mined EIP918 Tokens </a>




         </div>
         <div class="column-2 w-col w-col-6"><img src="@/assets/images/MineableTokensAlliance.png" width="125" height="125" alt="">

         </div>
       </div>
     </div>
   </div>


   <div class="section dark autospacing hidden ">

   </div>

  <Footer/>

</div>
</template>


<script>
import Navbar from './components/Navbar.vue';
import AppPanel from './components/AppPanel.vue';
import VerticalNav from './components/VerticalNav.vue'
import Footer from './components/Footer.vue';

import Web3Plug from '../js/web3-plug.js'



export default {
  name: 'Home',
  props: [],
  components: {Navbar,AppPanel,VerticalNav,Footer},
  data() {
    return {
      activeSection: 'home',
      web3Plug: null
    }
  },
  created(){
    this.web3Plug = new Web3Plug()
  },
  methods: {
    verticalNavButtonClicked(buttonName){
      this.activeSection = buttonName
      console.log('verticalNavButtonClicked ', buttonName)
    },
/*
    web3RefreshCallback(activeAccountAddress,activeNetworkId){
      console.log('web3RefreshCallback',activeAccountAddress,activeNetworkId )

    },
    web3ErrorCallback(errorMessage){
        console.log('web3ErrorCallback', errorMessage)

    },*/


  }
}
</script>
