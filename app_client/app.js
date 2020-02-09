var app = angular.module('orderManagement', ["ui.router", 'ui.bootstrap']);
var gdata = [];
// define route configurations inside app.config 
// injecting dependencies 
app.config(function ($stateProvider, $locationProvider,
    $urlRouterProvider) {
    // creating routes or states 
    $stateProvider
        .state('Order', {
            url: '/order',
            templateUrl: "view/order.html",
            controller: "orderListCtrl"
        })
        .state('AddOrder', {
            url: '/addOrder',
            templateUrl: "view/addOrder.html",

        })
    // Redirect to home page if url does not  
    // matches any of the three mentioned above 
    $urlRouterProvider.otherwise("/order");
});

var orderListCtrl = function ($scope, orderManageService) {
    $scope.data = { order: orderManageService };
    $scope.Delete = function(id) {
        console.log("delete "+ id);
        gdata.splice (id, id);
    }
    $scope.Edit = function(){
        console.log("edit is working fine");
    }
};

var orderManageService = function () {
    return gdata;
};

var postOrderCtrl = function ($scope) {

    $scope.submit = function () {
        var length = gdata.length + 1;
        var date = new Date(this.orderDueDate);
        var data = {
            "orderNumber": length,
            "orderDueDate": date,
            "customerBuyerName": this.customerBuyerName,
            "customerAddress": this.customerAddress,
            "customerPhone": this.customerPhone,
            "orderTotal": this.orderTotal,
        };
        gdata.push(data);
        console.log(gdata);
    }
};

var ModalCtrl = function($uibModal, $log){
    var pc = this;
  pc.data = "Lorem Name Test"; 

  pc.open = function (size) {
      
    var modalInstance = $uibModal.open({
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: "view/myModalContent.html",
      controller: 'ModalInstanceCtrl',
      controllerAs: 'pc',
      size: size,
      resolve: {
        data: function () {
          return pc.data;
        }
      }
    });

    modalInstance.result
    .then(function () {alert("now I'll close the modal"); })
    .catch(function(res) { if (!(res === 'cancel' || res === 'escape key press')) { throw res; }
                            });

  };
}

var ModalInstanceCtrl = function($uibModalInstance, data){
    var pc = this;
    pc.data = data;
    
    pc.ok = function () {
      //{...}
      alert("You clicked the ok button."); 
      $uibModalInstance.close();
    };
  
    pc.cancel = function () {
      //{...}
      alert("You clicked the cancel button."); 
      $uibModalInstance.dismiss('cancel');
}
}

angular
    .module('orderManagement')
    .controller('orderListCtrl', orderListCtrl)
    .controller('postOrderCtrl', postOrderCtrl)
    .controller('ModalCtrl', ModalCtrl)
    .controller('ModalInstanceCtrl', ModalInstanceCtrl)
    .service('orderManageService', orderManageService)
    