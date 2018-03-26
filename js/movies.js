/*global WildRydes _config*/

var WildRydes = window.WildRydes || {};

(function rideScopeWrapper($) {
    var authToken;
    
    WildRydes.authToken.then(function setAuthToken(token) {
        if (token) {
            authToken = token;
        } else {
            window.location.href = '/signin.html';
        }
    }).catch(function handleTokenError(error) {
        alert(error);
        window.location.href = '/signin.html';
    });

    $(function onDocReady() {
        requestMovies();
        $('#request').click(handleRequestFetch);
        $('#save').click(handleRequestSave);
        WildRydes.authToken.then(function updateAuthMessage(token) {
            if (token) {
                displayUpdate('You are authenticated. Click to see your <a href="#authTokenModal" data-toggle="modal">auth token</a>.');
                $('.authToken').text(token);
            }
        });

        if (!_config.api.invokeUrl) {
            $('#noApiMessage').show();
        }
    });

    function handleRequestFetch(event) {
        event.preventDefault();
        requestMovies();
    }

    function handleRequestSave(event) {
        event.preventDefault();
        saveMovie();
    }

    function requestMovies() {
        $.ajax({
            method: 'GET',
            url: _config.api.invokeUrl ,
            headers: {
                Authorization: authToken
            },
            contentType: 'application/json',
            success: completeRequest,
            error: function ajaxError(jqXHR, textStatus, errorThrown) {
                console.error('Error requesting: ', textStatus, ', Details: ', errorThrown);
                console.error('Response: ', jqXHR.responseText);
                alert('An error occured in request :\n' + jqXHR.responseText);
            }
        });
    }

    function saveMovie(pickupLocation) {
        $.ajax({
            method: 'POST',
            url: _config.api.invokeUrl,
            headers: {
                Authorization: authToken
            },
            data: JSON.stringify({
                name: $('#name').val(),
                description: $('#description').val(),
                picture: $('#picture').val(),
                status: $('#status').val()
            }),
            contentType: 'application/json',
            success: requestMovies,
            error: function ajaxError(jqXHR, textStatus, errorThrown) {
                console.error('Error requesting ride: ', textStatus, ', Details: ', errorThrown);
                console.error('Response: ', jqXHR.responseText);
                alert('An error occured when requesting your unicorn:\n' + jqXHR.responseText);
            }
        });
    }

    function completeRequest(result) {
        console.log('Response received from API: ', result);
        $('#movies > tr').remove();
        result.forEach(element => {
            let text ="<tr>"+
                "<td>"+element.name+"</td>"+
                "<td>"+element.description+"</td>"+
                "<td>"+element.picture+"</td>"+
                "<td>"+element.status+"</td>"+
            "</tr>";
            setMovie(text); 
        });
        displayUpdate('Movies requested, success');
    }


    function displayUpdate(text) {
        $('#updates').append($('<li>' + text + '</li>'));
    }

    function setMovie(text) {
        $('#movies').append($(text));
    }

}(jQuery));
