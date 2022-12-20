LayupList = {};
LayupList.Web = {};
LayupList.Web.Base = function() {

    // https://docs.djangoproject.com/en/1.9/ref/csrf/#ajax
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    var csrftoken = getCookie('csrftoken');
    function csrfSafeMethod(method) {
        // these HTTP methods do not require CSRF protection
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }
    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });

    // gets the selected search type from the radio button in the navbar
    // default option is to search for courses
    // https://stackoverflow.com/questions/8622336/jquery-get-value-of-selected-radio-button
    $(".searchradio").click(function() {
        var navbarSearchBox = $("#navbarsearch");
        var searchselectValue = $('input[name="searchselect"]:checked').val();
        if (searchselectValue == "profs") {
            navbarSearchBox.attr("placeholder", "Professor Search...");
        } else {
            navbarSearchBox.attr("placeholder", "Course Search...");
        }
    })
};
