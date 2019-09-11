$(document).ready(function(){
    // Me Vars
    var validInputEvents = "input";
    var firstName = $('#firstName');
    var lastName = $('#lastName');
    var email = $('#email');
    var arCode = $('#areaCode');
    var pNumber = $('#phoneNumber');
    var companyName = $('#companyName');
    var backspaceKey = 8;
    var delKey = 46;

    //Regex function for firstName
    firstName.on('input', function(){
        function lettersOnly(){
            if(firstName.val().match(/[^a-z]/gi,"")){
                firstName.css('borderColor', 'red');
            }else{
                firstName.css('borderColor', 'green');
            }
        }
        lettersOnly();
    });

    //Regex function for lastName
    lastName.on(validInputEvents, function(){
        function lettersOnly(){
            if(lastName.val().match(/[^a-z]/gi,"")){
                lastName.css('borderColor', 'red');
            }else{
                lastName.css('borderColor', 'green');
            }
        }
        lettersOnly();
    });

    // Regex function for email address
    email.on('change', function(){
        // var flag = true;
        if(email.val().match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
            email.css('borderColor', 'green');   
        }else{
            email.css('borderColor', 'red');
            iziToast.show({
                theme: 'dark',
                timeout: 3000,
                titleColor: '#000',
                messageColor: '#000',
                color: '#e4cb4d',
                position: 'center',
                title: 'Caution!',
                message: 'Please use a valid email.'
            });
        }
    });

    // Regex function for areaCode
    arCode.on(validInputEvents, function(){
        if(arCode.val().length == 3){
            arCode.css('borderColor', 'green');
            pNumber.focus();
        }else{
            arCode.css('borderColor', 'red');
        }
        var numOnly = arCode.val().replace(/\D+/gi,"");
        arCode.val(numOnly);
    });

    //Regex function for phoneNumber
    pNumber.on(validInputEvents, function(e){
        var keyCode = e.keyCode;
        if(pNumber.val().length == 0){
            if(keyCode == backspaceKey || delKey){
                arCode.focus();
            }
            pNumber.css('borderColor', 'red');
        }
        if(pNumber.val().length != 0){
            pNumber.css('borderColor', 'green');
        }
        var numOnly = pNumber.val().replace(/[^0-9-]/gi,"");
        pNumber.val(numOnly);
    });

    // Regex function for companyName
    companyName.on(validInputEvents, function(){
        if(companyName.val() == 0){
            companyName.css('borderColor', 'red');
        }else{
            companyName.css('borderColor', 'green');
        }
    });

    // Send button function to send input data to sql table
    $("#sendButton").on('click', function(e){
        e.preventDefault();
        let infoSubmitObj = {
            firstName: $("[name='firstName']").val(),
            lastName: $("[name='lastName']").val(),
            email: $("[name='email']").val(),
            areaCode: $("[name='areaCode']").val(),
            phoneNumber: $("[name='phoneNumber']").val(),
            companyName: $("[name='companyName']").val()
        };

        // Function that check to make sure that there are no blank fields
        function validateSubmitObj(){
            var flag = true;
            for(var key in infoSubmitObj){
                if(infoSubmitObj [key].length == 0){
                    flag = false;
                }
            }
            return flag;
        }

        if(validateSubmitObj(flag = true)){
            $.ajax({
                type: 'POST',
                url: 'scripts/create.php',
                data: infoSubmitObj,
                success: function(){
                    iziToast.show({
                        theme: 'dark',
                        color: '#6da453',
                        timeout: 3000,
                        position: 'center',
                        title: 'Info Saved!',
                        message: 'We will send you some examples.'
                    });
                }
            })
            .done(function(msg){
            });
        }else{
            iziToast.show({
                theme: 'dark',
                titleColor: '#000',
                messageColor: '#000',
                timeout: 3000,
                color: '#e4cb4d',
                position: 'center',
                title: 'Oh no!',
                message: 'Please complete the form before submitting.'
            });
        }
    })
});