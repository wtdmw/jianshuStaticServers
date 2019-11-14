var follows = {
    data: {},
    method: {
        getuserFollows: function () {
            $.ajax({
                url: GLOBAL_DATA.API_SERVER_URL + "/userFollows",
                type: "GET",
                dataType: "json",
                timeout: 4000,
                // headers: {'Authorization': GLOBAL_METHODS.GET_TOKEN},
                // headers: {'Authorization': 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiLlpKfprZTnjosiLCJleHAiOjE1NzQ0MjMwNzF9.aZN3l8miF3M75r5KZskBjbva6_n4Owzr_QbB66QQMMdL_eXDXe7PKS8p-OzoNboDV1KdCDHNqedUIgteEwTEdQ'},
                contentType: "application/json;charset=utf-8",
                xhrFields: {
                    withCredentials: true //允许跨域
                },
                success: function (data) {
                    follows.method.userFollows(data.userFollows)
                    follows.method.userSpecial(data.userSpecial)
                },
                error: function (error) {
                    console.log(error);
                }

            });
        },
        userFollows: function (userFollows) {
            console.log(userFollows);
            var html = "";
            $.each(userFollows, function (i, n) {
                if (n.nickName !== '' && n.avatarPath !== '' && n.id !== '') {
                    html += `<li nickName= ${n.nickName} class=""><a  class="wrap">
                       <div class="avatar-collection"><img src= ${n.avatarPath}></div>
                       <div class="name">${n.nickName}</div> </a></li>`
                }
            });
            // console.log(html);
            $("#leftNav").append(html);
            follows.method.toAuthodList("解绑");
        },
        userSpecial: function (userSpecial) {
            console.log(userSpecial)
            var html = '';
            $.each(userSpecial, function (i, n) {
                if (n.name !== '' && n.headImgUrl !== '') {
                    html += ` <li special="${n.name}" class=""><a class="wrap"><div class="avatar-collection"><img src=${n.headImgUrl}></div>
        <div class="name">${n.name}</div> </a></li>`
                }
            });
            $("#leftNav").append(html);
        },
        // 跳转到作者主页
        toAuthodList: function (nickName) {
            console.log(nickName);
            $.ajax({
                url: GLOBAL_DATA.API_SERVER_URL + "/specialArticles",
                timeout: 4000,
                type: "GET",
                dataType: "json",
                data: {nickNames: nickName},
                // headers: {'Authorization': GLOBAL_METHODS.GET_TOKEN},
                // headers: {'Authorization': 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiLlpKfprZTnjosiLCJleHAiOjE1NzQ0MjMwNzF9.aZN3l8miF3M75r5KZskBjbva6_n4Owzr_QbB66QQMMdL_eXDXe7PKS8p-OzoNboDV1KdCDHNqedUIgteEwTEdQ'},
                contentType: "application/json;charset=utf-8",
                xhrFields: {
                    withCredentials: true //允许跨域
                },
                success: function (data) {
                    console.log(data);
                    // console.log(specialArticles);
                    // alert(specialArticles);
                    var html = "";

                    $("#rightNav").empty();
                    if (data.user.avatarPath !== '' && data.user.nickName !== '') {
                        let htmls = `<a href="/myhome?userId=${data.user.id}" target="_blank" class="avatar"><img src="${data.user.avatarPath}"></a> <a href="/myhome?userId=${data.user.id}" target="_blank" class="btn btn-hollow">
      个人主页<i class="iconfont ic-link"></i></a> <div class="title"><a href="/myhome?userId=${data.user.id}" target="_blank" class="name">${data.user.nickName}</a> <img src="//upload.jianshu.io/user_badge/f17e9e0e-33aa-47c9-a444-4270e511654a" data-toggle="tooltip" data-original-title="简书签约作者" class="badge-icon"> <i class="iconfont ic-woman"></i></div> <div class="info">写了267331字，获得了1455个喜欢</div>`
                        $("#rightNav").append(htmls);
                    }

                    $.each(data.specialArticles, function (i, n) {

                        if (n.title !== '' && n.content !== '') {
                            html += `
                        <ul class="note-list"><div><li class=""><!----> <div class="content"><a href="/p/bc976eed7113" target="_blank" class="title">${n.title}</a>
                            <p class="abstract">${PUBLIC_METHODS.abbreviationDisplay(n.content)}</p>`;
                        }

                    });

                    $("#rightNav").append(html);
                },
                error: function (error) {
                    console.log(error);
                }

            })
        },
        follow: function () {
            $.ajax({
                url: GLOBAL_DATA.API_SERVER_URL + "/follow",
                timeout: 4000,
                type: "GET",
                dataType: "json",
                // headers: {'Authorization': GLOBAL_METHODS.GET_TOKEN},
                // headers: {'Authorization': 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiLlpKfprZTnjosiLCJleHAiOjE1NzQ0MjMwNzF9.aZN3l8miF3M75r5KZskBjbva6_n4Owzr_QbB66QQMMdL_eXDXe7PKS8p-OzoNboDV1KdCDHNqedUIgteEwTEdQ'},
                contentType: "application/json;charset=utf-8",
                xhrFields: {
                    withCredentials: true //允许跨域
                },
                success: function (data) {
                }
            })

        },
        selected: function (data) {
            //清除class
            $("#leftNav li").removeClass("router-link-exact-active active");
            //点击li添加class
            $(data).addClass("router-link-exact-active active")

        }


    }
};
(function () {
    follows.method.getuserFollows();
})();
/*
* 点击
* 根据点击事件参数判断用户还是专题并获取参数
* 根据参数调用请求方法
* */
$("#leftNav").click(function (e) {
    // console.log(e.target);
    // $(e.target).parent("li")
    // console.log( $(e.target).parent("li"));
    // console.log($( $(e.target).parent("li")[0]).attr("nickName"));
    let nickName = $($(e.target).parent("li")[0]).attr("nickName");

    if ($($(e.target).parent("li")[0]).attr("nickName") !== undefined) {
        follows.method.selected($(e.target).parent("li")[0]);
        follows.method.toAuthodList(nickName);
    }
});

$("#recommendation").click(function () {
    follows.method.follow();
});

