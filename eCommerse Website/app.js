var myRequest = new XMLHttpRequest();
myRequest.onreadystatechange = function () { 
if (myRequest.readyState === 4) {
document.getElementById('collection').innerHTML = myRequest.responseText;
}
};
function sendTheAJAX() {
myRequest.open('GET', 'payment.html');
myRequest.send();
document.getElementById('display').style.display = 'none';
}




$(document).ready(function(){
    $("#reveal").click(function(){
        $.ajax({
            url: "payment.html",
            success: function(response) {
                $("#ajax-content").html(response);
                $("#reveal").hide(); // Hide the button after loading content
            }
        });
    });
});