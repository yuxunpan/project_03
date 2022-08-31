function animate(obj, target, callback) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        //把我们步长值改为整数不要出现小数的问题 
        // 但是有问题存在 在多个目标值之间移动 当step步长为负值时，向上取整取到的负数比原本的小 从而导致动画回弹时与目标值不一致
        // var step = Math.ceil((target - obj.offsetLeft) / 10);

        var step = (target - obj.offsetLeft) / 10; //步长公式= (目标位置 - 当前位置) /10    步长是要依次递减的所以要在定时器里面
        //解决问题：如果step值大于0向上取整，小于0向下取整
        step = step > 0 ? Math.ceil(step) : Math.floor(step);

        // 停止的条件是:让当前盒子位置等于目标位置就停止定时器
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer);
            //callback缓动动画添加回调函数 当某一动作执行完毕之后（定时器结束/动画结束）再执行该回调函数
            // if (callback) {
            //     callback();
            // }
            callback && callback(); //与的短路运算 有一个为假就不执行
        }
        //它距离左侧可视区的距离包括它本身每次移动过后的左侧距离和步长
        obj.style.left = obj.offsetLeft + step + 'px';
    }, 15)
}