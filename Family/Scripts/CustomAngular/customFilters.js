angular.module('customFilters',[])
.filter("range", function () {
    return function (arrayObj, start, end) {
        var toDay = new Date();
        start = Number(start);
        end = Number(end);
        for (var i = start; i <= end; i++) {
            arrayObj.push(i);
        }
        return arrayObj;
    };
})
.filter("ratio", function () {
    return function (amount, sum) {
        if (Number(amount) == 0) return "";
        return ((Number(amount) / Number(sum)) * 100).toFixed(1);
    }
})
.filter("sum", function () {
    return function (list, param) {       
        return list.reduce(function (sum, current) {
            return sum + Number(current[param]);
        }, 0);
    }
})
;
