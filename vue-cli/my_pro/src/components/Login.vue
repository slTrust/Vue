<template>
  <div class="login">
    <!-- <img :src="img" alt=""> -->
    <img :src="img2" alt="">
    <h1>{{ msg }}</h1>
    <div class="box">
      <p>dddd</p>
    </div>
    <ul>
      <li>
          <label for="">
              <span>用户名：</span>
              <input type="text" value="">
          </label>
      </li>
       <li>
          <label for="">
              <span>密码：</span>
              <input type="text" value="">
          </label>
      </li>
    </ul>
  </div>
</template>

<script>
import img from '../assets/logo.png';
export default {
  name: 'Login',
  data () {
    return {
      msg: 'Welcome to IF+',
      img:img,
      img2:'../../static/img/aa.png'
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
.box{
  height: 320px;
  width: 320px;
  background:url('../../static/img/aa.png') no-repeat;
}

</style>
