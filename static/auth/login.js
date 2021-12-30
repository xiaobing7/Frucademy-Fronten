function show_dialog(){
    $('.ui-dialog').addClass('show');
}

function tab1_click(){
	$('.current').removeClass('current');
	$('.hide').removeClass('hide');
	$('#tab2_content').addClass('hide');
	$("#tab1").addClass('current');
}

function tab2_click(){
	$('.current').removeClass('current');
	$('.hide').removeClass('hide');
	$("#tab2").addClass('current');
	$("#tab1_content").addClass('hide');
}

function disable_code(){
	$('#send_code').addClass('disabled');
	document.getElementById("send_code").innerHTML="重新发送";
}

$(function () {
    $('#send_code').click(disable_code);
    $('.ui-footer .ui-tiled li > a[href="#"]').click(show_dialog);
    $('#btn-submit').click(function (e) {
        $.ajax({
            url: '/auth/login/',
            type: 'POST', // GET, PUT, DELETE
            dataType: 'json',
            success: function (data) {
                // console.log(data);
                if(data.error == 0) {
                    $.dialog({
                        title:'温馨提示',
                        content: data.msg
                    });
                    setTimeout(function () {
                        window.location.href = '/';
                    }, 600);
                }
                else {
                    var dia=$.dialog({
                        title:'温馨提示',
                        content: data.msg,
                        button:["确认"]
                    });

                    dia.on("dialog:action",function(e){
                        console.log(e.index)
                    });
                    dia.on("dialog:hide",function(e){
                        console.log("dialog hide")
                    });
                }
            },
            error: function (xhr) {
                console.log(data);
            }
        });
    });
});