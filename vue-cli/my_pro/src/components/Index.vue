<template>
  <div class="index">
      <div class="main">
          <router-view></router-view>
      </div>
      <ul class="nav">
          <li v-for="(item,idx) in navList" @click="toLink">
              {{item.name}}
          </li>
      </ul>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      msg: "index",
      currentIdx: 0,
      navList: [
        { name: "操作a", link: "/a" },
        { name: "操作b", link: "/b" },
        { name: "操作c", link: "/c" },
        { name: "操作d", link: "/d" }
      ]
    };
  },
  methods: {
    mounted() {},
    toLink(){
        console.log(this)
    }
  }
};
</script>

<style scoped>
.index {
  height: 100vh;
  display: flex;
  flex-direction: column;
  color: initial;
}
.index .main {
  flex-grow: 1;
}
.index .nav {
  border-top: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
}
.index .nav li {
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
  padding: 10px 3px;
  flex: 1;
  text-align: center;
}
.index .nav li.active {
  color: #0089e1;
  font-weight: bold;
}
</style>
