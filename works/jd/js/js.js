/**
 * Created by wangyingchao on 16/5/10.
 */

$(function () {

    headPopup();  //header

    nav_1Popup();  //nav_1

    nav_2Popup(); //article1 nav_2
    loop_1();//article1 loop_1
    sortLogo();//article1 side_1
    today();//article1 today
    guessLike();//article1 like
    lifeData();//article1 life

    content();//content
    cont_ad();//content cont_ad

    side_l(); //side_l  左侧固定菜单
    side_r(); //side_r  右侧固定菜单
    popup_login(); //popup_login  登陆弹窗

    sec_1();//article_2 sec_1 留言板


    function content() {
        cont_title();//title
        createContData();//main_0数据
        cont_tab();//图片切换
        cont_logo();//下logo
        main_1(); //内容选项卡
    } //content

});

//共用图片无缝三种切换
function fnTab($wrap,tf,n) {
    var $btn_l= $wrap.find('.btn_l');
    var $btn_r= $wrap.find('.btn_r');
    var $li= $wrap.find('ul li');
    var $btn_list= $wrap.find('ol');
    var inow = 0;
    var num = 0;
    var liWidth = $li.eq(0).width();
    $wrap.onOff = true;

    var t = $wrap.offset().top;
    var wh = $wrap.height();
    var st = $(window).scrollTop();
    var h = $(window).height();

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
        $li.eq(0).css({'opacity': 1,'zIndex': 2});
        btnTab();
        lrTab();
        onOff();
    }else if(n==2){
        $li.css('left',liWidth);
        $li.eq(0).css('left',0);
        lrTab();
    }else if(n==3){
        $li.css('left',liWidth);
        $li.eq(0).css('left',0);
        btnTab();
        lrTab();
        onOff();
    }

    //定时器管理

    function onOff(){
        //初始化
        if(t<st+wh && t>st-h) {
            autoTab();
        }else{
            clearInterval($wrap.timer);
        }
        //console.log(t<st+wh && t>st-h);
        $(window).on('scroll', function () {
            var st = $(window).scrollTop();
            var h = $(window).height();
            if(t<st+wh && t>st-h) {
                autoTab();
            }else{
                clearInterval($wrap.timer);
            }
            //console.log(t<st+wh && t>st-h);
        });

    }


    function autoTab(){
        clearInterval($wrap.timer);
        $wrap.timer=setInterval(function () {
            $btn_r.trigger('click')
        },3000)
    }

    function lrTab(){
        $btn_r.on('click', function () {
            if(n==1){
                tab1(true,1);
            }else if(n==2){
                tab2(true,1);
            }else if(n==3){
                tab2(true,1);
            }
        });
        $btn_l.on('click', function () {
            if(n==1){
                tab1(true,2);
            }else if(n==2){
                tab2(true,2);
            }else if(n==3){
                tab2(true,2)
            }
        });
    }

    function btnTab() {
        $btn_list.delegate('li', 'mouseover', function () {
            clearTimeout($wrap.timer1);
            $wrap.timer1 = setTimeout($.proxy(function () {
                inow = $(this).index();
                if(n==1){
                    tab1(false);
                }else if(n==3){
                    tab2(false);
                }
            }, $(this)), 300)
        });
    }

    function tab1(tf,m){
        if($wrap.onOff) {
            $wrap.onOff = false;
            if(tf){
                if(m==1){
                    inow++;
                    inow = inow%$li.length;
                }else if(m==2){
                    inow--;
                    if(inow<0){
                        inow = $li.length-1;
                    }
                }
            }
            $btn_list.find('li').eq(inow).addClass('active').siblings().removeClass('active');
            $li.eq(inow).siblings().animate({'opacity': 0},300);
            $li.eq(inow).animate({'opacity': 1}, 300, function () {
                $wrap.onOff = true
            });
        }
    }

    function tab2(tf,rl){
        if($wrap.onOff) {
            $wrap.onOff = false;

            if(tf) {
                if (rl == 1) {
                    inow++;
                    inow = inow % $li.length;
                    $btn_list.find('li').eq(inow).addClass('active').siblings().removeClass('active');
                    $li.eq(inow).css('left', -liWidth);
                    $li.eq(num).animate({'left': liWidth}, 500);
                }
                else if (rl == 2) {
                    inow--;
                    if (inow < 0) {
                        inow = $li.length - 1;
                    }
                    $btn_list.find('li').eq(inow).addClass('active').siblings().removeClass('active');
                    $li.eq(inow).css('left', liWidth);
                    $li.eq(num).animate({'left': -liWidth}, 500);
                }
            }else {
                $btn_list.find('li').eq(inow).addClass('active').siblings().removeClass('active');
                if (num > inow) {
                    $li.eq(inow).css('left', -liWidth);
                    $li.eq(num).stop().animate({left: liWidth}, 500);
                }
                else if (num < inow) {
                    $li.eq(inow).css('left', liWidth);
                    $li.eq(num).stop().animate({left: -liWidth}, 500);
                }
            }
            $li.eq(inow).animate({'left': 0}, 500,function(){
                $wrap.onOff = true;
            });
            num = inow ;
        }
    }
}

                        //header

//headerPopup
function headPopup(){
    fnPopup('city'); //城市弹窗
    fnCity('city'); //城市选择

    fnPopup('myJd');//我的京东弹窗
    fnPopup('phoneJd');//手机京东弹窗
    fnPopup('followJd');//关注京东弹窗
    fnPopup('server');//客户服务弹窗
    fnPopup('webNav');//网站导航弹窗
}
//城市选择
function fnCity(id){
    var $popup = $('.popup_'+id);
    var $Li = $popup.find('li');
    var $Span = $('.content_'+id).find('span');

    $Li.each(function () {
        $(this).on('click',function (){
            $Span.html($(this).html());
            $(this).siblings().attr('class', '');
            $(this).attr('class','active_1');
            $popup.hide();
        });

        $(this).hover(function () {
            if($(this).attr('class') != 'active_1'){
                $(this).attr('class','active_2')
            }
        }, function () {
            if($(this).attr('class') != 'active_1'){
                $(this).attr('class','')
            }
        });
    })
}
//header弹窗
function fnPopup(id){

    var $wrap = $('.wrap_'+id);
    var $content = $('.content_'+id);
    var $popup = $('.popup_'+id);
    $wrap.hover(function () {
        $popup.show();
        $content.addClass('active');
        $wrap.find('.arrow').css('transform','rotate(180deg)');
    }, function () {
        $popup.hide();
        $content.removeClass('active');
        $wrap.find('.arrow').css('transform','rotate(0deg)');
    })
}

                        //nav_1

function nav_1Popup(){
    fnPopup('shop');//购物车弹窗
}

                        //article1

