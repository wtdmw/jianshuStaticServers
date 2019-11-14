let currentPage = 0;
let type = 1;


//页面加载获取参数请求
(function () {
    let queryString = PUBLIC_METHODS.getQueryString(`searchValu`);
    $("#q").val(queryString)
    getNote();
    console.log(queryString)
})();

$(".search .search-btn").click(function () {
    $(".searchpg").empty();
    getNote();
})


$("#note").click(function () {
    $(".searchpg").empty();
    getNote()
});

$("#user").click(function () {
    $(".searchpg").empty();
    getUser()
});


$("#collection").click(function () {
    $(".searchpg").empty();
    getCollection();
});


/*    $(".menu li").click(function () {
        $(this).siblings('li').removeClass('active');
        $(this).addClass('active');
    });*/

$("#note").click(function () {
    getNote()
});

$("#user").click(function () {
    getUser()
});


$("#collection").click(function () {
    getCollection()
});


//搜索框非空验证
var key = $("#q").val()

function checkkeyword() {
    if (key == "" || key == null) {
        return false;
    } else {
        return key;
    }
}

function getNote() {
    type = 1;
    var keyword = $("#q").val();
    $.ajax({
        url: GLOBAL_DATA.API_SERVER_URL + "/search",
        type: "GET",
        data: {keyword: keyword, method: "note", currentPage: currentPage * 10},
        dataType: "json",
        timeout: 4000,
        contentType: "application/text;charset=utf-8",
        xhrFields: {
            withCredentials: true //允许跨域
        },
        success: function (data) {
            noteContent(data);
        },
        error: function () {

        }
    })
}


function getUser() {
    type = 2;
    var keyword = $("#q").val();
    $.ajax({
        url: GLOBAL_DATA.API_SERVER_URL + "/search",
        type: "GET",
        data: {keyword: keyword, method: "user", currentPage: currentPage * 10},
        dataType: "json",
        timeout: 4000,
        contentType: "application/text;charset=utf-8",
        xhrFields: {
            withCredentials: true //允许跨域
        },
        success: function (data) {
            userContent(data);
        },
        error: function () {

        }
    })
}


function getCollection() {
    type = 3;
    var keyword = $("#q").val();
    $.ajax({
        url: GLOBAL_DATA.API_SERVER_URL + "/search",
        type: "GET",
        data: {keyword: keyword, method: "collection", currentPage: currentPage * 10},
        dataType: "json",
        timeout: 4000,
        contentType: "application/text;charset=utf-8",
        xhrFields: {
            withCredentials: true //允许跨域
        },
        success: function (data) {
            collectionContent(data);
        },
        error: function () {

        }
    })
}


$("#yuedugengduo").click(function () {
    currentPage += 1;
    if (type == 1) {
        getNote(currentPage);
    } else if (type = 2) {
        getUser(currentPage)
    } else if (type = 3) {
        getCollection(currentPage)
    }
});


function noteContent(data) {
    var searchnoteList = data.extend.searchNoteList;
    let html = "";
    $.each(searchnoteList, function (index, item) {
        html += `<div class="result"></div>
                <ul class="note-list">
                    <li>
                        <div class="content">
                            <div class="author"><a href="/u/350b1293c511" target="_blank" class="avatar"><img
                                    src=${item.avatarPath}></a>
                                <div class="info"><a href="/u/350b1293c511" class="nickname">${item.nickName}</a> <span class="time">
            
          </span></div>
                            </div>
                            <a href="/p/dfb7a4103b6d" target="_blank" class="title">${item.title}</a>
                            <p class="abstract">……${item.content}
                                ……</p>
                            <div class="meta"></div>
                        </div>
                    </li>

                </ul> <!----> <!----> <!---->
                <div>`

    });
    $(".searchpg").append(html);
}


function userContent(data) {
    var searchUserList = data.extend.searchUserList;
    let html = "";
    $.each(searchUserList, function (index, item) {
        html += `<div class="result"></div> <!---->
                <ul class="user-list">
                    <li><a href="/u/9a920349af10" target="_blank" class="avatar"><img
                            src=${item.avatarPath}></a>
                        <div class="info"><a href="/u/9a920349af10" target="_blank" class="name">
                            ${item.nickName}
                        </a>
                            <div class="meta"><span>关注 0</span> <span>粉丝 0</span> <span>文章 0</span></div>
                            <div class="meta"><span>
        写了 0 字，获得了 0 个喜欢
        </span></div>
                        </div>
                        <a class="btn btn-success follow"><i class="iconfont ic-follow"></i><span>关注</span></a></li>
                </ul> <!----> <!---->
                <div>`

    })
    $(".searchpg").append(html);
}


function collectionContent(data) {

    var searchCollectionList = data.extend.searchCollectionList;
    let html = "";
    $.each(searchCollectionList, function (index, item) {
        html += `                <div class="result"></div> <!----> <!---->
                <ul class="user-list">
                    <li><a href="/c/abcf2a519f2f" target="_blank" class="avatar-collection"><img
                            src="//upload.jianshu.io/collections/images/1667243/%E5%B0%81%E9%9D%A2.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/144/h/144/format/webp"></a>
                        <div class="info"><a href="/c/abcf2a519f2f" target="_blank" class="name">
                            ${item.name}
                        </a>
                            <div class="meta"><span>
        收录了 196 篇文章，1088 人关注
        </span></div>
                        </div>
                        <a class="btn btn-success follow"><i class="iconfont ic-follow"></i><span>关注</span></a></li>
                    
                </ul> <!---->
                <div>`

    })
    $(".searchpg").append(html);
}