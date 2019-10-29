var form, layer, element, row;
layui.use(['form', 'layedit', 'laydate', 'layer', 'element'], function () {
    form = layui.form
        , layer = layui.layer
        , layedit = layui.layedit
        , laydate = layui.laydate
        , element = layui.element;
});

$("#dg").datagrid({
    columns: [[
        { field: "employeeId", title: "员工Id", width: 80, align: "center" },
        { field: "firstName", title: "名", width: 80, align: "center" },
        { field: "lastName", title: "姓", width: 80, align: "center" },
        { field: "major", title: "专业", width: 80, align: "center" },
        { field: "bio", title: "简介", width: 80, align: "center" },
        { field: "age", title: "年龄", width: 80, align: "center" },
        { field: "grade", title: "分数", width: 80, align: "center" },
        { field: "gpa", title: "GPA", width: 80, align: "center" },
        { field: "gender", title: "性别", width: 80, align: "center" },
        { field: "created", title: "创建日期", width: 80, align: "center" },
        { field: "updated", title: "编辑日期", width: 80, align: "center" },
        {
            field: "action", title: "操作", width: 80, align: "center", formatter: function (value, row, index) {
                return `<i class="fa fa-eye mr-5" onclick="detailsEmployee(this);"></i><i class="fa fa-edit mr-5" onclick="
editEmployee(this);"></i><i class="fa fa-trash-o" onclick="deleteEmployee(this);"></i>`;
            }
        },
    ]]
});

$('#dg').datagrid({
    onClickRow: function (index, field, value) {
        row = field;
    }
});

function detailsEmployee(){
    setTimeout(function(){
        layer.open({
            btn: [],
            shade: 0,
            title: "员工信息",
            content: `<div class="mb-10"><span class="mr-5 bold">员工Id:</span><span>${row["employeeId"]}</span></div><div class="mb-10"><span class="mr-5 bold">名:</span><span>${row["firstName"]}</span></div><div  class="mb-10"><span class="mr-5 bold">姓:</span><span>${row["lastName"]}</span></div><div  class="mb-10"><span class="mr-5 bold">专业:</span><span>${row["major"]}</span></div><div  class="mb-10"><span class="mr-5 bold">简介:</span><span>${row["bio"]}</span></div><div  class="mb-10"><span class="mr-5 bold">年龄:</span><span>${row["age"]}</span></div><div  class="mb-10"><span class="mr-5 bold">分数:</span><span>${row["grade"]}</span></div><div  class="mb-10"><span class="mr-5 bold">GPA:</span><span>${row["gpa"]}</span></div><div  class="mb-10"><span class="mr-5 bold">性别:</span><span>${row["gender"]}</span></div><div  class="mb-10"><span class="mr-5 bold">创建日期:</span><span>${row["created"]}</span></div><div  class="mb-10"><span class="mr-5 bold">编辑日期:</span><span>${row["updated"]}</span></div>`

        });
    }, 1000);
}

function createEmployee(){
    setTimeout(function(){
        layer.open({
            btn: [],
            shade: 0,
            title: "新建员工",
            content: `<form class="layui-form layui-form-pane" action="">
                   <div class="layui-form-item">
                    <label class="layui-form-label">名</label>
                    <div class="layui-input-inline">
                      <input type="text" name="firstName" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" required>
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <label class="layui-form-label">姓</label>
                    <div class="layui-input-inline">
                      <input type="text" name="lastName" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input"  required>
                    </div>
                  </div>
                     <div class="layui-form-item">
                    <label class="layui-form-label">专业</label>
                    <div class="layui-input-inline">
                      <input type="text" name="major" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" required>
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <label class="layui-form-label">简介</label>
                    <div class="layui-input-inline">
                      <input type="text" name="bio" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input"  required>
                    </div>
                  </div>
                     <div class="layui-form-item">
                    <label class="layui-form-label">年龄</label>
                    <div class="layui-input-inline">
                      <input type="text" name="age" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" required>
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <label class="layui-form-label">分数</label>
                    <div class="layui-input-inline">
                      <input type="text" name="grade" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input"  required>
                    </div>
                  </div>
                     <div class="layui-form-item">
                    <label class="layui-form-label">GPA</label>
                    <div class="layui-input-inline">
                      <input type="text" name="GPA" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" required>
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <label class="layui-form-label">性别</label>
                    <div class="layui-input-inline">
                      <input type="text" name="gender" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input"  required>
                    </div>
                  </div>
 <button type="submit" class="layui-btn layui-btn-normal fr">保存</button>
</form>`
        });
        document.getElementsByTagName("form")[0].addEventListener("submit",function(e){
            e.preventDefault();
            createEmployeePost();
        });
    }, 1000);
}

