/**
 * Created by wangyingchao on 16/5/14.
 */
$(function () {

function fnTab($wrap,tf,n) {
    var $btn_l= $wrap.find('.btn_l');
    var $btn_r= $wrap.find('.btn_r');
    var $li= $wrap.find('ul li');
    var $btn_list= $wrap.find('ol');
    var inow = 0;
    var num = 0;
    var liWidth = $li.eq(0).width();
    $wrap.onOff = true;

    $li.css('left',liWidth);
    $li.eq(0).css('left',0);

    $wrap.on('mouseover', function () {
        $btn_l.css('opacity','1');
        $btn_r.css('opacity','1');
        tf && clearInterval($wrap.timer);
    });
    $wrap.on('mouseout', function () {
        $btn_l.css('opacity','0');
        $btn_r.css('opacity','0');
        tf && autoTab();
    });

    if(n==1){
        autoTab();
        lrTab();
        btnTab();
    }


    function autoTab(){
        clearInterval($wrap.timer);
        $wrap.timer=setInterval(function () {
            $btn_r.trigger('click')
        },3000)
    }

    function lrTab(){
        $btn_r.on('click', function () {
            inow++;
            inow = inow%$li.length;
            $btn_list.eq(inow).trigger('mouseover')
        });
        $btn_l.on('click', function () {
            inow--;
            if(inow<0){
                inow = $li.length-1;
            }
            $btn_list.eq(inow).trigger('mouseover')
        });
    }

    function btnTab(n) {
        $btn_list.delegate('li', 'mouseover', function () {
            clearTimeout($wrap.timer1);
            $wrap.timer1 = setTimeout($.proxy(function () {
                inow = $(this).index();
                $(this).siblings().removeClass('active');
                $(this).addClass('active');
                if(n=1){
                    tab1();
                }else if(n=2){
                    tab2();
                }
            }, $(this)), 300)
        });
    }

    function tab1(){
        if($wrap.onOff) {
            $wrap.onOff = false;
            $li.eq(inow).siblings().animate({'opacity': 0, 'zIndex': 1},300);
            $li.eq(inow).animate({'opacity': 1, 'zIndex': 2}, 300, function () {
                $wrap.onOff = true
            });
        }
    }

    function tab2(){
        if($wrap.onOff) {
            $wrap.onOff = false;
            $(this).attr('class', 'active').siblings().attr('class', '');
            inow = $(this).index();
            if (num > inow ) {
                $li.eq(inow).css('left', -liWidth);
                $li.eq(num).animate({'left': liWidth}, 500);
            }
            else if (num < inow ) {
                $li.eq(inow).css('left', liWidth);
                $li.eq(num).animate({'left': -liWidth}, 500);
            }
            $li.eq(inow ).animate({'left': 0}, 500,function(){
                $wrap.onOff = true;
            });
            num = inow ;
        }
    }
}
});