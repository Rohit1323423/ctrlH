
window.onload=function(){
	//localStorage.clear();
	console.log(localStorage.length);
	let arr = JSON.parse(localStorage.getItem("name"));
	if(arr==null )	{
		console.log("empty list");
	}else {
		let chola=JSON.parse(localStorage.getItem("name"));
		for(let x=0;x<chola.length;x++){
			var newItem = document.createElement("button");
			var userInput=chola[x];
				newItem.onclick=function(){
						console.log(this.innerHTML);
						let pass=this.innerHTML;
						removefromstorage(pass);
						this.remove();
					}
			var textnode = document.createTextNode(userInput);
			newItem.appendChild(textnode);
			var list=document.getElementById("myList");
			let blank=document.createElement("br");
			list.insertBefore(blank,list.childNodes[0]);
			list.insertBefore(newItem , list.childNodes[0]);
		}
	}
}
function addfun() {
	let arr = JSON.parse(localStorage.getItem("name"));
	if(arr==null)
			arr=[];
	if(document.getElementById("UserInput").value!="")
			arr.push(document.getElementById("UserInput").value);
	document.getElementById("UserInput").value="";
	localStorage.setItem("name",JSON.stringify(arr));
	let chola=JSON.parse(localStorage.getItem("name"));

	document.getElementById("myList").innerHTML="";
	for(let x=0;x<chola.length;x++){
		var newItem = document.createElement("button");
		var userInput=chola[x];
			newItem.onclick=function(){
					console.log(this.innerHTML);
					let pass=this.innerHTML;
					removefromstorage(pass);
					this.remove();
				}
		var textnode = document.createTextNode(userInput);
		newItem.appendChild(textnode);
		var list=document.getElementById("myList");
		let blank=document.createElement("br");
		list.insertBefore(blank,list.childNodes[0]);
		list.insertBefore(newItem , list.childNodes[0]);
	}
}
function removefromstorage(thi){
			let arr = JSON.parse(localStorage.getItem("name"));
			var index = arr.indexOf(thi);
			if (index !== -1) arr.splice(index, 1);
			localStorage.setItem("name",JSON.stringify(arr));
}
