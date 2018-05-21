  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCY8e6udkfIXF0BMhrzrSXuQjPP2ROfkfE",
    authDomain: "travelaam-69b31.firebaseapp.com",
    databaseURL: "https://travelaam-69b31.firebaseio.com",
    projectId: "travelaam-69b31",
    storageBucket: "travelaam-69b31.appspot.com",
    messagingSenderId: "723089584950"
  };
  firebase.initializeApp(config);


function login() {

	var userEmail=document.getElementById("Email").value;
	var userPass=document.getElementById("Password").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
    if (errorCode === 'auth/wrong-password') {
      window.alert("Wrong password.");
    }
    else {
    window.alert("Error :" + errorCode + errorMessage);
    }
  });

  firebase.auth().onAuthStateChanged(function(user) {
  
    if (user) {
      // User is signed in.
  
        window.location.href = "Admin_panel/homepage.htmll";
      }
     else {
      // No user is signed in.
  
      document.getElementById("form").style.display="initial";
    }
  });

}


function logout() {
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
    window.alert('Logout Successful..');
    window.location.href = "D:/Main Travelaam/Main/index.html";
  }).catch(function(error) {
    // An error happened.
    var errorCode = error.code;
    var errorMessage = error.message;
    window.alert("Error :" + errorCode + errorMessage);
  });
  
}
