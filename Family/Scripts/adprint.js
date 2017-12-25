(function ($) {
    $.ysrMessageBox = function (params) {
        if (params["buttons"] === undefined) {
            params["buttons"] = [{ '確認': { 'class': 'o'}}];
        }
        var buttonHTML = '';
        $.each(params.buttons, function (name, obj) {
            buttonHTML += '<button type="button" class="' + obj['class'] + '">' + name + '</button>';
            if (!obj.click) {
                obj.click = function () { };
            }
        });

        var markup = [];
        markup.push("<div id='confirmOverlay' class='confirmOverlay'>");
        markup.push("<div id='confirmBox'>");
        if (params.title !== undefined && params.title !== "") {
            markup.push("<h1>" + params.title + "</h1>");
        }
        markup.push("<p>" + params.message + "</p>");
        markup.push("<div id='confirmButtons'>" + buttonHTML + "</div></div></div>");
        markup = $(markup.join(''));
        $("#confirmOverlay").remove();
        markup.hide().appendTo('body').fadeIn();
        var buttons = $('#confirmBox button'),
            i = 0;
        $.each(params.buttons, function (name, obj) {
            buttons.eq(i++).click(function () {
                obj.click();
                $(this).closest("div.confirmOverlay").fadeOut(function () { $(this).remove(); });
                return false;
            });
        });
    }
})(jQuery);

function getValidRightOrderCode(id) {
    if (id.length == 7) return id.substr(0, id.length - 1);
    return id;
}

var adprint = {
    IsSameMaterial: function (thisMaterial, thatMaterial) {
        var this_gPosition = thisMaterial.indexOf("g");
        var that_gPosition = thatMaterial.indexOf("g");

        if (this_gPosition == -1) return false;
        if (that_gPosition == -1) return false;

        var thisName = thisMaterial.substr(0, this_gPosition);
        var thatName = thatMaterial.substr(0, that_gPosition);

        return thisName == thatName;
    },
    showDialog: function ($dlg, title, width, x, y) {
        var scrollTop = $(document).scrollTop();
        if (typeof (x) == 'undefined') {
            $dlg.dialog({
                bgiframe: true,
                title: title,
                width: width,
                maxHeight: 800,
                modal: true,
                resizable: true,
                close: function () {
                    $dlg.dialog('destroy').hide();
                }
            });
        } else {
            $dlg.dialog({
                bgiframe: true,
                title: title,
                width: width,
                maxHeight: 800,
                modal: true,
                resizable: true,
                close: function () {
                    $dlg.dialog('destroy').hide();
                }
            });
        }
        $(document).scrollTo(scrollTop, 10, { axis: 'y' });
    },
    loadAndShowDialog: function (url, $dlg, title, width, x, y) {

        $dlg.load(url, {}, function () {
            adprint.showDialog($dlg, title, width, x, y);
        });
    },
    getJSON: function (url, successCallback, failCallback, successMessage) {
        $.getJSON(url, function (data) {
            if (data.result == 'success') {
                if (successMessage) alert(successMessage);
                if (successCallback) successCallback(data);
            } else {
                alert(data.message);
                if (failCallback) failCallback();
            }
        });
    },
    ajaxForm: function ($frm, $dlg, successCallback, failCallback) {
        $frm.ajaxForm({
            success: function (data, statusText, xhr, $form) {
                if (data.result == 'fail') {
                    alert(data.message);
                    if (failCallback) failCallback();
                } else {
                    if (data.dialog == 'undefined') $dlg.dialog('destroy');
                    if (successCallback) successCallback(data);
                }
            },
            dataType: 'json'
        });
        $frm.submit();
    }
}


