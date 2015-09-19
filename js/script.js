// JavaScript Document

var subtitleFadeSpeed = 1000;	//「A long time ago in a galaxy...」のフェードスピード
var subtitleShowTime = 5000;	//「A long time ago in a galaxy...」の表示時間
var titleShowTime = 7000;		//タイトルの表示時間
var titleSpeed = 4000;			//タイトルのスケールのスピード
var storySpeed = 70000;			//ストーリーのスクロールスピード
var storyTiming = 3000;			//ストーリーのアニメーションを開始するタイミング
var perspective = 70;			// 3D変形の奥行きの深さ
var degree = 8;					// ストーリーの傾き
var starNum = 200;				//星の数
var audio;						//オーディオ
var resizeTimer;				//ウィンドウリサイズ時の終了タイマー

$(function(){
	
	/* 初期化
	---------------------------------------*/
	function init (){

		$('body').css({
			overflow : 'hidden'
			,backgroundColor:'#000'	
		})
		
	
		$('.background').css({
			display:'none'
		})
		
		$('p.subtitle').css({
			display:'none'
			,color: '#1e63bb'
			,fontSize :'48px'
			,position : 'fixed'
			,margin:0
			,padding:0
		})
		
		$('h1.title').css({
			position : 'fixed'
			,paddingRight : '1px'
		})
		
		
		$('h1.title img').css({
			width:'100%'
			,opacity : 0
		})
		
		$('.prot').css({
			position:'absolute'
			,color:'#FF0'
			,width:'1000px'
			,height:'2000px'
			,fontSize:'48px'
			,perspective: perspective + 'px'
		})
			
		$('.prot_inner').css({
			width:'1000px'
			,height:'2000px'
			,transform : 'rotateX(' + degree + 'deg )'
			,overflow:'hidden'
		})
		
		$('.prot_text').css({
			marginTop:'1100px'
		})	
		
		//オーディオが存在している場合に代入
		if($('#audio').length){
			audio = document.getElementById("audio");
		}
		
	}
	
	
	
	/*　ウィンドウリサイズ
	-----------------------------------------------------------------------*/
	
	//リサイズイベント
	$(window).resize(function(){
		resize();
	})
	
	//リサイズ
	function resize(){
		
		$('.background').css({
			width : $(window).width()
			,height : $(window).height()
		})
		
		$('p.subtitle').css({
			top:($(window).height() - $('p.subtitle').height()) / 2 + 'px'
			,left:($(window).width() - $('p.subtitle').width()) / 2 + 'px'
		})
		
		$('h1.title').css({
			width : $(window).width() * 0.8 + 'px'
		})
		
		$('h1.title').css({
			left : ($(window).width() - $('h1.title').width()) / 2 + 'px'
			,top  : ($(window).height() - $('h1.title').height()) / 2 + 'px'
		})
		
		$('.prot').css({
			left : ($(window).width() - $('.prot').width()) / 2 + 'px'
			,top  : ($(window).height() - $('.prot').height()) / 2 + 300 + 'px'
		})
		if(resizeTimer){
			resizeTimer = clearTimeout();
		}
		
		resizeTimer = setTimeout(function(){resizeEnd()}, 200);
	}
	
	//リサイズ終了時の処理
	function resizeEnd(){
		repositionStar();	//星のポジションを再設定
	}
	
	
	
	/* 星
	-----------------------------------------------------------------------*/
	
	//星の生成
	function makeStar(){
		$('.background').empty();
		
		for(var i = 0;i < starNum; i++){
			var star = $('<div>');
			star.addClass('star');
			var position = starPosition(star);
			var size = 4 * Math.random();
			
			star.css({
				top : position['top'] + 'px'
				,left : position['left'] + 'px'
				,width : size + 'px'
				,height : size + 'px'
				,borderRadius : size / 2 + 'px'
			})

			$('.background').append(star);
				
					
		}
		$('.star').css({
			background : '#FFF'
			,position : 'absolute'
	
		})
	}
	
	//星の位置の再設定
	function repositionStar(){
		$('.star').each(function(){
			var position = starPosition($(this))
			$(this).css({
				top : position['top'] + 'px'
				,left : position['left'] + 'px'
			})
		
		})
			
		
	}
	
	//星の位置を返す
	function starPosition(star){
		return {top : $('.background').height() * Math.random(),left : $('.background').width() * Math.random()}
	}
	
	
	
	
	/* タイトル
	-----------------------------------------------------------------------*/
	function Showtitle(){
		//オーディオがあれば再生
		if(audio){
			audio.play();
		}
		
		$('.background').fadeIn();
		$('h1.title img').fadeTo(1000,1,
			function(){
				setTimeout(
					function(){
						$('h1.title img').fadeOut(1000)
					}
				,titleShowTime)
			}
		)
	
		$('h1.title').animate({paddingRight:0},{
			//10秒かけてアニメーション
			duration:10000,
			//stepは、アニメーションが進むたびに呼ばれる
			step:function(now){
				//nowに現在のpadding-rightの値が渡してもらえる
				//0から1に向かって変化していくnowを利用してscaleさせてみる
				$(this).css({transform:'scale(' + now  + ')'});
			
			}})
			
		setTimeout(function(){ShowStory()},storyTiming)
	}
	
	/* ストーリーのアニメーション
	-----------------------------------------------------------------------*/
	function ShowStory(){
		$('.prot_text').animate({
			marginTop:'-1300'
		},storySpeed)
	}
	
	/* ページ読み込み完了時
	---------------------------------------*/
	$(window).load(function(){

		start();
		resize();
	})
	init();


	/* スタート
	---------------------------------------*/
	function start(){
		/* 星の生成
		---------------------------------------*/
		makeStar();
		/* show prot
		---------------------------------------*/
		setTimeout(function(){
			$('p.subtitle').fadeIn(subtitleFadeSpeed,function(){
				setTimeout(function(){$('p.subtitle').fadeOut(subtitleFadeSpeed,function(){Showtitle()})},subtitleShowTime)
			})	
		},500)
	}
	
	
	
})