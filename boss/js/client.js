var myapp = angular.module("myapp", ["ngRoute"]);
// 选中
function myRoute($routeProvider) {
    $routeProvider
        .when("/", {
            controller: worldCtrl,
            templateUrl: "clientWorld.html"
        })
        .when("/CN", {
            controller: chinaCtrl,
            templateUrl: "CN.html"
        })
        .otherwise({
            redirectTo: "/"
        })
}
myapp.config(myRoute);

// 这是世界地图的控制器
function worldCtrl($scope, $http) {
    $http.get(url+"boss/client").success(function (data) {
        $scope.world = data.world;
        $scope.china = data.china;
        $scope.total = data.total;
        $scope.industry = data.industry;
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
        
        // 行业统计

        var slength = data.industry.length;
        // 如果取得值为0,那么就显示其他
        for(var i = 0; i < slength; i++) {
            if(data.industry[i].industry == "0") {
                data.industry[i].industry = "其他";
            }
        }
        if(slength ==1) {
            var snum1 = parseInt(data.industry[0].value);
            var snum2 = "";
            var snum3 = "";
            var snum4 = "";
            var snum5 = "";
            var snum6 = "";
            var snum7 = "";

            var sname1 = data.industry[0].industry;
            var sname2 = "";
            var sname3 = "";
            var sname4 = "";
            var sname5 = "";
            var sname6 = "";
            var sname7 = "";
        }
        else if(slength <=2) {
            var snum1 = parseInt(data.industry[0].value);
            var snum2 = parseInt(data.industry[1].value);
            var snum3 = "";
            var snum4 = "";
            var snum5 = "";
            var snum6 = "";
            var snum7 = "";

            var sname1 = data.industry[0].industry;
            var sname2 = data.industry[1].industry;
            var sname3 = "";
            var sname4 = "";
            var sname5 = "";
            var sname6 = "";
            var sname7 = "";
        }
        else if(slength <=3) {
            var snum1 = parseInt(data.industry[0].value);
            var snum2 = parseInt(data.industry[1].value);
            var snum3 = parseInt(data.industry[2].value);
            var snum4 = "";
            var snum5 = "";
            var snum6 = "";
            var snum7 = "";

            var sname1 = data.industry[0].industry;
            var sname2 = data.industry[1].industry;
            var sname3 = data.industry[2].industry;
            var sname4 = "";
            var sname5 = "";
            var sname6 = "";
            var sname7 = "";
        }
        else if(slength <=4) {
            var snum1 = parseInt(data.industry[0].value);
            var snum2 = parseInt(data.industry[1].value);
            var snum3 = parseInt(data.industry[2].value);
            var snum4 = parseInt(data.industry[3].value);
            var snum5 = "";
            var snum6 = "";
            var snum7 = "";

            var sname1 = data.industry[0].industry;
            var sname2 = data.industry[1].industry;
            var sname3 = data.industry[2].industry;
            var sname4 = data.industry[3].industry;
            var sname5 = "";
            var sname6 = "";
            var sname7 = "";
        }
        else if(slength <=5) {
            var snum1 = parseInt(data.industry[0].value);
            var snum2 = parseInt(data.industry[1].value);
            var snum3 = parseInt(data.industry[2].value);
            var snum4 = parseInt(data.industry[3].value);
            var snum5 = parseInt(data.industry[4].value);
            var snum6 = "";
            var snum7 = "";

            var sname1 = data.industry[0].industry;
            var sname2 = data.industry[1].industry;
            var sname3 = data.industry[2].industry;
            var sname4 = data.industry[3].industry;
            var sname5 = data.industry[4].industry;
            var sname6 = "";
            var sname7 = "";
        }
        else if(slength <=6) {
            var snum1 = parseInt(data.industry[0].value);
            var snum2 = parseInt(data.industry[1].value);
            var snum3 = parseInt(data.industry[2].value);
            var snum4 = parseInt(data.industry[3].value);
            var snum5 = parseInt(data.industry[4].value);
            var snum6 = parseInt(data.industry[5].value);
            var snum7 = "";

            var sname1 = data.industry[0].industry;
            var sname2 = data.industry[1].industry;
            var sname3 = data.industry[2].industry;
            var sname4 = data.industry[3].industry;
            var sname5 = data.industry[4].industry;
            var sname6 = data.industry[5].industry;
            var sname7 = "";
        }
        else if(slength <=7) {
            var snum1 = parseInt(data.industry[0].value);
            var snum2 = parseInt(data.industry[1].value);
            var snum3 = parseInt(data.industry[2].value);
            var snum4 = parseInt(data.industry[3].value);
            var snum5 = parseInt(data.industry[4].value);
            var snum6 = parseInt(data.industry[5].value);
            var snum7 = parseInt(data.industry[6].value);

            var sname1 = data.industry[0].industry;
            var sname2 = data.industry[1].industry;
            var sname3 = data.industry[2].industry;
            var sname4 = data.industry[3].industry;
            var sname5 = data.industry[4].industry;
            var sname6 = data.industry[5].industry;
            var sname7 = data.industry[6].industry;
        }
        var series = [{
            name: 'Brands',
            colorByPoint: true,
            data: [
                {
                    name: sname1,
                    color: "#ec6b27",
                    y: snum1
                },
                {
                    name: sname2,
                    color: "#f5b32b",
                    y: snum2
                },
                {
                    name: sname3,
                    color: "#25b38b",
                    y: snum3
                },
                {
                    name: sname4,
                    color: "#5c69ad",
                    y: snum4
                },
                {
                    name: sname5,
                    color: "#5c69ad",
                    y: snum5
                },
                {
                    name: sname6,
                    color: "#5c69ad",
                    y: snum6
                },
                {
                    name: sname7,
                    color: "#5c69ad",
                    y: snum7
                }
            ]
        }];
        $('#container-2').highcharts({
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
                    text: '客户数'
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

// 中国地图
function chinaCtrl($scope, $http) {
    $http.get(url+"boss/client").success(function (data) {
        $scope.china = data.china;
        $scope.zw = data.zw;
        $scope.total = data.total;
        console.log(data);
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
                window.open('../market/index.html#/all/' + obj.id);
            }

        });
    });
}

// 行业统计
myapp.controller("clientLast", function($scope, $http) {
    $http.get(url+"boss/client").success(function (data) {
        $scope.world = data.world;
        $scope.china = data.china;
        $scope.total = data.total;
        $scope.industry = data.industry;
        console.log(data);

        var slength = data.industry.length;
        // 如果取得值为0,那么就显示其他
        for(var i = 0; i < slength; i++) {
            if(data.industry[i].industry == "0") {
                data.industry[i].industry = "其他";
            }
        }
        if(slength ==1) {
            var snum1 = parseInt(data.industry[0].value);
            var snum2 = "";
            var snum3 = "";
            var snum4 = "";
            var snum5 = "";
            var snum6 = "";
            var snum7 = "";

            var sname1 = data.industry[0].industry;
            var sname2 = "";
            var sname3 = "";
            var sname4 = "";
            var sname5 = "";
            var sname6 = "";
            var sname7 = "";
        }
        else if(slength <=2) {
            var snum1 = parseInt(data.industry[0].value);
            var snum2 = parseInt(data.industry[1].value);
            var snum3 = "";
            var snum4 = "";
            var snum5 = "";
            var snum6 = "";
            var snum7 = "";

            var sname1 = data.industry[0].industry;
            var sname2 = data.industry[1].industry;
            var sname3 = "";
            var sname4 = "";
            var sname5 = "";
            var sname6 = "";
            var sname7 = "";
        }
        else if(slength <=3) {
            var snum1 = parseInt(data.industry[0].value);
            var snum2 = parseInt(data.industry[1].value);
            var snum3 = parseInt(data.industry[2].value);
            var snum4 = "";
            var snum5 = "";
            var snum6 = "";
            var snum7 = "";

            var sname1 = data.industry[0].industry;
            var sname2 = data.industry[1].industry;
            var sname3 = data.industry[2].industry;
            var sname4 = "";
            var sname5 = "";
            var sname6 = "";
            var sname7 = "";
        }
        else if(slength <=4) {
            var snum1 = parseInt(data.industry[0].value);
            var snum2 = parseInt(data.industry[1].value);
            var snum3 = parseInt(data.industry[2].value);
            var snum4 = parseInt(data.industry[3].value);
            var snum5 = "";
            var snum6 = "";
            var snum7 = "";

            var sname1 = data.industry[0].industry;
            var sname2 = data.industry[1].industry;
            var sname3 = data.industry[2].industry;
            var sname4 = data.industry[3].industry;
            var sname5 = "";
            var sname6 = "";
            var sname7 = "";
        }
        else if(slength <=5) {
            var snum1 = parseInt(data.industry[0].value);
            var snum2 = parseInt(data.industry[1].value);
            var snum3 = parseInt(data.industry[2].value);
            var snum4 = parseInt(data.industry[3].value);
            var snum5 = parseInt(data.industry[4].value);
            var snum6 = "";
            var snum7 = "";

            var sname1 = data.industry[0].industry;
            var sname2 = data.industry[1].industry;
            var sname3 = data.industry[2].industry;
            var sname4 = data.industry[3].industry;
            var sname5 = data.industry[4].industry;
            var sname6 = "";
            var sname7 = "";
        }
        else if(slength <=6) {
            var snum1 = parseInt(data.industry[0].value);
            var snum2 = parseInt(data.industry[1].value);
            var snum3 = parseInt(data.industry[2].value);
            var snum4 = parseInt(data.industry[3].value);
            var snum5 = parseInt(data.industry[4].value);
            var snum6 = parseInt(data.industry[5].value);
            var snum7 = "";

            var sname1 = data.industry[0].industry;
            var sname2 = data.industry[1].industry;
            var sname3 = data.industry[2].industry;
            var sname4 = data.industry[3].industry;
            var sname5 = data.industry[4].industry;
            var sname6 = data.industry[5].industry;
            var sname7 = "";
        }
        else if(slength <=7) {
            var snum1 = parseInt(data.industry[0].value);
            var snum2 = parseInt(data.industry[1].value);
            var snum3 = parseInt(data.industry[2].value);
            var snum4 = parseInt(data.industry[3].value);
            var snum5 = parseInt(data.industry[4].value);
            var snum6 = parseInt(data.industry[5].value);
            var snum7 = parseInt(data.industry[6].value);

            var sname1 = data.industry[0].industry;
            var sname2 = data.industry[1].industry;
            var sname3 = data.industry[2].industry;
            var sname4 = data.industry[3].industry;
            var sname5 = data.industry[4].industry;
            var sname6 = data.industry[5].industry;
            var sname7 = data.industry[6].industry;
        }
        var series = [{
            name: 'Brands',
            colorByPoint: true,
            data: [
                {
                    name: sname1,
                    color: "#ec6b27",
                    y: snum1
                },
                {
                    name: sname2,
                    color: "#f5b32b",
                    y: snum2
                },
                {
                    name: sname3,
                    color: "#25b38b",
                    y: snum3
                },
                {
                    name: sname4,
                    color: "#5c69ad",
                    y: snum4
                },
                {
                    name: sname5,
                    color: "#5c69ad",
                    y: snum5
                },
                {
                    name: sname6,
                    color: "#5c69ad",
                    y: snum6
                },
                {
                    name: sname7,
                    color: "#5c69ad",
                    y: snum7
                }
            ]
        }];
        $('#container-2').highcharts({
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
                    text: '客户数'
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
});