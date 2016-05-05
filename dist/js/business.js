var uid = sessionStorage.getItem("id");
// 路由依赖 ngRoute
var beyond = angular.module("beyond", ["ngRoute", 'ngFileUpload']);
beyond.controller("commonCtrl", function ($scope, $http) {
    // 如果没有登录直接访问界面,就跳转到登录界面
    if (uid == null || uid == undefined || uid == "") {
        window.location.href = "../login.html";
    }

    // 获取登陆名称
    $scope.name = sessionStorage.getItem("name");
    // 退出删除session
    $scope.out = function () {
        $http.post(url + "login/logout").success(function (data) {
            if (data.status == true) {
                sessionStorage.clear();
                window.location.href = "../login.html";
            }
            console.log(data);
        })
    };

    // 修改密码
    $scope.old_pass = "";
    $scope.new_pass = "";
    $scope.second_new_pass = "";
    $scope.editPass = function () {
        var data = {uid: uid, old_pass: $scope.old_pass, new_pass: $scope.new_pass};
        if ($scope.new_pass != $scope.second_new_pass) {
            alert("两次输入密码不一致");
        }
        else {
            $http.post(url + "user/passe", data).success(function (data) {
                alert(data.message);
                console.log(data);
            });
        }

    };
});

// 上传文件
beyond.controller("fileCtrl", ['$scope', 'Upload', function ($scope, Upload) {
    $scope.fileInfo = $scope.file;

    $scope.submit = function () {
        $scope.upload($scope.file);
    }
    $scope.upload = function (file, type) {
        Upload.upload({
            url: url + 'excel/lawyer',
            data: {file: file, uid: uid}

            //成功的情况
        }).success(function (data, status, headers, config) {
            $scope.error = data.data.error;
            $scope.failed_num = data.data.failed_num;
            $scope.success_num = data.data.success_num;
            console.log(data);

            //失败的情况
        }).error(function (data) {
            console.log(data);
        })
    }

}]);

// 路由控制
function beyondRoute($routeProvider) {
    $routeProvider
    // 查看所有律师
        .when("/",
            {
                controller: allLawyerCtrl,
                templateUrl: "allLawyers.html"
            }
        )
        .when("/all/:province",
            {
                controller: allLawyerCtrl,
                templateUrl: "allLawyers.html"
            }
        )
        // 查看某个律师详细信息
        .when("/lawyerInfo/:lid",
            {
                controller: lawyerInfo,
                templateUrl: "lawyerInfo.html"
            }
        )

        // 普通律师控制器
        .when("/normal",
            {
                controller: normalLawyerCtrl,
                templateUrl: "allLawyers.html"
            }
        )
        .when("/core",
            {
                controller: coreLawyerCtrl,
                templateUrl: "allLawyers.html"
            }
        )
        // 资深律师
        .when("/core/:province",
            {
                controller: coreLawyerCtrl,
                templateUrl: "allLawyers.html"
            }
        )
        // 离职法官律师
        .when("/important",
            {
                controller: important,
                templateUrl: "allLawyers.html"
            }
        )
        .when("/important/:province",
            {
                controller: important,
                templateUrl: "allLawyers.html"
            }
        )
        // 次重要律师
        .when("/second",
            {
                controller: secondCtrl,
                templateUrl: "allLawyers.html"
            }
        )
        // excel导入
        .when("/excel",
            {
                templateUrl: "excel.html"
            }
        )
        //地图过滤
        //.when("/",
        //    {
        //        controller: mapCtrl,
        //        templateUrl: "allLawyers.html"
        //    }
        //)
        .when("/addLawyer", {
            templateUrl: "addLawyer.html"
        })
        .when("/favorites", { // 收藏列表
            controller: favoriteList,
            templateUrl: "favorites.html"
        })
        .when("/inputLawyer", { // 录入律师
            controller: inputLawyerCtrl,
            templateUrl: "inputLawyer.html"
        })

        .when("/cooperation/:phone", { // 查看合作情况
            controller: cooperationCtrl,
            templateUrl: "cooperation.html"
        })

        .when("/projectInfo", { // 查看合作情况详细信息
            controller: projectInfoCtrl,
            templateUrl: "projectInfo.html"
        })
        .otherwise(
            {
                redirectTo: "/"
            }
        )
}
beyond.config(beyondRoute);

