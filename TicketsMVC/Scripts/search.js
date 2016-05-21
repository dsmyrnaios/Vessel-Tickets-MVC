$(document).ready(function () {
    numpassengersarray = [1, 0, 0, 0, 0];
    numvehiclesarray = [0, 0, 0, 0, 0];

    var defaultmultipledirections = 3;
    var counter = defaultmultipledirections;

    $('input[type=radio][name=TripType][value=WithReturn]').attr("checked", true);

    $('body').on('change', 'input[type=radio][name=TripType]', function () {
        if (this.value === 'Simple') {
            $('#fromto').empty();
            $('#fromto').append(createNewFerrystep(0, 1));
            $('#depalldate').show();
            $('#arralldate').hide();
        }
        else if (this.value === 'WithReturn') {
            $('#fromto').empty();
            $("#fromto").append(createNewFerrystep(0, 2));
            $('#depalldate').show();
            $('#arralldate').show();
        }
        else if (this.value === 'Multiple') {
            $('#fromto').empty();
            $('#depalldate').hide();
            $('#arralldate').hide();
            for (var j = 0; j < defaultmultipledirections; j++) {
                $("#fromto").append(createNewFerrystep(j, 3));
            }
            counter = j - 1;
            var btnappend = '<div class="row" style="margin-bottom:0px" id="actionbtnid">' +
                            '<div class="col-md-6">' +
                            '<button type="button" class="btn waves-effect waves-light #bdbdbd grey lighten-1" style="float:left;margin-bottom:5px" id="delFerryStepId" onclick="delFerryStep()"><img src="../Content/Searchimages/removeroute.png"/> Αφαίρεση διαδρομής</button>' +
                            '</div>' +
                            '<div class="col-md-6">' +
                            '<button type="button" class="btn waves-effect waves-light #bdbdbd grey lighten-1" style="float:right" id="addFerryStepId" onclick="addFerryStep()"><img src="../Content/Searchimages/addroute.png"/> Προσθήκη διαδρομής</button>'
            '</div></div>';
            $("#fromto").append(btnappend);
            $('#addFerryStepId').on('click', function () {
                var cnt = addFerryStep(counter);
                counter = cnt;
            });
            $('#delFerryStepId').on('click', function () {
                var cnt = delFerryStep(counter);
                counter = cnt;
            });
        }
    });

    $('.datepicker').parseDate = function (format, value) {
        return moment(value, format).toDate();
    };
    $('.datepicker').formatDate = function (format, value) {
        return moment(value).format(format);
    };

  
    $('body').on('click', '[id*=departuredatemulti]', function () {
        var specificobject = $(this).attr('id');
        var beginningdate =new Date();
        
        var idcount = parseInt(specificobject[specificobject.length - 1]);
        if (idcount > 0) {
            var dt = moment($('#departuredatemulti' + (idcount - 1)).val(), 'MM-DD-YYYY');
            beginningdate = new Date(dt.year(), dt.month(), dt.date());
        }

        var picker = $(this).pickadate('picker');
        if (picker != null) {
            if (picker.get('open') == false) {
                if (dt != null) {
                    picker.set('min', [dt.year(), dt.month(), dt.date()]);
                    picker.set('max', [dt.year() + 1, dt.month(), dt.date()]);
                }
                picker.open();
                return;
            }
        }
               
        $(this).pickadate({
            format: "mm/dd/yyyy",
            selectMonths: true,
            monthsFull: ["Ιανουάριος", "Φεβρουάριος", "Μάρτιος", "Απρίλιος", "Μάιος", "Ιούνιος", "Ιούλιος", "Αύγουστος", "Σεπτέμβρης", "Οκτώβριος", "Νοέμβριος", "Δεκέμβριος"],
            min:  beginningdate,
            max: new Date(beginningdate.getFullYear() + 1, beginningdate.getMonth(), beginningdate.getDate()),
            closeOnClear: true,
            selectYears: 2,            
            formatSubmit: "mm/dd/yyyy",
            onClose: function () {
                for (var j = idcount + 1; j <= counter; j++) {
                    if ($('#departuredatemulti' + j).val() != '' && $('#departuredatemulti' + j).val() != 'undefined') {
                        var dtj = moment($('#departuredatemulti' + j).val(), 'MM-DD-YYYY');
                         
                        if (dtj.isBefore(dt)) {
                            $('#departuredatemulti' + j).val('');
                        }else if (dtj.isBefore(dt)) {
                            $('#departuredatemulti' + j).val('');
                        }
                    }
                }
            }
        });      
    });
   
    $('body').on('click', '[id*=departuredate],[id*=arrivedate]', function () {
        var specificobject = $(this).attr('id');

        if (specificobject.search('departuredatemulti') != -1) {
            return;
        }

        var startdate;
        
        if (specificobject.search('departuredate') != -1)
        {
            startdate = new Date();
        }
        else
        {
            var dspecificarrivedateobject = specificobject.split('arrivedate');
            if ($('[id=departuredate' + dspecificarrivedateobject[1] + ']').val() == '') {
                startdate = new Date();
            } else {
                var dt = moment($('[id=departuredate' + dspecificarrivedateobject[1] + ']').val(), 'MM-DD-YYYY');
                startdate = new Date(dt.year(), dt.month(), dt.date());
            }
        }

        var picker = $(this).pickadate('picker');
        if (picker != null) {
            if (picker.get('open') == false) {
                if (specificobject.search('arrivedate') != -1 && $('[id=departuredate' + dspecificarrivedateobject[1] + ']').val() != '') {
                    var dt = moment($('[id=departuredate' + dspecificarrivedateobject[1] + ']').val(), 'MM-DD-YYYY');
                    picker.set('min', [dt.year(), dt.month(), dt.date()]);
                    picker.set('max', [dt.year()+1, dt.month(), dt.date()]);
                }

            }
            picker.open();
            return;
        }

        $(this).pickadate({
            format: "mm/dd/yyyy",
            selectMonths: true,
            monthsFull: ["Ιανουάριος", "Φεβρουάριος", "Μάρτιος", "Απρίλιος", "Μάιος", "Ιούνιος", "Ιούλιος", "Αύγουστος", "Σεπτέμβρης", "Οκτώβριος", "Νοέμβριος", "Δεκέμβριος"],
            min: startdate,
            max: new Date(startdate.getFullYear() + 1, startdate.getMonth(), startdate.getDate()),
            closeOnSelect: true,
            closeOnClear: true,
            selectYears: 2,
            formatSubmit: "mm/dd/yyyy",
            onClose: function () {
                if (specificobject === 'departuredate0') {
                    if ($('#arrivedate0').val() != '' && $('#arrivedate0' + j).val() != 'undefined') {
                        var dtj = moment($('#arrivedate0').val(), 'MM-DD-YYYY');
                        var dt = moment($('[id=departuredate0').val(), 'MM-DD-YYYY');

                        if (dtj.isBefore(dt)) {
                            $('#arrivedate0').val('');
                        }
                    }
                }
            }
        });
    });

    var popovershownobject = '';
    $('body').on('click', '[id=numpassengers],[id=numvehicles]', function () {
        if (popovershownobject != '' && popovershownobject != $(this).attr('id')) {
            $('[id=' + popovershownobject + ']').popover('hide');
        }
        popovershownobject = $(this).attr('id');
        $(this).popover({
            html: true,
            placement: 'bottom',
            trigger: 'manual',
            content: function () {
                return $(this).parent().find('.content').html();
            }
        });
        $(this).popover('show');
        if (popovershownobject == "numpassengers") {
            startpassengerpopover();
        }
        else
        {
            startvehiclepopover();
        }
    });

    $(document).click(function (e) {
        if (!$(e.target).is('[id*=departuredate],[id*=arrivedate],[id=numpassengers],[id=numvehicles], .popup-marker, .popover-title, .popover-content, span') && !$(e.target).parents('.popover').length > 0) {
            if (popovershownobject != '') {
                $('[id=' + popovershownobject + ']').popover('hide');
                popovershownobject = '';
            }
        }
    });

    var categorylettersgreeksmall = ['α', 'β', 'γ', 'δ', 'ε', 'ζ', 'η', 'θ', 'ι', 'κ', 'λ', 'μ', 'ν', 'ξ', 'ο', 'π', 'ρ', 'σ', 'τ', 'υ', 'φ', 'χ', 'ψ', 'ω'];
    var categorylettersgreekbig = ['Α', 'Β', 'Γ', 'Δ', 'Ε', 'Ζ', 'Η', 'Θ', 'Ι', 'Κ', 'Λ', 'Μ', 'Ν', 'Ξ', 'Ο', 'Π', 'Ρ', 'Σ', 'Τ', 'Υ', 'Φ', 'Χ', 'Ψ', 'Ω'];
    var categorylettersenglish = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'i', 'h', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    var categoryportareavalues = ['Όλα τα Λιμάνια', 'Αττική', 'Κυκλάδες', 'Αργοσαρωνικός', 'Κρήτη', 'Ιόνιο', 'Σποράδες', 'Βόρειο Αιγαίο', 'Εύβοια', 'Πελοπόννησος', 'Italy', 'Turkey'];
    var categoryportvaluesimages = ['allports.jpg', 'attikh.jpg', 'kuklades.jpg', 'argosaronikos.jpg', 'kriti.jpg', 'ionio.jpg', 'sporades.jpg', 'boreioaigaio.jpg', 'euboia.jpg', 'peloponnhsos.jpg', 'italy.jpg', 'turkey.jpg'];
    var portallvalueslatlng = [[38.03505, 24.313394399999993], [35.230268, 23.960657800000035], [37.4577997, 26.972125000000005], [40.8457193, 25.873962000000006], [38.541397, 14.350097499999947], [40.6340026, 14.60268050000002], [36.3514465, 25.768029999999953], [43.6158299, 13.518914999999993], [35.881144, 23.28852489999997], [37.38218980000001, 26.735848900000065], [40.5532009, 14.222154000000046], [40.749354, 13.90604099999996], [38.1184125, 13.363060799999971], [39.5685915, 22.539523099999997], [37.6303933, 26.511509100000012], [42.0924239, 11.795413199999984], [36.726217, 27.685843999999975], [35.7564848, 27.20961460000001], [37.9310758, 12.328612900000053], [38.5618132, 14.57228699999996], [40.7382914, 13.860551200000032], [41.2559961, 13.60686720000001], [34.8346879, 24.08463699999993], [38.7902603, 15.192641800000047], [36.7602193, 22.56553729999996], [38.5154349, 26.2204921], [40.7379299, 13.948618399999987], [38.3636166, 20.719854899999973], [37.0422371, 22.114126400000032], [36.7822585, 27.14352269999995], [40.937607, 24.412866000000008], [40.821814, 24.68651509999995], [35.4945873, 23.65374589999999], [37.857913, 27.261015000000043], [36.25, 23], [38.6450255, 16.544780800000012], [35.5005212, 12.60583459999998], [37.9996877, 12.332070799999997], [35.8660738, 12.868741399999976], [38.4936623, 14.927204399999937], [43.548473, 10.310567399999968], [35.2000045, 24.07866530000001], [38.7991058, 23.479642300000023], [37.9739764, 12.054690899999969], [38.0491517, 24.321739699999966], [36.854936, 28.27087800000004], [36.8495611, 27.075656500000036], [37.5823986, 23.3885262], [38.2207102, 15.241932700000007], [39.0530887, 26.60300899999993], [40.8517746, 14.268124400000033], [40.8373331, 14.254689999999982], [40.8304365, 14.220226499999967], [40.8385582, 24.303195800000026], [38.1795427, 24.208438], [35.2563455, 25.604853100000014], [35.2294606, 23.681912799999964], [38.1156879, 13.361267099999964], [38.6374514, 15.06450910000001], [36.8282207, 11.940496400000029], [39.1973712, 20.185194799999977], [40.8955737, 12.958975099999975], [37.5002493, 23.45507329999998], [37.2881801, 13.52717240000004], [40.8333682, 8.40229290000002], [40.6280528, 14.484981199999993], [40.7408774, 24.5772111], [40.7578412, 14.015099599999985], [35.3643615, 24.482155199999966], [38.5480204, 14.828448600000002], [40.68244079999999, 14.76809609999998], [38.5674187, 14.833787900000061], [40.4742843, 25.52519469999993], [44.130902, 12.38604609999993], [44.2975603, 8.464500000000044], [35.2015175, 24.1380312], [35.2086503, 26.105232900000033], [40.6262925, 14.375798499999974], [35.2485363, 23.81088790000001], [38.803377, 15.232645400000024], [36.6156541, 27.835961699999984], [42.0005331, 14.995283900000004], [41.2963728, 13.233265699999947], [40.7766956, 24.709070500000053], [37.5823593, 26.453107499999987], [38.0176177, 12.53720199999998], [42.1166667, 15.5], [45.6495264, 13.77681819999998], [38.7031179, 13.168267499999956], [45.4408474, 12.31551509999997], [40.7983097, 13.432063700000072], [38.39461319999999, 14.970634000000018], [39.5394875, 24.988668700000062], [37.6162112, 26.295453199999997], [38.6346145, 21.397203999999988], [37.7093576, 23.34667049999996], [37.713764, 23.346552], [37.983917, 23.729359899999963], [36.9064014, 25.997417600000063], [37.7474254, 23.429189899999983], [39.1496707, 23.843854299999975], [36.8400184, 25.887664099999938], [37.8380382, 24.93912679999994], [36.5489003, 26.35244369999998], [37.7497172, 26.981878999999935], [39.3621896, 22.942158999999947], [39.17563980000001, 23.615578599999935], [37.1005537, 25.795104700000024], [37.3869672, 23.24676880000004], [37.6315616, 26.177724500000068], [37.7881604, 20.898827100000062], [39.5061499, 20.265533900000037], [41.1837502, 23.28100870000003], [35.3387352, 25.144212599999946], [40.6400629, 22.944419100000005], [36.3931562, 25.461509200000023], [36.4343708, 25.34472740000001], [38.4284603, 20.676487700000052], [37.5967227, 26.112307800000053], [36.7233028, 25.282278200000064], [36.95228240000001, 26.98076530000003], [37.7920861, 26.704899999999952], [35.507574, 27.212199499999997], [35.415985, 26.922541899999942], [36.1437646, 29.583140400000048], [36.8265829, 25.86346739999999], [37.60758, 24.310371799999984], [39.6249838, 19.922346100000027], [38.1753675, 20.569217900000012], [36.7929382, 24.574732100000006], [36.9322993, 25.601211599999942], [35.240117, 24.809269099999938], [37.4123246, 24.4308039], [37.9346907, 21.144997500000045], [36.8925871, 27.28779259999999], [37.7145601, 24.053435199999967], [37.2953169, 26.76858029999994], [37.1409141, 26.848842699999977], [39.2645095, 26.277707299999975], [39.9198413, 25.14148399999999], [36.6914464, 24.393565500000022], [41.1171432, 16.871871499999997], [37.4467185, 25.32886229999997], [37.1021029, 25.37611400000003], [36.59006189999999, 27.16762689999996], [36.547782, 27.84731050000005], [37.0856432, 25.14883180000004], [37.3093015, 26.546691099999975], [38.2466395, 21.734574000000066], [37.92820460000001, 23.634797599999956], [38.4284603, 20.676487700000052], [38.1539645, 20.771284400000013], [37.327838, 23.143731900000034], [37.68994310000001, 26.942601800000034], [38.0083899, 24.008613500000024], [36.4349631, 28.21748290000005], [38.2514148, 20.64716880000003], [37.7547857, 26.977770100000043], [36.3931562, 25.461509200000023], [37.1558094, 24.505917100000033], [36.6966848, 25.11972190000006], [36.96795729999999, 24.7024179], [39.1626627, 23.490975899999967], [39.1223106, 23.728123299999993], [37.2632783, 23.15717219999999], [37.43850279999999, 24.913934400000016], [36.87004, 25.5181245], [36.4547347, 27.34536890000004], [37.5393136, 25.15982310000004], [37.3466624, 23.46594970000001], [36.6287384, 24.92066509999995], [35.5138298, 24.01803670000004], [38.3709813, 26.136345699999993], [38.541705, 25.56257640000001]];
    var xmltojson;
    $.ajax({
        url: '../combinations.xml',
        dataType: 'xml',
        async: false,
        success: function (data) {
            xmltojson = $.xml2json(data, true);
        }
    });
    var portallvalues = new Array();
    var portallvaluesabbr = new Array();
    for (var i = 0; i < xmltojson.from.length; i++) {
        if ($.inArray(xmltojson.from[i].code, portallvaluesabbr) == -1) {
            portallvalues.push('[' + xmltojson.from[i].code + '] ' + xmltojson.from[i].name);
            portallvaluesabbr.push(xmltojson.from[i].code);
        }
        else {
            for (var j = 0; j < xmltojson.from[i].to.length; j++) {
                if ($.inArray(xmltojson.from[i].to[j].code, portallvaluesabbr) == -1) {
                    portallvalues.push('[' + xmltojson.from[i].to[j].code + '] ' + xmltojson.from[i].to[j].name);
                    portallvaluesabbr.push(xmltojson.from[i].code);
                }
            }
        }
    }
    for (var i = 0; i < portallvalues.length; i++) {
        portallvalueslatlng[i] = { latLng: portallvalueslatlng[i], data: portallvalues[i] };
    }
    var portallvalueslatlngbackup = portallvalueslatlng.slice();
    var portattikhvalues = ['[LAV] LAVRIO', '[PIR] PIRAEUS', '[RAF] RAFINA'];
    var portkykladesvalues = ['[ANA] ANAFI', '[AIG] AEGIALI', '[AND] ANDROS', '[JTY] ASTYPALEA', '[DON] DONOUSSA', '[IRK] IRAKLIA', '[JTR] THIRA(SANTORINI)', '[TRS] THIRASSIA', '[IOS] Ios,Ίος', '[AMO] KATAPOLA', '[KEA] Kea,Κέα', '[KMS] KIMOLOS', '[KOU] KOUFONISSI', '[KYT] KYTHNOS', '[MLO] MILOS', '[JMK] MYKONOS', '[JNX] NAXOS', '[PAS] PAROS', '[PMS] PATMOS', '[SER] SERIFOS', '[SIK] SIKINOS', '[SIF] SIFNOS', '[JSY] SYROS', '[SXI] SCHINOUSSA', '[TIN] TINOS', '[FOL] FOLEGANDROS'];
    var portargosaronikosvalues = ['[MET] METHANA', '[POR] POROS', '[AGS] AGISTRI', '[AGG] AGISTRI-MYLI', '[AEG] AEGINA', '[ERM] HERMIONI', '[PHE] PORTO HELI', '[SPE] SPETSES', '[HYD] HYDRA'];
    var portkrhthvalues = ['[ROU] AG.ROUMELI','[GVD] GAVDOS','[KIS] KISSAMOS','[LTR] LOUTRO CHANION','[RNO] RETHIMNO','[CSF] SFAKIA','[JSH] SITIA','[SOG] SOUGIA','[HER] HERAKLIO','[CHA] CHANIA'];
    var portioniovalues = ['[AKT] ANTIKYTHIRA', '[PSA] ITHAKI(PISAETOS)', '[KTH] KYTHIRA', '[PAX] PAXI', '[ZTH] ZAKYNTHOS', '[IGO] IGOUMENITSA', '[CFU] CORFU', '[KIL] KILINI', '[GRA] PATRA', '[SMI] SAMI'];
    var portsporadesvalues = ['[AGC] AG.CONSTANTINOS', '[ALO] ALONISSOS', '[VOL] VOLOS', '[GLO] GLOSSA', '[JSI] SKIATHOS', '[SKO] SKOPELOS'];
    var portboreioaigaiovalues = ['[AGA] AGATHONISI', '[AXL] ALEX/POLI', '[CHR] CHRISOMHLEA(FOURNOI)', '[INO] INOUSSES', '[KAV] KAVALA', '[MAS] MASTIHARI', '[SAM] SAMOTHRAKI', '[THY] THIMAINA(FOURNOI)', '[AES] AG.EYSTRATIOS', '[AGK] AG.KIRIKOS', '[BTH] VATHI (SAMOS)', '[EYD] EVDILOS', '[SKG] THESSALONIKI', '[KAR] KARLOVASSI', '[LES] LESVOS(MITILINI)', '[LMN] LIMNOS', '[PYT] PYTHAGORIO', '[FOU] FOURNI', '[CHI] CHIOS', '[PHA] PSARA'];
    var porteuoiavalues = ['[NST] NEA STIRA'];
    var portpeloponnhsosvalues = ['[GYT] GYTHIO', '[NEA] NEAPOLIS'];
    var portitalyvalues = ['[ANC] ANCONA', '[VEN] VENICE', '[BAR] BARI'];
    var portturkeyvalues = ['[KUS] KUSADASI', '[MAR] MARMARIS'];
    var arrayofports = [portattikhvalues, portkykladesvalues, portargosaronikosvalues, portkrhthvalues, portioniovalues, portsporadesvalues, portboreioaigaiovalues, porteuoiavalues, portpeloponnhsosvalues, portitalyvalues, portturkeyvalues];
    var allports = [];
    for (var i = 0; i < portallvalues.length; i++) {
        for (var p = 0; p < categorylettersenglish.length; p++) {
            if (portallvalues[i].charAt(6) == categorylettersenglish[p].toUpperCase()) {
                allports[i] = [categoryportareavalues[0], portallvalues[i], categorylettersenglish[p].toUpperCase()];
            }
            if (p < 24) {
                if (portallvalues[i].charAt(0) == categorylettersgreeksmall[p]) {
                    allports[i] = [categoryportareavalues[0], portallvalues[i], categorylettersgreeksmall[p]];
                }
                else if (portallvalues[i].charAt(0) == categorylettersgreekbig[p]) {
                    allports[i] = [categoryportareavalues[0], portallvalues[i], categorylettersgreekbig[p]];
                }
            }
        }
    }
    var allportsbackup = allports.slice();

    for (var i = 1; i < categoryportareavalues.length; i++) {
        for (var k = 0; k < allports.length; k++) {
            for (var j = 0; j < arrayofports[i - 1].length; j++) {
                if (allports[k][1] == arrayofports[i - 1][j]) {
                    allports[k][0] = categoryportareavalues[i];
                }
            }
        }
    }

    var categoryportareabutton = $('<a class="btn waves-effect waves-light blue categoryportareabutton" style=width:100%>');
    var categorytableportsarealist = $('<table class="table table-condensed">');
    var showports = $('<div>');
    var portdiv = $('<div>');
    var portlist = $('<table class="table table-condensed">');
    portdiv.append(portlist);
    var areaofports = $('<li style=color:#1668b1;font-size:large;font-weight:bolder>' + categoryportareavalues[0] + '</li>');
    var portheader = $('<ul class=list-inline style="border-bottom:5px solid #FA0">');
    var portimage = $('<li><img src="../Content/Searchimages/ship.png" alt="shipimage" style=margin-bottom:5px></li>');
    var portlistbutton = $('<button type="button" class="btn-floating waves-effect waves-light green portlistbutton" title="Show on list"><i class="material-icons">list</i></button>');
    var portmapbutton = $('<button type="button" class="btn-floating waves-effect waves-light green portmapbutton" title="Show on map"><i class="material-icons">language</i></button>');
    portheader.append(portimage).append(areaofports).append(portlistbutton).append(portmapbutton);
    showports.append(categorytableportsarealist).append(portheader).append(portdiv);

    function categorizedarealistbuttons() {
        categorytableportsarealist.empty();
        categorytableportsarealist.append($('<tr>').append($('<td>').append(categoryportareabutton.clone(true).text('Όλα τα Λιμάνια').css('background-image', 'url(../Content/Searchimages/categoryportimages/' + categoryportvaluesimages[0] + ')'))));
        var counttr = 0;
        for (var i = 1; i < categoryportareavalues.length; i++) {
            var count = 0;
            for (var j = 0; j < allports.length; j++) {
                if (allports[j][0] == categoryportareavalues[i] && count == 0) {
                    count++;
                    if (counttr == 5) {
                        categorytableportsarealist.append($('<tr>'));
                    }
                    counttr++;
                    categorytableportsarealist.find('tr:last').append($('<td style=border:0px>').append(categoryportareabutton.clone(true).text(categoryportareavalues[i]).css('background-image', 'url(../Content/Searchimages/categoryportimages/' + categoryportvaluesimages[i] + ')')));
                }
            }
        }
    }

    $('body').on('click', '.categoryportareabutton', function () {
        areaofports.text($(this).text());
        portallvalueslatlng = portallvalueslatlngbackup.slice();
        categorizedports($(this).text());
        if ($('[id=map]').length > 0) {
            $('.portmapbutton').trigger('click');
        }
    });

    var currentcategorizedportslatlng = [];
    function categorizedports(value) {
        portlist.empty();
        if (currentcategorizedportslatlng.length > 0) {
            portallvalueslatlng = currentcategorizedportslatlng.slice();
        }
        var currentportslatlng = [];
        var count = 0;
        for (var i = 0; i < categorylettersenglish.length; i++) {
            var k = 0;
            var showcategory = 0;
            for (var j = 0; j < allports.length; j++) {
                if (showcategory == 0 && categorylettersenglish[i].toUpperCase() == allports[j][2] && (allports[j][0] == value || categoryportareavalues[0] == value))
                {
                    showcategory++;
                    portlist.append($('<tr>').append($('<td style="font-weight:bolder;font-size:medium;color:#1668b1;border:0px" colspan=2>').append(categorylettersenglish[i].toUpperCase())));
                }
                if (k % 2 == 0) {
                    portlist.append($('<tr>'));
                }
                if (categoryportareavalues[0] == value && (categorylettersenglish[i].toUpperCase() == allports[j][2] || (i < 24 && (categorylettersgreeksmall[i] == allports[j][2] || categorylettersgreekbig[i] == allports[j][2])))) {
                    portlist.find('tr:last').append($('<td class=portname>').append(allports[j][1]));
                    currentportslatlng[count] = portallvalueslatlng[j];
                    count++;
                    k++;
                }
                else if (allports[j][0] == value && categorylettersenglish[i].toUpperCase() == allports[j][2]) {
                    portlist.find('tr:last').append($('<td class=portname>').append(allports[j][1]));
                    currentportslatlng[count] = portallvalueslatlng[j];
                    count++;
                    k++;
                }
            }
        }
        portlist.find('tr').each(function () {
            if ($(this).find('td').length == 1) {
                $(this).find('td').attr('colspan', 2);
            }
        });
        portallvalueslatlng = currentportslatlng.slice();
    }

    function filteredports(object) {
        allports = allportsbackup.slice();
        portallvalueslatlng = portallvalueslatlngbackup.slice();
        var currentports = [];
        var currentportsabbr = [];
        var currentportslatlng = [];
        var count = 0;
        if (object.parent().attr('id').search('depallroute') != -1) {
            var specificobject = object.parent().attr('id').split('depallroute');
            var beforespecificobject = parseInt(specificobject[1]) - 1;
            var afterspecificobject = parseInt(specificobject[1]) + 1;
            var countelements = $('[id*=arrallroute]').length;
            if (($('[id=arrallroute' + specificobject[1] + ']').find('input').val() == '' && (countelements == 1 || beforespecificobject < 0)) || ($('[id=arrallroute' + beforespecificobject + ']').find('input').val() == '' && $('[id=arrallroute' + specificobject[1] + ']').find('input').val() == '' && countelements > 0)) {
                for (var i = 0; i < xmltojson.from.length; i++) {
                    for (var j = 0; j < allports.length; j++) {
                        if (portallvaluesabbr[j] == xmltojson.from[i].code) {
                            currentports[count] = allports[j];
                            currentportslatlng[count] = portallvalueslatlng[j];
                            count++;
                            break;
                        }
                    }
                }
            }
            else if ($('[id=arrallroute' + specificobject[1] + ']').find('input').val() == '' && $('[id=arrallroute' + beforespecificobject + ']').find('input').val() != '' && countelements > 0) {
                var portarea;
                for (var i = 0; i < allports.length; i++) {
                    if (allports[i][1] == $('[id=arrallroute' + beforespecificobject + ']').find('input').val()) {
                        portarea = allports[i][0];
                    }
                }
                for (var i = 0; i < allports.length; i++) {
                    if (allports[i][0] == portarea && allports[i][1] != $('[id=depallroute' + beforespecificobject + ']').find('input').val() && allports[i][1] != $('[id=depallroute' + afterspecificobject + ']').find('input').val()) {
                        currentports[count] = allports[i];
                        currentportslatlng[count] = portallvalueslatlng[i];
                        count++;
                    }
                }
            }
            else {
                for (var i = 0; i < xmltojson.from.length; i++) {
                    var departureport = xmltojson.from[i].name;
                    for (var j = 0; j < xmltojson.from[i].to.length; j++) {
                        var arriveport = xmltojson.from[i].to[j].name;
                        if ($('[id=arrallroute' + specificobject[1] + ']').find('input').val().search(arriveport) != -1) {
                            for (var k = 0; k < allports.length; k++) {
                                if (allports[k][1].search(departureport) != -1 && allports[k][1].search(arriveport) == -1 && $.inArray(portallvaluesabbr[k], currentportsabbr) == -1) {
                                    currentports[count] = allports[k];
                                    currentportsabbr[count] = portallvaluesabbr[k];
                                    currentportslatlng[count] = portallvalueslatlng[k];
                                    count++;
                                }
                            }
                        }
                    }
                }
            }
            if (i == xmltojson.from.length || i == allports.length) {
                allports = currentports.slice();
                portallvalueslatlng = currentportslatlng.slice();
                currentcategorizedportslatlng = currentportslatlng.slice();
            }
        }
        else {
            var specificobject = object.parent().attr('id').split('arrallroute');
            var afterspecificobject = parseInt(specificobject[1]) + 1;
            var count = 0;
            var countelements = $('[id*=depallroute]').length;
            if (($('[id=depallroute' + specificobject[1] + ']').find('input').val() == '' && (countelements == 1 || afterspecificobject == countelements)) || ($('[id=depallroute' + specificobject[1] + ']').find('input').val() == '' && $('[id=depallroute' + afterspecificobject + ']').find('input').val() == '' && countelements > 0)) {
                for (var i = 0; i < xmltojson.from.length; i++) {
                    for (var j = 0; j < xmltojson.from[i].to.length; j++) {
                        for (var k = 0; k < allports.length; k++) {
                            if (portallvaluesabbr[k] == xmltojson.from[i].to[j].code && $.inArray(portallvaluesabbr[k], currentportsabbr) == -1) {
                                currentports[count] = allports[k];
                                currentportsabbr[count] = portallvaluesabbr[k];
                                currentportslatlng[count] = portallvalueslatlng[k];
                                count++;
                            }
                        }
                    }
                }
            }
            else if ($('[id=depallroute' + specificobject[1] + ']').find('input').val() == '' && $('[id=depallroute' + afterspecificobject + ']').find('input').val() != '' && countelements > 0) {
                var portarea;
                for (var i = 0; i < allports.length; i++) {
                    if (allports[i][1] == $('[id=depallroute' + afterspecificobject + ']').find('input').val()) {
                        portarea = allports[i][0];
                    }
                }
                for (var i = 0; i < allports.length; i++) {
                    if (allports[i][0] == portarea && allports[i][1] != $('[id=arrallroute' + beforespecificobject + ']').find('input').val() && allports[i][1] != $('[id=arrallroute' + afterspecificobject + ']').find('input').val()) {
                        currentports[count] = allports[i];
                        currentportslatlng[count] = portallvalueslatlng[i];
                        count++;
                    }
                }
            }
            else {
                for (var i = 0; i < xmltojson.from.length; i++) {
                    var departureport = xmltojson.from[i].name;
                    if ($('[id=depallroute' + specificobject[1] + ']').find('input').val().search(departureport) != -1) {
                        for (var j = 0; j < xmltojson.from[i].to.length; j++) {
                            var arriveport = xmltojson.from[i].to[j].name;
                            for (var k = 0; k < allports.length; k++) {
                                if (allports[k][1].search(arriveport) != -1 && allports[k][1].search(departureport) == -1 && $.inArray(portallvaluesabbr[k], currentportsabbr) == -1) {
                                    currentports[count] = allports[k];
                                    currentportsabbr[count] = portallvaluesabbr[k];
                                    currentportslatlng[count] = portallvalueslatlng[k];
                                    count++;
                                }
                            }
                        }
                    }
                }
            }
            if (i == xmltojson.from.length || i == allports.length) {
                allports = currentports.slice();
                portallvalueslatlng = currentportslatlng.slice();
                currentcategorizedportslatlng = currentportslatlng.slice();
            }
        }
    }

    $('body').on('input', '[id*=depallroute]>input,[id*=arrallroute]>input', function () {
        filteredports($(this));
    });


    $('body').on('click', '[id*=depallroute]>input,[id*=arrallroute]>input', function () {
        $(this).autocomplete({
            autoFocus: true,
            source: function (request, response) {
                var matcher = new RegExp("^" + $.ui.autocomplete.escapeRegex(request.term), "i");
                response($.grep(portallvalues, function (item) {
                    for (var i = 0; i < allports.length; i++) {
                        if (allports[i][1] == item) {
                            if (item.search(']') != -1) {
                                return matcher.test(item.substring(6, item.length));
                            }
                            else {
                                return matcher.test(item);
                            }
                        }
                    }
                }));
            },
            open: function (event, ui) {
                var firstelement = $(this).data("uiAutocomplete").menu.element[0].children[0], inpt = $(this), original = inpt.val(), firstelementtext = $(firstelement).text();
                if (firstelementtext.toUpperCase().indexOf(original.toUpperCase()) >= 0) {
                    if (firstelementtext.search(']') != -1) {
                        inpt.val(firstelementtext.substring(6, firstelementtext.length));
                    }
                    else {
                        inpt.val(firstelementtext.substring(0, firstelementtext.length));
                    }
                    $(this).focusout(function () {
                        var flag = 0;
                        for (var i = 0; i < allports.length; i++) {
                            if (inpt.val() == allports[i][1]) {
                                flag = 1;
                            }
                        }
                        if (flag == 0) {
                            inpt.val(firstelementtext.substring(0, firstelementtext.length));
                        }
                    });
                    var originallength = original.length;
                    inpt[0].selectionStart = originallength;
                    inpt[0].selectionEnd = firstelementtext.length;
                    for (var i = 0; i < $($(this).data("uiAutocomplete").menu.element[0].children).length; i++) {
                        var elementtext = $($(this).data("uiAutocomplete").menu.element[0].children[i]).text();
                        if (elementtext.search(']') != -1) {
                            $($(this).data("uiAutocomplete").menu.element[0].children[i]).html('' + elementtext.substring(0, 6) + '<span style=color:orange>' + elementtext.substring(6, 6 + originallength) + '</span>' + elementtext.substring(6 + originallength, elementtext.length));
                        }
                        else {
                            $($(this).data("uiAutocomplete").menu.element[0].children[i]).html('<span style=color:orange>' + elementtext.substring(0, originallength) + '</span>' + elementtext.substring(originallength, elementtext.length));
                        }
                    }
                    $('.ui-autocomplete').css({ 'max-height': '200px', 'overflow-y': 'auto', 'overflow-x': 'hidden' });
                }
            }
        });
    });

    var selectorfancybox;
    $('body').on('click', '.portname', function () {
        portlist.empty();
        selectorfancybox.find('input').val($(this).text());
        $.fancybox.close();
    });

    $('body').on('click', '.portlistbutton', function () {
        portdiv.css('overflow', 'visible');
        portmapbutton.show();
        portlistbutton.hide();
        portdiv.empty();
        portdiv.append(portlist);
    });

    $('body').on('click', '.portmapbutton', function () {
        portdiv.css('overflow', 'hidden');
        portmapbutton.hide();
        portlistbutton.show();
        portdiv.empty();
        $map = $('<div id=map>');
        portdiv.append($map);
        $map.width("888px").height("690px").gmap3({
            map: {
                address: "Athens, Greece",
                options: {
                    mapTypeId: google.maps.MapTypeId.TERRAIN
                }
            },
            marker: {
                values: portallvalueslatlng,
                cluster: {
                    radius: 100,
                    // This style will be used for clusters with more than 0 markers
                    0: {
                        content: "<div class='cluster cluster-1'>CLUSTER_COUNT</div>",
                        width: 53,
                        height: 52,
                    },
                    // This style will be used for clusters with more than 20 markers
                    20: {
                        content: "<div class='cluster cluster-2'>CLUSTER_COUNT</div>",
                        width: 56,
                        height: 55
                    },
                    // This style will be used for clusters with more than 50 markers
                    50: {
                        content: "<div class='cluster cluster-3'>CLUSTER_COUNT</div>",
                        width: 66,
                        height: 65
                    },
                    events: {
                        click: function (overlay, event, context) {
                            var map = overlay.main.map;
                            var data = context.data;
                            map.panTo(data.latLng);
                            map.setZoom(map.getZoom() + 2);
                        }
                    }
                },
                options: {
                    icon: new google.maps.MarkerImage("../Content/Searchimages/mapimages/port-image.png")
                },
                events: {
                    mouseover: function (marker, event, context) {
                        $(this).gmap3(
                          { clear: "overlay" },
                          {
                              overlay: {
                                  latLng: marker.getPosition(),
                                  options: {
                                      content: "<div class=infobulle>" +
                                                  "<div class=bg></div>" +
                                                  "<div class=text>" + context.data + "</div>" +
                                                "</div>" +
                                                "<div class=arrow></div>",
                                      offset: {
                                          x: -46,
                                          y: -73
                                      }
                                  }
                              }
                          });
                    },
                    mouseout: function () {
                        $(this).gmap3({ clear: "overlay" });
                    },
                    click: function (marker, event, context) {
                        selectorfancybox.find('input').val(context.data);
        $.fancybox.close();
                    }
                }
            }
        }, "autofit");
    });

    $('label[for^=FromPort],label[for^=ToPort],label[for*=MultDepList]').fancybox({
        autoSize: true,
        autoScale: false,
        transitionIn: 'none',
        transitionOut: 'none',
        content: showports,
        beforeLoad: function () {
            portdiv.empty();
            portdiv.append(portlist);
            portlistbutton.hide();
            filteredports($(this.element));
            selectorfancybox = $(this.element).parent();
            categorizedarealistbuttons();
            categorizedports(categoryportareavalues[0]);
            areaofports.text(categoryportareavalues[0]);
        }, afterClose: function () {
            portlistbutton.hide();
            portmapbutton.show();
        }
    });

    $('body').on('keyup', '[id*=passenger]', function () {
        keepnumpassengers($(this));
    });

    $('body').on('keyup', '[id*=vehicle]', function () {
        keepnumvehicles($(this));
    });

    $('body').on('click', '.increment,.decrement', function () {
        $parentselector = $(this).parent();
        $selector = $parentselector.find('input');
        $selectorvalue = $selector.val();
        
        if ($(this).attr('class').search('increment') != -1) {
            $selectorvalue++;
            $selector.val($selectorvalue);
        }
        else {
            if ($selectorvalue > 0) {
                $selectorvalue--;
                $selector.val($selectorvalue);
            }
        }

        if ($parentselector.attr('id').search('passenger') != -1) {
            keepnumpassengers($parentselector);
        }
        else {
            keepnumvehicles($parentselector);
        }
    });

});

