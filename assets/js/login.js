$(function(){
    // 点击去注册账号的连接
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击去登录的连接
    $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 从layui中获取form对象
    let form = layui.form
    // 从layui中获取layer对象
    let layer = layui.layer

    // 通过form.verify()来自定义校验规则
    form.verify({
        // 密码的校验规则
        pwd: [
            // [\S]表示非空格的字符
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ] ,
        // 确认密码的校验规则
        repwd:function(value){
            // 通过形参value拿到的时确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断，如果判断失败，则return一个错误的提示消息
            let pwd = $('.reg-box [name=password]').val()
            if (value !==pwd) {
                return '两次密码不一致'
            }
        }
    })


    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function(e){
        // 阻止默认提交行文
        e.preventDefault()
        // 发起Ajax的post请求
        let data ={
                    username:$('#form_reg [name=username]').val(),
                    password:$('#form_reg [name=password]').val()
                }
        $.post(
            '/api/reguser',
            data,
            function(res){
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功，请登录！')
                
                // 模拟人的点击行为
                $('#link_login').click()
            }
        )
    })

    // 监听登录表单的提交事件
    $('#form_login').submit(function(e){
        // 阻止默认提交行为
        e.preventDefault()
        // 发起ajax的post请求
        $.ajax({
            url:'/api/login',
            method:'POST',
            // 快速获取表单中的数据
            data:$(this).serialize(),
            success:function(res){
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功')
                // console.log(res.token);
                // 将登录成功得到的token字符串，保存到localStorage中
                localStorage .setItem('token', res.token)
                // 当登录成功之后，跳转到后台主页
                location.href = '/index.html'
            }
        })
    })
})