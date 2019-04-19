$(function ($) {
    banner();
    initMobileTab();
    /*��ʼ������ʾ*/
    $('[data-toggle="tooltip"]').tooltip();
});

var banner = function () {
    /*1��׼������
     * 2��׼��ģ��
     * 3�������ݴ��ݸ�ģ������html
     * 4��ģ����Ⱦ
     * 5����Ӧ����������Ⱦģ��
     * 6.�ƶ��������л�
     */
    /*1��׼������*/
    var getData = function (callback) {
        if (window.data) {
            callback && callback(window.data);
        } else {
            $.ajax({
                url: 'jsondata/images.json',
                dataType: 'json',
                type: 'get',
                success: function (data) {
                    /*����������*/
                    window.data = data;
                    callback && callback(window.data);
                }
            });
        }
    }


    var render = function () {
        getData(function (data) {
            var isMobile = $(window).width() < 768;
            /*3�������ݴ��ݸ�ģ������html*/
            var pointHTML = template('pointTemplate', {list: data});
            var imageHTML = template('imageTemplate', {list: data, isMobile: isMobile});
            /*5����Ӧ����������Ⱦģ��*/
            /*<% console.log(list); %> ģ�������ڲ���ʹ���ⲿ���� */
            $('.carousel-indicators').html(pointHTML);
            $('.carousel-inner').html(imageHTML);
        });
    };

    /*�õ�����������ԣ�ʵ�ʿ������Բ�д*/
    /*����ÿ�θĴ��ڴ�С����Ҫ�������ݣ�����ֻ����һ������*/
    $(window).on('resize', function () {
        render();
    }).trigger('resize');

    /*6.�ƶ��������л�*/
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

/*�ֲ����㳬С����Ҫ���ڳ�С������ʾһ�У����һ�������js����*/
var initMobileTab = function () {
    /*˼·��
    * 1.�����ݱ������ù̶���ֵ����һ�з�������li��width�����
    * 2.�丸������100%�����������
    * 3.�Լ�ʵ�ֻ���Ч�� ���� ʹ��iscroll���*/

    //1.�����ݱ������ù̶���ֵ����һ�з�������li��width�����
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
    /** 2.�丸������100%�����������
     * html  ��һ���������� .nav-tabs ��  .nav-tabs-parent */

    /*.�Լ�ʵ�ֻ���Ч�� ���� ʹ��iscroll���*/
    new IScroll('.nav-tabs-parent',{
        scrollX:true,
        scrollY:false,
        click:true
    });

};