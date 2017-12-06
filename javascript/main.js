//Submit Listener
document.getElementById('myform').addEventListener('submit',savebookmark);

function savebookmark(e){
	//get values from form
	var sitename=document.getElementById('sitename').value;
	var siteurl=document.getElementById('siteurl').value;
	if(!validform(sitename,siteurl)){
		return false;
	}

	var bookmark={
		name:sitename,
		url:siteurl
	}

	//Local Storage
	if(localStorage.getItem('bookmarks')===null){
		var bookmarks=[];
		bookmarks.push(bookmark);
		console.log(bookmarks);
		localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
	}else{
		var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
		bookmarks.push(bookmark);
		console.log(bookmarks);
		localStorage.setItem('bookmarks',JSON.stringify(bookmarks))
	}
	document.getElementById('myform').reset();
	showbookmarks();
	//prevent default behaviour of browser
	e.preventDefault();
}
function showbookmarks(){
	var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
	var bookmarkresults=document.getElementById('bookmarkresults');
	bookmarkresults.innerHTML='<h4>'+"Saved Bookmarks :"+'</h4>';

	for(var i=0;i<bookmarks.length;i++){
		var name=bookmarks[i].name;
		var url=bookmarks[i].url;
		bookmarkresults.innerHTML += '<div class="well">'+'<h6>'
		+name+"-"+ 
		'<a class="btn btn-primary" target="_blank" href="'+url+'">Visit Webpage</a>'+
		'<button onclick="deletebookmark(\''+url+'\')"><a class="btn btn-danger" href="#">Delete</a></button>'+'</h6>'+'</div>';
	}

}

function deletebookmark(url){
	var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
	for(i=0;i<bookmarks.length;i++)
	{
		if(bookmarks[i].url==url)
			bookmarks.splice(i,1);
	}
	localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
	showbookmarks();
}
function validform(sitename,siteurl){
	
	if(!sitename || !siteurl){
		alert('Please Fill All The Fields');
		return false;
	}
	var expression=/^(?:(?:https?|http):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
	var regex = new RegExp(expression);
	if(!siteurl.match(regex)){
		alert('Please Use Valid URL');
		return false;
	}
	else
		return true;
}