function keepnumpassengers(selector) {
    var selectorinput = selector.find('input');
    if (selectorinput.val() == '' || selectorinput.val() < 0) {
        selectorinput.val(0);
    }
    var input = parseInt(selectorinput.val());
    selectorinput.val(input);
    if (selectorinput.attr('name') === 'olders') {
        numpassengersarray[4] = input;
        $('#NumOfOlders').val(input);
    }
    else if (selectorinput.attr('name') === 'adults') {
        numpassengersarray[0] = input;
        $('#NumOfAdults').val(input);
    }
    else if (selectorinput.attr('name') === 'teens') {
        numpassengersarray[1] = input;
        $('#NumOfTeens').val(input);
    }
    else if (selectorinput.attr('name') === 'kids') {
        numpassengersarray[2] = input;
        $('#NumOfKids').val(input);
    }
    else if (selectorinput.attr('name') === 'infants') {
        numpassengersarray[3] = input;
        $('#NumOfInfants').val(input);
    }
    stylepopovercontent(selector);
    var sumnumpassengers = 0;
    for (var i = 0; i < numpassengersarray.length; i++) {
        sumnumpassengers += numpassengersarray[i];
    }
    $('#numpassengers').val(sumnumpassengers);
}

function keepnumvehicles(selector) {
    selectorinput = selector.find('input');
    if (selectorinput.val() =='' || selectorinput.val() < 0) {
        selectorinput.val(0);
    }
    var input = parseInt(selectorinput.val());
    selectorinput.val(input);
    if (selectorinput.attr('id') === 'cars') {
        numvehiclesarray[0] = input;
        $('#NumOfCars').val(input);
    }
    else if (selectorinput.attr('id') === 'motos') {
        numvehiclesarray[1] = input;
        $('#NumOfMotos').val(input);
    }
    else if (selectorinput.attr('id') === 'trailers') {
        numvehiclesarray[2] = input;
        $('#NumOfTrailers').val(input);
    }
    else if (selectorinput.attr('id') === 'minibuses') {
        numvehiclesarray[3] = input;
        $('#NumOfMiniBuses').val(input);
    }
    else if (selectorinput.attr('id') === 'trucks') {
        numvehiclesarray[4] = input;
        $('#NumOfTrucks').val(input);
    }
    stylepopovercontent(selector);
    var sumnumvehicles = 0;
    for (var i = 0; i < numvehiclesarray.length; i++) {
        sumnumvehicles += parseInt(numvehiclesarray[i]);
    }
    $('#numvehicles').val(sumnumvehicles);
}

