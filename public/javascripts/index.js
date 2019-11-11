//注册表单对象
var index = {
    data: {
        getArticlesNb: 0
    },
    methods: {
        getArticlesListAjax: function () {
            let data = {
                endArticlesNb: index.data.getArticlesNb + 1
            };

            $.ajax({
                url: GLOBAL_DATA.API_SERVER_URL + "/articlesList",
                data: data,
                type: "GET",
                dataType: "json",
                timeout: 4000,
                contentType: "application/json;charset=utf-8",
                xhrFields: {
                    withCredentials: true //允许跨域
                },
                success: function (data) {
                    console.log(data)
                    index.methods.generatedContent(data.data)
                },
                error: function (error) {
                    console.log(error)
                }
            });
        },
        generatedContent: function (data) {
            let html = "";
            index.data.getArticlesNb += data.length
            $.each(data, function (i, n) {

                if (n.contentImg !== '') {
                    html += `
                        <li id="note-52634499" data-note-id="52634499" class="have-img">

                        <a class="wrap-img" href="" target="_blank">
                            <img class="  img-blur-done"
                                 src="/public/images/1891933-76e3d08efdba8402.jfif"
                                 alt="120">
                        </a>

                        <div class="content">
                            <a class="title" target="_blank" href="/p/080cfc30ccf6">${n.title}</a>
                            <p class="abstract">
                                ${PUBLIC_METHODS.abbreviationDisplay(n.content)}
                            </p>
                            <div class="meta">
                                <a class="nickname" target="_blank" href="">${n.userInfo}</a>
                                <!--<a target="_blank" href="">
                                    <i class="iconfont ic-list-comments"></i> 37
                                </a> <span><i class="iconfont ic-list-like"></i> 145</span>-->
                            </div>
                        </div>
                    </li>
                `
                } else {
                    html += `
                       <li id="note-52354913" data-note-id="52354913" class="">
                        <div class="content">
                            <a class="title" target="_blank"
                               href="/p/fe96afedb591">${n.title}</a>
                            <p class="abstract">
                             ${PUBLIC_METHODS.abbreviationDisplay(n.content)}
                            </p>
                            <div class="meta">
                                <a class="nickname" target="_blank" href="/u/b132fcccb8b6">${n.userInfo}</a>
                                <!--<a target="_blank" href="/p/fe96afedb591#comments">
                                    <i class="iconfont ic-list-comments"></i> 83
                                </a> <span><i class="iconfont ic-list-like"></i> 189</span>-->
                            </div>
                        </div>
                    </li>
                `
                }
            });

            $("#list-container ul").append(html)
        }
    }
};

//自运行函数
(function () {
    index.methods.getArticlesListAjax();
})();
//点击阅读更多
$("#yuedugengduo").click(function () {
    index.methods.getArticlesListAjax()
})

