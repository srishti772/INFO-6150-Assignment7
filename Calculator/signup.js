var emailPattern = /([\w\.-]+)@northeastern\.edu$/;
var passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
var usernamePattern=/^[a-zA-Z0-9_]+$/


let hasEmail=false;
let hasPassword=false;
let hasUsername=false;
let hasCPass=false;

let isValid = (email,pattern) => {
      return pattern.test(email);
}

$(document).ready(() => {
    
    let enableLoginButton = () => {
        $('#login').prop('disabled', !isFormValid);
    }

    // Initialize form validity
    var isFormValid = false;
    
    // Function to check if the form is valid
    let checkFormValidity= () => {
        isFormValid = hasEmail && hasPassword && hasUsername && hasCPass;
            enableLoginButton(); //enable or diable login after every validation check
    }
 // Disable the login button initially
    enableLoginButton();
   

    
    // Input event listeners for real-time validation
    $('#email').on('click input change', (event) => {
        var input=$('#email').val();
        if(input.length==0){
            $('#email_error').text('This field is mandatory').show();
            hasEmail=false;
        }
         else if (!isValid(input, emailPattern)) {
            $('#email_error').text('Enter a valid email address').show();
            hasEmail=false;
        } else {
            $('#email_error').hide();
            hasEmail=true;
        }
        checkFormValidity();
    });
    
    $('#username').on('click input change', () => {
        var username=$('#username').val();
        if (username.length == 0) {
            $('#username_error').text('This field is mandatory').show();
            hasUsername=false;
        } 
        else if (username.length < 5) {
            $('#username_error').text('Username must be at least 5 characters.').show();
            hasUsername=false;
        } 
        else if (!isValid(username, usernamePattern)) {
            $('#username_error').text('Username should only contain letters,numbers or underscores').show();
            hasUsername=false;
        }
        else {
            $('#username_error').hide();
            hasUsername=true;
        }
        checkFormValidity();
    });
    
    $('#password, #cpass').on('click input change', () => {
        var password = $('#password').val();
        var cpass = $('#cpass').val();
             
        if( password.length == 0){
            $('#password_error').text('This field is mandatory').show();
            hasPassword=false;
                }
        else if( password.length < 8){
            $('#password_error').text('Password must be atleast 8 characters long').show();
            hasPassword=false;
                }
        else if (!isValid(password, passwordPattern)) {
            $('#password_error').text('Password must contain at least one uppercase letter, one lowercase letter, one number and one special character').show();
            hasPassword=false;
        }   
        else if( password.length > 10){
            $('#password_error').text('Password should not be more than 10 characters').show();
            hasPassword=false;
                }
        else {
            $('#password_error').hide();
            hasPassword=true;
        }

       
        if (cpass.length==0) {
            $('#cpass_error').text('This field is mandatory').show();
            hasCPass=false;
        }
        else if (cpass !== password) {
            $('#cpass_error').text('Passwords do not match.').show();
            hasCPass=false;
        } else {
            $('#cpass_error').hide();
            hasCPass=true;
        }
        checkFormValidity();
    });


    $('#login').click(() => {
        window.location.href = 'calculator.html'; // Replace with the URL you want to redirect to
    });

    // Form submit event
    $('form').submit((e) => {
                    e.preventDefault(); // Prevent form submission if not valid
                   var username={username:$('#username').val()};
                   var queryParam=$.param(username);
                    window.location.href = 'calculator.html?'+queryParam; 
                    
        
    });

});

