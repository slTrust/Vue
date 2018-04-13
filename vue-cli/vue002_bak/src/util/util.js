// 权限判定方法  传递权限数组authArr['IF_010000','IF_010001','IF_010002'] 和路由名称  IF_010000
function hasAuth(authArr,name){
    let hasAuth = false;
    if(Array.isArray(authArr)){
        // 如果是跳转登录页 无权限 首页 
        if(name==='IF_000000'||name==='IF_000001'||name==='IF_999999'){
            hasAuth = true;
        }else{
            hasAuth = authArr.indexOf(name)!==-1;
        }
    }
    console.log('util鉴权方法'+hasAuth+'  ,  路由名称'+name)
    return hasAuth;
    
}
export default {
    hasAuth
}
