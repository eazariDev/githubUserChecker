const API_URL = "https://api.github.com/users/";


//define document elements which we gonna use 
const search = document.getElementById("search");
const avatar = document.getElementById("avatar");
const name = document.getElementById("name");
const weblogAddr = document.getElementById("weblog");
const loc = document.getElementById("location");
const bio = document.getElementById("bio");
const errorMsg = document.getElementById("error");


//function which check if user id is entered and get the entered user id
function init() {
	const user = search.value;
	if (user) {
      getUser(user);
      search.value = "";
	  errorMsg.innerHTML = "";
	}else {
		errorMsg.innerHTML = "No id entered!<br>Please enter the user id!";
	}
	return false;
}

//this function first will check the user id information in browser localstorage
//and if none found will send a request using github api and get the user information
async function getUser(username) {
	if ( localStorage.hasOwnProperty(username) ) {	
		var respData = JSON.parse(localStorage.getItem(username));
		displayInfo(respData);
	} else {
		const resp = await fetch(API_URL + username);
		if (resp.status != 200) {
			avatar.src = "./assets/user.png";
			name.innerText = "Name";
			weblogAddr.innerText = "Weblog";
			loc.innerText = "Location";
			bio.innerText = "Biography of user";

			errorMsg.innerHTML = "No user found with this id!<br>Please enter another one!";
		}else{
			const respData = await resp.json();
			localStorage.setItem(username, JSON.stringify(respData));
			displayInfo(respData);
		}
	}
}

//this function use the fetched data and display them
function displayInfo(data){
	
	avatar.src = data.avatar_url;
	
	if (data.name != null){
		name.innerText = data.name;
		console.log(data.name);
	}else{
		name.innerText = "No Name";
	}
	
	if (data.blog != ""){
		weblogAddr.innerText = data.blog;
	}else{
		weblogAddr.innerText = "No Weblog";
	}
	
	if (data.location != null){
		loc.innerText = data.location;
	}else{
		loc.innerText = "No Location";
	}
	
	if (data.bio != null){
		bio.innerText = data.bio;
	}else{
		bio.innerText = "No Biography";
	}
	
}
