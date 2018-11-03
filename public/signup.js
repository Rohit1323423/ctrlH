function signup(){
  email=document.getElementById('username').value;
  password=document.getElementById('password').value;
  var db = firebase.firestore();
//---------------------------------------//
var stopping=9;
console.log("before " ,stopping);
  db.collection("users").get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        if(email==doc.data().email && password==doc.data().password){
            console.log("found data in database... already present" , doc.data());
            stopping=1;
          }
      });
      if(stopping==1){
          alert("already have an account");
          window.location="home.html";
      }
      else{
          db.collection("users").add({
              email : email ,
              password : password
          })
          .then(function() {
              alert("registering you in our database");
              window.location="home.html";
          })
          .catch(function(error) {
              console.error("Error writing document: ", error);
          });

        }
  }
);
}
