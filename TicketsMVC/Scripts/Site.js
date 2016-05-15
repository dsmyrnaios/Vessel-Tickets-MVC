$(document).ready(function () {
    var flag=0;
    $('.tab').each(function () {
        if (window.location.href.search($(this).attr('value')) != -1) {
            $(this).addClass('tab_active');
            flag = 1;
        }
        else if (flag == 0) {
            $(this).addClass('tab_previous');
        }
    });
    $('body').on('click', '.tab', function () {
        if ($(this).hasClass('tab_previous')) {
            window.location.href = $(this).attr('value');
        }
    });
});