// Image Load Error
$.fn.extend({
    imageLoadError: function (errorPath) {
        $.imageLoadError(this, errorPath);
    }
});
$.extend({
    imageLoadError: function (targetObj, errorPath) {
        var obj = $(targetObj);

        obj.error(function () {
            if (errorPath == undefined) {
                $(this).hide();
                return;
            }

            $(this).attr("src", errorPath);
        })
    }
});

// BySelectedOption
$.fn.extend({
    BySelectedOption: function () {
        $.BySelectedOption(this);
    }
});

$.extend({
    BySelectedOption: function (targetObj) {
        var obj = $(targetObj);

        obj.change(function () {
            var obj = $(this);
            var selectId = obj.attr("selectId");
            var optionValue = obj.val();

            if (selectId == undefined) return;

            $("[selectId=" + selectId + "][selectedValue]").hide();

            if ($("[selectId=" + selectId + "][selectedValue=" + optionValue + "]").size() > 0) {
                $("[selectId=" + selectId + "][selectedValue=" + optionValue + "]").show();
                return;
            }
            $("[selectId=" + selectId + "][selectedValue=default]").show();
        })

        obj.change();
    }
});


// ListView
// .listTitle
// .listContents
$.fn.extend({
    ListView: function (titleSelector, contentsSelector) {
        $.ListView(this, titleSelector, contentsSelector);
    }
});

$.extend({
    ListView: function (targetObj, titleSelector, contentsSelector) {
        var obj = $(targetObj);

        if (titleSelector == undefined) titleSelector = ".listTitle";
        if (contentsSelector == undefined) contentsSelector = ".listContents";

        obj.find(contentsSelector).hide();
        obj.find(titleSelector).live("click", function () {
            var isVisibleContents = $(this).next(contentsSelector + ":visible").size() == 0 ? true : false;
            obj.find(contentsSelector).hide();
            if (isVisibleContents) $(this).next(contentsSelector).show();
        })
    }
});

//$.extend({
//    ListView: function (targetObj, titleSelector, contentsSelector) {
//        var obj = $(targetObj);
//        obj.find(".listContents").hide();
//        obj.find("tr.listTitle").live("click", function () {
//            var isVisibleContents = $(this).next(".listContents:visible").size() == 0 ? true : false;
//            obj.find(".listContents").hide();
//            if (isVisibleContents) $(this).next(".listContents").show();
//        })
//    }
//});


// MultipleAttr
$.fn.extend({
    multipleAttr: function (attr, seprator) {
        var returnArray = new Array();

        $(this).each(function () {
            returnArray.push($(this).attr(attr));
        })

        if (seprator === undefined) return returnArray;

        return returnArray.join(seprator);
    }
});

// MulipleVal
$.fn.extend({
    multipleVal: function (seprator) {
        var returnArray = new Array();

        $(this).each(function () {
            returnArray.push($(this).val());
        })

        if (seprator === undefined) return returnArray;

        return returnArray.join(seprator);
    }
});


// LoadAndShow
$.fn.extend({
    loadAndShowDialog: function (url, params, title, width, height) {
        $.loadAndShowDialog(this, url, params, title, width, height);
    }
});

$.extend({
    loadAndShowDialog: function (targetObj, url, params, title, width, height) {
        if (typeof (params) != "object") {
            height = width;
            width = title;
            title = params;
            params = {};
        }
        var obj = $(targetObj);
        obj.loadCallback(url, params, function () {
            obj.dialog({
                bgiframe: true,
                title: title,
                width: width,
                height: height,
                modal: true
            });
        });
    }
});

//LoadCallback
$.fn.extend({
    loadCallback: function (url, params, callback) {
        $.loadCallback(this, url, params, callback);
    }
});

$.extend({
    loadCallback: function (targetObj, url, params, callback) {
        var obj = $(targetObj);

        if (callback == undefined) {
            callback = params;
            params = {};
        }

        $.ajax(url, {
            context: document.body,
            data: params,
            async: true
        }).done(function (data) {
            obj.html(data);
            callback();
        });
    }
});

