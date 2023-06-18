<template>
  <div class="hello">
    <MenuView/>
    <router-view></router-view>
  </div>
</template>

<script>

import MenuView from "./menu";
export default {
  name: 'algorithm-visualizer',
  components: {MenuView},
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
