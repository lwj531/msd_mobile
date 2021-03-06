angular.module("client.srv", ["http.srv"])
  .service("clientsrv", ["httpsrv", function (httpsrv) {
    //根据Id获取机构信息
    this.getins = function (id) {
      return httpsrv.service("/api/Institution/GetInstitutionInfo/" + id, {}, "get");
    };
    //获取当前人员信息
    this.getcurrentstaff = function () {
      return httpsrv.service("/api/Staff/GetCurrentStaffInfo/", {}, "get");
    };
    //获取机构人员信息
    this.getclients = function (insId) {
      return httpsrv.service("/api/Client/GetClients/" + insId, {}, "get");
    };
    //保存新增的机构人员信息
    this.saveclient = function (model) {
      return httpsrv.service("/api/Client/SaveClient/", model, "post");
    };
    //获取机构的SKU
    this.getskus = function (insId) {
      return httpsrv.service("/api/Institution/GetInstitutionSkuSort/" + insId, {}, "get");
    };
    //保存机构sku排序
    this.saveSkuSort = function (model) {
      return httpsrv.service("/api/Institution/SaveInstitutionSkuSort/", model, "post");
    };
    //更新当前机构坐标
    this.updateInsLngLat = function (insId,model) {
      return httpsrv.service("/api/Institution/UpdateInstitutionLngLat/"+insId, model, "put");
    };
    //获取门店列表
    this.getStores = function (para) {
      return httpsrv.service("/api/Institution/GetChainStore/", para, "post");
    };
  }]);
