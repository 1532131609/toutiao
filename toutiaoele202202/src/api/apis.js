import http from './http'


export function getVideoList(kid){
    return http.get("c?op=getVideosByKid&kid="+kid)
}

export function getArticle(aid){
    return http.get("c?op=getArticleByAid&aid="+aid)
}

export function getKinds(){
    return http.get("c?op=getKinds")
}
export function getComments(aid){
    return http.get("c?op=getCommentsByAid&aid="+aid)
}
//注册
export function regist(formData){
    return http.post("c?op=regist",formData)
}

//搜索
export function search(formData){
    return http.post("c?op=getByTitle",formData)
}


// //管理员登录
// export function adminLogin(formData){
//     return http.post("user/adminLogin",formData)
// } 

//获取头条列表
export function getList(formData){
    return http.post("article/query",formData)
}

//审核头条
export function verify(aid){
    return http.get("article/verify?aid="+aid)
}

//-------------------------------------------------

//管理员后台登录
export function adminLogin(formData){
    return http.post("user/adminLogin",formData)
} 

//获取分类文章的数目
export function getNumsByKind(){
    return http.get("article/getNumsByKind")
} 

//获取用户列表
export function getUserList(formData){
    return http.post("user/list",formData)
}

//封禁&解封用户
export function lockUser(uid,state){
    return http.get("user/lock?uid="+uid+"&state="+state)
}
