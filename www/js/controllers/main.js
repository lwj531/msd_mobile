angular.module('main.ctrl', [])
  .controller('MainCtrl', function ($scope, $state, $ionicModal, $ionicPlatform, $ionicHistory, $ionicPopup, $timeout) {
    //模拟菜单数据
    $scope.menus = [
      {
        name: " 首页",
        iconName: "home",
        state: "main.home"
      },
      {
        name: " 日程管理",
        iconName: "dailymgt",
        state: "main.dailymgt"
      },
      {
        name: "辅导下属",
        iconName: "coaching",
        state: "main.xx"
      },
      {
        name: "拜访向导",
        iconName: "callguide",
        state: "main.callguide"
      },
      {
        name: "路线设定",
        iconName: "routesetting",
        state: "main.routesetting"
      },
      {
        name: " 客户管理",
        iconName: "dailymgt",
        state: "main.xx"
      },
      {
        name: " 附近药店",
        iconName: "dailymgt",
        state: "main.xx"
      },
      {
        name: "辅导记录",
        iconName: "guidance",
        state: "main.xx"
      },
      {
        name: " 学习资料库",
        iconName: "db",
        state: "main.xx"
      }];
    $scope.currentstate = $state;

    //清空缓存
    $scope.clear = function () {
      localStorage.clear();
      alert("localStorage.clear");
    };
    //手势密码Model
    $ionicModal.fromTemplateUrl('templates/modal/gesture.html', {
      scope: $scope,
      animation: 'slide-in-up',
      hardwareBackButtonClose: false
    }).then(function (modal) {
      $scope.modal = modal;
    });
    //已存放的手势密码
    if (localStorage.cipher == null) {
      $scope.cipherinfo = "请设置手势密码";
    } else {
      $scope.cipherinfo = "手势密码登陆";
    }
    //设置手势密码
    $scope.settingcipher = function (str) {
      //判断当前临时密码位数
      if (str == null || str.length < 4) {
        $scope.cipherinfo = "密码位数至少4位数";
        $scope.lock.error();
        $timeout(function () {
          $scope.lock.reset();
        }, 1000);
      } else {
        ////如果已经设置了密码判断是否可以正常登陆
        if (localStorage.cipher != null) {
          if (localStorage.cipher == str) {
            //通过验证关闭modal
            $scope.cipherinfo = "手势密码登陆";
            $scope.modal.hide();
          } else {
            $scope.cipherinfo = "密码错误";
            $scope.lock.error();
            $timeout(function () {
              $scope.lock.reset();
            }, 1000);
          }
        } else {
          //临时存放的手势
          if ($scope.currentcipher == null) {
            $scope.currentcipher = str;
            $scope.cipherinfo = "请再次绘制密码";
            $scope.lock.reset();
          } else {
            if (str == $scope.currentcipher) {
              localStorage.cipher = str;
              //通过验证关闭modal
              $scope.cipherinfo = "手势密码登陆";
              $scope.modal.hide();
            } else {
              //两次密码不正确
              $scope.cipherinfo = "两次密码不正确";
              $scope.lock.error();
              $timeout(function () {
                $scope.lock.reset();
              }, 1000);
            }
          }
        }
      }
      $scope.$apply();
    }

    //在被挂起的应用转到前台时触发(触发手势密码界面)
    $ionicPlatform.on("resume", function (event) {
      if ($scope.currentstate.current.name != "app") {
        $scope.modal.show();
        $scope.lock = new PatternLock('#patternHolder', {
          onDraw: function (pattern) {
            $scope.settingcipher(pattern);
          },
          lineOnMove: false
        });
      }
    });
    //拦截返回按钮
    var deregister = $ionicPlatform.registerBackButtonAction(
      function () {
        if ($ionicHistory.backView()) {
          $scope.modal.remove();
          $ionicHistory.goBack();
        } else {
          $scope.quit();
        }
      }, 100
    );
    //提示是否确定退出程序
    $scope.quit = function () {
      $ionicPopup.confirm({
        title: '提示',
        template: '是否确定退出程序'
      }).then(function (res) {
        if (res) {
          ionic.Platform.exitApp();
        } else {

        }
      });
    }

    //Then when this scope is destroyed, remove the function
    $scope.$on('$destroy', deregister)

  });
