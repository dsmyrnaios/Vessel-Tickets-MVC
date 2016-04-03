$(document).ready(function () {
    numpassengersarray = [1, 0, 0, 0, 0];
    numvehiclesarray = [0, 0, 0, 0];

    var defaultmultipledirections = 3;
    var counter = defaultmultipledirections;

    

    $('input[type=radio][name=TripType][value=WithReturn]').attr("checked", true);

    $('body').on('change', 'input[type=radio][name=TripType]', function () {
        
        if (this.value === 'Simple') {

            //remove all ferry steps divs
            for (var j = 0; j < defaultmultipledirections; j++) {
                $('#multipletrip' + j).remove();
            }

            $('#actionbtnid').remove();
            $('#ferrysteps').remove();

            for (var i = 0; i < $('input[id*=arrivedate]').length; i++) {
                $('input[id=arrivedate' + i + ']').hide();
            }

            $('label[for=departure]').show();
            $('input[id=departuredate0]').show();
            $('#depalldate').show();

            $('label[for=arrive]').hide();
            $('#arralldate').hide();
            if ($('#fromto0').find('addroute')) {
                $('#addroute').remove();
            }

            //fromto
            $('#fromto0').show();


        }
        else if (this.value === 'WithReturn') {

            //remove all ferry steps divs
            for (var j = 0; j < defaultmultipledirections; j++) {
                $('#multipletrip' + j).remove();
            }

            $('#actionbtnid').remove();
            $('#ferrysteps').remove();

            $('label[for=departure]').show();
            $('input[id=departuredate0]').show();
            $('#depalldate').show();

            $('label[for=arrive]').show();
            $('input[id=arrivedate0]').show();
            $('#arralldate').show();

            //fromto
            $('#fromto0').show();



        }
        else if (this.value === 'Multiple') {
            for (var i = 0; i < $('input[id*=departuredate]').length; i++) {
                $('input[id=departuredate' + i + ']').hide();
            }

            for (var i = 0; i < $('input[id*=arrivedate]').length; i++) {
                $('input[id=arrivedate' + i + ']').hide();
            }

            $('label[for=departure]').hide();
            $('#depalldate').hide();
            $('label[for=arrive]').hide();
            $('#arralldate').hide();
            if ($('#fromto').find('addroute')) {
                $('#addroute').remove();
            }
            $('#fromto0').hide();
            var masterdiv = '<div id="ferrysteps"></div>';
            $("#dates").before(masterdiv);

            for (var j = 0; j < defaultmultipledirections; j++) {
                $("#ferrysteps").append(createNewFerrystep(j));
            }

            counter = j-1;

            var btnappend = '<div class="row" style="margin-bottom:0px" id="actionbtnid">' +
                            '<div class="col-md-6">' +
                            '<button type="button" class="btn waves-effect waves-light #bdbdbd grey lighten-1 icon-redremove" style="float:left" id="delFerryStepId" onclick="delFerryStep()">Αφαίρεση διαδρομής</button>' +
                            '</div>' +
                            '<div class="col-md-6">' +
                            //'<button type="button" class="btn waves-effect waves-light #bdbdbd grey lighten-1 glyphicon glyphicon-plus" style="float:right" id="addFerryStepId" onclick="addFerryStep()">Προσθήκη διαδρομής</button>' + //"../Content/Searchimages/bluePlusIcon.jpg"
                            '<button type="button" class="btn waves-effect waves-light #bdbdbd grey lighten-1 icon-greenplus" style="float:right" id="addFerryStepId" onclick="addFerryStep()">Προσθήκη διαδρομής</button>'
                            '</div></div>';

            $("#ferrysteps").append(btnappend);

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
            var dt = moment($('#departuredatemulti' + (idcount - 1)).val(), 'YYYY-MM-DD');
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
             format: "yyyy/mm/dd",
             selectMonths: true,
             monthsFull: ["Ιανουάριος", "Φεβρουάριος", "Μάρτιος", "Απρίλιος", "Μάιος", "Ιούνιος", "Ιούλιος", "Αύγουστος", "Σεπτέμβρης", "Οκτώβριος", "Νοέμβριος", "Δεκέμβριος"],
             min:  beginningdate,
             max: new Date(beginningdate.getFullYear() + 1, beginningdate.getMonth(), beginningdate.getDate()),
             closeOnClear: true,
             selectYears: 2,            
             formatSubmit: "yyyy/mm/dd",
             onClose: function () {
                 for (var j = idcount + 1; j <= counter; j++) {
                     if ($('#departuredatemulti' + j).val() != '' && $('#departuredatemulti' + j).val() != 'undefined') {
                         var dtj = moment($('#departuredatemulti' + j).val(), 'YYYY-MM-DD');
                         
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
                var dt = moment($('[id=departuredate' + dspecificarrivedateobject[1] + ']').val(), 'YYYY-MM-DD');
                startdate = new Date(dt.year(), dt.month(), dt.date());
            }
        }

        var picker = $(this).pickadate('picker');
        if (picker != null) {
            if (picker.get('open') == false) {
                if (specificobject.search('arrivedate') != -1 && $('[id=departuredate' + dspecificarrivedateobject[1] + ']').val() != '') {
                    var dt = moment($('[id=departuredate' + dspecificarrivedateobject[1] + ']').val(), 'YYYY-MM-DD');
                    picker.set('min', [dt.year(), dt.month(), dt.date()]);
                    picker.set('max', [dt.year()+1, dt.month(), dt.date()]);
                }

            }
            picker.open();
            return;
        }


        $(this).pickadate({
            format: "yyyy/mm/dd",
            selectMonths: true,
            monthsFull: ["Ιανουάριος", "Φεβρουάριος", "Μάρτιος", "Απρίλιος", "Μάιος", "Ιούνιος", "Ιούλιος", "Αύγουστος", "Σεπτέμβρης", "Οκτώβριος", "Νοέμβριος", "Δεκέμβριος"],
            min: startdate,
            max: new Date(startdate.getFullYear() + 1, startdate.getMonth(), startdate.getDate()),
            closeOnSelect: true,
            closeOnClear: true,
            selectYears: 2,
            formatSubmit: "yyyy/mm/dd",
            onClose: function () {
                if (specificobject === 'departuredate0') {
                    if ($('#arrivedate0').val() != '' && $('#arrivedate0' + j).val() != 'undefined') {
                        var dtj = moment($('#arrivedate0').val(), 'YYYY-MM-DD');
                        var dt = moment($('[id=departuredate0').val(), 'YYYY-MM-DD');

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
    var portallvalueslatlng = [[38.03505, 24.313394399999993], [35.230268, 23.960657800000035], [37.4577997, 26.972125000000005], [40.8457193, 25.873962000000006], [38.541397, 14.350097499999947], [40.6340026, 14.60268050000002], [36.3514465, 25.768029999999953], [43.6158299, 13.518914999999993], [35.881144, 23.28852489999997], [37.38218980000001, 26.735848900000065], [40.5532009, 14.222154000000046], [40.749354, 13.90604099999996], [38.1184125, 13.363060799999971], [39.5685915, 22.539523099999997], [37.6303933, 26.511509100000012], [42.0924239, 11.795413199999984], [36.726217, 27.685843999999975], [35.7564848, 27.20961460000001], [37.9310758, 12.328612900000053], [38.5618132, 14.57228699999996], [40.7382914, 13.860551200000032], [41.2559961, 13.60686720000001], [34.8346879, 24.08463699999993], [38.7902603, 15.192641800000047], [36.7602193, 22.56553729999996], [38.5154349, 26.2204921], [40.7379299, 13.948618399999987], [38.3636166, 20.719854899999973], [37.0422371, 22.114126400000032], [36.7822585, 27.14352269999995], [40.937607, 24.412866000000008], [40.821814, 24.68651509999995], [35.4945873, 23.65374589999999], [37.857913, 27.261015000000043], [36.25, 23], [38.6450255, 16.544780800000012], [35.5005212, 12.60583459999998], [37.9996877, 12.332070799999997], [35.8660738, 12.868741399999976], [38.4936623, 14.927204399999937], [43.548473, 10.310567399999968], [35.2000045, 24.07866530000001], [38.7991058, 23.479642300000023], [37.9739764, 12.054690899999969], [38.0491517, 24.321739699999966], [36.854936, 28.27087800000004], [36.8495611, 27.075656500000036], [37.5823986, 23.3885262], [38.2207102, 15.241932700000007], [39.0530887, 26.60300899999993], [40.8517746, 14.268124400000033], [40.8373331, 14.254689999999982], [40.8304365, 14.220226499999967], [40.8385582, 24.303195800000026], [38.1795427, 24.208438], [35.2563455, 25.604853100000014], [35.2294606, 23.681912799999964], [38.1156879, 13.361267099999964], [38.6374514, 15.06450910000001], [36.8282207, 11.940496400000029], [39.1973712, 20.185194799999977], [40.8955737, 12.958975099999975], [37.5002493, 23.45507329999998], [37.2881801, 13.52717240000004], [40.8333682, 8.40229290000002], [40.6280528, 14.484981199999993], [40.7408774, 24.5772111], [40.7578412, 14.015099599999985], [35.3643615, 24.482155199999966], [38.5480204, 14.828448600000002], [40.68244079999999, 14.76809609999998], [38.5674187, 14.833787900000061], [40.4742843, 25.52519469999993], [44.130902, 12.38604609999993], [44.2975603, 8.464500000000044], [35.2015175, 24.1380312], [35.2086503, 26.105232900000033], [40.6262925, 14.375798499999974], [35.2485363, 23.81088790000001], [38.803377, 15.232645400000024], [36.6156541, 27.835961699999984], [42.0005331, 14.995283900000004], [41.2963728, 13.233265699999947], [40.7766956, 24.709070500000053], [37.5823593, 26.453107499999987], [38.0176177, 12.53720199999998], [42.1166667, 15.5], [45.6495264, 13.77681819999998], [38.7031179, 13.168267499999956], [45.4408474, 12.31551509999997], [40.7983097, 13.432063700000072], [38.39461319999999, 14.970634000000018], [39.5394875, 24.988668700000062], [37.6162112, 26.295453199999997], [38.6346145, 21.397203999999988], [37.7093576, 23.34667049999996], [37.713764, 23.346552], [37.983917, 23.729359899999963], [36.9064014, 25.997417600000063], [37.7474254, 23.429189899999983], [39.1496707, 23.843854299999975], [36.8400184, 25.887664099999938], [37.8380382, 24.93912679999994], [36.5489003, 26.35244369999998], [37.7497172, 26.981878999999935], [39.3621896, 22.942158999999947], [39.17563980000001, 23.615578599999935], [37.1005537, 25.795104700000024], [37.3869672, 23.24676880000004], [37.6315616, 26.177724500000068], [37.7881604, 20.898827100000062], [39.5061499, 20.265533900000037], [41.1837502, 23.28100870000003], [35.3387352, 25.144212599999946], [40.6400629, 22.944419100000005], [36.3931562, 25.461509200000023], [36.4343708, 25.34472740000001], [38.4284603, 20.676487700000052], [37.5967227, 26.112307800000053], [36.7233028, 25.282278200000064], [36.95228240000001, 26.98076530000003], [37.7920861, 26.704899999999952], [35.507574, 27.212199499999997], [35.415985, 26.922541899999942], [36.1437646, 29.583140400000048], [36.8265829, 25.86346739999999], [37.60758, 24.310371799999984], [39.6249838, 19.922346100000027], [38.1753675, 20.569217900000012], [36.7929382, 24.574732100000006], [36.9322993, 25.601211599999942], [35.240117, 24.809269099999938], [37.4123246, 24.4308039], [37.9346907, 21.144997500000045], [36.8925871, 27.28779259999999], [37.7145601, 24.053435199999967], [37.2953169, 26.76858029999994], [37.1409141, 26.848842699999977], [39.2645095, 26.277707299999975], [39.9198413, 25.14148399999999], [36.6914464, 24.393565500000022], [41.1171432, 16.871871499999997], [37.4467185, 25.32886229999997], [37.1021029, 25.37611400000003], [36.59006189999999, 27.16762689999996], [36.547782, 27.84731050000005], [37.0856432, 25.14883180000004], [37.3093015, 26.546691099999975], [38.2466395, 21.734574000000066], [37.92820460000001, 23.634797599999956], [38.4284603, 20.676487700000052], [38.1539645, 20.771284400000013], [37.327838, 23.143731900000034], [37.68994310000001, 26.942601800000034], [38.0083899, 24.008613500000024], [36.4349631, 28.21748290000005], [38.2514148, 20.64716880000003], [37.7547857, 26.977770100000043], [36.3931562, 25.461509200000023], [37.1558094, 24.505917100000033], [36.6966848, 25.11972190000006], [36.96795729999999, 24.7024179], [39.1626627, 23.490975899999967], [39.1223106, 23.728123299999993], [37.2632783, 23.15717219999999], [37.43850279999999, 24.913934400000016], [36.87004, 25.5181245], [36.4547347, 27.34536890000004], [37.5393136, 25.15982310000004], [37.3466624, 23.46594970000001], [36.6287384, 24.92066509999995], [35.5138298, 24.01803670000004], [38.3709813, 26.136345699999993], [38.541705, 25.56257640000001]];
    var portallvalues = ['[AMN] AG.MARINA(EVOIA), Ελλάδα (Λιμάνι)', '[ROU] AG.ROUMELI, Ελλάδα (Λιμάνι)', '[AGA] AGATHONISI, Ελλάδα (Λιμάνι)', '[AXL] ALEXANDROUPOLI, Ελλάδα (Λιμάνι)', '[ALI] ALICUDI, Ιταλία (Λιμάνι)', '[AMA] AMALFI, Ιταλία (Λιμάνι)', '[ANA] ANAFI, Ελλάδα (Λιμάνι)', '[ANC] ANCONA (Ανκόνα), Ιταλία (Λιμάνι)', '[AKT] ANTIKYTHIRA, Ελλάδα (Λιμάνι)', '[ARK] ARKI, Ελλάδα (Λιμάνι)', '[PRJ] CAPRI, Ιταλία (Λιμάνι)', '[CAS] CASAMICCIOLA, Ιταλία (Λιμάνι)', '[CAM] CASTELAMMARE, Ιταλία (Λιμάνι)', '[CHL] CHALKI, Ελλάδα (Λιμάνι)', '[CHR] CHRISOMHLEA(FOURNOI), Ελλάδα (Λιμάνι)', '[CIV] CIVITAVECCHIA, Ιταλία (Λιμάνι)', '[DAT] DATCA, Τουρκία (Λιμάνι)', '[DFN] DIAFANI, Ελλάδα (Λιμάνι)', '[FAV] FAVIGNANA, Ιταλία (Λιμάνι)', '[FPO] FILICUDI PORTO, Ιταλία (Λιμάνι)', '[FRD] FORIO, Ιταλία (Λιμάνι)', '[FOM] FORMIA, Ιταλία (Λιμάνι)', '[GVD] GAVDOS, Ελλάδα (Λιμάνι)', '[GOS] GINOSTRA, Ιταλία (Λιμάνι)', '[GYT] GYTHIO, Ελλάδα (Λιμάνι)', '[INO] INOUSSES, Ελλάδα (Λιμάνι)', '[ISH] ISCHIA, Ιταλία (Λιμάνι)', '[VAT] ITHAKI(VATHI), Ελλάδα (Λιμάνι)', '[KLX] KALAMATA, Ελλάδα (Λιμάνι)', '[KRM] KARDAMENA, Ελλάδα (Λιμάνι)', '[KAV] KAVALA, Ελλάδα (Λιμάνι)', '[KER] KERAMOTI (Θάσος), Ελλάδα (Λιμάνι)', '[KIS] KISSAMOS, Ελλάδα (Λιμάνι)', '[KUS] KUSADASI (Κουσάντασι), Τουρκία (Λιμάνι)', '[KTH] KYTHIRA, Ελλάδα (Λιμάνι)', '[LAE] LACCO, Ιταλία (Λιμάνι)', '[LMP] LAMPEDUSA, Ιταλία (Λιμάνι)', '[LVZ] LEVANZO, Ιταλία (Λιμάνι)', '[LIU] LINOSA, Ιταλία (Λιμάνι)', '[LAP] LIPARI, Ιταλία (Λιμάνι)', '[LIV] LIVORNO, Ιταλία (Λιμάνι)', '[LTR] LOUTRO CHANION (Κρήτη), Ελλάδα (Λιμάνι)', '[MTI] MANTOUDI, Ελλάδα (Λιμάνι)', '[MMO] MARETTIMO, Ιταλία (Λιμάνι)', '[MRM] MARMARI, Ελλάδα (Λιμάνι)', '[MAR] MARMARIS, Τουρκία (Λιμάνι)', '[MAS] MASTIHARI, Ελλάδα (Λιμάνι)', '[MET] METHANA, Ελλάδα (Λιμάνι)', '[MLZ] MILAZZO, Ιταλία (Λιμάνι)', '[MJT] MYTILENE AIRPORT, Ελλάδα (Λιμάνι)', '[NAP] NAPOLI, Ιταλία (Λιμάνι)', '[BEV] NAPOLI(BEVERELLO), Ιταλία (Λιμάνι)', '[MER] NAPOLI(MERGELLINA), Ιταλία (Λιμάνι)', '[NPM] NEA PERAMOS, Ελλάδα (Λιμάνι)', '[NST] NEA STIRA, Ελλάδα (Λιμάνι)', '[NEA] NEAPOLIS, Ελλάδα (Λιμάνι)', '[PSF] PALEOHORA, Ελλάδα (Λιμάνι)', '[PLE] PALERMO, Ιταλία (Λιμάνι)', '[PNA] PANAREA, Ιταλία (Λιμάνι)', '[PNL] PANTELLERIA, Ιταλία (Λιμάνι)', '[PAX] PAXI, Ελλάδα (Λιμάνι)', '[PON] PONZA, Ιταλία (Λιμάνι)', '[POR] POROS, Ελλάδα (Λιμάνι)', '[PEM] PORTO EMPEDOCLE, Ιταλία (Λιμάνι)', '[PTO] PORTO TORRES, Ιταλία (Λιμάνι)', '[POS] POSITANO, Ιταλία (Λιμάνι)', '[PRI] PRINOS, Ελλάδα (Λιμάνι)', '[PRO] PROCIDA, Ιταλία (Λιμάνι)', '[RNO] RETHIMNO (Κρήτη), Ελλάδα (Λιμάνι)', '[RIN] RINELLA, Ιταλία (Λιμάνι)', '[SAL] SALERNO, Ιταλία (Λιμάνι)', '[SLA] SALINA, Ιταλία (Λιμάνι)', '[SAM] SAMOTHRAKI, Ελλάδα (Λιμάνι)', '[SAG] SAN ANGELO, Ιταλία (Λιμάνι)', '[SVN] SAVONA, Ιταλία (Λιμάνι)', '[CSF] SFAKIA (Κρήτη), Ελλάδα (Λιμάνι)', '[JSH] SITIA (Κρήτη), Ελλάδα (Λιμάνι)', '[RRO] SORRENTO, Ιταλία (Λιμάνι)', '[SOG] SOUGIA, Ελλάδα (Λιμάνι)', '[STR] STROMBOLI, Ιταλία (Λιμάνι)', '[SYM] SYMI, Ελλάδα (Λιμάνι)', '[TMI] TERMOLI, Ιταλία (Λιμάνι)', '[TRC] TERRACINA, Ιταλία (Λιμάνι)', '[THA] THASSOS, Ελλάδα (Λιμάνι)', '[THY] THIMAINA(FOURNOI), Ελλάδα (Λιμάνι)', '[TPS] TRAPANI, Ιταλία (Λιμάνι)', '[TMT] TREMITI, Ιταλία (Λιμάνι)', '[TRE] TRIESTE, Ιταλία (Λιμάνι)', '[UST] USTICA, Ιταλία (Λιμάνι)', '[VEN] VENICE (Βενετία), Ιταλία (Λιμάνι)', '[VNT] VENTOTENE, Ιταλία (Λιμάνι)', '[VUL] VULCANO, Ιταλία (Λιμάνι)', '[AES] Αγ. Ευστράτιος, Ελλάδα (Λιμάνι)', '[AGK] Αγ. Κήρυκος (Ικαρία), Ελλάδα (Λιμάνι)', '[AGC] Αγ. Κωνσταντίνος, Ελλάδα (Λιμάνι)', '[AGS] Αγκίστρι, Ελλάδα (Λιμάνι)', '[AGG] Αγκίστρι-Μύλι, Ελλάδα (Λιμάνι)', 'Αθήνα, Ελλάδα (Όλα τα λιμάνια)', '[AIG] Αιγιάλη (Αμοργός), Ελλάδα (Λιμάνι)', '[AEG] Αίγινα (Αίγινα), Ελλάδα (Λιμάνι)', '[ALO] Αλόννησος, Ελλάδα (Λιμάνι)', 'Αμοργός, Ελλάδα (Όλα τα λιμάνια)', '[AND] Άνδρος, Ελλάδα (Λιμάνι)', '[JTY] Αστυπάλαια, Ελλάδα (Λιμάνι)', '[BTH] Βαθύ (Σάμος), Ελλάδα (Λιμάνι)', '[VOL] Βόλος, Ελλάδα (Λιμάνι)', '[GLO] Γλώσσα, Ελλάδα (Λιμάνι)', '[DON] Δοννούσα, Ελλάδα (Λιμάνι)', '[ERM] Ερμιόνη, Ελλάδα (Λιμάνι)', '[EYD] Εύδηλος (Ικαρία), Ελλάδα (Λιμάνι)', '[ZTH] Ζάκυνθος, Ελλάδα (Λιμάνι)', '[IGO] Ηγουμενίτσα, Ελλάδα (Λιμάνι)', '[IRK] Ηρακλειά, Ελλάδα (Λιμάνι)', '[HER] Ηράκλειο (Κρήτη), Ελλάδα (Λιμάνι)', '[SKG] Θεσσαλονίκη, Ελλάδα (Λιμάνι)', '[JTR] Θήρα (Σαντορίνη), Ελλάδα (Λιμάνι)', '[TRS] Θηρασσιά (Σαντορίνη), Ελλάδα (Λιμάνι)', '[ITH] Ιθάκη, Ελλάδα (Λιμάνι)', 'Ικαρία, Ελλάδα (Όλα τα λιμάνια)', '[IOS] Ιος, Ελλάδα (Λιμάνι)', '[KAL] Κάλυμνος, Ελλάδα (Λιμάνι)', '[KAR] Καρλόβασι (Σάμος), Ελλάδα (Λιμάνι)', '[AOK] Κάρπαθος (Κάρπαθος), Ελλάδα (Λιμάνι)', '[KSJ] Κάσος, Ελλάδα (Λιμάνι)', '[KAZ] Καστελόριζο, Ελλάδα (Λιμάνι)', '[AMO] Κατάπολα (Αμοργός), Ελλάδα (Λιμάνι)', '[KEA] Κέα, Ελλάδα (Λιμάνι)', '[CFU] Κέρκυρα (Κέρκυρα), Ελλάδα (Λιμάνι)', 'Κεφαλονιά, Ελλάδα (Όλα τα λιμάνια)', '[KMS] Κίμωλος, Ελλάδα (Λιμάνι)', '[KOU] Κουφονήσι, Ελλάδα (Λιμάνι)', 'Κρήτη, Ελλάδα (Όλα τα λιμάνια)', '[KYT] Κύθνος, Ελλάδα (Λιμάνι)', '[KIL] Κυλλήνη, Ελλάδα (Λιμάνι)', '[KGS] Κως, Ελλάδα (Λιμάνι)', '[LAV] Λαύριο (Αθήνα), Ελλάδα (Λιμάνι)', '[LIP] Λειψοί, Ελλάδα (Λιμάνι)', '[LER] Λέρος (Λέρος), Ελλάδα (Λιμάνι)', '[LES] Λέσβος (Λέσβος), Ελλάδα (Λιμάνι)', '[LMN] Λήμνος (Λήμνος), Ελλάδα (Λιμάνι)', '[MLO] Μήλος, Ελλάδα (Λιμάνι)', '[BAR] Μπάρι (Μπάρι), Ιταλία (Λιμάνι)', '[JMK] Μύκονος, Ελλάδα (Λιμάνι)', '[JNX] Νάξος, Ελλάδα (Λιμάνι)', '[NIS] Νίσυρος, Ελλάδα (Λιμάνι)', '[PAN] Πανορμίτης, Ελλάδα (Λιμάνι)', '[PAS] Πάρος, Ελλάδα (Λιμάνι)', '[PMS] Πάτμος, Ελλάδα (Λιμάνι)', '[GRA] Πάτρα, Ελλάδα (Λιμάνι)', '[PIR] Πειραιάς (Αθήνα), Ελλάδα (Λιμάνι)', '[PSA] Πισαετός (Ιθάκη), Ελλάδα (Λιμάνι)', '[KEF] Πόρος (Κεφαλονιά), Ελλάδα (Λιμάνι)', '[PHE] Πόρτο Χέλι, Ελλάδα (Λιμάνι)', '[PYT] Πυθαγόρειο, Ελλάδα (Λιμάνι)', '[RAF] Ραφήνα (Αθήνα), Ελλάδα (Λιμάνι)', '[RHO] Ρόδος, Ελλάδα (Λιμάνι)', '[SMI] Σάμη (Κεφαλονιά), Ελλάδα (Λιμάνι)', 'Σάμος, Ελλάδα (Όλα τα λιμάνια)', 'Σαντορίνη, Ελλάδα (Όλα τα λιμάνια)', '[SER] Σέριφος, Ελλάδα (Λιμάνι)', '[SIK] Σίκινος, Ελλάδα (Λιμάνι)', '[SIF] Σίφνος, Ελλάδα (Λιμάνι)', '[JSI] Σκιάθος, Ελλάδα (Λιμάνι)', '[SKO] Σκόπελος (Σκόπελος), Ελλάδα (Λιμάνι)', '[SPE] Σπέτσες, Ελλάδα (Λιμάνι)', '[JSY] Σύρος, Ελλάδα (Λιμάνι)', '[SXI] Σχοινούσσα, Ελλάδα (Λιμάνι)', '[THL] Τήλος, Ελλάδα (Λιμάνι)', '[TIN] Τήνος, Ελλάδα (Λιμάνι)', '[HYD] Ύδρα, Ελλάδα (Λιμάνι)', '[FOL] Φολέγανδρος, Ελλάδα (Λιμάνι)', '[FOU] Φούρνοι, Ελλάδα (Λιμάνι)', '[CHA] Χανιά (Κρήτη), Ελλάδα (Λιμάνι)', '[CHI] Χίος, Ελλάδα (Λιμάνι)', '[PHA] Ψαρά, Ελλάδα (Λιμάνι)'];
    for (var i = 0; i < portallvalues.length; i++) {
        portallvalueslatlng[i] = { latLng: portallvalueslatlng[i], data: portallvalues[i] };
    }
    var portallvalueslatlngbackup = portallvalueslatlng.slice();
    var portattikhvalues = ['[LAV] Λαύριο (Αθήνα), Ελλάδα (Λιμάνι)', '[PIR] Πειραιάς (Αθήνα), Ελλάδα (Λιμάνι)', '[RAF] Ραφήνα (Αθήνα), Ελλάδα (Λιμάνι)'];
    var portkykladesvalues = ['[ANA] ANAFI, Ελλάδα (Λιμάνι)','[AIG] Αιγιάλη (Αμοργός), Ελλάδα (Λιμάνι)','[AND] Άνδρος, Ελλάδα (Λιμάνι)','[JTY] Αστυπάλαια, Ελλάδα (Λιμάνι)','[DON] Δοννούσα, Ελλάδα (Λιμάνι)','[IRK] Ηρακλειά, Ελλάδα (Λιμάνι)','[JTR] Θήρα (Σαντορίνη), Ελλάδα (Λιμάνι)','[TRS] Θηρασσιά (Σαντορίνη), Ελλάδα (Λιμάνι)','[IOS] Ιος, Ελλάδα (Λιμάνι)','[AMO] Κατάπολα (Αμοργός), Ελλάδα (Λιμάνι)','[KEA] Κέα, Ελλάδα (Λιμάνι)','[KMS] Κίμωλος, Ελλάδα (Λιμάνι)','[KOU] Κουφονήσι, Ελλάδα (Λιμάνι)','[KYT] Κύθνος, Ελλάδα (Λιμάνι)','[MLO] Μήλος, Ελλάδα (Λιμάνι)','[JMK] Μύκονος, Ελλάδα (Λιμάνι)','[JNX] Νάξος, Ελλάδα (Λιμάνι)','[PAS] Πάρος, Ελλάδα (Λιμάνι)','[PMS] Πάτμος, Ελλάδα (Λιμάνι)','[SER] Σέριφος, Ελλάδα (Λιμάνι)','[SIK] Σίκινος, Ελλάδα (Λιμάνι)','[SIF] Σίφνος, Ελλάδα (Λιμάνι)','[JSY] Σύρος, Ελλάδα (Λιμάνι)','[SXI] Σχοινούσσα, Ελλάδα (Λιμάνι)','[TIN] Τήνος, Ελλάδα (Λιμάνι)','[FOL] Φολέγανδρος, Ελλάδα (Λιμάνι)'];
    var portargosaronikosvalues = ['[MET] METHANA, Ελλάδα (Λιμάνι)', '[POR] POROS, Ελλάδα (Λιμάνι)', '[AGS] Αγκίστρι, Ελλάδα (Λιμάνι)', '[AGG] Αγκίστρι-Μύλι, Ελλάδα (Λιμάνι)', '[AEG] Αίγινα (Αίγινα), Ελλάδα (Λιμάνι)', '[ERM] Ερμιόνη, Ελλάδα (Λιμάνι)', '[PHE] Πόρτο Χέλι, Ελλάδα (Λιμάνι)', '[SPE] Σπέτσες, Ελλάδα (Λιμάνι)', '[HYD] Ύδρα, Ελλάδα (Λιμάνι)'];
    var portkrhthvalues = ['[ROU] AG.ROUMELI, Ελλάδα (Λιμάνι)','[GVD] GAVDOS, Ελλάδα (Λιμάνι)','[KIS] KISSAMOS, Ελλάδα (Λιμάνι)','[LTR] LOUTRO CHANION (Κρήτη), Ελλάδα (Λιμάνι)','[RNO] RETHIMNO (Κρήτη), Ελλάδα (Λιμάνι)','[CSF] SFAKIA (Κρήτη), Ελλάδα (Λιμάνι)','[JSH] SITIA (Κρήτη), Ελλάδα (Λιμάνι)','[SOG] SOUGIA, Ελλάδα (Λιμάνι)','[HER] Ηράκλειο (Κρήτη), Ελλάδα (Λιμάνι)','[CHA] Χανιά (Κρήτη), Ελλάδα (Λιμάνι)'];
    var portioniovalues = ['[AKT] ANTIKYTHIRA, Ελλάδα (Λιμάνι)','[VAT] ITHAKI(VATHI), Ελλάδα (Λιμάνι)','[KTH] KYTHIRA, Ελλάδα (Λιμάνι)','[PAX] PAXI, Ελλάδα (Λιμάνι)','[ZTH] Ζάκυνθος, Ελλάδα (Λιμάνι)','[IGO] Ηγουμενίτσα, Ελλάδα (Λιμάνι)','[ITH] Ιθάκη, Ελλάδα (Λιμάνι)','[CFU] Κέρκυρα (Κέρκυρα), Ελλάδα (Λιμάνι)','[KIL] Κυλλήνη, Ελλάδα (Λιμάνι)','[GRA] Πάτρα, Ελλάδα (Λιμάνι)','[PSA] Πισαετός (Ιθάκη), Ελλάδα (Λιμάνι)','[SMI] Σάμη (Κεφαλονιά), Ελλάδα (Λιμάνι)'];
    var portsporadesvalues = ['[AGC] Αγ. Κωνσταντίνος, Ελλάδα (Λιμάνι)','[ALO] Αλόννησος, Ελλάδα (Λιμάνι)','[VOL] Βόλος, Ελλάδα (Λιμάνι)','[GLO] Γλώσσα, Ελλάδα (Λιμάνι)','[JSI] Σκιάθος, Ελλάδα (Λιμάνι)','[SKO] Σκόπελος (Σκόπελος), Ελλάδα (Λιμάνι)'];
    var portboreioaigaiovalues = ['[AGA] AGATHONISI, Ελλάδα (Λιμάνι)','[AXL] ALEX/POLI, Ελλάδα (Λιμάνι)','[CHR] CHRISOMHLEA(FOURNOI), Ελλάδα (Λιμάνι)','[INO] INOUSSES, Ελλάδα (Λιμάνι)','[KAV] KAVALA, Ελλάδα (Λιμάνι)','[MAS] MASTIHARI, Ελλάδα (Λιμάνι)','[PRI] PRINOS, Ελλάδα (Λιμάνι)','[SAM] SAMOTHRAKI, Ελλάδα (Λιμάνι)','[THA] THASSOS, Ελλάδα (Λιμάνι)','[THY] THIMAINA(FOURNOI), Ελλάδα (Λιμάνι)','[AES] Αγ. Ευστράτιος, Ελλάδα (Λιμάνι)','[AGK] Αγ. Κήρυκος (Ικαρία), Ελλάδα (Λιμάνι)','[BTH] Βαθύ (Σάμος), Ελλάδα (Λιμάνι)','[EYD] Εύδηλος (Ικαρία), Ελλάδα (Λιμάνι)','[SKG] Θεσσαλονίκη, Ελλάδα (Λιμάνι)','[KAR] Καρλόβασι (Σάμος), Ελλάδα (Λιμάνι)','[LES] Λέσβος (Λέσβος), Ελλάδα (Λιμάνι)','[LMN] Λήμνος (Λήμνος), Ελλάδα (Λιμάνι)','[PYT] Πυθαγόρειο, Ελλάδα (Λιμάνι)','[FOU] Φούρνοι, Ελλάδα (Λιμάνι)','[CHI] Χίος, Ελλάδα (Λιμάνι)','[PHA] Ψαρά, Ελλάδα (Λιμάνι)'];
    var porteuoiavalues = ['[MRM] MARMARI, Ελλάδα (Λιμάνι)','[NST] NEA STIRA, Ελλάδα (Λιμάνι)'];
    var portpeloponnhsosvalues = ['[GYT] GYTHIO, Ελλάδα (Λιμάνι)', '[NEA] NEAPOLIS, Ελλάδα (Λιμάνι)'];
    var portitalyvalues = ['[ANC] ANCONA (Ανκόνα), Ιταλία (Λιμάνι)', '[VEN] VENICE (Βενετία), Ιταλία (Λιμάνι)', '[BAR] Μπάρι (Μπάρι), Ιταλία (Λιμάνι)'];
    var portturkeyvalues = ['[KUS] KUSADASI (Κουσάντασι), Τουρκία (Λιμάνι)', '[MAR] MARMARIS, Τουρκία (Λιμάνι)'];
    var arrayofports = [portattikhvalues, portkykladesvalues, portargosaronikosvalues, portkrhthvalues, portioniovalues, portsporadesvalues, portboreioaigaiovalues, porteuoiavalues, portpeloponnhsosvalues, portitalyvalues, portturkeyvalues];
    var allports = [];
    var xmlstring = "<xml><combination><departureport>[AMN] AG.MARINA(EVOIA), Ελλάδα (Λιμάνι)</departureport><arriveport>[LAV] Λαύριο (Αθήνα), Ελλάδα (Λιμάνι)</arriveport><arriveport>[ANA] ANAFI, Ελλάδα (Λιμάνι)</arriveport><arriveport>[MET] METHANA, Ελλάδα (Λιμάνι)</arriveport></combination></xml>"
    var xmltojson = $.xml2json(xmlstring, true);

    for (var i = 0; i < portallvalues.length; i++) {
        for (var p = 0; p < categorylettersenglish.length; p++) {
            if (portallvalues[i].charAt(1) == categorylettersenglish[p].toUpperCase()) {
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
    var portimage = $('<li><img class="responsive-img" src="../Content/Searchimages/ship.png" alt="shipimage" style=margin-bottom:5px></li>');
    var portlistbutton = $('<button type="button" class="btn-floating waves-effect waves-light green portlistbutton" title="Show on list"><i class="material-icons">list</i></button>');
    var portmapbutton = $('<button type="button" class="btn-floating waves-effect waves-light green portmapbutton" title="Show on map"><i class="material-icons">language</i></button>');
    portheader.append(portimage).append(areaofports).append(portlistbutton).append(portmapbutton);
    showports.append(categorytableportsarealist).append(portheader).append(portdiv);

    function categorizedarealistbuttons() {
        categorytableportsarealist.empty();
        categorytableportsarealist.append($('<tr>').append($('<td>').append(categoryportareabutton.clone(true).text('Όλα τα Λιμάνια'))))
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
                    categorytableportsarealist.find('tr:last').append($('<td style=border:0px>').append(categoryportareabutton.clone(true).text(categoryportareavalues[i])));
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
        portallvalueslatlng = currentportslatlng.slice();
    }

    function filteredports(object) {
        allports = allportsbackup.slice();
        portallvalueslatlng = portallvalueslatlngbackup.slice();
        var currentports = [];
        var currentportslatlng = [];
        var count = 0;
        if (object.parent().attr('id').search('depallroute') != -1) {
            var specificobject = object.parent().attr('id').split('depallroute');
            for (var j = 0; j < xmltojson.combination.length; j++) {
                for (var k = 0; k < xmltojson.combination[j].arriveport.length; k++) {
                    var arriveport = xmltojson.combination[j].arriveport[k].text;
                    for (var i = 0; i < allports.length; i++) {
                        if (allports[i][1] == $('[id=arrallroute' + specificobject[1] + ']').find('input').val() && allports[i][1] == arriveport) {
                            var departureport = xmltojson.combination[j].departureport[0].text;
                            for (var i = 0; i < allports.length; i++) {
                                if (allports[i][1] == departureport) {
                                    currentports[count] = allports[i];
                                    currentportslatlng[count] = portallvalueslatlng[i];
                                }
                            }
                            allports = currentports.slice();
                            portallvalueslatlng = currentportslatlng.slice();
                            currentcategorizedportslatlng = currentportslatlng.slice();
                        }
                    }
                }
                count++;
            }
        }
        else {
            var specificobject = object.parent().attr('id').split('arrallroute');
            for (var j = 0; j < xmltojson.combination.length; j++) {
                var departureport = xmltojson.combination[j].departureport[0].text;
                for (var i = 0; i < allports.length; i++) {
                    if (allports[i][1] == $('[id=depallroute' + specificobject[1] + ']').find('input').val() && allports[i][1] == departureport) {
                        for (var i = 0; i < allports.length; i++) {
                            for (var k = 0; k < xmltojson.combination[j].arriveport.length; k++) {
                                var arriveport = xmltojson.combination[j].arriveport[k].text;
                                if (allports[i][1] == arriveport) {
                                    currentports[count] = allports[i];
                                    currentportslatlng[count] = portallvalueslatlng[i];
                                    count++;
                                }
                            }
                        }
                        allports = currentports.slice();
                        portallvalueslatlng = currentportslatlng.slice();
                        currentcategorizedportslatlng = currentportslatlng.slice();
                    }
                }
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
                request.term = '[' + request.term;
                request.term = request.term.replace(/\[+/g, "[");
                var matcher = new RegExp("^" + $.ui.autocomplete.escapeRegex(request.term), "i");
                response($.grep(portallvalues, function (item) {
                    for (var i = 0; i < allports.length; i++) {
                        if (allports[i][1] == item) {
                            return matcher.test(item);
                        }
                    }
                }));
            },
            open: function (event, ui) {
                var firstelement = $(this).data("uiAutocomplete").menu.element[0].children[0], inpt = $(this), original = inpt.val(), firstelementtext = $(firstelement).text();
                if (firstelementtext.toUpperCase().indexOf(original.toUpperCase()) >= 0) {
                    inpt.val(firstelementtext);
                    var originallength = original.length;
                    if (original.length == 1 && original != '[') {
                        originallength = original.length + 1;
                    }
                    inpt[0].selectionStart = originallength;
                    inpt[0].selectionEnd = firstelementtext.length;
                    for (var i = 0; i < $($(this).data("uiAutocomplete").menu.element[0].children).length; i++)
                    {
                        var elementtext = $($(this).data("uiAutocomplete").menu.element[0].children[i]).text()
                        $($(this).data("uiAutocomplete").menu.element[0].children[i]).html('<span style=color:orange>' + elementtext.substring(0, originallength) + '</span>' + elementtext.substring(originallength, elementtext.length));
                    }
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
                    icon: new google.maps.MarkerImage("../Content/Searchimages/port-image.png")
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
        $parentselector = $(this).parent().parent();
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

    if (selectorinput.val() != '') {
        if (selectorinput.val() >= 0) {
            if (selectorinput.attr('name') === 'NumOfOlders') {
                numpassengersarray[4] = selectorinput.val();
            }
            else if (selectorinput.attr('name') === 'NumOfAdults') {
                numpassengersarray[0] = selectorinput.val();
            }
            else if (selectorinput.attr('name') === 'NumOfTeens') {
                numpassengersarray[1] = selectorinput.val();
            }
            else if (selectorinput.attr('name') === 'NumOfKids') {
                numpassengersarray[2] = selectorinput.val();
            }
            else if (selectorinput.attr('name') === 'NumOfInfants') {
                numpassengersarray[3] = selectorinput.val();
            }
        }
        else {
            selectorinput.val(0);
        }
    }
    stylepopovercontent(selector);
    var sumnumpassengers = 0;
    for (var i = 0; i < numpassengersarray.length; i++) {
        sumnumpassengers += parseInt(numpassengersarray[i]);
    }
    $('#numpassengers').val(sumnumpassengers);
}

function keepnumvehicles(selector) {
    selectorinput = selector.find('input');
    if (selectorinput.val() != '') {
        if (selectorinput.val() >= 0) {
            if (selectorinput.attr('name') === 'NumOfCars') {
                numvehiclesarray[0] = selectorinput.val();
            }
            else if (selectorinput.attr('name') === 'NumOfMotos') {
                numvehiclesarray[1] = selectorinput.val();
            }
            else if (selectorinput.attr('name') === 'NumOfTrailers') {
                numvehiclesarray[2] = selectorinput.val();
            }
            else if (selectorinput.attr('name') === 'NumOfMiniBuses') {
                numvehiclesarray[3] = selectorinput.val();
            }
        }
        else {
            selectorinput.val(0);
        }
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
        selector.find('.decrement').removeClass('lighten-3');
    }
    else {
        selector.find('.decrement').addClass('lighten-3');
    }
}

function addFerryStep(counter) {

    if (typeof counter == 'undefined') {
        return -1;
    }
    counter++;

    $("#actionbtnid").before(createNewFerrystep(counter));
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
    
    $('#multipletrip' + counter).remove();
    counter--;
    if (counter < 2) {
        $('#delFerryStepId').hide();
    } else {
        $('#delFerryStepId').show();
    }

    $('#addFerryStepId').show();

    return counter;
}

function createNewFerrystep(cnt) {

    var toAppend = '<div class="row" style="display:inline; float:left;" id="multipletrip' + cnt + '">' +
                              '<div class="col-md-5" id="depallroute' + cnt + '">' +
                              '<label for="MultDepList[' + cnt + '].FromPort" class="control-label" align="left">Από <a style="cursor:pointer">Επιλέξτε λιμάνι Αναχωρησης <span class="glyphicon glyphicon-arrow-right" aria-hidden="true"></span></a></label>' +
                              '<input class="form-control" type="text" name="MultDepList[' + cnt + '].FromPort"  placeholder = "Εισάγετε όνομα λιμανιού πόλης" data-val="true" required>' +
                              '</div>' +
                              '<div class="col-md-5" id="arrallroute' + cnt + '">' +
                              '<label for="MultDepList[' + cnt + '].ToPort" class="control-label" align="left">Πρός <a style="margin-top: 5px; "> <a style="cursor:pointer">Επιλέξτε λιμάνι προορισμού<span class="glyphicon glyphicon-arrow-right" aria-hidden="true"></span></a></label>' +
                              '<input class = "form-control" type = "text" name="MultDepList[' + cnt + '].ToPort"  placeholder = "Εισάγετε όνομα λιμανιού πόλης" data-val="true"  required>' +
                              '</div>' +
                              '<div class="col-md-2" id="depalldate' + cnt + '">' +
                              '<label for="MultDepList[' + cnt + '].DateFrom" class="control-label" align="left">Αναχώρηση</label>' +
                              '<input class = "form-control datepicker" type = "date" readonly="readonly" name="MultDepList[' + cnt + '].DateFrom"  placeholder = "Εισάγετε ημ/νια αναχώρησης" id = "departuredatemulti' + cnt + '" data-val="true" required>' +
                              '</div></div>';
    return toAppend;
}
