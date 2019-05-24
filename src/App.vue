<template>
  <div id="app">
    <Puzzle />
  </div>
</template>

<script>
import Puzzle from './components/Puzzle.vue'

export default {
  name: 'app',
  components: {
    Puzzle
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
