function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return (false);
}

function getLocalTime(nS) {
    return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
}

/*获取url参数*/
let userId = getQueryVariable("userId");
if (userId==""||userId==null){
    window.location="404"
}

/*获取个人信息，关注 粉丝 点赞 文章数*/
$.ajax({
    url: GLOBAL_DATA.API_SERVER_URL + "/u/" + userId,
    data: "",
    type: "Get",
    dataType: "json",
    contentType: "application/json;charset=utf-8",
    timeout: 4000,
    xhrFields: {
        withCredentials: true //允许跨域
    },


    success: function (data) {
        if (data.error=="Internal Server Error"){
            alert("服务错误");
            window.location="index"
        }

        if (data.code == 100) {
            let follow = data.extend.infos.follow;//用户关注
            let flower = data.extend.infos.flower;//用户粉丝
            let articleCount = data.extend.infos.articleCount;//用户文章数
            let like = data.extend.infos.like;//用户获得喜欢数
            let avatarPath = data.extend.user.avatarPath;//用户头像
            let intro = data.extend.user.intro;//用户介绍
            let nickName = data.extend.user.nickName;//用户昵称
            $(".user div a img").attr("src", avatarPath);
            $("head title").html(nickName + " - 简书")
            if (follow == null) {
                follow = 0;
            }
            if (flower == null) {
                flower = 0;
            }
            if (articleCount == null) {
                articleCount = 0;
            }
            if (like == null) {
                like = 0;
            }

            let infos = `
                <a class="avatar" href="/u/${userId}">
                    <img src="${avatarPath}" alt="240">
                </a>

                <div class="title">
                    <a class="name" href="/u/${userId}">${nickName}</a>
                </div>
            <div class="info">

                    <ul>
                        <li>
                            <div class="meta-block">
                                <a href="/users/${userId}/following">
                                    <p>${follow}</p>
                                    关注 <i class="iconfont ic-arrow"></i>
                                </a>        </div>
                        </li>
                        <li>
                            <div class="meta-block">
                                <a href="/users/${userId}/followers">
                                    <p>${flower}</p>
                                    粉丝 <i class="iconfont ic-arrow"></i>
                                </a>        </div>
                        </li>
                        <li>
                            <div class="meta-block">
                                <a href="/u/${userId}">
                                    <p>${articleCount}</p>
                                    文章 <i class="iconfont ic-arrow"></i>
                                </a>        </div>
                        </li>
                        <li>
                            <div class="meta-block">
                                <p>${like}</p>
                                <div>收获喜欢</div>
                            </div>
                        </li>
                    </ul>
                </div>

            `
            $(".main-top").append(infos);
            $(".js-intro").html(intro)


        }

    }

})

 /*添加专题*/
function new_collectionn(userId,name,describe) {

    $.ajax({
        url: GLOBAL_DATA.API_SERVER_URL + "/c/addSpecial" ,
        data: JSON.stringify({userId:userId,name:name,describe:describe}),
        type: "POST",
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        timeout: 4000,
        xhrFields: {
            withCredentials: true //允许跨域
        },
        success: function (data) {
            if (data.code==100){
                alert("创建成功！")
                window.location="myhome?userId="+userId;
            }
        },
        error:function () {
            window.location="myhome?userId="+userId;
        }
    })

}
$("#div_submit").click(function () {
    let name=$("#username").val();
    let describe=$("#textareaDesc").val();

    new_collectionn(userId,name,describe);
});
