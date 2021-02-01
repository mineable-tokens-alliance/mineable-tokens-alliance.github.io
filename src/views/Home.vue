<template>

<div>




   <div class="section bg-gray-200 px-0 lg:px-1 border-b-2 border-gray-500">

     <div class=" ">
       <Navbar />
     </div>


   </div>

   <div class="section bg-gray-100 autospacing ">
     <div class="w-container pt-8">

       <div class="grid grid-cols-6 grid-flow-col gap-4">

         <div class="col-span-1  ">   <VerticalNav v-bind:buttonClickedCallback="verticalNavButtonClicked" /> </div>
         <div class="col-span-5  ">     </div>
       </div>






        <!--
        <div class="text-gray-100 p-8">

        </div>
      -->


     </div>
   </div>

   <div class="section ctas">
     <div class="autospacing w-container">
       <div class="w-row">

       </div>
       <div class="w-row">
         <div class="column w-col w-col-6  ">



            <h2 class="text-yellow-500"> 0xBTC-ETH Pair </h2>

            <a href="https://0xbtc.info/" target="_blank" class='text-gray-200'>
                 -> 0xBTC Mining Stats
                </a>
                <br>

           <a href="https://info.uniswap.org/pair/0xc12c4c3e0008b838f75189bfb39283467cf6e5b3" target="_blank" class='text-gray-200'>
                -> Uni Pool Statistics

               </a>



         </div>
         <div class="column-2 w-col w-col-6"><img src="@/assets/images/coins.svg" width="125" height="125" alt="">

         </div>
       </div>
     </div>
   </div>
   <div class="section dark autospacing  ">

   </div>

  <Footer/>

</div>
</template>


<script>
import Navbar from './components/Navbar.vue';
import ZapPanel from './components/ZapPanel.vue';
import VerticalNav from './components/VerticalNav.vue'
import Footer from './components/Footer.vue';

export default {
  name: 'Home',
  props: [],
  components: {Navbar,ZapPanel,VerticalNav,Footer},
  data() {
    return {

    }
  },
  methods: {
    verticalNavButtonClicked(buttonName){

            console.log('verticalNavButtonClicked ', buttonName)
    }

  }
}
</script>
