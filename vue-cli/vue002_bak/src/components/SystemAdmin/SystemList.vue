<template>
  <div class="hello">
    <h2>hello world components</h2>
    <p>{{msg}}</p>
    <div>
      <Button type="primary" @click="addAdminUser">添加系统管理员</Button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SystemList',
  data () {
    return {
      msg: 'Welcome to Your Vue.js hello component'
    }
  },
  methods:{
    addAdminUser(){
      this.$router.push({name:'IF_030002'})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
