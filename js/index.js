window.onload = function () {
    //一、导航栏js动画效果
    var nav = document.querySelector('#nav');
    var lis = nav.querySelectorAll('.top-nav-li');
    var navline = document.querySelector('#navline');
    var uls = document.querySelectorAll('.top-nav-li>ul');
    //1.鼠标经过当前a 当前a链接的兄弟节点ul显示（滑入动画）
    var current = 255;
    for (var i = 0; i < lis.length; i++) {
        lis[i].setAttribute('index', i);
        lis[i].addEventListener('mouseenter', function () {
            //鼠标经过  小横条滑动到该位置
            animate(navline, this.offsetLeft);
            var index = this.getAttribute('index');
            // console.log(index);
            for (var i = 0; i < lis.length; i++) {
                uls[i].style.display = 'none';
            }
            uls[index].style.display = 'block';
        })
        //鼠标离开 回到起始位置255
        lis[i].addEventListener('mouseleave', function () {
            animate(navline, current);
            for (var i = 0; i < lis.length; i++) {
                uls[i].style.display = 'none';
            }
        });


    }

    //二、轮播图效果
    //1.鼠标经过停止播放 鼠标离开继续播放（定时器）
    var banner = document.querySelector('.main_wrap #banner');
    var publish_slider = document.querySelector('#publish-copy');
    banner.addEventListener('mouseenter', function () {
        //停止定时器
        clearInterval(timer);
        timer = null;
    })
    banner.addEventListener('mouseleave', function () {
        //开启定时器
        timer = setInterval(function () {
            index1++;
            if (index1 > 2) index1 = 0;
            animate(publish_slider, -index1 * mainWidth);
            for (var i = 0; i < b_dot.children.length; i++) {
                b_dot.children[i].className = '';
            }
            b_dot.children[index1].className = 'on';
        }, 2000)
    })

    //2.动态生成小圆圈  鼠标经过当前小圆圈类名为on(排他思想)
    var b_dot = document.querySelector('.b_dot');
    var main_wrap = document.querySelector('.main_wrap ');
    var mainWidth = main_wrap.offsetWidth;
    console.log(mainWidth);
    for (var i = 0; i < publish_slider.children.length; i++) {
        //创建a链接 追加到b_dot
        var a = document.createElement('a');
        //创建a的同时   设置自定义索引属性
        a.setAttribute('index', i);
        b_dot.appendChild(a);

        //鼠标经过当前小圆圈类名为on(排他思想)
        a.addEventListener('mouseenter', function () {
            for (var i = 0; i < b_dot.children.length; i++) {
                b_dot.children[i].className = '';
            }
            this.className = 'on';
            //获取a连接的自定义索引属性
            var index = this.getAttribute('index');
            index1 = index;
            console.log(index);
            animate(publish_slider, -index * mainWidth);
        })
    }
    //默认第一个圆圈有on类名
    b_dot.children[0].className = 'on';



    //2.轮播图自动播放(相当于我们鼠标经过了小圆点) 定时器
    var index1 = 0;
    var timer = setInterval(function () {
        index1++;
        if (index1 > 2) index1 = 0;
        animate(publish_slider, -index1 * mainWidth);
        for (var i = 0; i < b_dot.children.length; i++) {
            b_dot.children[i].className = '';
        }
        b_dot.children[index1].className = 'on';
    }, 2000)
}