//getJSONAdprint
$.extend({
    getJSONAdprint: function (url, params, success, fail) {
        if (typeof (params) == "function") {
            fail = success;
            success = params;
            params = {};
        }

        if (typeof (params) == "undefined") {
            params = {};
        }

        $.getJSON(url, params, function (data, statusText, xhr, $form) {
            if (data.result == 'fail') {
                if (typeof (fail) == "string") { alert(fail); }
                if (typeof (fail) == "function") { fail(data); }
                if (typeof (fail) == "undefined") { alert(data.message); }
            } else {
                if (typeof (success) == "string") { alert(success); }
                if (typeof (success) == "function") { success(data); }
                if (typeof (success) == "undefined") { alert(data.message); }
            }
        });
    }
});

//ajaxFormAdprint
$.fn.extend({
    ajaxFormAdprint: function (success, fail) {
        $.ajaxFormAdprint(this, success, fail);
    }
});

$.extend({
    ajaxFormAdprint: function (targetObj, success, fail) {
        var formObj = $(targetObj);

        formObj.ajaxForm({
            success: function (data, statusText, xhr, $form) {
                if (data.result == 'fail') {
                    if (typeof (fail) == "string") { alert(fail); }
                    if (typeof (fail) == "function") { fail(data); }
                    if (typeof (fail) == "undefined") { alert(data.message); }
                } else {
                    if (typeof (success) == "string") { alert(success); }
                    if (typeof (success) == "function") { success(data); }
                    if (typeof (success) == "undefined") { alert(data.message); }
                }
            },
            dataType: 'json'
        });
    }
});


//ajaxFormSubmit
$.fn.extend({
    ajaxFormSubmit: function (success, fail) {
        $.ajaxFormSubmit(this, success, fail);
    }
});

$.extend({
    ajaxFormSubmit: function (targetObj, success, fail) {
        var formObj = $(targetObj);
        formObj.ajaxFormAdprint(success, fail);
        formObj.submit();
    }
});

//LabelBinder
$.fn.extend({
    labelBinder: function (label) {
        if (label === undefined) {
            return this.each(function () {
                $.labelBinder($(this), $("label[for='" + $(this).attr("id") + "']"));
            })
        } else {
            return this.each(function () {
                $.labelBinder($(this), $(label));
            })
        }
    }
});

$.extend({
    labelBinder: function (input, label) {
        var inputObj = $(input);
        var labelObj = $(label);

        if (var2 === undefined || inputObj.get(0).nodeName == 'LABEL') {
            labelObj = $(var1);
            inputObj = $("#" + labelObj.attr("for"));
        }

        inputObj.data("labelObj", labelObj);
        labelObj.data("inputObj", inputObj);

        labelObj.attr("for", inputObj.attr("id"));

        inputObj.bind("keydown", function () {
            $(this).data("labelObj").hide();
        })

        inputObj.bind("blur", function () {
            $(this).data("labelObj").hide();
            if ($(this).val() == "") $(this).data("labelObj").show();
        })

        labelObj.bind("click", function () {
            $(this).data("inputObj").focus();
        })

        inputObj.blur();
    }
});

// Preview
$.fn.extend({
    preview: function (maxWidth, maxHeight, xOffset, yOffset) {
        return this.each(function () {
            $.preview($(this), maxWidth, maxHeight, xOffset, yOffset);
        })
    }
});

