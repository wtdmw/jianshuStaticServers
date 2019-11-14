var comment = {
    data: {},
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
            //清空table表格
            $("#right-list").empty();
            $("#right-list").append('<div><div class="menu">收到的评论</div><ul class="comment-list" id="comment"></ul><div></div></div>');

            let html = '';
            $.each(data, function (index, item) {

                var date = new Date(item.timeStamp);
                var month = date.getMonth() + 1;
                var day = date.getDay() + 6;
                console.log(date);
                var article_comment_time = (date.getFullYear() + "-" + month + "-" + day + "&nbsp;"
                    + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
                html += `
                 <li class=""><a href="/u/f88cd344aa8f" class="avatar"><img
                    src="${item.avatarPath}"></a>
                <div class="info">
                    <div><a class="user" href="/u/f88cd344aa8f">${item.nickName}</a><span class="comment-slogan">评论了你的文章</span><a
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
                console.log(date);
                var article_comment_time = (date.getFullYear() + "-" + month + "-" + day + "&nbsp;"
                    + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
                html += `<li class=""><a href="/u/f88cd344aa8f" class="avatar"><img
                    src="${item.avatarPath}"></a>
                <div class="info"><a href="/u/f88cd344aa8f" class="user">${item.nickName}</a> <span>喜欢了你的文章</span> <a
                        href="/p/5669de633eab">《${item.title}》</a>
                    <div class="time">${article_comment_time}</div>
                </div>
            </li>`
            });
            $("#likes").append(html)
        },
        follow: function () {

        },


    },

};
(function () {
    comment.method.getComment("comment");
})();

$("#left-list").click(function (e) {
    var innerText =$.trim(e.target.innerText)
    console.log(innerText);


    $("#left-list ul li").removeClass();


        console.log("a");
        if (innerText === "评论") {
            console.log("评论");
            comment.method.getComment("comment")
            $("#left-list ul li").eq(0).addClass("router-link-exact-active active")
        }
        if (innerText === "简信") {
            console.log("简信");
            comment.method.getComment("chats")
            $("#left-list ul li").eq(1).addClass("router-link-exact-active active")
        }
        if (innerText === "喜欢和赞") {
            console.log("喜欢和赞");
            comment.method.getComment("likes")
            $("#left-list ul li").eq(2).addClass("router-link-exact-active active")
        }
        if (innerText === "关注") {
            console.log("关注");
            comment.method.getComment("follow")
            $("#left-list ul li").eq(3).addClass("router-link-exact-active active")
        }

});

