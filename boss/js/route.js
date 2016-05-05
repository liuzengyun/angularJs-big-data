var uid = sessionStorage.getItem("id");
var myapp = angular.module("myapp", ["ngRoute"]);
myapp.controller("all", function ($scope) {
    // 如果没有登录直接访问界面,就跳转到登录界面
    if (uid == null || uid == undefined || uid == "") {
        window.location.href = "../login.html";
    }
});
// 选中
function myRoute($routeProvider) {
    $routeProvider
        .when("/", {
            controller: worldCtrl,
            templateUrl: "world.html"
        })
        .when("/CN", {
            controller: chinaCtrl,
            templateUrl: "CN.html"
        })
        .when("/coreLawyer", {
            controller: coreLawyer,
            templateUrl: "coreLawyer.html"
        })
        .when("/CN-other", {
            controller: quitCtrl,
            templateUrl: "CN-other.html"
        })
        .otherwise({
            redirectTo: "/"
        })
}
myapp.config(myRoute);

// 这是世界地图的控制器
function worldCtrl($scope, $http) {
    $http.get(url+"boss/normal_lawyer").success(function (data) {
        $scope.world = data.world;
        $scope.total = data.total;
        console.log(data);
        // 世界地图
        var mapObj_1 = {};
        $('#WorldMap').SVGMap({
            external: mapObj_1,
            mapName: 'world',
            mapWidth: "100%",
            mapHeight: "380",
            stateData: $scope.world,
            stateTipWidth: "auto",
            stateTipHeight: "auto",
            stateTipHtml: function (mapData, obj) {
                // mapData 对象的对象
                // obj是一个对象
                // obj.id = 国家的名称 CN/US
                var name = obj.id;
                var _value = mapData[name].value;
                var tipStr = '<div class="mapInfo"><span>' + obj.name + '</span><b>' + _value + '</b></div>';
                return tipStr;
            },
            // 注册单击函数,界面跳转
            clickCallback: function (mapData, obj) {
                if (obj.id == "CN") {
                    window.location = "#/CN";
                    $location.path("#/CN");
                    $location.replace();
                }
                if (obj.id == "US") {
                    window.location = "#/US";
                    $location.path("#/US");
                    $location.replace();
                }
                else {
                    window.location = "#/"
                }
            }
        });
    });
}

