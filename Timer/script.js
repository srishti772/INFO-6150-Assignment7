$(document).ready(function () {
   


    let startTime = 0;
    let running = false;
    var interval;

    

const currentDate = new Date();    
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0'); //Jan = 0 so adding 1 padding with 0s to get a proper format
const day = String(currentDate.getDate()).padStart(2, '0');

const formattedDate = year+'-'+month+'-'+day;

console.log(formattedDate); // Output: "2023-11-01"
    $("#datepicker").attr("value", formattedDate);
    
    $("#datepicker").keypress((e) => {
        e.preventDefault();
    });


    function formatTime(time) {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;
        //padStart to append zeroes to the left of the number
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

     let  startTimer = async () => {
        running = true;
        $('#start').attr('disabled', true);
        $('#stop').attr('disabled', false);
        $('#reset').attr('disabled', false);

        while (running) {
            $('#display').text(formatTime(startTime++));
            await new Promise(resolve => 
                interval=setInterval(resolve, 1000)); //1 second delay
        }
    }

   

    let stopTimer=() => {
        running = false;
        clearInterval(interval);
        $('#start').attr('disabled', false);
        $('#stop').attr('disabled', true);
    }

    $('#start').on('click', () => {
        if (!running) {
            startTimer();
        }
    });

    $('#stop').on('click', () => {
        if (running) {
            stopTimer();
        }
    });

    $('#reset').on('click', () => {
        stopTimer();
        startTime = 0;
        $('#display').text(formatTime(startTime));
    });
});
