// 注意：每次调用$.get()或$.post()或$.ajax()的时候，都会先调用ajaxPrefilter这个函数
// 在这个函数中可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function(options){
    // 再发起真正的Ajax请求之前，统一拼接请求的根路径
    options.url = 'http://www.liulongbin.top:3007'+ options.url
    // console.log(options.url);


    // 统一为有权限的headers设置请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization:localStorage.getItem('token') || ''
        }
    }

    // 全统一挂载complete回调函数，
    options.complete = function(res){
        // console.log('执行了complete回调函数');
        // console.log(res);
        // 在complete回调函数中可以使用res.responseJSON拿到服务器响应回来的数据
        // 
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 1、强制清空token
            localStorage.removeItem('token')
            // 2、强制跳转到登录页面
            location.href = '/login.html'
        }
    }
    
})