// 中国地图
function chinaCtrl($scope, $http) {
    $http.get(url+"boss/normal_lawyer").success(function (data) {
        $scope.world = data;
        $scope.china = data.china;
        $scope.zw = data.zw;
        $scope.total = data.total;
        console.log($scope.world);
        var stype = data.type;
        // map.js中初始化了色值数组,然后stateInitColor调用数组的下标,来取数组的值.
        // 7 是没哟初始化填充色
        // 这个是加载的数据,地图是加载的china.js文件
        var mapObj_1 = {};
        $('#RegionMap').SVGMap({
            external: mapObj_1,
            mapName: 'china',
            mapWidth: '100%',
            mapHeight: '470',
            // 使用angularJS获取的数据
            stateData: $scope.china,
            stateTipWidth: "auto",
            stateTipHeight: "auto",
            stateTipX: 2,
            stateTipY: 0,
            stateTipHtml: function (mapData, obj) {
                var _value = mapData[obj.id].value;
                var _idx = mapData[obj.id].index;
                var tipStr = '<div class="mapInfo"><span>' + obj.name + '</span><b>' + _value + '</b></div>';
                return tipStr;
            },
            // 注册单击函数,界面跳转
            clickCallback: function (mapData, obj) {
                if (obj.id == "黑龙江") {
                    obj.id = "heilongjiang";

                } else if (obj.id == "jilin") {
                    obj.id = "吉林";

                } else if (obj.id == "liaoning") {
                    obj.id = "辽宁";

                } else if (obj.id == "hebei") {
                    obj.id = "河北";

                } else if (obj.id == "shandong") {
                    obj.id = "山东";
                } else if (obj.id == "jiangsu") {
                    obj.id = "江苏";

                } else if (obj.id == "zhejiang") {
                    obj.id = "浙江";

                } else if (obj.id == "anhui") {
                    obj.id = "安徽";

                } else if (obj.id == "henan") {
                    obj.id = "河南";

                } else if (obj.id == "shanxi") {
                    obj.id = "山西";

                } else if (obj.id == "shaanxi") {
                    obj.id = "陕西";

                } else if (obj.id == "gansu") {
                    obj.id = "甘肃";

                } else if (obj.id == "hubei") {
                    obj.id = "湖北";

                } else if (obj.id == "jiangxi") {
                    obj.id = "江西";

                } else if (obj.id == "fujian") {
                    obj.id = "福建";

                } else if (obj.id == "hunan") {
                    obj.id = "湖南";

                } else if (obj.id == "guizhou") {
                    obj.id = "贵州";
                } else if (obj.id == "sichuan") {
                    obj.id = "四川";
                } else if (obj.id == "yunnan") {
                    obj.id = "云南";
                } else if (obj.id == "guizhou") {
                    obj.id = "贵州";
                } else if (obj.id == "qinghai") {
                    obj.id = "青海";
                } else if (obj.id == "guizhou") {
                    obj.id = "贵州";
                } else if (obj.id == "hainan") {
                    obj.id = "海南";
                } else if (obj.id == "shanghai") {
                    obj.id = "上海";
                } else if (obj.id == "chongqing") {
                    obj.id = "重庆";
                } else if (obj.id == "tianjin") {
                    obj.id = "天津";
                } else if (obj.id == "beijing") {
                    obj.id = "北京";
                } else if (obj.id == "ningxia") {
                    obj.id = "宁夏";
                } else if (obj.id == "neimongol") {
                    obj.id = "内蒙古";
                } else if (obj.id == "guangxi") {
                    obj.id = "广西";
                } else if (obj.id == "xinjiang") {
                    obj.id = "新疆";
                } else if (obj.id == "xizang") {
                    obj.id = "西藏";
                } else if (obj.id == "guangdong") {
                    obj.id = "广东";
                } else if (obj.id == "hongkong") {
                    obj.id = "香港";
                } else if (obj.id == "taiwan") {
                    obj.id = "台湾";
                } else if (obj.id == "macau") {
                    obj.id = "澳门";
                }
                if (stype == 1) {
                    window.open('../business/index.html#/all/' + obj.id);
                }
                else if (stype == 2) {
                    window.open('../business/index.html#/important/' + obj.id);
                }
                else if (stype == 3) {
                    window.open('../business/index.html#/core/' + obj.id);
                }

            }
        });
    });
}

