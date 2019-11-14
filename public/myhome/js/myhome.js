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
    return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
}

// ?userId=14e52e9a4a48

//
// url获取


//cookie获取
let userId = "";


let queryString = PUBLIC_METHODS.getQueryString(`userId`);
if (queryString !== null) {
    userId = queryString
} else {
    userId = Cookies.get('id');
}

if (userId === "" || userId == null) {
    window.location = "404";
}

/*定义页面变量*/
let currentPage = 0;
let currentLogUser = "";


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
        if (data.code === 100) {
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

    },
    error: function () {
        window.location = "index";
    }

})

/*获取文章*/
function getArticle(currentPage) {
    $.ajax({
        url: GLOBAL_DATA.API_SERVER_URL + "/u/getArticleList",
        data: {userId: userId, currentPage: currentPage},
        type: "Get",
        dataType: "json",
        contentType: "application/text;charsetset=UTF-8",
        timeout: 4000,
        xhrFields: {
            withCredentials: true //允许跨域
        },

        success: function (data) {
            if (data.code == 100 && data.message == "获取成功") {
                let articleList = data.extend.list;
                let ariticle = "";
                currentLogUser = data.extend.currentLogUser;

                $.each(articleList, function (index, ele) {
                        let time = getLocalTime(ele.timeStamp);
                        let content = ele.content.substring(0, 70);
                        let img = ele.contentImg;
                        // if (img==null||img==""){
                        //     img ="https://upload-images.jianshu.io/upload_images/13895669-ce9aac19c6c4da1b?imageMogr2/auto-orient/strip%7CimageView2/1/w/300/h/240";
                        // }

                        ariticle += `
                            <li id="note-${ele.id}" data-note-id="${ele.id}" class="have-img">
                <a class="wrap-img" href="/p/e01fa9975030" target="_blank">
                  <img class="  img-blur-done" src="/public/images/1891933-76e3d08efdba8402.jfif"  alt="120">
                </a>
              <div class="content ">
                <a class="title" target="_blank" href="/p/e01fa9975030">${ele.title}</a>
                <p class="abstract">
                       ${content}
                </p>
                <div class="meta">
                    <span class="jsd-meta">
                      <i class="iconfont ic-paid1"></i> 0.7
                    </span>
                  <a target="_blank" href="/p/e01fa9975030">
                    <i class="iconfont ic-list-read"></i> 7
            </a>        <a target="_blank" href="/p/e01fa9975030#comments">
                      <i class="iconfont ic-list-comments"></i> 1
            </a>      <span><i class="iconfont ic-list-like"></i>${ele.like}</span>
                  <span class="time" data-shared-at="${time}">${time}</span>
                </div>
              </div>
            </li>                            
                    `

                    },
                )

                $("#list-container ul").append(ariticle);
                // $("#list-container img").each(function (index,ele) {
                //    $(this).attr("src",arrImg[index]);
                // });
            } else if (data.code == 200) {
                window.location = "404.html"
            }
        }
    });
};

if (currentPage == 0) {
    getArticle(currentPage);
}

$("#yuedugengduo").click(function () {
    currentPage = currentPage + 1;
    getArticle(currentPage);
});
$(".trigger-menu li").click(function () {
    currentPage = 0;
    $(this).siblings().removeClass("active");
    $(this).addClass("active");
    var lastSelect = $(".trigger-menu li[class='active']");
    $("#list-container ul").empty();
    if ($(this).index() == 0) {
        getArticle(currentPage);

    }


})



