import { get, post, put, del } from "./fetch.js";


// 登录 获取用户信息
export function Login(params) {
    return post("user/login", params);
}

// 验证码
export function Vcode(params) {
    return get('verificationCode/code', params,)
}

// 修改用户密码
export function UserPwd(params) {
    return put("user/userPwd", params)
}

// 获取菜单
export function Menu(params) {
    return get(`menu/menuList`, params)
}