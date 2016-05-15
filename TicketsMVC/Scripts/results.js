$(document).ready(function () {
    var model = JSON.parse($('.model').text());
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


    $(".dateslider").nerveSlider({
        sliderHeight: "100px",
        sliderResizable: true,
        sliderAutoPlay: false,
        slidesDraggable: false,
        showArrows: false,
        showPause: false,
        showDots: false,
        showTimer: false
    });

    $('.ns_timer').css('display', 'none');

    
    $('body').on("click", ".day", function () {
        moment.lang("el");
        var $parentContent = $(this).parent();
        var resdt = $parentContent.find('.reserved');
        var dtold = moment($(resdt).text().replace("ΐ", "ϊ"), 'DDDD DD MMMM', 'el');
        var dtnew = moment($(this).text().replace("ΐ", "ϊ"), 'DDDD DD MMMM', 'el');
        var now = moment();

        var sliderid = $(this).closest('div[class^="dateslider"]');
        

        var $reservedDt;
        if (sliderid.attr("id").indexOf("FromDate") > -1) {
            $reservedDt = $("#" + sliderid.attr("id").replace("FromDate", "ToDate")).find('.reserved');
            var comdt = moment($reservedDt.text().replace("ΐ", "ϊ"), 'DDDD DD MMMM', 'el');
            if (dtnew.diff(comdt, 'days') > 0) {
                return; //do nothing
            }
        } else if (sliderid.attr("id").indexOf("ToDate") > -1) {
            $reservedDt = $("#" + sliderid.attr("id").replace("ToDate", "FromDate")).find('.reserved');
            var comdt = moment($reservedDt.text().replace("ΐ", "ϊ"), 'DDDD DD MMMM', 'el');
            if (dtnew.diff(comdt, 'days') < 0) {
                return; //do nothing
            }
        }


        if (dtnew.diff(now, 'days') < 0) {
            return; //do nothing
        }

        var diffdays = Math.abs(dtnew.diff(dtold, 'days'));
        var childitems = $parentContent.find('.day');
        var childborderitems = $parentContent.find('.dayborder');

        var dttemp;
        var divappend;

        if (dtnew.isBefore(dtold)) { //prepend
            for (var j = 0; j < diffdays; j++) {
                //$(childitems[$(childitems).length - 3 - j]).hide("slide", { direction: "right" }, 500);
                $(childitems[$(childitems).length - 1 - j]).remove();
                $(childborderitems[$(childborderitems).length - 1 - j]).remove();
            }

            dttemp = dtold;
            dttemp.subtract(3, 'days');
            for (var j = 1; j <= diffdays ; j++) {
                dttemp.subtract(1, 'days');
                divappend = '<p class="day left">' + dttemp.format('dddd') + ' <br />' +
                    dttemp.format('DD MMMM') + '</p> <p class="dayborder left"></p>';
                $parentContent.find('.prevarrow').after(divappend);
            }

        } else { //append
            for (var j = 0; j < diffdays; j++) {
                //$(childitems[$(childitems).length - 2 - j]).show("slide", { direction: "right" }, 500);
                $(childitems[j]).remove();
                $(childborderitems[j]).remove();
            }

            dttemp = dtold;
            dttemp.add(3, 'days');
            for (var i = 1; i <= diffdays; i++) {
                dttemp.add(1, 'days');
                divappend = '<p class="dayborder left"></p>' +
                    '<p class="day left">' + dttemp.format('dddd') + ' <br />' +
                    dttemp.format('DD MMMM') + '</p>';
                $parentContent.find('.nextarrow').before(divappend);
            }
        }

        $(this).parent().find('.day').removeClass('reserved');
        $(this).addClass('reserved');
        
    });
    //var $div = $('#divid').closest('div[class^="div-a"]');
    function movePrevSlide(sliderid) {
        $("#" + sliderid).prevSlide();      // Go to the previous slide.
    }

    $(".prevarrow").click(function () {
        var $div = $(this).closest('div[class^="dateslider"]');
        var id = $div.attr("id");

        var $parentContent = $(this).parent();
        var now = moment();
        var childitems = $parentContent.find('.day');

        for (var i =0; i < childitems.length; i++) {
            var dt = moment($(childitems[i]).text().replace("ΐ", "ϊ"), 'DDDD DD MMMM', 'el');

            if (dt.diff(now, 'days') <= 0) {
                return; //do nothing
            }

        }

        movePrevSlide(id);
        
    });

    $(".nextarrow").click(function () {
        var $div = $(this).closest('div[class^="dateslider"]');
        var id = $div.attr("id");

        var $slidecontainerdiv = $(this).closest('div[class^="ns_slideContainer"]');
        if ($slidecontainerdiv.attr('class').indexOf("ns_lastSlide") > -1) {
            alert($slidecontainerdiv.attr('class'));
            $slidecontainerdiv.removeClass('ns_lastSlide');

            var appendtxt = '<div class="ns_slideContainer ns_lastSlide">' +
                '<div class="ns_slideContent">' +
                ' <p class="prevarrow btn-floating waves-effect waves-light left">' +
                '<img src="../Content/NerveSlider/icons/prev-dark.png"></p>' +
                '<p value="11" class="day left">Τρίτη<br> 31 Μαΐου</p> <p class="dayborder left"></p> <p value="12" class="day left">Τετάρτη<br> 01 Ιουνίου</p><p class="dayborder left"></p> <p class="nextarrow btn-floating waves-effect waves-light left"> <img src="../Content/NerveSlider/icons/next-dark.png"> </p> </div> </div>';

            $slidecontainerdiv.after(appendtxt);
            
        }

        moveNextSlide(id);
    });
    
    function moveNextSlide(sliderid) {
        /*<div class="ns_slideContainer ns_lastSlide">
                    <div class="ns_slideContent">
                        <p class="prevarrow btn-floating waves-effect waves-light left">
                            <img src="../Content/NerveSlider/icons/prev-dark.png">
                        </p>
                                <p value="11" class="day left">Τρίτη<br> 31 Μαΐου</p>
                                    <p class="dayborder left"></p>
                                <p value="12" class="day left">Τετάρτη<br> 01 Ιουνίου</p>
                                    <p class="dayborder left"></p>
                                <p value="13" class="day left">Πέμπτη<br> 02 Ιουνίου</p>
                                    <p class="dayborder left"></p>
                                <p value="14" class="reserved day left">Παρασκευή<br> 03 Ιουνίου</p>
                                <p class="dayborder left"></p>
                                <p value="15" class="day left">Σάββατο<br> 04 Ιουνίου</p>
                                    <p class="dayborder left"></p>
                                <p value="16" class="day left">Κυριακή<br> 05 Ιουνίου</p>
                                    <p class="dayborder left"></p>
                                <p value="17" class="day left">Δευτέρα<br> 06 Ιουνίου</p>
                        <p class="nextarrow btn-floating waves-effect waves-light left">
                            <img src="../Content/NerveSlider/icons/next-dark.png">
                        </p>
                    </div>
                </div>
        */


        $("#" + sliderid).nextSlide();      // Go to the next slide.
    }

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

