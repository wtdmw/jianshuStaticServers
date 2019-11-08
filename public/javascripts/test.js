//点击登录按钮
$("#test_button").click(function (e) {
    console.log(1)

    let data = {
        password: "234234"
    };


    $.ajax({
        url: GLOBAL_DATA.API_SERVER_URL + "/test/sss",
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
        },
        error: function (error) {
            console.log(error);
        }
    });
});