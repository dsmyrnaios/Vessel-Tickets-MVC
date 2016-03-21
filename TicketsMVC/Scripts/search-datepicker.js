jQuery.fn.calendarPicker = function (options,triggerobject) {
    // --------------------------  start default option values --------------------------
    if (!options.date) {
        options.date = new Date();
    }
    var toolbuttons = $('<ul class=list-inline>');

    var todaybutton = $('<a class="btn waves-effect waves-light blue" id="' + triggerobject.attr('id') + '">Today</a>');
    if (options.todaybutton == false)
        todaybutton.hide();

    var clearbutton = $('<a class="btn waves-effect waves-light red" id="' + triggerobject.attr('id') + '">Close</a>');
    if (options.clearbutton == false)
        clearbutton.hide();

    var applybutton = $('<a class="btn waves-effect waves-light green" id="' + triggerobject.attr('id') + '">Apply</a>');
    if (options.applybutton == false)
        applybutton.hide();

    if (typeof (options.format) == "undefined")
        options.format = "international";

    if (typeof (options.startdate) != "undefined" && isNaN(Date.parse(options.startdate)) == false)
        options.date = new Date(options.startdate);


    if (typeof (options.years) == "undefined")
        options.years = 1;

    if (typeof (options.autoreturntodaydate) == "undefined")
        options.autoreturntodaydate = false;

    if (typeof (options.months) == "undefined")
        options.months = 3;

    if (typeof (options.days) == "undefined")
        options.days = 4;

    if (typeof (options.showmonthnames) == "undefined")
        options.showmonthnames = false;

    if (typeof (options.showDayArrows) == "undefined")
        options.showDayArrows = true;

    if (typeof (options.useWheel) == "undefined")
        options.useWheel = true;

    if (typeof (options.callbackDelay) == "undefined")
        options.callbackDelay = 500;

    if (typeof (options.monthNames) == "undefined")
        options.monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    if (typeof (options.dayNames) == "undefined")
        options.dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // --------------------------  end default option values --------------------------

    var calendar = { currentDate: options.date };
    calendar.options = options;

    toolbuttons.append($('<li>').append(todaybutton)).append($('<li>').append(applybutton)).append($('<li>').append(clearbutton));

    //build the calendar on the first element in the set of matched elements.
    var theDiv = this.eq(0);//$(this);
    theDiv.removeClass();
    theDiv.addClass("calBox " + triggerobject.attr('id'));

    $('body').on('click', 'a[id=' + triggerobject.attr('id') + ']', function () {
        if ($(this).text() == 'Today') {
            calendar.changeDate(new Date());
        }
        else if ($(this).text() == 'Close') {
            triggerobject.val(calendar.currentDate);
            triggerobject.popover('hide');
        }
        else if ($(this).text() == 'Apply') {
            triggerobject.val(calendar.currentDate);
        }
        var popover = triggerobject.attr('data-content', theDiv.parent().html()).data('bs.popover');
        popover.setContent();
        popover.$tip.addClass(popover.options.placement);
    });


    //empty the div
    theDiv.empty();


    var divYears = $("<div>").addClass("calYear");
    var divMonths = $("<div>").addClass("calMonth");
    var divDays = $("<div>").addClass("calDay");

    theDiv.append(divYears).append(divMonths).append(divDays).append(toolbuttons);
    var selectedyear = options.date.getFullYear();
    var selectedmonth = options.date.getMonth();
    calendar.changeDate = function (date) {
        calendar.currentDate = date;
        var fillYears = function (date) {
            var year = date.getFullYear();
            var t = new Date();
            divYears.empty();
            var nc = options.years + 1;
            var w = parseInt((theDiv.width() - 4 - (nc) * 4) / nc) + "px";
            if (year - t.getFullYear() == 0)
            {
                startloop = t.getFullYear();
            }
            else if (year - selectedyear > 0) {
                var changevariable = year - selectedyear;
                var startloop = selectedyear + changevariable - 1;
            }
            else
            {
                var changevariable = selectedyear - year;
                var startloop = selectedyear - changevariable - 1;
            }
            selectedyear = year;
            for (var i = startloop; i <= startloop + options.years; i++) {
                var d = new Date(date);
                d.setFullYear(i);
                var span = $("<span>").addClass("calElement").attr("millis", d.getTime()).html(i).css("width", w);
                if (d.getFullYear() == t.getFullYear())
                    span.addClass("today");
                if (d.getFullYear() == calendar.currentDate.getFullYear())
                    span.addClass("selected");
                divYears.append(span);
            }
        }

        var fillMonths = function (date) {
            var month = date.getMonth();
            var t = new Date();
            divMonths.empty();
            var oldday = date.getDay();
            var nc = options.months + 1;
            var w = parseInt((theDiv.width() - 4 - (nc) * 4) / nc) + "px";
            if (month - t.getMonth() == 0) {
                startloop = t.getMonth();
            }
            else if (month - selectedmonth > 0) {
                var changevariable = month - selectedmonth;
                var startloop = selectedmonth + changevariable - 1;
            }
            else {
                var changevariable = selectedmonth - month;
                var startloop = selectedmonth - changevariable - 1;
            }
            selectedmonth = month;
            for (var i = startloop; i <= startloop + options.months; i++) {
                var d = new Date(date);
                var oldday = d.getDate();
                d.setMonth(i);

                if (d.getDate() != oldday) {
                    d.setMonth(d.getMonth() - 1);
                    d.setDate(28);
                }
                var span = $("<span>").addClass("calElement").attr("millis", d.getTime()).html(options.monthNames[d.getMonth()]).css("width", w);
                if (d.getFullYear() == t.getFullYear() && d.getMonth() == t.getMonth())
                    span.addClass("today");
                if (d.getFullYear() == calendar.currentDate.getFullYear() && d.getMonth() == calendar.currentDate.getMonth())
                    span.addClass("selected");
                divMonths.append(span);

            }
        }

        var fillDays = function (date) {
            var day = date.getDate();
            var t = new Date();
            divDays.empty();
            var nc = options.days * 2 + 1;
            var w = parseInt((theDiv.width() - 4 - (options.showDayArrows ? 12 : 0) - (nc) * 4) / (nc - (options.showDayArrows ? 2 : 0))) + "px";
            for (var i = -options.days; i <= options.days; i++) {
                var d = new Date(date);
                d.setDate(day + i)
                var span = $("<span>").addClass("calElement").attr("millis", d.getTime())
                if (i == -options.days && options.showDayArrows) {
                    span.addClass("prev");
                } else if (i == options.days && options.showDayArrows) {
                    span.addClass("next");
                } else {
                    span.html("<span class=dayNumber>" + d.getDate() + "</span><br>" + options.dayNames[d.getDay()]).css("width", w);
                    if (d.getFullYear() < options.date.getFullYear() || (d.getFullYear() == t.getFullYear() && d.getMonth() < options.date.getMonth()) || (d.getFullYear() == options.date.getFullYear() && d.getMonth() == options.date.getMonth() && d.getDate() < options.date.getDate()))
                        span.addClass("disabled").attr('disabled', 'disabled');
                    if (d.getFullYear() == t.getFullYear() && d.getMonth() == t.getMonth() && d.getDate() == t.getDate())
                        span.addClass("today");
                    if (d.getFullYear() == calendar.currentDate.getFullYear() && d.getMonth() == calendar.currentDate.getMonth() && d.getDate() == calendar.currentDate.getDate())
                        span.addClass("selected");
                    if (typeof (options.startdate) != "undefined" && (d.getFullYear() == calendar.currentDate.getFullYear() && d.getMonth() == calendar.currentDate.getMonth() && d.getDate() == calendar.currentDate.getDate()))
                        span.addClass("daystartdate");
                }
                divDays.append(span);

            }
        }

        var dateformat = function (format, date) {
            if (date.getTime() < options.date.getTime()) {
                date = options.date;
            }
            $datemonth = date.getMonth() + 1;
            $datedate = date.getDate();
            if (options.showmonthnames == true) {
                $datemonth = options.monthNames[$datemonth - 1];
            }
            else
            {
                if (date.getMonth() < 10) {
                    $datemonth = "0" + $datemonth;
                }
            }
            if (date.getDate() < 10) {
                $datedate = "0" + $datedate;
            }
            if (format == "international") {
                calendar.currentDate = date.getFullYear() + ' / ' + $datemonth + ' / ' + $datedate;
            }
            if (options.applybutton == false && options.autoreturntodaydate == true) {
                triggerobject.val(calendar.currentDate);
            }
        }

        var deferredCallBack = function () {
            if (typeof (options.callback) == "function") {
                if (calendar.timer)
                    clearTimeout(calendar.timer);

                calendar.timer = setTimeout(function () {
                    options.callback(calendar);
                }, options.callbackDelay);
            }
        }


        fillYears(date);
        fillMonths(date);
        fillDays(date);
        dateformat(options.format, date);

        if (options.autoreturntodaydate == true) {
            deferredCallBack();
        }

    }

    $('body').on('click', '.' + triggerobject.attr('id'), function (ev) {
        var el = $(ev.target).closest(".calElement");
        if (el.hasClass("calElement")) {
            options.autoreturntodaydate = true;
            calendar.changeDate(new Date(parseInt(el.attr("millis"))));
            var popover = triggerobject.attr('data-content', theDiv.parent().html()).data('bs.popover');
            popover.setContent();
            popover.$tip.addClass(popover.options.placement);
        }
    });

    //if mousewheel
    if ($.event.special.mousewheel && options.useWheel) {
        divYears.mousewheel(function (event, delta) {
            var d = new Date(calendar.currentDate.getTime());
            d.setFullYear(d.getFullYear() + delta);
            calendar.changeDate(d);
            return false;
        });
        divMonths.mousewheel(function (event, delta) {
            var d = new Date(calendar.currentDate.getTime());
            d.setMonth(d.getMonth() + delta);
            calendar.changeDate(d);
            return false;
        });
        divDays.mousewheel(function (event, delta) {
            var d = new Date(calendar.currentDate.getTime());
            d.setDate(d.getDate() + delta);
            calendar.changeDate(d);
            return false;
        });
    }


    calendar.changeDate(options.date);

    return calendar;
};