$.extend({
    preview: function (obj, maxWidth, maxHeight, xOffset, yOffset) {
        var targetObj = obj;

        if (maxWidth === undefined) maxWidth = 500;
        if (maxHeight === undefined) maxHeight = 500;

        if (xOffset === undefined) xOffset = 20;
        if (yOffset === undefined) yOffset = 20;

        targetObj.hover(
            function (e) {
                if (this.nodeName == "IMG" || this.nodeName == "img") {
                    $("body").append("<div id='previewImageViewArea'><img src='" + this.src + "' alt='Image preview' /></div>");
                } else {
                    $("body").append("<div id='previewImageViewArea'><img src='" + this.href + "' alt='Image preview' /></div>");
                }

                $("#previewImageViewArea")
                    .css("position", "fixed")
			        .css("z-index", "9999")
                    .css("width", "auto")
                    .css("height", "auto")

                $("#previewImageViewArea img")
                    .css("width", "auto")
                    .css("height", "auto")
                    .css("max-width", maxWidth + "px")
                    .css("max-height", maxHeight + "px");

                _previewLocate(e.pageX, e.pageY);
            },
	        function () {
	            $("#previewImageViewArea").remove();
	        }
        );

        targetObj.mousemove(function (e) {
            _previewLocate(e.clientX, e.clientY)
        });

        function _previewLocate(pageX, pageY) {
            var leftPos = pageX + xOffset;
            var topPos = pageY + yOffset;

            var imageWidth = $("#previewImageViewArea").width();
            var imageHeight = $("#previewImageViewArea").height();

            var windowWidth = $(window).width();
            var windowHeight = $(window).height();

            var previewAreaWidth = $("#previewImageViewArea").width() + 10;
            var previewAreaHeight = $("#previewImageViewArea").height() + 10;

            var maxLeftPos = windowWidth - (xOffset + previewAreaWidth);
            var maxTopPos = windowHeight - (yOffset + previewAreaHeight);

            if (leftPos > maxLeftPos && topPos > maxTopPos) {
                leftPos = pageX - xOffset - imageWidth;
                topPos = pageY - yOffset - imageHeight;

                $("#previewImageViewArea")
			    .css("left", (leftPos) + "px")
                .css("top", (topPos) + "px");

                return;
            }

            if (leftPos > maxLeftPos) {
                leftPos = maxLeftPos;
            }

            if (topPos > maxTopPos) {
                topPos = maxTopPos;
            }

            $("#previewImageViewArea")
			    .css("left", (leftPos) + "px")
                .css("top", (topPos) + "px");
        }
    }
});

// ImageView
$.fn.extend({
    imageView: function (maxWidth, maxHeight) {
        return this.each(function () {
            $.imageView($(this), maxWidth, maxHeight);
        })
    }
});

$.extend({
    imageView: function (obj, maxWidth, maxHeight) {
        var targetObj = obj;

        targetObj.click(
            function (e) {
                var uniqueNo = (new Date).getTime();
                var src = (this.nodeName == "IMG" || this.nodeName == "img") ? this.src : this.href;
                var width = $(window).innerWidth() + "px";
                var height = $(window).innerHeight() + "px";

                $("body").append("<div id='imageViewModal_" + uniqueNo + "' style='top:0px; left:0px; width:100%; height:100%; z-index:10000; position:fixed; background-color:#000; opacity:.6; overflow:auto' >");

                $("body").append("<div id='imageView_" + uniqueNo + "' style='position:fixed; z-index:10001; overflow:auto; top:0px; left:0px; width:" + width + "; height: " + height + "'></div>");
                $("#imageView_" + uniqueNo).append("<span style='vertical-align: middle; text-align:center; display: table-cell; width:" + width + "; height: " + height + "'></span>");
                $("#imageView_" + uniqueNo + " span").append("<img src='" + src + "' alt='imageView' style='margin:20px; border: 1px solid rgba(0,0,0,.6); outline:5px solid rgba(255,255,255,.6) ' />");

                if (maxWidth !== undefined) $("#imageView img").css("max-width", maxWidth + "px");
                if (maxHeight !== undefined) $("#imageView img").css("max-height", maxHeight + "px");

                $("#imageView_" + uniqueNo).click(function () {
                    $("#imageViewModal_" + uniqueNo).remove();
                    $("#imageView_" + uniqueNo).remove();
                });

                return false;
            }
        );
    }
});

$.extend({
    stringify: function stringify(obj) {
        if ("JSON" in window) {
            return JSON.stringify(obj);
        }

        var t = typeof (obj);
        if (t != "object" || obj === null) {
            // simple data type
            if (t == "string") obj = '"' + obj + '"';

            return String(obj);
        } else {
            // recurse array or object
            var n, v, json = [], arr = (obj && obj.constructor == Array);

            for (n in obj) {
                v = obj[n];
                t = typeof (v);
                if (obj.hasOwnProperty(n)) {
                    if (t == "string") {
                        v = '"' + v + '"';
                    } else if (t == "object" && v !== null) {
                        v = jQuery.stringify(v);
                    }

                    json.push((arr ? "" : '"' + n + '":') + String(v));
                }
            }

            return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
        }
    }
});