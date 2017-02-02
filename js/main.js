// JavaScript Document


window.onload=function(){
	wm.app.bannerTab();
	wm.app.sexTab();
	wm.app.sBanner();
	wm.app.jiankang();
	wm.app.c2Tab();
	wm.app.goTop();
	wm.app.showNav();
};
function getStyle(obj,attr){
	return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr]
}
var wm = {};

wm.tools = {};
wm.tools.getClass=function(oParent,sClass)
{
	var aEls = oParent.getElementsByTagName('*');
	var aResult = [];
	var re = new RegExp('\\b' + sClass + '\\b','i');
	
	for(var i=0;i<aEls.length;i++)
	{
		if(re.test(aEls[i].className))
		{
			aResult.push(aEls[i])
		}
	}
	return aResult;
}
//检测数组中是否有某个值 如有有返回他的位置，没有返回-1
wm.tools.arrIndexOf=function(arr,v){
	for(var i=0;i<arr.length;i++)
	{
		if(arr[i]==v)
		{
			return i
		}
	}
	return -1
};
//添加className
wm.tools.addClass=function(obj,className){
	if(obj.className=='')
	{
		obj.className = className
	} else
	{
		var aClassName = obj.className.split(' ')
		var _index = wm.tools.arrIndexOf(aClassName,className)
		if(_index == -1)
		{
			obj.className+=' ' + className
		}
	}
};
//删除className
wm.tools.removeClass=function(obj,className)
{
	var aClassName = obj.className.split(' ')
	var _index = wm.tools.arrIndexOf(aClassName,className)
	if(_index != -1)
	{
		aClassName.splice(_index,1);
		obj.className = aClassName.join(' ')
	}
}
wm.ui = {};

wm.ui.move=function(obj,attr,target,endFn){
	clearInterval(obj.timer)
	obj.timer = setInterval(function(){
		var k = target-parseInt(getStyle(obj,attr))
		var Speed =k/10
		Speed = k>0?Math.ceil(Speed):Math.floor(Speed)
		if(parseInt(getStyle(obj,attr)) == target)
		{
			clearInterval(obj.timer)
			endFn&&endFn()
		} else{
			obj.style[attr] = parseInt(getStyle(obj,attr))+ Speed +"px"	
		}
	},30)
};
wm.ui.rightTab = function( obj,n,endFn ){
		var aLi = obj.getElementsByTagName("li");
		if(obj.onOff)
		{
			endFn&&endFn();
			obj.onOff = false;
			for(var i=0;i<n;i++)
			{
				obj.appendChild(aLi[i].cloneNode(true));
				obj.style.width = aLi[0].offsetWidth*aLi.length + "px"
			};
			wm.ui.move(obj,'left',-aLi[0].offsetWidth*n,function(){
				for(var i=0;i<n;i++){
					obj.removeChild(aLi[0])
					obj.style.left=0;
					obj.onOff = true;
					
				};
			});
		};
	
};
wm.ui.leftTab = function( obj,n,endFn){
	var aLi = obj.getElementsByTagName("li");
	if(obj.onOff)
	{
		endFn&&endFn();
		obj.onOff = false;
		for(var i=0;i<n;i++)
		{
			obj.insertBefore(aLi[aLi.length-1-i].cloneNode(true),aLi[0])
			obj.style.width = aLi[0].offsetWidth*aLi.length + "px";
			obj.style.left = -aLi[0].offsetWidth*(i+1)+'px';
		};
		wm.ui.move(obj,'left',0,function(){
			for(var i=0;i<n;i++){
				obj.removeChild(aLi[aLi.length-1])
				obj.style.left=0;
				obj.onOff = true;
			}
		});
	};
};
wm.ui.showTab = function(ul,div){
	var aImg =div.getElementsByTagName("a");
	var aA = ul.getElementsByTagName("a");
	for(var i=0;i<aA.length;i++)
	{
		aA[i].index = i;
		aA[i].onmouseover=function(){
			for(var i=0;i<aA.length;i++)
			{
				aA[i].className = '';
				aImg[i].className = 'hidden';
			};
			this.className = 'active';
			aImg[this.index].className = '';
		};
	};
};
wm.ui.goToWhere=function(where)
{
	var me = this;
	clearInterval(me.interval);
	me.size=[];
	var dom = !/.*chrome.*/i.test (navigator.userAgent) ? document.documentElement : document.body;
	var height = !!where ? dom.scrollHeight : 0;
	me.interval = setInterval (function ()
	{
		var speed = (height - dom.scrollTop) / 16;
		if (speed == me.size[0])
		{
			clearInterval (me.interval);
			return null;
		}
		dom.scrollTop += speed;
		me.size.unshift (speed);
	}, 16);
};


