// Create a "close" button and append it to each list item
// this will be done for each and every element of li items.
var current_user="a";
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("Erase");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

// This function is used to find out what the inner element of list item is so ..
//it can be used to remove element in firebase firestore

function clean(parameter){
    let ret="";
    let i=0;
    while(parameter[i]!='<'){
      ret+=parameter[i++];
    }
    return ret;
}


//HOW the heck other list element gets checked when it's not set
// Add a "checked" symbol when clicking on a list item

function close_fun(paramp){
  alert(paramp.data().content);
}


window.onload=function () {
  console.log("page is loaded first time");
  var db = firebase.firestore();
  db.collection("users").where("email", "==", current_user)
  .get()
  .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        db.collection("users").doc(doc.id).collection("timestamp").doc(timestamp).collection("todos").get()
            .then(function(querySnapshot) {
                  querySnapshot.forEach(function(doci) {

                      //rendering element for ths first time from database
                      var li = document.createElement("li");
                      var inputValue = doci.data().content;
                      var t = document.createTextNode(inputValue);
                      li.appendChild(t);
                      li.checked='true';
                      document.getElementById("myList").appendChild(li);
                      var span = document.createElement("SPAN");
                      //var txt = document.createTextNode("\u00D7");
                      var txt = document.createTextNode("Erase");
                      span.className = "close";
                      span.appendChild(txt);
                      li.appendChild(span);
                      span.onclick=function(){
                      var div = this.parentElement;
                      div.style.display = "none";
                      let toremove=clean(div.innerHTML);
                      db.collection("users").doc(doc.id).collection("timestamp").doc(timestamp).collection("todos").doc(doci.id).delete()
                            .then(function() {
                                console.log("Document successfully deleted!");
                                })
                            .catch(function(error) {
                                console.error("Error removing document: ", error);
                                });
                      }
                      //onclick ends


                  })
             });
      });
      var list = document.querySelector('ul');

      list.addEventListener('click', function(ev) {
        if (ev.target.tagName === 'LI') {
           ev.target.classList.toggle('checked');
           let clean_check=clean(ev.target.innerHTML);

           // upaating checked to firebase
           var db=firebase.firestore();
           db.collection("users").where("email", "==", current_user)
           .get()
           .then(function(querySnapshot){
               querySnapshot.forEach(function(doc) {
                 var refrence=db.collection("users").doc(doc.id).collection("timestamp").doc(timestamp).collection("todos");
                 db.collection("users").doc(doc.id).collection("timestamp").doc(timestamp).collection("todos").get()
                     .then(function(querySnapshot) {
                           querySnapshot.forEach(function(doc) {
                            if(doc.data().content==clean_check){
                              if(doc.data().checked=="0"){
                                // 0 means not completed
                                refrence.doc(doc.id).update({
                                    "checked" : "1"
                                }).then(function(){
                                  console.log("updated  yess");
                                });
                              }
                              else{
                                refrence.doc(doc.id).update({
                                    "checked" : "0"
                                }).then(function(){
                                  console.log("updated  yess");
                                });
                              }

                            }

                           })
                      });
               });
            })
           .catch(function(error) {
             console.log("cannnot find username with ur username");
           });
        }
      }, false);


   })
  .catch(function(error) {
    console.log("cannnot find username with ur username");
  });
}
//onload function (anonymous) ends

// Creating date to be used to store todos corresponding to that date
var date=new Date();
var month=date.getMonth()+1;
if(month<10){
  month="0"+month;
}
var day=date.getDate();
if(date.getDate()<10){
  day="0"+date.getDate();
}
var timestamp=""+date.getFullYear()+month+day;



// Create a new list item when clicking on the "Add" button
function addfun() {
  //creating element dynamically to insert
  var li = document.createElement("li");
  var inputValue = document.getElementById("UserInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert("You must write something!");
  }else {
    document.getElementById("myList").appendChild(li);
  }
  document.getElementById("UserInput").value = "";
  var span = document.createElement("SPAN");
  //var txt = document.createTextNode("\u00D7");
  var txt = document.createTextNode("Erase");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }

  // uploading to firebase now
  var db = firebase.firestore();
  db.collection("users").where("email", "==", current_user)
  .get()
  .then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      db.collection("users").doc(doc.id).collection("timestamp").doc(timestamp).collection("todos").add({
          checked : "0" ,
          content : inputValue
          })
      .then(function() {
          console.log("your current to do went to database");
          })
      .catch(function(error) {
          console.error("Error writing document: ", error);
          });
       });
  })
  .catch(function(error) {
    console.log("cannnot find username with ur username");
   });
// uploading finished
}
