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

var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
     ev.target.classList.toggle('checked');
     let clean_check=clean(ev.target.innerHTML);

     // upaating checked to firebase
     var db=firebase.firestore();
     db.collection("users").where("email", "==", current_user)
     .get()
     .then(function(querySnapshot) {
         querySnapshot.forEach(function(doc) {
           var refrence=db.collection("users").doc(doc.id).collection("timestamp").doc(timestamp).collection("todos");
           db.collection("users").doc(doc.id).collection("timestamp").doc(timestamp).collection("todos").get()
               .then(function(querySnapshot) {
                     querySnapshot.forEach(function(doc) {
                       //if(doc.data().content==e)
                       //alert(doc.data().content);
                      if(doc.data().content==clean_check){
                        //now update check or uncheck
                        refrence.doc(doc.id).update({
                            "checked" : "1"
                        }).then(function(){
                          console.log("updated  yess");
                        });
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


// db.collection("users").doc(doc.id).collection("timestamp").doc(timestamp).collection("todos").update({
//      checked : "1"
// })
// .then(function() {
//    console.log("Document successfully updated!");
//  });



window.onload=function () {
  console.log("page is loaded first time");
  var db = firebase.firestore();

  db.collection("users").where("email", "==", current_user)
  .get()
  .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        //db.collection("users").doc(doc.id).set
        db.collection("users").doc(doc.id).collection("timestamp").doc(timestamp).collection("todos").get()
            .then(function(querySnapshot) {
                  querySnapshot.forEach(function(doc) {
                      console.log(doc.data().content);
                      var li = document.createElement("li");
                      var inputValue = doc.data().content;
                      var t = document.createTextNode(inputValue);
                      li.appendChild(t);
                      document.getElementById("myList").appendChild(li);
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

                  })
             });
      });
   })
  .catch(function(error) {
    console.log("cannnot find username with ur username");
  });
}


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
  console.log(timestamp);
  var db = firebase.firestore();
  db.collection("users").where("email", "==", current_user)
  .get()
  .then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      //db.collection("users").doc(doc.id).set
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
      //console.log(doc.id, " => ", doc.id);
  });
  })
  .catch(function(error) {
    console.log("cannnot find username with ur username");
  });

// uploading finished
}
