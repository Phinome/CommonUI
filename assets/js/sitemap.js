/**
 * @file:
 * @author: longyue(longyue@baidu.com)
 * @Date: 3/21/16
 */
define('sitemap', ['jquery'], function ($) {
    function mainNav(path) {
        path = path || '';
        var htmlItem = '<li class="blend-tabnav-item"><a href="{link}" class="blend-tabnav-item-text"><span class="{icon}"></span> <span>{text}</span></a></li>';
        var items = [
            {
                link: 'help/start.html',
                icon: 'ui-icon-hand-o-right',
                text: 'Get Started'

            },
            {
                link: 'css/index.html',
                icon: 'ui-icon-css3',
                text: 'CSS'
            },
            {
                link: 'controls/index.html',
                icon: 'ui-icon-code',
                text: 'Controls'
            },
            {
                link: 'http://ecomfe.github.io/eicons/demo/demo.html',
                icon: 'ui-icon-send',
                text: 'ICONS'
            }
        ];
        var html = [];
        $.each(items, function (idx, item) {
            var fullLink = item.link;
            if (fullLink.indexOf('http://') !== 0) {
                fullLink = path + fullLink;
            }
            html.push(htmlItem.replace('{link}', fullLink).replace('{icon}', item.icon).replace('{text}', item.text));
        });
        $('#global-nav').html(html.join(''));
    }

    function footer() {
        var footHtml = '<p class="ui-text-center contrast">@ 2016 Baidu</p>';
        $('.footer').html(footHtml);
    }

    function renderNav() {
        // JS 组件列表
        var navItems =
            '<li><a href="?control=Badge">徽标</a></li>' +
            '<li><a href="?control=Button">按钮 button</a></li>' +
            '<li><a href="?control=Card">卡片 card</a></li>' +
            '<li><a href="?control=Checkbox">选择框 checkbox</a></li>' +
            '<li><a href="?control=FixedBar">固定容器 fixedBar</a></li>' +
            '<li><a href="?control=Flexbox">FlexBox</a></li>' +
            '<li><a href="?control=Grid">栅格化布局 grid</a></li>' +
            '<li><a href="?control=Header">顶部导航 header</a></li>' +
            '<li><a href="?control=Link">链接 Link</a></li>' +
            '<li><a href="?control=Panel">展示面板 panel</a></li>' +
            '<li><a href="?control=Picture">图片 picture</a></li>' +
            '<li><a href="?control=Separator">分割线 separator</a></li>' +
            '<li><a href="?control=Star">星标 star</a></li>' +
            '<li><a href="?control=TabNav">导航 tabnav</a></li>' +
            '<li><a href="?control=Title">标题 title</a></li>' +
            '<li><a href="?control=ValidityLabel">Validity</a></li>' +

            '<li><a href="?control=Address">地址 address</a></li>' +
            '<li><a href="?control=Counter">数量选择器 counter</a></li>' +
            '<li><a href="?control=Dialog">弹窗 dialog</a></li>' +
            '<li><a href="?control=Formgroup">表单组 formgroup</a></li>' +
            '<li><a href="?control=Gallery">图集 gallery</a></li>' +
            '<li><a href="?control=Imglist">图片列表 imglist</a></li>' +
            '<li><a href="?control=List">列表 List</a></li>' +
            '<li><a href="?control=Loading">加载进度 loading</a></li>' +
            '<li><a href="?control=Nav">列表导航 nav</a></li>' +
            '<li><a href="?control=SideNav">侧边导航 sidenav</a></li>' +
            '<li><a href="?control=Slider">幻灯片 slider</a></li>' +
            '<li><a href="?control=Search">搜索框 search</a></li>' +
            '<li><a href="?control=Suspend">底部悬浮框 suspend</a></li>' +
            '<li><a href="?control=Switch">开关 switch</a></li>' +
            '<li><a href="?control=Tab">Tab</a></li>' +
            '<li><a href="?control=Toast">浮动提示 toast</a></li>' +
            '<li><a href="?control=TopNav">分级导航 topnav</a></li>';

        function generateNav(id, items) {
            $(id).html(items);
            var url = window.location.pathname;
            var filename = getQueryString('control');
            if (!filename) {
                filename = 'Badge';
            }
            $(id + ' a[href="?control=' + filename + '"]').parent().addClass('ui-nav-item-active');
        }

        generateNav('#navigator', navItems);

    }

    function getQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return decodeURIComponent(r[2]);
        }
        else {
            return null;
        }
    }

    function genBody(htmlReady) {
        var control = getQueryString('control');
        if (!control) {
            control = 'Badge';
        }
        var url = '';

        url = './demo/widget/' + control + '.html';

        $('#xMode').attr('src', url);

        $.ajax({
            method: 'GET',
            url: url,
            dataType: 'html',
            success: function(result) {
                var $ele = $('<div></div>');
                $ele.html(result);
                $('#main').html($ele.find('#main').html());
                if (htmlReady) {
                    htmlReady();
                }

                $ele.find('#main-js').appendTo($('body'));

            }
        });
    }

    return {
        mainNav: mainNav,
        footer: footer,
        renderNav: renderNav,
        renderBody: genBody
    };
});