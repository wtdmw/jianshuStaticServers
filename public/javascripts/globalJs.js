//全局常量
const GLOBAL_DATA = {
    //数据服务器url
    API_SERVER_URL: 'http://localhost:8080',
};

//公用方法
const PUBLIC_METHODS = {
    getToken: function () {
        return Cookies.get('token');
    },
    loginDetection: function () {
        let pathname = window.location.pathname;
        if (pathname !== "/sign_in" && pathname !== "/sign_up" && pathname !== "/404" && PUBLIC_METHODS.getToken() == null) {
            //跳转登录页
            window.location.replace("/sign_in");
        }
    }
};

//自运行函数
(function () {
    //登录检查
    PUBLIC_METHODS.loginDetection();
})();
