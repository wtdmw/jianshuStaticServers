var comment = {
    data: {
        followTwoList: []
    },
    method: {
        getComment: function (content) {

            $.ajax({
                url: GLOBAL_DATA.API_SERVER_URL + "/" + content,
                type: "GET",
                dataType: "json",
                timeout: 4000,
                contentType: "application/json;charset=utf-8",
                xhrFields: {
                    withCredentials: true //允许跨域
                },
                success: function (data) {
                    if (content === "comment") {
                        comment.method.pingLun(data)
                    } else if (content === "chats") {
                        comment.method.chats(data)
                    } else if (content === "likes") {
                        comment.method.likes(data)
                    } else if (content === "follow") {
                        comment.data.followTwoList = data.followTwoList;
                        comment.method.follow(data)
                    }
                    console.log(data);
                },
                error: function (error) {
                    console.log(error)
                }
            });

        },
        pingLun: function (data) {
            // console.log(data)
            //清空table表格
            $("#right-list").empty();
            $("#right-list").append('<div><div class="menu">收到的评论</div><ul class="comment-list" id="comment"></ul><div></div></div>');

            let html = '';
            $.each(data, function (index, item) {

                var date = new Date(item.timeStamp);
                var month = date.getMonth() + 1;
                var day = date.getDay() + 6;
                // console.log(date);
                var article_comment_time = (date.getFullYear() + "-" + month + "-" + day + "&nbsp;"
                    + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
                html += `
                 <li class=""><a href="/myhome?userId=${item.commentUserId}" class="avatar"><img
                    src="${item.avatarPath}"></a>
                <div class="info">
                    <div><a class="user" href="/myhome?userId=${item.commentUserId}">${item.nickName}</a><span class="comment-slogan">评论了你的文章</span><a
                            href="/p/5669de633eab" '="">《${item.title}》</a></div>
                    <div class="time">${article_comment_time}</div>
                </div>
                <p>${item.commentContent}</p> <!---->
                <div class="meta"><a class="function-btn"><i class="iconfont ic-comment"></i><span>回复</span></a> <a
                        href="/p/5669de633eab#comment-49534559" class="function-btn"><i
                        class="iconfont ic-go"></i><span>查看对话</span></a> <a class="report"
                                                                            reportable-type="[object Object]"><span>举报</span></a>
                </div> <!----></li>
                `
            })
            $("#comment").append(html)
        },

        chats: function (data) {

        },
        likes: function (data) {
            $("#right-list").empty();
            $("#right-list").append('<div><div class="menu">收到的喜欢和赞</div><ul class="comment-list" id="likes"></ul><div></div></div>');
            let html = '';
            $.each(data, function (index, item) {
                var date = new Date(item.timeStamp);
                var month = date.getMonth() + 1;
                var day = date.getDay() + 6;
                // console.log(date);
                var article_comment_time = (date.getFullYear() + "-" + month + "-" + day + "&nbsp;"
                    + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
                html += `<li class=""><a href="/myhome?userId=${item.likesUserId}" class="avatar"><img
                    src="${item.avatarPath}"></a>
                <div class="info"><a href="/myhome?userId=${item.likesUserId}" class="user">${item.nickName}</a> <span>喜欢了你的文章</span> <a
                        href="/p/5669de633eab">《${item.title}》</a>
                    <div class="time">${article_comment_time}</div>
                </div>
            </li>`
            });
            $("#likes").append(html)
        },
        follow: function (data) {
            $("#right-list").empty();
            $("#right-list").append('<div><div class="menu">全部关注</div><ul class="follow-list" id="follow"></ul><div></div></div>');


            let html = '';
            $.each(data.followOneList, function (index, item) {
                var date = new Date(item.timeStamp);
                var month = date.getMonth() + 1;
                var day = date.getDay() + 6;
                // console.log(date);
                var article_comment_time = (date.getFullYear() + "-" + month + "-" + day + "&nbsp;"
                    + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());

                html += `
                <li class=" " followUserid="${item.id}"><a href="/myhome?userId=${item.id}" class="avatar"><img src="${item.avatarPath}"></a> <div class="info"><a href="/myhome?userId=${item.id}" class="user">${item.nickName}</a> <span>关注了你</span> <div class="time">${article_comment_time}</div></div> <a class="${comment.method.towFollowQu(item.id) ? "btn btn-default following" : "btn btn-success follow"}"><i class="iconfont ${comment.method.towFollowQu(item.id) ? "ic-followed" : "ic-follow"}"></i><span>${comment.method.towFollowQu(item.id) ? "已关注" : "关注"}</span></a></li>
                `
            });
            $("#follow").append(html);


        },
        towFollowQu: function (id) {
            let ss = false;
            $.each(comment.data.followTwoList, function (index, item) {
                if (item.followUserId === id) {
                    ss = true;
                }
            })
            return ss;

        },
        followButton: function (data, dom) {

            console.log($(dom)[0].nodeName)
            if ($(dom)[0].nodeName !== "A") {
                dom = $(dom).parents("a")[0]
            }
            if (data === "attention") {
                //    关注
                $(dom).removeClass().addClass("btn btn-success follow");
                $(dom).find("i").removeClass().addClass("iconfont ic-follow")
                $(dom).find("span").text("关注")
            }
            if (data === "hasConcerned") {
                //    已关注
                $(dom).removeClass().addClass("btn btn-default following");
                $(dom).find("i").removeClass().addClass("iconfont ic-followed")
                $(dom).find("span").text("已关注")
            }
        }
    },

};
(function () {
    comment.method.getComment("comment");
})();

$("#left-list").click(function (e) {
    var innerText = $.trim(e.target.innerText)
    // console.log(innerText);
    $("#left-list ul li").removeClass();
    console.log("a");
    if (innerText === "评论") {
        // console.log("评论");
        comment.method.getComment("comment")
        $("#left-list ul li").eq(0).addClass("router-link-exact-active active")
    }
    if (innerText === "简信") {
        // console.log("简信");
        comment.method.getComment("chats")
        $("#left-list ul li").eq(1).addClass("router-link-exact-active active")
    }
    if (innerText === "喜欢和赞") {
        // console.log("喜欢和赞");
        comment.method.getComment("likes")
        $("#left-list ul li").eq(2).addClass("router-link-exact-active active")
    }
    if (innerText === "关注") {
        // console.log("关注");
        comment.method.getComment("follow")
        $("#left-list ul li").eq(3).addClass("router-link-exact-active active")
    }

});


$("#right-list").click(function (e) {
    let target = e.target;
    if (target.innerText === "关注") {
        let followUserid = $($(target).parents("li")[0]).attr("followUserid");
        PUBLIC_METHODS.followUser(followUserid, function (data) {
            if (data === "ok") {
                console.log("关注成功")
                comment.method.followButton("hasConcerned", target)
            }
        })
    }
    if (target.innerText === "已关注") {
        let followUserid = $($(target).parents("li")[0]).attr("followUserid");
        PUBLIC_METHODS.unfollowUser(followUserid, function (data) {
            if (data === "ok") {
                console.log("取消关注成功")
                comment.method.followButton("attention", target)
            }
        })
    }

});
