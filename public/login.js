function login() {
  email=document.getElementById('username').value;
  password=document.getElementById('password').value;
  var db = firebase.firestore();
  //---------------------------------------//
  let shopping=9 ;
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
  if(shopping==1)
      window.location="home.html";
  else
      document.getElementById('Errorinfo').innerHTML="No Username mapped with this account";
}
