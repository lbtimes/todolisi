$(function() {
    //JSON.parse() 把字符串改成对象格式
    // JSON.stringify() 把数组对象转换为字符串格式 

    // localStorage.getItem 读取本地储存数据
    // localStorage.setItem 保存本地储存的数据
    // localStorage.removeItem  删除本地储存的数据


    // /1. 按下回车 把完整数据 存储到本地存储里面
    // 存储的数据格式  var todolist = [{title: "xxx", done: false}]

    load();
    $("#title").on('keyup', function(event) {
        if ($(this).val() === '') {
            alert('请输入内容');
        } else {
            if (event.keyCode === 13) {
                // 先读取本地存储的数据
                var local = getDate();
                // 把local的数据更新,把最新的数据追加给local
                local.push({ title: $(this).val(), done: false });
                //把这个数组local存储给本地储存
                saveDate(local);
                //渲染到页面中
                load();
                $(this).val('');
            }
        }

    });

    // 3. toDolist 删除操作
    $('ol,ul').on('click', 'a', function() {
        // 先获取数据
        var date = getDate();
        // 修改数据
        var index = $(this).attr('id');
        date.splice(index, 1);
        // 保存到本地
        saveDate(date)
            //重新渲染
        load();
    });

    // 4.toDolist 正在进行和已经完成的操作
    $('ol,ul').on('click', 'input', function() {
        // 先获取数据
        var date = getDate();
        // 修改数据
        var index = $(this).siblings('a').attr('id');
        date[index].done = $(this).prop('checked');
        // 保存到本地
        saveDate(date);
        //重新渲染
        load();

    });


    // 因为 读取 本地存储很多地方都要用到 封装成函数 方便调用
    function getDate() {
        var date = localStorage.getItem("todolist");
        if (date !== null) {
            return JSON.parse(date); //JSON.parse() 把字符串改成对象格式
        } else {
            return [];
        }
    };

    // 因为 保存 本地存储很多地方都要用到 封装成函数 方便调用
    function saveDate(date) {
        localStorage.setItem("todolist", JSON.stringify(date))
    }
    // 2.因为 渲染 到页面很多地方都要用到 封装成函数 方便调用
    function load() {
        var date = getDate();
        // 让小圆圈的数字显示出来
        var todoCount = 0; // 正在进行的个数
        var doneCount = 0; // 已经完成的个数
        // 在渲染之前先清空之前的数据
        $('ol,ul').empty();
        // 因为得到的数据是数组形式,需要遍历
        $.each(date, function(i, n) {
            if (n.done) {
                $("ul").prepend("<li><input type='checkbox' checked> <p>" + n.title + "</p> <a href='javascript:;' id=" + i + "></a></li>")
                doneCount++;
            } else {
                $("ol").prepend("<li><input type='checkbox' > <p>" + n.title + "</p> <a href='javascript:;' id=" + i + "></a></li>")
                todoCount++;
            }
        });
        $('#todocount').text(todoCount);
        $('#donecount').text(doneCount);
    }
});