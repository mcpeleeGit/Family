$(document).ready(function () {

    //등록
    $("#write").click(function () {
        var url = "/Dev/AccountWriteFor";
        adprint.loadAndShowDialog(url, $("#dvCommonPopup"), "Account등록");
        $("#frmWrite").validate();
    });

    $("#confirmWrite").live("click", function () {
        adprint.ajaxForm($("#frmWrite"), $("#dvCommonPopup"), doSubmit);
    });

    //일괄등록
    $("#multiExcelWrite").click(function () {
        var url = "/Dev/AccountMultiExcelWriteFor";
        adprint.loadAndShowDialog(url, $("#dvCommonPopup"), "AccountMultiExcel등록");
        $("#frmWrite").validate();
    });

    //수정
    $("input[name='update']").click(function () {
        var id = $(this).data("id");
        var url = "/Dev/AccountUpdateFor/" + id;
        adprint.loadAndShowDialog(url, $("#dvCommonPopup"), "Account수정");
        $("#frmUpdate").validate();
    });

    $("#confirmUpdate").live("click", function () {
        adprint.ajaxForm($("#frmUpdate"), $("#dvCommonPopup"), doSubmit);
    });

    //삭제
    $("input[name='delete']").click(function () {
        if (!confirm("정말 삭제하시겠습니까?")) return;

        var id = $(this).data("id");
        var url = "/Dev/AccountDelete/" + id;
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