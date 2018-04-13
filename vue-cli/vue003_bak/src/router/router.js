import Util from '../util/util'
// 路由跳转之前
function beforeRouter(router){
    //路由守卫  跳转之前
router.beforeEach((to, from, next) => {
    let token = window.localStorage.getItem('token')
    console.log('路由跳转之前验证token='+token)
    // 防止死循环   如果跳转的路径已经是login则  直接进入
    if(to.name==='IF_000000'){
      next()
    //用户自己把token干掉  则路由跳转的时候直接进入
    }else if (!token || token === null||to.path==='/') {
        next({name: 'IF_000000'})
    } else {
        // 鉴权
        let tokenObj = JSON.parse(token);
        let tokenAuth = tokenObj.authArr;
        
        let hasAuth = Util.hasAuth(tokenAuth,to.name);
        // console.log('配置路径鉴权已经失效')
        // hasAuth = true
        if(hasAuth){
            next()
        }else{
            // 鉴权失败跳转到无权限页面
            next({name: 'IF_000001'})
        }
    }
  })
}

export default beforeRouter