(function ($) {
    $.fn.bindFirst = function (/*String*/eventType, /*[Object])*/eventData, /*Function*/handler) {
        var indexOfDot = eventType.indexOf(".");
        var eventNameSpace = indexOfDot > 0 ? eventType.substring(indexOfDot) : "";

        eventType = indexOfDot > 0 ? eventType.substring(0, indexOfDot) : eventType;
        handler = handler == undefined ? eventData : handler;
        eventData = typeof eventData == "function" ? {} : eventData;

        return this.each(function () {
            var $this = $(this);
            var currentAttrListener = this["on" + eventType];

            if (currentAttrListener) {
                $this.bind(eventType, function (e) {
                    // Note line below did have a bug before 06/07/2011
                    // It was not returning the listener's result.
                    return currentAttrListener(e.originalEvent);
                });

                this["on" + eventType] = null;
            }

            $this.bind(eventType + eventNameSpace, eventData, handler);

            var allEvents = $this.data("events");
            var typeEvents = allEvents[eventType];
            var newEvent = typeEvents.pop();
            typeEvents.unshift(newEvent);
        });
    };

    $.fn.getStyleObject = function () {
        var dom = this.get(0);
        var style;
        var returns = {};
        if (window.getComputedStyle) {
            var camelize = function (a, b) {
                return b.toUpperCase();
            };
            style = window.getComputedStyle(dom, null);
            for (var i = 0, l = style.length; i < l; i++) {
                var prop = style[i];
                var camel = prop.replace(/\-([a-z])/g, camelize);
                var val = style.getPropertyValue(prop);
                returns[camel] = val;
            };
            return returns;
        };
        if (style = dom.currentStyle) {
            for (var prop in style) {
                returns[prop] = style[prop];
            };
            return returns;
        };
        return this.css();
    };

    $.fn.serializeObject = function () {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };

    $.fn.copyHtml = function () {
        var $c, $i, $t, $p;
        $p = $(this).parent();
        $(this).find("*").uniqueId();
        $c = $(this).clone();
        $c.find("*").each(function (idx, item) {
            $i = $(item);
            $t = $p.find("#" + $i.attr("id")).getStyleObject();
            $i.css($t);
        });
        return $c;
    };

    $.fn.ysrPrint = function () {
        var script = "<script>window.focus();window.print();</script>";
        var $clone = $(this).copyHtml();
        var width = $(this).outerWidth(true) + 40;
        var height = $(this).outerHeight(true) + 40;
        var objWin = window.open("", "print", "width=" + width + ", height=" + height + ",all=no");
        var $warp = $("<div></div>").append($clone.css("margin", "auto"));
        objWin.document.write($warp[0].outerHTML);
        objWin.document.write(script);
        objWin.document.close();
    };

    $.fn.GetRequestParamGET = function () {
        var urlParams = {};
        var match,
            pl = /\+/g,
            search = /([^&=]+)=?([^&]*)/g,
            decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
            query = window.location.search.substring(1);
        while (match = search.exec(query)) {
            urlParams[decode(match[1])] = decode(match[2]);
        }
        return urlParams;
    };

    $.fn.ysrTooltip = function (msg, direction) {
        var $self = $(this);
        if ($self.length == 0) return;
        if (direction === undefined) { direction = "top"; }
        var time = 3000;
        var refid = $self.eq(0).data("ysrtooltiprefid");
        var $html, offset;
        if (refid == undefined) $html = $("<div style='display:none' class='ysrtooltip " + direction + "'><div class='ysrtooltip-arrow'></div><div class='ysrtooltip-inner'>" + msg + "</div></div>").uniqueId();
        else {
            $html = $("#" + refid);
            if (msg == "") { $html.hide(); $self.eq(0).removeData("ysrtooltiprefid"); }
            return;
        }

        if (msg == "") return;

        $self.eq(0).data("ysrtooltiprefid", $html.prop("id"));
        $("body").append($html);
        offset = $self.eq(0).offset();
        var posTop;
        if (direction == "top") $html.css({ "top": offset.top - $html.height() - 10, "left": offset.left });
        else if (direction == "right") $html.css({ "top": offset.top + ($self.eq(0).height() * 0.5 - $html.height() * 0.5), "left": offset.left + $self.eq(0).width() * ($self.eq(0).width() > 350 ? 0.6 : 1) });
        else posTop = offset.top;
        $html.bind("mouseenter", function () { $html.stop(true, false); $html.css("opacity", "1"); });
        $html.bind("mouseleave", function () { fn_html(time); });
        var fn_html = function (delay) { $html.fadeIn().delay(delay).fadeOut(400, function () { $(this).remove(); $self.eq(0).removeData("ysrtooltiprefid"); }); }
        $html.show();
        fn_html(time);

        if ($self.is(":input")) {
            var oldColor = $self.css("border-color");
            var newColor = $html.find(".ysrtooltip-inner").css("border-color");
            if (oldColor == newColor) { oldColor = "#ddd"; }
            $self.css("border-color", newColor);
            $self.fadeIn().delay(1800).animate({ "border-color": oldColor }, 400);
        }
    };

    $.loadDialog = function (url, params, option) {
        var $div = $("<div/>")
        $div.uniqueId();
        $("body").append($div);
        var defaultOption = {
            modal: true, resizeable: true, close: function () { $div.dialog("destroy").remove(); }
        };
        if (typeof option == "string") option = { title: option };
        if (typeof option == undefined) option = {};
        $.extend(defaultOption, option);
        $div.load(url, params, function (data) {
            $div.dialog(defaultOption);
        });
        return $div;
    };
})(jQuery);