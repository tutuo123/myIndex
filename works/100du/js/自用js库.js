/*
 2016.3.24更新
 */
//获取值
function $(v){
    if(typeof v ==='function'){
        window.onload = v;
    }else if(typeof v ==='string'){
        return document.getElementById(v);
    }else if(typeof v ==='object'){
        return v;
    }
}

// 获取元素的style值
function getStyle(obj,attr) {
    return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];
}

//getElementsByClassName
var getElementsByClassName = function (searchClass, node,tag) {
    if(document.getElementsByClassName){
        var nodes = (node || document).getElementsByClassName(searchClass),result = [];
        for(var i=0 ;node = nodes[i++];){
            if(tag !== "*" && node.tagName === tag.toUpperCase()){
                result.push(node)
            }else{
                result.push(node)
            }
        }
        return result
    }else{
        node = node || document;
        tag = tag || "*";
        var classes = searchClass.split(" "),
            elements = (tag === "*" && node.all)? node.all : node.getElementsByTagName(tag),
            patterns = [],
            current,
            match;
        var i = classes.length;
        while(--i >= 0){
            patterns.push(new RegExp("(^|\s)" + classes[i] + "(\s|$)"));
        }
        var j = elements.length;
        while(--j >= 0){
            current = elements[j];
            match = false;
            for(var k=0, kl=patterns.length; k<kl; k++){
                match = patterns[k].test(current.className);
                if (!match) break;
            }
            if (match) result.push(current);
        }
        return result;
    }
}


//获取Classname的值
function getClassName(parent,tagName,className) {
    var aEls =parent.getElementsByTagName(tagName);
    var arr = [];
    for(var i =0; i<aEls.length;i++){
        var aClassName = aEls[i].className.split(' ');
        for(var j=0;j<aClassName.length;j++){
            if(aClassName[j] == className){
                arr.push(aEls[i]);
                break;
            }
        }
    }
    return arr;
}

//给某属性添加classname
function addClassName(obj,className){
    if(obj.className == ''){
        obj.className = className;
    }else{
        var arrClassName = obj.className.split(' ');
        var _index = arrIndexOf(arrClassName,className);
        if (_index ==-1) {
            obj.className+=' '+className;
        }
    }
}

//删除某元素的classname
function removeClassName(obj,className){
    if(obj.className !=''){
        var arrClassName = obj.className.split(' ');
        var _index = arrIndexOf(arrClassName,className);
        if(_index != -1){
            arrClassName.splice(_index,1);
            obj.className = arrClassName.join(' ');
        }
    }
}

//获取数组中某元素的位置
function arrIndexOf(arr,v) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == v) {
            return i;
        }
    }
    return -1;
}

//获取元素到html的据绝对距离
function getPos (obj) {
    var pos = {'top':0,'left':0};
    while (obj){
        pos['top'] +=obj.offsetTop;
        pos['left'] += obj.offsetLeft;
        obj = obj.offsetParent;
    }
    return pos;
}

// 控制对象匀速移动
function doMove ( obj, attr, dir, target ,endFn ) {

    dir = parseInt(getStyle(obj, attr)) < target ? dir : -dir;

    clearInterval(obj.timer);

    obj.timer = setInterval(function () {

        var speed = parseInt(getStyle(obj, attr)) + dir;			// 步长

        if (speed > target && dir > 0 || speed < target && dir < 0) {
            speed = target;
        }

        obj.style[attr] = speed + 'px';

        if (speed == target) {
            clearInterval(obj.timer);

            /*
             if ( endFn ) {
             endFn();
             }
             */
            endFn && endFn();

        }

    }, 50);
}

//控制对象减速运动
function drMove ( obj, attr, dir, target , endFn ) {

    dir = parseInt(getStyle(obj, attr)) < target ? dir : -dir;

    clearInterval(obj.timer);

    obj.timer = setInterval(function () {

        var bir =target-parseInt(getStyle(obj,attr));

        bir = bir > 0 ? bir+dir : -bir-dir;
        var speed = parseInt(getStyle(obj, attr)) + ((bir)/dir);			// 步长

        if (speed > target && dir > 0 || speed < target && dir < 0 ) {
            speed = target;
        }

        obj.style[attr] = speed + 'px';

        if (speed == target) {
            clearInterval(obj.timer);

            /*
             if ( endFn ) {
             endFn();
             }
             */
            endFn && endFn();

        }

    }, 30);
}

