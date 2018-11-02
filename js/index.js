window.onload = function(){
  init();
}

function init(){
  initCourseList();
}

var initCourseList = (function(){
  var loading = document.getElementsByClassName('loading')[0],
      olist = document.getElementsByClassName('list')[0],
      btnitem = document.getElementsByClassName('btn-item'),
      footer = document.getElementsByClassName('footer')[0],
      oTpl = document.getElementById('tpl').innerHTML,
      page = 0,
      t = null,
      cache = {};  //设置缓存池，先初始化为空

  function init(){
    getAjaxCourses(page)
    bindEvent();
  }
 
  function bindEvent(){     

    addEvent(footer, 'click', btnClick)

  }

  function btnClick(e){
    var e = e || window.event,
        tar = e.target || e.srcElement,
        oParent = tar.parentNode,
        thisIdx = -1;
        

        if(oParent.className === 'btn-item'){
          thisIdx = Array.prototype.indexOf.call(btnitem,oParent);
          var len = btnitem.length,
          item;
          page = thisIdx;
          cache[page] ? getCacheCourses() : getAjaxCourses()
          for(var i = 0; i < len; i++){
            btnitem[i].className = 'btn-item';
          }
          btnitem[thisIdx].className = 'btn-item cur';
        }

  }

  function getAjaxCourses(){
    console.log(1)
    ajaxReturn({
      url: APIs.getCourses,
      data: {
        page: page
      },
      success: function(data){
        console.log('获取数据成功');
        console.log(data)
        cache[page] = data;       //将数据保存在缓存池
        loading.style.display = 'block'; 
        t = setTimeout(function(){
          render(data);
          loading.style.display = 'none'; 
        }, 500);

      },
      error: function(){
        alert('获取数据失败');
      }
    });
  }

  function getCacheCourses(){
    var data = cache[page];   //复用缓存池
    render(data);
  }
  
  function render(data){  //data是在getAjaxCourse成功的时候获取的
    var list = '',
    len = data.length,
    item;
    for (var i = 0; i < len; i++){
      item = data[i];  //循环data中的每项
      list += setTplToHTML(oTpl, regTpl, {
        folder: item.folder,
        classname: item.classname,
        name: item.name,
        watched: item.watched
      });
    }
    olist.innerHTML = list;
  }

  return function(){
    init()
  }
})();

var APIs = {
  getCourses: 'http://study.lfclass.com/Index/getCourses'
}

function ajaxReturn(opt){
  $.ajax({
    url: opt.url,
    type: 'POST',
    dataType: 'JSON',
    data: opt.data,
    timeout: 100000,
    success: opt.success,
    error: opt.error
  })
}