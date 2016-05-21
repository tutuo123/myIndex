/**
 * Created by wangyingchao on 16/4/8.
 */
window.onload = function () {

//search text
function fn1() {
    var oBar = document.getElementsByClassName('bar')[0];
    var oMenu = oBar.getElementsByClassName('menu')[0];
    var aLi = oMenu.getElementsByTagName('li');
    var oSearch = document.getElementById('search');
    var oText = oSearch.getElementsByClassName('text')[0];
    var arr = ['我的老家', '就住在这个屯', '我是这个屯子里土生土长的人', '房子不咋大呀', '有山有水有树林'];


    function search() {
        oText.value =arr[0];
        for (var i = 0; i < aLi.length; i++) {
            aLi[i].index = i;
            aLi[i].onclick = function () {
                for (var i = 0; i < aLi.length; i++) {
                    aLi[i].className = 'gradient';
                }
                this.className = 'active';
                oText.value = arr[this.index]
            }
        }
    }

    search();
}
    fn1();
//search list
function fn2() {
    var oUpdate = document.getElementsByClassName('update')[0];
    var oWrap = oUpdate.getElementsByClassName('wrap')[0];
    var oUl_update = oWrap.getElementsByTagName('ul')[0];
    var oBtn1 = document.getElementById('updateUpBtn');
    var oBtn2 = document.getElementById('updateDownBtn');
    var timer1 = null;
    var onOff = true;
    var num = 1;

    function update() {
        clearInterval(timer1);
        timer1 = setInterval(function () {
            perMove(oUl_update, {top: -30 * num}, 20, function () {
                num++;
                if (num == 8) {
                    num = 0
                }
            });
        }, 3000);
    }

    update();
    oUpdate.onmouseover = function () {
        clearInterval(timer1);
    };
    oUpdate.onmouseout = function () {
        update();
    };
    oBtn2.onclick = function () {
        if (onOff) {
            onOff = false;
            num++;
            if (num > 7) {
                num = 0;
            }
            perMove(oUl_update, {top: -30 * num}, 20, function () {
                onOff = true;
            });
        }
    };
    oBtn1.onclick = function () {
        if (onOff) {
            onOff = false;
            num--;
            if (num < 0) {
                num = 7;
            }
            perMove(oUl_update, {top: -30 * num}, 20, function () {
                onOff = true;
            });
        }
    }
}
    fn2();

//hot shop ew shop
function fn3(){
    var oTab =document.getElementById('tab1');
    var aTab =oTab.getElementsByTagName('li');
    var oList1 =document.getElementById('list1');
    var aLi = oList1.getElementsByTagName('li');
    var arr = [[{'img':'img/hot_list_pic1.gif','p':'宇宙和汗疹园国际酒店','span1':'区域 : 朝阳/CBD','span2':'人均 : 180元','span3':'人气 : 12321'},
                {'img':'img/hot_list_pic1.gif','p':'宇宙和汗疹园国际酒店','span1':'区域 : 朝阳/CBD','span2':'人均 : 180元','span3':'人气 : 12321'},
                {'img':'img/hot_list_pic1.gif','p':'宇宙和汗疹园国际酒店','span1':'区域 : 朝阳/CBD','span2':'人均 : 180元','span3':'人气 : 12321'}],
                [{'img':'img/hot_list_pic2.gif','p':'宇宙第一种子','span1':'区域 : 石景山乐园','span2':'人均 : 1160元','span3':'人气 : 154321'},
                {'img':'img/hot_list_pic2.gif','p':'宇宙第二种子1','span1':'区域 : 石山乐园','span2':'人均 : 11160元','span3':'人气 : 254321'},
                {'img':'img/hot_list_pic2.gif','p':'宇宙第三种子','span1':'区域 : 石乐园','span2':'人均 : 111160元','span3':'人气 : 354321'}]];

//初始化
    var arr1 = arr[0];
    fn_list(arr1);


        for (var i = 0; i < aTab.length; i++) {

            aTab[i].index = i;
            aTab[i].onclick = function () {
                for (var i = 0; i < aTab.length; i++) {
                    removeClassName(aTab[i], 'active');
                    aTab[i].getElementsByTagName('p')[0].className = 'triangle_down_gray';
                }
                addClassName(this, 'active');
                this.getElementsByTagName('p')[0].className = 'triangle_down_red';
                var arr2 =  arr[this.index];
                fn_list(arr2);
            }
        }


    function fn_list(arr1) {
        for (var j = 0; j < aLi.length; j++) {
            for (attr in arr1[j]) {
                aLi[j].getElementsByTagName('img')[0].src = arr1[j]['img'];
                aLi[j].getElementsByTagName('p')[0].innerHTML = arr1[j]['p'];
                aLi[j].getElementsByTagName('span')[0].innerHTML = arr1[j]['span1'];
                aLi[j].getElementsByTagName('span')[1].innerHTML = arr1[j]['span2'];
                aLi[j].getElementsByTagName('span')[2].innerHTML = arr1[j]['span3'];
            }

        }
    }




}

    fn3();

//交通方式
function fn4 (){
    var oTab2 = document.getElementById('tab2');
    var oList2 = document.getElementById('list2');
    var aTab = oTab2.getElementsByTagName('li');
    var arr = ['img/123.gif','img/456.jpg'];

    for(var i=0 ;i<aTab.length; i++){
        aTab[i].index = i;
        aTab[i].onclick= function () {
            for (var i = 0; i < aTab.length; i++) {
                removeClassName(aTab[i], 'active');
                aTab[i].getElementsByTagName('p')[0].className = 'triangle_down_gray';
            }
            addClassName(this, 'active');
            this.getElementsByTagName('p')[0].className = 'triangle_down_red';
            oList2.style.backgroundImage = 'url(' + arr[this.index] + ')';
        }
    }
}
    fn4();

//知道分子
function fn5() {
    var oTab = document.getElementById('tab3');
    var oList = document.getElementById('list3');
    var oText = document.getElementById('text3');
    var aLi = oList.getElementsByTagName('li');
    var aTab = oTab.getElementsByTagName('li');
    var arr = [[{'span': '美食', 'a': '推荐几个质量较好的电视机1', 'img': 'img/ico1.gif'}, {
        'span': '美食',
        'a': '推荐几个质量较好的电视机6',
        'img': 'img/ico1.gif'
    }, {'span': '美食', 'a': '推荐几个质量较好的电视机11', 'img': 'img/ico1.gif'}, {
        'span': '美食',
        'a': '推荐几个质量较好的电视机16',
        'img': 'img/ico2.gif'
    }, {'span': '美食', 'a': '推荐几个质量较好的电视机21', 'img': 'img/ico1.gif'}],
        [{'span': '美食', 'a': '推荐几个质量较好的电视机2', 'img': 'img/ico2.gif'}, {
            'span': '美食',
            'a': '推荐几个质量较好的电视机7',
            'img': 'img/ico1.gif'
        }, {'span': '美食', 'a': '推荐几个质量较好的电视机12', 'img': 'img/ico2.gif'}, {
            'span': '美食',
            'a': '推荐几个质量较好的电视机17',
            'img': 'img/ico2.gif'
        }, {'span': '美食', 'a': '推荐几个质量较好的电视机22', 'img': 'img/ico2.gif'}],
        [{'span': '美食', 'a': '推荐几个质量较好的电视机3', 'img': 'img/ico1.gif'}, {
            'span': '美食',
            'a': '推荐几个质量较好的电视机8',
            'img': 'img/ico2.gif'
        }, {'span': '美食', 'a': '推荐几个质量较好的电视机13', 'img': 'img/ico2.gif'}, {
            'span': '美食',
            'a': '推荐几个质量较好的电视机18',
            'img': 'img/ico2.gif'
        }, {'span': '美食', 'a': '推荐几个质量较好的电视机23', 'img': 'img/ico1.gif'}],
        [{'span': '美食', 'a': '推荐几个质量较好的电视机4', 'img': 'img/ico2.gif'}, {
            'span': '美食',
            'a': '推荐几个质量较好的电视机9',
            'img': 'img/ico2.gif'
        }, {'span': '美食', 'a': '推荐几个质量较好的电视机14', 'img': 'img/ico1.gif'}, {
            'span': '美食',
            'a': '推荐几个质量较好的电视机19',
            'img': 'img/ico1.gif'
        }, {'span': '美食', 'a': '推荐几个质量较好的电视机24', 'img': 'img/ico2.gif'}],
        [{'span': '美食', 'a': '推荐几个质量较好的电视机5', 'img': 'img/ico1.gif'}, {
            'span': '美食',
            'a': '推荐几个质量较好的电视机10',
            'img': 'img/ico1.gif'
        }, {'span': '美食', 'a': '推荐几个质量较好的电视机15', 'img': 'img/ico2.gif'}, {
            'span': '美食',
            'a': '推荐几个质量较好的电视机20',
            'img': 'img/ico1.gif'
        }, {'span': '美食', 'a': '推荐几个质量较好的电视机25', 'img': 'img/ico1.gif'}]];

    function fn_list(arr1) {
        for (var j = 0; j < aLi.length; j++) {
            for (attr in arr1[j]) {
                aLi[j].getElementsByTagName('span')[0].src = arr1[j]['span'];
                aLi[j].getElementsByTagName('a')[0].innerHTML = arr1[j]['a'];
                aLi[j].getElementsByTagName('img')[0].src = arr1[j]['img'];
            }
        }
    }

    //初始化
    var arr1 = arr[0];
    fn_list(arr1);

    //tab
    for (var i = 0; i < aTab.length; i++) {
        aTab[i].index = i;
        aTab[i].onclick = function () {
            for (var i = 0; i < aTab.length; i++) {
                removeClassName(aTab[i], 'active');
                aTab[i].getElementsByTagName('p')[0].className = 'triangle_down_gray';
            }
            addClassName(this, 'active');
            this.getElementsByTagName('p')[0].className = 'triangle_down_red';
            var arr2 = arr[this.index];
            fn_list(arr2);
        }
    }

    //text
    oText.onfocus = function () {
        oText.value = '';
    };
    oText.onblur = function () {
        oText.value = oText.defaultValue;
    }
}
    fn5();

//抢卷儿
    function fn6() {
        var oTab = document.getElementById('tab4');
        var oList = document.getElementById('list4');
        var aLi = oList.getElementsByTagName('li');
        var aTab = oTab.getElementsByTagName('li');
        var arr = [
            [
                {'a':'老城一尊皇牛1','strong':'12%','span':'3651'},
                {'a':'老城一尊皇牛2','strong':'13%','span':'3652'},
                {'a':'老城一尊皇牛3','strong':'14%','span':'3653'},
                {'a':'老城一尊皇牛4','strong':'15%','span':'3654'},
                {'a':'老城一尊皇牛5','strong':'16%','span':'3655'},
                {'a':'老城一尊皇牛6','strong':'17%','span':'3656'}
            ], [
                {'a':'老城一尊皇牛7','strong':'18%','span':'3657'},
                {'a':'老城一尊皇牛8','strong':'19%','span':'3658'},
                {'a':'老城一尊皇牛9','strong':'10%','span':'3659'},
                {'a':'老城一尊皇牛10','strong':'22%','span':'361'},
                {'a':'老城一尊皇牛11','strong':'32%','span':'362'},
                {'a':'老城一尊皇牛12','strong':'42%','span':'363'}
            ],[
                {'a':'老城一尊皇牛13','strong':'52%','span':'364'},
                {'a':'老城一尊皇牛14','strong':'62%','span':'365'},
                {'a':'老城一尊皇牛15','strong':'72%','span':'366'},
                {'a':'老城一尊皇牛16','strong':'82%','span':'367'},
                {'a':'老城一尊皇牛17','strong':'92%','span':'368'},
                {'a':'老城一尊皇牛18','strong':'2%','span':'369'}
            ]
            ];

            function fn_list(arr1) {
            for (var j = 0; j < aLi.length; j++) {
                for (attr in arr1[j]) {
                    aLi[j].getElementsByTagName('a')[0].innerHTML = arr1[j]['a'];
                    aLi[j].getElementsByTagName('strong')[0].innerHTML = arr1[j]['strong'];
                    aLi[j].getElementsByTagName('span')[0].innerHTML = arr1[j]['span'];
                }
            }
        }

        //初始化
        var arr1 = arr[0];
        fn_list(arr1);

        //tab
        for (var i = 0; i < aTab.length; i++) {
            aTab[i].index = i;
            aTab[i].onclick = function () {
                for (var i = 0; i < aTab.length; i++) {
                    removeClassName(aTab[i], 'active');
                    aTab[i].getElementsByTagName('p')[0].className = 'triangle_down_gray';
                }
                addClassName(this, 'active');
                this.getElementsByTagName('p')[0].className = 'triangle_down_red';
                var arr2 = arr[this.index];
                fn_list(arr2);
            }
        }

    }
    fn6();

//bbs
function fn7(){
    var oBbs = document.getElementById('bbs');
    var aLi =oBbs.getElementsByTagName('li');

    for(var i=0; i<aLi.length; i++){
        aLi[i].index = i;
    //初始化
        aLi[0].className= 'active';

        aLi[i].onmouseover = function () {
            aLi[that].className = '';
            this.className = 'active';
        };
        aLi[i].onmouseout= function () {

            that = this.index;
        }
    }
}
    fn7();

//红人烧客
function fn8(){
    var oHot = document.getElementById('hot_img');
    var aLi = oHot.getElementsByTagName('li');
    var aWrap = oHot.getElementsByTagName('div');
    var arr = [
        {'strong':'小清新','span':'区域:朝阳区','em':'人气 : 12245'},
        {'strong':'御姐','span':'区域:海淀区','em':'人气 : 11224'},
        {'strong':'成熟','span':'区域:大兴区','em':'人气 : 21224'},
        {'strong':'妖娆','span':'区域:朝阳区','em':'人气 : 31224'},
        {'strong':'帅气','span':'区域:朝阳区','em':'人气 : 41224'},
        {'strong':'活泼','span':'区域:东城区','em':'人气 : 51224'},
        {'strong':'傲娇','span':'区域:朝阳区','em':'人气 : 61224'},
        {'strong':'清甜','span':'区域:石景山区','em':'人气 : 871224'},
        {'strong':'放荡','span':'区域:石景山区','em':'人气 : 971224'},
        {'strong':'酷小伙','span':'区域:石景山区','em':'人气 : 671224'}
    ];

    //布局转换
    for(var i=1; i<aLi.length;i++){
        aLi[i].style.width = aLi[i].getElementsByTagName('img')[0].offsetWidth +'px';
        aLi[i].style.height = aLi[i].getElementsByTagName('img')[0].offsetHeight+ 'px';
        aLi[i].style.left = aLi[i].offsetLeft+'px';
        aLi[i].style.top = aLi[i].offsetTop+'px';
    }
    for(var i=1; i<aLi.length;i++){
        aLi[i].style.position = 'absolute'
    }
    //生成遮罩层
    for (var i=1; i<aLi.length; i++) {
        var oWrap = document.createElement('div');
        var oStrong = document.createElement('strong');
        var oSpan = document.createElement('span');
        var oEm = document.createElement('em');
        oWrap.appendChild(oStrong);
        oWrap.appendChild(oSpan);
        oWrap.appendChild(oEm);
        oWrap.style.position = 'absolute';
        oWrap.style.width = aLi[i].getElementsByTagName('img')[0].offsetWidth +'px';
        oWrap.style.height = aLi[i].getElementsByTagName('img')[0].offsetHeight+ 'px';
        oWrap.style.left = aLi[i].offsetLeft+'px';
        oWrap.style.top = aLi[i].offsetTop+'px';
        oHot.appendChild(oWrap);
        oWrap.style.display = 'none'
    }
    //数据添加
    for(var j=0; j<aWrap.length; j++){
        for(attr in arr[j]){
            aWrap[j].getElementsByTagName('strong')[0].innerHTML = arr[j]['strong'];
            aWrap[j].getElementsByTagName('span')[0].innerHTML = arr[j]['span'];
            aWrap[j].getElementsByTagName('em')[0].innerHTML = arr[j]['em'];
        }
    }
    //初始化
    aWrap[1].style.display = 'block';

    for(var i=1 ; i<aLi.length; i++){
        aLi[i].index = i-1;
        aLi[i].onmouseover = function () {
            aWrap[1].style.display = 'none';
            for(var i=0 ; i<aWrap.length; i++) {
                aWrap[that].style.display = 'none';
                aWrap[this.index].style.display = 'block';
            }
        };
        aLi[i].onmouseout = function () {
            for(var i=0 ; i<aWrap.length; i++) {
                that = this.index;
            }
        };
    }
}
    fn8();

//精彩推荐
function fn9() {
    var oRecommend = document.getElementById('recommend');
    var oText = oRecommend.getElementsByTagName('span')[0];
    var oUl = oRecommend.getElementsByTagName('ul')[0];
    var oOl = oRecommend.getElementsByTagName('ol')[0];
    var aLi2 = oOl.getElementsByTagName('li');
    var arr = ['爸爸去哪啦~','爸爸在这呢!','原来在这呀~'];
    var timer=null;
    var num = 1;
//初始化
    oText.innerHTML =arr[0];

    function recommend() {
        clearInterval(timer);
        timer = setInterval(function () {
            perMove(oUl, {'top': (-135 * num)}, 4, function () {
                aLi2[0].className = '';
                aLi2[1].className = '';
                aLi2[2].className = '';
                aLi2[num].className = 'active';
                num++;
                if (num == 3) {
                    num=0;
                }
            });
            oText.innerHTML =arr[num];

        }, 3000)
    }
    recommend();

    oRecommend.onmouseover = function () {
        clearInterval(timer);
    };
    oRecommend.onmouseout = function(){
      recommend();
    };
    aLi2[2].onclick=function(){
        alert(2);
    };
    for (var i=0; i<aLi2.length; i++) {
        aLi2[i].index = i;
        aLi2[i].onclick = function () {
            num=this.index;
            perMove(oUl,{'top':(-135*this.index)},4);
            for(var i=0; i<aLi2.length;i++){
                aLi2[i].className = '';
            }
            aLi2[this.index].className = 'active';
            oText.innerHTML = arr[this.index];
        }
    }
}
    fn9();

function fn10(){
    var oList = document.getElementById('list10');
    var oLuck = document.getElementById('luck1');
    var aLi = oList.getElementsByClassName('img');
    var arr = [
        {'img':'img/today2.gif','strong':'我的老家1','span':'就在这个屯5','em':'我是这个屯里13'},
        {'img':'img/hot_list_pic2.gif','strong':'我的老家2','span':'就在这个屯6','em':'我是这个屯里12'},
        {'img':'img/hot10.gif','strong':'我的老家3','span':'就在这个屯7','em':'我是这个屯里11'},
        {'img':'img/hot11.gif','strong':'我的老家4','span':'就在这个屯8','em':'我是这个屯里9'}
    ];

/*
//样式重置
    for(var i=0; i<aLi.length; i++) {
        aLi[i].style.left = aLi[i].offsetLeft + 'px';
        aLi[i].style.top = aLi[i].offsetTop + 'px';
    }
    for(var i=0; i<aLi.length; i++) {
        aLi[i].style.position = 'absolute';
    }
*/
//生成弹窗
    var aPop = oLuck.getElementsByTagName('article');
    var aImg = oLuck.getElementsByTagName('img');
    var aStrong = oLuck.getElementsByTagName('strong');
    var aSpan = oLuck.getElementsByTagName('span');
    var aEm = oLuck.getElementsByTagName('em');

    for(var i=0; i<aLi.length; i++){
        var oPop = document.createElement('article');
        var oDiv = document.createElement('div');
        var oP = document.createElement('p');
        var oImg = document.createElement('img');
        var oStrong = document.createElement('strong');
        var oSpan = document.createElement('span');
        var oEm = document.createElement('em');
        oLuck.appendChild(oPop);
        oPop.appendChild(oDiv);
        oPop.appendChild(oP);
        oP.appendChild(oImg);
        oP.appendChild(oStrong);
        oP.appendChild(oSpan);
        oP.appendChild(oEm);
    }

//获取弹窗数据
    for(var j =0; j<aLi.length; j++){
        for(attr in arr[j]){
            aImg[j+5].src=arr[j]['img'];
            aStrong[j].innerHTML=arr[j]['strong'];
            aSpan[j].innerHTML=arr[j]['span'];
            aEm[j].innerHTML=arr[j]['em'];
        }
    }
//弹窗定位
    for(var i=0;i<aPop.length;i++){
        aPop[i].style.position = 'absolute';
        aPop[i].style.left = aLi[i].offsetLeft + 64 + 'px';
        aPop[i].style.top = aLi[i].offsetTop  + 'px';
        aPop[i].style.display = 'none';
    }
//事件
    for(var i=0; i<aLi.length; i++){
        aLi[i].index = i;
        aLi[i].onmouseover = function () {
            aPop[this.index].style.display = 'block'
        };
        aLi[i].onmouseout = function () {
            for(var i=0; i<aLi.length; i++){
                aPop[i].style.display = 'none';
            }
        }
    }


}
    fn10();
};