//nav_2
function nav_2Popup (){
    $('.type_list').delegate('li','mouseover', function () {
        $(this).addClass('active');
        $(this).siblings().removeClass('active');
        $('.popup_nav_2').show();
        removePopupData();
        createPopupData($(this).index());
    });
    $('#nav_2').on('mouseleave', function () {
        $(this).find('.active').removeClass('active');
        $('.popup_nav_2').hide();
    });
    nav_2Scroll();//弹窗动态高度
    function nav_2Scroll() {
        $(window).scroll(function () {
            if ($(window).scrollTop() > 178) {
                $('.popup_nav_2').css('top', $(window).scrollTop() - 178);
            }else{
                $('.popup_nav_2').css('top', -1);
            }
        })
    }
}
//创建nav_2的弹窗数据
function createPopupData(index){
    var arr1= [
        {
            "title":['品牌日','家电城','智能生活馆','京东净化馆','京东帮服务店','值得买精选'],
            "img_a":['img/adlogo/2_a_1.gif','img/adlogo/2_a_2.gif','img/adlogo/2_a_3.gif','img/adlogo/2_a_4.gif','img/adlogo/2_a_5.gif','img/adlogo/2_a_6.gif','img/adlogo/2_a_7.gif','img/adlogo/2_a_7.gif'],
            "img_b":['img/adlogo/2_b_1.gif','img/adlogo/2_b_2.gif']
        },
        {
            "title":['金融首页','尖er货','玩bigger','大牌免息','财发现'],
            "img_a":['img/adlogo/3_a_1.gif','img/adlogo/3_a_2.gif','img/adlogo/3_a_3.gif','img/adlogo/3_a_4.gif','img/adlogo/3_a_5.gif','img/adlogo/3_a_6.gif','img/adlogo/3_a_7.gif','img/adlogo/3_a_7.gif'],
            "img_b":['img/adlogo/3_b_1.gif','img/adlogo/3_b_2.gif']
        },
        {
            "title":['男装','女装','内衣','珠宝','国际品牌','饰品'],
            "img_a":['img/adlogo/1_a_1.gif','img/adlogo/1_a_2.gif','img/adlogo/1_a_3.gif','img/adlogo/1_a_4.gif','img/adlogo/1_a_5.gif','img/adlogo/1_a_6.gif','img/adlogo/1_a_7.gif','img/adlogo/1_a_7.gif'],
            "img_b":['img/adlogo/1_b_1.gif','img/adlogo/1_b_2.gif']
        },
        {
            "title":['品牌日','家电城','智能生活馆','京东净化馆','京东帮服务店','值得买精选'],
            "img_a":['img/adlogo/2_a_1.gif','img/adlogo/2_a_2.gif','img/adlogo/2_a_3.gif','img/adlogo/2_a_4.gif','img/adlogo/2_a_5.gif','img/adlogo/2_a_6.gif','img/adlogo/2_a_7.gif','img/adlogo/2_a_7.gif'],
            "img_b":['img/adlogo/2_b_1.gif','img/adlogo/2_b_2.gif']
        },
        {
            "title":['金融首页','尖er货','玩bigger','大牌免息','财发现'],
            "img_a":['img/adlogo/3_a_1.gif','img/adlogo/3_a_2.gif','img/adlogo/3_a_3.gif','img/adlogo/3_a_4.gif','img/adlogo/3_a_5.gif','img/adlogo/3_a_6.gif','img/adlogo/3_a_7.gif','img/adlogo/3_a_7.gif'],
            "img_b":['img/adlogo/3_b_1.gif','img/adlogo/3_b_2.gif']
        },
        {
            "title":['男装','女装','内衣','珠宝','国际品牌','饰品'],
            "img_a":['img/adlogo/1_a_1.gif','img/adlogo/1_a_2.gif','img/adlogo/1_a_3.gif','img/adlogo/1_a_4.gif','img/adlogo/1_a_5.gif','img/adlogo/1_a_6.gif','img/adlogo/1_a_7.gif','img/adlogo/1_a_7.gif'],
            "img_b":['img/adlogo/1_b_1.gif','img/adlogo/1_b_2.gif']
        },
        {
            "title":['品牌日','家电城','智能生活馆','京东净化馆','京东帮服务店','值得买精选'],
            "img_a":['img/adlogo/2_a_1.gif','img/adlogo/2_a_2.gif','img/adlogo/2_a_3.gif','img/adlogo/2_a_4.gif','img/adlogo/2_a_5.gif','img/adlogo/2_a_6.gif','img/adlogo/2_a_7.gif','img/adlogo/2_a_7.gif'],
            "img_b":['img/adlogo/2_b_1.gif','img/adlogo/2_b_2.gif']
        },
        {
            "title":['金融首页','尖er货','玩bigger','大牌免息','财发现'],
            "img_a":['img/adlogo/3_a_1.gif','img/adlogo/3_a_2.gif','img/adlogo/3_a_3.gif','img/adlogo/3_a_4.gif','img/adlogo/3_a_5.gif','img/adlogo/3_a_6.gif','img/adlogo/3_a_7.gif','img/adlogo/3_a_7.gif'],
            "img_b":['img/adlogo/3_b_1.gif','img/adlogo/3_b_2.gif']
        },
        {
            "title":['男装','女装','内衣','珠宝','国际品牌','饰品'],
            "img_a":['img/adlogo/1_a_1.gif','img/adlogo/1_a_2.gif','img/adlogo/1_a_3.gif','img/adlogo/1_a_4.gif','img/adlogo/1_a_5.gif','img/adlogo/1_a_6.gif','img/adlogo/1_a_7.gif','img/adlogo/1_a_7.gif'],
            "img_b":['img/adlogo/1_b_1.gif','img/adlogo/1_b_2.gif']
        },
        {
            "title":['品牌日','家电城','智能生活馆','京东净化馆','京东帮服务店','值得买精选'],
            "img_a":['img/adlogo/2_a_1.gif','img/adlogo/2_a_2.gif','img/adlogo/2_a_3.gif','img/adlogo/2_a_4.gif','img/adlogo/2_a_5.gif','img/adlogo/2_a_6.gif','img/adlogo/2_a_7.gif','img/adlogo/2_a_7.gif'],
            "img_b":['img/adlogo/2_b_1.gif','img/adlogo/2_b_2.gif']
        },
        {
            "title":['金融首页','尖er货','玩bigger','大牌免息','财发现'],
            "img_a":['img/adlogo/3_a_1.gif','img/adlogo/3_a_2.gif','img/adlogo/3_a_3.gif','img/adlogo/3_a_4.gif','img/adlogo/3_a_5.gif','img/adlogo/3_a_6.gif','img/adlogo/3_a_7.gif','img/adlogo/3_a_7.gif'],
            "img_b":['img/adlogo/3_b_1.gif','img/adlogo/3_b_2.gif']
        },
        {
            "title":['男装','女装','内衣','珠宝','国际品牌','饰品'],
            "img_a":['img/adlogo/1_a_1.gif','img/adlogo/1_a_2.gif','img/adlogo/1_a_3.gif','img/adlogo/1_a_4.gif','img/adlogo/1_a_5.gif','img/adlogo/1_a_6.gif','img/adlogo/1_a_7.gif','img/adlogo/1_a_7.gif'],
            "img_b":['img/adlogo/1_b_1.gif','img/adlogo/1_b_2.gif']
        },
        {
            "title":['品牌日','家电城','智能生活馆','京东净化馆','京东帮服务店','值得买精选'],
            "img_a":['img/adlogo/2_a_1.gif','img/adlogo/2_a_2.gif','img/adlogo/2_a_3.gif','img/adlogo/2_a_4.gif','img/adlogo/2_a_5.gif','img/adlogo/2_a_6.gif','img/adlogo/2_a_7.gif','img/adlogo/2_a_7.gif'],
            "img_b":['img/adlogo/2_b_1.gif','img/adlogo/2_b_2.gif']
        },
        {
            "title":['金融首页','尖er货','玩bigger','大牌免息','财发现'],
            "img_a":['img/adlogo/3_a_1.gif','img/adlogo/3_a_2.gif','img/adlogo/3_a_3.gif','img/adlogo/3_a_4.gif','img/adlogo/3_a_5.gif','img/adlogo/3_a_6.gif','img/adlogo/3_a_7.gif','img/adlogo/3_a_7.gif'],
            "img_b":['img/adlogo/3_b_1.gif','img/adlogo/3_b_2.gif']
        },
        {
            "title":['男装','女装','内衣','珠宝','国际品牌','饰品'],
            "img_a":['img/adlogo/1_a_1.gif','img/adlogo/1_a_2.gif','img/adlogo/1_a_3.gif','img/adlogo/1_a_4.gif','img/adlogo/1_a_5.gif','img/adlogo/1_a_6.gif','img/adlogo/1_a_7.gif','img/adlogo/1_a_7.gif'],
            "img_b":['img/adlogo/1_b_1.gif','img/adlogo/1_b_2.gif']
        }
    ];

    var arr2 =[
        [
            {"dt":'大家电',"dd":['平板电视','家用空调','家用中央空调','冰箱','洗衣机','家庭影院','DVD','迷你音响','冰柜/冰吧','酒柜','家电配件']},
            {"dt":'厨卫大电',"dd":['油烟机','燃气灶','烟灶套装','消毒柜','洗碗机','电热水器','燃气热水器','嵌入式厨电']},
            {"dt":'厨房小电',"dd":['电饭煲','微波炉','电烤箱','电磁炉','电压力锅','豆浆机','咖啡机','面包机','榨汁机','料理机','电饼档','养生壶/煎药壶','酸奶机','煮蛋器','电水壶/热水瓶','电炖锅','多用途锅','电烧烤炉','电热饭盒','其他厨房电器']},
            {"dt":'生活电器',"dd":['电风扇','冷风扇','吸尘器','净化器','扫地机器人','加湿器','挂烫机/熨斗','取暖电器','插座','电话机','净水器','饮水机','除湿器','干衣机','清洁机','收录/音机','其他生活电器','生活电器配件']},
            {"dt":'个护健康',"dd":['剃须刀','口腔护理','电吹风','美容器','卷/直发器','理发器','剃/脱毛器','足浴盆','健康秤/厨房秤','按摩器','按摩椅','血压计','血糖仪','体温计','计步器/脂肪检测仪','其他健康电器']},
            {"dt":'五金家族',"dd":['电动工具','手动工具','仪器仪表','浴霸/排气扇','灯具','LED灯','洁身器','水槽','龙头','沐浴花洒','厨卫五金','家具五金','门铃','电器开关','插座','电工电料','监控安防','电线线缆']}
        ],
        [
            {"dt":'理财',"dd":['京东小金库','票据理财','基金理财','定期理财','固收理财','妈妈理财','众投理财']},
            {"dt":'众筹',"dd":['智能硬件','流行文化','生活美学','公益','其他权益众筹']},
            {"dt":'东家',"dd":['私募股权']},
            {"dt":'白条',"dd":['京东白条','白条联名卡','京东钢镚','旅游白条','安居白条','校园白条','京东金采']},
            {"dt":'钱包',"dd":['京东钱包']},
            {"dt":'保险',"dd":['车险','健康险','意外险','旅行险']}
        ],
        [
            {"dt":'女装',"dd":['连衣裙','T恤','雪纺衫','衬衫','休闲裤','牛仔裤','针织衫','短外套','卫衣','小西装','风衣','毛呢大衣','半身裙','短裤','吊带/背心','打底衫','打底裤','症状裤','马甲','大码女装','中老年女装','真皮大衣','皮草','羊毛衫','羊绒衫','棉服','羽绒服','仿皮皮衣','加绒裤','婚纱','旗袍/唐装','礼服','设计师/潮牌']},
            {"dt":'男装',"dd":['衬衫','T恤','牛仔裤','休闲裤','卫衣','针织衫','西服','POLO衫','羽绒服','西服套装','真皮皮衣','夹克','风衣','卫裤/运动裤','短裤','仿皮皮衣','棉服','马甲/背心','毛呢大衣','羊毛衫','羊绒衫','大码男装','中老年男装','工装','设计师/潮牌','唐装/中山装','加绒裤']},
            {"dt":'内衣',"dd":['文胸','睡衣/家具服','男士内裤','女士内裤','塑身美体','文胸套装','情侣睡衣','吊带/背心','少女文胸','休闲棉袜','上午男袜','连裤袜/丝袜','美腿袜','打底裤袜','抹胸','内衣配件','大码内衣','打底衫','泳衣','秋衣秋裤','保暖内衣','情趣内衣']},
            {"dt":'配饰',"dd":['太阳镜','光学镜架/镜片','男士腰带/礼盒','防辐射眼镜','老花镜','女士丝巾/围巾/披肩','男士丝巾/围巾','棒球帽','遮阳帽','鸭舌帽','贝雷帽','礼帽','毛绒帽','防晒手套','真皮手套','围巾/手套/帽子套装','遮阳伞/雨伞','女士腰带/礼盒','口罩','假领','毛绒/布面料','领带/领结/领带夹','耳罩/耳包','袖扣','钥匙扣']},
            {"dt":'童装童鞋',"dd":['套装','上衣','运动鞋','裤子','内衣','皮鞋/帆布鞋','亲子装','羽绒服/棉服','运动服','靴子','演出服','裙子','功能鞋','凉鞋','配饰']}
        ],
        [
            {"dt":'大家电',"dd":['平板电视','家用空调','家用中央空调','冰箱','洗衣机','家庭影院','DVD','迷你音响','冰柜/冰吧','酒柜','家电配件']},
            {"dt":'厨卫大电',"dd":['油烟机','燃气灶','烟灶套装','消毒柜','洗碗机','电热水器','燃气热水器','嵌入式厨电']},
            {"dt":'厨房小电',"dd":['电饭煲','微波炉','电烤箱','电磁炉','电压力锅','豆浆机','咖啡机','面包机','榨汁机','料理机','电饼档','养生壶/煎药壶','酸奶机','煮蛋器','电水壶/热水瓶','电炖锅','多用途锅','电烧烤炉','电热饭盒','其他厨房电器']},
            {"dt":'生活电器',"dd":['电风扇','冷风扇','吸尘器','净化器','扫地机器人','加湿器','挂烫机/熨斗','取暖电器','插座','电话机','净水器','饮水机','除湿器','干衣机','清洁机','收录/音机','其他生活电器','生活电器配件']},
            {"dt":'个护健康',"dd":['剃须刀','口腔护理','电吹风','美容器','卷/直发器','理发器','剃/脱毛器','足浴盆','健康秤/厨房秤','按摩器','按摩椅','血压计','血糖仪','体温计','计步器/脂肪检测仪','其他健康电器']},
            {"dt":'五金家族',"dd":['电动工具','手动工具','仪器仪表','浴霸/排气扇','灯具','LED灯','洁身器','水槽','龙头','沐浴花洒','厨卫五金','家具五金','门铃','电器开关','插座','电工电料','监控安防','电线线缆']}
        ],
        [
            {"dt":'理财',"dd":['京东小金库','票据理财','基金理财','定期理财','固收理财','妈妈理财','众投理财']},
            {"dt":'众筹',"dd":['智能硬件','流行文化','生活美学','公益','其他权益众筹']},
            {"dt":'东家',"dd":['私募股权']},
            {"dt":'白条',"dd":['京东白条','白条联名卡','京东钢镚','旅游白条','安居白条','校园白条','京东金采']},
            {"dt":'钱包',"dd":['京东钱包']},
            {"dt":'保险',"dd":['车险','健康险','意外险','旅行险']}
        ],
        [
            {"dt":'女装',"dd":['连衣裙','T恤','雪纺衫','衬衫','休闲裤','牛仔裤','针织衫','短外套','卫衣','小西装','风衣','毛呢大衣','半身裙','短裤','吊带/背心','打底衫','打底裤','症状裤','马甲','大码女装','中老年女装','真皮大衣','皮草','羊毛衫','羊绒衫','棉服','羽绒服','仿皮皮衣','加绒裤','婚纱','旗袍/唐装','礼服','设计师/潮牌']},
            {"dt":'男装',"dd":['衬衫','T恤','牛仔裤','休闲裤','卫衣','针织衫','西服','POLO衫','羽绒服','西服套装','真皮皮衣','夹克','风衣','卫裤/运动裤','短裤','仿皮皮衣','棉服','马甲/背心','毛呢大衣','羊毛衫','羊绒衫','大码男装','中老年男装','工装','设计师/潮牌','唐装/中山装','加绒裤']},
            {"dt":'内衣',"dd":['文胸','睡衣/家具服','男士内裤','女士内裤','塑身美体','文胸套装','情侣睡衣','吊带/背心','少女文胸','休闲棉袜','上午男袜','连裤袜/丝袜','美腿袜','打底裤袜','抹胸','内衣配件','大码内衣','打底衫','泳衣','秋衣秋裤','保暖内衣','情趣内衣']},
            {"dt":'配饰',"dd":['太阳镜','光学镜架/镜片','男士腰带/礼盒','防辐射眼镜','老花镜','女士丝巾/围巾/披肩','男士丝巾/围巾','棒球帽','遮阳帽','鸭舌帽','贝雷帽','礼帽','毛绒帽','防晒手套','真皮手套','围巾/手套/帽子套装','遮阳伞/雨伞','女士腰带/礼盒','口罩','假领','毛绒/布面料','领带/领结/领带夹','耳罩/耳包','袖扣','钥匙扣']},
            {"dt":'童装童鞋',"dd":['套装','上衣','运动鞋','裤子','内衣','皮鞋/帆布鞋','亲子装','羽绒服/棉服','运动服','靴子','演出服','裙子','功能鞋','凉鞋','配饰']}
        ],
        [
            {"dt":'大家电',"dd":['平板电视','家用空调','家用中央空调','冰箱','洗衣机','家庭影院','DVD','迷你音响','冰柜/冰吧','酒柜','家电配件']},
            {"dt":'厨卫大电',"dd":['油烟机','燃气灶','烟灶套装','消毒柜','洗碗机','电热水器','燃气热水器','嵌入式厨电']},
            {"dt":'厨房小电',"dd":['电饭煲','微波炉','电烤箱','电磁炉','电压力锅','豆浆机','咖啡机','面包机','榨汁机','料理机','电饼档','养生壶/煎药壶','酸奶机','煮蛋器','电水壶/热水瓶','电炖锅','多用途锅','电烧烤炉','电热饭盒','其他厨房电器']},
            {"dt":'生活电器',"dd":['电风扇','冷风扇','吸尘器','净化器','扫地机器人','加湿器','挂烫机/熨斗','取暖电器','插座','电话机','净水器','饮水机','除湿器','干衣机','清洁机','收录/音机','其他生活电器','生活电器配件']},
            {"dt":'个护健康',"dd":['剃须刀','口腔护理','电吹风','美容器','卷/直发器','理发器','剃/脱毛器','足浴盆','健康秤/厨房秤','按摩器','按摩椅','血压计','血糖仪','体温计','计步器/脂肪检测仪','其他健康电器']},
            {"dt":'五金家族',"dd":['电动工具','手动工具','仪器仪表','浴霸/排气扇','灯具','LED灯','洁身器','水槽','龙头','沐浴花洒','厨卫五金','家具五金','门铃','电器开关','插座','电工电料','监控安防','电线线缆']}
        ],
        [
            {"dt":'理财',"dd":['京东小金库','票据理财','基金理财','定期理财','固收理财','妈妈理财','众投理财']},
            {"dt":'众筹',"dd":['智能硬件','流行文化','生活美学','公益','其他权益众筹']},
            {"dt":'东家',"dd":['私募股权']},
            {"dt":'白条',"dd":['京东白条','白条联名卡','京东钢镚','旅游白条','安居白条','校园白条','京东金采']},
            {"dt":'钱包',"dd":['京东钱包']},
            {"dt":'保险',"dd":['车险','健康险','意外险','旅行险']}
        ],
        [
            {"dt":'女装',"dd":['连衣裙','T恤','雪纺衫','衬衫','休闲裤','牛仔裤','针织衫','短外套','卫衣','小西装','风衣','毛呢大衣','半身裙','短裤','吊带/背心','打底衫','打底裤','症状裤','马甲','大码女装','中老年女装','真皮大衣','皮草','羊毛衫','羊绒衫','棉服','羽绒服','仿皮皮衣','加绒裤','婚纱','旗袍/唐装','礼服','设计师/潮牌']},
            {"dt":'男装',"dd":['衬衫','T恤','牛仔裤','休闲裤','卫衣','针织衫','西服','POLO衫','羽绒服','西服套装','真皮皮衣','夹克','风衣','卫裤/运动裤','短裤','仿皮皮衣','棉服','马甲/背心','毛呢大衣','羊毛衫','羊绒衫','大码男装','中老年男装','工装','设计师/潮牌','唐装/中山装','加绒裤']},
            {"dt":'内衣',"dd":['文胸','睡衣/家具服','男士内裤','女士内裤','塑身美体','文胸套装','情侣睡衣','吊带/背心','少女文胸','休闲棉袜','上午男袜','连裤袜/丝袜','美腿袜','打底裤袜','抹胸','内衣配件','大码内衣','打底衫','泳衣','秋衣秋裤','保暖内衣','情趣内衣']},
            {"dt":'配饰',"dd":['太阳镜','光学镜架/镜片','男士腰带/礼盒','防辐射眼镜','老花镜','女士丝巾/围巾/披肩','男士丝巾/围巾','棒球帽','遮阳帽','鸭舌帽','贝雷帽','礼帽','毛绒帽','防晒手套','真皮手套','围巾/手套/帽子套装','遮阳伞/雨伞','女士腰带/礼盒','口罩','假领','毛绒/布面料','领带/领结/领带夹','耳罩/耳包','袖扣','钥匙扣']},
            {"dt":'童装童鞋',"dd":['套装','上衣','运动鞋','裤子','内衣','皮鞋/帆布鞋','亲子装','羽绒服/棉服','运动服','靴子','演出服','裙子','功能鞋','凉鞋','配饰']}
        ],
        [
            {"dt":'大家电',"dd":['平板电视','家用空调','家用中央空调','冰箱','洗衣机','家庭影院','DVD','迷你音响','冰柜/冰吧','酒柜','家电配件']},
            {"dt":'厨卫大电',"dd":['油烟机','燃气灶','烟灶套装','消毒柜','洗碗机','电热水器','燃气热水器','嵌入式厨电']},
            {"dt":'厨房小电',"dd":['电饭煲','微波炉','电烤箱','电磁炉','电压力锅','豆浆机','咖啡机','面包机','榨汁机','料理机','电饼档','养生壶/煎药壶','酸奶机','煮蛋器','电水壶/热水瓶','电炖锅','多用途锅','电烧烤炉','电热饭盒','其他厨房电器']},
            {"dt":'生活电器',"dd":['电风扇','冷风扇','吸尘器','净化器','扫地机器人','加湿器','挂烫机/熨斗','取暖电器','插座','电话机','净水器','饮水机','除湿器','干衣机','清洁机','收录/音机','其他生活电器','生活电器配件']},
            {"dt":'个护健康',"dd":['剃须刀','口腔护理','电吹风','美容器','卷/直发器','理发器','剃/脱毛器','足浴盆','健康秤/厨房秤','按摩器','按摩椅','血压计','血糖仪','体温计','计步器/脂肪检测仪','其他健康电器']},
            {"dt":'五金家族',"dd":['电动工具','手动工具','仪器仪表','浴霸/排气扇','灯具','LED灯','洁身器','水槽','龙头','沐浴花洒','厨卫五金','家具五金','门铃','电器开关','插座','电工电料','监控安防','电线线缆']}
        ],
        [
            {"dt":'理财',"dd":['京东小金库','票据理财','基金理财','定期理财','固收理财','妈妈理财','众投理财']},
            {"dt":'众筹',"dd":['智能硬件','流行文化','生活美学','公益','其他权益众筹']},
            {"dt":'东家',"dd":['私募股权']},
            {"dt":'白条',"dd":['京东白条','白条联名卡','京东钢镚','旅游白条','安居白条','校园白条','京东金采']},
            {"dt":'钱包',"dd":['京东钱包']},
            {"dt":'保险',"dd":['车险','健康险','意外险','旅行险']}
        ],
        [
            {"dt":'女装',"dd":['连衣裙','T恤','雪纺衫','衬衫','休闲裤','牛仔裤','针织衫','短外套','卫衣','小西装','风衣','毛呢大衣','半身裙','短裤','吊带/背心','打底衫','打底裤','症状裤','马甲','大码女装','中老年女装','真皮大衣','皮草','羊毛衫','羊绒衫','棉服','羽绒服','仿皮皮衣','加绒裤','婚纱','旗袍/唐装','礼服','设计师/潮牌']},
            {"dt":'男装',"dd":['衬衫','T恤','牛仔裤','休闲裤','卫衣','针织衫','西服','POLO衫','羽绒服','西服套装','真皮皮衣','夹克','风衣','卫裤/运动裤','短裤','仿皮皮衣','棉服','马甲/背心','毛呢大衣','羊毛衫','羊绒衫','大码男装','中老年男装','工装','设计师/潮牌','唐装/中山装','加绒裤']},
            {"dt":'内衣',"dd":['文胸','睡衣/家具服','男士内裤','女士内裤','塑身美体','文胸套装','情侣睡衣','吊带/背心','少女文胸','休闲棉袜','上午男袜','连裤袜/丝袜','美腿袜','打底裤袜','抹胸','内衣配件','大码内衣','打底衫','泳衣','秋衣秋裤','保暖内衣','情趣内衣']},
            {"dt":'配饰',"dd":['太阳镜','光学镜架/镜片','男士腰带/礼盒','防辐射眼镜','老花镜','女士丝巾/围巾/披肩','男士丝巾/围巾','棒球帽','遮阳帽','鸭舌帽','贝雷帽','礼帽','毛绒帽','防晒手套','真皮手套','围巾/手套/帽子套装','遮阳伞/雨伞','女士腰带/礼盒','口罩','假领','毛绒/布面料','领带/领结/领带夹','耳罩/耳包','袖扣','钥匙扣']},
            {"dt":'童装童鞋',"dd":['套装','上衣','运动鞋','裤子','内衣','皮鞋/帆布鞋','亲子装','羽绒服/棉服','运动服','靴子','演出服','裙子','功能鞋','凉鞋','配饰']}
        ],
        [
            {"dt":'大家电',"dd":['平板电视','家用空调','家用中央空调','冰箱','洗衣机','家庭影院','DVD','迷你音响','冰柜/冰吧','酒柜','家电配件']},
            {"dt":'厨卫大电',"dd":['油烟机','燃气灶','烟灶套装','消毒柜','洗碗机','电热水器','燃气热水器','嵌入式厨电']},
            {"dt":'厨房小电',"dd":['电饭煲','微波炉','电烤箱','电磁炉','电压力锅','豆浆机','咖啡机','面包机','榨汁机','料理机','电饼档','养生壶/煎药壶','酸奶机','煮蛋器','电水壶/热水瓶','电炖锅','多用途锅','电烧烤炉','电热饭盒','其他厨房电器']},
            {"dt":'生活电器',"dd":['电风扇','冷风扇','吸尘器','净化器','扫地机器人','加湿器','挂烫机/熨斗','取暖电器','插座','电话机','净水器','饮水机','除湿器','干衣机','清洁机','收录/音机','其他生活电器','生活电器配件']},
            {"dt":'个护健康',"dd":['剃须刀','口腔护理','电吹风','美容器','卷/直发器','理发器','剃/脱毛器','足浴盆','健康秤/厨房秤','按摩器','按摩椅','血压计','血糖仪','体温计','计步器/脂肪检测仪','其他健康电器']},
            {"dt":'五金家族',"dd":['电动工具','手动工具','仪器仪表','浴霸/排气扇','灯具','LED灯','洁身器','水槽','龙头','沐浴花洒','厨卫五金','家具五金','门铃','电器开关','插座','电工电料','监控安防','电线线缆']}
        ],
        [
            {"dt":'理财',"dd":['京东小金库','票据理财','基金理财','定期理财','固收理财','妈妈理财','众投理财']},
            {"dt":'众筹',"dd":['智能硬件','流行文化','生活美学','公益','其他权益众筹']},
            {"dt":'东家',"dd":['私募股权']},
            {"dt":'白条',"dd":['京东白条','白条联名卡','京东钢镚','旅游白条','安居白条','校园白条','京东金采']},
            {"dt":'钱包',"dd":['京东钱包']},
            {"dt":'保险',"dd":['车险','健康险','意外险','旅行险']}
        ],
        [
            {"dt":'女装',"dd":['连衣裙','T恤','雪纺衫','衬衫','休闲裤','牛仔裤','针织衫','短外套','卫衣','小西装','风衣','毛呢大衣','半身裙','短裤','吊带/背心','打底衫','打底裤','症状裤','马甲','大码女装','中老年女装','真皮大衣','皮草','羊毛衫','羊绒衫','棉服','羽绒服','仿皮皮衣','加绒裤','婚纱','旗袍/唐装','礼服','设计师/潮牌']},
            {"dt":'男装',"dd":['衬衫','T恤','牛仔裤','休闲裤','卫衣','针织衫','西服','POLO衫','羽绒服','西服套装','真皮皮衣','夹克','风衣','卫裤/运动裤','短裤','仿皮皮衣','棉服','马甲/背心','毛呢大衣','羊毛衫','羊绒衫','大码男装','中老年男装','工装','设计师/潮牌','唐装/中山装','加绒裤']},
            {"dt":'内衣',"dd":['文胸','睡衣/家具服','男士内裤','女士内裤','塑身美体','文胸套装','情侣睡衣','吊带/背心','少女文胸','休闲棉袜','上午男袜','连裤袜/丝袜','美腿袜','打底裤袜','抹胸','内衣配件','大码内衣','打底衫','泳衣','秋衣秋裤','保暖内衣','情趣内衣']},
            {"dt":'配饰',"dd":['太阳镜','光学镜架/镜片','男士腰带/礼盒','防辐射眼镜','老花镜','女士丝巾/围巾/披肩','男士丝巾/围巾','棒球帽','遮阳帽','鸭舌帽','贝雷帽','礼帽','毛绒帽','防晒手套','真皮手套','围巾/手套/帽子套装','遮阳伞/雨伞','女士腰带/礼盒','口罩','假领','毛绒/布面料','领带/领结/领带夹','耳罩/耳包','袖扣','钥匙扣']},
            {"dt":'童装童鞋',"dd":['套装','上衣','运动鞋','裤子','内衣','皮鞋/帆布鞋','亲子装','羽绒服/棉服','运动服','靴子','演出服','裙子','功能鞋','凉鞋','配饰']}
        ]

    ];


    for(var i= 0; i<arr1[index].title.length; i++){
        var $title = $('<li><a href="#"><span>' + arr1[index].title[i] + '</span><i>></i></a></li>');
        $('.nav_2_1').append($title)
    }
    for(var i= 0; i<arr1[index].img_a.length; i++){
        var $img_a = $('<li><a href="#"><img src="' + arr1[index].img_a[i] + '"></a></li>');
        $('.nav_2_3').append($img_a)
    }
    for(var i= 0; i<arr1[index].img_b.length; i++){
        var $img_b = $('<li><a href="#"><img src="' + arr1[index].img_b[i] + '"></a></li>');
        $('.nav_2_4').append($img_b)
    }
    for(var i= 0; i<arr2[index].length; i++){
        var $dl = $('<dl class="clear"></dl>');
        $('.nav_2_2').append($dl);
        var $dt = $('<dt><span>' + arr2[index][i].dt + '</span><i>></i></dt>');
        $dl.append($dt);
        var $dd = $('<dd></dd>');
        $dl.append($dd);
        for(var j= 0; j<arr2[index][i].dd.length; j++){
            var $div = $('<div><a href="#">' + arr2[index][i].dd[j] + '</a></div>');
            $dd.append($div);
        }
    }
}
//删除nav_2的弹窗数据
function removePopupData(){
    $('.nav_2_1').empty();
    $('.nav_2_2').empty();
    $('.nav_2_3').empty();
    $('.nav_2_4').empty();
}

//loop_1
function loop_1(){
    var $wrap= $('.loop_1').find('.wrap');
    fnTab($wrap,true,1);
}

//side_1
function sortLogo(){
    var $logo = $('.side_1').find('.content em');
    $logo.each(function (i,elem) {
        $(elem).css('background-position-y',-25*i)
    })
}

//today
function today(){
    fnWatch();
    today_list_data();
    fnTab($('.today_list'),false,2)
}
//watch
function fnWatch(){
    var $hour =$('#hour');
    var $min =$('#min');
    var $sec =$('#sec');
    var nnn=0 ;
    var mmm=0 ;
    toTime($hour,$min,$sec);
    setInterval(function(){
        nnn++;
        mmm++;
        nnn=nnn%360;
        mmm=mmm%720;
        toTime($hour,$min,$sec,nnn,mmm);
    },25);
    function toTime($hour,$min,$sec,n,m)
    {
        var oDate=new Date();
        var iSec=oDate.getSeconds();
        var iMin=oDate.getMinutes()+iSec/60;
        var iHour=(oDate.getHours()%12)+iMin/60;
        $sec.css('transform','rotate('+(n)+'deg)');
        $min.css('transform','rotate('+(m*0.5)+'deg)');
        $hour.css('transform','rotate('+(iHour*360/12)+'deg)');
    }
}
//today_list
function today_list_data(){
    var arr = [
        ['img/adtoday/1.jpg','img/adtoday/2.jpg','img/adtoday/3.jpg','img/adtoday/4.jpg'],
        ['img/adtoday/5.jpg','img/adtoday/6.jpg','img/adtoday/7.jpg','img/adtoday/8.jpg'],
        ['img/adtoday/9.jpg','img/adtoday/10.jpg','img/adtoday/11.jpg','img/adtoday/12.jpg'],
        ['img/adtoday/13.jpg','img/adtoday/14.jpg','img/adtoday/15.jpg','img/adtoday/16.jpg']
    ];
    var $li = $('.today_list').find('li');
    for(var i=0 ; i<$li.length; i++){
        for(var j=0 ; j<$li.eq(i).find('div').length;j++){
            var $img = $('<img src="' + arr[i][j] + '">');
            $li.eq(i).find('div').eq(j).append($img)
        }
    }

}

//like
function guessLike(){
    var arr = [
        [
            {'img':'img/guesslike/1.jpg','span':'好奇 Huggies 银装 婴儿纸尿','strong':'¥169.00'},
            {'img':'img/guesslike/2.jpg','span':'维达 卷纸 蓝色经典3层140g','strong':'¥49.90'},
            {'img':'img/guesslike/3.jpg','span':'清风（APP） 卷筒卫生纸 原','strong':'¥45.90'},
            {'img':'img/guesslike/4.jpg','span':'威露士 有氧倍净洗洗衣液','strong':'¥44.90'},
            {'img':'img/guesslike/5.jpg','span':'水星（MERCURY)','strong':'¥55.00'}
        ],
        [
            {'img':'img/guesslike/6.jpg','span':'艾美特(Airmate) FSW52R','strong':'¥199.00'},
            {'img':'img/guesslike/7.jpg','span':'美的（Midea）FS40-13ER','strong':'¥199.90'},
            {'img':'img/guesslike/8.jpg','span':'金龙鱼 东北大米 蟹稻共生','strong':'¥29.90'},
            {'img':'img/guesslike/9.jpg','span':'福临门 苏北米 清香米 中粮','strong':'¥29.90'},
            {'img':'img/guesslike/10.jpg','span':'TP-LINK TL-WR886N 450M','strong':'¥99.00'}
        ],
        [
            {'img':'img/guesslike/11.jpg','span':'日本花王Merries纸尿裤妙而','strong':'¥129.00'},
            {'img':'img/guesslike/12.jpg','span':'帮宝适 Pampers 超薄干爽','strong':'¥199.00'},
            {'img':'img/guesslike/13.jpg','span':'美的（Midea）FS40-11L1','strong':'¥139.00'},
            {'img':'img/guesslike/14.jpg','span':'奥克斯（AUX）FS-40-','strong':'¥99.00'},
            {'img':'img/guesslike/15.jpg','span':'水星（MERCURY)','strong':'¥55.00'}
        ],
        [
            {'img':'img/guesslike/16.jpg','span':'百事可乐 碳酸饮料 把乐带回','strong':'¥49.90'},
            {'img':'img/guesslike/17.jpg','span':'TP-LINK TL-WDR5600 ','strong':'¥149.00'},
            {'img':'img/guesslike/18.jpg','span':'日本花王（Merries）婴儿纸','strong':'¥109.90'},
            {'img':'img/guesslike/19.jpg','span':'美的（Midea）FS40-11L1','strong':'¥139.00'},
            {'img':'img/guesslike/20.jpg','span':'美的（Midea）FS40-13ER','strong':'¥199.90'}
        ]
    ];
    var $ul = $('.like_img').find('ul');
    var num = 0;

    createLike_img();
    lineMove();

    function lineMove(){
        var $like = $('.like');
        var $line = $like.find('.line');
        var t=new TimelineMax();
        $like.on('mouseenter', function () {
            $line.css('left',-365);
            $line.stop().animate({'left':845},1000)
        });

        $like.on('mouseleave', function () {
            $line.finish();
        });
    }


    function createLike_img() {
        createLike_img_data(num);
        $('.like_title').find('.r').on('click', function () {
            num++;
            num = num % arr.length;
            removeLike_img_data();
            createLike_img_data(num)
        });
    }

    function createLike_img_data(n) {
        for (var i = 0; i < arr[n].length; i++) {
            var $li = $('<li>' +
                '<a href="#"><img src="' + arr[n][i].img + '"></a>' +
                '<a href="#"><span>' + arr[n][i].span + '</span></a>' +
                '<strong>' + arr[n][i].strong + '</strong>' +
                '</li>');
            $ul.append($li)
        }
    }

    function removeLike_img_data() {
        $ul.empty();
    }

}

