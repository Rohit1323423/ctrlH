// Create a "close" button and append it to each list item
// this will be done for each and every element of li items.
var current_user="piy";
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
alert("its me");
// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);


window.onload=function () {
  console.log("page is loaded first time");
  var db = firebase.firestore();
  db.collection("users").get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log("differnt users registered with us");
        console.log(doc.data().email);
      });
  }).catch(function(error) {
    console.log("Error getting document:", error);
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
  var li = document.createElement("li");
  var inputValue = document.getElementById("UserInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    //alert("You must write something!");
  } else {
    document.getElementById("myList").appendChild(li);
  }
  document.getElementById("UserInput").value = "";

  // uploading to firebase now
  console.log(timestamp);
  var db = firebase.firestore();
  db.collection("users").where("email", "==", "piy")
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
}