function startpassengerpopover() {
    var count = 0;
    $('[id ^= passenger]').each(function () {
        $(this).find('input').val(numpassengersarray[count]);
        stylepopovercontent($(this));
        count++;
    });
}

function startvehiclepopover() {
    var count = 0;
    $('[id ^= vehicle]').each(function () {
        $(this).find('input').val(numvehiclesarray[count]);
        stylepopovercontent($(this));
        count++;
    });
}

function stylepopovercontent(selector) {
    if (selector.find('input').val() > 0) {
        selector.find('.decrement').show();
    }
    else {
        selector.find('.decrement').hide();
    }
}

function addFerryStep(counter) {
    if (typeof counter == 'undefined') {
        return -1;
    }
    counter++;
    $("#actionbtnid").before(createNewFerrystep(counter, 3));
    if (counter > 3) {
        $('#addFerryStepId').hide();
    } else {
        $('#addFerryStepId').show();
    }
    $('#delFerryStepId').show();
    return counter;
}

function delFerryStep(counter) {
    if (typeof counter == 'undefined') {
        return -1;
    }    
    $('#depallroute' + counter).remove();
    $('#arrallroute' + counter).remove();
    $('#depalldate' + counter).remove();
    counter--;
    if (counter < 2) {
        $('#delFerryStepId').hide();
    } else {
        $('#delFerryStepId').show();
    }
    $('#addFerryStepId').show();
    return counter;
}

