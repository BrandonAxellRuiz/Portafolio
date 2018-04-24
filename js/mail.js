    var clientId = '152433093098-tsklcr1ah1fc5qti0291fcn7h084fofb.apps.googleusercontent.com';
    var apiKey = "AIzaSyBH3nTdH1s6vvBSYmgE0eTJ-Ddd4bn1e5o";
    var scopes =
        'https://www.googleapis.com/auth/gmail.readonly ' +
        'https://www.googleapis.com/auth/gmail.send';

    function handleClientLoad() {
        gapi.client.setApiKey(apiKey);
        window.setTimeout(checkAuth, 1);
    }

    function checkAuth() {
        gapi.auth.authorize({
            client_id: clientId,
            scope: scopes,
            immediate: true
        }, handleAuthResult);
    }

    function handleAuthClick() {
        gapi.auth.authorize({
            client_id: clientId,
            scope: scopes,
            immediate: false
        }, handleAuthResult);
        return false;
    }

    function handleAuthResult(authResult) {
        if (authResult && !authResult.error) {
            loadGmailApi();
            $('#authorize-button').remove();
            $('.table-inbox').removeClass("hidden");
            $('#compose-button').removeClass("hidden");
        } else {
            $('#authorize-button').removeClass("hidden");
            $('#authorize-button').on('click', function () {
                handleAuthClick();
            });
        }
    }

    function loadGmailApi() {
        gapi.client.load('gmail', 'v1');
    }


    function sendEmail() {
        $('#send-button').addClass('disabled');

        sendMessage(
            {
                'To': "brandon_axell@hotmail.com",
                'Subject': $("#compose-phone").val()+' | Mensaje de Portafolio | BackHome'
            },

            $('#compose-message').val(),
            composeTidy
        );

    }

    function composeTidy() {
        $("#compose-phone").val('');
        $('#compose-message').val('');
        $('#send-button').removeClass('disabled');
    }

    function sendMessage(headers_obj, message, callback) {
        var email = '';

        for (var header in headers_obj)
            email += header += ": " + headers_obj[header] + "\r\n";

        email += "\r\n" + message;

        var sendRequest = gapi.client.gmail.users.messages.send({
            'userId': 'me',
            'resource': {
                'raw': window.btoa(email).replace(/\+/g, '-').replace(/\//g, '_')
            }
        });

        return sendRequest.execute(callback);
    }

