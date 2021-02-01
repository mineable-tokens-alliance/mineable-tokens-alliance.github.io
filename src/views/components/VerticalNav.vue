<template>
  <div   class="navbar h-nav">
    <div class="    ">

      <div @click="onClick(name)" v-for="name in buttonNames" class=" bg-gray-200 border-2 border-gray-500 hover:bg-green-200 cursor-pointer capitalize text-gray-900 text-center p-2 m-2">  {{name}} </div>


    </div>
  </div>
</template>


<script>

export default {
  name: 'VerticalNav',
  props: ['buttonClickedCallback'],
  components: { },
  data() {
    return {
      buttonNames: ['home','trading','staking','analytics']
    }
  },
  methods: {
    onClick(buttonName){ 
      this.buttonClickedCallback(buttonName)
    }
  }
}
</script>
