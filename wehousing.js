/**
 * Created by guoda on 15/01/2017.
 */
String.prototype.tmp = function (obj) {
    return this.replace(/\$\w+\$/g, function (matchs) {
        var returns = obj[matchs.replace(/\$/g, "")];
        return (returns + "") == "undefined" ? "" : returns;
    });
};

var json_data;
var orderPrice = 1, orderPopularity = 1;
var rows;
$(document).ready(function () {
    json_data = (function () {
        var json = null;
        $.ajax({
            'async': false,
            'global': false,
            'url': "apartment.json",
            'dataType': "json",
            'success': function (data) {
                json = data;
            }
        });
        return json;
    })();
    var htmlList = '';
    var htmlTemp = $("#list_box script[data-id='list_tpl']").html();
    json_data.apartments.forEach(function (object) {
        htmlList += htmlTemp.tmp(object);
    });
    $("#list_box").html(htmlList).paging();
    $("#counts").html(json_data.apartments.length + " Apartments");
    rows = $('#list_box li').get();

    $("#btn1").bind('click', function () {
        orderPopularity = -orderPopularity;
        rows.sort(function (a, b) {
            return orderPopularity * ($(a).find('.details p.popularity').attr('value') - $(b).find('.details p.popularity').attr('value'));
        });
        $.each(rows, function (index, row) {
            $('#list_box').append(row);
        });
        $('#list_box').paging('update');
    });

    $("#btn2").bind('click', function () {
        orderPrice = -orderPrice;
        rows.sort(function (a, b) {
            return orderPrice * ($(a).find('.details .price').attr('value') - $(b).find('.details .price').attr('value'));
        });
        $.each(rows, function (index, row) {
            $('#list_box').append(row);
        });
        $('#list_box').paging('update');
    });
});