//life
function lifeData(){
    var arr = [
        [
            {'img':'img/life/d_1.jpg','strong':'尚新品','span':'大屏手机就是小米Max','i':'6.44英寸'},
            {'img':'img/life/a_1.png','strong':'新趋势','span':'胶囊小怪兽','i':'跨界合作三重好礼'},
            {'img':'img/life/a_2.jpg','strong':'新先购','span':'掌阅Reader','i':'阅读大不同'}
        ],
        [
            {'img':'img/life/0.jpg','strong':'发现好物','span':'站立两用迷你轻巧','i':'智能平衡车'},
            {'img':'img/life/a_3.jpg','strong':'潮有范','span':'清新迷人花香调','i':'展现性感法宝'}
        ],
        [
            {'img':'img/life/d_2.jpg','strong':'今日大牌','span':'暴风TV','i':'40 “智能电视999元'},
            {'img':'img/life/a_4.jpg','strong':'国际大牌','span':'VANS','i':'潮鞋出街500-20'},
            {'img':'img/life/a_5.jpg','strong':'耐克','span':'ROSHERUN','i':'休闲鞋'}
        ],
        [
            'img/life/l_1.jpg','img/life/l_2.png','img/life/l_3.jpg','img/life/l_4.jpg','img/life/l_5.jpg','img/life/l_6.jpg','img/life/l_7.png'
        ],
        [
            'img/life/l_8.jpg','img/life/l_9.jpg','img/life/l_10.jpg','img/life/l_11.jpg','img/life/l_12.jpg','img/life/l_13.jpg','img/life/l_14.jpg'
        ]
    ];
    createLifeData();
    function createLifeData(){

        for(var i=0; i<arr.length;i++) {
            lifeNum(i);
        }

        $('.life_1').find('img:first').addClass('move_img');
        $('.life_1').find('div:first').addClass('text1');
        $('.life_3').find('img:first').addClass('move_img');
        $('.life_3').find('div:first').addClass('text1');
        $('.life_2').find('div:first').addClass('text2');



        $('.life').find('a').eq(0).addClass('b');
        $('.life').find('a').eq(3).addClass('b');
        $('.life').find('a').eq(5).addClass('b');
        $('.life').find('a').eq(1).addClass('r');
        $('.life').find('a').eq(4).addClass('r');
        $('.life').find('a').eq(6).addClass('r');



        function lifeNum(n) {
            for (var i = 0; i < arr[n].length; i++) {
                if(n<3) {
                    var $a = $('<a href="#">\
                        <div class="text">\
                        <strong>' + arr[n][i].strong + '</strong>\
                        <span>' + arr[n][i].span + '</span>\
                        <i>' + arr[n][i].i + '</i>\
                    </div>\
                    <img src="' + arr[n][i].img + '">\
                        </a>');
                    var m = (n + 1).toString();
                    $('.life_' + m).append($a);
                }else{
                    var $li = $('<li><a href="#"><img src="' + arr[n][i] + '"></a></li>');
                    if(n==3){
                        $('.ul_l').append($li);
                    }else{
                        $('.ul_r').append($li);
                    }

                }
            }
        }

    }
}

                        //content