function createEmployeePost(){
    var form = document.getElementsByTagName("form")[0];
    var inputs = form.getElementsByTagName("input");
    var firstName = inputs[0].value;
    var lastName = inputs[1].value;
    var major = inputs[2].value;
    var bio = inputs[3].value;
    var age = inputs[4].value;
    var grade = inputs[5].value;
    var gpa = inputs[6].value;
    var gender = inputs[7].value;
    $.ajax({
        type: "post",
        url: `http://localhost:8080/employees`,
        data: {
            "firstName": firstName, "lastName": lastName, "major": major, "bio": bio, "age": age, "grade": grade, "gpa": gpa, "gender": gender
        },
        dataType: "json",
        success: function (data) {
            if (data == 1){
                layer.closeAll();
                layer.msg("员工已创建");
                $('#dg').datagrid('reload');
            }
        },
        error: function (item, err) {
        }
    });
}

function editEmployee(){
    setTimeout(function(){
        layer.open({
            btn: [],
            shade: 0,
            title: "编辑员工",
            content: `<form class="layui-form layui-form-pane" action="">
                   <div class="layui-form-item">
                    <label class="layui-form-label">名</label>
                    <div class="layui-input-inline">
                      <input type="text" name="firstName" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" required value="${row["firstName"]}">
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <label class="layui-form-label">姓</label>
                    <div class="layui-input-inline">
                      <input type="text" name="lastName" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input"  required  value="${row["lastName"]}">
                    </div>
                  </div>
                     <div class="layui-form-item">
                    <label class="layui-form-label">专业</label>
                    <div class="layui-input-inline">
                      <input type="text" name="major" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" required value="${row["major"]}">
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <label class="layui-form-label">简介</label>
                    <div class="layui-input-inline">
                      <input type="text" name="bio" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input"  required  value="${row["bio"]}">
                    </div>
                  </div>
                     <div class="layui-form-item">
                    <label class="layui-form-label">年龄</label>
                    <div class="layui-input-inline">
                      <input type="text" name="age" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" required value="${row["age"]}">
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <label class="layui-form-label">分数</label>
                    <div class="layui-input-inline">
                      <input type="text" name="grade" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input"  required  value="${row["grade"]}">
                    </div>
                  </div>
                     <div class="layui-form-item">
                    <label class="layui-form-label">GPA</label>
                    <div class="layui-input-inline">
                      <input type="text" name="GPA" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" required value="${row["gpa"]}">
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <label class="layui-form-label">性别</label>
                    <div class="layui-input-inline">
                      <input type="text" name="gender" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input"  required  value="${row["gender"]}">
                    </div>
                  </div>
 <button type="submit" class="layui-btn layui-btn-normal fr">保存</button>
</form>`
        });
        document.getElementsByTagName("form")[0].addEventListener("submit",function(e){
            e.preventDefault();
            editEmployeePost();
        });
    }, 1000);
}

function editEmployeePost(){
    var form = document.getElementsByTagName("form")[0];
    var id = row.employeeId;
    var inputs = form.getElementsByTagName("input");
    var firstName = inputs[0].value;
    var lastName = inputs[1].value;
    var major = inputs[2].value;
    var bio = inputs[3].value;
    var age = inputs[4].value;
    var grade = inputs[5].value;
    var gpa = inputs[6].value;
    var gender = inputs[7].value;
    $.ajax({
        type: "post",
        url: `http://localhost:8080/employees/${id}`,
        data: {
            "firstName": firstName, "lastName": lastName, "major": major, "bio": bio, "age": age, "grade": grade, "gpa": gpa, "gender": gender
        },
        dataType: "json",
        success: function (data) {
            if (data == 1){
                layer.closeAll();
                layer.msg("员工已编辑");
                $('#dg').datagrid('reload');
            }
        },
        error: function (item, err) {
        }
    });
}

function deleteEmployee() {
    setTimeout(function(){
        layer.open({
        btn: [],
        shade: 0,
        title: "删除员工",
        content: `<div><div class="mb-15 tc">确定删除员工?</div><div class="tr"><button id="buttonDelete" type="submit" class="layui-btn layui-btn-danger">删除</button></div></div>`
        });
        document.getElementById("buttonDelete").addEventListener("click",function(e){
            deleteEmployeePost();
        });
    }, 1000);
}

function deleteEmployeePost() {
    var id = row.employeeId;
    $.ajax({
        type: "get",
        url: `http://localhost:8080/deleteEmployee/${id}`,
        dataType: "json",
        success: function (data) {
            if (data == 1) {
                layer.closeAll();
                layer.msg("员工已删除");
                $('#dg').datagrid('reload');
            }
        },
        error: function (item, err) {
            console.log(err);
        }
    });
}

function searchEmployee(){
    var searchTerm = document.getElementById('inputSearchEmployee').value;
    var searchTermFinal = "";
    if (searchTerm !== ""){
        searchTermFinal = searchTerm;
    }
    $("#dg").datagrid({
        url: `http://localhost:8080/searchEmployee?term=${searchTermFinal}`,
        method: 'get',
        onLoadSuccess: function (data) {
        }
    });

}

function main(){
    $("#dg").datagrid({
        url: `http://localhost:8080/indexPaginated`,
        method: 'get',
        onLoadSuccess: function (data) {
        }
    });
}

main();