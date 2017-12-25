$(document).ready(function () {

    //CodeType 등록
    $("#write").click(function () {
        var url = "/Dev/CodeTypeWriteFor";
        adprint.loadAndShowDialog(url, $("#dvCommonPopup"), "코드타입등록");
        $("#frmWrite").validate();
    });

    $("#confirmWrite").live("click", function () {
        adprint.ajaxForm($("#frmWrite"), $("#dvCommonPopup"), doSubmit);
    });

    //CodeType 수정
    $("input[name='update']").click(function () {
        var codetype = $(this).data("codetype");
        var url = "/Dev/CodeTypeUpdateFor?codetype=" + codetype;
        adprint.loadAndShowDialog(url, $("#dvCommonPopup"), "코드타입수정");
        $("#frmUpdate").validate();
    });

    $("#confirmUpdate").live("click", function () {
        adprint.ajaxForm($("#frmUpdate"), $("#dvCommonPopup"), doSubmit);
    });

    //CodeType 삭제
    $("input[name='delete']").click(function () {
        if (!confirm("정말 삭제하시겠습니까?")) return;

        var codetype = $(this).data("codetype");
        var url = "/Dev/CodeTypeDelete?codetype=" + codetype;
        $.getJSON(url, {}, function (data) {
            if (data.result == "success") {
                doSubmit();
            } else {
                alert(data.message);
            }
        });
    });


    //Code 등록
    $("input[name='codewrite']").click(function () {
        var codetype = $(this).data("codetype");
        var url = "/Dev/CodeWriteFor?codetype=" + codetype;
        adprint.loadAndShowDialog(url, $("#dvCommonPopup"), "코드등록");
        $("#frmCodeWrite").validate();
    });

    $("#confirmCodeWrite").live("click", function () {
        adprint.ajaxForm($("#frmCodeWrite"), $("#dvCommonPopup"), doSubmit);
    });

    //Code 수정
    $("input[name='codeupdate']").click(function () {
        var code = $(this).data("code");
        var url = "/Dev/CodeUpdateFor?code=" + code;
        adprint.loadAndShowDialog(url, $("#dvCommonPopup"), "코드수정");
        $("#frmCodeUpdate").validate();
    });

    $("#confirmCodeUpdate").live("click", function () {
        adprint.ajaxForm($("#frmCodeUpdate"), $("#dvCommonPopup"), doSubmit);
    });

    //Code 삭제
    $("input[name='codedelete']").click(function () {
        if (!confirm("정말 삭제하시겠습니까?")) return;

        var code = $(this).data("code");
        var url = "/Dev/CodeDelete?code=" + code;
        $.getJSON(url, {}, function (data) {
            if (data.result == "success") {
                doSubmit();
            } else {
                alert(data.message);
            }
        });
    });
});
function doSubmit() {
    location.reload();
}