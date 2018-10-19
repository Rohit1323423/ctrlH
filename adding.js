function addfun(){
		var userInput=document.getElementById("UserInput").value+"<br>" ;
		var newItem = document.createElement("button");
		newItem.onclick=function(){
			console.log("all right");
			this.remove();
		}
		var textnode = document.createTextNode(userInput);
		newItem.appendChild(textnode);
		var list=document.getElementById("myList");
		list.insertBefore(newItem , list.childNodes[0]);
}
