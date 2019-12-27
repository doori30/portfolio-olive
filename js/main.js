/* Ready-페이지가 로드될 때 일어날 일들. */
//상단 배너 가리기
var topClose = $.cookie("top-banner-close");
if (topClose) $(".top-banner").hide();

$("body").click(function () {
	$(".sch-layer").hide();
})

/* header */
/* header의 x버튼 클릭 */
/* 
//cookie를 사용하지 않고 닫을 때 ->새로고침하면 보여진다.
$("#bt-top-close").click(function(){
	$(".top-banner").stop().slideUp(300);
}); */

// //cookie로 제한시간을 10분 줄 때
// $("#bt-top-close").click(function(e){
//   $(".top-banner").stop().slideUp(300);
//   var d = new Date();
//   d.setTime(d.getTime() + 10*60*1000); //5분 60초 *1000ms
//   //+10분 동안 쿠키 유지
//   $.cookie("top-banner-close", true, {expires: d}); 
//   //expires:1하루/ 시간을 바꿀 때 데이트 객체(d)를 넣어 지정해줌.
// });

// cookie로 제한시간을 10분 줄 때 
$("#bt-top-close").click(function (e) {
	// e.stopPropagation(); //상위 이벤트에 안걸리게 해줌,
	$(".top-banner").stop().slideUp(300);
	var d = new Date();
	d.setTime(d.getTime() + 1 * 60 * 1000); // 10분동안 쿠키 유지
	$.cookie("top-banner-close", true, {
		expires: d
	});
});

//언어 , 통화 선택
$(".sel-top .fa-angle-down").click(function () {
	$(this).next().stop().slideToggle(300);
	$(this).toggleClass("fa-angle-down fa-angle-up");
	// $(this).toggleClass("fa-angle-down");
	// $(this).toggleClass("fa-angle-up");
});
$(".sel-top li").click(function () {
	$(this).parent().parent().children(".sel-top-img").attr("src", $(this).children("img").attr("src"));
	$(this).parent().parent().children(".sel-top-txt").text($(this).children("span").text());
	$(this).parent().prev().trigger("click");
});
//▲
// $(".sel-top li").click(function(){
//   var src = $(this).find("img").attr("src"); //getter-가져옴
//   var txt = $(this).find("span").attr("src");
//   $(this).parent().parent().find(".sel-top-img").attr("src",src); //setter-보여줌
//   $(this).parent().parent().find(".sel-top-txt").text(txt);
//   $(this).parent().prev().trigger("click");
// });

/* Search */
$(".sch-txt").click(function (e) {
	e.stopPropagation();
	$(".sch-layer").stop().show();
});
$(".sch-layer").click(function (e) {
	e.stopPropagation();
})

/* navi sub내용 보이기 2가지 */
//메인 네이게이션
/* $(".navi-under").mouseenter(function () {
	$(this).find(".subs").css({
		"visibility": "visible"
	}).stop().animate({
		"top": "43px",
		"opacity": 1
	}, 300);
});
$(".navi-under").mouseleave(function () {
	$(this).find(".subs").stop().animate({
		"top": "143px",
		"opacity": 0
	}, 300, function () {
		$(this).css({
			"visibility": "hidden"
		});
	});
});
$(".navi-show").mouseenter(function () {
	$(this).find(".subs").css({
		"visibility": "visible"
	}).stop().animate({
		"opacity": 1
	}, 300);
});
$(".navi-show").mouseleave(function () {
	$(this).find(".subs").stop().animate({
		"opacity": 0
	}, 300, function () {
		$(this).css({
			"visibility": "hidden"
		});
	});
});


//배너-(fade, slide(전체), slide(하나씩), slide(세로))
//메인배너
(function () {
	var now = 0;
	var speed = 500;
	var delay = 3000;
	var interval;
	var arr = [];
	var $li = $(".main-ban").children();
	var len = $li.length;
	init();
	interval = setInterval(ani, delay, "-200%");

	function init() {
		//prev
		// if (now == 0) arr.push(len - 1);
		// else arr.push(now - 1);
		//양옆으로 하나씩 있는 구조
		arr[0] = (now == 0)?len - 1 : now - 1;
		arr[1] = now; //now
		arr[2] = (now == len-1)?arr[2]=0:arr[2]=now+1;//next
		// arr.push(now);
		//next
		// if (now == len - 1) arr.push(0);
		// else arr.push(now + 1);
		$(".main-ban").empty();
		$(".main-ban").append($li[arr[0]]);
		$(".main-ban").append($li[arr[1]]);
		$(".main-ban").append($li[arr[2]]);
		$(".main-ban").css({"left": "-100%"});
	}

	function ani(tar) {
		$(".main-ban").stop().animate({"left": tar}, speed, function(){
			// (tar == 0)?(now==0)?now=len-1:now--:(now=len-1)?now=0:now++;
			if(tar == 0) {
				if(now == 0) now = len - 1;
				else now--;
			}
			else {
				if(now == len - 1) now = 0;
				else now++;
			}
			init();
		});
	}
	$(".pager-prev").click(function(e){
		ani(0);
	});
	$(".pager-next").click(function(e){
		ani("-200%");
	});
	$(".main-bans").mouseover(function(){
		clearInterval(interval);
	}).mouseleave(function(){
		clearInterval(interval);
		interval = setInterval(ani, delay, "-200%");
	});
})(); */

