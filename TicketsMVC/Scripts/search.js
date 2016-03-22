$(document).ready(function () {
    $('select:not([multiple])').material_select();
    var numpassengersarray = [0, 1, 0, 0, 0];
    var numvehiclesarray = [0, 0, 0, 0];

    var departure = $('<div style=width:600px>');
    var departurewrapper = $('<div>').append(departure);
    var arrive = $('<div style=width:600px>');
    var arrivewrapper = $('<div>').append(arrive);
    var defaultmultipledirections = 3;
    var counter = defaultmultipledirections - 1;

    $('input[type=radio][name=Triptype][value=WithReturn]').attr("checked", true);

    $('body').on('change', 'input[type=radio][name=Triptype]', function () {
        alert("edw");
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
            $('#depalldate').attr('class', 'col-md-3');

            $('label[for=arrive]').hide();
            $('#arralldate').attr('class', 'col-md-0');
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
            $('#depalldate').attr('class', 'col-md-3');

            $('label[for=arrive]').show();
            $('input[id=arrivedate0]').show();
            $('#arralldate').attr('class', 'col-md-3');

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
            $('#depalldate').attr('class', 'col-md-0');
            $('label[for=arrive]').hide();
            $('#arralldate').attr('class', 'col-md-0');
            if ($('#fromto').find('addroute')) {
                $('#addroute').remove();
            }
            $('#fromto0').hide();
            var masterdiv = '<div id="ferrysteps"></div>';
            $("#dates").before(masterdiv);

            for (var j = 0; j < defaultmultipledirections; j++) {
                $("#ferrysteps").append(createNewFerrystep(j));
            }

            counter = j - 1;

            var btnappend = '<div class="row" id="actionbtnid">' +
                            '<div class="col-md-6">' +
                            '<button type="button" class="btn btn-link btn-secondary btn-sm glyphicon glyphicon-remove" style="float: left" id="delFerryStepId"><a onclick="delFerryStep();">Αφαίρεση διαδρομής</a></button>' +
                            '</div>' +
                            '<div class="col-md-5">' +
                            '<button type="button" class="btn btn-link btn-secondary btn-sm glyphicon glyphicon-plus" style="float: right" id="addFerryStepId"><a onclick="addFerryStep();">Προσθήκη διαδρομής</a></button>' +
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

    var popovershownobject = '';
    $('body').on('click', '[id*=departuredate],[id*=arrivedate]', function () {
        if (popovershownobject != '' && popovershownobject != $(this).attr('id')) {
            $('[id=' + popovershownobject + ']').popover('hide');
        }
        var specificobject = $(this).attr('id');
        popovershownobject = specificobject;
        $('[id=' + specificobject + ']').popover({
            html: true,
            trigger: 'manual',
            content: function () {
                if (specificobject.search('departuredate') != -1) {
                    departure.calendarPicker({ showmonthnames: true, years: 1, months: 6, applybutton: false }, $('[id=' + specificobject + ']'));
                    return departurewrapper.html();
                }
                else {
                    var specificdepartureobject = specificobject.split('arrivedate');
                    specificdepartureobject = 'departuredate' + specificdepartureobject[1];
                    arrive.calendarPicker({ showmonthnames: true, years: 1, months: 6, applybutton: false, startdate: $('[id=' + specificdepartureobject + ']').val() }, $('[id=' + specificobject + ']'));
                    return arrivewrapper.html();
                }
            }
        });
        $('[id=' + specificobject + ']').popover('show');
    });

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

    var categoryportareavalues = ['Όλα τα Λιμάνια', 'Αττική', 'Κυκλάδες', 'Αργοσαρωνικός', 'Κρήτη', 'Ιόνιο', 'Σποράδες', 'Βόρειο Αιγαίο', 'Εύβοια', 'Πελοπόννησος', 'Italy', 'Turkey'];
    var portvalues=['[AMN] AG.MARINA(EVOIA), Ελλάδα (Λιμάνι)','[ROU] AG.ROUMELI, Ελλάδα (Λιμάνι)','[AGA] AGATHONISI, Ελλάδα (Λιμάνι)','[AXL] ALEX/POLI, Ελλάδα (Λιμάνι)','[ALI] ALICUDI, Ιταλία (Λιμάνι)','[AMA] AMALFI, Ιταλία (Λιμάνι)','[ANA] ANAFI, Ελλάδα (Λιμάνι)','[ANC] ANCONA (Ανκόνα), Ιταλία (Λιμάνι)','[AKT] ANTIKYTHIRA, Ελλάδα (Λιμάνι)','[ARK] ARKYI, Ελλάδα (Λιμάνι)','[PRJ] CAPRI, Ιταλία (Λιμάνι)','[CAS] CASAMICCIOLA, Ιταλία (Λιμάνι)','[CAM] CASTELAMMARE, Ιταλία (Λιμάνι)','[CHL] CHALKI, Ελλάδα (Λιμάνι)','[CHR] CHRISOMHLEA(FOURNOI), Ελλάδα (Λιμάνι)','[CIV] CIVITAVECCHIA, Ιταλία (Λιμάνι)','[DAT] DATCA, Τουρκία (Λιμάνι)','[DFN] DIAFANI, Ελλάδα (Λιμάνι)','[FAV] FAVIGNANA, Ιταλία (Λιμάνι)','[FPO] FILICUDI PORTO, Ιταλία (Λιμάνι)','[FRD] FORIO, Ιταλία (Λιμάνι)','[FOM] FORMIA, Ιταλία (Λιμάνι)','[GVD] GAVDOS, Ελλάδα (Λιμάνι)','[GOS] GINOSTRA, Ιταλία (Λιμάνι)','[GYT] GYTHIO, Ελλάδα (Λιμάνι)','[INO] INOUSSES, Ελλάδα (Λιμάνι)','[ISH] ISCHIA, Ιταλία (Λιμάνι)','[VAT] ITHAKI(VATHI), Ελλάδα (Λιμάνι)','[KLX] KALAMATA, Ελλάδα (Λιμάνι)','[KRM] KARDAMENA, Ελλάδα (Λιμάνι)','[KAV] KAVALA, Ελλάδα (Λιμάνι)','[KER] KERAMOTI (Θάσος), Ελλάδα (Λιμάνι)','[KIS] KISSAMOS, Ελλάδα (Λιμάνι)','[KUS] KUSADASI (Κουσάντασι), Τουρκία (Λιμάνι)','[KTH] KYTHIRA, Ελλάδα (Λιμάνι)','[LAE] LACCO, Ιταλία (Λιμάνι)','[LMP] LAMPEDUSA, Ιταλία (Λιμάνι)','[LVZ] LEVANZO, Ιταλία (Λιμάνι)','[LIU] LINOSA, Ιταλία (Λιμάνι)','[LAP] LIPARI, Ιταλία (Λιμάνι)','[LIV] LIVORNO, Ιταλία (Λιμάνι)','[LTR] LOUTRO CHANION (Κρήτη), Ελλάδα (Λιμάνι)','[MTI] MANTOUDI, Ελλάδα (Λιμάνι)','[MMO] MARETTIMO, Ιταλία (Λιμάνι)','[MRM] MARMARI, Ελλάδα (Λιμάνι)','[MAR] MARMARIS, Τουρκία (Λιμάνι)','[MAS] MASTIHARI, Ελλάδα (Λιμάνι)','[MET] METHANA, Ελλάδα (Λιμάνι)','[MLZ] MILAZZO, Ιταλία (Λιμάνι)','[MJT] MYTILENE AIRPORT, Ελλάδα (Λιμάνι)','[NAP] NAPOLI, Ιταλία (Λιμάνι)','[BEV] NAPOLI(BEVERELLO), Ιταλία (Λιμάνι)','[MER] NAPOLI(MERGELLINA), Ιταλία (Λιμάνι)','[NPM] NEA PERAMOS, Ελλάδα (Λιμάνι)','[NST] NEA STIRA, Ελλάδα (Λιμάνι)','[NEA] NEAPOLIS, Ελλάδα (Λιμάνι)','[PSF] PALEOHORA, Ελλάδα (Λιμάνι)','[PLE] PALERMO, Ιταλία (Λιμάνι)','[PNA] PANAREA, Ιταλία (Λιμάνι)','[PNL] PANTELLERIA, Ιταλία (Λιμάνι)','[PAX] PAXI, Ελλάδα (Λιμάνι)','[PON] PONZA, Ιταλία (Λιμάνι)','[POR] POROS, Ελλάδα (Λιμάνι)','[PEM] PORTO EMPEDOCLE, Ιταλία (Λιμάνι)','[PTO] PORTO TORRES, Ιταλία (Λιμάνι)','[POS] POSITANO, Ιταλία (Λιμάνι)','[PRI] PRINOS, Ελλάδα (Λιμάνι)','[PRO] PROCIDA, Ιταλία (Λιμάνι)','[RNO] RETHIMNO (Κρήτη), Ελλάδα (Λιμάνι)','[RIN] RINELLA, Ιταλία (Λιμάνι)','[SAL] SALERNO, Ιταλία (Λιμάνι)','[SLA] SALINA, Ιταλία (Λιμάνι)','[SAM] SAMOTHRAKI, Ελλάδα (Λιμάνι)','[SAG] SAN ANGELO, Ιταλία (Λιμάνι)','[SVN] SAVONA, Ιταλία (Λιμάνι)','[CSF] SFAKIA (Κρήτη), Ελλάδα (Λιμάνι)','[JSH] SITIA (Κρήτη), Ελλάδα (Λιμάνι)','[RRO] SORRENTO, Ιταλία (Λιμάνι)','[SOG] SOUGIA, Ελλάδα (Λιμάνι)','[STR] STROMBOLI, Ιταλία (Λιμάνι)','[SYM] SYMI, Ελλάδα (Λιμάνι)','[TMI] TERMOLI, Ιταλία (Λιμάνι)','[TRC] TERRACINA, Ιταλία (Λιμάνι)','[THA] THASSOS, Ελλάδα (Λιμάνι)','[THY] THIMAINA(FOURNOI), Ελλάδα (Λιμάνι)','[TPS] TRAPANI, Ιταλία (Λιμάνι)','[TMT] TREMITI, Ιταλία (Λιμάνι)','[TRE] TRIESTE, Ιταλία (Λιμάνι)','[UST] USTICA, Ιταλία (Λιμάνι)','[VEN] VENICE (Βενετία), Ιταλία (Λιμάνι)','[VNT] VENTOTENE, Ιταλία (Λιμάνι)','[VUL] VULCANO, Ιταλία (Λιμάνι)','[AES] Αγ. Ευστράτιος, Ελλάδα (Λιμάνι)','[AGK] Αγ. Κήρυκος (Ικαρία), Ελλάδα (Λιμάνι)','[AGC] Αγ. Κωνσταντίνος, Ελλάδα (Λιμάνι)','[AGS] Αγκίστρι, Ελλάδα (Λιμάνι)','[AGG] Αγκίστρι-Μύλι, Ελλάδα (Λιμάνι)','Αθήνα, Ελλάδα (Όλα τα λιμάνια)','[AIG] Αιγιάλη (Αμοργός), Ελλάδα (Λιμάνι)','[AEG] Αίγινα (Αίγινα), Ελλάδα (Λιμάνι)','[ALO] Αλόννησος, Ελλάδα (Λιμάνι)','Αμοργός, Ελλάδα (Όλα τα λιμάνια)','[AND] Άνδρος, Ελλάδα (Λιμάνι)','[JTY] Αστυπάλαια, Ελλάδα (Λιμάνι)','[BTH] Βαθύ (Σάμος), Ελλάδα (Λιμάνι)','[VOL] Βόλος, Ελλάδα (Λιμάνι)','[GLO] Γλώσσα, Ελλάδα (Λιμάνι)','[DON] Δοννούσα, Ελλάδα (Λιμάνι)','[ERM] Ερμιόνη, Ελλάδα (Λιμάνι)','[EYD] Εύδηλος (Ικαρία), Ελλάδα (Λιμάνι)','[ZTH] Ζάκυνθος, Ελλάδα (Λιμάνι)','[IGO] Ηγουμενίτσα, Ελλάδα (Λιμάνι)','[IRK] Ηρακλειά, Ελλάδα (Λιμάνι)','[HER] Ηράκλειο (Κρήτη), Ελλάδα (Λιμάνι)','[SKG] Θεσσαλονίκη, Ελλάδα (Λιμάνι)','[JTR] Θήρα (Σαντορίνη), Ελλάδα (Λιμάνι)','[TRS] Θηρασσιά (Σαντορίνη), Ελλάδα (Λιμάνι)','[ITH] Ιθάκη, Ελλάδα (Λιμάνι)','Ικαρία, Ελλάδα (Όλα τα λιμάνια)','[IOS] Ιος, Ελλάδα (Λιμάνι)','[KAL] Κάλυμνος, Ελλάδα (Λιμάνι)','[KAR] Καρλόβασι (Σάμος), Ελλάδα (Λιμάνι)','[AOK] Κάρπαθος (Κάρπαθος), Ελλάδα (Λιμάνι)','[KSJ] Κάσος, Ελλάδα (Λιμάνι)','[KAZ] Καστελόριζο, Ελλάδα (Λιμάνι)','[AMO] Κατάπολα (Αμοργός), Ελλάδα (Λιμάνι)','[KEA] Κέα, Ελλάδα (Λιμάνι)','[CFU] Κέρκυρα (Κέρκυρα), Ελλάδα (Λιμάνι)','Κεφαλονιά, Ελλάδα (Όλα τα λιμάνια)','[KMS] Κίμωλος, Ελλάδα (Λιμάνι)','[KOU] Κουφονήσι, Ελλάδα (Λιμάνι)','Κρήτη, Ελλάδα (Όλα τα λιμάνια)','[KYT] Κύθνος, Ελλάδα (Λιμάνι)','[KIL] Κυλλήνη, Ελλάδα (Λιμάνι)','[KGS] Κως, Ελλάδα (Λιμάνι)','[LAV] Λαύριο (Αθήνα), Ελλάδα (Λιμάνι)','[LIP] Λειψοί, Ελλάδα (Λιμάνι)','[LER] Λέρος (Λέρος), Ελλάδα (Λιμάνι)','[LES] Λέσβος (Λέσβος), Ελλάδα (Λιμάνι)','[LMN] Λήμνος (Λήμνος), Ελλάδα (Λιμάνι)','[MLO] Μήλος, Ελλάδα (Λιμάνι)','[BAR] Μπάρι (Μπάρι), Ιταλία (Λιμάνι)','[JMK] Μύκονος, Ελλάδα (Λιμάνι)','[JNX] Νάξος, Ελλάδα (Λιμάνι)','[NIS] Νίσυρος, Ελλάδα (Λιμάνι)','[PAN] Πανορμίτης, Ελλάδα (Λιμάνι)','[PAS] Πάρος, Ελλάδα (Λιμάνι)','[PMS] Πάτμος, Ελλάδα (Λιμάνι)','[GRA] Πάτρα, Ελλάδα (Λιμάνι)','[PIR] Πειραιάς (Αθήνα), Ελλάδα (Λιμάνι)','[PSA] Πισαετός (Ιθάκη), Ελλάδα (Λιμάνι)','[KEF] Πόρος (Κεφαλονιά), Ελλάδα (Λιμάνι)','[PHE] Πόρτο Χέλι, Ελλάδα (Λιμάνι)','[PYT] Πυθαγόρειο, Ελλάδα (Λιμάνι)','[RAF] Ραφήνα (Αθήνα), Ελλάδα (Λιμάνι)','[RHO] Ρόδος, Ελλάδα (Λιμάνι)','[SMI] Σάμη (Κεφαλονιά), Ελλάδα (Λιμάνι)','Σάμος, Ελλάδα (Όλα τα λιμάνια)','Σαντορίνη, Ελλάδα (Όλα τα λιμάνια)','[SER] Σέριφος, Ελλάδα (Λιμάνι)','[SIK] Σίκινος, Ελλάδα (Λιμάνι)','[SIF] Σίφνος, Ελλάδα (Λιμάνι)','[JSI] Σκιάθος, Ελλάδα (Λιμάνι)','[SKO] Σκόπελος (Σκόπελος), Ελλάδα (Λιμάνι)','[SPE] Σπέτσες, Ελλάδα (Λιμάνι)','[JSY] Σύρος, Ελλάδα (Λιμάνι)','[SXI] Σχοινούσσα, Ελλάδα (Λιμάνι)','[THL] Τήλος, Ελλάδα (Λιμάνι)','[TIN] Τήνος, Ελλάδα (Λιμάνι)','[HYD] Ύδρα, Ελλάδα (Λιμάνι)','[FOL] Φολέγανδρος, Ελλάδα (Λιμάνι)','[FOU] Φούρνοι, Ελλάδα (Λιμάνι)','[CHA] Χανιά (Κρήτη), Ελλάδα (Λιμάνι)','[CHI] Χίος, Ελλάδα (Λιμάνι)','[PHA] Ψαρά, Ελλάδα (Λιμάνι)'];
    var showports = $('<div>');
    var categoryportareabutton = $('<a class="btn waves-effect waves-light blue categoryportareabutton" style=width:100%>');
    var categorytableportsarealist = $('<table class="table table-condensed">');
    for (var i = 0; i < 12; i++) {
        if (i == 6 || i==0)
        {
            categorytableportsarealist.append($('<tr>'));
        }
        categorytableportsarealist.find('tr:last').append($('<td>').append(categoryportareabutton.clone(true).text(categoryportareavalues[i])));
    }

    var portlist = $('<table class="table table-condensed">');
    for (var i = 0; i < portvalues.length; i++)
    {
        if(i%2==0)
        {
            portlist.append($('<tr>'));
        }
        portlist.find('tr:last').append($('<td class=portname>').append(portvalues[i]));
    }

    var areaofports;
    $('body').on('click', '.categoryportareabutton', function () {
        areaofports.text($(this).text());

    });

    $('body').on('click', '[id*=depallroute]>input,[id*=arrallroute]>input', function () {
        $(this).autocomplete({
            autoFocus: true,
            source: portvalues,
            open: function (event, ui) {
                var firstelement = $(this).data("uiAutocomplete").menu.element[0].children[0], inpt = $(this), original = inpt.val(), firstelementtext = $(firstelement).text();
                if (firstelementtext.toUpperCase().indexOf(original.toUpperCase()) >= 0) {
                    inpt.val(firstelementtext);
                    inpt[0].selectionStart = original.length + 1;
                    inpt[0].selectionEnd = firstelementtext.length;
                }
            }
        });
    });

    var selectorfancybox;
    $('body').on('click', '.portname', function () {
        selectorfancybox.find('input').val($(this).text());
        $.fancybox.close();
    });

    $('label[for^=FromPort],label[for^=ToPort]').fancybox({
        autoSize: true,
        autoScale: false,
        transitionIn: 'none',
        transitionOut: 'none',
        content: showports,
        beforeLoad: function () {
            selectorfancybox = $(this.element).parent();
            showports.empty();
            var portheader = $('<ul class=list-inline style="border-bottom:5px solid #FA0">');
            var portimage = $('<li><img src="../Content/Searchimages/ship.png" alt="shipimage" style=margin-bottom:5px></li>');
            areaofports = $('<li style=color:#1668b1;font-size:large;font-weight:bolder>' + categoryportareavalues[0] + '</li>');
            portheader.append(portimage).append(areaofports);
            if (selectorfancybox.attr('id').search('depallroute') != -1) {
                var $arrid = selectorfancybox.attr('id').split('depallroute');
                var $arriveportvalue = $('[id=arrallroute' + $arrid[1] + ']').find('input').val();
                if ($arriveportvalue != '') {

                }
                else {
                    showports.append(categorytableportsarealist).append(portheader).append(portlist);
                }
            }
            else {
                $depid = selectorfancybox.attr('id').split('arrallroute');
                $departureportvalue = $('[id=depallroute' + $depid[1] + ']').find('input').val();
                if ($departureportvalue != '') {

                }
                else {
                    showports.append(categorytableportsarealist).append(portheader).append(portlist);
                }
            }
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

    function keepnumpassengers(selector) {
        selectorinput = selector.find('input');
        if (selectorinput.val() != '') {
            if (selectorinput.val() >= 0) {
                if (selectorinput.attr('name') === 'NumOfOlders') {
                    numpassengersarray[0] = selectorinput.val();
                }
                else if (selectorinput.attr('name') === 'NumOfAdults') {
                    numpassengersarray[1] = selectorinput.val();
                }
                else if (selectorinput.attr('name') === 'NumOfTeens') {
                    numpassengersarray[2] = selectorinput.val();
                }
                else if (selectorinput.attr('name') === 'NumOfKids') {
                    numpassengersarray[3] = selectorinput.val();
                }
                else if (selectorinput.attr('name') === 'NumOfInfants') {
                    numpassengersarray[4] = selectorinput.val();
                }
            }
            else
            {
                selectorinput.val(0);
            }
        }
        stylepopovercontent(selector);
        var sumnumpassengers = 0;
        for(var i =0;i<numpassengersarray.length;i++)
        {
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

    function startpassengerpopover()
    {
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

    function stylepopovercontent(selector)
    {
        if (selector.find('input').val() > 0) {
            selector.find('.decrement').removeClass('lighten-3');
        }
        else {
            selector.find('.decrement').addClass('lighten-3');
        }
    }
});


function addFerryStep(counter) {

    if (typeof counter == 'undefined') {
        return -1;
    }
    counter++;

    $("#actionbtnid").before(createNewFerrystep(counter));

    if (counter >= 4) {
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
    
    if (counter < 3) {
        $('#delFerryStepId').hide();
    } else {
        $('#delFerryStepId').show();
    }

    $('#addFerryStepId').show();

    return counter;
}

function createNewFerrystep(cnt) {

    var toAppend = '<div class="row" id="multipletrip' + cnt + '">' +
                              '<div class="col-md-4" id="depallroute' + cnt + '">' +
                              '<label for="MultDepList[' + cnt + '].FromPort" class="control-label" align="left">Από <a style="margin-top: 5px; ">Επιλέξτε λιμάνι<span class="glyphicon glyphicon-arrow-right" aria-hidden="true"></span></a></label>' +
                              '<input type="text" class="form-control" name="MultDepList[' + cnt + '].FromPort"  placeholder = "Εισάγετε όνομα λιμανιού πόλης" data-val="true" required>' +
                              '<span data-valmsg-replace="true" data-valmsg-for="MultDepList[' + cnt + '].FromPort" class="field-validation-valid text-danger"></span>' +
                              '</div>' +
                              '<div class="col-md-4" id="arrllroute' + cnt + '">' +
                              '<label for="MultDepList[' + cnt + '].ToPort" class="control-label" align="left">Πρός <a style="margin-top: 5px; ">Επιλέξτε λιμάνι<span class="glyphicon glyphicon-arrow-left" aria-hidden="true"></span></a></label>' +
                              '<input type="text" class="form-control" name="MultDepList[' + cnt + '].ToPort"  placeholder = "Εισάγετε όνομα λιμανιού πόλης" data-val="true"  required>' +
                              '<span data-valmsg-replace="true" data-valmsg-for="MultDepList[' + cnt + '].ToPort" class="field-validation-valid text-danger"></span>' +
                              '</div>' +
                              '<div class="col-md-3" id="depalldate' + cnt + '">' +
                              '<label for="MultDepList[' + cnt + '].DateFrom" class="control-label" align="left">Αναχώρηση</label>' +
                              '<input type="text" class="form-control" name="MultDepList[' + cnt + '].DateFrom"  placeholder = "Εισάγετε ημ/νια αναχώρησης" data_toggle = "popover" data_placement = "bottom" id = "departuredatemulti' + cnt + '" data-val="true" required>' +
                              '<span data-valmsg-replace="true" data-valmsg-for="MultDepList[' + cnt + '].ToPort" class="field-validation-valid text-danger"></span>' +
                              '</div></div>';
    return toAppend;

}