function createNewFerrystep(cnt, option) {
    var toAppend;
    if (option === 3) {
        toAppend = '<div class="col-md-5" id="depallroute' + cnt + '">' +
            '<label for="MultDepList[' + cnt + '].FromPort" class="control-label" align="left">Από <a style="cursor:pointer">Επιλέξτε λιμάνι Αναχωρησης <img src="../Content/Searchimages/portfrom.png"></a></label>' +
            '<input class="form-control" type="text" name="MultDepList[' + cnt + '].FromPort"  placeholder = "Εισάγετε όνομα λιμανιού πόλης" data-val="true" required>' +
            '<span class="text-danger field-validation-valid" data-valmsg-for="MultDepList[' + cnt + '].FromPort" data-valmsg-replace="true"></span>' +
            '</div>' +
            '<div class="col-md-5" id="arrallroute' + cnt + '">' +
            '<label for="MultDepList[' + cnt + '].ToPort" class="control-label" align="left">Πρός <a style="margin-top: 5px; "> <a style="cursor:pointer">Επιλέξτε λιμάνι προορισμού <img src="../Content/Searchimages/portto.png"></a></label>' +
            '<input class = "form-control" type = "text" name="MultDepList[' + cnt + '].ToPort"  placeholder = "Εισάγετε όνομα λιμανιού πόλης" data-val="true"  required>' +
            '<span class="text-danger field-validation-valid" data-valmsg-for="MultDepList[' + cnt + '].ToPort" data-valmsg-replace="true"></span>' +
            '</div>' +
            '<div class="col-md-2" id="depalldate' + cnt + '">' +
            '<label for="MultDepList[' + cnt + '].DateFrom" class="control-label" align="left">Αναχώρηση</label>' +
            '<input class = "form-control datepicker" type = "date" readonly="readonly" name="MultDepList[' + cnt + '].DateFrom"  placeholder = "Εισάγετε ημ/νια αναχώρησης" id = "departuredatemulti' + cnt + '" data-val="true" required>' +
            '<span class="text-danger field-validation-valid" data-valmsg-for="MultDepList[' + cnt + '].DateFrom" data-valmsg-replace="true"></span>' +
            '</div>';
    } else if (option === 2 || option == 1) {
        toAppend = '<div class="col-md-6" id="depallroute' + cnt + '">' +
            '<label for="MultDepList[' + cnt + '].FromPort" class="control-label" align="left">Από <a style="cursor:pointer">Επιλέξτε λιμάνι Αναχωρησης <img src="../Content/Searchimages/portfrom.png"></a></label>' +
            '<input class="form-control" type="text" name="MultDepList[' + cnt + '].FromPort"  placeholder = "Εισάγετε όνομα λιμανιού πόλης" data-val="true" required>' +
            '<span class="text-danger field-validation-valid" data-valmsg-for="MultDepList[' + cnt + '].FromPort" data-valmsg-replace="true"></span>' +
            '</div>' +
            '<div class="col-md-6" id="arrallroute' + cnt + '">' +
            '<label for="MultDepList[' + cnt + '].ToPort" class="control-label" align="left">Πρός <a style="margin-top: 5px; "> <a style="cursor:pointer">Επιλέξτε λιμάνι προορισμού <img src="../Content/Searchimages/portto.png"></a></label>' +
            '<input class = "form-control" type = "text" name="MultDepList[' + cnt + '].ToPort"  placeholder = "Εισάγετε όνομα λιμανιού πόλης" data-val="true"  required>' +
            '<span class="text-danger field-validation-valid" data-valmsg-for="MultDepList[' + cnt + '].ToPort" data-valmsg-replace="true"></span>';
    }
    return toAppend;
}