//cont_ad
function cont_ad(){
    var arr = [
        ['img/ad/a_1.jpg','img/ad/a_2.jpg','img/ad/a_3.jpg'],
        ['img/ad/b_1.jpg','img/ad/b_2.png','img/ad/b_3.jpg'],
        ['img/ad/c_1.png','img/ad/c_2.jpg','img/ad/c_3.jpg'],
        ['img/ad/d_1.png','img/ad/d_2.jpg','img/ad/d_3.jpg']
    ];
    var $con_ad = $('.cont_ad');

    createCont_adData();

    function createCont_adData(){
        for(var i=0; i<arr.length;i++){
            var $ul = $('<ul></ul>');
            $con_ad.eq(i).append($ul);

            for(var j=0; j<arr[i].length;j++){
                var $li = $('<li><a href="#"><img src=" '+ arr[i][j] + '"></a></li>');
                $ul.append($li)
            }
        }

    }
}
//cont_logo
function cont_logo(){
    var arr = [
        ['img/logo/1_1.jpg','img/logo/1_2.jpg','img/logo/1_3.png','img/logo/1_4.jpg','img/logo/1_5.jpg','img/logo/1_6.png','img/logo/1_7.png','img/logo/1_8.jpg','img/logo/1_9.jpg','img/logo/1_10.jpg'],
        ['img/logo/2_1.png','img/logo/2_2.png','img/logo/2_3.jpg','img/logo/2_4.jpg','img/logo/2_5.jpg','img/logo/2_6.jpg','img/logo/2_7.png','img/logo/2_8.jpg','img/logo/2_9.jpg','img/logo/2_10.jpg'],
        ['img/logo/3_1.png','img/logo/3_2.png','img/logo/3_3.jpg','img/logo/3_4.jpg','img/logo/3_5.jpg','img/logo/3_6.jpg','img/logo/3_7.jpg','img/logo/3_8.jpg','img/logo/3_9.png','img/logo/3_10.png'],
        ['img/logo/4_1.jpg','img/logo/4_2.png','img/logo/4_3.jpg','img/logo/4_4.jpg','img/logo/4_5.jpg','img/logo/4_6.jpg','img/logo/4_7.jpg','img/logo/4_8.jpg','img/logo/4_9.jpg','img/logo/4_10.jpg'],
        ['img/logo/5_1.png','img/logo/5_2.jpg','img/logo/5_3.png','img/logo/5_4.png','img/logo/5_5.jpg','img/logo/5_6.png','img/logo/5_7.png','img/logo/5_8.jpg','img/logo/5_9.jpg','img/logo/5_10.png'],
        ['img/logo/6_1.jpg','img/logo/6_2.png','img/logo/6_3.png','img/logo/6_4.jpg','img/logo/6_5.png','img/logo/6_6.png','img/logo/6_7.jpg','img/logo/6_8.jpg','img/logo/6_9.jpg','img/logo/6_10.jpg'],
        ['img/logo/7_1.jpg','img/logo/7_2.png','img/logo/7_3.png','img/logo/7_4.jpg','img/logo/7_5.jpg','img/logo/7_6.jpg','img/logo/7_7.jpg','img/logo/7_8.png','img/logo/7_9.png','img/logo/7_10.jpg'],
        ['img/logo/8_1.jpg','img/logo/8_2.jpg','img/logo/8_3.png','img/logo/8_4.jpg','img/logo/8_5.jpg','img/logo/8_6.jpg','img/logo/8_7.jpg','img/logo/8_8.png','img/logo/8_9.jpg','img/logo/8_10.png'],
        ['img/logo/9_1.jpg','img/logo/9_2.jpg','img/logo/9_3.jpg','img/logo/9_4.png','img/logo/9_5.jpg','img/logo/9_6.jpg','img/logo/9_7.jpg','img/logo/9_8.png','img/logo/9_9.jpg','img/logo/9_10.jpg'],
        ['img/logo/10_1.jpg','img/logo/10_2.jpg','img/logo/10_3.jpg','img/logo/10_4.png','img/logo/10_5.png','img/logo/10_6.png','img/logo/10_7.jpg','img/logo/10_8.jpg','img/logo/10_9.png','img/logo/10_10.jpg'],
        ['img/logo/11_1.jpg','img/logo/11_2.png','img/logo/11_3.jpg','img/logo/11_4.jpg','img/logo/11_5.jpg','img/logo/11_6.jpg','img/logo/11_7.jpg','img/logo/11_8.jpg','img/logo/11_9.png','img/logo/11_10.png'],
        ['img/logo/12_1.jpg','img/logo/12_2.jpg','img/logo/12_3.jpg','img/logo/12_4.jpg','img/logo/11_5.jpg','img/logo/12_6.jpg','img/logo/12_7.png','img/logo/12_8.png','img/logo/12_9.png','img/logo/12_10.jpg']
    ];

    createCont_logoData();
    function createCont_logoData() {
        for (var i = 0; i < arr.length; i++) {
            var $div = $('<div class="cont_logo"></div>');
            $('.cont').eq(i).append($div);

            var $ul = $('<ul></ul>');
            $div.append($ul);
            for(var j=0; j<arr[i].length; j++){
                var $li = $('<li><img src="' + arr[i][j] +' "></li>');
                $ul.append($li);
            }
            $ul.find('li:last').addClass('_li');
        }
            $('.cont_wrap').after($('.cont_logo').eq(11));

    }
}
//title
function cont_title(){
    var arr = [
        ['大牌','男装','女装','鞋靴','箱包','内衣配饰','珠宝首饰','奢品礼品','奢华腕表'],
        ['热门','国际大牌','国妆名品','个人护理','清洁用品','纸品湿巾','香水彩妆','热销面膜','男士精品'],
        ['热门','新品','性价比','运营商','手机配件','JDPhone','京东一七零','汽车用品'],
        ['热门','大家电','厨房电器','个护健康','应季电器','空净/净水','新奇特','高端电器'],
        ['热门','电脑/平板','潮流影音','智能外设','DIY硬件','电竞游戏','办公/网络','文具电教','精品配件'],
        ['热门','大牌速递','潮牌新品','运动鞋服','健身训练','休闲户外','智能运动'],
        ['热门','家装建材','品质家具','厨房用品','床上用品','居家百货','大牌名品','装修定制'],
        ['热门','奶粉辅食','尿裤湿巾','洗护喂养','童装童鞋','童车童床','妈妈专区','玩具乐器'],
        ['热门','粮油生鲜','饮料牛奶','休闲食品','顶级白酒','热销名品','保健食品','营养滋补','保健器械'],
        ['热门','少儿','教育科技','文学小说','人文社科','经管励志','生活艺术','音像产品','电子书'],
        ['热门','低价购车','厂商优惠','二手好车','车载电器','汽车保养','汽车配件','汽车装饰','汽车服务']
    ];

    createTitleData();
    $('.title').find('li').each(function (i,elem) {
        $(elem).css('width',$(elem).find('strong').outerWidth());
        $(elem).css('position','relative')
    });

    function createTitleData(){
        for(var i=0; i<arr.length;i++){
            var $ul = $('<ul></ul>');
            $('.title').eq(i).append($ul);
            for(var j=0; j<arr[i].length;j++){
                var $li = $('<li><strong>' + arr[i][j] + '</strong><span></span></li>');
                $ul.append($li);
            }
            $ul.find('strong:first').addClass('active');
            $ul.find('span:last').addClass('_span');
        }
    }


}
//tab
function cont_tab(){
    fnTab($('.cont_1f').find('.t_1'),true,3);
    fnTab($('.cont_2f').find('.t_2'),true,3);
    fnTab($('.cont_3f').find('.t_1'),true,3);
    fnTab($('.cont_4f').find('.t_1'),true,3);
    fnTab($('.cont_5f').find('.t_1'),true,3);
    fnTab($('.cont_6f').find('.t_2'),true,3);
    fnTab($('.cont_7f').find('.t_2'),true,3);
    fnTab($('.cont_8f').find('.t_2'),true,3);
    fnTab($('.cont_9f').find('.t_2'),true,3);
    fnTab($('.cont_10f').find('.t_1'),true,3);
    fnTab($('.cont_11f').find('.t_1'),true,3);
    fnTab($('.cont_12f .cont_1').find('.t_1'),true,3);
    fnTab($('.cont_12f .cont_2').find('.t_1'),true,3);
}
//cont
function createContData() {
    var arr = [
        {
            'f': 'img/1F/1f.jpg',
            'icon': 'img/1F/1ficon.png',
            'span': ['男装', '女装', '内衣', '鞋靴', '箱包', '奢侈品'],
            'li_1': ['女装新品', '品质男鞋', '服装城', '太阳镜', '时尚女鞋', '精品男装', '纯棉内裤', '奢侈品', '菩提手串', '水晶手链', '时尚女包', '精品男包', '小叶紫檀', '奢品名表', '热销腕表', '新品首发'],
            'img' : ['img/1F/1.jpg','img/1F/2.jpg','img/1F/3.jpg','img/1F/5.jpg','img/1F/6.jpg','img/1F/7.jpg','img/1F/8.jpg'],
            't' : ['img/1F/t_1.jpg','img/1F/t_2.jpg','img/1F/t_3.jpg','img/1F/t_4.jpg']
        },
        {
            'f': 'img/2F/2f.jpg',
            'icon': 'img/2F/2ficon.png',
            'span': ['美妆特卖', '个护健康', '美妆商城', '官方直售'],
            'li_2': ['欧莱雅超级品类日', '个护清洁 满400减210'],
            'li_3': ['国际馆', '国妆馆', '全球购馆', '洗护馆', '纸品馆', '清洁馆'],
            'img' : ['img/2F/2.png','img/2F/3.jpg','img/2F/4.jpg','img/2F/5.jpg','img/2F/6.jpg','img/2F/7.jpg'],
            't'   : ['img/2F/t_a_1.jpg','img/2F/t_b_1.jpg','img/2F/t_a_2.jpg','img/2F/t_b_2.jpg','img/2F/t_a_3.jpg','img/2F/t_b_3.jpg','img/2F/t_a_4.jpg','img/2F/t_b_4.jpg']
        },
        {
            'f': 'img/3F/3f.jpg',
            'icon': 'img/3F/3ficon.png',
            'span': ['手机', '营业厅', '配件'],
            'li_2': ['517京东网厅 抽大奖', '预存39元得50元话费', '华为G9青春版抢购', '手机壳膜低至9.9元'],
            'li_1': ['手机通讯', '依旧换新', '手机管家','指纹识别','双卡双待', '老人机', '高清屏', '金属机身', '精品特惠', '517元红包', '专享特惠', '4G套餐', '品质联盟', '对讲机', '移动电源', '蓝牙耳机'],
            'img' : ['img/3F/2.jpg','img/3F/3.jpg','img/3F/4.png','img/3F/5.jpg','img/3F/6.jpg','img/3F/7.jpg','img/3F/8.jpg','img/3F/9.jpg'],
            't' : ['img/3F/t_1.jpg','img/3F/t_2.jpg','img/3F/t_3.jpg','img/3F/t_4.jpg']
        },
        {
            'f': 'img/4F/4f.jpg',
            'icon': 'img/4F/4ficon.png',
            'span': ['家电城', '家电服务'],
            'li_2': ['大家电配送说明', '最高补贴13%', '冰洗两件9折', '京豆直接当钱花'],
            'li_1': ['节能补贴', '烟灶套装', '圆柱空调','曲面电视','空气净化器', '风冷冰箱', '滚筒洗衣机', '电热水器', '4K电视', '扫地机器人', '原汁机', 'IH电饭煲', '声波牙刷', '三刀头剃刀', '纯水净水器', '取暖器'],
            'img' : ['img/4F/2.jpg','img/4F/3.jpg','img/4F/4.jpg','img/4F/5.jpg','img/4F/6.jpg','img/4F/7.jpg','img/4F/8.jpg','img/4F/9.jpg'],
            't' : ['img/4F/t_1.jpg','img/4F/t_2.jpg','img/4F/t_3.jpg','img/4F/t_4.jpg']
        },
        {
            'f': 'img/5F/5f.jpg',
            'icon': 'img/5F/5ficon.png',
            'span': ['新品抢先', '品牌馆'],
            'li_2': ['电竞怎么玩才开心', '什么值得听', '13万蝙蝠侠大曝光', '单反低至1699!'],
            'li_1': ['游戏本', '联想免息', '组装电脑','显示器','机械键盘', '台式机', '3D投影电视', '学生文具', '低至199', '儿童手表', '平板二合一', '相机在此', '智能路由', '低至1元', '游戏机', '99元三件'],
            'img' : ['img/5F/2.jpg','img/5F/3.jpg','img/5F/4.jpg','img/5F/5.jpg','img/5F/6.jpg','img/5F/7.jpg','img/5F/8.jpg','img/5F/9.jpg'],
            't' : ['img/5F/t_1.jpg','img/5F/t_2.jpg','img/5F/t_3.jpg','img/5F/t_4.jpg']
        },
        {
            'f': 'img/6F/6f.jpg',
            'icon': 'img/6F/6ficon.png',
            'span': ['运动城', '炫酷骑行', '运动鞋服', '户外鞋服'],
            'li_2': ['欧洲五大联赛', '户外大牌品牌周'],
            'li_3': ['户外馆', '折叠车', '跑步鞋', '智能穿戴', '羽毛球拍', '篮球馆'],
            'img' : ['img/6F/1.jpg','img/6F/2.jpg','img/6F/4.jpg','img/6F/5.jpg','img/6F/6.jpg','img/6F/7.jpg'],
            't'   : ['img/6F/t_a_1.jpg','img/6F/t_b_1.jpg','img/6F/t_a_2.jpg','img/6F/t_b_2.jpg','img/6F/t_a_3.jpg','img/6F/t_b_3.jpg','img/6F/t_a_4.jpg','img/6F/t_b_4.jpg']
        },
        {
            'f': 'img/7F/7f.jpg',
            'icon': 'img/7F/7ficon.png',
            'span': ['家装城', '国际家具', '定制家', '家装建材'],
            'li_2': ['风格家具任意购', '自营厨具满200减40'],
            'li_3': ['定制窗帘', '地板', '锅具', '瓷砖', '高端家具', '收纳','装修','门店'],
            'img' : ['img/7F/1.jpg','img/7F/2.jpg','img/7F/3.jpg','img/7F/4.jpg','img/7F/5.jpg','img/7F/6.jpg'],
            't'   : ['img/7F/t_a_1.jpg','img/7F/t_b_1.jpg','img/7F/t_a_2.jpg','img/7F/t_b_2.jpg','img/7F/t_a_3.jpg','img/7F/t_b_3.jpg','img/7F/t_a_4.jpg','img/7F/t_b_4.jpg']
        },
        {
            'f': 'img/8F/8f.jpg',
            'icon': 'img/8F/8ficon.png',
            'span': ['母婴用品', '湿裤湿巾', '奶粉辅食', '童装童鞋'],
            'li_2': ['名师专家实时答疑', '母婴会员专属优惠'],
            'li_3': ['多美滋', '母婴用品', '童装', '玩具', '三免一', '乐器'],
            'img' : ['img/8F/1.jpg','img/8F/2.jpg','img/8F/3.jpg','img/8F/4.jpg','img/8F/5.jpg','img/8F/6.jpg'],
            't'   : ['img/8F/t_a_1.jpg','img/8F/t_b_1.jpg','img/8F/t_a_2.jpg','img/8F/t_b_2.jpg','img/8F/t_a_3.jpg','img/8F/t_b_3.jpg','img/8F/t_a_4.jpg','img/8F/t_b_4.jpg']
        },
        {
            'f': 'img/9F/9f.jpg',
            'icon': 'img/9F/9ficon.png',
            'span': ['中外美食', '美味尝鲜', '中外名酒', '医药保健'],
            'li_2': ['美酒嘉年华', '想吃肉低至199-100'],
            'li_3': ['19.9元3件', '酒要1分钱', '三七', '澳门美食', '仁和健途'],
            'img' : ['img/9F/1.jpg','img/9F/2.jpg','img/9F/3.jpg','img/9F/4.jpg','img/9F/5.jpg','img/9F/6.jpg'],
            't'   : ['img/9F/t_a_1.jpg','img/9F/t_b_1.jpg','img/9F/t_a_2.jpg','img/9F/t_b_2.jpg','img/9F/t_a_3.jpg','img/9F/t_b_3.jpg','img/9F/t_a_4.jpg','img/9F/t_b_4.jpg']
        },
        {
            'f': 'img/10F/10f.jpg',
            'icon': 'img/10F/10ficon.png',
            'span': ['图书', '音像', '特色书店', '数字商品'],
            'li_2': ['DK家庭用药来了!', '图书音像预购抢先看'],
            'li_3': ['教育', '文学', '少儿', '经管', '励志','励志','生活','艺术'],
            'img' : ['img/10F/1.jpg','img/10F/2.jpg','img/10F/3.jpg','img/10F/4.jpg'],
            't'   : ['img/10F/t_1.jpg','img/10F/t_2.jpg','img/10F/t_3.jpg','img/10F/t_4.jpg']
        },
        {
            'f': 'img/11F/11f.jpg',
            'icon': 'img/11F/11ficon.png',
            'span': ['全新整车', '保养中心', '汽车用品'],
            'li_2': ['超值车品低至五折', '夏季单品200减100', '跨店铺满200减100', '汽车服务一口价'],
            'li_1': ['车载电视', '行车记录仪', '维修养护','爆款机油','蓄电池', '汽车服务', '内饰精品', '安全座椅', '雨刷', '油卡充值', '轮胎超市', '轮子', '洗车机', '空调清洁机', '汽车脚垫', '车管家'],
            'img' : ['img/11F/1.jpg','img/11F/2.png','img/11F/3.jpg','img/11F/4.JPG','img/11F/5.jpg','img/11F/6.jpg','img/11F/7.jpg','img/11F/8.jpg'],
            't' : ['img/11F/t_1.jpg','img/11F/t_2.jpg','img/11F/t_3.jpg','img/11F/t_4.jpg']
        }
    ];



    (function () {
        var $1 = $('.cont_1f');
        createSide_imgData($1,0);
        createSide_list_1Data($1,0);
        createSide_li_1($1,0);
        createDivData($1,0);
        var $div = $1.find('.main_0 div');
        $div.attr('class','m_2');
        $div.eq(0).attr('class','m_1');
        var $ddd = $div.eq(3);
        createT_1Data($ddd,0);
    })();

    (function () {
        var $1 = $('.cont_2f');
        createSide_imgData($1,1);
        createSide_list_1Data($1,1);
        createSide_li_2($1,1);
        createSide_li_3($1,1);
        createDivData($1,1);
        var $div = $1.find('.main_0 div');
        $div.attr('class','m_3');
        $div.parent().find('div:gt(2)').attr('class','m_4');
        var $ddd = $div.eq(0);
        createT_2Data($ddd,1);
    })();

    (function () {
        var $1 = $('.cont_3f');
        createSide_imgData($1,2);
        createSide_list_1Data($1,2);
        createSide_li_2($1,2);
        createSide_li_1($1,2);
        createDivData($1,2);
        var $div = $1.find('.main_0 div');
        var $ddd = $div.eq(0);
        createT_1Data($ddd,2);
        $div.eq(0).attr('class','m_5');
        $div.eq(1).attr('class','m_5');
        $div.eq(2).attr('class','m_5');
        $div.eq(3).attr('class','m_5');
        $div.parent().find('div:gt(4)').attr('class','m_6');
        $div.parent().find('.m_5').wrapAll('<div class="m_11"></div>');
    })();

    (function () {
        var $1 = $('.cont_4f');
        createSide_imgData($1,3);
        createSide_list_1Data($1,3);
        createSide_li_2($1,3);
        createSide_li_1($1,3);
        createDivData($1,3);
        var $div = $1.find('.main_0 div');
        var $ddd = $div.eq(0);
        createT_1Data($ddd,3);
        $div.eq(0).attr('class','m_5');
        $div.eq(1).attr('class','m_5');
        $div.eq(2).attr('class','m_5');
        $div.eq(3).attr('class','m_5');
        $div.parent().find('div:gt(4)').attr('class','m_6');
        $div.parent().find('.m_5').wrapAll('<div class="m_11"></div>');
    })();

    (function () {
        var $1 = $('.cont_5f');
        createSide_imgData($1,4);
        createSide_list_1Data($1,4);
        createSide_li_2($1,4);
        createSide_li_1($1,4);
        createDivData($1,4);
        var $div = $1.find('.main_0 div');
        var $ddd = $div.eq(0);
        createT_1Data($ddd,4);
        $div.eq(0).attr('class','m_5');
        $div.eq(1).attr('class','m_5');
        $div.eq(2).attr('class','m_5');
        $div.eq(3).attr('class','m_5');
        $div.parent().find('div:gt(4)').attr('class','m_6');
        $div.parent().find('.m_5').wrapAll('<div class="m_11"></div>');
    })();

    (function () {
        var $1 = $('.cont_6f');
        createSide_imgData($1,5);
        createSide_list_1Data($1,5);
        createSide_li_2($1,5);
        createSide_li_3($1,5);
        createDivData($1,5);
        var $div = $1.find('.main_0 div');
        $div.parent().find('div:lt(2)').wrapAll('<div class="m_8"></div>');
        var $ddd = $div.eq(2);
        createT_2Data($ddd,5);
    })();

    (function () {
        var $1 = $('.cont_7f');
        createSide_imgData($1,6);
        createSide_list_1Data($1,6);
        createSide_li_2($1,6);
        createSide_li_3($1,6);
        createDivData($1,5);
        var $div = $1.find('.main_0 div');
        $div.parent().find('div:lt(2)').wrapAll('<div class="m_8"></div>');
        var $ddd = $div.eq(2);
        createT_2Data($ddd,6);
    })();

    (function () {
        var $1 = $('.cont_8f');
        createSide_imgData($1,7);
        createSide_list_1Data($1,7);
        createSide_li_2($1,7);
        createSide_li_3($1,7);
        createDivData($1,7);
        var $div = $1.find('.main_0 div');
        $div.parent().find('div:lt(2)').wrapAll('<div class="m_8"></div>');
        var $ddd = $div.eq(2);
        createT_2Data($ddd,7);
    })();

    (function () {
        var $1 = $('.cont_9f');
        createSide_imgData($1,8);
        createSide_list_1Data($1,8);
        createSide_li_2($1,8);
        createSide_li_3($1,8);
        createDivData($1,8);
        var $div = $1.find('.main_0 div');
        $div.parent().find('div:lt(2)').wrapAll('<div class="m_8"></div>');
        var $ddd = $div.eq(2);
        createT_2Data($ddd,8);
    })();

    (function () {
        var $1 = $('.cont_10f');
        createSide_imgData($1,9);
        createSide_list_1Data($1,9);
        createSide_li_2($1,9);
        createSide_li_3($1,9);
        createDivData($1,9);
        var $div = $1.find('.main_0 div');
        $div.attr('class','m_7');
        var $ddd = $div.eq(1);
        createT_1Data($ddd,9);
    })();

    (function () {
        var $1 = $('.cont_11f');
        createSide_imgData($1,10);
        createSide_list_1Data($1,10);
        createSide_li_2($1,10);
        createSide_li_1($1,10);
        createDivData($1,10);
        var $div = $1.find('.main_0 div');
        var $ddd = $div.eq(0);
        createT_1Data($ddd,10);
        $div.eq(0).attr('class','m_5');
        $div.eq(1).attr('class','m_5');
        $div.eq(2).attr('class','m_5');
        $div.eq(3).attr('class','m_5');
        $div.parent().find('div:gt(4)').attr('class','m_6');
        $div.parent().find('.m_5').wrapAll('<div class="m_11"></div>');
    })();

    (function(){
        var $em = $('.cont_wrap').find('em');
        $em.css('background','url(img/12F/12ficon.png)');
        for(var i=0; i<4; i++){
            $em.eq(i).css('background-position-y',-26*i);
        }
    })();

    function createSide_imgData(obj,i){
        var $side_img = $('<a><img class="side_img" src="' + arr[i].f + '"></a>');
        obj.find('.side').prepend($side_img);
    }

    function createSide_list_1Data(obj,i){
        for(var d=0; d<arr[i].span.length;d++) {
            var $li = $('<li><a href="#"><em></em><span>' + arr[i].span[d] + '</span></a></li>');
            obj.find('.side_list_1').append($li);
        }
        obj.find('.side_list_1').find('em').css('background','url(' + arr[i].icon + ') no-repeat 0 0');
        obj.find('.side_list_1').find('em').each(function (j,elem) {
            $(elem).css('background-position-y',-26*(j))
        })
    }

    function createSide_li_1(obj,i){
            var $li = $('<li class="side_li_1"></li>');
            obj.find('.side_list_2').append($li);
            for (var j = 0; j < arr[i].li_1.length / 2; j++) {
                var $a = $('<a href="">' + arr[i].li_1[j] + '</a>');
                $li.append($a);
            }

            var $li_1 = $('<li class="side_li_1"></li>');
            obj.find('.side_list_2').append($li_1);
            for (var z = arr[i].li_1.length / 2; z < arr[i].li_1.length; z++) {
                var $b = $('<a href="">' + arr[i].li_1[z] + '</a>');
                $li_1.append($b);
            }

    }

    function createSide_li_2(obj,i){
        var $li = $('<li class="side_li_2"></li>');
        obj.find('.side_list_2').append($li);
        for(var j=0; j<arr[i].li_2.length;j++) {
            var $a = $('<a href=""><span>' + arr[i].li_2[j] + '</span><i>></i></a>');
            $li.append($a);
        }
    }

    function createSide_li_3(obj,i){
        var $li = $('<li class="side_li_3"></li>');
        obj.find('.side_list_2').append($li);
        for(var j=0; j<arr[i].li_3.length;j++) {
            var $a = $('<a href="">' + arr[i].li_3[j] + '</a>');
            $li.append($a);
        }
    }

    function  createT_1Data(obj,i){
        var $div = $('<div class="t_1"></div>');
        obj.before($div);
        var $ul = $('<ul></ul>');
        $div.append($ul);
        for(var j=0; j<arr[i].t.length;j++) {
            var $li = $('<li><a href="#"><img src="' + arr[i].t[j] + '"></a></li>');
            $ul.append($li);
        }
        var $btn = $(' <p class="btn_l"><</p>\
                       <p class="btn_r">></p>\
                       <ol class="btn_list">\
                           <li class="active"></li>\
                           <li></li>\
                           <li></li>\
                           <li></li>\
                       </ol>');
        $div.append($btn);
    }

    function  createT_2Data(obj,i){
        var $div = $('<div class="t_2"></div>');
        obj.before($div);
        var $ul = $('<ul></ul>');
        $div.append($ul);
        for(var j=0; j<arr[i].t.length/2;j++) {
            var $li = $('<li></li>');
            $ul.append($li);
            for(var d=0; d<2;d++){
                var $a = $('<a class="t" href="#"><img src="' + arr[i].t[j+d] + '"></a>');
                $li.append($a);
            }
        }
        var $btn = $(' <p class="btn_l"><</p>\
                       <p class="btn_r">></p>\
                       <ol class="btn_list">\
                           <li class="active"></li>\
                           <li></li>\
                           <li></li>\
                           <li></li>\
                       </ol>');
        $div.append($btn);
    }

    function createDivData(obj,i){
        for(var j=0;j<arr[i].img.length; j++){
            var $div = $('<div><a href="#"><img src="' + arr[i].img[j] + '"></a></div>');
            obj.find('.main_0').append($div);
        }
    }
}
//main_1
function main_1(){
    var arr = [
        [
            [
                {'img':'img/tab/1.png','p':'哈吉斯短袖T恤翻领撞色POLO衫','span':'￥544.00'},
                {'img':'img/tab/2.jpg','p':'威可多商务正装纯棉T恤','span':'￥330.00'},
                {'img':'img/tab/3.jpg','p':'gxg.jeans印花休闲圆领棉质短袖T恤','span':'￥149.00'},
                {'img':'img/tab/4.jpg','p':'佐丹奴衬衫撞色条纹单标袋修身男士短袖','span':'￥99.00'},
                {'img':'img/tab/5.jpg','p':'G-Star 海军风Davin半长款短裤','span':'￥769.00'},
                {'img':'img/tab/6.jpg','p':'罗蒙直筒高腰商务休闲青年长裤子','span':'￥159.00'},
                {'img':'img/tab/7.jpg','p':'太平鸟男装休闲裤韩版修身条纹收口裤','span':'￥269.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'}
            ],
            [
                {'img':'img/tab/11.png','p':'哥弟女装短袖格纹针织上衣T恤','span':'￥324.00'},
                {'img':'img/tab/12.jpg','p':'哥弟简约百搭纯色圆领短袖针织T恤','span':'￥200.00'},
                {'img':'img/tab/13.jpg','p':'太平鸟蕾丝收腰连衣裙','span':'￥339.00'},
                {'img':'img/tab/14.jpg','p':'Amii细吊带交叉双层纯色背心连衣裙','span':'￥1369.00'},
                {'img':'img/tab/15.jpg','p':'Artka阿卡小脚绣花翻边弹力铅笔裤修身长裤','span':'￥169.00'},
                {'img':'img/tab/16.jpg','p':'韩都衣舍小猫印花刺绣短袖连衣裙','span':'￥188.00'},
                {'img':'img/tab/17.jpg','p':'韩都衣舍A字短裙条纹背带连衣裙','span':'￥149.00'},
                {'img':'img/tab/18.jpg','p':'韩都衣舍印花纱网拼接连衣裙','span':'￥139.00'}
            ],
            [
                {'img':'img/tab/1.png','p':'哈吉斯短袖T恤翻领撞色POLO衫','span':'￥544.00'},
                {'img':'img/tab/2.jpg','p':'威可多商务正装纯棉T恤','span':'￥330.00'},
                {'img':'img/tab/3.jpg','p':'gxg.jeans印花休闲圆领棉质短袖T恤','span':'￥149.00'},
                {'img':'img/tab/4.jpg','p':'佐丹奴衬衫撞色条纹单标袋修身男士短袖','span':'￥99.00'},
                {'img':'img/tab/5.jpg','p':'G-Star 海军风Davin半长款短裤','span':'￥769.00'},
                {'img':'img/tab/6.jpg','p':'罗蒙直筒高腰商务休闲青年长裤子','span':'￥159.00'},
                {'img':'img/tab/7.jpg','p':'太平鸟男装休闲裤韩版修身条纹收口裤','span':'￥269.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'}
            ],
            [
                {'img':'img/tab/11.png','p':'哥弟女装短袖格纹针织上衣T恤','span':'￥324.00'},
                {'img':'img/tab/12.jpg','p':'哥弟简约百搭纯色圆领短袖针织T恤','span':'￥200.00'},
                {'img':'img/tab/13.jpg','p':'太平鸟蕾丝收腰连衣裙','span':'￥339.00'},
                {'img':'img/tab/14.jpg','p':'Amii细吊带交叉双层纯色背心连衣裙','span':'￥1369.00'},
                {'img':'img/tab/15.jpg','p':'Artka阿卡小脚绣花翻边弹力铅笔裤修身长裤','span':'￥169.00'},
                {'img':'img/tab/16.jpg','p':'韩都衣舍小猫印花刺绣短袖连衣裙','span':'￥188.00'},
                {'img':'img/tab/17.jpg','p':'韩都衣舍A字短裙条纹背带连衣裙','span':'￥149.00'},
                {'img':'img/tab/18.jpg','p':'韩都衣舍印花纱网拼接连衣裙','span':'￥139.00'}
            ],
            [
                {'img':'img/tab/1.png','p':'哈吉斯短袖T恤翻领撞色POLO衫','span':'￥544.00'},
                {'img':'img/tab/2.jpg','p':'威可多商务正装纯棉T恤','span':'￥330.00'},
                {'img':'img/tab/3.jpg','p':'gxg.jeans印花休闲圆领棉质短袖T恤','span':'￥149.00'},
                {'img':'img/tab/4.jpg','p':'佐丹奴衬衫撞色条纹单标袋修身男士短袖','span':'￥99.00'},
                {'img':'img/tab/5.jpg','p':'G-Star 海军风Davin半长款短裤','span':'￥769.00'},
                {'img':'img/tab/6.jpg','p':'罗蒙直筒高腰商务休闲青年长裤子','span':'￥159.00'},
                {'img':'img/tab/7.jpg','p':'太平鸟男装休闲裤韩版修身条纹收口裤','span':'￥269.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'}
            ],
            [
                {'img':'img/tab/11.png','p':'哥弟女装短袖格纹针织上衣T恤','span':'￥324.00'},
                {'img':'img/tab/12.jpg','p':'哥弟简约百搭纯色圆领短袖针织T恤','span':'￥200.00'},
                {'img':'img/tab/13.jpg','p':'太平鸟蕾丝收腰连衣裙','span':'￥339.00'},
                {'img':'img/tab/14.jpg','p':'Amii细吊带交叉双层纯色背心连衣裙','span':'￥1369.00'},
                {'img':'img/tab/15.jpg','p':'Artka阿卡小脚绣花翻边弹力铅笔裤修身长裤','span':'￥169.00'},
                {'img':'img/tab/16.jpg','p':'韩都衣舍小猫印花刺绣短袖连衣裙','span':'￥188.00'},
                {'img':'img/tab/17.jpg','p':'韩都衣舍A字短裙条纹背带连衣裙','span':'￥149.00'},
                {'img':'img/tab/18.jpg','p':'韩都衣舍印花纱网拼接连衣裙','span':'￥139.00'}
            ],
            [
                {'img':'img/tab/1.png','p':'哈吉斯短袖T恤翻领撞色POLO衫','span':'￥544.00'},
                {'img':'img/tab/2.jpg','p':'威可多商务正装纯棉T恤','span':'￥330.00'},
                {'img':'img/tab/3.jpg','p':'gxg.jeans印花休闲圆领棉质短袖T恤','span':'￥149.00'},
                {'img':'img/tab/4.jpg','p':'佐丹奴衬衫撞色条纹单标袋修身男士短袖','span':'￥99.00'},
                {'img':'img/tab/5.jpg','p':'G-Star 海军风Davin半长款短裤','span':'￥769.00'},
                {'img':'img/tab/6.jpg','p':'罗蒙直筒高腰商务休闲青年长裤子','span':'￥159.00'},
                {'img':'img/tab/7.jpg','p':'太平鸟男装休闲裤韩版修身条纹收口裤','span':'￥269.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'}
            ],
            [
                {'img':'img/tab/11.png','p':'哥弟女装短袖格纹针织上衣T恤','span':'￥324.00'},
                {'img':'img/tab/12.jpg','p':'哥弟简约百搭纯色圆领短袖针织T恤','span':'￥200.00'},
                {'img':'img/tab/13.jpg','p':'太平鸟蕾丝收腰连衣裙','span':'￥339.00'},
                {'img':'img/tab/14.jpg','p':'Amii细吊带交叉双层纯色背心连衣裙','span':'￥1369.00'},
                {'img':'img/tab/15.jpg','p':'Artka阿卡小脚绣花翻边弹力铅笔裤修身长裤','span':'￥169.00'},
                {'img':'img/tab/16.jpg','p':'韩都衣舍小猫印花刺绣短袖连衣裙','span':'￥188.00'},
                {'img':'img/tab/17.jpg','p':'韩都衣舍A字短裙条纹背带连衣裙','span':'￥149.00'},
                {'img':'img/tab/18.jpg','p':'韩都衣舍印花纱网拼接连衣裙','span':'￥139.00'}
            ]
        ],//1
        [
            [
                {'img':'img/tab/1.png','p':'哈吉斯短袖T恤翻领撞色POLO衫','span':'￥544.00'},
                {'img':'img/tab/2.jpg','p':'威可多商务正装纯棉T恤','span':'￥330.00'},
                {'img':'img/tab/3.jpg','p':'gxg.jeans印花休闲圆领棉质短袖T恤','span':'￥149.00'},
                {'img':'img/tab/4.jpg','p':'佐丹奴衬衫撞色条纹单标袋修身男士短袖','span':'￥99.00'},
                {'img':'img/tab/5.jpg','p':'G-Star 海军风Davin半长款短裤','span':'￥769.00'},
                {'img':'img/tab/6.jpg','p':'罗蒙直筒高腰商务休闲青年长裤子','span':'￥159.00'},
                {'img':'img/tab/7.jpg','p':'太平鸟男装休闲裤韩版修身条纹收口裤','span':'￥269.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'}
            ],
            [
                {'img':'img/tab/11.png','p':'哥弟女装短袖格纹针织上衣T恤','span':'￥324.00'},
                {'img':'img/tab/12.jpg','p':'哥弟简约百搭纯色圆领短袖针织T恤','span':'￥200.00'},
                {'img':'img/tab/13.jpg','p':'太平鸟蕾丝收腰连衣裙','span':'￥339.00'},
                {'img':'img/tab/14.jpg','p':'Amii细吊带交叉双层纯色背心连衣裙','span':'￥1369.00'},
                {'img':'img/tab/15.jpg','p':'Artka阿卡小脚绣花翻边弹力铅笔裤修身长裤','span':'￥169.00'},
                {'img':'img/tab/16.jpg','p':'韩都衣舍小猫印花刺绣短袖连衣裙','span':'￥188.00'},
                {'img':'img/tab/17.jpg','p':'韩都衣舍A字短裙条纹背带连衣裙','span':'￥149.00'},
                {'img':'img/tab/18.jpg','p':'韩都衣舍印花纱网拼接连衣裙','span':'￥139.00'},
                {'img':'img/tab/18.jpg','p':'韩都衣舍印花纱网拼接连衣裙','span':'￥139.00'},
                {'img':'img/tab/18.jpg','p':'韩都衣舍印花纱网拼接连衣裙','span':'￥139.00'}
            ],
            [
                {'img':'img/tab/1.png','p':'哈吉斯短袖T恤翻领撞色POLO衫','span':'￥544.00'},
                {'img':'img/tab/2.jpg','p':'威可多商务正装纯棉T恤','span':'￥330.00'},
                {'img':'img/tab/3.jpg','p':'gxg.jeans印花休闲圆领棉质短袖T恤','span':'￥149.00'},
                {'img':'img/tab/4.jpg','p':'佐丹奴衬衫撞色条纹单标袋修身男士短袖','span':'￥99.00'},
                {'img':'img/tab/5.jpg','p':'G-Star 海军风Davin半长款短裤','span':'￥769.00'},
                {'img':'img/tab/6.jpg','p':'罗蒙直筒高腰商务休闲青年长裤子','span':'￥159.00'},
                {'img':'img/tab/7.jpg','p':'太平鸟男装休闲裤韩版修身条纹收口裤','span':'￥269.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'}
            ],
            [
                {'img':'img/tab/11.png','p':'哥弟女装短袖格纹针织上衣T恤','span':'￥324.00'},
                {'img':'img/tab/12.jpg','p':'哥弟简约百搭纯色圆领短袖针织T恤','span':'￥200.00'},
                {'img':'img/tab/13.jpg','p':'太平鸟蕾丝收腰连衣裙','span':'￥339.00'},
                {'img':'img/tab/14.jpg','p':'Amii细吊带交叉双层纯色背心连衣裙','span':'￥1369.00'},
                {'img':'img/tab/15.jpg','p':'Artka阿卡小脚绣花翻边弹力铅笔裤修身长裤','span':'￥169.00'},
                {'img':'img/tab/16.jpg','p':'韩都衣舍小猫印花刺绣短袖连衣裙','span':'￥188.00'},
                {'img':'img/tab/17.jpg','p':'韩都衣舍A字短裙条纹背带连衣裙','span':'￥149.00'},
                {'img':'img/tab/18.jpg','p':'韩都衣舍印花纱网拼接连衣裙','span':'￥139.00'},
                {'img':'img/tab/18.jpg','p':'韩都衣舍印花纱网拼接连衣裙','span':'￥139.00'},
                {'img':'img/tab/18.jpg','p':'韩都衣舍印花纱网拼接连衣裙','span':'￥139.00'}
            ],
            [
                {'img':'img/tab/1.png','p':'哈吉斯短袖T恤翻领撞色POLO衫','span':'￥544.00'},
                {'img':'img/tab/2.jpg','p':'威可多商务正装纯棉T恤','span':'￥330.00'},
                {'img':'img/tab/3.jpg','p':'gxg.jeans印花休闲圆领棉质短袖T恤','span':'￥149.00'},
                {'img':'img/tab/4.jpg','p':'佐丹奴衬衫撞色条纹单标袋修身男士短袖','span':'￥99.00'},
                {'img':'img/tab/5.jpg','p':'G-Star 海军风Davin半长款短裤','span':'￥769.00'},
                {'img':'img/tab/6.jpg','p':'罗蒙直筒高腰商务休闲青年长裤子','span':'￥159.00'},
                {'img':'img/tab/7.jpg','p':'太平鸟男装休闲裤韩版修身条纹收口裤','span':'￥269.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'}
            ],
            [
                {'img':'img/tab/11.png','p':'哥弟女装短袖格纹针织上衣T恤','span':'￥324.00'},
                {'img':'img/tab/12.jpg','p':'哥弟简约百搭纯色圆领短袖针织T恤','span':'￥200.00'},
                {'img':'img/tab/13.jpg','p':'太平鸟蕾丝收腰连衣裙','span':'￥339.00'},
                {'img':'img/tab/14.jpg','p':'Amii细吊带交叉双层纯色背心连衣裙','span':'￥1369.00'},
                {'img':'img/tab/15.jpg','p':'Artka阿卡小脚绣花翻边弹力铅笔裤修身长裤','span':'￥169.00'},
                {'img':'img/tab/16.jpg','p':'韩都衣舍小猫印花刺绣短袖连衣裙','span':'￥188.00'},
                {'img':'img/tab/17.jpg','p':'韩都衣舍A字短裙条纹背带连衣裙','span':'￥149.00'},
                {'img':'img/tab/18.jpg','p':'韩都衣舍印花纱网拼接连衣裙','span':'￥139.00'},
                {'img':'img/tab/18.jpg','p':'韩都衣舍印花纱网拼接连衣裙','span':'￥139.00'},
                {'img':'img/tab/18.jpg','p':'韩都衣舍印花纱网拼接连衣裙','span':'￥139.00'}
            ],
            [
                {'img':'img/tab/1.png','p':'哈吉斯短袖T恤翻领撞色POLO衫','span':'￥544.00'},
                {'img':'img/tab/2.jpg','p':'威可多商务正装纯棉T恤','span':'￥330.00'},
                {'img':'img/tab/3.jpg','p':'gxg.jeans印花休闲圆领棉质短袖T恤','span':'￥149.00'},
                {'img':'img/tab/4.jpg','p':'佐丹奴衬衫撞色条纹单标袋修身男士短袖','span':'￥99.00'},
                {'img':'img/tab/5.jpg','p':'G-Star 海军风Davin半长款短裤','span':'￥769.00'},
                {'img':'img/tab/6.jpg','p':'罗蒙直筒高腰商务休闲青年长裤子','span':'￥159.00'},
                {'img':'img/tab/7.jpg','p':'太平鸟男装休闲裤韩版修身条纹收口裤','span':'￥269.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'}
            ],
            [
                {'img':'img/tab/11.png','p':'哥弟女装短袖格纹针织上衣T恤','span':'￥324.00'},
                {'img':'img/tab/12.jpg','p':'哥弟简约百搭纯色圆领短袖针织T恤','span':'￥200.00'},
                {'img':'img/tab/13.jpg','p':'太平鸟蕾丝收腰连衣裙','span':'￥339.00'},
                {'img':'img/tab/14.jpg','p':'Amii细吊带交叉双层纯色背心连衣裙','span':'￥1369.00'},
                {'img':'img/tab/15.jpg','p':'Artka阿卡小脚绣花翻边弹力铅笔裤修身长裤','span':'￥169.00'},
                {'img':'img/tab/16.jpg','p':'韩都衣舍小猫印花刺绣短袖连衣裙','span':'￥188.00'},
                {'img':'img/tab/17.jpg','p':'韩都衣舍A字短裙条纹背带连衣裙','span':'￥149.00'},
                {'img':'img/tab/18.jpg','p':'韩都衣舍印花纱网拼接连衣裙','span':'￥139.00'},
                {'img':'img/tab/18.jpg','p':'韩都衣舍印花纱网拼接连衣裙','span':'￥139.00'},
                {'img':'img/tab/18.jpg','p':'韩都衣舍印花纱网拼接连衣裙','span':'￥139.00'}
            ]
        ],//2
        [
            [
                {'img':'img/tab/1.png','p':'哈吉斯短袖T恤翻领撞色POLO衫','span':'￥544.00'},
                {'img':'img/tab/2.jpg','p':'威可多商务正装纯棉T恤','span':'￥330.00'},
                {'img':'img/tab/3.jpg','p':'gxg.jeans印花休闲圆领棉质短袖T恤','span':'￥149.00'},
                {'img':'img/tab/4.jpg','p':'佐丹奴衬衫撞色条纹单标袋修身男士短袖','span':'￥99.00'},
                {'img':'img/tab/5.jpg','p':'G-Star 海军风Davin半长款短裤','span':'￥769.00'},
                {'img':'img/tab/6.jpg','p':'罗蒙直筒高腰商务休闲青年长裤子','span':'￥159.00'},
                {'img':'img/tab/7.jpg','p':'太平鸟男装休闲裤韩版修身条纹收口裤','span':'￥269.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'}
            ],
            [
                {'img':'img/tab/1.png','p':'哈吉斯短袖T恤翻领撞色POLO衫','span':'￥544.00'},
                {'img':'img/tab/2.jpg','p':'威可多商务正装纯棉T恤','span':'￥330.00'},
                {'img':'img/tab/3.jpg','p':'gxg.jeans印花休闲圆领棉质短袖T恤','span':'￥149.00'},
                {'img':'img/tab/4.jpg','p':'佐丹奴衬衫撞色条纹单标袋修身男士短袖','span':'￥99.00'},
                {'img':'img/tab/5.jpg','p':'G-Star 海军风Davin半长款短裤','span':'￥769.00'},
                {'img':'img/tab/6.jpg','p':'罗蒙直筒高腰商务休闲青年长裤子','span':'￥159.00'},
                {'img':'img/tab/7.jpg','p':'太平鸟男装休闲裤韩版修身条纹收口裤','span':'￥269.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'}
            ],
            [
                {'img':'img/tab/11.png','p':'哥弟女装短袖格纹针织上衣T恤','span':'￥324.00'},
                {'img':'img/tab/12.jpg','p':'哥弟简约百搭纯色圆领短袖针织T恤','span':'￥200.00'},
                {'img':'img/tab/13.jpg','p':'太平鸟蕾丝收腰连衣裙','span':'￥339.00'},
                {'img':'img/tab/14.jpg','p':'Amii细吊带交叉双层纯色背心连衣裙','span':'￥1369.00'},
                {'img':'img/tab/15.jpg','p':'Artka阿卡小脚绣花翻边弹力铅笔裤修身长裤','span':'￥169.00'},
                {'img':'img/tab/16.jpg','p':'韩都衣舍小猫印花刺绣短袖连衣裙','span':'￥188.00'},
                {'img':'img/tab/17.jpg','p':'韩都衣舍A字短裙条纹背带连衣裙','span':'￥149.00'},
                {'img':'img/tab/18.jpg','p':'韩都衣舍印花纱网拼接连衣裙','span':'￥139.00'}
            ],
            [
                {'img':'img/tab/1.png','p':'哈吉斯短袖T恤翻领撞色POLO衫','span':'￥544.00'},
                {'img':'img/tab/2.jpg','p':'威可多商务正装纯棉T恤','span':'￥330.00'},
                {'img':'img/tab/3.jpg','p':'gxg.jeans印花休闲圆领棉质短袖T恤','span':'￥149.00'},
                {'img':'img/tab/4.jpg','p':'佐丹奴衬衫撞色条纹单标袋修身男士短袖','span':'￥99.00'},
                {'img':'img/tab/5.jpg','p':'G-Star 海军风Davin半长款短裤','span':'￥769.00'},
                {'img':'img/tab/6.jpg','p':'罗蒙直筒高腰商务休闲青年长裤子','span':'￥159.00'},
                {'img':'img/tab/7.jpg','p':'太平鸟男装休闲裤韩版修身条纹收口裤','span':'￥269.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'}
            ],
            [
                {'img':'img/tab/11.png','p':'哥弟女装短袖格纹针织上衣T恤','span':'￥324.00'},
                {'img':'img/tab/12.jpg','p':'哥弟简约百搭纯色圆领短袖针织T恤','span':'￥200.00'},
                {'img':'img/tab/13.jpg','p':'太平鸟蕾丝收腰连衣裙','span':'￥339.00'},
                {'img':'img/tab/14.jpg','p':'Amii细吊带交叉双层纯色背心连衣裙','span':'￥1369.00'},
                {'img':'img/tab/15.jpg','p':'Artka阿卡小脚绣花翻边弹力铅笔裤修身长裤','span':'￥169.00'},
                {'img':'img/tab/16.jpg','p':'韩都衣舍小猫印花刺绣短袖连衣裙','span':'￥188.00'},
                {'img':'img/tab/17.jpg','p':'韩都衣舍A字短裙条纹背带连衣裙','span':'￥149.00'},
                {'img':'img/tab/18.jpg','p':'韩都衣舍印花纱网拼接连衣裙','span':'￥139.00'}
            ],
            [
                {'img':'img/tab/1.png','p':'哈吉斯短袖T恤翻领撞色POLO衫','span':'￥544.00'},
                {'img':'img/tab/2.jpg','p':'威可多商务正装纯棉T恤','span':'￥330.00'},
                {'img':'img/tab/3.jpg','p':'gxg.jeans印花休闲圆领棉质短袖T恤','span':'￥149.00'},
                {'img':'img/tab/4.jpg','p':'佐丹奴衬衫撞色条纹单标袋修身男士短袖','span':'￥99.00'},
                {'img':'img/tab/5.jpg','p':'G-Star 海军风Davin半长款短裤','span':'￥769.00'},
                {'img':'img/tab/6.jpg','p':'罗蒙直筒高腰商务休闲青年长裤子','span':'￥159.00'},
                {'img':'img/tab/7.jpg','p':'太平鸟男装休闲裤韩版修身条纹收口裤','span':'￥269.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'}
            ],
            [
                {'img':'img/tab/11.png','p':'哥弟女装短袖格纹针织上衣T恤','span':'￥324.00'},
                {'img':'img/tab/12.jpg','p':'哥弟简约百搭纯色圆领短袖针织T恤','span':'￥200.00'},
                {'img':'img/tab/13.jpg','p':'太平鸟蕾丝收腰连衣裙','span':'￥339.00'},
                {'img':'img/tab/14.jpg','p':'Amii细吊带交叉双层纯色背心连衣裙','span':'￥1369.00'},
                {'img':'img/tab/15.jpg','p':'Artka阿卡小脚绣花翻边弹力铅笔裤修身长裤','span':'￥169.00'},
                {'img':'img/tab/16.jpg','p':'韩都衣舍小猫印花刺绣短袖连衣裙','span':'￥188.00'},
                {'img':'img/tab/17.jpg','p':'韩都衣舍A字短裙条纹背带连衣裙','span':'￥149.00'},
                {'img':'img/tab/18.jpg','p':'韩都衣舍印花纱网拼接连衣裙','span':'￥139.00'}
            ]
        ],//3
        [
            [
                {'img':'img/tab/1.png','p':'哈吉斯短袖T恤翻领撞色POLO衫','span':'￥544.00'},
                {'img':'img/tab/2.jpg','p':'威可多商务正装纯棉T恤','span':'￥330.00'},
                {'img':'img/tab/3.jpg','p':'gxg.jeans印花休闲圆领棉质短袖T恤','span':'￥149.00'},
                {'img':'img/tab/4.jpg','p':'佐丹奴衬衫撞色条纹单标袋修身男士短袖','span':'￥99.00'},
                {'img':'img/tab/5.jpg','p':'G-Star 海军风Davin半长款短裤','span':'￥769.00'},
                {'img':'img/tab/6.jpg','p':'罗蒙直筒高腰商务休闲青年长裤子','span':'￥159.00'},
                {'img':'img/tab/7.jpg','p':'太平鸟男装休闲裤韩版修身条纹收口裤','span':'￥269.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'}
            ],
            [
                {'img':'img/tab/11.png','p':'哥弟女装短袖格纹针织上衣T恤','span':'￥324.00'},
                {'img':'img/tab/12.jpg','p':'哥弟简约百搭纯色圆领短袖针织T恤','span':'￥200.00'},
                {'img':'img/tab/13.jpg','p':'太平鸟蕾丝收腰连衣裙','span':'￥339.00'},
                {'img':'img/tab/14.jpg','p':'Amii细吊带交叉双层纯色背心连衣裙','span':'￥1369.00'},
                {'img':'img/tab/15.jpg','p':'Artka阿卡小脚绣花翻边弹力铅笔裤修身长裤','span':'￥169.00'},
                {'img':'img/tab/16.jpg','p':'韩都衣舍小猫印花刺绣短袖连衣裙','span':'￥188.00'},
                {'img':'img/tab/17.jpg','p':'韩都衣舍A字短裙条纹背带连衣裙','span':'￥149.00'},
                {'img':'img/tab/18.jpg','p':'韩都衣舍印花纱网拼接连衣裙','span':'￥139.00'}
            ],
            [
                {'img':'img/tab/1.png','p':'哈吉斯短袖T恤翻领撞色POLO衫','span':'￥544.00'},
                {'img':'img/tab/2.jpg','p':'威可多商务正装纯棉T恤','span':'￥330.00'},
                {'img':'img/tab/3.jpg','p':'gxg.jeans印花休闲圆领棉质短袖T恤','span':'￥149.00'},
                {'img':'img/tab/4.jpg','p':'佐丹奴衬衫撞色条纹单标袋修身男士短袖','span':'￥99.00'},
                {'img':'img/tab/5.jpg','p':'G-Star 海军风Davin半长款短裤','span':'￥769.00'},
                {'img':'img/tab/6.jpg','p':'罗蒙直筒高腰商务休闲青年长裤子','span':'￥159.00'},
                {'img':'img/tab/7.jpg','p':'太平鸟男装休闲裤韩版修身条纹收口裤','span':'￥269.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'}
            ],
            [
                {'img':'img/tab/11.png','p':'哥弟女装短袖格纹针织上衣T恤','span':'￥324.00'},
                {'img':'img/tab/12.jpg','p':'哥弟简约百搭纯色圆领短袖针织T恤','span':'￥200.00'},
                {'img':'img/tab/13.jpg','p':'太平鸟蕾丝收腰连衣裙','span':'￥339.00'},
                {'img':'img/tab/14.jpg','p':'Amii细吊带交叉双层纯色背心连衣裙','span':'￥1369.00'},
                {'img':'img/tab/15.jpg','p':'Artka阿卡小脚绣花翻边弹力铅笔裤修身长裤','span':'￥169.00'},
                {'img':'img/tab/16.jpg','p':'韩都衣舍小猫印花刺绣短袖连衣裙','span':'￥188.00'},
                {'img':'img/tab/17.jpg','p':'韩都衣舍A字短裙条纹背带连衣裙','span':'￥149.00'},
                {'img':'img/tab/18.jpg','p':'韩都衣舍印花纱网拼接连衣裙','span':'￥139.00'}
            ],
            [
                {'img':'img/tab/1.png','p':'哈吉斯短袖T恤翻领撞色POLO衫','span':'￥544.00'},
                {'img':'img/tab/2.jpg','p':'威可多商务正装纯棉T恤','span':'￥330.00'},
                {'img':'img/tab/3.jpg','p':'gxg.jeans印花休闲圆领棉质短袖T恤','span':'￥149.00'},
                {'img':'img/tab/4.jpg','p':'佐丹奴衬衫撞色条纹单标袋修身男士短袖','span':'￥99.00'},
                {'img':'img/tab/5.jpg','p':'G-Star 海军风Davin半长款短裤','span':'￥769.00'},
                {'img':'img/tab/6.jpg','p':'罗蒙直筒高腰商务休闲青年长裤子','span':'￥159.00'},
                {'img':'img/tab/7.jpg','p':'太平鸟男装休闲裤韩版修身条纹收口裤','span':'￥269.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'}
            ],
            [
                {'img':'img/tab/11.png','p':'哥弟女装短袖格纹针织上衣T恤','span':'￥324.00'},
                {'img':'img/tab/12.jpg','p':'哥弟简约百搭纯色圆领短袖针织T恤','span':'￥200.00'},
                {'img':'img/tab/13.jpg','p':'太平鸟蕾丝收腰连衣裙','span':'￥339.00'},
                {'img':'img/tab/14.jpg','p':'Amii细吊带交叉双层纯色背心连衣裙','span':'￥1369.00'},
                {'img':'img/tab/15.jpg','p':'Artka阿卡小脚绣花翻边弹力铅笔裤修身长裤','span':'￥169.00'},
                {'img':'img/tab/16.jpg','p':'韩都衣舍小猫印花刺绣短袖连衣裙','span':'￥188.00'},
                {'img':'img/tab/17.jpg','p':'韩都衣舍A字短裙条纹背带连衣裙','span':'￥149.00'},
                {'img':'img/tab/18.jpg','p':'韩都衣舍印花纱网拼接连衣裙','span':'￥139.00'}
            ],
            [
                {'img':'img/tab/1.png','p':'哈吉斯短袖T恤翻领撞色POLO衫','span':'￥544.00'},
                {'img':'img/tab/2.jpg','p':'威可多商务正装纯棉T恤','span':'￥330.00'},
                {'img':'img/tab/3.jpg','p':'gxg.jeans印花休闲圆领棉质短袖T恤','span':'￥149.00'},
                {'img':'img/tab/4.jpg','p':'佐丹奴衬衫撞色条纹单标袋修身男士短袖','span':'￥99.00'},
                {'img':'img/tab/5.jpg','p':'G-Star 海军风Davin半长款短裤','span':'￥769.00'},
                {'img':'img/tab/6.jpg','p':'罗蒙直筒高腰商务休闲青年长裤子','span':'￥159.00'},
                {'img':'img/tab/7.jpg','p':'太平鸟男装休闲裤韩版修身条纹收口裤','span':'￥269.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'}
            ],
            [
                {'img':'img/tab/11.png','p':'哥弟女装短袖格纹针织上衣T恤','span':'￥324.00'},
                {'img':'img/tab/12.jpg','p':'哥弟简约百搭纯色圆领短袖针织T恤','span':'￥200.00'},
                {'img':'img/tab/13.jpg','p':'太平鸟蕾丝收腰连衣裙','span':'￥339.00'},
                {'img':'img/tab/14.jpg','p':'Amii细吊带交叉双层纯色背心连衣裙','span':'￥1369.00'},
                {'img':'img/tab/15.jpg','p':'Artka阿卡小脚绣花翻边弹力铅笔裤修身长裤','span':'￥169.00'},
                {'img':'img/tab/16.jpg','p':'韩都衣舍小猫印花刺绣短袖连衣裙','span':'￥188.00'},
                {'img':'img/tab/17.jpg','p':'韩都衣舍A字短裙条纹背带连衣裙','span':'￥149.00'},
                {'img':'img/tab/18.jpg','p':'韩都衣舍印花纱网拼接连衣裙','span':'￥139.00'}
            ]
        ],//4
        [
            [
                {'img':'img/tab/1.png','p':'哈吉斯短袖T恤翻领撞色POLO衫','span':'￥544.00'},
                {'img':'img/tab/2.jpg','p':'威可多商务正装纯棉T恤','span':'￥330.00'},
                {'img':'img/tab/3.jpg','p':'gxg.jeans印花休闲圆领棉质短袖T恤','span':'￥149.00'},
                {'img':'img/tab/4.jpg','p':'佐丹奴衬衫撞色条纹单标袋修身男士短袖','span':'￥99.00'},
                {'img':'img/tab/5.jpg','p':'G-Star 海军风Davin半长款短裤','span':'￥769.00'},
                {'img':'img/tab/6.jpg','p':'罗蒙直筒高腰商务休闲青年长裤子','span':'￥159.00'},
                {'img':'img/tab/7.jpg','p':'太平鸟男装休闲裤韩版修身条纹收口裤','span':'￥269.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'}
            ],
            [
                {'img':'img/tab/11.png','p':'哥弟女装短袖格纹针织上衣T恤','span':'￥324.00'},
                {'img':'img/tab/12.jpg','p':'哥弟简约百搭纯色圆领短袖针织T恤','span':'￥200.00'},
                {'img':'img/tab/13.jpg','p':'太平鸟蕾丝收腰连衣裙','span':'￥339.00'},
                {'img':'img/tab/14.jpg','p':'Amii细吊带交叉双层纯色背心连衣裙','span':'￥1369.00'},
                {'img':'img/tab/15.jpg','p':'Artka阿卡小脚绣花翻边弹力铅笔裤修身长裤','span':'￥169.00'},
                {'img':'img/tab/16.jpg','p':'韩都衣舍小猫印花刺绣短袖连衣裙','span':'￥188.00'},
                {'img':'img/tab/17.jpg','p':'韩都衣舍A字短裙条纹背带连衣裙','span':'￥149.00'},
                {'img':'img/tab/18.jpg','p':'韩都衣舍印花纱网拼接连衣裙','span':'￥139.00'}
            ],
            [
                {'img':'img/tab/1.png','p':'哈吉斯短袖T恤翻领撞色POLO衫','span':'￥544.00'},
                {'img':'img/tab/2.jpg','p':'威可多商务正装纯棉T恤','span':'￥330.00'},
                {'img':'img/tab/3.jpg','p':'gxg.jeans印花休闲圆领棉质短袖T恤','span':'￥149.00'},
                {'img':'img/tab/4.jpg','p':'佐丹奴衬衫撞色条纹单标袋修身男士短袖','span':'￥99.00'},
                {'img':'img/tab/5.jpg','p':'G-Star 海军风Davin半长款短裤','span':'￥769.00'},
                {'img':'img/tab/6.jpg','p':'罗蒙直筒高腰商务休闲青年长裤子','span':'￥159.00'},
                {'img':'img/tab/7.jpg','p':'太平鸟男装休闲裤韩版修身条纹收口裤','span':'￥269.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'}
            ],
            [
                {'img':'img/tab/11.png','p':'哥弟女装短袖格纹针织上衣T恤','span':'￥324.00'},
                {'img':'img/tab/12.jpg','p':'哥弟简约百搭纯色圆领短袖针织T恤','span':'￥200.00'},
                {'img':'img/tab/13.jpg','p':'太平鸟蕾丝收腰连衣裙','span':'￥339.00'},
                {'img':'img/tab/14.jpg','p':'Amii细吊带交叉双层纯色背心连衣裙','span':'￥1369.00'},
                {'img':'img/tab/15.jpg','p':'Artka阿卡小脚绣花翻边弹力铅笔裤修身长裤','span':'￥169.00'},
                {'img':'img/tab/16.jpg','p':'韩都衣舍小猫印花刺绣短袖连衣裙','span':'￥188.00'},
                {'img':'img/tab/17.jpg','p':'韩都衣舍A字短裙条纹背带连衣裙','span':'￥149.00'},
                {'img':'img/tab/18.jpg','p':'韩都衣舍印花纱网拼接连衣裙','span':'￥139.00'}
            ],
            [
                {'img':'img/tab/1.png','p':'哈吉斯短袖T恤翻领撞色POLO衫','span':'￥544.00'},
                {'img':'img/tab/2.jpg','p':'威可多商务正装纯棉T恤','span':'￥330.00'},
                {'img':'img/tab/3.jpg','p':'gxg.jeans印花休闲圆领棉质短袖T恤','span':'￥149.00'},
                {'img':'img/tab/4.jpg','p':'佐丹奴衬衫撞色条纹单标袋修身男士短袖','span':'￥99.00'},
                {'img':'img/tab/5.jpg','p':'G-Star 海军风Davin半长款短裤','span':'￥769.00'},
                {'img':'img/tab/6.jpg','p':'罗蒙直筒高腰商务休闲青年长裤子','span':'￥159.00'},
                {'img':'img/tab/7.jpg','p':'太平鸟男装休闲裤韩版修身条纹收口裤','span':'￥269.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'}
            ],
            [
                {'img':'img/tab/11.png','p':'哥弟女装短袖格纹针织上衣T恤','span':'￥324.00'},
                {'img':'img/tab/12.jpg','p':'哥弟简约百搭纯色圆领短袖针织T恤','span':'￥200.00'},
                {'img':'img/tab/13.jpg','p':'太平鸟蕾丝收腰连衣裙','span':'￥339.00'},
                {'img':'img/tab/14.jpg','p':'Amii细吊带交叉双层纯色背心连衣裙','span':'￥1369.00'},
                {'img':'img/tab/15.jpg','p':'Artka阿卡小脚绣花翻边弹力铅笔裤修身长裤','span':'￥169.00'},
                {'img':'img/tab/16.jpg','p':'韩都衣舍小猫印花刺绣短袖连衣裙','span':'￥188.00'},
                {'img':'img/tab/17.jpg','p':'韩都衣舍A字短裙条纹背带连衣裙','span':'￥149.00'},
                {'img':'img/tab/18.jpg','p':'韩都衣舍印花纱网拼接连衣裙','span':'￥139.00'}
            ],
            [
                {'img':'img/tab/1.png','p':'哈吉斯短袖T恤翻领撞色POLO衫','span':'￥544.00'},
                {'img':'img/tab/2.jpg','p':'威可多商务正装纯棉T恤','span':'￥330.00'},
                {'img':'img/tab/3.jpg','p':'gxg.jeans印花休闲圆领棉质短袖T恤','span':'￥149.00'},
                {'img':'img/tab/4.jpg','p':'佐丹奴衬衫撞色条纹单标袋修身男士短袖','span':'￥99.00'},
                {'img':'img/tab/5.jpg','p':'G-Star 海军风Davin半长款短裤','span':'￥769.00'},
                {'img':'img/tab/6.jpg','p':'罗蒙直筒高腰商务休闲青年长裤子','span':'￥159.00'},
                {'img':'img/tab/7.jpg','p':'太平鸟男装休闲裤韩版修身条纹收口裤','span':'￥269.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'}
            ],
            [
                {'img':'img/tab/11.png','p':'哥弟女装短袖格纹针织上衣T恤','span':'￥324.00'},
                {'img':'img/tab/12.jpg','p':'哥弟简约百搭纯色圆领短袖针织T恤','span':'￥200.00'},
                {'img':'img/tab/13.jpg','p':'太平鸟蕾丝收腰连衣裙','span':'￥339.00'},
                {'img':'img/tab/14.jpg','p':'Amii细吊带交叉双层纯色背心连衣裙','span':'￥1369.00'},
                {'img':'img/tab/15.jpg','p':'Artka阿卡小脚绣花翻边弹力铅笔裤修身长裤','span':'￥169.00'},
                {'img':'img/tab/16.jpg','p':'韩都衣舍小猫印花刺绣短袖连衣裙','span':'￥188.00'},
                {'img':'img/tab/17.jpg','p':'韩都衣舍A字短裙条纹背带连衣裙','span':'￥149.00'},
                {'img':'img/tab/18.jpg','p':'韩都衣舍印花纱网拼接连衣裙','span':'￥139.00'}
            ]
        ],//5
        [
            [
                {'img':'img/tab/1.png','p':'哈吉斯短袖T恤翻领撞色POLO衫','span':'￥544.00'},
                {'img':'img/tab/2.jpg','p':'威可多商务正装纯棉T恤','span':'￥330.00'},
                {'img':'img/tab/3.jpg','p':'gxg.jeans印花休闲圆领棉质短袖T恤','span':'￥149.00'},
                {'img':'img/tab/4.jpg','p':'佐丹奴衬衫撞色条纹单标袋修身男士短袖','span':'￥99.00'},
                {'img':'img/tab/5.jpg','p':'G-Star 海军风Davin半长款短裤','span':'￥769.00'},
                {'img':'img/tab/6.jpg','p':'罗蒙直筒高腰商务休闲青年长裤子','span':'￥159.00'},
                {'img':'img/tab/7.jpg','p':'太平鸟男装休闲裤韩版修身条纹收口裤','span':'￥269.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'}
            ],
            [
                {'img':'img/tab/11.png','p':'哥弟女装短袖格纹针织上衣T恤','span':'￥324.00'},
                {'img':'img/tab/12.jpg','p':'哥弟简约百搭纯色圆领短袖针织T恤','span':'￥200.00'},
                {'img':'img/tab/13.jpg','p':'太平鸟蕾丝收腰连衣裙','span':'￥339.00'},
                {'img':'img/tab/14.jpg','p':'Amii细吊带交叉双层纯色背心连衣裙','span':'￥1369.00'},
                {'img':'img/tab/15.jpg','p':'Artka阿卡小脚绣花翻边弹力铅笔裤修身长裤','span':'￥169.00'},
                {'img':'img/tab/16.jpg','p':'韩都衣舍小猫印花刺绣短袖连衣裙','span':'￥188.00'},
                {'img':'img/tab/17.jpg','p':'韩都衣舍A字短裙条纹背带连衣裙','span':'￥149.00'},
                {'img':'img/tab/18.jpg','p':'韩都衣舍印花纱网拼接连衣裙','span':'￥139.00'},
                {'img':'img/tab/18.jpg','p':'韩都衣舍印花纱网拼接连衣裙','span':'￥139.00'},
                {'img':'img/tab/18.jpg','p':'韩都衣舍印花纱网拼接连衣裙','span':'￥139.00'}
            ],
            [
                {'img':'img/tab/1.png','p':'哈吉斯短袖T恤翻领撞色POLO衫','span':'￥544.00'},
                {'img':'img/tab/2.jpg','p':'威可多商务正装纯棉T恤','span':'￥330.00'},
                {'img':'img/tab/3.jpg','p':'gxg.jeans印花休闲圆领棉质短袖T恤','span':'￥149.00'},
                {'img':'img/tab/4.jpg','p':'佐丹奴衬衫撞色条纹单标袋修身男士短袖','span':'￥99.00'},
                {'img':'img/tab/5.jpg','p':'G-Star 海军风Davin半长款短裤','span':'￥769.00'},
                {'img':'img/tab/6.jpg','p':'罗蒙直筒高腰商务休闲青年长裤子','span':'￥159.00'},
                {'img':'img/tab/7.jpg','p':'太平鸟男装休闲裤韩版修身条纹收口裤','span':'￥269.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'}
            ],
            [
                {'img':'img/tab/11.png','p':'哥弟女装短袖格纹针织上衣T恤','span':'￥324.00'},
                {'img':'img/tab/12.jpg','p':'哥弟简约百搭纯色圆领短袖针织T恤','span':'￥200.00'},
                {'img':'img/tab/13.jpg','p':'太平鸟蕾丝收腰连衣裙','span':'￥339.00'},
                {'img':'img/tab/14.jpg','p':'Amii细吊带交叉双层纯色背心连衣裙','span':'￥1369.00'},
                {'img':'img/tab/15.jpg','p':'Artka阿卡小脚绣花翻边弹力铅笔裤修身长裤','span':'￥169.00'},
                {'img':'img/tab/16.jpg','p':'韩都衣舍小猫印花刺绣短袖连衣裙','span':'￥188.00'},
                {'img':'img/tab/17.jpg','p':'韩都衣舍A字短裙条纹背带连衣裙','span':'￥149.00'},
                {'img':'img/tab/18.jpg','p':'韩都衣舍印花纱网拼接连衣裙','span':'￥139.00'},
                {'img':'img/tab/18.jpg','p':'韩都衣舍印花纱网拼接连衣裙','span':'￥139.00'},
                {'img':'img/tab/18.jpg','p':'韩都衣舍印花纱网拼接连衣裙','span':'￥139.00'}
            ],
            [
                {'img':'img/tab/1.png','p':'哈吉斯短袖T恤翻领撞色POLO衫','span':'￥544.00'},
                {'img':'img/tab/2.jpg','p':'威可多商务正装纯棉T恤','span':'￥330.00'},
                {'img':'img/tab/3.jpg','p':'gxg.jeans印花休闲圆领棉质短袖T恤','span':'￥149.00'},
                {'img':'img/tab/4.jpg','p':'佐丹奴衬衫撞色条纹单标袋修身男士短袖','span':'￥99.00'},
                {'img':'img/tab/5.jpg','p':'G-Star 海军风Davin半长款短裤','span':'￥769.00'},
                {'img':'img/tab/6.jpg','p':'罗蒙直筒高腰商务休闲青年长裤子','span':'￥159.00'},
                {'img':'img/tab/7.jpg','p':'太平鸟男装休闲裤韩版修身条纹收口裤','span':'￥269.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'}
            ],
            [
                {'img':'img/tab/11.png','p':'哥弟女装短袖格纹针织上衣T恤','span':'￥324.00'},
                {'img':'img/tab/12.jpg','p':'哥弟简约百搭纯色圆领短袖针织T恤','span':'￥200.00'},
                {'img':'img/tab/13.jpg','p':'太平鸟蕾丝收腰连衣裙','span':'￥339.00'},
                {'img':'img/tab/14.jpg','p':'Amii细吊带交叉双层纯色背心连衣裙','span':'￥1369.00'},
                {'img':'img/tab/15.jpg','p':'Artka阿卡小脚绣花翻边弹力铅笔裤修身长裤','span':'￥169.00'},
                {'img':'img/tab/16.jpg','p':'韩都衣舍小猫印花刺绣短袖连衣裙','span':'￥188.00'},
                {'img':'img/tab/17.jpg','p':'韩都衣舍A字短裙条纹背带连衣裙','span':'￥149.00'},
                {'img':'img/tab/18.jpg','p':'韩都衣舍印花纱网拼接连衣裙','span':'￥139.00'},
                {'img':'img/tab/18.jpg','p':'韩都衣舍印花纱网拼接连衣裙','span':'￥139.00'},
                {'img':'img/tab/18.jpg','p':'韩都衣舍印花纱网拼接连衣裙','span':'￥139.00'}
            ]
        ],//6
        [
            [
                {'img':'img/tab/1.png','p':'哈吉斯短袖T恤翻领撞色POLO衫','span':'￥544.00'},
                {'img':'img/tab/2.jpg','p':'威可多商务正装纯棉T恤','span':'￥330.00'},
                {'img':'img/tab/3.jpg','p':'gxg.jeans印花休闲圆领棉质短袖T恤','span':'￥149.00'},
                {'img':'img/tab/4.jpg','p':'佐丹奴衬衫撞色条纹单标袋修身男士短袖','span':'￥99.00'},
                {'img':'img/tab/5.jpg','p':'G-Star 海军风Davin半长款短裤','span':'￥769.00'},
                {'img':'img/tab/6.jpg','p':'罗蒙直筒高腰商务休闲青年长裤子','span':'￥159.00'},
                {'img':'img/tab/7.jpg','p':'太平鸟男装休闲裤韩版修身条纹收口裤','span':'￥269.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'}
            ],
            [
                {'img':'img/tab/1.png','p':'哈吉斯短袖T恤翻领撞色POLO衫','span':'￥544.00'},
                {'img':'img/tab/2.jpg','p':'威可多商务正装纯棉T恤','span':'￥330.00'},
                {'img':'img/tab/3.jpg','p':'gxg.jeans印花休闲圆领棉质短袖T恤','span':'￥149.00'},
                {'img':'img/tab/4.jpg','p':'佐丹奴衬衫撞色条纹单标袋修身男士短袖','span':'￥99.00'},
                {'img':'img/tab/5.jpg','p':'G-Star 海军风Davin半长款短裤','span':'￥769.00'},
                {'img':'img/tab/6.jpg','p':'罗蒙直筒高腰商务休闲青年长裤子','span':'￥159.00'},
                {'img':'img/tab/7.jpg','p':'太平鸟男装休闲裤韩版修身条纹收口裤','span':'￥269.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'}
            ],
            [
                {'img':'img/tab/11.png','p':'哥弟女装短袖格纹针织上衣T恤','span':'￥324.00'},
                {'img':'img/tab/12.jpg','p':'哥弟简约百搭纯色圆领短袖针织T恤','span':'￥200.00'},
                {'img':'img/tab/13.jpg','p':'太平鸟蕾丝收腰连衣裙','span':'￥339.00'},
                {'img':'img/tab/14.jpg','p':'Amii细吊带交叉双层纯色背心连衣裙','span':'￥1369.00'},
                {'img':'img/tab/15.jpg','p':'Artka阿卡小脚绣花翻边弹力铅笔裤修身长裤','span':'￥169.00'},
                {'img':'img/tab/16.jpg','p':'韩都衣舍小猫印花刺绣短袖连衣裙','span':'￥188.00'},
                {'img':'img/tab/17.jpg','p':'韩都衣舍A字短裙条纹背带连衣裙','span':'￥149.00'},
                {'img':'img/tab/18.jpg','p':'韩都衣舍印花纱网拼接连衣裙','span':'￥139.00'},
                {'img':'img/tab/18.jpg','p':'韩都衣舍印花纱网拼接连衣裙','span':'￥139.00'},
                {'img':'img/tab/18.jpg','p':'韩都衣舍印花纱网拼接连衣裙','span':'￥139.00'}
            ],
            [
                {'img':'img/tab/1.png','p':'哈吉斯短袖T恤翻领撞色POLO衫','span':'￥544.00'},
                {'img':'img/tab/2.jpg','p':'威可多商务正装纯棉T恤','span':'￥330.00'},
                {'img':'img/tab/3.jpg','p':'gxg.jeans印花休闲圆领棉质短袖T恤','span':'￥149.00'},
                {'img':'img/tab/4.jpg','p':'佐丹奴衬衫撞色条纹单标袋修身男士短袖','span':'￥99.00'},
                {'img':'img/tab/5.jpg','p':'G-Star 海军风Davin半长款短裤','span':'￥769.00'},
                {'img':'img/tab/6.jpg','p':'罗蒙直筒高腰商务休闲青年长裤子','span':'￥159.00'},
                {'img':'img/tab/7.jpg','p':'太平鸟男装休闲裤韩版修身条纹收口裤','span':'￥269.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'}
            ],
            [
                {'img':'img/tab/11.png','p':'哥弟女装短袖格纹针织上衣T恤','span':'￥324.00'},
                {'img':'img/tab/12.jpg','p':'哥弟简约百搭纯色圆领短袖针织T恤','span':'￥200.00'},
                {'img':'img/tab/13.jpg','p':'太平鸟蕾丝收腰连衣裙','span':'￥339.00'},
                {'img':'img/tab/14.jpg','p':'Amii细吊带交叉双层纯色背心连衣裙','span':'￥1369.00'},
                {'img':'img/tab/15.jpg','p':'Artka阿卡小脚绣花翻边弹力铅笔裤修身长裤','span':'￥169.00'},
                {'img':'img/tab/16.jpg','p':'韩都衣舍小猫印花刺绣短袖连衣裙','span':'￥188.00'},
                {'img':'img/tab/17.jpg','p':'韩都衣舍A字短裙条纹背带连衣裙','span':'￥149.00'},
                {'img':'img/tab/18.jpg','p':'韩都衣舍印花纱网拼接连衣裙','span':'￥139.00'},
                {'img':'img/tab/18.jpg','p':'韩都衣舍印花纱网拼接连衣裙','span':'￥139.00'},
                {'img':'img/tab/18.jpg','p':'韩都衣舍印花纱网拼接连衣裙','span':'￥139.00'}
            ],
            [
                {'img':'img/tab/1.png','p':'哈吉斯短袖T恤翻领撞色POLO衫','span':'￥544.00'},
                {'img':'img/tab/2.jpg','p':'威可多商务正装纯棉T恤','span':'￥330.00'},
                {'img':'img/tab/3.jpg','p':'gxg.jeans印花休闲圆领棉质短袖T恤','span':'￥149.00'},
                {'img':'img/tab/4.jpg','p':'佐丹奴衬衫撞色条纹单标袋修身男士短袖','span':'￥99.00'},
                {'img':'img/tab/5.jpg','p':'G-Star 海军风Davin半长款短裤','span':'￥769.00'},
                {'img':'img/tab/6.jpg','p':'罗蒙直筒高腰商务休闲青年长裤子','span':'￥159.00'},
                {'img':'img/tab/7.jpg','p':'太平鸟男装休闲裤韩版修身条纹收口裤','span':'￥269.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'}
            ],
            [
                {'img':'img/tab/11.png','p':'哥弟女装短袖格纹针织上衣T恤','span':'￥324.00'},
                {'img':'img/tab/12.jpg','p':'哥弟简约百搭纯色圆领短袖针织T恤','span':'￥200.00'},
                {'img':'img/tab/13.jpg','p':'太平鸟蕾丝收腰连衣裙','span':'￥339.00'},
                {'img':'img/tab/14.jpg','p':'Amii细吊带交叉双层纯色背心连衣裙','span':'￥1369.00'},
                {'img':'img/tab/15.jpg','p':'Artka阿卡小脚绣花翻边弹力铅笔裤修身长裤','span':'￥169.00'},
                {'img':'img/tab/16.jpg','p':'韩都衣舍小猫印花刺绣短袖连衣裙','span':'￥188.00'},
                {'img':'img/tab/17.jpg','p':'韩都衣舍A字短裙条纹背带连衣裙','span':'￥149.00'},
                {'img':'img/tab/18.jpg','p':'韩都衣舍印花纱网拼接连衣裙','span':'￥139.00'},
                {'img':'img/tab/18.jpg','p':'韩都衣舍印花纱网拼接连衣裙','span':'￥139.00'},
                {'img':'img/tab/18.jpg','p':'韩都衣舍印花纱网拼接连衣裙','span':'￥139.00'}
            ]
        ],//7
        [
            [
                {'img':'img/tab/1.png','p':'哈吉斯短袖T恤翻领撞色POLO衫','span':'￥544.00'},
                {'img':'img/tab/2.jpg','p':'威可多商务正装纯棉T恤','span':'￥330.00'},
                {'img':'img/tab/3.jpg','p':'gxg.jeans印花休闲圆领棉质短袖T恤','span':'￥149.00'},
                {'img':'img/tab/4.jpg','p':'佐丹奴衬衫撞色条纹单标袋修身男士短袖','span':'￥99.00'},
                {'img':'img/tab/5.jpg','p':'G-Star 海军风Davin半长款短裤','span':'￥769.00'},
                {'img':'img/tab/6.jpg','p':'罗蒙直筒高腰商务休闲青年长裤子','span':'￥159.00'},
                {'img':'img/tab/7.jpg','p':'太平鸟男装休闲裤韩版修身条纹收口裤','span':'￥269.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'}
            ],
            [
                {'img':'img/tab/1.png','p':'哈吉斯短袖T恤翻领撞色POLO衫','span':'￥544.00'},
                {'img':'img/tab/2.jpg','p':'威可多商务正装纯棉T恤','span':'￥330.00'},
                {'img':'img/tab/3.jpg','p':'gxg.jeans印花休闲圆领棉质短袖T恤','span':'￥149.00'},
                {'img':'img/tab/4.jpg','p':'佐丹奴衬衫撞色条纹单标袋修身男士短袖','span':'￥99.00'},
                {'img':'img/tab/5.jpg','p':'G-Star 海军风Davin半长款短裤','span':'￥769.00'},
                {'img':'img/tab/6.jpg','p':'罗蒙直筒高腰商务休闲青年长裤子','span':'￥159.00'},
                {'img':'img/tab/7.jpg','p':'太平鸟男装休闲裤韩版修身条纹收口裤','span':'￥269.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'}
            ],
            [
                {'img':'img/tab/11.png','p':'哥弟女装短袖格纹针织上衣T恤','span':'￥324.00'},
                {'img':'img/tab/12.jpg','p':'哥弟简约百搭纯色圆领短袖针织T恤','span':'￥200.00'},
                {'img':'img/tab/13.jpg','p':'太平鸟蕾丝收腰连衣裙','span':'￥339.00'},
                {'img':'img/tab/14.jpg','p':'Amii细吊带交叉双层纯色背心连衣裙','span':'￥1369.00'},
                {'img':'img/tab/15.jpg','p':'Artka阿卡小脚绣花翻边弹力铅笔裤修身长裤','span':'￥169.00'},
                {'img':'img/tab/16.jpg','p':'韩都衣舍小猫印花刺绣短袖连衣裙','span':'￥188.00'},
                {'img':'img/tab/17.jpg','p':'韩都衣舍A字短裙条纹背带连衣裙','span':'￥149.00'},
                {'img':'img/tab/18.jpg','p':'韩都衣舍印花纱网拼接连衣裙','span':'￥139.00'},
                {'img':'img/tab/18.jpg','p':'韩都衣舍印花纱网拼接连衣裙','span':'￥139.00'},
                {'img':'img/tab/18.jpg','p':'韩都衣舍印花纱网拼接连衣裙','span':'￥139.00'}
            ],
            [
                {'img':'img/tab/1.png','p':'哈吉斯短袖T恤翻领撞色POLO衫','span':'￥544.00'},
                {'img':'img/tab/2.jpg','p':'威可多商务正装纯棉T恤','span':'￥330.00'},
                {'img':'img/tab/3.jpg','p':'gxg.jeans印花休闲圆领棉质短袖T恤','span':'￥149.00'},
                {'img':'img/tab/4.jpg','p':'佐丹奴衬衫撞色条纹单标袋修身男士短袖','span':'￥99.00'},
                {'img':'img/tab/5.jpg','p':'G-Star 海军风Davin半长款短裤','span':'￥769.00'},
                {'img':'img/tab/6.jpg','p':'罗蒙直筒高腰商务休闲青年长裤子','span':'￥159.00'},
                {'img':'img/tab/7.jpg','p':'太平鸟男装休闲裤韩版修身条纹收口裤','span':'￥269.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'}
            ],
            [
                {'img':'img/tab/11.png','p':'哥弟女装短袖格纹针织上衣T恤','span':'￥324.00'},
                {'img':'img/tab/12.jpg','p':'哥弟简约百搭纯色圆领短袖针织T恤','span':'￥200.00'},
                {'img':'img/tab/13.jpg','p':'太平鸟蕾丝收腰连衣裙','span':'￥339.00'},
                {'img':'img/tab/14.jpg','p':'Amii细吊带交叉双层纯色背心连衣裙','span':'￥1369.00'},
                {'img':'img/tab/15.jpg','p':'Artka阿卡小脚绣花翻边弹力铅笔裤修身长裤','span':'￥169.00'},
                {'img':'img/tab/16.jpg','p':'韩都衣舍小猫印花刺绣短袖连衣裙','span':'￥188.00'},
                {'img':'img/tab/17.jpg','p':'韩都衣舍A字短裙条纹背带连衣裙','span':'￥149.00'},
                {'img':'img/tab/18.jpg','p':'韩都衣舍印花纱网拼接连衣裙','span':'￥139.00'},
                {'img':'img/tab/18.jpg','p':'韩都衣舍印花纱网拼接连衣裙','span':'￥139.00'},
                {'img':'img/tab/18.jpg','p':'韩都衣舍印花纱网拼接连衣裙','span':'￥139.00'}
            ],
            [
                {'img':'img/tab/1.png','p':'哈吉斯短袖T恤翻领撞色POLO衫','span':'￥544.00'},
                {'img':'img/tab/2.jpg','p':'威可多商务正装纯棉T恤','span':'￥330.00'},
                {'img':'img/tab/3.jpg','p':'gxg.jeans印花休闲圆领棉质短袖T恤','span':'￥149.00'},
                {'img':'img/tab/4.jpg','p':'佐丹奴衬衫撞色条纹单标袋修身男士短袖','span':'￥99.00'},
                {'img':'img/tab/5.jpg','p':'G-Star 海军风Davin半长款短裤','span':'￥769.00'},
                {'img':'img/tab/6.jpg','p':'罗蒙直筒高腰商务休闲青年长裤子','span':'￥159.00'},
                {'img':'img/tab/7.jpg','p':'太平鸟男装休闲裤韩版修身条纹收口裤','span':'￥269.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'}
            ],
            [
                {'img':'img/tab/11.png','p':'哥弟女装短袖格纹针织上衣T恤','span':'￥324.00'},
                {'img':'img/tab/12.jpg','p':'哥弟简约百搭纯色圆领短袖针织T恤','span':'￥200.00'},
                {'img':'img/tab/13.jpg','p':'太平鸟蕾丝收腰连衣裙','span':'￥339.00'},
                {'img':'img/tab/14.jpg','p':'Amii细吊带交叉双层纯色背心连衣裙','span':'￥1369.00'},
                {'img':'img/tab/15.jpg','p':'Artka阿卡小脚绣花翻边弹力铅笔裤修身长裤','span':'￥169.00'},
                {'img':'img/tab/16.jpg','p':'韩都衣舍小猫印花刺绣短袖连衣裙','span':'￥188.00'},
                {'img':'img/tab/17.jpg','p':'韩都衣舍A字短裙条纹背带连衣裙','span':'￥149.00'},
                {'img':'img/tab/18.jpg','p':'韩都衣舍印花纱网拼接连衣裙','span':'￥139.00'},
                {'img':'img/tab/18.jpg','p':'韩都衣舍印花纱网拼接连衣裙','span':'￥139.00'},
                {'img':'img/tab/18.jpg','p':'韩都衣舍印花纱网拼接连衣裙','span':'￥139.00'}
            ]
        ],//8
        [
            [
                {'img':'img/tab/1.png','p':'哈吉斯短袖T恤翻领撞色POLO衫','span':'￥544.00'},
                {'img':'img/tab/2.jpg','p':'威可多商务正装纯棉T恤','span':'￥330.00'},
                {'img':'img/tab/3.jpg','p':'gxg.jeans印花休闲圆领棉质短袖T恤','span':'￥149.00'},
                {'img':'img/tab/4.jpg','p':'佐丹奴衬衫撞色条纹单标袋修身男士短袖','span':'￥99.00'},
                {'img':'img/tab/5.jpg','p':'G-Star 海军风Davin半长款短裤','span':'￥769.00'},
                {'img':'img/tab/6.jpg','p':'罗蒙直筒高腰商务休闲青年长裤子','span':'￥159.00'},
                {'img':'img/tab/7.jpg','p':'太平鸟男装休闲裤韩版修身条纹收口裤','span':'￥269.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'}
            ],
            [
                {'img':'img/tab/1.png','p':'哈吉斯短袖T恤翻领撞色POLO衫','span':'￥544.00'},
                {'img':'img/tab/2.jpg','p':'威可多商务正装纯棉T恤','span':'￥330.00'},
                {'img':'img/tab/3.jpg','p':'gxg.jeans印花休闲圆领棉质短袖T恤','span':'￥149.00'},
                {'img':'img/tab/4.jpg','p':'佐丹奴衬衫撞色条纹单标袋修身男士短袖','span':'￥99.00'},
                {'img':'img/tab/5.jpg','p':'G-Star 海军风Davin半长款短裤','span':'￥769.00'},
                {'img':'img/tab/6.jpg','p':'罗蒙直筒高腰商务休闲青年长裤子','span':'￥159.00'},
                {'img':'img/tab/7.jpg','p':'太平鸟男装休闲裤韩版修身条纹收口裤','span':'￥269.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'}
            ],
            [
                {'img':'img/tab/1.png','p':'哈吉斯短袖T恤翻领撞色POLO衫','span':'￥544.00'},
                {'img':'img/tab/2.jpg','p':'威可多商务正装纯棉T恤','span':'￥330.00'},
                {'img':'img/tab/3.jpg','p':'gxg.jeans印花休闲圆领棉质短袖T恤','span':'￥149.00'},
                {'img':'img/tab/4.jpg','p':'佐丹奴衬衫撞色条纹单标袋修身男士短袖','span':'￥99.00'},
                {'img':'img/tab/5.jpg','p':'G-Star 海军风Davin半长款短裤','span':'￥769.00'},
                {'img':'img/tab/6.jpg','p':'罗蒙直筒高腰商务休闲青年长裤子','span':'￥159.00'},
                {'img':'img/tab/7.jpg','p':'太平鸟男装休闲裤韩版修身条纹收口裤','span':'￥269.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'}
            ],
            [
                {'img':'img/tab/11.png','p':'哥弟女装短袖格纹针织上衣T恤','span':'￥324.00'},
                {'img':'img/tab/12.jpg','p':'哥弟简约百搭纯色圆领短袖针织T恤','span':'￥200.00'},
                {'img':'img/tab/13.jpg','p':'太平鸟蕾丝收腰连衣裙','span':'￥339.00'},
                {'img':'img/tab/14.jpg','p':'Amii细吊带交叉双层纯色背心连衣裙','span':'￥1369.00'},
                {'img':'img/tab/15.jpg','p':'Artka阿卡小脚绣花翻边弹力铅笔裤修身长裤','span':'￥169.00'},
                {'img':'img/tab/16.jpg','p':'韩都衣舍小猫印花刺绣短袖连衣裙','span':'￥188.00'},
                {'img':'img/tab/17.jpg','p':'韩都衣舍A字短裙条纹背带连衣裙','span':'￥149.00'},
                {'img':'img/tab/18.jpg','p':'韩都衣舍印花纱网拼接连衣裙','span':'￥139.00'},
                {'img':'img/tab/18.jpg','p':'韩都衣舍印花纱网拼接连衣裙','span':'￥139.00'},
                {'img':'img/tab/18.jpg','p':'韩都衣舍印花纱网拼接连衣裙','span':'￥139.00'}
            ],
            [
                {'img':'img/tab/1.png','p':'哈吉斯短袖T恤翻领撞色POLO衫','span':'￥544.00'},
                {'img':'img/tab/2.jpg','p':'威可多商务正装纯棉T恤','span':'￥330.00'},
                {'img':'img/tab/3.jpg','p':'gxg.jeans印花休闲圆领棉质短袖T恤','span':'￥149.00'},
                {'img':'img/tab/4.jpg','p':'佐丹奴衬衫撞色条纹单标袋修身男士短袖','span':'￥99.00'},
                {'img':'img/tab/5.jpg','p':'G-Star 海军风Davin半长款短裤','span':'￥769.00'},
                {'img':'img/tab/6.jpg','p':'罗蒙直筒高腰商务休闲青年长裤子','span':'￥159.00'},
                {'img':'img/tab/7.jpg','p':'太平鸟男装休闲裤韩版修身条纹收口裤','span':'￥269.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'}
            ],
            [
                {'img':'img/tab/11.png','p':'哥弟女装短袖格纹针织上衣T恤','span':'￥324.00'},
                {'img':'img/tab/12.jpg','p':'哥弟简约百搭纯色圆领短袖针织T恤','span':'￥200.00'},
                {'img':'img/tab/13.jpg','p':'太平鸟蕾丝收腰连衣裙','span':'￥339.00'},
                {'img':'img/tab/14.jpg','p':'Amii细吊带交叉双层纯色背心连衣裙','span':'￥1369.00'},
                {'img':'img/tab/15.jpg','p':'Artka阿卡小脚绣花翻边弹力铅笔裤修身长裤','span':'￥169.00'},
                {'img':'img/tab/16.jpg','p':'韩都衣舍小猫印花刺绣短袖连衣裙','span':'￥188.00'},
                {'img':'img/tab/17.jpg','p':'韩都衣舍A字短裙条纹背带连衣裙','span':'￥149.00'},
                {'img':'img/tab/18.jpg','p':'韩都衣舍印花纱网拼接连衣裙','span':'￥139.00'},
                {'img':'img/tab/18.jpg','p':'韩都衣舍印花纱网拼接连衣裙','span':'￥139.00'},
                {'img':'img/tab/18.jpg','p':'韩都衣舍印花纱网拼接连衣裙','span':'￥139.00'}
            ],
            [
                {'img':'img/tab/1.png','p':'哈吉斯短袖T恤翻领撞色POLO衫','span':'￥544.00'},
                {'img':'img/tab/2.jpg','p':'威可多商务正装纯棉T恤','span':'￥330.00'},
                {'img':'img/tab/3.jpg','p':'gxg.jeans印花休闲圆领棉质短袖T恤','span':'￥149.00'},
                {'img':'img/tab/4.jpg','p':'佐丹奴衬衫撞色条纹单标袋修身男士短袖','span':'￥99.00'},
                {'img':'img/tab/5.jpg','p':'G-Star 海军风Davin半长款短裤','span':'￥769.00'},
                {'img':'img/tab/6.jpg','p':'罗蒙直筒高腰商务休闲青年长裤子','span':'￥159.00'},
                {'img':'img/tab/7.jpg','p':'太平鸟男装休闲裤韩版修身条纹收口裤','span':'￥269.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'}
            ],
            [
                {'img':'img/tab/11.png','p':'哥弟女装短袖格纹针织上衣T恤','span':'￥324.00'},
                {'img':'img/tab/12.jpg','p':'哥弟简约百搭纯色圆领短袖针织T恤','span':'￥200.00'},
                {'img':'img/tab/13.jpg','p':'太平鸟蕾丝收腰连衣裙','span':'￥339.00'},
                {'img':'img/tab/14.jpg','p':'Amii细吊带交叉双层纯色背心连衣裙','span':'￥1369.00'},
                {'img':'img/tab/15.jpg','p':'Artka阿卡小脚绣花翻边弹力铅笔裤修身长裤','span':'￥169.00'},
                {'img':'img/tab/16.jpg','p':'韩都衣舍小猫印花刺绣短袖连衣裙','span':'￥188.00'},
                {'img':'img/tab/17.jpg','p':'韩都衣舍A字短裙条纹背带连衣裙','span':'￥149.00'},
                {'img':'img/tab/18.jpg','p':'韩都衣舍印花纱网拼接连衣裙','span':'￥139.00'},
                {'img':'img/tab/18.jpg','p':'韩都衣舍印花纱网拼接连衣裙','span':'￥139.00'},
                {'img':'img/tab/18.jpg','p':'韩都衣舍印花纱网拼接连衣裙','span':'￥139.00'}
            ]
        ],//9
        [
            [
                {'img':'img/tab/1.png','p':'哈吉斯短袖T恤翻领撞色POLO衫','span':'￥544.00'},
                {'img':'img/tab/2.jpg','p':'威可多商务正装纯棉T恤','span':'￥330.00'},
                {'img':'img/tab/3.jpg','p':'gxg.jeans印花休闲圆领棉质短袖T恤','span':'￥149.00'},
                {'img':'img/tab/4.jpg','p':'佐丹奴衬衫撞色条纹单标袋修身男士短袖','span':'￥99.00'},
                {'img':'img/tab/5.jpg','p':'G-Star 海军风Davin半长款短裤','span':'￥769.00'},
                {'img':'img/tab/6.jpg','p':'罗蒙直筒高腰商务休闲青年长裤子','span':'￥159.00'},
                {'img':'img/tab/7.jpg','p':'太平鸟男装休闲裤韩版修身条纹收口裤','span':'￥269.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'}
            ],
            [
                {'img':'img/tab/1.png','p':'哈吉斯短袖T恤翻领撞色POLO衫','span':'￥544.00'},
                {'img':'img/tab/2.jpg','p':'威可多商务正装纯棉T恤','span':'￥330.00'},
                {'img':'img/tab/3.jpg','p':'gxg.jeans印花休闲圆领棉质短袖T恤','span':'￥149.00'},
                {'img':'img/tab/4.jpg','p':'佐丹奴衬衫撞色条纹单标袋修身男士短袖','span':'￥99.00'},
                {'img':'img/tab/5.jpg','p':'G-Star 海军风Davin半长款短裤','span':'￥769.00'},
                {'img':'img/tab/6.jpg','p':'罗蒙直筒高腰商务休闲青年长裤子','span':'￥159.00'},
                {'img':'img/tab/7.jpg','p':'太平鸟男装休闲裤韩版修身条纹收口裤','span':'￥269.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'}
            ],
            [
                {'img':'img/tab/1.png','p':'哈吉斯短袖T恤翻领撞色POLO衫','span':'￥544.00'},
                {'img':'img/tab/2.jpg','p':'威可多商务正装纯棉T恤','span':'￥330.00'},
                {'img':'img/tab/3.jpg','p':'gxg.jeans印花休闲圆领棉质短袖T恤','span':'￥149.00'},
                {'img':'img/tab/4.jpg','p':'佐丹奴衬衫撞色条纹单标袋修身男士短袖','span':'￥99.00'},
                {'img':'img/tab/5.jpg','p':'G-Star 海军风Davin半长款短裤','span':'￥769.00'},
                {'img':'img/tab/6.jpg','p':'罗蒙直筒高腰商务休闲青年长裤子','span':'￥159.00'},
                {'img':'img/tab/7.jpg','p':'太平鸟男装休闲裤韩版修身条纹收口裤','span':'￥269.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'}
            ],
            [
                {'img':'img/tab/11.png','p':'哥弟女装短袖格纹针织上衣T恤','span':'￥324.00'},
                {'img':'img/tab/12.jpg','p':'哥弟简约百搭纯色圆领短袖针织T恤','span':'￥200.00'},
                {'img':'img/tab/13.jpg','p':'太平鸟蕾丝收腰连衣裙','span':'￥339.00'},
                {'img':'img/tab/14.jpg','p':'Amii细吊带交叉双层纯色背心连衣裙','span':'￥1369.00'},
                {'img':'img/tab/15.jpg','p':'Artka阿卡小脚绣花翻边弹力铅笔裤修身长裤','span':'￥169.00'},
                {'img':'img/tab/16.jpg','p':'韩都衣舍小猫印花刺绣短袖连衣裙','span':'￥188.00'},
                {'img':'img/tab/17.jpg','p':'韩都衣舍A字短裙条纹背带连衣裙','span':'￥149.00'},
                {'img':'img/tab/18.jpg','p':'韩都衣舍印花纱网拼接连衣裙','span':'￥139.00'},
                {'img':'img/tab/18.jpg','p':'韩都衣舍印花纱网拼接连衣裙','span':'￥139.00'},
                {'img':'img/tab/18.jpg','p':'韩都衣舍印花纱网拼接连衣裙','span':'￥139.00'}
            ],
            [
                {'img':'img/tab/1.png','p':'哈吉斯短袖T恤翻领撞色POLO衫','span':'￥544.00'},
                {'img':'img/tab/2.jpg','p':'威可多商务正装纯棉T恤','span':'￥330.00'},
                {'img':'img/tab/3.jpg','p':'gxg.jeans印花休闲圆领棉质短袖T恤','span':'￥149.00'},
                {'img':'img/tab/4.jpg','p':'佐丹奴衬衫撞色条纹单标袋修身男士短袖','span':'￥99.00'},
                {'img':'img/tab/5.jpg','p':'G-Star 海军风Davin半长款短裤','span':'￥769.00'},
                {'img':'img/tab/6.jpg','p':'罗蒙直筒高腰商务休闲青年长裤子','span':'￥159.00'},
                {'img':'img/tab/7.jpg','p':'太平鸟男装休闲裤韩版修身条纹收口裤','span':'￥269.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'}
            ],
            [
                {'img':'img/tab/11.png','p':'哥弟女装短袖格纹针织上衣T恤','span':'￥324.00'},
                {'img':'img/tab/12.jpg','p':'哥弟简约百搭纯色圆领短袖针织T恤','span':'￥200.00'},
                {'img':'img/tab/13.jpg','p':'太平鸟蕾丝收腰连衣裙','span':'￥339.00'},
                {'img':'img/tab/14.jpg','p':'Amii细吊带交叉双层纯色背心连衣裙','span':'￥1369.00'},
                {'img':'img/tab/15.jpg','p':'Artka阿卡小脚绣花翻边弹力铅笔裤修身长裤','span':'￥169.00'},
                {'img':'img/tab/16.jpg','p':'韩都衣舍小猫印花刺绣短袖连衣裙','span':'￥188.00'},
                {'img':'img/tab/17.jpg','p':'韩都衣舍A字短裙条纹背带连衣裙','span':'￥149.00'},
                {'img':'img/tab/18.jpg','p':'韩都衣舍印花纱网拼接连衣裙','span':'￥139.00'},
                {'img':'img/tab/18.jpg','p':'韩都衣舍印花纱网拼接连衣裙','span':'￥139.00'},
                {'img':'img/tab/18.jpg','p':'韩都衣舍印花纱网拼接连衣裙','span':'￥139.00'}
            ],
            [
                {'img':'img/tab/1.png','p':'哈吉斯短袖T恤翻领撞色POLO衫','span':'￥544.00'},
                {'img':'img/tab/2.jpg','p':'威可多商务正装纯棉T恤','span':'￥330.00'},
                {'img':'img/tab/3.jpg','p':'gxg.jeans印花休闲圆领棉质短袖T恤','span':'￥149.00'},
                {'img':'img/tab/4.jpg','p':'佐丹奴衬衫撞色条纹单标袋修身男士短袖','span':'￥99.00'},
                {'img':'img/tab/5.jpg','p':'G-Star 海军风Davin半长款短裤','span':'￥769.00'},
                {'img':'img/tab/6.jpg','p':'罗蒙直筒高腰商务休闲青年长裤子','span':'￥159.00'},
                {'img':'img/tab/7.jpg','p':'太平鸟男装休闲裤韩版修身条纹收口裤','span':'￥269.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'}
            ],
            [
                {'img':'img/tab/11.png','p':'哥弟女装短袖格纹针织上衣T恤','span':'￥324.00'},
                {'img':'img/tab/12.jpg','p':'哥弟简约百搭纯色圆领短袖针织T恤','span':'￥200.00'},
                {'img':'img/tab/13.jpg','p':'太平鸟蕾丝收腰连衣裙','span':'￥339.00'},
                {'img':'img/tab/14.jpg','p':'Amii细吊带交叉双层纯色背心连衣裙','span':'￥1369.00'},
                {'img':'img/tab/15.jpg','p':'Artka阿卡小脚绣花翻边弹力铅笔裤修身长裤','span':'￥169.00'},
                {'img':'img/tab/16.jpg','p':'韩都衣舍小猫印花刺绣短袖连衣裙','span':'￥188.00'},
                {'img':'img/tab/17.jpg','p':'韩都衣舍A字短裙条纹背带连衣裙','span':'￥149.00'},
                {'img':'img/tab/18.jpg','p':'韩都衣舍印花纱网拼接连衣裙','span':'￥139.00'},
                {'img':'img/tab/18.jpg','p':'韩都衣舍印花纱网拼接连衣裙','span':'￥139.00'},
                {'img':'img/tab/18.jpg','p':'韩都衣舍印花纱网拼接连衣裙','span':'￥139.00'}
            ]
        ],//10
        [
            [
                {'img':'img/tab/1.png','p':'哈吉斯短袖T恤翻领撞色POLO衫','span':'￥544.00'},
                {'img':'img/tab/2.jpg','p':'威可多商务正装纯棉T恤','span':'￥330.00'},
                {'img':'img/tab/3.jpg','p':'gxg.jeans印花休闲圆领棉质短袖T恤','span':'￥149.00'},
                {'img':'img/tab/4.jpg','p':'佐丹奴衬衫撞色条纹单标袋修身男士短袖','span':'￥99.00'},
                {'img':'img/tab/5.jpg','p':'G-Star 海军风Davin半长款短裤','span':'￥769.00'},
                {'img':'img/tab/6.jpg','p':'罗蒙直筒高腰商务休闲青年长裤子','span':'￥159.00'},
                {'img':'img/tab/7.jpg','p':'太平鸟男装休闲裤韩版修身条纹收口裤','span':'￥269.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'}
            ],
            [
                {'img':'img/tab/11.png','p':'哥弟女装短袖格纹针织上衣T恤','span':'￥324.00'},
                {'img':'img/tab/12.jpg','p':'哥弟简约百搭纯色圆领短袖针织T恤','span':'￥200.00'},
                {'img':'img/tab/13.jpg','p':'太平鸟蕾丝收腰连衣裙','span':'￥339.00'},
                {'img':'img/tab/14.jpg','p':'Amii细吊带交叉双层纯色背心连衣裙','span':'￥1369.00'},
                {'img':'img/tab/15.jpg','p':'Artka阿卡小脚绣花翻边弹力铅笔裤修身长裤','span':'￥169.00'},
                {'img':'img/tab/16.jpg','p':'韩都衣舍小猫印花刺绣短袖连衣裙','span':'￥188.00'},
                {'img':'img/tab/17.jpg','p':'韩都衣舍A字短裙条纹背带连衣裙','span':'￥149.00'},
                {'img':'img/tab/18.jpg','p':'韩都衣舍印花纱网拼接连衣裙','span':'￥139.00'}
            ],
            [
                {'img':'img/tab/1.png','p':'哈吉斯短袖T恤翻领撞色POLO衫','span':'￥544.00'},
                {'img':'img/tab/2.jpg','p':'威可多商务正装纯棉T恤','span':'￥330.00'},
                {'img':'img/tab/3.jpg','p':'gxg.jeans印花休闲圆领棉质短袖T恤','span':'￥149.00'},
                {'img':'img/tab/4.jpg','p':'佐丹奴衬衫撞色条纹单标袋修身男士短袖','span':'￥99.00'},
                {'img':'img/tab/5.jpg','p':'G-Star 海军风Davin半长款短裤','span':'￥769.00'},
                {'img':'img/tab/6.jpg','p':'罗蒙直筒高腰商务休闲青年长裤子','span':'￥159.00'},
                {'img':'img/tab/7.jpg','p':'太平鸟男装休闲裤韩版修身条纹收口裤','span':'￥269.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'}
            ],
            [
                {'img':'img/tab/11.png','p':'哥弟女装短袖格纹针织上衣T恤','span':'￥324.00'},
                {'img':'img/tab/12.jpg','p':'哥弟简约百搭纯色圆领短袖针织T恤','span':'￥200.00'},
                {'img':'img/tab/13.jpg','p':'太平鸟蕾丝收腰连衣裙','span':'￥339.00'},
                {'img':'img/tab/14.jpg','p':'Amii细吊带交叉双层纯色背心连衣裙','span':'￥1369.00'},
                {'img':'img/tab/15.jpg','p':'Artka阿卡小脚绣花翻边弹力铅笔裤修身长裤','span':'￥169.00'},
                {'img':'img/tab/16.jpg','p':'韩都衣舍小猫印花刺绣短袖连衣裙','span':'￥188.00'},
                {'img':'img/tab/17.jpg','p':'韩都衣舍A字短裙条纹背带连衣裙','span':'￥149.00'},
                {'img':'img/tab/18.jpg','p':'韩都衣舍印花纱网拼接连衣裙','span':'￥139.00'}
            ],
            [
                {'img':'img/tab/1.png','p':'哈吉斯短袖T恤翻领撞色POLO衫','span':'￥544.00'},
                {'img':'img/tab/2.jpg','p':'威可多商务正装纯棉T恤','span':'￥330.00'},
                {'img':'img/tab/3.jpg','p':'gxg.jeans印花休闲圆领棉质短袖T恤','span':'￥149.00'},
                {'img':'img/tab/4.jpg','p':'佐丹奴衬衫撞色条纹单标袋修身男士短袖','span':'￥99.00'},
                {'img':'img/tab/5.jpg','p':'G-Star 海军风Davin半长款短裤','span':'￥769.00'},
                {'img':'img/tab/6.jpg','p':'罗蒙直筒高腰商务休闲青年长裤子','span':'￥159.00'},
                {'img':'img/tab/7.jpg','p':'太平鸟男装休闲裤韩版修身条纹收口裤','span':'￥269.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'}
            ],
            [
                {'img':'img/tab/11.png','p':'哥弟女装短袖格纹针织上衣T恤','span':'￥324.00'},
                {'img':'img/tab/12.jpg','p':'哥弟简约百搭纯色圆领短袖针织T恤','span':'￥200.00'},
                {'img':'img/tab/13.jpg','p':'太平鸟蕾丝收腰连衣裙','span':'￥339.00'},
                {'img':'img/tab/14.jpg','p':'Amii细吊带交叉双层纯色背心连衣裙','span':'￥1369.00'},
                {'img':'img/tab/15.jpg','p':'Artka阿卡小脚绣花翻边弹力铅笔裤修身长裤','span':'￥169.00'},
                {'img':'img/tab/16.jpg','p':'韩都衣舍小猫印花刺绣短袖连衣裙','span':'￥188.00'},
                {'img':'img/tab/17.jpg','p':'韩都衣舍A字短裙条纹背带连衣裙','span':'￥149.00'},
                {'img':'img/tab/18.jpg','p':'韩都衣舍印花纱网拼接连衣裙','span':'￥139.00'}
            ],
            [
                {'img':'img/tab/1.png','p':'哈吉斯短袖T恤翻领撞色POLO衫','span':'￥544.00'},
                {'img':'img/tab/2.jpg','p':'威可多商务正装纯棉T恤','span':'￥330.00'},
                {'img':'img/tab/3.jpg','p':'gxg.jeans印花休闲圆领棉质短袖T恤','span':'￥149.00'},
                {'img':'img/tab/4.jpg','p':'佐丹奴衬衫撞色条纹单标袋修身男士短袖','span':'￥99.00'},
                {'img':'img/tab/5.jpg','p':'G-Star 海军风Davin半长款短裤','span':'￥769.00'},
                {'img':'img/tab/6.jpg','p':'罗蒙直筒高腰商务休闲青年长裤子','span':'￥159.00'},
                {'img':'img/tab/7.jpg','p':'太平鸟男装休闲裤韩版修身条纹收口裤','span':'￥269.00'},
                {'img':'img/tab/8.jpg','p':'美特斯邦威男时尚水洗牛仔中裤','span':'￥119.00'}
            ],
            [
                {'img':'img/tab/11.png','p':'哥弟女装短袖格纹针织上衣T恤','span':'￥324.00'},
                {'img':'img/tab/12.jpg','p':'哥弟简约百搭纯色圆领短袖针织T恤','span':'￥200.00'},
                {'img':'img/tab/13.jpg','p':'太平鸟蕾丝收腰连衣裙','span':'￥339.00'},
                {'img':'img/tab/14.jpg','p':'Amii细吊带交叉双层纯色背心连衣裙','span':'￥1369.00'},
                {'img':'img/tab/15.jpg','p':'Artka阿卡小脚绣花翻边弹力铅笔裤修身长裤','span':'￥169.00'},
                {'img':'img/tab/16.jpg','p':'韩都衣舍小猫印花刺绣短袖连衣裙','span':'￥188.00'},
                {'img':'img/tab/17.jpg','p':'韩都衣舍A字短裙条纹背带连衣裙','span':'￥149.00'},
                {'img':'img/tab/18.jpg','p':'韩都衣舍印花纱网拼接连衣裙','span':'￥139.00'}
            ]
        ]//11
    ];
    for(var i=0; i<11;i++) {
        (function (obj) {
            obj = (obj+1).toString();
            var $obj = $('.cont_' + obj + 'f');
            creatMain_1Data($obj, i);
            mainShow($obj)
        })(i);
    }

    function mainShow(obj){
        var $list = obj.find('.title ul li');
        $list.on('mouseover', function () {
            $list.find('strong').removeClass('active');
            $(this).find('strong').addClass('active');
            if($(this).index() == 0){
                obj.find('.main_0').show().siblings().hide();
                obj.find('.hotAuthor').show()
            }else {
                obj.find('.main_1').eq($(this).index()).show().siblings().hide();
                obj.find('.hotAuthor').hide();
            }
        })
    }



    function creatMain_1Data(obj,n){

        for(var i=0; i<arr[n].length; i++){
            var $main_1 =$('<div class="main_1"></div>');
            obj.find('.main_0').after($main_1);
            var $ul =$('<ul class="clear"></ul>');

            $main_1.append($ul);
            for(var j=0; j<arr[n][i].length; j++){
                var $li = $('<li>\
                    <div class="img"><a href="#"><img src="' + arr[n][i][j].img + '"></a></div>\
                    <a href="#"><p>' + arr[n][i][j].p + '</p></a>\
                    <span>' + arr[n][i][j].span + '</span>\
                </li>');

                $ul.append($li);
            }
        }
    }


}

                        //article_2

