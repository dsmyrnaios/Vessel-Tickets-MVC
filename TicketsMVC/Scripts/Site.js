$(document).ready(function () {
    $('body').on('click', '.tab', function () {
        if ($(this).hasClass('tab_previous')) {
            window.location.href = $(this).attr('value');
        }
    });
});