/**
 * Created by wangyingchao on 16/4/18.
 */
window.onload = function () {
//public
function addClass(obj, sClass) {
    var aClass = obj.className.split(' ');
    if (!obj.className) {
        obj.className = sClass;
        return;
    }
    for (var i = 0; i < aClass.length; i++) {
        if (aClass[i] === sClass) return;
    }
    obj.className += ' ' + sClass;
}

function removeClass(obj, sClass) {
    var aClass = obj.className.split(' ');
    if (!obj.className) return;
    for (var i = 0; i < aClass.length; i++) {
        if (aClass[i] === sClass) {
            aClass.splice(i, 1);
            obj.className = aClass.join(' ');
            break;
        }
    }
}
function fnInfo(oInfo,value) {
    oInfo.style.transform = 'scale(1)';
    oInfo.style.opacity = '1';
    oInfo.innerHTML = value;
    clearTimeout(oInfo.timer);
    oInfo.timer = setTimeout(function () {
        oInfo.style.transform = 'scale(0)';
        oInfo.style.opacity = '0';
    }, 1000)
}
//获取高度
    document.body.style.height = document.documentElement.clientHeight + 'px';
//欢迎页
    function fnLoad(){
        var oWelcome = document.getElementById('welcome');
        var iTime = new Date().getTime();
        var arr = ['img/1.jpg','img/2.jpg','img/3.jpg','img/4.jpg','img/5.jpg']
        var bImage = false;
        var bTimer = false;
        var timer = null;

        oWelcome.addEventListener('transitionend',fnEnd,false);

        function fnEnd(){
            removeClass(oWelcome,'pageShow')
        }

        timer = setInterval(function(){
            if(new Date().getTime() - iTime >5000){
                bTimer = true;
                if(bTimer && bImage){
                    oWelcome.style.opacity = 0;
                    clearInterval(timer);
                    fnTab();
                }
            }
        },1000)

        for(var i=0; i<arr.length;i++){
            var oImg = new Image();
            oImg.src=arr[i];
            oImg.onload = function(){
                bImage = true;
            }
        }
    }
    fnLoad();
//主页
//~图片切换
    function fnTab(){
        var oPicList = document.getElementsByClassName('picList')[0];
        var oPic = oPicList.getElementsByTagName('ul')[0];
        var aImg = oPic.getElementsByTagName('li');
        var oPicSelect = document.getElementsByClassName('picSelect')[0];
        var aBtn = oPicSelect.getElementsByTagName('li');
        var iScroll = 0;
        var iStartScroll = 0;
        var iStartX = 0;
        var iNow = 0;
        var bNow = 0;
        var timer = null;
        oPic.style.width = oPic.clientWidth*2 + 'px';
        oPic.innerHTML +=oPic.innerHTML;
        clearInterval(timer);
        function fnAuto() {
            timer = setInterval(function () {
                iNow++;
                fnNext();
            }, 3000)
        }
        fnAuto();
        function fnStart(ev){
            clearInterval(timer);
            if(iNow<=0){
                iNow +=aBtn.length;
                iScroll = -iNow * document.documentElement.clientWidth;
                oPic.style.transition = '0s';
                fnTranslate();
            }
            iStartX = ev.changedTouches[0].pageX;
            iStartScroll = iScroll;
            bNow = iNow;
        }
        function fnMove(ev){
            var disX = ev.changedTouches[0].pageX - iStartX;
            iScroll =iStartScroll + disX;
            fnTranslate();
        }
        function fnEnd(ev) {
            var disX = ev.changedTouches[0].pageX - iStartX;
            iScroll = iStartScroll + disX;
            iNow = -iScroll / document.documentElement.clientWidth;
            if (iNow < bNow) {
                iNow = iNow % 1 > 0.8 ? Math.ceil(iNow) : Math.floor(iNow);
            } else {
                iNow = iNow % 1 < 0.2 ? Math.floor(iNow) : Math.ceil(iNow);
            }
            fnNext();
            fnAuto();
        }

        function fnNext() {
            for (var i = 0; i < aBtn.length; i++) {
                aBtn[i].className = '';
            }
            aBtn[iNow % aBtn.length].className = 'active';

            if (iNow >aBtn.length) {
                iNow = iNow%aBtn.length;
                iScroll = -iNow * document.documentElement.clientWidth;
                oPic.style.transition = '0s';
                fnTranslate();
            } else {
                iScroll = -iNow * document.documentElement.clientWidth;
                oPic.style.transition = '0.5s'
                fnTranslate();
            }
        }


        function fnTranslate(){
            oPic.style.transform = 'translateX('+iScroll+'px)'
        }
        oPic.addEventListener('touchstart',fnStart,false);
        oPic.addEventListener('touchmove',fnMove,false);
        oPic.addEventListener('touchend',fnEnd,false);
    }
//~评分
    function fnScore(){
        var oScore = document.getElementsByClassName('score')[0];
        var aDl = oScore.getElementsByTagName('dl');
        var arr = ['很糟糕','比较差','还可以','还不错','非常棒']

        for(var i=0;i<aDl.length;i++){
            aDl[i].index=i;
            fnDd(aDl[i].index);
        }
        function fnDd(index){
            var aDd = aDl[index].getElementsByTagName('dd');
            for(var i=0;i<aDd.length;i++){
                aDd[i].index=i;
                aDd[i].onclick = function(){
                    for(var i=0;i<aDd.length;i++){
                        aDl[index].getElementsByTagName('input')[0].value=arr[this.index];
                        if(i<=this.index) {
                            aDd[i].className = 'active';
                        }else{
                            aDd[i].className = '';
                        }
                    }
                }
            }
        }
    }
    fnScore();
//~ 提交验证
    function fnInput(){
        var oScore = document.getElementsByClassName('score')[0];
        var aScore = oScore.getElementsByTagName('input');
        var oTag = document.getElementsByClassName('tag')[0];
        var aTag = oTag.getElementsByTagName('input');
        var oIndex = document.getElementById('index');
        var oInfo = oIndex.getElementsByClassName('info')[0];
        var oBtn = oIndex.getElementsByClassName('btn')[0];

        oBtn.addEventListener('touchend',fnEnd,false)

        function fnEnd() {
            if(fn_score()){

                if(fn_tag()){
                    fnIndexOut();
                }else{
                    fnInfo(oInfo,'请给景点添加标签');
                }
            }else{
                fnInfo(oInfo,'请给景区评分');
            }
        }

        function fn_score(){
            for(var i=0; i<aScore.length; i++){
                if(aScore[i].value == 0){
                    return false;
                }
            }
            return true;
        }
        function fn_tag(){
            for(var i=0;i<aTag.length;i++){
                if(aTag[i].checked){
                    return true;
                }
            }
            return false;
        }
    }
    fnInput();
//主页跳出
    function fnIndexOut(){
        var oJump = document.getElementById('jump');
        var oNews = document.getElementById('news');
        var oIndex = document.getElementById('index');
        oIndex.style.zIndex='1';
        addClass(oJump,'pageShow')
        setTimeout(function(){
            oJump.style.opacity='1';
            oIndex.style.WebkitFilter = oIndex.style.filter ='blur(8px)';
        },20)
        setTimeout(function(){
            oIndex.style.WebkitFilter = oIndex.style.filter ='blur(0)';
            oJump.style.opacity='0';
            addClass(oNews,'pageShow')
            removeClass(oJump,'pageShow')
        },3000)
        setTimeout(function(){
            removeClass(oIndex,'pageShow')
            oNews.style.opacity = '1';
        },3020)
    }

//上传页
    function fnNews(){
        var oNews = document.getElementById('news');
        var oInfo = oNews.getElementsByClassName('info')[0];
        var aInput = oNews.getElementsByTagName('input');

        aInput[0].onchange = function(){
            if(this.files[0].type.split('/')[0] == 'video'){
                fnNewsOut('给视频添加标签');
            }else{
                fnInfo(oInfo,'请上传视频')
            }
        }

        aInput[1].onchange = function(){
            if(this.files[0].type.split('/')[0] == 'image'){
                fnNewsOut('给图片添加标签');
            }else{
                fnInfo(oInfo,'请上传图片')
            }
        }
    }
    fnNews();
    function fnNewsOut(value){
        var oNews = document.getElementById('news');
        var oForm = document.getElementById('form');
        var oStr = oForm.getElementsByTagName('h2')[0];
        oStr.innerHTML = value;
        removeClass(oNews,'pageShow');
        addClass(oForm,'pageShow');
    }
    function fnForm(){
        var oForm = document.getElementById('form');
        var aTag = oForm.getElementsByTagName('label');
        var oBtn = oForm.getElementsByClassName('btn')[0];
        for (var i = 0; i < aTag.length; i++) {
          aTag[i].addEventListener('touchend',fnBtn,false)
        }
        function fnBtn(){
            oBtn.style.background = '#3c9bbb';
            oBtn.style.color = '#fff';
            oBtn.addEventListener('touchend', fnEnd, false)
        }
        function fnEnd(){
            fnFormOut();
        }
    }
    fnForm();

    function fnFormOut(){
        var oForm = document.getElementById('form');
        var oOver = document.getElementById('over');
        removeClass(oForm,'pageShow');
        addClass(oOver,'pageShow');
    }
    function fnOver(){
        var oOver = document.getElementById('over');
        var oIndex = document.getElementById('index');
        var oBtn = oOver.getElementsByClassName('btn')[0];
        oBtn.addEventListener('touchend',fnRest,false)
        function fnRest(){
            removeClass(oOver,'pageShow');
            addClass(index,'pageShow')
        }
    }
    fnOver();

}