//完美运动
function perMove(obj,json,dir,fn){
    var iCur = 0;
    var alpha = 0;

    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
        var bStop = true;
        for(var attr in json){
            if(attr == 'opacity'){
                iCur = Math.round(parseFloat(getStyle(obj,attr))*100);
            }else{
                iCur = parseInt(getStyle(obj,attr));
            }

            if(iCur!=parseInt(json[attr]))
                bStop=false;

            var iSpeed = (parseInt(json[attr])-iCur)/dir;

            iSpeed = iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);


            if(attr == 'opacity'){
                alpha = iCur + iSpeed;
                obj.style.filter = 'alpha(opacity='+alpha+')';
                obj.style[attr] = alpha/100;
            }else{
                obj.style[attr] = iCur + iSpeed + 'px';
            }
        }

        if(bStop){
            clearInterval(obj.timer);
            fn && fn();
        }

    },30)
}

//弹性运动
function sprMove(obj,target){
    var iSpeed = 0;
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
        iSpeed += (target -obj.offsetLeft)/5;
        iSpeed *= 0.7;
        ll +=iSpeed;
        if(Math.abs(iSpeed)<1 && Math.abs(obj.offsetLeft+iSpeed-target)<1 ){
            clearInterval(obj.timer);
            obj.style.left =target - 10 +'px';
        }else{
            obj.style.left = ll+ 'px';
        }
        document.title = obj.style.left +'|'+ target
    },30)
}

//控制对象抖动
function shake ( obj, attr, endFn ) {

    if(obj.onOff){return}
    obj.onOff = true;

    var pos = parseInt( getStyle(obj, attr) );

    var arr = [];			// 20, -20, 18, -18 ..... 0
    var num = 0;

    for ( var i=20; i>0; i-=2 ) {
        arr.push( i, -i );
    }
    arr.push(0);

    clearInterval( obj.timer1 );
    obj.timer1 = setInterval(function (){
        obj.style[attr] = pos + arr[num] + 'px';
        num++;
        if ( num === arr.length ) {
            clearInterval( obj.timer1 );
            endFn && endFn();
            obj.onOff = false;
        }
    }, 50);
}

//控制透明度
function  doOpacity (obj,dir,target,endFn) {
    dir = Math.round(getStyle(obj,'opacity')*100)<target ? dir : -dir;
    clearInterval( obj.timer2);
    obj.timer2 = setInterval(function(){
        var opa = Math.round(getStyle(obj,'opacity')*100)+dir;

        if(opa>target&&dir>0||opa<target&&dir<0 ){
            opa = target;
        }
        obj.style.opacity = opa/100 ;
        obj.style.filter = 'alpha(opacity:'+opa+')';
        if(opa == target){
            clearInterval(obj.timer2);
            endFn && endFn();
        }
    },50);
}

//拖拽
function drag(obj){
    obj.onmousedown = function(){
        document.onmousemove = function(ev){
            var ev= ev||event;
            if(obj.setCapture){
                obj.setCapture()
            }
            var L = ev.clientX - obj.offsetWidth/2;
            var T = ev.clientY - obj.offsetWidth/2;
            if(L<0){
                L=0
            }else if(L>document.documentElement.clientWidth-obj.offsetWidth){
                L=document.documentElement.clientWidth-obj.offsetWidth
            }
            if(T<0){
                T=0
            }else if(T>document.documentElement.clientHeight-obj.offsetHeight){
                T=document.documentElement.clientHeight-obj.offsetHeight
            }
            obj.style.left  = L  + 'px';
            obj.style.top = T + 'px';
        };
        document.onmouseup = function(){
            document.onmousemove = document.onmouseup= null;
            if(obj.releaseCapture){
                obj.releaseCapture()
            }
        };
        return false;
    }
}

//事件绑定的第二种形式
function bind(obj, evname, fn) {
    if (obj.addEventListener) {
        obj.addEventListener(evname, fn, false);
    } else {
        obj.attachEvent('on' + evname, function() {
            fn.call(obj);
        });
    }
}

//cookie操作

function setCookie(key, value, t) {
    var oDate = new Date();
    oDate.setDate( oDate.getDate() + t );
    document.cookie = key + '=' + value + ';expires=' + oDate.toGMTString();
}

function getCookie(key) {
    var arr1 = document.cookie.split('; ');
    for (var i=0; i<arr1.length; i++) {
        var arr2 = arr1[i].split('=');
        if ( arr2[0] == key ) {
            return decodeURI(arr2[1]);
        }
    }
}

function removeCookie(key) {
    setCookie(key, '', -1);
}