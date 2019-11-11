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
        console.log(pathname);
        console.log(PUBLIC_METHODS.getToken())

        if (pathname === "/404") {
            return;
        }

        if (pathname === "/sign_in" || pathname === "/sign_up") {

            if (PUBLIC_METHODS.getToken() === undefined) {
                return;
            } else {
                window.location.replace("/");
                return;
            }
        }

        if (PUBLIC_METHODS.getToken() === undefined) {
            window.location.replace("/sign_in");
        }
    },
    abbreviationDisplay: function (data) {
        return data.slice(0, 60) + "..."
    }
};

//自运行函数
(function () {
    //登录检查
    PUBLIC_METHODS.loginDetection();
})();