// 删除某个律师,定义为函数,在后面调用
function deleteLawyer($scope, $http) {
    $scope.deleteLawyer = function (lid) {
        var data = {
            uid: uid,
            clid: lid,
            type: "2"   //1 客户/ 2 律师
        };
        if (confirm("确定要删除吗?") == true) {
            // 这是过去路由里面的:lid,他的值是url后面的lid的值
            $http.get(url + "lawyer/lawyerd", {params: {uid: uid, lid: lid}}).success(function (data) {
                window.location.reload();
                console.log(data);
            })
        }
        else {
            window.location.reload();
        }
    };
    // 收藏
    $scope.collection = function (lid) {
        var data = {
            uid: uid,
            clid: lid,
            type: "2"   //1 客户/ 2 律师
        };
        $http.post(url + "user/collection", data).success(function (result) {
            alert(result.message);
        });
    };
}
// 分页的函数 后面调用
function page($scope, $http, data, type) {
    $scope.rows = data.data.maxRows;
    $scope.page = data.data.maxPage;
    $scope.arr = [];
    if ($scope.page > 10) {
        $scope.arr = ["0", "1", "2", "3", "4", "5", "...", $scope.page];
    }
    else {
        $scope.arr = [];
        $scope.arr.length = $scope.page;
        for (var i = 0; i <= $scope.page; i++) {
            $scope.arr[i] = i;
        }
    }
    // 判断 如果页码小于1就不显示分页
    if ($scope.page <= 1) {
        $("#page").hide();
    }
    else {
        $("#page").show();
    }

    if ($scope.page == 0) {
        $(".no_info").show();
    }
    else {
        $(".no_info").hide();
    }
    // 分页数组信息
    $scope.pageClick = function (index) {
        var current = index;
        var pre = index;
        if (current == undefined) {
            current = 1;
        }
        if (current >= $scope.page) {
            current = $scope.page;
        }
        if (pre == undefined || pre <= 1) {
            pre = 1;
        }
        if (pre >= $scope.page) {
            pre = $scope.page;
        }
        current++;
        pre--;
        $http.get(url + "lawyer/seach_lawyer", {params: {uid: uid, page: index, type: type}}).success(function (data) {
            // 查询成功更新显示数据
            $scope.result = data.data.data;
            console.log(data);
        });
        $scope.current = current;
        $scope.pre = pre;
    };
}
// 查询分页 后面调用
function searchPage($scope, $http, data, type, endUrl) {
    $scope.rows = data.data.maxRows;
    $scope.page = data.data.maxPage;
    $scope.arr = [];
    if ($scope.page > 10) {
        $scope.arr = ["0", "1", "2", "3", "4", "5", "...", $scope.page];
    }
    else {
        $scope.arr = [];
        $scope.arr.length = $scope.page;
        for (var i = 0; i <= $scope.page; i++) {
            $scope.arr[i] = i;
        }
    }
    // 判断 如果页码小于1就不显示分页
    if ($scope.page <= 1) {
        $("#page").hide();
    }
    else {
        $("#page").show();
    }

    if ($scope.page == 0) {
        $(".no_info").show();
    }
    else {
        $(".no_info").hide();
    }
    // 分页数组信息
    $scope.name = "";
    $scope.pageClick = function (index) {
        if (index == "...") {
            return false;
        }
        var current = index;
        var pre = index;
        if (current == undefined) {
            current = 1;
        }
        if (current >= $scope.page) {
            current = $scope.page;
        }
        if (pre == undefined || pre <= 1) {
            pre = 1;
        }
        if (pre >= $scope.page) {
            pre = $scope.page;
        }
        current++;
        pre--;
        var params = {
            uid: uid,
            name: $scope.name,
            major: $scope.major,
            city: $scope.city,
            province: $scope.province,
            firm: $scope.firm,
            sex: $scope.sex,
            input_mode: $scope.input_mode,
            page: index,
            type: type,
            court_level: $scope.court_level,
            business_court: $scope.business_court
        };
        $http.get(url + endUrl, {params: params}).success(function (data) {
            // 查询成功更新显示数据
            $scope.result = data.data.data;
            console.log(data);
        });
        $scope.current = current;
        $scope.pre = pre;
    };
}