// 中国资深律师
function coreLawyer($scope, $http) {
    $http.get(url+"boss/senior_lawyer").success(function (data) {
        $scope.zw = data.zw;
        $scope.china = data.place;
        $scope.total = data.total;
        $scope.major = data.major;
        var lawyerLength = data.major.length;
        // 判断显示
        if (lawyerLength = 1) {
            var numOne = parseInt(data.major[0].value);
            var numTwo = "";
            var numThree = "";
            var numFour = "";
            var numFive = "";
            var numSix = "";
            var numSeven = "";

            var majorOne = data.major[0].major;
            var majorTwo = "";
            var majorThree = "";
            var majorFour = "";
            var majorFive = "";
            var majorSix = "";
            var majorSeven = "";
        }
        else if (lawyerLength <= 2) {
            var numOne = parseInt(data.major[0].value);
            var numTwo = parseInt(data.major[1].value);
            var numThree = "";
            var numFour = "";
            var numFive = "";
            var numSix = "";
            var numSeven = "";

            var majorOne = data.major[0].major;
            var majorTwo = data.major[1].major;
            var majorThree = "";
            var majorFour = "";
            var majorFive = "";
            var majorSix = "";
            var majorSeven = "";
        }
        else if (lawyerLength <= 3) {
            var numOne = parseInt(data.major[0].value);
            var numTwo = parseInt(data.major[1].value);
            var numThree = parseInt(data.major[2].value);
            var numFour = "";
            var numFive = "";
            var numSix = "";
            var numSeven = "";

            var majorOne = data.major[0].major;
            var majorTwo = data.major[1].major;
            var majorThree = data.major[2].major;
            var majorFour = "";
            var majorFive = "";
            var majorSix = "";
            var majorSeven = "";
        }
        else if (lawyerLength <= 4) {
            var numOne = parseInt(data.major[0].value);
            var numTwo = parseInt(data.major[1].value);
            var numThree = parseInt(data.major[2].value);
            var numFour = parseInt(data.major[3].value);
            var numFive = "";
            var numSix = "";
            var numSeven = "";

            var majorOne = data.major[0].major;
            var majorTwo = data.major[1].major;
            var majorThree = data.major[2].major;
            var majorFour = data.major[3].major;
            var majorFive = "";
            var majorSix = "";
            var majorSeven = "";
        }
        else if (lawyerLength <= 5) {
            var numOne = parseInt(data.major[0].value);
            var numTwo = parseInt(data.major[1].value);
            var numThree = parseInt(data.major[2].value);
            var numFour = parseInt(data.major[3].value);
            var numFive = parseInt(data.major[4].value);
            var numSix = "";
            var numSeven = "";

            var majorOne = data.major[0].major;
            var majorTwo = data.major[1].major;
            var majorThree = data.major[2].major;
            var majorFour = data.major[3].major;
            var majorFive = data.major[4].major;
            var majorSix = "";
            var majorSeven = "";
        }
        else if (lawyerLength <= 6) {
            var numOne = parseInt(data.major[0].value);
            var numTwo = parseInt(data.major[1].value);
            var numThree = parseInt(data.major[2].value);
            var numFour = parseInt(data.major[3].value);
            var numFive = parseInt(data.major[4].value);
            var numSix = parseInt(data.major[5].value);
            var numSeven = "";

            var majorOne = data.major[0].major;
            var majorTwo = data.major[1].major;
            var majorThree = data.major[2].major;
            var majorFour = data.major[3].major;
            var majorFive = data.major[4].major;
            var majorSix = data.major[5].major;
            var majorSeven = "";
        }
        else if (lawyerLength <= 7) {
            var numOne = parseInt(data.major[0].value);
            var numTwo = parseInt(data.major[1].value);
            var numThree = parseInt(data.major[2].value);
            var numFour = parseInt(data.major[3].value);
            var numFive = parseInt(data.major[4].value);
            var numSix = parseInt(data.major[5].value);
            var numSeven = parseInt(data.major[6].value);

            var majorOne = data.major[0].major;
            var majorTwo = data.major[1].major;
            var majorThree = data.major[2].major;
            var majorFour = data.major[3].major;
            var majorFive = data.major[4].major;
            var majorSix = data.major[5].major;
            var majorSeven = data.major[6].major;
        }

        console.log(data);
        // map.js中初始化了色值数组,然后stateInitColor调用数组的下标,来取数组的值.
        // 7 是没哟初始化填充色
        // 这个是加载的数据,地图是加载的china.js文件
        var mapObj_1 = {};
        var series = [{
            name: 'Brands',
            colorByPoint: true,
            data: [
                {
                    name: majorOne,
                    color: "#ec6b27",
                    y: numOne
                },
                {
                    name: majorTwo,
                    color: "#f5b32b",
                    y: numTwo
                },
                {
                    name: majorThree,
                    color: "#25b38b",
                    y: numThree
                },
                {
                    name: majorFour,
                    color: "#5c69ad",
                    y: numFour
                },
                {
                    name: majorFive,
                    color: "#33cc33",
                    y: numFive
                },
                {
                    name: majorSix,
                    color: "#02fbff",
                    y: numSix
                },
                {
                    name: majorSeven,
                    color: "#468dcc",
                    y: numSeven
                }
            ]
        }];
        $('#RegionMap').SVGMap({
            external: mapObj_1,
            mapName: 'china',
            mapWidth: '100%',
            mapHeight: '470',
            // 使用angularJS获取的数据
            stateData: $scope.china,
            stateTipWidth: "auto",
            stateTipHeight: "auto",
            stateTipX: 2,
            stateTipY: 0,
            stateTipHtml: function (mapData, obj) {
                var _value = mapData[obj.id].value;
                var _idx = mapData[obj.id].index;
                var tipStr = '<div class="mapInfo"><span>' + obj.name + '</span><b>' + _value + '</b></div>';
                return tipStr;
            },
            // 注册单击函数,界面跳转
            clickCallback: function (mapData, obj) {
                if (obj.id == "黑龙江") {
                    obj.id = "heilongjiang";

                } else if (obj.id == "jilin") {
                    obj.id = "吉林";

                } else if (obj.id == "liaoning") {
                    obj.id = "辽宁";

                } else if (obj.id == "hebei") {
                    obj.id = "河北";

                } else if (obj.id == "shandong") {
                    obj.id = "山东";
                } else if (obj.id == "jiangsu") {
                    obj.id = "江苏";

                } else if (obj.id == "zhejiang") {
                    obj.id = "浙江";

                } else if (obj.id == "anhui") {
                    obj.id = "安徽";

                } else if (obj.id == "henan") {
                    obj.id = "河南";

                } else if (obj.id == "shanxi") {
                    obj.id = "山西";

                } else if (obj.id == "shaanxi") {
                    obj.id = "陕西";

                } else if (obj.id == "gansu") {
                    obj.id = "甘肃";

                } else if (obj.id == "hubei") {
                    obj.id = "湖北";

                } else if (obj.id == "jiangxi") {
                    obj.id = "江西";

                } else if (obj.id == "fujian") {
                    obj.id = "福建";

                } else if (obj.id == "hunan") {
                    obj.id = "湖南";

                } else if (obj.id == "guizhou") {
                    obj.id = "贵州";
                } else if (obj.id == "sichuan") {
                    obj.id = "四川";
                } else if (obj.id == "yunnan") {
                    obj.id = "云南";
                } else if (obj.id == "guizhou") {
                    obj.id = "贵州";
                } else if (obj.id == "qinghai") {
                    obj.id = "青海";
                } else if (obj.id == "guizhou") {
                    obj.id = "贵州";
                } else if (obj.id == "hainan") {
                    obj.id = "海南";
                } else if (obj.id == "shanghai") {
                    obj.id = "上海";
                } else if (obj.id == "chongqing") {
                    obj.id = "重庆";
                } else if (obj.id == "tianjin") {
                    obj.id = "天津";
                } else if (obj.id == "beijing") {
                    obj.id = "北京";
                } else if (obj.id == "ningxia") {
                    obj.id = "宁夏";
                } else if (obj.id == "neimongol") {
                    obj.id = "内蒙古";
                } else if (obj.id == "guangxi") {
                    obj.id = "广西";
                } else if (obj.id == "xinjiang") {
                    obj.id = "新疆";
                } else if (obj.id == "xizang") {
                    obj.id = "西藏";
                } else if (obj.id == "guangdong") {
                    obj.id = "广东";
                } else if (obj.id == "hongkong") {
                    obj.id = "香港";
                } else if (obj.id == "taiwan") {
                    obj.id = "台湾";
                } else if (obj.id == "macau") {
                    obj.id = "澳门";
                }

                //if (stype == 1) {
                //    window.open('../business/index.html#/all/' + obj.id);
                //}
                //else if (stype == 2) {
                    window.open('../business/index.html#/core/' + obj.id);
                //}
                //else if (stype == 3) {
                //    window.open('../business/index.html#/core/' + obj.id);
                //}

            }
        });

        // Create the chart
        $('#container').highcharts({
            chart: {
                type: 'column',
                backgroundColor: 'rgba(255, 255, 255, 0)'
            },
            title: {
                text: ''
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                type: 'category'
            },
            yAxis: {
                title: {
                    text: '律师数'
                }

            },
            legend: {
                enabled: false
            },
            plotOptions: {
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true,
                        format: '{point.y}'
                    }
                }
            },

            tooltip: {
                headerFormat: '{point.y}',
                // 经过的显示的内容
                pointFormat: ''
            },

            // 这是动态数据,统计图的,以后要在前面angularJS获取定义变量,在这里调用.

            series: series
        });
    });
}

