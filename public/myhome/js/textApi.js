


/*点赞*/
$("#btn1").click(function () {
    let userId =$("#name").val();
    let articleId =$("#articleId").val();
    let zanType =$("#zanType").val();
    $.ajax({
        url:"/zan/addZan",
        type:"post",
        dataType:"json",
        contentType : "application/json;charsetset=UTF-8",//必须
        data:JSON.stringify({"articleId":articleId,"userId":userId,"zanType":zanType}),
        success:function (data) {
            alert(data.code+" "+data.count);
        }
    })
});


/*取消赞*/
$("#btn2").click(function () {
    let userId =$("#name").val();
    let articleId =$("#articleId").val();
    let zanType =$("#zanType").val();
    $.ajax({
        url:"/zan/outZan",
        type:"post",
        dataType:"json",
        contentType : "application/json;charsetset=UTF-8",//必须
        data:JSON.stringify({"articleId":articleId,"userId":userId,zanType:0}),
        success:function (data) {
            alert(data.code+" "+data.count);
        }
    })
});

/*反对赞*/
$("#btn3").click(function () {
    let userId =$("#name").val();
    let articleId =$("#articleId").val();
    let zanType =$("#zanType").val();
    $.ajax({
        url:"/zan/oppositionZan",
        type:"post",
        dataType:"json",
        contentType : "application/json;charsetset=UTF-8",//必须
        data:JSON.stringify({"articleId":articleId,"userId":userId,zanType:2}),
        success:function (data) {
            alert(data.code+" "+data.count);
        }
    })
});

/*文章总赞*/
$("#btn4").click(function () {
    let userId =$("#name").val();
    let articleId =$("#articleId").val();
    let zanType =$("#zanType").val();
    $.ajax({
        url:"/zan/getArticleZan",
        type:"get",
        dataType:"json",
        contentType : "application/json;charsetset=UTF-8",//必须
        data:{"articleId":articleId,"zanType":zanType},
        success:function (data) {
            alert(data.code+" "+data.count);
        }
    })
});

/*用户总赞*/
$("#btn5").click(function () {
    let userId =$("#name").val();
    let articleId =$("#articleId").val();
    let zanType =$("#zanType").val();
    $.ajax({
        url:"/zan/getUserZan",
        type:"get",
        dataType:"json",
        contentType : "application/json;charsetset=UTF-8",//必须
        data:{"zanType":zanType,"userId":userId},
        success:function (data) {
            alert(data.code+" "+data.count);
        }
    })
});
