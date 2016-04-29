$(document).ready(function () {


    $(".yourSlider").nerveSlider({
        sliderWidth: "1000px",
        sliderHeight: "100px",
        sliderResizable: true,
        sliderAutoPlay: false,
        slidesDraggable: false,
        showArrows: false,
        showDots: false
    });

   

    $("div").on("click", ".slideclass", function () {

        var resdt = $('#fromdtSliderid').find('.slideclass-reservday');
        moment.lang("el");

        //var allp = resdt.find('p');
        //var tst = '';
        //for (i = 0; i < allp.length; i++) {
        //    $(allp[i]).css("color", "#2091EB");
        //    tst += $(allp[i]).text() + " ";
        //}
        //tst = tst.slice(0, -1);
        //var dtold = moment(tst, 'DDDD DD MMMM', 'el');
        var dtold = moment($(resdt[0]).text(), 'DDDD DD MMMM', 'el');
        

        //tst = '';
        //var allotherp = $(this).find('p');
        //for (i = 0; i < allotherp.length; i++) {
        //    $(allotherp[i]).css("color", "white");
        //    tst += $(allotherp[i]).text() + " ";
        //}

        
        var dtnew = moment($(this).text(), 'DDDD DD MMMM', 'el');
        var now = moment();
        
        if (dtnew.diff(now, 'days') < 0) {
            return;
        }

        var childitems = $(this).parent().parent().find('li');
        var dttemp;
        var diffdays = Math.abs(dtnew.diff(dtold, 'days'));

        if (dtnew.isBefore(dtold)) {
            console.log('prepend');

            for (var j = 0; j < diffdays; j++) {
                $(childitems[$(childitems).length - 2 - j]).show("slide", { direction: "left" }, 500);
                $(childitems[$(childitems).length - 2 - j]).remove();
            }

           
            dttemp = dtold;
            dttemp.subtract(2, 'days');
            for (var j = 1; j <= diffdays ; j++) {
                dttemp.subtract( 1, 'days');
                var divappend = '<li> <div class="slideclass">' +
                    ' <p>' + dttemp.format('dddd') + '</p>' +
                    ' <p>' + dttemp.format('DD MMMM') + '</p> </div></li>';
                $(childitems[0]).after(divappend);
            }

        } else {
            console.log('append');
            
            for (var j = 0; j < diffdays; j++) {
                $(childitems[$(childitems).length - 2 - j]).show("slide", { direction: "right" }, 500);
                $(childitems[1 + j]).remove();
            }

            dttemp = dtold;
            dttemp.add(2, 'days');
            for (var i = 1; i <= diffdays; i++) {
                dttemp.add(1, 'days');
                var divappend = '<li> <div class="slideclass">' +
                    ' <p>' + dttemp.format('dddd') + '</p>' +
                    ' <p>' + dttemp.format('DD MMMM') + '</p> </div></li>';
                $(childitems[$(childitems).length - 1]).before(divappend);
            }

        }


        resdt.removeClass('slideclass-reservday');
        resdt.addClass('slideclass');

        $(this).removeClass('slideclass');
        $(this).addClass('slideclass-reservday');

        //alert(moment(tst, 'DDDD DD MMMM', 'el').isValid());
        
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
    var resdt = $(".slideclass-reservday");
    var dtold = moment($(resdt[0]).text(), 'DDDD DD MMMM', 'el');

    var appdiv = '<div class="ns_slideContainer ns_lastSlide ns_selected"><img src="../Content/Resultsimages/white.png" alt="">' +
        '<div class="ns_slideContent">' +
        '<ul class="list-inline"><li><a href="javascript:movePrevSlide();"><span class="glyphicon glyphicon-arrow-left"></span></a></li>';
        
        

    dtold.add(2, 'days');
    for (var i = 0; i < 5; i++) {
        dtold.add(1, 'days');
        appdiv += '<li><div class="slideclass"><p>' + dtold.format("dddd", "el").toString() + '</p>' +
            '<p>' + dtold.format("DD MMMM", "el").toString() + '</p></div></li>';
    }

    appdiv += '<li><a href="javascript:moveNextSlide();" id="movenext"><span class="glyphicon glyphicon-arrow-right"></span>' +
        '</a></li></ul></div></div>';
    $(".ns_selected").after(appdiv);
    
    $(".yourSlider").nextSlide(); // Go to the next slide.
}


