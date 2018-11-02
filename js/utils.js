// 获取坐标
function pagePos(e) {
    var sLeft = getScrollOffset().left,
        sTop = getScrollOffset().top,
        // 下边这两个是获取偏移量
        cLeft = document.documentElement.clientLeft || 0,
        cTop = document.documentElement.clientTop || 0;

    return {
        X: e.clientX + sLeft - cLeft,
        Y: e.clientY + sTop - cTop
    }
}
// 获取滚动条距离
function getScrollOffset() {
    if (window.pageXOffset) {
        return {
            left: window.pageXOffset,
            top: window.pageYOffset
        }
    } else {
        return {
            left: document.body.scrollLeft + document.documentElement.scrollLeft,
            top: document.body.scrollTop + document.documentElement.scrollTop
        }
    }
}

// 获取DOM属性  attr要加''
function getStyles(el, attr) {
    if (window.getComputedStyle) {
        if (attr) {
            return parseInt(window.getComputedStyle(el, null)[attr]);
        } else {
            return window.getComputedStyle(el, null);
        }
    } else {
        if (attr) {
            return parseInt(el.currentStyle[attr]);
        } else {
            return el.currentStyle;
        }
    }
}

// 寻找子元素
function elemChildren(node) {
    var temp = {
            'length': 0,
            'splice': Array.prototype.splice
        },
        len = node.childNodes.length;
    for (var i = 0; i < len; i++) {
        var childItem = node.childNodes[i];

        if (childItem.nodeType === 1) {
            temp[temp.length] = childItem;
            temp['length']++;
        }
    }
    return temp;
}

//寻找父元素
function elemParent(node, n){
    var type = typeof(n);

    if(type ==='undefined'){
        return node.parentNode;
    }else if(n <= 0 || type !== 'number'){
        return undefined;
    }

    while(n){
        node = node.parentNode;
        n--;
    }
    return node;
}

// 添加监听事件
function addEvent(el, type, fn) {
    if (el.addEventListener) {
        el.addEventListener(type, fn, false);
    } else if (el.attachEvent) {
        el.attachEvent('on' + type, function () {
            fn.call(el);
        })
    } else {
        el['on' + type] = fn;
    }
}

// 取消监听事件
function removeEvent(elem, type, fn) {
    if (elem.addEventListener) {
        elem.removeEventListener(type, fn, false);
    } else if (elem.attachEvent) {
        elem.detachEvent('on' + type, fn);
    } else {
        elem['on' + 'type'] = null;
    }
}

// 取消冒泡
function cancelBubble(e) {
    var e = e || window.event;

    if (e.stopPropagation) {
        e.stopPropagation();
    } else {
        e.canceBubble = true;
    }
}

// 取消默认事件
function preventDefaultEvent(e) {
    var e = e || window.event;

    if (e.preventDefault) {
        event.preventDefault();
    } else {
        event.returnValue = false;
    }
}

// 拖拽元素
function elemDrag(elem){
    var x,
        y;

    addEvent(elem, 'mousedown', function(e){
        var e = e || window.event;
        x = pagePos(e).X - getStyles(elem, 'left');
        y = pagePos(e).Y - getStyles(elem, 'top');

        addEvent(document, 'mousemove', mouseMove);
        addEvent(document, 'mouseup', mouseUp);
        cancelBubble(e);
        preventDefaultEvent(e);
    });

    function mouseMove(e){
        var e = e || window.event;
        elem.style.top = pagePos(e).Y - y + 'px';
        elem.style.left = pagePos(e).X -x + 'px';
    }

    function mouseUp(e){
        var e = e || window.event;
        removeEvent(document, 'mousemove', mouseMove);
        removeEvent(document, 'mouseup',mouseUp);
    }
}  

// 获取可视区域大小
function getViewportSize() {
    if (window.innerWidth) {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    } else {
        if (document.compatMode === 'BackCompat') {
            return {
                width: document.body.clientWidth,
                height: document.body.clientHeight
            }
        } else {
            return {
                width: document.documentElement.clientWidth,
                height: document.documentElement.clientHeight
            }
        }
    }
}


function setTplToHTML(tpl, regExp, opt){
    return tpl.replace(regExp(), function(node, key){
        // console.log(node,key,opt[key])
        return opt[key];
    });
}

function regTpl(){
    return new RegExp(/{{(.*?)}}/, 'gim');
}

// 获取整个HTML区域大小
function getScrollSize(){
  if(document.body.scrollWidth){
    return {
      width: document.body.scrollWidth,
      height: document.body.scrollHeight
    }
  }else{
    return {
      width:document.documentElement.scrollWidth,
      height: document.documentElement.scrollHeight
    }
  }
}

// 获取可视区域大小
function getViewSize() {
    if (window.innerWidth) {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    } else {
        if (document.compatMode === 'BackCompat') {
            return {
                width: document.body.clientWidth,
                height: document.body.clientHeight
            }
        } else {
            return {
                width: document.documentElement.clientWidth,
                height: document.documentElement.clientHeight
            }
        }
    }
}