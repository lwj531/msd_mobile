angular.module("http.srv", [])
  .service("httpsrv", [
    "$http", "$q","$ionicLoading", function ($http, $q,$ionicLoading) {
      this.service = function(url,data,method,showloading){
        if(showloading || showloading==null){
          //显示菊花
          $ionicLoading.show({
            template: '加载中...'
          });
        }
        var deferred = $q.defer();
        $http({
          method: method,
            url: "http://dev.crmatmobile.com:9151/"+ url,
           //url: "http://10.0.0.81:9151"+ url,
          data: data
        }).success(function (data) {
          deferred.resolve(data);
          $ionicLoading.hide();
        }).error(function (data) {
          deferred.reject(data);
          $ionicLoading.hide();
        });
        return deferred.promise;
      };
    }
  ]);
