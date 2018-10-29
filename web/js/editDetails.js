function validate() {
	var bio = document.getElementById("bio").value;
	var oldpassword = document.getElementById("oldpassword").value;
	var newpassword = document.getElementById("newpassword").value;

	if(newpassword == oldpassword) {
		alert("details successfully changed!")
		window.location = "./profile.html"
	}
	else {
		alert("wrong credentials!");
		window.location = "./profile.html"
	}
}