// fx-slide : 메인 배너
/* <li>
<img src="../img/slide-img/slideshow-1-compressor.jpg" alt="메인배너" class="img">
<ul class="ban-conts lt20">
<li class="ban-tit">COSMOPOLIS</li>
<li class="ban-bar"></li>
<li class="ban-cont">Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet
	consectetur adipisicing elit.</li>
<li class="ban-bt">
	<span class="bt-ban-link bt-rev">SHOP THE COLLECTION</span>
</li> */

$.ajax({
	url: "/api/ban/main",
	success : function(res){
		var html="";
		var folder = "";
		// console.log(res);
		for(var i in res){
			folder = findPath(new Date (Number(res[i].src.split("-")[0])));
			html += '<li>';
			html += '<img src="/uploads/'+folder+'/'+res[i].src+'" alt="메인배너" class="img">';
			if(res[i].desc !="") html += res[i].desc;
			html += '</li>';
		}
		$(".main-ban").append(html);
		$(".main-ban").imagesLoaded(function(){
			new FxSlide({
	 slides: $(".main-ban"), 
	 cnt: 1, 
	 speed: 1000,
	 delay: 4000,
	 pager : $(".pagers")
 });
		});
	}
});



// FxSlide: 서브배너
 new FxSlide({
	slides: $(".best-items"), 
	cnt: 5, 
	prev: $("#best-prev"),
	next: $("#best-next"),
	direction: "toRight",
	autoplay : false//멈추기
});
 new FxSlide({
	slides: $("#seller-slide"), 
	cnt: 3, 
	prev: $("#seller-prev"),
	next: $("#seller-next"),
});
 new FxSlide({
	slides: $("#seller-slide2"), 
	cnt: 3, 
	prev: $("#seller-prev2"),
	next: $("#seller-next2"),
	direction : "toRight"
});
 new FxSlide({
	slides: $("#choice-wrap"), 
	cnt: 5, 
	prev: $("#choice-prev"),
	next: $("#choice-next"),
	direction : "toRight"
});
 new FxSlide({
	slides: $("#choice-wrap1"), 
	cnt: 5, 
	prev: $("#choice-prev1"),
	next: $("#choice-next1"),
	direction : "toRight"
});
 new FxSlide({
	slides: $("#choice-wrap2"), 
	cnt: 5, 
	prev: $("#choice-prev2"),
	next: $("#choice-next2"),
	direction : "toRight"
});
 new FxSlide({
	slides: $(".brand-items"), 
	cnt: 5, 
	prev: $("#brand-prev"),
	next: $("#brand-next"),
	direction : "toRight"
});
 new FxSlide({
	slides: $(".insta-items"), 
	cnt: 5, 
	prev: $("#insta-prev"),
	next: $("#insta-next")
});

$(".choice-navi").click(function(){
	var num = $(this).index();
	$(".choice-navi").removeClass("active");
	$(this).addClass("active");
	$(".choice-wrap").hide();
	$(".choice-wrap").eq(num).show();
})

// init Masonry
var $grid = $('.grid-wrap').imagesLoaded(function () {
	//모든이미지가 로딩이 되면 실행.
	//혹은 리사이즈될 때 실행이 된다.
	$grid.masonry({
		// set itemSelector so .grid-sizer is not used in layout
		itemSelector: '.grid-item',
		// use element for option
		columnWidth: '.grid-sizer',
		percentPosition: true
	});
	//display:none이 되면 표현이 되지않아 css를 적용 시키지 않는다.
});