wm.app = {};

wm.app.bannerTab = function(){
	var oUl = document.getElementById("bannerBig");
	var oPrev = document.getElementById("prev1");
	var oNext = document.getElementById("next1");
	
	var oBtn = document.getElementById("bannerBtn");
	var aBtn = oBtn.getElementsByTagName("li");
	var iNow = 1;
	var timer = null;
	var num = 0;
	// 左右切换
	oUl.onOff = true;
	function playAuto(){
		wm.ui.rightTab(oUl,iNow,function(){
			for(var i=0;i<aBtn.length;i++)
			{
				aBtn[i].className = '';
			};
			num++;
			if(num>aBtn.length-1) num = 0;
			aBtn[num].className = 'on';
		});
	};
	timer = setInterval(playAuto,5000);
	oNext.onclick=function(){
		playAuto()
		
	};
	oPrev.onclick=function(){
		wm.ui.leftTab(oUl,iNow,function(){
			for(var i=0;i<aBtn.length;i++)
			{
				aBtn[i].className = '';
			};
			num--;
			if(num<0) num = 0;
			aBtn[num].className = 'on';
		})
	};
	// 按钮点击切换
	for(var i=0;i<aBtn.length;i++)
	{
		aBtn[i].index = i;
		aBtn[i].onclick=function(){
			if(oUl.onOff)
			{
				for(var i=0;i<aBtn.length;i++)
				{
					if(aBtn[i].className=='on')
					{
						num = aBtn[i].index;
					};
					aBtn[i].className = '';
				};
				this.className = 'on';
				if(this.index>num)
				{
					wm.ui.rightTab(oUl,this.index-num)
				} 
				else
				{
					wm.ui.leftTab(oUl,num-this.index)
				};
				num = this.index;
			};
		};
	};
};
wm.app.sexTab = function(){
	var aLi = document.getElementById('sexList').getElementsByTagName('li');
	var n = 0;
	
	for(var i=0;i<aLi.length;i++)
	{
		(function(i){
			
			aLi[i].onmouseover=function(){
				
				aLi[n].className = '';
				this.className = 'active';
			};
			
			aLi[i].onmouseout=function(){
				n = i;
			};
			
		})(i)
		
	};
};
wm.app.sBanner = function(){
	var oUl = document.getElementById("smallBanner");
	var oPrev = document.getElementById("prev2");
	var oNext = document.getElementById("next2");
	var iNow = 3;
	
	// 左右切换
	oUl.onOff = true;
	oNext.onclick=function(){
		wm.ui.rightTab(oUl,iNow);
		
	};
	oPrev.onclick=function(){
		wm.ui.leftTab(oUl,iNow)
	};
};
wm.app.jiankang = function(){
	var oUl = wm.tools.getClass(document,'rightList');
	var oDiv = wm.tools.getClass(document,'leftImg');

	for(var i=0;i<oUl.length;i++)
	{
		wm.ui.showTab(oUl[i],oDiv[i])
	};
};
wm.app.c2Tab = function(){
	var aUl = wm.tools.getClass(document,'c2_list');
	var aBtn = wm.tools.getClass(document,'sortitems')[0].getElementsByTagName("a");
	var n=0;
	var zIndex = 2;
	for(var i=0;i<aBtn.length;i++)
	{
		aBtn[i].index=i;
		aBtn[i].onclick=function(){
			if(this.index==n) return;
			aBtn[n].className='';
			wm.tools.removeClass(aUl[this.index],'hide');
			aUl[this.index].style.zIndex = zIndex++;
			wm.tools.addClass(aUl[n],'hide')
			this.className = 'on';
			n = this.index;
		};
	};
};
wm.app.goTop = function(){
	var oDiv = document.getElementById("goTop");
	
	window.onscroll=function(){
		var dom = !/.*chrome.*/i.test (navigator.userAgent) ? document.documentElement : document.body;
		if(dom.scrollTop>dom.scrollHeight/2)
		{
			oDiv.style.display="block";
		} 
		else
		{
			oDiv.style.display="none";
		};
	};
	oDiv.onclick=function(){
		wm.ui.goToWhere(0)
	};
};
wm.app.showNav = function(){
	var oLi = document.getElementById("downNav");
	var navC = document.getElementById("downNavC");
	oLi.onmouseover=function(){
		navC.style.display="block";
	};
	oLi.onmouseout = function(){
		navC.style.display="none";
	};
	navC.onmouseover=function(){
		navC.style.display="block";
	};
	navC.onmouseout = function(){
		navC.style.display="none";
	};
	
};