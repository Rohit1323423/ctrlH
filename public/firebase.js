var db = firebase.firestore();

// Add a new document in collection "cities"
function addfun(){


db.collection("cities").doc("LA").set({
    name: "Lucknow",
    state: "CA",
    country: "USA"
})
.then(function() {
    console.log("Document successfully written!");
})
.catch(function(error) {
    console.error("Error writing document: ", error);
});

}
