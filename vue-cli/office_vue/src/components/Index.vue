<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-logo {
  width: 200px;
  line-height: 30px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float:left;
  position: relative;
  top: 15px;
  left: 20px;
}
.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
}
.ivu-layout-sider {
  height: calc(100vh - 70px);
}
</style>
<template>
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark">
                    <div class="layout-logo">硬件客户管理系统</div>
                    <div class="layout-nav">
                        <Submenu name="2">
                            <template slot="title">
                                {{userName}}
                            </template>
                            <MenuItem name="2-1">
                                <span @click="signOut">退出登录</span>
                            </MenuItem>
                        </Submenu>
                    </div>
                </Menu>
            </Header>
            <Layout>
                <Sider hide-trigger :style="{background: '#fff',borderRight:'1px solid #ccc'}">
                    <Menu  theme="light" width="auto" :open-names="['1']"  @on-select="onClickToPage">

                        <div  v-for="menu,index in menuList" v-show="menuShow">
                            <div v-if="menu.children&&menu.children.length!==0">
                                <Submenu :name="menu.name" v-show="hasAuth(menu.name)">
                                    <template slot="title">
                                        <Icon :type="menu.icon"></Icon>
                                        {{menu.title}}
                                    </template>
                                    <MenuItem  
                                        v-for="submenu,subindex in menu.children" 
                                        :name="submenu.name"
                                        v-show="hasAuth(submenu.name)"
                                    >{{submenu.title}}</MenuItem>
                                </Submenu>
                            </div>
                            <div v-else>
                                <MenuItem  :name="menu.name"  v-show="hasAuth(menu.name)">
                                    <Icon :type="menu.icon"></Icon>
                                    {{menu.title}}
                                </MenuItem>
                            </div>
                        </div>
                    </Menu>
                </Sider>
                <Layout >
                    <Header :style="{background:'#fff',borderBottom:'1px solid #ccc'}">
                      {{pageTitle}}
                    </Header>
                    <Content :style="{padding:'24px', minHeight: '280px', background: '#fff'}">
                        <!-- 默认是UserAdmin页面 -->
                        <router-view></router-view>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>
<script>
import routes from "../router/index"
export default {
  data() {
    return {
        userName:'',
        pageTitle:"",
        menuShow:false,
        menuList:[],
        menuAuthArr:[]
    };
  },
  mounted(){

  },
  watch:{
    //监听路由变化只要变化就把标题名称改了
    $route() {
        // 当路由改变，进行初始化检测
        let routerName = this.$router.currentRoute.meta.title||'';
        this.pageTitle = routerName;
    }
     
  },
  methods: {
    // 登出
    signOut(){
        window.localStorage.setItem('token','')
        this.$router.push({name:'IF_000000'})
    },
    // 点击菜单栏跳转触发的方法
    onClickToPage(name){
        this.$router.push({name})
    },
    hasAuth(path){
        let show = false;
        this.menuAuthArr.map(function(v,i){
            if(path.indexOf(v)!==-1){
                show = true;
            }
        })
        console.log(path+'/'+show)
        // let show = this.menuAuthArr.indexOf(path)!==-1?true:false;
        return show;
    },
    initMenu(){
        this.menuList = [];
        // 我们的菜单位于App路由中，即routes[1].children
        const menuRoutes = routes.options.routes[1].children;
        for(let i=0;i<menuRoutes.length;i++){
            //判断是不是菜单标识
            let isMenu =  menuRoutes[i].isMenu;
            if(isMenu){
                let title = menuRoutes[i].meta.title;
                let icon = menuRoutes[i].meta.icon;
                // 判断是否可展开的菜单
                let expanding = menuRoutes[i].expanding;//代表是否可展开的菜单
                if(expanding){
                    let name = menuRoutes[i].name;
                    let subMenu = {icon:icon, title:title,name:name,children:[]}
                    let subMenuList = menuRoutes[i].children;
                    for(let j=0;j<subMenuList.length;j++){
                        let isMenu = subMenuList[j].isMenu;
                        if(!isMenu) continue;
                        let subTitle = subMenuList[j].meta.title;
                        let subName = subMenuList[j].name;
                        subMenu.children.push({title:subTitle,name:subName})
                    }
                    this.menuList.push(subMenu)
                }else{
                    
                    let name = menuRoutes[i].name;
                    // let redirect = menuRoutes[i].redirect;
                    // path = redirect!==undefined?redirect:path;
                    // 解构赋值
                    this.menuList.push({icon, title, name })
                }
            }
            
        }
    }
  },
  created(){
        //根据token返回的权限数组  校验菜单栏是否显示
        let tokenObj = JSON.parse(window.localStorage.getItem('token')||'');
        if(tokenObj!==null){
            this.menuAuthArr = tokenObj.authArr;
            //设置菜单栏可见 
            this.menuShow = true;
            this.userName = tokenObj.userName;
            this.initMenu();
        }else{
            // 啥都没就直接跳转无权限的页面
            this.$router.push({name:'IF_000001'});
        }
  }
};
</script>