function checkMapProvince($scope, $routeParams) {
    // boss跳转界面匹配省份
    var mapProvince = $routeParams.province;
    if (mapProvince != undefined) {
        var params = {uid: uid, province: mapProvince};
        $scope.province = mapProvince;
        console.log(mapProvince);
    }
    else {
        var params = {uid: uid};
    }
    return params;
}

// 读取所有律师信息
function allLawyerCtrl($scope, $http, $routeParams) {
    // 判断地图传递省份
    var params = checkMapProvince($scope, $routeParams);
    // 删除律师
    deleteLawyer($scope, $http);

    // 所有律师
    $http.get(url + "lawyer/seach_lawyer", {params: params}).success(function (data) {
        // 查询是否成功
        if (data.status == true) {
            $scope.result = data.data.data;
            // 调取分页方法
            page($scope, $http, data, "", "lawyer/seach_lawyer");
        }
        else {
            $scope.message = data.message;
        }
    });
    // 按条件查找,单击查询按钮,并分页
    $scope.name = "";
    $scope.city = "";
    //$scope.province = "";
    $scope.firm = "";
    $scope.sex = "";
    $scope.input_mode = "";
    $scope.major = "";
    $scope.search = function () {
        var params = {
            uid: uid,
            name: $scope.name,
            major: $scope.major,
            city: $scope.city,
            province: $scope.province,
            firm: $scope.firm,
            sex: $scope.sex,
            input_mode: $scope.input_mode
        };
        $http.get(url + "lawyer/seach_lawyer", {params: params}).success(function (data) {
            // 查询是否成功
            if (data.status == true) {
                $scope.result = data.data.data;
                //搜索分页
                searchPage($scope, $http, data, "", "lawyer/seach_lawyer");
            }
            else {
                $scope.message = data.message;
            }
            console.log(data);
        });
    };
}
// 普通律师
function normalLawyerCtrl($scope, $http) {
    // 删除律师
    deleteLawyer($scope, $http);
    var params = {
        uid: uid,
        type: "1"
    };
    $http.get(url + "lawyer/seach_lawyer", {params: params}).success(function (data) {
        // 查询是否成功
        if (data.status == true) {
            $scope.result = data.data.data;
            // 分页函数
            page($scope, $http, data, "1", "lawyer/seach_lawyer");
        }
        else {
            $scope.message = data.message;
        }
        console.log(data);
    });
    // 按条件查找,单击查询按钮,并分页
    // 初始化
    $scope.name = "";
    $scope.city = "";
    //$scope.province = "";
    $scope.firm = "";
    $scope.sex = "";
    $scope.input_mode = "";
    $scope.major = "";
    $scope.search = function () {
        var params = {
            uid: uid,
            name: $scope.name,
            major: $scope.major,
            city: $scope.city,
            province: $scope.province,
            firm: $scope.firm,
            sex: $scope.sex,
            input_mode: $scope.input_mode,
            type: "1"
        };
        $http.get(url + "lawyer/seach_lawyer", {params: params}).success(function (data) {
            // 查询是否成功
            if (data.status == true) {
                $scope.result = data.data.data;
                //搜索分页
                searchPage($scope, $http, data, "1", "lawyer/seach_lawyer")
            }
            else {
                $scope.message = data.message;
            }
            console.log(data);
        });
    };
}
// 资深律师
function coreLawyerCtrl($scope, $http, $routeParams) {
    // 判断地图传递省份
    var params = checkMapProvince($scope, $routeParams);
    // 删除律师
    deleteLawyer($scope, $http);
    params.type = 2;
    $http.get(url + "lawyer/seach_lawyer", {params: params}).success(function (data) {
        // 查询是否成功
        if (data.status == true) {
            $scope.result = data.data.data;
            page($scope, $http, data, "2", "lawyer/seach_lawyer");
        }
        else {
            $scope.message = data.message;
        }
        console.log(data);
    });
    // 按条件查找,单击查询按钮,并分页
    // 初始化
    $scope.name = "";
    $scope.city = "";
    //$scope.province = "";
    $scope.firm = "";
    $scope.sex = "";
    $scope.input_mode = "";
    $scope.major = "";
    $scope.search = function () {
        var params = {
            uid: uid,
            name: $scope.name,
            major: $scope.major,
            city: $scope.city,
            province: $scope.province,
            firm: $scope.firm,
            sex: $scope.sex,
            input_mode: $scope.input_mode,
            type: 2
        };
        $http.get(url + "lawyer/seach_lawyer", {params: params}).success(function (data) {
            // 查询是否成功
            if (data.status == true) {
                $scope.result = data.data.data;
                searchPage($scope, $http, data, "2", "lawyer/seach_lawyer");
            }
            else {
                $scope.message = data.message;
            }
            console.log(data);
        });
    };
}

