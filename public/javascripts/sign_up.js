//注册表单对象
var sign_up_inputs = {
    data: {
        nickName: function () {
            return $("#user_nickname").val();
        },
        mobileNumber: function () {
            return $("#user_mobile_number").val();
        },
        password: function () {
            return $("#user_password").val();
        }
    },
    methods: {
        formatCheck: function () {
            //用户昵称正则,中文、英文、数字但不包括下划线等符号
            const nickNameReg = /^[\u4E00-\u9FA5A-Za-z0-9]+$/;

            //手机号正则，11位
            const mobileNumberReg = /^1[3|4|5|8][0-9]\d{4,8}$/;

            //密码正则,至少八个字符，至少一个字母和一个数字
            const passwordReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

            let data = {
                nickName: sign_up_inputs.data.nickName(),
                mobileNumber: sign_up_inputs.data.mobileNumber(),
                password: sign_up_inputs.data.password()
            };

            if (!nickNameReg.test(data.nickName)) {
                sign_up_inputs.methods.errorPrompt("昵称格式错误,不包括符号");
                return false;
            }
            if (!mobileNumberReg.test(data.mobileNumber)) {
                sign_up_inputs.methods.errorPrompt("手机号格式错误");
                return false;
            }
            if (!passwordReg.test(data.password)) {
                sign_up_inputs.methods.errorPrompt("密码格式错误,八个以上字母和数字");
                return false;
            }

            return data;
        },
        signUpAjax: function () {
            let formatCheckdata = sign_up_inputs.methods.formatCheck();
            if (!formatCheckdata) {
                console.log("ajax formatCheck false");
                return;
            }

            $.ajax({
                url: GLOBAL_DATA.API_SERVER_URL + "/user/addUser",
                data: JSON.stringify(formatCheckdata),
                type: "POST",
                dataType: "json",
                timeout: 4000,
                contentType: "application/json;charset=utf-8",
                xhrFields: {
                    withCredentials: true //允许跨域
                },
                success: function (data) {
                    console.log(data)
                    sign_up_inputs.methods.normalPrompt()
                    window.location.replace("/sign_in");
                },
                error: function (error) {
                    console.log(error)
                    sign_up_inputs.methods.errorPrompt("注册失败");
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

//点击注册按钮
$("#sign_up_btn").click(function (e) {
    //隐藏提示
    sign_up_inputs.methods.offErrorPrompt();
    //登录请求
    sign_up_inputs.methods.signUpAjax();
});

//输入框获取焦点
$("#user_nickname,#user_mobile_number,#user_password").focus(function (e) {
    //隐藏提示
    sign_up_inputs.methods.offErrorPrompt();
});

