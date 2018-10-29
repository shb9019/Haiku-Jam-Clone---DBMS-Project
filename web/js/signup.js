
function validate() {
	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;
    var rpassword = document.getElementById("rpassword").value;
	if ( password == rpassword ){
    alert ("signup successfully");
    window.location = "./profile.html";
    return false;
    }
    else {
        alert ("Wrong credentials");
        return false;
    }
}