$(document).ready(function () {
    var numpassengersarray = [0, 1, 0, 0, 0];
    var numvehiclesarray = [0, 0, 0, 0];

    var departure = $('<div style=width:600px>');
    var departurewrapper = $('<div>').append(departure);
    var arrive = $('<div style=width:600px>');
    var arrivewrapper = $('<div>').append(arrive);
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

            counter = j-1;

            var btnappend = '<div class="row" id="actionbtnid">' +
                            '<div class="col-md-6">' +
                            '<button type="button" class="btn waves-effect waves-light #81d4fa light-blue glyphicon glyphicon-remove" style="float:left" id="delFerryStepId" onclick="delFerryStep()">Αφαίρεση διαδρομής</button>' +
                            '</div>' +
                            '<div class="col-md-5">' +
                            '<button type="button" class="btn waves-effect waves-light #81d4fa light-blue glyphicon glyphicon-plus" style="float:right" id="addFerryStepId" onclick="addFerryStep()">Προσθήκη διαδρομής</button>' +
                            '</div></div>';

            $("#ferrysteps").append(btnappend);
            $('#delFerryStepId').hide();

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

    $('body').on('click', '[id*=departuredate],[id*=arrivedate]', function () {
        var specificobject = $(this).attr('id');
        if (specificobject.search('departuredate') != -1)
        {
            var dspecificdeparturedateobject = specificobject.split('departuredate');
            $('[id=arrivedate' + dspecificdeparturedateobject[1] + ']').val('');
            var startdate = new Date();
        }
        else
        {
            var dspecificarrivedateobject = specificobject.split('arrivedate');
            var startdate = $('[id=departuredate' + dspecificarrivedateobject[1] + ']').val();
            if(startdate=='')
            {
                startdate = new Date();
            }
        }
        $(this).pickadate({
            selectMonths: true,
            min: startdate,
            selectYears: 1
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
    var portallvalues=['[AMN] AG.MARINA(EVOIA), Ελλάδα (Λιμάνι)','[ROU] AG.ROUMELI, Ελλάδα (Λιμάνι)','[AGA] AGATHONISI, Ελλάδα (Λιμάνι)','[AXL] ALEX/POLI, Ελλάδα (Λιμάνι)','[ALI] ALICUDI, Ιταλία (Λιμάνι)','[AMA] AMALFI, Ιταλία (Λιμάνι)','[ANA] ANAFI, Ελλάδα (Λιμάνι)','[ANC] ANCONA (Ανκόνα), Ιταλία (Λιμάνι)','[AKT] ANTIKYTHIRA, Ελλάδα (Λιμάνι)','[ARK] ARKYI, Ελλάδα (Λιμάνι)','[PRJ] CAPRI, Ιταλία (Λιμάνι)','[CAS] CASAMICCIOLA, Ιταλία (Λιμάνι)','[CAM] CASTELAMMARE, Ιταλία (Λιμάνι)','[CHL] CHALKI, Ελλάδα (Λιμάνι)','[CHR] CHRISOMHLEA(FOURNOI), Ελλάδα (Λιμάνι)','[CIV] CIVITAVECCHIA, Ιταλία (Λιμάνι)','[DAT] DATCA, Τουρκία (Λιμάνι)','[DFN] DIAFANI, Ελλάδα (Λιμάνι)','[FAV] FAVIGNANA, Ιταλία (Λιμάνι)','[FPO] FILICUDI PORTO, Ιταλία (Λιμάνι)','[FRD] FORIO, Ιταλία (Λιμάνι)','[FOM] FORMIA, Ιταλία (Λιμάνι)','[GVD] GAVDOS, Ελλάδα (Λιμάνι)','[GOS] GINOSTRA, Ιταλία (Λιμάνι)','[GYT] GYTHIO, Ελλάδα (Λιμάνι)','[INO] INOUSSES, Ελλάδα (Λιμάνι)','[ISH] ISCHIA, Ιταλία (Λιμάνι)','[VAT] ITHAKI(VATHI), Ελλάδα (Λιμάνι)','[KLX] KALAMATA, Ελλάδα (Λιμάνι)','[KRM] KARDAMENA, Ελλάδα (Λιμάνι)','[KAV] KAVALA, Ελλάδα (Λιμάνι)','[KER] KERAMOTI (Θάσος), Ελλάδα (Λιμάνι)','[KIS] KISSAMOS, Ελλάδα (Λιμάνι)','[KUS] KUSADASI (Κουσάντασι), Τουρκία (Λιμάνι)','[KTH] KYTHIRA, Ελλάδα (Λιμάνι)','[LAE] LACCO, Ιταλία (Λιμάνι)','[LMP] LAMPEDUSA, Ιταλία (Λιμάνι)','[LVZ] LEVANZO, Ιταλία (Λιμάνι)','[LIU] LINOSA, Ιταλία (Λιμάνι)','[LAP] LIPARI, Ιταλία (Λιμάνι)','[LIV] LIVORNO, Ιταλία (Λιμάνι)','[LTR] LOUTRO CHANION (Κρήτη), Ελλάδα (Λιμάνι)','[MTI] MANTOUDI, Ελλάδα (Λιμάνι)','[MMO] MARETTIMO, Ιταλία (Λιμάνι)','[MRM] MARMARI, Ελλάδα (Λιμάνι)','[MAR] MARMARIS, Τουρκία (Λιμάνι)','[MAS] MASTIHARI, Ελλάδα (Λιμάνι)','[MET] METHANA, Ελλάδα (Λιμάνι)','[MLZ] MILAZZO, Ιταλία (Λιμάνι)','[MJT] MYTILENE AIRPORT, Ελλάδα (Λιμάνι)','[NAP] NAPOLI, Ιταλία (Λιμάνι)','[BEV] NAPOLI(BEVERELLO), Ιταλία (Λιμάνι)','[MER] NAPOLI(MERGELLINA), Ιταλία (Λιμάνι)','[NPM] NEA PERAMOS, Ελλάδα (Λιμάνι)','[NST] NEA STIRA, Ελλάδα (Λιμάνι)','[NEA] NEAPOLIS, Ελλάδα (Λιμάνι)','[PSF] PALEOHORA, Ελλάδα (Λιμάνι)','[PLE] PALERMO, Ιταλία (Λιμάνι)','[PNA] PANAREA, Ιταλία (Λιμάνι)','[PNL] PANTELLERIA, Ιταλία (Λιμάνι)','[PAX] PAXI, Ελλάδα (Λιμάνι)','[PON] PONZA, Ιταλία (Λιμάνι)','[POR] POROS, Ελλάδα (Λιμάνι)','[PEM] PORTO EMPEDOCLE, Ιταλία (Λιμάνι)','[PTO] PORTO TORRES, Ιταλία (Λιμάνι)','[POS] POSITANO, Ιταλία (Λιμάνι)','[PRI] PRINOS, Ελλάδα (Λιμάνι)','[PRO] PROCIDA, Ιταλία (Λιμάνι)','[RNO] RETHIMNO (Κρήτη), Ελλάδα (Λιμάνι)','[RIN] RINELLA, Ιταλία (Λιμάνι)','[SAL] SALERNO, Ιταλία (Λιμάνι)','[SLA] SALINA, Ιταλία (Λιμάνι)','[SAM] SAMOTHRAKI, Ελλάδα (Λιμάνι)','[SAG] SAN ANGELO, Ιταλία (Λιμάνι)','[SVN] SAVONA, Ιταλία (Λιμάνι)','[CSF] SFAKIA (Κρήτη), Ελλάδα (Λιμάνι)','[JSH] SITIA (Κρήτη), Ελλάδα (Λιμάνι)','[RRO] SORRENTO, Ιταλία (Λιμάνι)','[SOG] SOUGIA, Ελλάδα (Λιμάνι)','[STR] STROMBOLI, Ιταλία (Λιμάνι)','[SYM] SYMI, Ελλάδα (Λιμάνι)','[TMI] TERMOLI, Ιταλία (Λιμάνι)','[TRC] TERRACINA, Ιταλία (Λιμάνι)','[THA] THASSOS, Ελλάδα (Λιμάνι)','[THY] THIMAINA(FOURNOI), Ελλάδα (Λιμάνι)','[TPS] TRAPANI, Ιταλία (Λιμάνι)','[TMT] TREMITI, Ιταλία (Λιμάνι)','[TRE] TRIESTE, Ιταλία (Λιμάνι)','[UST] USTICA, Ιταλία (Λιμάνι)','[VEN] VENICE (Βενετία), Ιταλία (Λιμάνι)','[VNT] VENTOTENE, Ιταλία (Λιμάνι)','[VUL] VULCANO, Ιταλία (Λιμάνι)','[AES] Αγ. Ευστράτιος, Ελλάδα (Λιμάνι)','[AGK] Αγ. Κήρυκος (Ικαρία), Ελλάδα (Λιμάνι)','[AGC] Αγ. Κωνσταντίνος, Ελλάδα (Λιμάνι)','[AGS] Αγκίστρι, Ελλάδα (Λιμάνι)','[AGG] Αγκίστρι-Μύλι, Ελλάδα (Λιμάνι)','Αθήνα, Ελλάδα (Όλα τα λιμάνια)','[AIG] Αιγιάλη (Αμοργός), Ελλάδα (Λιμάνι)','[AEG] Αίγινα (Αίγινα), Ελλάδα (Λιμάνι)','[ALO] Αλόννησος, Ελλάδα (Λιμάνι)','Αμοργός, Ελλάδα (Όλα τα λιμάνια)','[AND] Άνδρος, Ελλάδα (Λιμάνι)','[JTY] Αστυπάλαια, Ελλάδα (Λιμάνι)','[BTH] Βαθύ (Σάμος), Ελλάδα (Λιμάνι)','[VOL] Βόλος, Ελλάδα (Λιμάνι)','[GLO] Γλώσσα, Ελλάδα (Λιμάνι)','[DON] Δοννούσα, Ελλάδα (Λιμάνι)','[ERM] Ερμιόνη, Ελλάδα (Λιμάνι)','[EYD] Εύδηλος (Ικαρία), Ελλάδα (Λιμάνι)','[ZTH] Ζάκυνθος, Ελλάδα (Λιμάνι)','[IGO] Ηγουμενίτσα, Ελλάδα (Λιμάνι)','[IRK] Ηρακλειά, Ελλάδα (Λιμάνι)','[HER] Ηράκλειο (Κρήτη), Ελλάδα (Λιμάνι)','[SKG] Θεσσαλονίκη, Ελλάδα (Λιμάνι)','[JTR] Θήρα (Σαντορίνη), Ελλάδα (Λιμάνι)','[TRS] Θηρασσιά (Σαντορίνη), Ελλάδα (Λιμάνι)','[ITH] Ιθάκη, Ελλάδα (Λιμάνι)','Ικαρία, Ελλάδα (Όλα τα λιμάνια)','[IOS] Ιος, Ελλάδα (Λιμάνι)','[KAL] Κάλυμνος, Ελλάδα (Λιμάνι)','[KAR] Καρλόβασι (Σάμος), Ελλάδα (Λιμάνι)','[AOK] Κάρπαθος (Κάρπαθος), Ελλάδα (Λιμάνι)','[KSJ] Κάσος, Ελλάδα (Λιμάνι)','[KAZ] Καστελόριζο, Ελλάδα (Λιμάνι)','[AMO] Κατάπολα (Αμοργός), Ελλάδα (Λιμάνι)','[KEA] Κέα, Ελλάδα (Λιμάνι)','[CFU] Κέρκυρα (Κέρκυρα), Ελλάδα (Λιμάνι)','Κεφαλονιά, Ελλάδα (Όλα τα λιμάνια)','[KMS] Κίμωλος, Ελλάδα (Λιμάνι)','[KOU] Κουφονήσι, Ελλάδα (Λιμάνι)','Κρήτη, Ελλάδα (Όλα τα λιμάνια)','[KYT] Κύθνος, Ελλάδα (Λιμάνι)','[KIL] Κυλλήνη, Ελλάδα (Λιμάνι)','[KGS] Κως, Ελλάδα (Λιμάνι)','[LAV] Λαύριο (Αθήνα), Ελλάδα (Λιμάνι)','[LIP] Λειψοί, Ελλάδα (Λιμάνι)','[LER] Λέρος (Λέρος), Ελλάδα (Λιμάνι)','[LES] Λέσβος (Λέσβος), Ελλάδα (Λιμάνι)','[LMN] Λήμνος (Λήμνος), Ελλάδα (Λιμάνι)','[MLO] Μήλος, Ελλάδα (Λιμάνι)','[BAR] Μπάρι (Μπάρι), Ιταλία (Λιμάνι)','[JMK] Μύκονος, Ελλάδα (Λιμάνι)','[JNX] Νάξος, Ελλάδα (Λιμάνι)','[NIS] Νίσυρος, Ελλάδα (Λιμάνι)','[PAN] Πανορμίτης, Ελλάδα (Λιμάνι)','[PAS] Πάρος, Ελλάδα (Λιμάνι)','[PMS] Πάτμος, Ελλάδα (Λιμάνι)','[GRA] Πάτρα, Ελλάδα (Λιμάνι)','[PIR] Πειραιάς (Αθήνα), Ελλάδα (Λιμάνι)','[PSA] Πισαετός (Ιθάκη), Ελλάδα (Λιμάνι)','[KEF] Πόρος (Κεφαλονιά), Ελλάδα (Λιμάνι)','[PHE] Πόρτο Χέλι, Ελλάδα (Λιμάνι)','[PYT] Πυθαγόρειο, Ελλάδα (Λιμάνι)','[RAF] Ραφήνα (Αθήνα), Ελλάδα (Λιμάνι)','[RHO] Ρόδος, Ελλάδα (Λιμάνι)','[SMI] Σάμη (Κεφαλονιά), Ελλάδα (Λιμάνι)','Σάμος, Ελλάδα (Όλα τα λιμάνια)','Σαντορίνη, Ελλάδα (Όλα τα λιμάνια)','[SER] Σέριφος, Ελλάδα (Λιμάνι)','[SIK] Σίκινος, Ελλάδα (Λιμάνι)','[SIF] Σίφνος, Ελλάδα (Λιμάνι)','[JSI] Σκιάθος, Ελλάδα (Λιμάνι)','[SKO] Σκόπελος (Σκόπελος), Ελλάδα (Λιμάνι)','[SPE] Σπέτσες, Ελλάδα (Λιμάνι)','[JSY] Σύρος, Ελλάδα (Λιμάνι)','[SXI] Σχοινούσσα, Ελλάδα (Λιμάνι)','[THL] Τήλος, Ελλάδα (Λιμάνι)','[TIN] Τήνος, Ελλάδα (Λιμάνι)','[HYD] Ύδρα, Ελλάδα (Λιμάνι)','[FOL] Φολέγανδρος, Ελλάδα (Λιμάνι)','[FOU] Φούρνοι, Ελλάδα (Λιμάνι)','[CHA] Χανιά (Κρήτη), Ελλάδα (Λιμάνι)','[CHI] Χίος, Ελλάδα (Λιμάνι)','[PHA] Ψαρά, Ελλάδα (Λιμάνι)'];
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

    for (var i = 0; i < portallvalues.length; i++) {
        for (var p = 0; p < categorylettersenglish.length; p++) {
            if (portallvalues[i].charAt(1) == categorylettersenglish[p].toUpperCase()) {
                allports[i] = [categoryportareavalues[0], portallvalues[i], categorylettersenglish[p].toUpperCase()];
            }
            if (p < 24) {
                if (portallvalues[i].charAt(0) == categorylettersgreeksmall[p]) {
                    allports[i] = [categoryportareavalues[0], portallvalues[i], categorylettersgreeksmall[p]];
                }
                else if(portallvalues[i].charAt(0) == categorylettersgreekbig[p])
                {
                    allports[i] = [categoryportareavalues[0], portallvalues[i], categorylettersgreekbig[p]];
                }
            }
        }
    }

    for (var i = 1; i < categoryportareavalues.length; i++) {
        for (var k = 0; k < allports.length; k++) {
            for (var j = 0; j < arrayofports[i - 1].length; j++) {
                if (allports[k][1] == arrayofports[i - 1][j]) {
                    allports[k][0] = categoryportareavalues[i];
                }
            }
        }
    }

    var showports = $('<div>');
    var categoryportareabutton = $('<a class="btn waves-effect waves-light blue categoryportareabutton" style=width:100%>');
    var categorytableportsarealist = $('<table class="table table-condensed">');
    for (var i = 0; i < 12; i++) {
        if (i == 6 || i==0)
        {
            categorytableportsarealist.append($('<tr>'));
        }
        categorytableportsarealist.find('tr:last').append($('<td style=border:0px>').append(categoryportareabutton.clone(true).text(categoryportareavalues[i])));
    }

    var portlist = $('<table class="table table-condensed">');
    var areaofports;
    $('body').on('click', '.categoryportareabutton', function () {
        areaofports.text($(this).text());
        filteredports($(this).text());
    });

    function filteredports(value) {
        portlist.empty();
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
                    portlist.find('tr:last').append($('<td class=portname>').append(portallvalues[j]));
                    k++;
                }
                else if (allports[j][0] == value && categorylettersenglish[i].toUpperCase() == allports[j][2]) {
                    portlist.find('tr:last').append($('<td class=portname>').append(allports[j][1]));
                    k++;
                }
            }
        }
    }

    $('body').on('click', '[id*=depallroute]>input,[id*=arrallroute]>input', function () {
        $(this).autocomplete({
            autoFocus: true,
            source: function (request, response) {
                request.term = '[' + request.term;
                request.term = request.term.replace(/\[+/g, "[");
                var matcher = new RegExp("^" + $.ui.autocomplete.escapeRegex(request.term), "i");
                response($.grep(portallvalues, function (item) {
                    return matcher.test(item);
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
        selectorfancybox.find('input').val($(this).text());
        $.fancybox.close();
    });

    $('label[for^=FromPort],label[for^=ToPort],label[for*=MultDepList]').fancybox({
        autoSize: true,
        autoScale: false,
        transitionIn: 'none',
        transitionOut: 'none',
        content: showports,
        beforeLoad: function () {
            filteredports(categoryportareavalues[0]);
            selectorfancybox = $(this.element).parent();
            showports.empty();
            var portheader = $('<ul class=list-inline style="border-bottom:5px solid #FA0">');
            var portimage = $('<li><img src="../Content/Searchimages/ship.png" alt="shipimage" style=margin-bottom:5px></li>');
            areaofports = $('<li style=color:#1668b1;font-size:large;font-weight:bolder>' + categoryportareavalues[0] + '</li>');
            portheader.append(portimage).append(areaofports);
            if (selectorfancybox.attr('id').search('depallroute') != -1) {
                $arrid = selectorfancybox.attr('id').split('depallroute');
                $arriveportvalue = $('[id=arrallroute' + $arrid[1] + ']').find('input').val();
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
                              '<label for="MultDepList[' + cnt + '].FromPort" class="control-label" align="left">Από <a style="cursor:pointer">Επιλέξτε λιμάνι Αναχωρησης<span class="glyphicon glyphicon-arrow-right" aria-hidden="true"></span></a></label>' +
                              '<input class="form-control" type="text" name="MultDepList[' + cnt + '].FromPort"  placeholder = "Εισάγετε όνομα λιμανιού πόλης" data-val="true" required>' +
                              //'<span data-valmsg-replace="true" data-valmsg-for="MultDepList[' + cnt + '].FromPort" class="field-validation-valid text-danger"></span>' +
                              '</div>' +
                              '<div class="col-md-4" id="arrllroute' + cnt + '">' +
                              '<label for="MultDepList[' + cnt + '].ToPort" class="control-label" align="left">Πρός <a style="margin-top: 5px; "> <a style="cursor:pointer">Επιλέξτε λιμάνι προορισμού<span class="glyphicon glyphicon-arrow-right" aria-hidden="true"></span></a></label>' +
                              '<input class = "form-control datepicker" type = "date" name="MultDepList[' + cnt + '].ToPort"  placeholder = "Εισάγετε όνομα λιμανιού πόλης" data-val="true"  required>' +
                              //'<span data-valmsg-replace="true" data-valmsg-for="MultDepList[' + cnt + '].ToPort" class="field-validation-valid text-danger"></span>' +
                              '</div>' +
                              '<div class="col-md-3" id="depalldate' + cnt + '">' +
                              '<label for="MultDepList[' + cnt + '].DateFrom" class="control-label" align="left">Αναχώρηση</label>' +
                              '<input class = "form-control datepicker" type = "date" name="MultDepList[' + cnt + '].DateFrom"  placeholder = "Εισάγετε ημ/νια αναχώρησης" id = "departuredatemulti' + cnt + '" data-val="true" required>' +
                              //'<span data-valmsg-replace="true" data-valmsg-for="MultDepList[' + cnt + '].ToPort" class="field-validation-valid text-danger"></span>' +
                              '</div></div>';
    return toAppend;

}
