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


//submit 
document.getElementById('blog').addEventListener('submit', submitblog);

function submitblog(e){
    e.preventDefault();

    //get values
    var bid= getinputval('bid');
    var bname= getinputval('bname');
    var bimg= getinputval('bimg');
    var bdes= getinputval('bdes');
    var bdate= getinputval('bdate');

    writeUserData(bid, bname, bimg, bdes, bdate);

    document.getElementById("blog").reset();
    window.location.href = "homepage.html";

}

function writeUserData(bid, bname, bimg, bdes, bdate) {
    firebase.database().ref('/blog/id/' + bid).set({
        Blog_Name: bname,
        image: bimg,
        description: bdes,
        date: bdate
    });
  }

//funtion to get values 

function getinputval(id){
    return document.getElementById(id).value;
}

//upload file
document.getElementById('bimg').addEventListener('change', upload);
function upload(){
    var file= event.target.files[0];
    var filename= file.name;
    var storageref=firebase.storage().ref('blog/'+ filename);
    var uploadTask= storageref.put(file);


    // Register three observers:
// 1. 'state_changed' observer, called any time the state changes
// 2. Error observer, called on failure
// 3. Completion observer, called on successful completion
uploadTask.on('state_changed', function progress(snapshot){
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case firebase.storage.TaskState.PAUSED: // or 'paused'
        console.log('Upload is paused');
        break;
      case firebase.storage.TaskState.RUNNING: // or 'running'
        console.log('Upload is running');
        break;
    }
  }, function err(error) {
    // Handle unsuccessful uploads
  }, function complete() {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    window.alert('Upload Completed...');
    var downloadURL = uploadTask.snapshot.downloadURL;
    return downloadURL;
  });

// cancel form
document.getElementById('cancel').addEventListener('click', cancel);
  function cancel(){
//    window.alert("Canclled form");
var retVal = confirm("Do you want to Cancel ?");
  if( retVal == true ){
    window.location.href = "homepage.html";
   
  }
}

}