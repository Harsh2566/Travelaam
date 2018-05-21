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
function submitdom(e){
    e.preventDefault();

    //get values
    var did= getinputval('domid');
    var dname= getinputval('domname');
    var dimg= getinputval('domimg');
    var dprice= getinputval('domprice');
    var doffer= getinputval('domoffer');
    var ddays= getinputval('domdays');
    var dnights= getinputval('domnight');
    var dflight= getinputval('domflight');
    var dtrain= getinputval('domtrain');
    var dcar= getinputval('domcar');
    var dbre= getinputval('dombre');
    var dl= getinputval('doml');
    var dbru= getinputval('dombru');
    var ds= getinputval('doms');
    var dd= getinputval('domd');
    var dhd= getinputval('domhoteld');
    var dstar= getinputval('domhstar');
    var ddetails= getinputval('domdetails');

    writeUserData(did, dname, dimg, dprice, doffer, ddays, dnights, dflight, dtrain, dcar, dbre, dl, dbru, ds, dd, dhd, dstar, ddetails);
    window.location.href = "homepage.html";
}

function writeUserData(did, dname, dimg, dprice, doffer, ddays, dnights, dflight, dtrain, dcar, dbre, dl, dbru, ds, dd, dhd, dstar, ddetails) {
    firebase.database().ref('package/domestic/id/' + did).set({
      Package_Name: dname,
      image: dimg,
      price: dprice,
      offer: doffer,
      duration: {days: ddays, nights: dnights},
      Package_details: ddetails,
      transport:{flight: dflight, train: dtrain, car: dcar},
      meal_plan:{breakfast: dbre, lunch: dl, brunch: dbru, supper: ds, dinner: dd},
      hotel: {star: dstar, hdetail: dhd}
    });
    window.alert('Form Submitted Successfully.....');

    
  }

//funtion to get values 

function getinputval(id){
    return document.getElementById(id).value;
}

//check box selection
function checkbox(checkbox){
  if (checkbox.checked) {
    document.getElementById(checkbox.id).value = "yes";
}else {
    document.getElementById(checkbox.id).value = "no";
}
}

//upload file
function upload(){
    var file= event.target.files[0];
    var filename= file.name;
    var storageref=firebase.storage().ref('domestic/'+ filename);
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
    alert(error);
  }, function complete() {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    window.alert('Image Upload Completed...');
    var downloadURL = uploadTask.snapshot.downloadURL;
    return downloadURL;
  });

}

// cancel funtion
function cancel(){

  var retVal = confirm("Do you want to Cancel ?");
  if( retVal == true ){
    window.location.href = "homepage.html";
  }

}