//sec_1
function sec_1(){
    var arr = [
            {'img':'img/dd/1.png','span':'乐心 mambo 智能手环 来电提醒 来电','strong':'￥89.00'},
            {'img':'img/dd/2.png','span':'慕姿复古女包钱包2016新款单肩','strong':'￥9.90'},
            {'img':'img/dd/3.png','span':'爱国者（aigo）黑暗骑士D8 ','strong':'￥119.00'},
            {'img':'img/dd/4.png','span':'南极人韩版牛皮男士自动扣牛皮','strong':'￥59.00'},
            {'img':'img/dd/5.png','span':'IVR Micro USB/Lightning接口 二合','strong':'￥5.17'},
            {'img':'img/dd/6.png','span':'希捷（Seagate）Backup plus ','strong':'￥779.00'},
            {'img':'img/dd/7.png','span':'锐力(READ)手表 男士手表瑞士品','strong':'￥136.00'}
        ];

    var arr_1 = [
            {'img_a':'img/dd/a_1.jpg','img_b':'img/dd/b_1.jpg','em':'袁胖胖ii','i':'"宝贝收到了，很好看，包装很严实……"'},
            {'img_a':'img/dd/a_2.jpg','img_b':'img/dd/b_2.jpg','em':'jd_151010sho','i':'"宝贝收到，很满意，试了下火力挺……"'},
            {'img_a':'img/dd/a_3.jpg','img_b':'img/dd/b_3.jpg','em':'yueyue1819','i':'"漂亮、大气、好用，还可以登网站……"'},
            {'img_a':'img/dd/a_4.jpg','img_b':'img/dd/b_4.jpg','em':'jd_138040ne','i':'"这个鼠标不错，大小合适，拿着舒……"'},
            {'img_a':'img/dd/a_5.jpg','img_b':'img/dd/b_5.jpg','em':'j***u','i':'"必须强调快递小哥很不错，酒喝过……"'},
            {'img_a':'img/dd/a_6.jpg','img_b':'img/dd/b_6.jpg','em':'狂傲的汉子','i':'"质量非常好，京东商城网购的东西……"'}
    ];

    var $ul =  $('.hot_list').find('ul');
    var timer = null;

    createDdData();
    $('.dd_list').find('div:first').addClass('_div');

    createHotData();

    var h =  $ul.find('li').eq(0).outerHeight(true);


    $ul.html($ul.html()+$ul.html());
    $ul.css('height',2*$ul.height());
    $ul.css('top',-$ul.height()/2);

    auto();

    $('.hot_list').on('mouseover', function () {
       clearInterval(timer);
    });
    $('.hot_list').on('mouseout', function () {
        auto();
    });

    function auto() {
        clearInterval(timer);
        timer = setInterval(topMove, 3500);
    }

    function topMove(){
        $ul.animate({'top':$ul.position().top+h},500,function(){
            if($ul.position().top>-1){
                $ul.css('top',-$ul.height()/2);
            }
        })
    }


    function createDdData(){
        for(var i=0; i<arr.length; i++){
            var $div = $('<div>\
                <p><a href="#"><img src="'+ arr[i].img +'"></a></p>\
                <a href="#"><span>'+ arr[i].span +'</span></a>\
            <strong>'+ arr[i].strong +'</strong>\
            </div>');

            $('.dd_list').append($div)
        }
    }


    function createHotData() {

        for(var i=0; i<arr_1.length; i++){
            var $li = $('<li>\
                <dl>\
                    <dt>\
                        <a href="#"><img src="'+ arr_1[i].img_a +'"></a>\
                    </dt>\
                    <dd>\
                        <img src="'+ arr_1[i].img_b +'">\
                        <em>'+ arr_1[i].em +'</em>\
                        <a href="#"><i>'+ arr_1[i].i +'</i></a>\
                    </dd>\
                </dl>\
            </li>');

            $ul.append($li)
        }
    }




}

                        //side

