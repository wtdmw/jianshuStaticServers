


function load_article() {
    $.ajax({
        url:"a.txt",
        type:"GET",
        success:function (data) {
            // alert(data);
            $("#list-container ul").append(data)
        }
    })

    // var x = '<li id="note-56042637" data-note-id="56042637" class="">\n' +
    //     '                        <div class="content ">\n' +
    //     '                            <a class="title" target="_blank" href="/p/cc4cbd3298e6">2019-11-07</a>\n' +
    //     '                            <p class="abstract">\n' +
    //     '                                \n' +
    //     '      我写的这些故事，真实地发生在南欧的伊比利亚半岛，再具体一点说，是在葡萄牙的维森蒂娜海岸(Costa Vicentina)。 从今天开始，我将用我...\n' +
    //     '    ' +
    //     '                            </p>\n' +
    //     '                            <div class="meta">\n' +
    //     '                                <a target="_blank" href="/p/cc4cbd3298e6">\n' +
    //     '                                    <i class="iconfont ic-list-read"></i> 12\n' +
    //     '                                </a>        <a target="_blank" href="/p/cc4cbd3298e6#comments">\n' +
    //     '                                <i class="iconfont ic-list-comments"></i> 6\n' +
    //     '                            </a>      <span><i class="iconfont ic-list-like"></i> 4</span>\n' +
    //     '                                <span class="time" data-shared-at="2019-11-07T14:43:52+08:00">1小时前</span>\n' +
    //     '                            </div>\n' +
    //     '                        </div>\n' +
    //     '</li>';





}


setInterval(function () {
    if($(window).onscrollTop==$(window).height()){
        function f() {
            alert("到页面底部啦");
        }
    }
},1000)


