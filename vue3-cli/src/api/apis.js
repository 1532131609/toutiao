import http from './http'
// export function getList(kid){
//     return http.get("article/getByKind?kid="+kid)
// }

export function getVideoList(kid){
    return http.get("article/getVideosByKid?kid="+kid)
}

// export function getArticle(aid){
//     return http.get("article/getByAid?aid="+aid)
// }

// export function getKinds(){
//     return http.get("kind/list")
// }

export function getComments(aid){
    return http.get("comment/getByAid?aid="+aid)
}

export function checkUsername(username){
    return http.get("user/checkUsername?username="+username)
}

//我的评论
export function getMyComments(uid,pageNo){
    return http.get("comment/getByUid?uid="+uid+"&pageNo="+pageNo)
}

//删除我的评论
export function removeComments(cid){
    return http.get("comment/remove?cid="+cid)
}


//注册
export function regist(formData){
    return http.post("user/regist",formData)
}

//搜索
export function search(formData){
    return http.post("article/getByTitle",formData)
}

// 登录
// export function login(formData){
//     return http.post("user/login",formData)
// }

//添加评论
// export function addCom(formData){
//     return http.post("comment/add",formData)
// }

//---------------------------------------------------------------------------------
//获取头条列表
export function getList(kid){
    return http.get("article/getByKid?kid="+kid);
}
//获取分类
export function getKinds(){
    return http.get("kind/list")
}

//获取头条详情
export function getArticle(aid){
    return http.get("article/getByAid?aid="+aid)
}

//下载文件
export function downloadFile(filename){
    return http.getF("article/download?filename="+filename)
}

//添加评论
export function addCom(formData){
    return http.post("comment/add",formData)
}


//登录
export function login(formData){
    return http.post("user/login",formData)
}

//添加头条
export function addArticle(formData){
    return http.post("article/add",formData)
}


//关注作者
export function follow(userId,followUserId){
    return http.get("followUser/follow?userId="+userId+"&followUserId="+followUserId)
}

//取消关注
export function disFollow(userId,followUserId){
    return http.get("followUser/disFollow?userId="+userId+"&followUserId="+followUserId)
}

//判断是否关注
export function isFollow(userId,followUserId){
    return http.get("followUser/isFollow?userId="+userId+"&followUserId="+followUserId)
}

//获取作者发布的头条
export function getByUid(uid,pageNo){
    return http.get("article/getByUid?uid="+uid+"&pageNo="+pageNo)
}

//获取关注列表
export function getFollowUsersByUserId(userId){
    return http.get("followUser/getFollowUsersByUserId?userId="+userId)
}

//获取粉丝列表
export function getUsersByFollowUserId(followUserId){
    return http.get("followUser/getUsersByFollowUserId?followUserId="+followUserId)
}

//获取聊天列表
export function getChatList(pageNo,fromUser,toUser){
    return http.get("chatmsg/list?pageNo="+pageNo+"&fromUser="+fromUser+"&toUser="+toUser)
}

//添加聊天
export function chat(formData){
    return http.post("chatmsg/add?",formData)
}

export function sendMail(email){
    return http.get("user/sendMail?email="+email)
}