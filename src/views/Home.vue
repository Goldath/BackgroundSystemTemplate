<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
     <Button type="primary" @click="cesidianji">Primary</Button>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    // HelloWorld
  },
    methods: {
      cesidianji(){
     this.$utils.handleReset("1232131")
      }

  }
}
</script>