// 离职法官律师
function important($scope, $http, $routeParams) {
    // 判断地图传递省份
    var params = checkMapProvince($scope, $routeParams);
    // 删除律师
    deleteLawyer($scope, $http);
    params.type = 3;
    $http.get(url + "lawyer/seach_lawyer", {params: params}).success(function (data) {
        // 查询是否成功
        if (data.status == true) {
            $scope.result = data.data.data;
            page($scope, $http, data, "3", "lawyer/seach_lawyer");
        }
        else {
            $scope.message = data.message;
        }
        console.log(data);
    });
    // 按条件查找,单击查询按钮,并分页
    // 初始化
    $scope.name = "";
    $scope.city = "";
    //$scope.province = "";
    $scope.firm = "";
    $scope.sex = "";
    $scope.input_mode = "";
    $scope.major = "";
    $scope.search = function () {
        var params = {
            uid: uid,
            name: $scope.name,
            major: $scope.major,
            city: $scope.city,
            province: $scope.province,
            firm: $scope.firm,
            sex: $scope.sex,
            input_mode: $scope.input_mode,
            type: "3",
            court_level: $scope.court_level,
            business_court: $scope.business_court
        };
        $http.get(url + "lawyer/seach_lawyer", {params: params}).success(function (data) {
            // 查询是否成功
            if (data.status == true) {
                $scope.result = data.data.data;
                searchPage($scope, $http, data, "3", "lawyer/seach_lawyer");
            }
            else {
                $scope.message = data.message;
            }
            console.log(data);
        });
    };
}
// 次重要律师
function secondCtrl($scope, $http) {
    // 删除律师
    deleteLawyer($scope, $http);
    var params = {
        uid: uid,
        type: "4"
    };
    $http.get(url + "lawyer/seach_lawyer", {params: params}).success(function (data) {
        // 查询是否成功
        if (data.status == true) {
            $scope.result = data.data.data;
            page($scope, $http, data, "4", "lawyer/seach_lawyer");
        }
        else {
            $scope.message = data.message;
        }
        console.log(data);
    });
    // 按条件查找,单击查询按钮,并分页
    // 初始化
    $scope.name = "";
    $scope.city = "";
    //$scope.province = "";
    $scope.firm = "";
    $scope.sex = "";
    $scope.input_mode = "";
    $scope.major = "";
    $scope.search = function () {
        var params = {
            uid: uid,
            name: $scope.name,
            major: $scope.major,
            city: $scope.city,
            province: $scope.province,
            firm: $scope.firm,
            sex: $scope.sex,
            input_mode: $scope.input_mode,
            type: "4"
        };
        $http.get(url + "lawyer/seach_lawyer", {params: params}).success(function (data) {
            // 查询是否成功
            if (data.status == true) {
                $scope.result = data.data.data;
                searchPage($scope, $http, data, "4", "lawyer/seach_lawyer")
            }
            else {
                $scope.message = data.message;
            }
            console.log(data);
        });
    };
}

