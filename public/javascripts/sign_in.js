//注册表单对象
var sign_in_inputs = {
    data: {
        nickName: function () {
            return $("#session_nickname").val();
        },
        password: function () {
            return $("#session_password").val();
        },
        rememberMe: function () {
            return $("#session_remember_me").prop('checked');
        }
    },
    methods: {
        formatCheck: function () {
            //用户昵称正则,中文、英文、数字但不包括下划线等符号
            const nickNameReg = /^[\u4E00-\u9FA5A-Za-z0-9]+$/;

            //密码正则,至少八个字符，至少一个字母和一个数字
            const passwordReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

            let data = {
                nickName: sign_in_inputs.data.nickName(),
                password: sign_in_inputs.data.password(),
                rememberMe: sign_in_inputs.data.rememberMe()
            };

            if (!nickNameReg.test(data.nickName)) {
                sign_in_inputs.methods.errorPrompt("昵称格式错误,不包括符号");
                return false;
            }
            if (!passwordReg.test(data.password)) {
                sign_in_inputs.methods.errorPrompt("密码格式错误,八个以上字母和数字");
                return false;
            }

            return data;
        },
        signInAjax: function () {
            let formatCheckdata = sign_in_inputs.methods.formatCheck();
            if (!formatCheckdata) {
                console.log("ajax formatCheck false");
                return;
            }

            $.ajax({
                url: GLOBAL_DATA.API_SERVER_URL + "/login",
                data: JSON.stringify(formatCheckdata),
                type: "POST",
                dataType: "json",
                timeout: 4000,
                // headers: {'Authorization': GLOBAL_METHODS.GET_TOKEN},
                // headers: {'Authorization': 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiLlpKfprZTnjosiLCJleHAiOjE1NzQ0MjMwNzF9.aZN3l8miF3M75r5KZskBjbva6_n4Owzr_QbB66QQMMdL_eXDXe7PKS8p-OzoNboDV1KdCDHNqedUIgteEwTEdQ'},
                contentType: "application/json;charset=utf-8",
                xhrFields: {
                    withCredentials: true //允许跨域
                },
                success: function (data) {

                    //显示登录成功信息
                    sign_in_inputs.methods.normalPrompt();
                    //储存token到cookie,使用了js-cookie插件
                    if (data.token !== undefined) {
                        console.log(data)
                        Cookies.set('token', data.token, {expires: 7, path: '/'});
                        //跳转首页
                        window.location.replace("/");
                    }

                },
                error: function (error) {
                    console.log(error);
                    sign_in_inputs.methods.errorPrompt("登录失败");
                }
            });

        },
        errorPrompt: function (data) {
            $("#error_prompt").text(data).css("display", "block");
        },
        offErrorPrompt: function () {
            $("#error_prompt").css("display", "none");
        },
        normalPrompt: function () {
            $("#success_normal").css("display", "block");
        }
    }
};

//点击登录按钮
$("#sign-in-form-submit-btn").click(function (e) {
    //隐藏提示
    sign_in_inputs.methods.offErrorPrompt();
    //登录请求
    sign_in_inputs.methods.signInAjax();
});

//输入框获取焦点
$("#session_nickname,#session_password").focus(function (e) {
    //隐藏提示
    sign_in_inputs.methods.offErrorPrompt();
});