function quitCtrl($scope, $http) {
    $http.get(url+"boss/core_lawyer").success(function (data) {
        $scope.zw = data.zw;
        $scope.china = data.place;
        $scope.total = data.total;
        $scope.court = data.court;
        $scope.business = data.business;
        console.log(data);
        var courtLength = data.court.length;
        var businessLength = data.business.length;
        // 判断显示
        if (courtLength == 1) {
            var numOne = parseInt(data.court[0].value);
            var numTwo = "";
            var numThree = "";
            var numFour = "";

            var courtOne = data.court[0].court;
            var courtTwo = "";
            var courtThree = "";
            var courtFour = "";
        }
        else if (courtLength <= 2) {
            var numOne = parseInt(data.court[0].value);
            var numTwo = parseInt(data.court[1].value);
            var numThree = "";
            var numFour = "";

            var courtOne = data.court[0].court;
            var courtTwo = data.court[1].court;
            var courtThree = "";
            var courtFour = "";
        }
        else if (courtLength <= 3) {
            var numOne = parseInt(data.court[0].value);
            var numTwo = parseInt(data.court[1].value);
            var numThree = parseInt(data.court[2].value);
            var numFour = "";

            var courtOne = data.court[0].court;
            var courtTwo = data.court[1].court;
            var courtThree = data.court[2].court;
            var courtFour = "";
        }
        else if (courtLength <= 4) {
            var numOne = parseInt(data.court[0].value);
            var numTwo = parseInt(data.court[1].value);
            var numThree = parseInt(data.court[2].value);
            var numFour = parseInt(data.court[3].value);

            var courtOne = data.court[0].court;
            var courtTwo = data.court[1].court;
            var courtThree = data.court[2].court;
            var courtFour = data.court[3].court;
        }

        var series = [{
            name: 'Brands',
            colorByPoint: true,
            data: [
                {
                    name: courtOne,
                    color: "#ec6b27",
                    y: numOne
                },
                {
                    name: courtTwo,
                    color: "#f5b32b",
                    y: numTwo
                },
                {
                    name: courtThree,
                    color: "#25b38b",
                    y: numThree
                },
                {
                    name: courtFour,
                    color: "#5c69ad",
                    y: numFour
                }
            ]
        }];
        $('#container').highcharts({
            chart: {
                type: 'column',
                backgroundColor: 'rgba(255, 255, 255, 0)'
            },
            title: {
                text: ''
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                type: 'category'
            },
            yAxis: {
                title: {
                    text: '律师数'
                }
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true,
                        format: '{point.y}'
                    }
                }
            },
            tooltip: {
                headerFormat: '{point.y}',
                // 经过的显示的内容
                pointFormat: ''
            },
            // 这是动态数据,统计图的,以后要在前面angularJS获取定义变量,在这里调用.
            series: series
        });

        // 判断显示
        if (businessLength == 1) {
            var busnumOne = parseInt(data.business[0].value);
            var busnumTwo = "";
            var busnumThree = "";
            var busnumFour = "";
            var busnumFive = "";
            var busnumSix = "";
            var busnumSeven = "";

            var businessOne = data.business[0].business;
            var businessTwo = "";
            var businessThree = "";
            var businessFour = "";
            var businessFive = "";
            var businessSix = "";
            var businessSeven = "";
        }
        else if (businessLength <= 2) {
            var busnumOne = parseInt(data.business[0].value);
            var busnumTwo = parseInt(data.business[1].value);
            var busnumThree = "";
            var busnumFour = "";
            var busnumFive = "";
            var busnumSix = "";
            var busnumSeven = "";

            var businessOne = data.business[0].business;
            var businessTwo = data.business[1].business;
            var businessThree = "";
            var businessFour = "";
            var businessFive = "";
            var businessSix = "";
            var businessSeven = "";

        }
        else if (businessLength <= 3) {
            var busnumOne = parseInt(data.business[0].value);
            var busnumTwo = parseInt(data.business[1].value);
            var busnumThree = parseInt(data.business[2].value);
            var busnumFour = "";
            var busnumFive = "";
            var busnumSix = "";
            var busnumSeven = "";

            var businessOne = data.business[0].business;
            var businessTwo = data.business[1].business;
            var businessThree = data.business[2].business;
            var businessFour = "";
            var businessFive = "";
            var businessSix = "";
            var businessSeven = "";
        }
        else if (businessLength <= 4) {
            var busnumOne = parseInt(data.business[0].value);
            var busnumTwo = parseInt(data.business[1].value);
            var busnumThree = parseInt(data.business[2].value);
            var busnumFour = parseInt(data.business[3].value);
            var busnumFive = "";
            var busnumSix = "";
            var busnumSeven = "";

            var businessOne = data.business[0].business;
            var businessTwo = data.business[1].business;
            var businessThree = data.business[2].business;
            var businessFour = data.business[3].business;
            var businessFive = "";
            var businessSix = "";
            var businessSeven = "";
        }
        else if (businessLength <= 5) {
            var busnumOne = parseInt(data.business[0].value);
            var busnumTwo = parseInt(data.business[1].value);
            var busnumThree = parseInt(data.business[2].value);
            var busnumFour = parseInt(data.business[3].value);
            var busnumFive = parseInt(data.business[4].value);
            var busnumSix = "";
            var busnumSeven = "";

            var businessOne = data.business[0].business;
            var businessTwo = data.business[1].business;
            var businessThree = data.business[2].business;
            var businessFour = data.business[3].business;
            var businessFive = data.business[4].business;
            var businessSix = "";
            var businessSeven = "";
        }
        else if (businessLength <= 6) {
            var busnumOne = parseInt(data.business[0].value);
            var busnumTwo = parseInt(data.business[1].value);
            var busnumThree = parseInt(data.business[2].value);
            var busnumFour = parseInt(data.business[3].value);
            var busnumFive = parseInt(data.business[4].value);
            var busnumSix = parseInt(data.business[5].value);
            var busnumSeven = "";

            var businessOne = data.business[0].business;
            var businessTwo = data.business[1].business;
            var businessThree = data.business[2].business;
            var businessFour = data.business[3].business;
            var businessFive = data.business[4].business;
            var businessSix = data.business[5].business;
            var businessSeven = "";
        }
        else if (businessLength <= 7) {
            var busnumOne = parseInt(data.business[0].value);
            var busnumTwo = parseInt(data.business[1].value);
            var busnumThree = parseInt(data.business[2].value);
            var busnumFour = parseInt(data.business[3].value);
            var busnumFive = parseInt(data.business[4].value);
            var busnumSix = parseInt(data.business[5].value);
            var busnumSeven = parseInt(data.business[6].value);

            var businessOne = data.business[0].business;
            var businessTwo = data.business[1].business;
            var businessThree = data.business[2].business;
            var businessFour = data.business[3].business;
            var businessFive = data.business[4].business;
            var businessSix = data.business[5].business;
            var businessSeven = data.business[6].business;
        }

        // map.js中初始化了色值数组,然后stateInitColor调用数组的下标,来取数组的值.
        // 7 是没哟初始化填充色
        // 这个是加载的数据,地图是加载的china.js文件
        var series = [{
            name: 'Brands',
            colorByPoint: true,
            data: [
                {
                    name: businessOne,
                    color: "#ec6b27",
                    y: busnumOne
                },
                {
                    name: businessTwo,
                    color: "#f5b32b",
                    y: busnumTwo
                },
                {
                    name: businessThree,
                    color: "#25b38b",
                    y: busnumThree
                },
                {
                    name: businessFour,
                    color: "#5c69ad",
                    y: busnumFour
                },
                {
                    name: businessFive,
                    color: "#5c69ad",
                    y: busnumFive
                },
                {
                    name: businessSix,
                    color: "#5c69ad",
                    y: busnumSix
                },
                {
                    name: businessSeven,
                    color: "#5c69ad",
                    y: busnumSeven
                }
            ]
        }];
        // 中国地图
        var mapObj_1 = {};
        $('#RegionMap').SVGMap({
            external: mapObj_1,
            mapName: 'china',
            mapWidth: '100%',
            mapHeight: '470',
            // 使用angularJS获取的数据
            stateData: $scope.china,
            stateTipWidth: "auto",
            stateTipHeight: "auto",
            stateTipX: 2,
            stateTipY: 0,
            stateTipHtml: function (mapData, obj) {
                var _value = mapData[obj.id].value;
                var _idx = mapData[obj.id].index;
                var tipStr = '<div class="mapInfo"><span>' + obj.name + '</span><b>' + _value + '</b></div>';
                return tipStr;
            },
            // 注册单击函数,界面跳转
            clickCallback: function (mapData, obj) {
                if (obj.id == "黑龙江") {
                    obj.id = "heilongjiang";

                } else if (obj.id == "jilin") {
                    obj.id = "吉林";

                } else if (obj.id == "liaoning") {
                    obj.id = "辽宁";

                } else if (obj.id == "hebei") {
                    obj.id = "河北";

                } else if (obj.id == "shandong") {
                    obj.id = "山东";
                } else if (obj.id == "jiangsu") {
                    obj.id = "江苏";

                } else if (obj.id == "zhejiang") {
                    obj.id = "浙江";

                } else if (obj.id == "anhui") {
                    obj.id = "安徽";

                } else if (obj.id == "henan") {
                    obj.id = "河南";

                } else if (obj.id == "shanxi") {
                    obj.id = "山西";

                } else if (obj.id == "shaanxi") {
                    obj.id = "陕西";

                } else if (obj.id == "gansu") {
                    obj.id = "甘肃";

                } else if (obj.id == "hubei") {
                    obj.id = "湖北";

                } else if (obj.id == "jiangxi") {
                    obj.id = "江西";

                } else if (obj.id == "fujian") {
                    obj.id = "福建";

                } else if (obj.id == "hunan") {
                    obj.id = "湖南";

                } else if (obj.id == "guizhou") {
                    obj.id = "贵州";
                } else if (obj.id == "sichuan") {
                    obj.id = "四川";
                } else if (obj.id == "yunnan") {
                    obj.id = "云南";
                } else if (obj.id == "guizhou") {
                    obj.id = "贵州";
                } else if (obj.id == "qinghai") {
                    obj.id = "青海";
                } else if (obj.id == "guizhou") {
                    obj.id = "贵州";
                } else if (obj.id == "hainan") {
                    obj.id = "海南";
                } else if (obj.id == "shanghai") {
                    obj.id = "上海";
                } else if (obj.id == "chongqing") {
                    obj.id = "重庆";
                } else if (obj.id == "tianjin") {
                    obj.id = "天津";
                } else if (obj.id == "beijing") {
                    obj.id = "北京";
                } else if (obj.id == "ningxia") {
                    obj.id = "宁夏";
                } else if (obj.id == "neimongol") {
                    obj.id = "内蒙古";
                } else if (obj.id == "guangxi") {
                    obj.id = "广西";
                } else if (obj.id == "xinjiang") {
                    obj.id = "新疆";
                } else if (obj.id == "xizang") {
                    obj.id = "西藏";
                } else if (obj.id == "guangdong") {
                    obj.id = "广东";
                } else if (obj.id == "hongkong") {
                    obj.id = "香港";
                } else if (obj.id == "taiwan") {
                    obj.id = "台湾";
                } else if (obj.id == "macau") {
                    obj.id = "澳门";
                }
                //if (stype == 1) {
                //    window.open('../business/index.html#/all/' + obj.id);
                //}
                //else if (stype == 2) {
                //    window.open('../business/index.html#/important/' + obj.id);
                //}
                //else if (stype == 3) {
                    window.open('../business/index.html#/important/' + obj.id);
                //}

            }
        });

        // 庭级分布
        $('#container-two').highcharts({
            chart: {
                type: 'column',
                backgroundColor: 'rgba(255, 255, 255, 0)'
            },
            title: {
                text: ''
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                type: 'category'
            },
            yAxis: {
                title: {
                    text: '律师数'
                }
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true,
                        format: '{point.y}'
                    }
                }
            },
            tooltip: {
                headerFormat: '{point.y}',
                // 经过的显示的内容
                pointFormat: ''
            },
            // 这是动态数据,统计图的,以后要在前面angularJS获取定义变量,在这里调用.
            series: series
        });
    });
}
