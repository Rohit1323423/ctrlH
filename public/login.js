function login() {
  email=document.getElementById('username').value;
  password=document.getElementById('password').value;

  if(email!="" || password!=""){
    var db = firebase.firestore();
    let shopping=9 ;
    db.collection("users").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log("you are authentic users of firestore ");
            if(email==doc.data().email && password==doc.data().password){
                console.log(shopping);
                shopping=1;
                sessionStorage.setItem('userid',email);
               }
        });

        if(shopping==1)
            window.location="new_home.html";
        else
            document.getElementById('Errorinfo').innerHTML="No Username mapped with this account";
    });
  }
  else{
    alert("Either username or password empty");
  }
  
}
