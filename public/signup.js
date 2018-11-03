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
  });
  console.log("after " ,stopping);
  if(stopping===1){
      alert("already have an account");
  }
  if(stopping!=1){
      alert("registering you in our database");
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
}
