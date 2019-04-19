$(function ($) {
    banner();
    initMobileTab();
    /*初始工具提示*/
    $('[data-toggle="tooltip"]').tooltip();
});

var banner = function () {
    /*1、准备数据
     * 2、准备模板
     * 3、把数据传递给模板生成html
     * 4、模板渲染
     * 5、对应容器加载渲染模板
     * 6.移动端手势切换
     */
    /*1、准备数据*/
    var getData = function (callback) {
        if (window.data) {
            callback && callback(window.data);
        } else {
            $.ajax({
                url: 'jsondata/images.json',
                dataType: 'json',
                type: 'get',
                success: function (data) {
                    /*缓存了数据*/
                    window.data = data;
                    callback && callback(window.data);
                }
            });
        }
    }


    var render = function () {
        getData(function (data) {
            var isMobile = $(window).width() < 768;
            /*3、把数据传递给模板生成html*/
            var pointHTML = template('pointTemplate', {list: data});
            var imageHTML = template('imageTemplate', {list: data, isMobile: isMobile});
            /*5、对应容器加载渲染模板*/
            /*<% console.log(list); %> 模版引擎内不可使用外部变量 */
            $('.carousel-indicators').html(pointHTML);
            $('.carousel-inner').html(imageHTML);
        });
    };

    /*用电脑浏览器测试，实际开发可以不写*/
    /*由于每次改窗口大小，都要请求数据，需求，只请求一次数据*/
    $(window).on('resize', function () {
        render();
    }).trigger('resize');

    /*6.移动端手势切换*/
    var startX = 0;
    var distanceX = 0;
    var isMove = false;
    $('.carousel').on('touchstart', function (e) {
        startX = e.originalEvent.touches[0].clientX;
    }).on('touchmove', function (e) {
        distanceX = e.originalEvent.touches[0].clientX - startX;
        isMove = true;
    }).on('touchend', function (e) {
        if (isMove && Math.abs(distanceX) > 50) {
            if (distanceX > 0) {
                /*prev*/
                $('.carousel').carousel('prev');
            } else {
                /*next*/
                $('.carousel').carousel('next');
            }
        }
        startX = 0;
        distanceX = 0;
        isMove = false;
    });
};

/*现不满足超小屏，要求在超小屏仍显示一行，左右滑动，需js布局*/
var initMobileTab = function () {
    /*思路：
    * 1.子内容必须设置固定的值，能一行放入所有li，width需计算
    * 2.其父容设置100%，并溢出隐藏
    * 3.自己实现滑动效果 或者 使用iscroll插件*/

    //1.子内容必须设置固定的值，能一行放入所有li，width需计算
    var $navTabs = $('.wjs_product .nav-tabs');
    var width = 0;
    /*
    * width();   contentW
    * innerWidth(); contentW+paddingW
    * outerWidth(); contentW+paddingW+borderW
    * outerWidth(true); contentW+paddingW+borderW+marginW
    * */
    $navTabs.find('li').each(function (i, item) {
        width += $(this).outerWidth(true);
    });
    $navTabs.width(width);
    /** 2.其父容设置100%，并溢出隐藏
     * html  加一个父容器给 .nav-tabs 叫  .nav-tabs-parent */

    /*.自己实现滑动效果 或者 使用iscroll插件*/
    new IScroll('.nav-tabs-parent',{
        scrollX:true,
        scrollY:false,
        click:true
    });

};