/*
var FxSLide = function(){
	function FxSlide(){

	}
	return FxSlide;
}) ();

//사용자가 쓰는 법
 var obj = {
	slides : $(".slides"),//필수 
	speed : 500, //애니메이션 속도
	delay : 3000, //딜레이
	autoplay : true(기본),false(멈춤) //자동움직임(def:true)
	direction : "toLeft",  //"toLeft","toRight" (def:"toLeft")
	cnt : 5 //화면에 보이는 갯수(이미지)
	prev : $(".pager-prev"),
	next : $(".pager-next"),
	pager : $(".pagers") 
	//숨어있는 이미지를 교체해서 보여 줄 것. / 넣거나 말거나

} 
var slide1 = new.Fxslide(obj);
*/
var FxSlide = (function () {
	function FxSlide(obj) {
		this.now = 0;
		this.isAni = false;
		this.slides = $(obj.slides); //없으면 돌아가지 않음.
		this.prev = obj.prev ? $(obj.prev) : $(".pager-prev");
		this.next = obj.next ? $(obj.next) : $(".pager-next");
		this.slide = this.slides.children();
		this.len = this.slide.length;
		this.cnt = obj.cnt ? Number(obj.cnt) : 1;
		this.speed = obj.speed ? Number(obj.speed) : 500;
		this.delay = obj.delay ? Number(obj.delay) : 3000;
		this.tar = 100 / this.cnt;
		this.width = this.tar * 2 + 100; //container width값
		this.pagers = (obj.pager && this.cnt == 1) ? $(obj.pager) : false;
		//페이저가 존재하고 변수가 1이라면 실행 아니면 false
		if (this.pagers) this.pager = this.pagers.children();
		this.direction = obj.direction == "toRight" ? 0 : -1; //고정(변함이 없음.)
		this.dir = this.direction; //수시로 변함
		this.autoplay = obj.autoplay == false ? false : true; //fasle인 경우에만 해당됨.
		this.interval = null;
		this.arr = [];
		if(this.slides.css("position") == "stactic") this.slides.css({"position":"relative"});
		this.slides.parent().css({"overflow":"hidden"})
		this.startInit(this); //객체생성시 한번만 실행
		this.init(); //this->FxSlide //애니메이션이 종료되면 실행
		if (this.autoplay) this.interval = setInterval(this.ani, this.delay, this); //Window
	}
	FxSlide.prototype.startInit = function (obj) {
		obj.prev.click(function (e) {
			if(obj.isAni)return false;
			obj.dir = 0;
			obj.ani(obj);
		});
		obj.next.click(function (e) {
			if(obj.isAni)return false;
			obj.dir = -1;
			obj.ani(obj);
		});
		if (obj.autoplay) {
			obj.slides.parent().mouseover(function () {
				clearInterval(obj.interval);
			}).mouseleave(function () {
				clearInterval(obj.interval);
				obj.interval = setInterval(obj.ani, obj.delay, obj);
			});
		}
		if (obj.pagers) {
			obj.pager.click(function () {
				if(obj.isAni)return false;
				obj.now = $(this).index();
				obj.pager.removeClass("active");
				$(this).addClass("active");
				//기존의 셋팅되어 있는 그림을 바꾸는 곳
				//init으로 셋팅이 되어있고 클릭하면 바뀜
				if (obj.dir == 0) obj.slides.children().eq(0).html($(obj.slide[obj.now]).html());
				//html원본을 읽어다가 html로 덮음
				else obj.slides.children().eq(2).html($(obj.slide[obj.now]).html());
				// obj.slides.append($(obj.slide[obj.arr[obj.now]]).clone());
				obj.ani(obj, true); //true=click
				//인자 두개를 받는데 하나만 있는 곳은 undefined가 됨(false)
			});
		}
	}
	FxSlide.prototype.init = function () {
		// console.log(this);
		this.arr = [];
		this.arr.push((this.now == 0) ? this.len - 1 : this.now - 1); //왼쪽 (prev)
		this.arr.push(this.now); //me
		for (var i = 0; i < this.cnt; i++) this.arr.push((this.now + i + 1) % this.len); //오른쪽 (next)
		//if(this.len - 1 <  now + i + 1)
		//마지막 놈의 인덱스값.
		//모드연산자는 나머지 4/3=1 5/3=2
		this.slides.empty();
		for (i in this.arr) this.slides.append($(this.slide[this.arr[i]]).clone());
		//배열의 갯수만큼 for문을 돌림 / 슬라이드에 이미지 3개li가 있고(배열),움직일 li을 복제하여 붙임. 
		this.slides.css({
			"width": this.width + "%",
			"left": -this.tar + "%"
		});
	}
	FxSlide.prototype.ani = function (obj, isClick) {
		//																		true라면
		obj.isAni = true;
		if (!isClick) {
			if (obj.dir == 0)(obj.now == 0) ? obj.now = obj.len - 1 : obj.now--;
			else(obj.now == obj.len - 1) ? obj.now = 0 : obj.now++;
			if (obj.pagers) {
				$(obj.pager).removeClass("active");
				$(obj.pager).eq(obj.now).addClass("active");
			}
		}
		obj.slides.stop().animate({
				"left": (obj.dir * obj.tar * 2) + "%"
			}, obj.speed,
			function () {
				obj.isAni = false;
				obj.dir = obj.direction;
				obj.init();
			});
	}
	return FxSlide;
})();