//side_l
function side_l(){
    var $side = $('.side_l');
    var $em = $('.title').find('em');
    var n = $side.outerHeight();
    var m = $side.outerWidth();
    var h= $(window).height();
    var w= $('#content').offset().left;

    var arr= [
        1740,2348,3100,3708,4312,5064,5672,6280,6886,7638,8244,8852
    ];

    //初始化side_l的位置
    $side.css({'top':(h-n)/2,'left':w-m-5});

    side_lResize();
    side_lScroll();
    side_lPosition();

    //side_1位置变换
    function side_lResize() {
        $(window).on('resize', function () {
            h = $(window).height();
            w = $('#content').offset().left;
            $side.css({'top': (h - n) / 2, 'left': w - m - 5})
        });
    }
    //side_l显示条件
    function side_lScroll() {
        $(window).on('scroll', function () {
            var t = $(window).scrollTop();
            if (t > 1018 && t < 9368) {
                $side.show(200);
            } else {
                $side.hide(200);
            }
            $em.each(function (i,elem) {
                if(t >= arr[i]-h/2+10 && t <= arr[i]){
                    $side.find('li').eq(i).addClass('active').siblings().removeClass('active');
                    //$em.eq(i).animate({'background-position-y':0},1000);
                }
            });
            var d = $side.find('.active').index();
            $em.eq(d).animate({'background-position-y':0},1000);

        })
    }


    //定位
    function side_lPosition(){
        $side.find('li').each(function (i,elem) {
            $(elem).on('click', function () {
                $(elem).addClass('active').siblings().removeClass('active');
                //$(window).scrollTop(arr[i]);
                //$('body').animate({scrollTop:arr[i]}, 1000,swing);
                var t=new TimelineMax();

                t.to('body',1.5,{scrollTop:arr[i],ease:Cubic.easeOut})

            })
        })
    }

}
//side_r
function side_r(){


    var $wrap = $('.side_wrap');
    var $option = $wrap.find('.option');
    var $otk = $wrap.find('.otk');
    var $_otk = $wrap.find('._otk');
    var $otk_ = $wrap.find('.otk_');

    var $popup_text = $('.popup_text');
    var $_popup = $('._popup');
    var $popup_text_content = $('.popup_text_content');
    var $ww = $('.ww');

    var n = $option.outerHeight();
    var h= $(window).height();
    var c=0;
    //var onOff = true;

    side_rPosition();
    side_rStyleChange();
    side_rPopup_text();
    returnTop();
    side_rClose();

    /*$(document).on('click',function () {
        $('.side_wrap').css('right',0)
    });*/


    //定位
    function side_rPosition() {
        $wrap.css({'height': h});
        $option.css({'top': (h - n) / 2});
        $_popup.css({'height':h});
        $popup_text_content.css({'height':h-80});
        $ww.css({'top':(h-40-$ww.height())/2});
        $(window).on('resize', function () {
            h = $(window).height();
            $wrap.css({'height': h});
            $option.css({'top': (h - n) / 2});
            $_popup.css({'height':h});
            $popup_text_content.css({'height':h-80});
            $ww.css({'top':(h-40-$ww.height())/2});
        })
    }
    //选项样式
    function side_rStyleChange(){
        $otk.on('mouseover', function () {
            $(this).find('span').css({'background':'#c81623'});
            $(this).find('span').stop().animate({'left':'-60'},300);
        });

        $otk.on('mouseout', function () {
            $(this).find('span').css({'background':'#7a6e6e'});
            $(this).find('span').stop().animate({'left':'35px'},300);
        });
    }
    //内容弹窗
    function side_rPopup_text() {
        $_otk.on('click', function () {
            $(this).siblings('._otk').find('em').removeClass('active');
            $(this).find('em').toggleClass('active');
            if ($(this).find('em').attr('class') == 'active') {
                $wrap.animate({'right': 270}, 200);
            } else {
                $wrap.animate({'right': 0}, 200);
            }
            var t = $(this).index();

            if (t == 0) {
                c = 1;
            }
            if (t == 2) {
                t = 1;
                c = 0;
            }
            $popup_text.eq(c).animate({'opacity': '0', 'left': '270'});
            $popup_text.eq(t).animate({'opacity': '1', 'left': '0'});
            return false;
        })
    }

    function side_rClose(){
        $('.close').eq(0).on('click', function () {
            $_otk.eq(0).trigger('click')
        });
        $('.close').eq(1).on('click', function () {
            $_otk.eq(1).trigger('click')
        })
    }

    function returnTop(){
        $('.top').on('click', function () {
            $(window).scrollTop(0);
        })
    }
}
//login
function popup_login(){
    var $login = $('.popup_login');
    var $close = $('.login_close');
    var $otk_ = $('.side_wrap').find('.otk_');
    var $name = $login.find('.name input');
    var $password = $login.find('.password input');
    var $wrap = null;
    var h = $(window).height();
    var w = $(window).width();
    var bh = $('body').height();
    var bw = $('body').width();
    var n = $login.width();
    var m = $login.height();

    loginOnOff();
    loginPosition();
    windowResize();
    loginFocus($name);
    loginFocus($password);
    //定位
    function loginPosition(){
        $login.css({'left':(w-n)/2,'top':(h-m)/2})
    }

    function windowResize(){
        $(window).on('resize', function () {
            h = $(window).height();
            w = $(window).width();
            loginPosition();
        })
    }


    //开关
    function loginOnOff(){
        $otk_.on('click', function () {
            if(!$wrap) {
                $wrap = $('<div></div>');
                $wrap.css({'width': bw, 'height': bh, 'position': 'fixed', 'top': 0, 'left': 0, 'zIndex': 99, 'background':'black','opacity':'0.5'});
                $('body').append($wrap);
            }else{
                $wrap.show();
            }
            $login.show();
        });

        $close.on('click', function () {
            $login.hide();
            $wrap.hide();
        });
    }

    //焦点事件
    function loginFocus(obj){
        obj.on('focus',function () {
            obj.css('border-color','#3ba2e4');
            obj.siblings('label').css({'border-color':'#3ba2e4','background-position-y':-48})
        });

        obj.on('blur',function () {
            obj.css('border-color','#bdbdbd');
            obj.siblings('label').css({'border-color':'#bdbdbd','background-position-y':0})
        })
    }
}

//ff支持background-position-x/y属性插件
(function($) {

    var div = document.createElement('div'),
        rposition = /([^ ]*) (.*)/;

    if(div.style.backgroundPositionX !== '') {
        $(['X', 'Y']).each(function( i, letter ) {
            var property = 'backgroundPosition' + letter,
                isX = letter == 'X';
            $.cssHooks[property] = {
                set: function(elem, value) {
                    var current = elem.style.backgroundPosition;
                    elem.style.backgroundPosition = (isX? value + ' ' : '' ) + (current? current.match(rposition)[isX+1] : '0') + (isX? '' : ' ' + value);
                },
                get: function(elem, computed) {
                    var current = computed?
                        $.css(elem, 'backgroundPosition') :
                        elem.style.backgroundPosition;
                    return current.match(rposition)[!isX+1];
                }
            };
            $.fx.step[property] = function(fx) {
                $.cssHooks[property].set(fx.elem, fx.now + fx.unit);
            }
        });
    }
    div = null;

})(jQuery);