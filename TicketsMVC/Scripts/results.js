var model = JSON.parse($('.model').text());
$(document).ready(function () {
    var MeanList = [{ VesselID: '5036', Company: 'Blue Star', VesselName: 'BLUE STAR DELOS' }, { VesselID: '5037', Company: 'Blue Star', VesselName: 'BLUE STAR NAXOS' }];
    var TTimetableAns = [{ Company: 'Blue Star', VesselID: '5036', VesselType: 'C', DepTime: '07:25', ArrTime: '11:40', Available: 'YES', ClassAvail: [{ ClassAdultBasicPrice: 10000 }] }, { Company: 'Blue Star', VesselID: '5037', VesselType: 'H', DepTime: '17:30', ArrTime: '21:45', Available: 'NO', ClassAvail: [{ ClassAdultBasicPrice: 5000 }] }];
    var countcheckboxes = 0;
    var counttables = 1;
    var typeofboat;

    $('.displayroutesinfo').find('table').each(function () {
        for (var i = 0; i < TTimetableAns.length; i++) {
            if (counttables == countcheckboxes) {
                countcheckboxes++;
            }
            if (TTimetableAns[i].VesselType == 'C') {
                typeofboat = 'Conventional';
            }
            else if (TTimetableAns[i].VesselType == 'A') {
                typeofboat = 'Airplane';
            }
            else if (TTimetableAns[i].VesselType == 'D') {
                typeofboat = 'Dolphin-Catamaran';
            }
            else {
                typeofboat = 'HighSpeed';
            }
            if (TTimetableAns[i].Available == 'YES') {
                for (j = 0; j < MeanList.length; j++) {
                    if (MeanList[j].VesselID == TTimetableAns[i].VesselID && MeanList[j].Company == TTimetableAns[i].Company) {
                        var date = new Date(parseInt(model.MultDepList[0].DateFrom.substr(6))).toDateString();
                        var starttime = new Date(date + ' ' + TTimetableAns[i].DepTime).getTime();
                        var endtime = new Date(date + ' ' + TTimetableAns[i].ArrTime).getTime();
                        var difference = (endtime - starttime) / 1000 / 60;
                        $(this).append('<tr>');
                        $(this).find('tr:last').append('<td><input id="selectedroute' + counttables + countcheckboxes + '" type="checkbox" /><label for="selectedroute' + counttables + countcheckboxes + '"><img src="../Content/resultsimages/typeavailable.png"/></label></td><td><div class="routecompany-routename row"><span class=company-name-label>Company name:</span> ' + MeanList[j].Company + ' - <span class=company-name-label>Vessel name:</span> ' + MeanList[j].VesselName + '<span style=visibility:hidden>-' + MeanList[j].VesselID + '</span></div><div class="valign-wrapper row"><span class="deproutetime left center-align valign">' + TTimetableAns[i].DepTime + '</span><span class="routeimage center"><span class=leftbordered></span><img src="../Content/resultsimages/shipborder.png" /><span class=rightbordered></span></span><span class="arrroutetime right center-align valign"><span class=row>' + TTimetableAns[i].ArrTime + '</span><span class=timedifference>' + Math.floor((difference / 60)) + ' hr ' + (difference % 60) + ' mins</span></span></div><div class=row><div class="routeprice routeprice' + typeofboat + ' center-block"><span class=boatprice>' + parseFloat(TTimetableAns[i].ClassAvail[0].ClassAdultBasicPrice) / 100 + '</span> <span class=moneycoin>€</span></div></div></td>');
                        $(this).find('.routecompany-routename').popover({ trigger: 'hover', placement: 'bottom', 'title': 'Vessel Type', 'content': typeofboat });
                        countcheckboxes++;
                    }
                }
            }
            else if (TTimetableAns[i].Available == 'NO') {
                for (j = 0; j < MeanList.length; j++) {
                    if (MeanList[j].VesselID == TTimetableAns[i].VesselID && MeanList[j].Company == TTimetableAns[i].Company) {
                        var date = new Date(parseInt(model.MultDepList[0].DateFrom.substr(6))).toDateString();
                        var starttime = new Date(date + ' ' + TTimetableAns[i].DepTime).getTime();
                        var endtime = new Date(date + ' ' + TTimetableAns[i].ArrTime).getTime();
                        var difference = (endtime - starttime) / 1000 / 60;
                        $(this).append('<tr>');
                        $(this).find('tr:last').append('<td><input id="selectedroute' + counttables + countcheckboxes + '" type="checkbox" disabled="disabled"/><label for="selectedroute' + counttables + countcheckboxes + '"><img src="../Content/resultsimages/typeno.png"/></label></td><td><div class="routecompany-routename row"><span class=company-name-label>Company name:</span> ' + MeanList[j].Company + ' - <span class=company-name-label>Vessel name:</span> ' + MeanList[j].VesselName + '<span style=visibility:hidden>-' + MeanList[j].VesselID + '</span></div><div class="valign-wrapper row"><span class="deproutetime left center-align valign">' + TTimetableAns[i].DepTime + '</span><span class="routeimage center"><span class=leftbordered></span><img src="../Content/resultsimages/shipborder.png" /><span class=rightbordered></span></span><span class="arrroutetime right center-align valign"><span class=row>' + TTimetableAns[i].ArrTime + '</span><span class=timedifference>' + Math.floor((difference / 60)) + ' hr ' + (difference % 60) + ' mins</span></div><div class=row><div class="routeprice routeprice' + typeofboat + ' center-block"><span class=boatprice>' + parseFloat(TTimetableAns[i].ClassAvail[0].ClassAdultBasicPrice) / 100 + '</span> <span class=moneycoin>€</span></div></div></td>');
                        $(this).find('.routecompany-routename').popover({ trigger: 'hover', placement: 'bottom', 'title': 'Vessel Type', 'content': typeofboat });
                        countcheckboxes++;
                    }
                }
            }
        }
        counttables++;
    });

    $('body').on('click', '[id*=selectedroute]', function () {
        var selectedtable = $(this).attr('id');
        selectedtable = selectedtable.split(selectedtable.charAt(selectedtable.length - 1));
        $('[id*=' + selectedtable[0] + ']').prop('checked', false);
        $('[id*=' + selectedtable[0] + ']').find('.leftbordered,.rightbordered').removeClass('active');
        $(this).parent().parent().find('.routeimage > img,.leftbordered,.rightbordered').addClass('active');
        $(this).prop('checked', true);
        var hiddenfield = $(this).parent().parent().parent().parent().parent().find('input[type=hidden]').toArray();
        var routetable = $(this).parent().parent();
        var routecompanyname = routetable.find('.routecompany-routename').text().split('-');
        $(hiddenfield[0]).val(routecompanyname[0].split(':')[1]);
        $(hiddenfield[1]).val(routecompanyname[1].split(':')[1]);
        $(hiddenfield[2]).val(routecompanyname[2]);
        $(hiddenfield[3]).val(routetable.find('.deproutetime').text());
        $(hiddenfield[4]).val(routetable.find('.arrroutetime > span:first-child').text());
        $(hiddenfield[5]).val(routetable.find('.boatprice').text());
    });


    $('.dateslider').nerveSlider({
        sliderHeight: '100px',
        sliderResizable: true,
        sliderAutoPlay: false,
        slidesDraggable: false,
        showArrows: false,
        showPause: false,
        showDots: false,
        showTimer: false
    });

    $('.ns_timer').css('display', 'none');

    function Updatemultideplist(currentmodel, currentslider) {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            data: currentmodel,
            url: 'Updatemodeldates',
            success: function (responsemodel) {
                model.MultDepList[currentslider] = responsemodel;
            }
        });
    }

    function Stylesliderdate(id, childitems, reservedday, datethreshold, flag) {
        if (flag == 0) {
            $(childitems).removeClass('disabled');
        }
        else {
            $(childitems).removeClass('disabled reserved');
        }
        if (id.search('sliderdatefrom') != -1) {
            for (var i = 0; i < childitems.length; i++) {
                day = moment($(childitems[i]).text().replace("ΐ", "ϊ"), 'DDDD DD MMMM', 'el');
                if (day.diff(datethreshold, 'days') > 0) {
                    $(childitems[i]).addClass('disabled');
                }
                else if (day.diff(reservedday, 'days') == 0 && flag == 1) {
                    $(childitems[i]).addClass('reserved');
                }
            }
        }
        else {
            for (var i = 0; i < childitems.length; i++) {
                day = moment($(childitems[i]).text().replace("ΐ", "ϊ"), 'DDDD DD MMMM', 'el');
                if (day.diff(datethreshold, 'days') < 0) {
                    $(childitems[i]).addClass('disabled');
                }
                else if (day.diff(reservedday, 'days') == 0 && flag == 1) {
                    $(childitems[i]).addClass('reserved');
                }
            }
        }
    }

    function Styleslidermultidate(id, childitems, reservedday, datethresholdup, datethresholddown, currentslider) {
        $(childitems).removeClass('disabled reserved');
        for (var i = 0; i < childitems.length; i++) {
            day = moment($(childitems[i]).text().replace("ΐ", "ϊ"), 'DDDD DD MMMM', 'el');
            if ((day.diff(datethresholdup, 'days') > 0 && currentslider == 0) || ((day.diff(datethresholdup, 'days') > 0 || day.diff(datethresholddown, 'days') < 0) && currentslider > 0) || (day.diff(datethresholddown, 'days') < 0 && currentslider == model.MultDepList.length - 1)) {
                $(childitems[i]).addClass('disabled');
            }
            else if (day.diff(reservedday, 'days') == 0) {
                $(childitems[i]).addClass('reserved');
            }
        }
    }

    function Sliderdatefrom(id, newday, childitems, countdays, dateto) {
        var datefrom = moment(model.MultDepList[0].DateFrom);
        var daytext = newday.format('dddd' + ', ') + newday.format('DD MMMM YYYY')
        for (var i = 0; i < childitems.length; i++) {
            var day;
            if (countdays < 0) {
                day = moment($(childitems[i]).text().replace("ΐ", "ϊ"), 'DDDD DD MMMM', 'el').subtract(Math.abs(countdays), 'days');
            }
            else {
                day = moment($(childitems[i]).text().replace("ΐ", "ϊ"), 'DDDD DD MMMM', 'el').add(Math.abs(countdays), 'days');
            }
            $(childitems[i]).html(day.format('dddd') + ' <br/>' + day.format('DD MMMM'));
            if (day.diff(newday, 'days') == 0) {
                if (model.Triptype == 0) {
                    $(childitems[i]).addClass('reserved');
                }
                if (model.Triptype == 2) {
                    var currentsliderdate = parseInt(id.split('sliderdatefrom')[1]);
                    $('.showdatefrom' + currentsliderdate).text(daytext);
                    model.MultDepList[currentsliderdate].DateFrom = newday.toISOString();
                    Updatemultideplist(model.MultDepList[currentsliderdate], currentsliderdate);
                }
                else {
                    $('.showdatefrom0').text(daytext);
                    model.MultDepList[0].DateFrom = newday.toISOString();
                    model.MultDepList[0].DateTo = moment(model.MultDepList[0].DateTo).toISOString();
                    Updatemultideplist(model.MultDepList[0], 0);
                }
            }
        }
        if (model.Triptype == 1) {
            Stylesliderdate(id, childitems, newday, model.MultDepList[0].DateTo, 1);
            id = '#sliderdateto' + id.split('sliderdatefrom')[1];
            var childitems = $(id).find('.day');
            Stylesliderdate(id, childitems, newday, newday, 0);
        }
        else if (model.Triptype == 2) {
            for (var i = 0; i < model.MultDepList.length; i++) {
                id = '#sliderdatefrom' + i;
                var childitems = $(id).find('.day');
                if (i == 0) {
                    Styleslidermultidate(id, childitems, model.MultDepList[i].DateFrom, model.MultDepList[i + 1].DateFrom, null, i);
                }
                else if (i == model.MultDepList.length - 1) {
                    Styleslidermultidate(id, childitems, model.MultDepList[i].DateFrom, null, model.MultDepList[i - 1].DateFrom, i);
                }
                else {
                    Styleslidermultidate(id, childitems, model.MultDepList[i].DateFrom, model.MultDepList[i + 1].DateFrom, model.MultDepList[i - 1].DateFrom, i);
                }
            }
        }
    }

    function Sliderdateto(id, newday, childitems, countdays, datefrom) {
        var dateto = moment(model.MultDepList[0].DateTo);
        for (var i = 0; i < childitems.length; i++) {
            var day;
            if (countdays < 0) {
                day = moment($(childitems[i]).text().replace("ΐ", "ϊ"), 'DDDD DD MMMM', 'el').subtract(Math.abs(countdays), 'days');
            }
            else {
                day = moment($(childitems[i]).text().replace("ΐ", "ϊ"), 'DDDD DD MMMM', 'el').add(Math.abs(countdays), 'days');
            }
            $(childitems[i]).html(day.format('dddd') + ' <br/>' + day.format('DD MMMM'));
            if (day.diff(newday, 'days') == 0) {
                $('.showdateto0').text(newday.format('dddd' + ', ') + newday.format('DD MMMM YYYY'));
                model.MultDepList[0].DateFrom = moment(model.MultDepList[0].DateFrom).toISOString();
                model.MultDepList[0].DateTo = newday.toISOString();
                Updatemultideplist(model.MultDepList[0], 0);
            }
        }
        Stylesliderdate(id, childitems, newday, model.MultDepList[0].DateFrom, 1);
        id = '#sliderdatefrom' + id.split('sliderdateto')[1];
        var childitems = $(id).find('.day');
        Stylesliderdate(id, childitems, newday, newday, 0);
    }

    $('body').on('click', '.day', function () {
        if (!$(this).hasClass('disabled')) {
            $parent = $(this).closest('.dateslider');
            $id = $parent.attr('id');
            var newday = moment($(this).text().replace("ΐ", "ϊ"), 'DDDD DD MMMM', 'el');
            var childitems = $(this).parent().find('.day');
            if ($id.search('sliderdatefrom') != -1) {
                var currentsliderdate = parseInt($id.split('sliderdatefrom')[1]);
                var datefrom = moment(model.MultDepList[currentsliderdate].DateFrom);
                var dateto = moment(model.MultDepList[currentsliderdate].DateTo);
                var countdays = newday.diff(datefrom, 'days');
                Sliderdatefrom($id, newday, childitems, countdays, dateto);
            }
            else {
                var datefrom = moment(model.MultDepList[0].DateFrom);
                var dateto = moment(model.MultDepList[0].DateTo);
                var countdays = newday.diff(dateto, 'days');
                Sliderdateto($id, newday, childitems, countdays, datefrom);
            }
        }
    });

    $('.prevarrow').click(function () {
        $parent = $(this).closest('.dateslider');
        $id = $parent.attr('id');
        var datefrom = moment(model.MultDepList[0].DateFrom);
        var dateto = moment(model.MultDepList[0].DateTo);
        var childitems = $(this).parent().find('.day');
        $(childitems).removeClass('disabled reserved');
        if ($id.search('sliderdatefrom') != -1) {
            for (var i = 0; i < childitems.length; i++) {
                var day = moment($(childitems[i]).text().replace("ΐ", "ϊ"), 'DDDD DD MMMM', 'el').subtract(7, 'days');
                $(childitems[i]).html(day.format('dddd') + ' <br/>' + day.format('DD MMMM'));
                if (day.diff(dateto, 'days') > 0) {
                    $(childitems[i]).addClass('disabled');
                }
                else if (day.diff(datefrom, 'days') == 0) {
                    $(childitems[i]).addClass('reserved');
                }
            }
        }
        else {
            for (var i = 0; i < childitems.length; i++) {
                var day = moment($(childitems[i]).text().replace("ΐ", "ϊ"), 'DDDD DD MMMM', 'el').subtract(7, 'days');
                $(childitems[i]).html(day.format('dddd') + ' <br/>' + day.format('DD MMMM'));
                if (day.diff(datefrom, 'days') < 0) {
                    $(childitems[i]).addClass('disabled');
                }
                else if (day.diff(dateto, 'days') == 0) {
                    $(childitems[i]).addClass('reserved');
                }
            }
        }
        $parent.prevSlide();
    });

    $('.nextarrow').click(function () {
        $parent = $(this).closest('.dateslider');
        $id = $parent.attr('id');
        var datefrom = moment(model.MultDepList[0].DateFrom);
        var dateto = moment(model.MultDepList[0].DateTo);
        var childitems = $(this).parent().find('.day');
        $(childitems).removeClass('disabled reserved');
        if ($id.search('sliderdatefrom') != -1) {
            for (var i = 0; i < childitems.length; i++) {
                var day = moment($(childitems[i]).text().replace("ΐ", "ϊ"), 'DDDD DD MMMM', 'el').add(7, 'days');
                $(childitems[i]).html(day.format('dddd') + ' <br/>' + day.format('DD MMMM'));
                if (day.diff(dateto, 'days') > 0) {
                    $(childitems[i]).addClass('disabled');
                }
                else if (day.diff(datefrom, 'days') == 0) {
                    $(childitems[i]).addClass('reserved');
                }
            }
        }
        else {
            for (var i = 0; i < childitems.length; i++) {
                var day = moment($(childitems[i]).text().replace("ΐ", "ϊ"), 'DDDD DD MMMM', 'el').add(7, 'days');
                $(childitems[i]).html(day.format('dddd') + ' <br/>' + day.format('DD MMMM'));
                if (day.diff(dateto, 'days') < 0) {
                    $(childitems[i]).addClass('disabled');
                }
                else if (day.diff(dateto, 'days') == 0) {
                    $(childitems[i]).addClass('reserved');
                }
            }
        }
        $parent.nextSlide();
    });

    /*var Model = JSON.parse($('.model').val());
    if (Model.Triptype != 2|| Model.MultDepList.length == 1)
    {
        createroute('Αναχώρηση', 0);
        createroute('Επιστροφή', 1);
    }
    else
    {
        for (var i = 0; i < Model.MultDepList.length; i++)
        {
            createroute(i, 2);
        }
    }

    function createroute(message, option) {
        if (option == 0) {
            $('.displayroutes').append('<div class="col-md-11" style="border-bottom:2px solid #1E7FB1;left:20px">' +
                '<img src="../Content/Searchimages/portfrom.png" style="float:left;margin-top:5px;margin-right:5px" />' +
                '<label><span style="font-weight:bolder;color:#1E7FB1;font-size:small">' + message + '</span><br />' + Model.MultDepList[0].DateFrom + ' <span style="font-size:larger">-</span> από <span style="color:orange;font-size:15px">' + Model.MultDepList[0].FromPort.split(",")[0].split("]")[1] + '</span> προς <span style="color:orange;font-size:15px">' + Model.MultDepList[0].ToPort.split(",")[0].split("]")[1] + '</span></label></div>');
        }
        else if (option == 1) {
            $('.displayroutes').append('<div class="col-md-11" style="border-bottom:2px solid #1E7FB1;left:20px">' +
                '<img src="../Content/Searchimages/portto.png" style="float:left;margin-top:5px;margin-right:5px" />' +
                '<label><span style="font-weight:bolder;color:#1E7FB1;font-size:small">' + message + '</span><br />' + Model.MultDepList[0].DateFrom + ' <span style="font-size:larger">-</span> από <span style="color:orange;font-size:15px">' + Model.MultDepList[0].FromPort.split(",")[0].split("]")[1] + '</span> προς <span style="color:orange;font-size:15px">' + Model.MultDepList[0].ToPort.split(",")[0].split("]")[1] + '</span></label></div>');
        }
        else {
            $('.displayroutes').append('<div class="col-md-11" style="border-bottom:2px solid #1E7FB1;left:20px">' +
                    '<img src="../Content/Searchimages/portfrom.png" style="float:left;margin-top:5px;margin-right:5px" />' +
                    '<label><span style="font-weight:bolder;color:#1E7FB1;font-size:small">' + message + 'ο σκέλος</span><br />' + Date(Model.MultDepList[message].DateFrom) + ' <span style="font-size:larger">-</span> από <span style="color:orange;font-size:15px">' + Model.MultDepList[message].FromPort.split(",")[0].split("]")[1] + '</span> προς <span style="color:orange;font-size:15px">' + Model.MultDepList[message].ToPort.split(",")[0].split("]")[1] + '</span></label></div>');
        }
    }*/
});

