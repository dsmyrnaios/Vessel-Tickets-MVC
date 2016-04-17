$(document).ready(function () {
    var MeanList = [{ VesselID: '5036', Company: 'Blue Star', VesselName: 'BLUE STAR DELOS' }, { VesselID: '5037', Company: 'Blue Star', VesselName: 'BLUE STAR NAXOS' }];
    var TTimetableAns = [{ Company: 'Blue Star', VesselID: '5036', VesselType: 'C', DepTime: '07:25', ArrTime: '11:40', Available: 'YES', ClassAvail: [{ ClassAdultBasicPrice: 10000 }] }, { Company: 'Blue Star', VesselID: '5037', VesselType: 'H', DepTime: '17:30', ArrTime: '21:45', Available: 'NO', ClassAvail: [{ ClassAdultBasicPrice: 5000 }] }];
    var countcheckboxes = 0;
    var counttables = 1;
    var typeofboat;
    $('.displayroutesinfo').each(function () {
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
                typeofboat = 'Dolphin/Catamaran';
            }
            else if (TTimetableAns[i].VesselType == 'H') {
                typeofboat = 'HighSpeed';
            }
            if (TTimetableAns[i].Available == 'YES') {
                for (j = 0; j < MeanList.length; j++) {
                    if (MeanList[j].VesselID == TTimetableAns[i].VesselID && MeanList[j].Company == TTimetableAns[i].Company) {
                        $(this).append('<tr>');
                        $(this).find('tr:last').append('<td><input id="selectedroute' + counttables + countcheckboxes + '" type="checkbox"/><label for="selectedroute' + counttables + countcheckboxes + '"><img src="../Content/resultsimages/typeavailable.png"/></label></td><td>' + MeanList[j].Company + '</td><td>' + MeanList[j].VesselName + '</td><td>' + TTimetableAns[i].DepTime + '</td><td>' + TTimetableAns[i].ArrTime + '</td><td>' + parseFloat(TTimetableAns[i].ClassAvail[0].ClassAdultBasicPrice) / 100 + ' €</td>');
                        $(this).find('tr:last').popover({ trigger: 'hover', placement: 'bottom', 'title': 'Type', 'content': typeofboat });
                        countcheckboxes++;
                    }
                }
            }
            else if (TTimetableAns[i].Available == 'NO') {
                for (j = 0; j < MeanList.length; j++) {
                    if (MeanList[j].VesselID == TTimetableAns[i].VesselID && MeanList[j].Company == TTimetableAns[i].Company) {
                        $(this).append('<tr>');
                        $(this).find('tr:last').append('<td><input id="selectedroute' + counttables + countcheckboxes + '" type="checkbox" disabled="disabled"/><label for="selectedroute' + counttables + countcheckboxes + '"><img src="../Content/resultsimages/typeno.png"/></label></td><td>' + MeanList[j].Company + '</td><td>' + MeanList[j].VesselName + '</td><td>' + TTimetableAns[i].DepTime + '</td><td>' + TTimetableAns[i].ArrTime + '</td><td>' + parseFloat(TTimetableAns[i].ClassAvail[0].ClassAdultBasicPrice) / 100 + ' €</td>');
                        $(this).find('tr:last').popover({ trigger: 'hover', placement: 'bottom', 'title': 'Type', 'content': typeofboat });
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
        $(this).prop('checked', true);
    });

    $(".yourSlider").nerveSlider({
        sliderWidth: "1000px",
        sliderHeight: "100px",
        sliderResizable: true,
        sliderAutoPlay: false
    });

   

    $(".slideclass").click(function () {

        var resdt = $('#fromdtSliderid').find('.slideclass-reservday');
        resdt.removeClass('slideclass-reservday');
        resdt.addClass('slideclass');
        
        $(this).removeClass('slideclass');
        $(this).addClass('slideclass-reservday');
    });

    //$(".ns_nextButton").removeClass();
    //$(".ns_prevButton").removeClass();

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

function movePrevSlide() { 
    $(".yourSlider").prevSlide();      // Go to the previous slide.
}

function moveNextSlide() {
    $(".yourSlider").nextSlide();      // Go to the next slide.
}