// 查看某个律师详情
function lawyerInfo($scope, $http, $routeParams) {
    // 这是过去路由里面的:lid,他的值是url后面的lid的值
    var lid = $routeParams.lid;
    $http.get(url + "lawyer/lawyer_detail", {params: {lid: lid}}).success(function (data) {
        // 进入数据库判断
        if (data.data.lawyer.input_mode == 1) {
            data.data.lawyer.input_mode = "excel导入"
        }
        else if (data.data.lawyer.input_mode == 2) {
            data.data.lawyer.input_mode = "手工录入"
        }
        else if (data.data.lawyer.input_mode == 3) {
            data.data.lawyer.input_mode = "律师入驻"
        }

        $scope.result = data.data;
        $scope.lawyer = data.data.lawyer;
        $scope.lawyer_exp = data.data.lawyer_exp;
        $scope.lawyer_rep = data.data.lawyer_rep;
        $scope.lawyer_interact = data.data.lawyer_interact;
        $scope.lawyer_edu = data.data.lawyer_edu;
        console.log(data.data);
    });

    // 互动人接口
    $http.get(url + "user/user", {params: {type: "2"}}).success(function (people) {
        $scope.peoples = people.data;
        console.log(people.data);
    });

    // 添加互动
    $scope.addInstract = function () {
        var data = {
            uid: uid,
            lid: lid,
            form: $scope.form,
            details: $scope.details,
            comment: $scope.comment,
            time: $scope.time
        };
        if (confirm("您确定添加吗?")) {
            $http.post(url + "lawyer/interact", data).success(function (result) {
                if (result.status == true) {
                    window.location.reload();
                }
                console.log(result);
            })
        }
        else {

        }
    };
    // 删除互动
    $scope.deleteInstract = function (id) {
        var params = {uid: uid, liid: id};
        if (confirm("确定要删除吗?") == true) {
            $http.get(url + "lawyer/lawyer_interactd", {params: params}).success(function (result) {
                console.log(result);
                if (result.status == true) {
                    window.location.reload();
                }
            })
        }
        else {
            return false;
        }
    };

    // 修改互动信息
    $scope.form = "";
    $scope.details = "";
    $scope.comment = "";
    $scope.time = "";
    // 单击修改按钮调用数据显示在修改框中
    $scope.insessionID = function (liid, form, details, time, comment) {
        $scope.liid = liid;
        $scope.form = form;
        $scope.details = details;
        $scope.time = time;
        $scope.comment = comment;
    };
    $scope.editInstract = function () {
        var data = {
            uid: uid,
            liid: $scope.liid,
            form: $scope.form,
            details: $scope.details,
            comment: $scope.comment,
            time: $scope.time
        };
        console.log(data);
        if (confirm("您确定修改吗?")) {
            $http.post(url + "lawyer/interacte", data).success(function (result) {
                console.log(result);
                if (result.status == true) {
                    window.location.reload();
                }
            })
        }
        else {

        }
    };

    // 添加教育经历
    $scope.addEdu = function () {
        var data = {
            uid: uid,
            lid: lid,
            start_time: $scope.start_time,
            end_time: $scope.end_time,
            school: $scope.school,
            major: $scope.major,
            academic_degree: $scope.academic_degree
        };
        if (confirm("您确定添加吗?")) {
            $http.post(url + "lawyer/lawyer_edu", data).success(function (result) {
                if (result.status == true) {
                    window.location.reload();
                }
                console.log(result);
            })
        }
        else {

        }
    };

    // 单击修改按钮调用数据显示在修改框中
    $scope.edusessionID = function (luid, start_time, end_time, school, major, academic_degree) {
        $scope.luid = luid;
        $scope.start_time = start_time;
        $scope.end_time = end_time;
        $scope.school = school;
        $scope.major = major;
        $scope.academic_degree = academic_degree;
    };
    // 修改教育经历
    $scope.eidtEdu = function () {
        var data = {
            uid: uid,
            luid: $scope.luid,
            start_time: $scope.start_time,
            end_time: $scope.end_time,
            school: $scope.school,
            major: $scope.major,
            academic_degree: $scope.academic_degree
        };
        if (confirm("您确定修改吗?")) {
            $http.post(url + "lawyer/lawyer_edue", data).success(function (result) {
                if (result.status == true) {
                    window.location.reload();
                }
                console.log(result);
            })
        }
        else {

        }
    };

    // 删除教育经历
    $scope.deleteEdu = function (id) {
        var params = {uid: uid, luid: id};
        if (confirm("确定要删除吗?") == true) {
            $http.get(url + "lawyer/lawyer_edu", {params: params}).success(function (result) {
                console.log(result);
                if (result.status == true) {
                    window.location.reload();
                }
            })
        }
        else {
            return false;
        }
    };

    // 添加工作
    $scope.addExp = function () {
        var data = {
            uid: uid,
            lid: lid,
            start_time: $scope.start_time,
            end_time: $scope.end_time,
            company: $scope.company,
            position: $scope.position,
            department: $scope.department,
            license_number: $scope.license_number
        };
        if (confirm("您确定要添加吗?") == true) {
            $http.post(url + "lawyer/lawyer_exp", data).success(function (result) {
                if (result.status == true) {
                    window.location.reload();
                }
                console.log(result);
            })
        }
        else {

        }
    };

    // 单击修改按钮调用数据显示在修改框中
    $scope.worksessionID = function (leid, start_time, end_time, company, position, department, license_number) {
        $scope.leid = leid;
        $scope.start_time = start_time;
        $scope.end_time = end_time;
        $scope.company = company;
        $scope.position = position;
        $scope.department = department;
        $scope.license_number = license_number;
    };
    // 修改工作
    $scope.editExp = function () {
        var data = {
            uid: uid,
            leid: $scope.leid,
            start_time: $scope.start_time,
            end_time: $scope.end_time,
            company: $scope.company,
            position: $scope.position,
            department: $scope.department,
            license_number: $scope.license_number
        };
        if (confirm("您确定要修改吗?") == true) {
            $http.post(url + "lawyer/lawyer_expe", data).success(function (result) {
                console.log(data);
                if (result.status == true) {
                    window.location.reload();
                }
                console.log(result);
            })
        }
        else {

        }
    };

    // 删除工作
    $scope.deleteExp = function (id) {
        var params = {uid: uid, leid: id};
        if (confirm("确定要删除吗?") == true) {
            $http.get(url + "lawyer/lawyer_exp", {params: params}).success(function (result) {
                console.log(result);
                if (result.status == true) {
                    window.location.reload();
                }
            })
        }
        else {
            return false;
        }
    };

    // 添加业绩
    $scope.addRep = function () {
        var data = {
            uid: uid,
            lid: lid,
            time: $scope.time,
            content: $scope.content
        };
        if (confirm("您确定要添加吗?") == true) {
            $http.post(url + "lawyer/lawyer_rep", data).success(function (result) {
                if (result.status == true) {
                    window.location.reload();
                }
                console.log(result);
            })
        }
        else {

        }
    };

    //单击修改按钮的时候,将值传递到后台变量中,然后绑定到前端model,从而现实修改字段内容
    $scope.sessionID = function (lrid, time, content) {
        $scope.lrid = lrid;
        $scope.time = time;
        $scope.content = content;
    };
    $scope.editRep = function () {
        var data = {
            uid: uid,
            lrid: $scope.lrid,
            time: $scope.time,
            content: $scope.content
        };
        if (confirm("您确定要修改吗?") == true) {
            $http.post(url + "lawyer/lawyer_repe", data).success(function (result) {
                console.log(data);
                if (result.status == true) {
                    window.location.reload();
                }
                console.log(result);
            })
        }
        else {

        }
    };

    // 删除业绩
    $scope.deleteRep = function (id) {
        var params = {uid: uid, lrid: id};
        if (confirm("确定要删除吗?") == true) {
            $http.get(url + "lawyer/lawyer_rep", {params: params}).success(function (result) {
                console.log(result);
                if (result.status == true) {
                    window.location.reload();
                }
            })
        }
        else {
            return false;
        }
    };
}

//收藏
function favoriteList($scope, $http) {
    var params = {uid: uid, type: "2"};
    $http.get(url + "user/collection", {params: params}).success(function (result) {
        // 查询是否成功
        $scope.result = result.data;
        console.log(result);
    });
    console.log();
}
function inputLawyerCtrl($scope, $http) {
    console.log();
}
// 合作信息
function cooperationCtrl($scope, $http, $routeParams) {
    var phone = $routeParams.phone;
    var params = {phone: phone, type: "lawyer"};
    $http.get(url + "coop/info", {params: params}).success(function (result) {
        // 查询是否成功
        if (result.status == true) {
            $scope.result = result.data;
        }
        else {
            $scope.message = result.message;
        }
        console.log(result);
    });

}
function projectInfoCtrl($scope, $http) {
    console.log();
}

