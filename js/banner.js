function deleteList(id){
	$("#deleteForm").find("input[name='id']").val(id);
	$("#deleteForm").submit();
}

function chgData(id){
	$.ajax({
		url:"/admin/banner/top",
		type: "get",//생략가능(기본값)
		dataType:"json",//생략가능(기본값)
		data:{id:id},
		success: function(res){
			// console.log(res);
			var $f = $("form[name='bannerTopForm']");
			$(".wr-title").html('<span class="text-primary">- 배너수정</span>');//div를 바꿀때
			$f.find("input[name='title']").val(res.title);//input을 바꿀때
			$f.find("input[name='link']").val(res.link);
			$f.find("textarea[name='desc']").val(res.desc);
			$f.find("select[name='position]").val(res.position);
			$f.find(".src-name").html(res.src);
			$f.find(".btn-primary").addClass("btn-success").removeClass("btn-primary").html('수정');
			$f.attr("action", "/admin/banner/top/" + res.id);
			// 수정이 여러번될 수 있기때문에 절대값으로 지정함.
		},
		error(xhr,status,error){
			console.log(xhr,status,error);
		}
	})
}