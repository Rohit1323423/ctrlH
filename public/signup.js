function signup(){
  email=document.getElementById('username').value;
  password=document.getElementById('password').value;
  var db = firebase.firestore();
//---------------------------------------//
let stopping;
  db.collection("users").get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        if(email==doc.data().email && password==doc.data().password){
            console.log("found data");
            window.location="home.html";
            stopping=1;
          }
      });
  });

if(stopping==1)
  return true;

alert("script runnign");

  db.collection("users").add({
    email : email ,
    password : password
    })
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });




}
