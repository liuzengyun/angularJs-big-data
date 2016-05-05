var uid = sessionStorage.getItem("id");
// 路由控制
var beyond = angular.module("beyond", ["ngRoute", 'ngFileUpload']);
// 上传文件
beyond.controller("fileCtrl", ['$scope', 'Upload', function ($scope, Upload) {
    $scope.fileInfo = $scope.file;
    $scope.submit = function () {
        $scope.upload($scope.file);
    }
    $scope.upload = function (file, type) {
        Upload.upload({
            url: url + 'excel/client',
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
beyond.controller("commonCtrl", function ($scope, $http) {
    // 如果没有登录直接访问界面,就跳转到登录界面
    if (uid == null || uid == undefined || uid == "") {
        window.location.href = "../login.html";
    }

    // 获取登陆名称
    $scope.name = sessionStorage.getItem("name");
    // 显示市场人员
    var userLevel = sessionStorage.getItem("level");
    var deleteCustomer = sessionStorage.getItem("type");
    console.log(deleteCustomer);
    if (userLevel == 0) {
        $(".marketPeople").show();
    }
    if (deleteCustomer != 0) {
        $scope.hideClass = "hideCus";
    }
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
function beyondRoute($routeProvider) {
    $routeProvider
    // 默认的所有客户
        .when("/", {
            controller: allCustomer,
            templateUrl: "normalCustomer.html"
        })
        .when("/all/:province", {
            controller: allCustomer,
            templateUrl: "normalCustomer.html"
        })
        .when("/excel", {
            templateUrl: "excel.html"
        })
        // 普通客户
        .when("/normal", {
            controller: normalCustomer,
            templateUrl: "normalCustomer.html"
        })
        // 重要客户
        .when("/important", {
            controller: importantCustomer,
            templateUrl: "normalCustomer.html"
        })
        // 核心客户
        .when("/core", {
            controller: coreCustomer,
            templateUrl: "normalCustomer.html"
        })
        // 市场人员
        .when("/market", {
            controller: marketCtrl,
            templateUrl: "market.html"
        })
        // 总客户
        .when("/total/:mid", {
            controller: totalCtrl,
            templateUrl: "normalCustomer.html"
        })
        // 周新增
        .when("/addWeek/:mid", {
            controller: addWeek,
            templateUrl: "normalCustomer.html"
        })
        // 月新增
        .when("/addMonth/:mid", {
            controller: addMonth,
            templateUrl: "normalCustomer.html"
        })
        // 周互动
        .when("/interactWeek/:mid", {
            controller: interactWeek,
            templateUrl: "interaction.html"
        })
        // 月互动
        .when("/interactMonth/:mid", {
            controller: interactMonth,
            templateUrl: "interaction.html"
        })


        .when("/addCustomer", {
            controller: addCustomerCtrl,
            templateUrl: "addCustomer.html"
        })
        .when("/inputCustomer", {
            controller: inputCustomerCtrl,
            templateUrl: "inputCustomer.html"
        })
        .when("/customerInfo/:cid", {
            controller: customerInfoCtrl,
            templateUrl: "customerInfo.html"
        })
        .when("/projectInfo", { // 查看合作情况详细信息
            controller: projectInfoCtrl,
            templateUrl: "../business/projectInfo.html"
        })
        .when("/cooperation/:phone", { // 查看合作情况
            controller: cooperationCtrl,
            templateUrl: "cooperation.html"
        })
        .otherwise({
            redirectTo: "/"
        })
}
beyond.config(beyondRoute);
function deleteCustomer($scope, $http) {
    $scope.deleteCustomer = function (cid) {
        var data = {
            uid: uid,
            cid: cid
            //type: "1"   //1 客户/ 2 律师
        };
        if (confirm("确定要删除吗?") == true) {
            // 这是过去路由里面的:lid,他的值是url后面的lid的值
            $http.get(url + "sales/clientd", {params: {uid: uid, cid: cid}}).success(function (data) {
                window.location.reload();
                console.log(data);
            })
        }
        else {
            window.location.reload();
        }
    };
}
// 分页函数,定义统一函数,里面调用
// $scope: $scope;
// $http: $http;
// data: 查询返回结果数据
// level: 客户级别:所有客户""/普通客户:1/重要客户:2/核心客户:3
// endurl: 是拼接的url地址
// mid是市场人员调用的时候传递的 sale_id;
// statau 是市场人员统计编号  总数:1, 周增长:2, 月增长:3
function page($scope, $http, data, level, endurl, mid, status) {
    // 查询成功 分页
    $scope.rows = data.data.maxRows;
    $scope.page = data.data.maxPage;
    console.log($scope.rows);
    console.log($scope.page);
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
    console.log($scope.arr);
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
        $http.get(url + endurl, {
            params: {
                uid: uid,
                page: index,
                level: level,
                sale_id: mid,
                status: status
            }
        }).success(function (data) {
            // 查询成功更新显示数据
            $scope.result = data.data.data;
            console.log(data);
        });
        $scope.current = current;
        $scope.pre = pre;
    };
}
// 搜索分页函数,后面调用,参数同上
function searchPage($scope, $http, data, level, endurl, mid, status) {
    $scope.rows = data.data.maxRows;
    $scope.page = data.data.maxPage;
    console.log($scope.rows);
    console.log($scope.page);
    $scope.arr = [];
    if ($scope.page > 10) {
        $scope.arr = ["1", "2", "3", "4", "5", "...", $scope.page];
    }
    else {
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
            industry: $scope.industry,
            city: $scope.city,
            province: $scope.province,
            page: index,
            level: level
        };
        $http.get(url + endurl, {params: params}).success(function (data) {
            // 查询成功更新显示数据
            $scope.result = data.data.data;
            console.log(data);
        });
        $scope.current = current;
        $scope.pre = pre;
    };
}

// 所有客户
function allCustomer($scope, $http, $routeParams) {
    deleteCustomer($scope, $http);
    // boss跳转界面匹配省份
    var mapProvince = $routeParams.province;
    console.log(mapProvince);
    if (mapProvince != undefined) {
        var params = {uid: uid, province: mapProvince};
        //查询条件
        $scope.province = mapProvince;
        console.log(mapProvince);
    }
    else {
        var params = {uid: uid};
    }
    $scope.name = "";
    $http.get(url + "sales/seach_client", {params: params}).success(function (data) {
        if (data.status == true) {
            $scope.result = data.data.data;

            // 调用分页
            page($scope, $http, data, "", "sales/seach_client");
        }
        else {
            $scope.message = data.message;

        }
        console.log(data);
    });

    // 搜索所有客户
    $scope.searchClient = function () {
        params = {
            uid: uid,
            name: $scope.name,
            industry: $scope.industry,
            province: $scope.province,
            city: $scope.city
        };
        $http.get(url + "sales/seach_client", {params: params}).success(function (data) {
            if (data.status == true) {
                $scope.result = data.data.data;
                // 调用搜索分页
                searchPage($scope, $http, data, "", "sales/seach_client");
                console.log(data);
            }
            else {
                $scope.message = data.message;

            }
        });
    }
}
// 普通客户
function normalCustomer($scope, $http) {
    deleteCustomer($scope, $http);
    $scope.name = "";
    var params = {
        uid: uid,
        level: "1"
    };
    $http.get(url + "sales/seach_client", {params: params}).success(function (data) {
        if (data.status == true) {
            $scope.result = data.data.data;
            // 分页
            page($scope, $http, data, "1", "sales/seach_client");
        }
        else {
            $scope.message = data.message;

        }
        console.log(data);
    });

    // 搜索普通客户
    $scope.searchClient = function () {
        params = {
            uid: uid,
            name: $scope.name,
            industry: $scope.industry,
            province: $scope.province,
            city: $scope.city,
            level: "1"
        };
        $http.get(url + "sales/seach_client", {params: params}).success(function (data) {
            if (data.status == true) {
                $scope.result = data.data.data;
                // 调用搜索分页
                searchPage($scope, $http, data, "1", "sales/seach_client");
                console.log(data);
            }
            else {
                $scope.message = data.message;

            }
        });
    }
}
// 重要客户
function importantCustomer($scope, $http) {
    deleteCustomer($scope, $http);
    $scope.name = "";
    var params = {
        uid: uid,
        level: "2"
    };
    $http.get(url + "sales/seach_client", {params: params}).success(function (data) {
        if (data.status == true) {
            $scope.result = data.data.data;
            // 分页
            page($scope, $http, data, "2", "sales/seach_client");
        }
        else {
            $scope.message = data.message;
        }
        console.log();
    });

    // 搜索重要客户
    $scope.searchClient = function () {
        params = {
            uid: uid,
            name: $scope.name,
            industry: $scope.industry,
            province: $scope.province,
            city: $scope.city,
            level: "2"
        };
        $http.get(url + "sales/seach_client", {params: params}).success(function (data) {
            if (data.status == true) {
                $scope.result = data.data.data;
                // 调用搜索分页
                searchPage($scope, $http, data, "2", "sales/seach_client");
                console.log(data);
            }
            else {
                $scope.message = data.message;

            }
        });
    };
    // 搜集信息
    $scope.total = function ($scope, $http) {
        $scope.result = sessionStorage
    }

}
// 核心客户
function coreCustomer($scope, $http) {
    deleteCustomer($scope, $http);
    $scope.name = "";
    var params = {
        uid: uid,
        level: "3"
    };
    $http.get(url + "sales/seach_client", {params: params}).success(function (data) {
        if (data.status == true) {
            $scope.result = data.data.data;
            // 分页
            page($scope, $http, data, "3", "sales/seach_client");
        }
        else {
            $scope.message = data.message;
        }
        console.log();
    });
    // 搜索核心客户
    $scope.searchClient = function () {
        params = {
            uid: uid,
            name: $scope.name,
            industry: $scope.industry,
            province: $scope.province,
            city: $scope.city,
            level: "3"
        };
        $http.get(url + "sales/seach_client", {params: params}).success(function (data) {
            if (data.status == true) {
                $scope.result = data.data.data;
                // 调用搜索分页
                searchPage($scope, $http, data, "3", "sales/seach_client");
                console.log(data);
            }
            else {
                $scope.message = data.message;

            }
        });
    }
}

// 市场人员数量
function marketCtrl($scope, $http) {
    $http.get(url + "sales/sales_count", {params: {uid: uid}}).success(function (data) {
        $scope.infos = data.data;
        console.log(data);
    });
}

// 客户数
function totalCtrl($scope, $http, $routeParams) {
    $scope.name = "";
    var params = {
        uid: uid,
        sale_id: $routeParams.mid,
        status: "1"
    };
    $http.get(url + "sales/sales_insert_count", {params: params}).success(function (data) {
        if (data.status == true) {
            $scope.result = data.data.data;
            // 调用分页
            page($scope, $http, data, "", "sales/sales_insert_count", $routeParams.mid, "1");
        }
        else {
            $scope.message = data.message;
        }
        console.log(data);
    });

    // 搜索所有客户
    $scope.searchClient = function () {
        params = {
            uid: uid,
            name: $scope.name,
            industry: $scope.industry,
            province: $scope.province,
            city: $scope.city
        };
        $http.get(url + "sales/sales_insert_count", {params: params}).success(function (data) {
            if (data.status == true) {
                $scope.result = data.data.data;
                // 调用搜索分页
                searchPage($scope, $http, data, "", "sales/sales_insert_count", $routeParams.mid, "1");
                console.log(data);
            }
            else {
                $scope.message = data.message;

            }
        });
    }
}

// 周新增
function addWeek($scope, $http, $routeParams) {
    $scope.name = "";
    var params = {
        uid: uid,
        sale_id: $routeParams.mid,
        status: "2"
    };
    $http.get(url + "sales/sales_insert_count", {params: params}).success(function (data) {
        if (data.status == true) {
            $scope.result = data.data.data;
            // 调用分页
            page($scope, $http, data, "", "sales/sales_insert_count", $routeParams.mid, "1");
        }
        else {
            $scope.message = data.message;
        }
        console.log(data);
    });
}
// 月新增
function addMonth($scope, $http, $routeParams) {
    $scope.name = "";
    var params = {
        uid: uid,
        sale_id: $routeParams.mid,
        status: "3"
    };
    $http.get(url + "sales/sales_insert_count", {params: params}).success(function (data) {
        if (data.status == true) {
            $scope.result = data.data.data;
            // 调用分页
            page($scope, $http, data, "", "sales/sales_insert_count", $routeParams.mid, "1");
        }
        else {
            $scope.message = data.message;
        }
        console.log(data);
    });
}
// 周互动
function interactWeek($scope, $http, $routeParams) {
    var params = {
        uid: uid,
        sale_id: $routeParams.mid,
        status: "4"
    };
    $http.get(url + "sales/sales_insert_count", {params: params}).success(function (data) {
        if (data.status == true) {
            $scope.result = data.data.data;
            // 调用分页
            page($scope, $http, data, "", "sales/sales_insert_count", $routeParams.mid, "1");
        }
        else {
            $scope.message = data.message;
        }
        console.log(data);
    });
}
// 月互动
function interactMonth($scope, $http, $routeParams) {
    var params = {
        uid: uid,
        sale_id: $routeParams.mid,
        status: "5"
    };
    $http.get(url + "sales/sales_insert_count", {params: params}).success(function (data) {
        if (data.status == true) {
            $scope.result = data.data.data;
            // 调用分页
            page($scope, $http, data, "", "sales/sales_insert_count", $routeParams.mid, "1");
        }
        else {
            $scope.message = data.message;
        }
        console.log(data);
    });
}


function addCustomerCtrl($scope, $http) {
    console.log();
}
function inputCustomerCtrl($scope, $http) {
    console.log();
}

function customerInfoCtrl($scope, $http, $routeParams) {
    var params =
    {
        cid: $routeParams.cid
    };
    // 查看客户信息
    $http.get(url + "sales/client_detail", {params: params}).success(function (data) {
        if (data.status == true) {
            $scope.result = data.data;
            $scope.client = data.data.client;
            $scope.resume = data.data.client_resume;
            $scope.interact = data.data.client_interact;
        }
        else {
            $scope.message = data.message;
        }

        //修改基本信息
        $scope.edit_basic = function () {
            var data_eb =
            {
                uid: uid,
                cid: params.cid,
                name: $scope.client.name,
                phone: $scope.client.phone,
                email: $scope.client.email,
                sex: $scope.client.sex,
                level: $scope.client.level,
                industry: $scope.client.industry,
                firm: $scope.client.firm,
                position: $scope.client.position,
                country: $scope.client.country,
                province: $scope.client.province,
                city: $scope.client.city,
                business: $scope.client.business,
                tel: $scope.client.tel,
                hometown: $scope.client.hometown,
                wechat: $scope.client.wechat,
                case_type: $scope.client.case_type
            };
            if (confirm("您确定修改吗?")) {
                $http.post(url + "sales/cliente", data_eb).success(function (res) {
                    console.log(res);
                    //alert(res.message);
                    if (res.status == true) {
                        window.location.reload();
                    }
                })
            }
        };
        console.log(data);
    });

    // 单击修改按钮调用数据显示在修改框中
    $scope.worksessionID = function (crid, start_time, end_time, company, position) {
        $scope.crid = crid;
        $scope.start_time = start_time;
        $scope.end_time = end_time;
        $scope.company = company;
        $scope.position = position;
    };
    // 添加工作
    $scope.addExp = function () {
        var data = {
            uid: uid,
            cid: $routeParams.cid,
            start_time: $scope.start_time,
            end_time: $scope.end_time,
            company: $scope.company,
            position: $scope.position
        };
        console.log(data);
        if (confirm("您确定添加吗?")) {
            $http.post(url + "sales/client_resume", data).success(function (result) {
                if (result.status == true) {
                    window.location.reload();
                }
                else {
                    alert(result.message);
                }
                console.log(result);
            })
        }
    };
    // 修改工作
    $scope.editExp = function () {
        var data = {
            uid: uid,
            crid: $scope.crid,
            start_time: $scope.start_time,
            end_time: $scope.end_time,
            company: $scope.company,
            position: $scope.position
        };
        if (confirm("您确定修改吗?")) {
            $http.post(url + "sales/client_resumee", data).success(function (result) {
                console.log(data);
                if (result.status == true) {
                    window.location.reload();
                }
                else {
                    alert(result.message);
                }
                console.log(result);
            })
        }
    };

    // 删除工作
    $scope.deleteExp = function (id) {
        var params = {uid: uid, crid: id};
        if (confirm("确定要删除吗?") == true) {
            $http.get(url + "sales/client_resumed", {params: params}).success(function (result) {
                console.log(result);
                if (result.status == true) {
                    window.location.reload();
                }
                else {
                    alert(result.message);
                }
            })
        }
        else {
            return false;
        }
    };


    // 单击修改按钮调用数据显示在修改框中
    $scope.editint = function (ciid, form, details, time, comment, next_plan) {
        $scope.ciid = ciid;
        $scope.form = form;
        $scope.time = time;
        $scope.details = details;
        $scope.comment = comment;
        $scope.next_plan = next_plan;
    };
    // 添加互动
    $scope.addint = function () {
        var data = {
            uid: uid,
            cid: $routeParams.cid,
            form: $scope.form,
            details: $scope.details,
            time: $scope.time,
            comment: $scope.comment,
            next_plan: $scope.next_plan
        };
        console.log(data);
        if (confirm("您确定添加吗?")) {
            $http.post(url + "sales/client_interact", data).success(function (result) {
                if (result.status == true) {
                    window.location.reload();
                }
                console.log(result);
            })
        }
        else {

        }
    };
    // 修改互动
    $scope.editInt = function () {
        var data = {
            uid: uid,
            ciid: $scope.ciid,
            time: $scope.time,
            form: $scope.form,
            details: $scope.details,
            comment: $scope.comment,
            next_plan: $scope.next_plan
        };
        if (confirm("您确定修改吗?")) {
            $http.post(url + "sales/client_interacte", data).success(function (result) {
                console.log(data);
                if (result.status == true) {
                    window.location.reload();
                }
                console.log(result);
            })
        }
    };

    // 删除互动
    $scope.deleteint = function (id) {
        var params = {uid: uid, ciid: id};
        if (confirm("确定要删除吗?") == true) {
            $http.get(url + "sales/client_interactd", {params: params}).success(function (result) {
                console.log(result);
                if (result.status == true) {
                    window.location.reload();
                }
                else {
                    alert(result.message);
                }
            })
        }
        else {
            return false;
        }
    };
}
// 合作信息
function cooperationCtrl($scope, $http, $routeParams) {
    var phone = $routeParams.phone;
    var params = {phone: phone, type: "client"};
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


