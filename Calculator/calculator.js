var num1flag=false;
var num2flag=false;
var numPattern=/^[0-9]+$/;

let isNumberValid = () => {
    return num1flag && num2flag;
}

$(document).ready(function(){
    

    var queryParams = new URLSearchParams(window.location.search);
    var uname = queryParams.get('username');

    console.log(uname);

    $('#username').text(uname);

    let enableCalculator = (flag) => {
        $('input[type="button"]').attr('disabled', flag);
    }

    enableCalculator(true);



$('#num1,#num2').on("click input change",(event)=>{
    var inputName = $(event.target).attr("name");
    const inputText = $(event.target).val();
    console.log(inputText.length);
    if (inputText.length==0) {
        $('#'+inputName+'_error').text('Please enter atleat one digit').show();
        if(inputName=='num1') num1flag = false;
        if(inputName=='num2') num2flag = false;
        enableCalculator(true);
    }
    else if(!numPattern.test(inputText)){
        console.log(numPattern.test(inputText));
        $('#'+inputName+'_error').text('Special characters are not allowed').show();
        if(inputName=='num1') num1flag = false;
        if(inputName=='num2') num2flag = false;
        enableCalculator(true);
    }

    else{
        $('#'+inputName+'_error').hide();
        if(inputName=='num1') num1flag = true;
        if(inputName=='num2') num2flag = true;
        enableCalculator(!(num1flag && num2flag));
    }
    enableCalculator();


});

   
  $('input[type="button"]').on("click",(event) => {
    var inputName = $(event.target).attr("name");
    console.log('Input Name:', inputName);

    const num1 = parseFloat($('#num1').val());
    const num2 = parseFloat($('#num2').val());
    let result=0;
    if(inputName=='Divide' && num2==0){
        
        $('#result').text("Division by 0 is not permitted");
        $('#num2_error').text('0 is not permitted').show();
        //$('#result').addClass('error');
    }else{
      //  $('#result').removeClass('error');
      $('#num2_error').hide();
    switch (inputName) {
        case 'Add':
            {result= num1 + num2;
                $('#result').text(result);
            break;}
        case 'Subtract':
            {result= num1 - num2;
                $('#result').text(result);
            break;}
        case 'Multiply':
            {result= num1 * num2;
                $('#result').text(result);
            break;}
        case 'Divide':
            {
                result= num1 / num2;}
                
                $('#result').text(result);
            break;
        default:
            {result= 0;
                $('#result').text(result);
            }
        }}


});
})