/**
 * Created by wangyingchao on 16/5/19.
 */

$(function () {
    carousel();
    panel();
    demo_2();
    demo_4();
})

function carousel(){
    var $index = $('.hidden_button');
    $index.on('click', function () {
        $('.navbar-toggle').trigger('click')
    })
}

function panel(){
    var h = $('#panel_model').height();
    $('.panel1:not(#panel_model)').css('height',h+2)

    $(window).on('resize', function () {
        h = $('#panel_model').height();
        $('.panel1:not(#panel_model)').css('height',h+2)
    })
}

function demo_4() {
    var odemo_1 = document.getElementById('demo_1')
    var aBtn = odemo_1.getElementsByTagName('input');
    var aImg = odemo_1.getElementsByTagName('img');
    var num = 0;
    aImg[0].className='show_4';
    aBtn[0].onclick = function(){
        aImg[num].className='hide_4';
        num--;
        if(num<0){
            num=aImg.length-1;
        }
        aImg[num].className='show_4';
    };

    aBtn[1].onclick = function(){
        aImg[num].className='hide_4';
        num++;
        if(num>aImg.length-1){
            num=0;
        }
        aImg[num].className='show_4';
    }
}

function demo_2() {
    var oWarp = document.getElementById('wrap');
    var oBtn = document.getElementById('btn');
    var aDiv = oWarp.getElementsByTagName('div');
    var timer = null;
    var num = 0;
    var onOff = true;

    oBtn.onclick = function () {
        if(oBtn.onOff){
            return
        }
        oBtn.onOff=true;
        if(onOff) {
            num=0;
            timer = setInterval(function () {
                aDiv[num].className = 'show_2';
                num++;
                if (num > aDiv.length - 1) {
                    clearInterval(timer);
                    oBtn.onOff=false;
                }
            }, 100)
        }else{
            num=aDiv.length-1;
            timer = setInterval(function(){
                aDiv[num].className = 'hide_2';
                num--;
                if (num < 0) {
                    clearInterval(timer);
                    oBtn.onOff=false;
                }
            },100)
        }
        onOff=!onOff;
    }
}