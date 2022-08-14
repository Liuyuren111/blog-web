import request from "../utils/request";

const URL = {
    captcha: "/admin/v1/captcha",
    login: "/admin/v1/login",
    register: "/admin/v1/register",
};

export function getCaptcha() {
    return request(URL.captcha, "get")
}

// 登陆
export function loginApi(data) {
    return request(URL.login, 'post', data);
}

// 注册
export function registerApi(data) {
    return request(URL.register, "post", data)
}
