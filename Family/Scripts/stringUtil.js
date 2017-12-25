function addCommas(nStr) {
    var header = "";
    
    nStr += '';
    if (nStr.substr(0, 1) == "-") {
        header = nStr.substr(0, 1);
        nStr = nStr.substr(1, nStr.length - 1);
    }
    
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return header + x1 + x2;
}

function addCommasJp(nStr) {
    return addCommas(nStr) + "円";
}


function onlyFullWord(value) {
    for (i = 0; i < value.length; i++) {
        if (isHarfWord(value.charAt(i))) {
            return false;
        }
    }
    return true;
}

function onlyHarfWord(value) {
    for (i = 0; i < value.length; i++) {
        if (!isHarfWord(value.charAt(i))) {
            return false;
        }
    }
    return true;
}

function isHarfWord(value) {
    return (isAscii(value) || isHarfWordKatagana(value));
}

function onlyKatagana(value) {
    for (i = 0; i < value.length; i++) {
        if (!isKatagana(value.charAt(i))) {
            return false;
        }
    }
    return true;
}

function onlyHiragana(value) {
    for (i = 0; i < value.length; i++) {
        if (!isHiragana(value.charAt(i))) {
            return false;
        }
    }
    return true;
}

function isHarfWordKatagana(value) {
    var c = value.charCodeAt(0);
    return (c >= 0xff61 && c <= 0xff9f);
}

function isFullWordKatagana(value) {
    var c = value.charCodeAt(0);
    return (c >= 0x30A0 && c <= 0x30FF)
}

function isAscii(value) {
    var c = value.charCodeAt(0);
    return c < 256;
}

function isHiragana(value) {
    var c = value.charCodeAt(0);
    return (c >= 0x3040 && c <= 0x309F)
}

function isKatagana(value) {
    if (isHarfWordKatagana(value) || isFullWordKatagana(value)) return true;
    return false;
};


function IsNumeric(sText) {
    var ValidChars = "0123456789.";
    var IsNumber = true;
    var Char;


    for (i = 0; i < sText.length && IsNumber == true; i++) {
        Char = sText.charAt(i);
        if (ValidChars.indexOf(Char) == -1) {
            IsNumber = false;
        }
    }
    return IsNumber;

}

function isValidCode(keyCode) {
    if ((keyCode < 32) || (keyCode >= 48 && keyCode <= 57)) return true;
    return false;
}

function isAlphaCount(sText) {
    var m=sText.match(/[a-z A-Z]/g);
    if (!m) return 0;
    return m.length;
}

function isNumericCount(sText) {
    var m=sText.match(/\d/g);
    if(!m) return 0;
    return m.length;
}

function isAlphaNumeric(sText) {
    var regExp=/\w+/;
    return regExp.test(sText);
}

function isMixedAlphaNumeric(sText) {
    if (isAlphaCount(sText) == 0) return false;
    if (isNumericCount(sText) == 0) return false;
    return isAlphaNumeric(sText);
}

//반각 -> 전각
function gf_Convert2ByteChar(x_char) {

    var x_2byteChar = ""; //컨버트된 문자
    var c = x_char.charCodeAt(0);

    if (32 <= c && c <= 126) { //전각으로 변환될수 있는 문자의 범위
        if (c == 32) { //스페이스인경우 ascii 코드 32
            x_2byteChar = unescape("%uFFFC");
        } else {
            x_2byteChar = unescape("%u" + (c + 65248).toString(16));
        }
    }
    return x_2byteChar;
}
