$("#div_submit").click(function () {
    let  describe = $("#textareaDesc").val();
    let name = $("#username").val()
    $("#desc").val(describe);

    $.ajax({
        url:"/c/addSpecial",
        type:"post",
        dataType:"json",
        data:{userId:12,name:name,headImgUrl:"//",describe:describe},
        success:function (data) {
            alert(data);
            if (data.code==100){
                window.location="/";
            }
        }

    })
    

})