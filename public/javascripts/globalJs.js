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
    },
    outLogin: function () {
        Cookies.remove('token');
        window.location.replace("/sign_in");
    },
    getQueryString: function (key) {
        var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
        var result = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    },
    followUser: function (followUserid, fn) {
        // 关注用户
        // 传入被关注用户的id
        // fn 成功回调函数
        let data = {
            followUserid: followUserid
        };

        $.ajax({
            url: GLOBAL_DATA.API_SERVER_URL + "/follow",
            data: JSON.stringify(data),
            type: "POST",
            dataType: "json",
            timeout: 4000,
            contentType: "application/json;charset=utf-8",
            xhrFields: {
                withCredentials: true //允许跨域
            },
            success: function (data) {
                console.log(data)
                if (data.data === "ok") {
                    fn("ok");
                }

            },
            error: function (error) {
                console.log(error)
            }
        });

    },
    unfollowUser: function (followUserid, fn) {
        // 关注用户
        // 传入被关注用户的id
        // fn 成功回调函数
        let data = {
            followUserid: followUserid
        };

        $.ajax({
            url: GLOBAL_DATA.API_SERVER_URL + "/follow",
            data: JSON.stringify(data),
            type: "DELETE",
            dataType: "json",
            timeout: 4000,
            contentType: "application/json;charset=utf-8",
            xhrFields: {
                withCredentials: true //允许跨域
            },
            success: function (data) {
                console.log(data)
                if (data.data === "ok") {
                    fn("ok");
                }

            },
            error: function (error) {
                console.log(error)
            }
        });

    }
};

//自运行函数
(function () {
    //登录检查
    PUBLIC_METHODS.loginDetection();
    //导航栏头像修改
    $("#usertouxiang").attr("src",Cookies.get("avatarPath"))

})();

//导航栏
$("#navbar-my").hover(function () {
        $("#navbar-my").addClass("open");
    },
    function () {
        $("#navbar-my").removeClass("open");
    });
$("#outlogin").click(function () {
    PUBLIC_METHODS.outLogin()
});
$("#searchButton").click(function () {
    let val = $("#q").val();
    console.log(val)
    if (val !== "") {
        window.location.replace('/search?searchValu=' + val);
    }
});