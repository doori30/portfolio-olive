/* EVENT */
//util에서 ajax를 만들어놔서 바로 사용이 가능하다.
$(document).ready(getData);
$("#bt-wr").click(postData);
$("#bt-up").click(putData);


/* CRUD */
function getData() {
	ajax("/rest-ajax", "get", {},renderData);
	//	console.log(res);
}

function postData(){
	var username = $("#username-wr").val().trim();
	if(username ==""){
		alert("이름을 입력해 주세요.");
		$("#username-wr").focus();
		return false;
	}
	ajax("/rest-ajax", "post", {username: username}, function(res){
		if(res.code == 200)getData();
		else alert("통신에 실패하였습니다");
		 $("#username-wr").val('');
	});
}

function putData(){
	var id = $("#id-up").val();
	var username = $("#username-up").val();
	ajax("/rest-ajax","put",{id:id,username:username},function(res){
		if(res.code == 200)getData();
		else alert("통신에 실패하였습니다");
		 $("#id-up").val('');
		 $("#username-up").val('').prop("disabled",true);
		 $("#bt-up").prop("disabled",true);
	});
}

/* DOM */
function chgData(btn){
	var id = $(btn).parent().find(".sp-id").text();
	var username = $(btn).parent().find(".sp-username").text();
	$("#id-up").val(id);
	$("#username-up").prop("disabled", false).val(username);
	$("#bt-up").prop("disabled", false);
	//$(btn).parent().find(".sp-id").text();//아이디가들어옴
};

function delData(btn){
	if(confirm("정말로 삭제하기겠습니까?"))
	var id = $(btn).parent().find(".sp-id").text();
	ajax("/rest-ajax","delete",{id:id},function(res){
		if(res.code == 200) getData();
		else alert("삭제에 실패하였습니다.");
	});
};


function renderData(res){
	var html ="";
	for(var i in res){//in 은 인덱스 값을 찾아주기 때문에 배열로 넣어서 찾아야함. 
	html += '<li class="p-3 m-1 d-flex border rounded">'
	html += '<span class="sp-id mr-2">'+res[i].id+'</span>'
	html += '<span class="sp-username mr-2">'+res[i].username+'</span>'
	html += '<button class="bt-del btn btn-danger btn-sm mr-2" onclick="delData(this)">삭제</button>'
	html += '<button class="bt-up btn btn-success btn-sm mr-2" onclick="chgData(this)">수정</button>'
	html += '</li>'
	}
	$(".lists").html(html);
}