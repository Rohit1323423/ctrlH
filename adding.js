function addfun(){
		var userInput=document.getElementById("UserInput").value ;
		var newItem = document.createElement("LI");
		var textnode = document.createTextNode(userInput);
		newItem.appendChild(textnode);

		var list=document.getElementById("myList");
		list.insertBefore(newItem , list.childNodes[0]);
}
