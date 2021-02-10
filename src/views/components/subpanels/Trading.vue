<template>
  <div>


  <div class="uppercase font-bold">Trade</div>
  <hr class="font-bold"> 


  <div class="bg-black p-2 m-4">

      <div class="  border-2 border-gray-500 m-6 p-6 text-center">
      I have
      <div> --- </div> 
      </div>


      <div class="  border-2 border-gray-500 m-6 p-6 text-center">
      I want
      <div> --- </div> 
      </div>



    <div class="  text-center">Auto-financing Schedule</div>
      <div class=" border-2 border-gray-500 m-6 p-6 text-center">
      Swap X token for Y at best price - every Z blocks 
    
      </div>

   


</div>

 <div class="mt-12">
    <div class="cursor-pointer bg-green-400 hover:bg-green-500 border-2 border-gray-300 p-4 m-4 text-center text-gray-100 font-bold">
    Confirm
    </div>

</div>


  </div>
</template>

<script>

const Web3 = require('web3')

export default {
  name: 'Trading',
  props: ['web3Plug'],
  components:{   },
  data() {
    return {
    }
  },
  methods: {
  }

}
</script>
