<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div id="box">1</div>
    <div id="box">2</div>
    <div id="box">3</div>
    <div id="box">2</div>
    <div id="box">3</div>
    <div id="box">2</div>
    <div id="box">3</div>
    <div id="box">2</div>
    <div id="box">3</div>
    <div id="box">4</div>
    <ul>
      <li>1111</li>
      <li>1111</li>
      <li>1111</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to IF+'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
#box{
  height: 40px;
  width: 375px;
  font-size:24px;
  background: #f2f2f2;
  border:1px solid red;
}
#box:nth-child(2n){
  background: #ccc;
}

</style>
