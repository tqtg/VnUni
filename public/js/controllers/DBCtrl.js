angular.module('DBCtrl', []).controller('DBController', function($scope) {	
	$scope.so_khoa = 0;
	$scope.ds_khoa = [];
	$scope.them_khoa = function(){		
		$scope.so_khoa += 1;
		$scope.ds_khoa.push({"id": $scope.so_khoa, "ten_khoa": "không có", "mo_ta": " không có", "diem_chuan": 24, "so_nganh": 0,
			"ds_nganh":[]});
	}
	$scope.xoa_khoa = function(){		
		if ($scope.so_khoa > 0){
			$scope.so_khoa -=1;
			$scope.ds_khoa.pop();			
		} 
	}	
	$scope.tang_nganh = function(khoa_id){		
		$scope.ds_khoa[khoa_id-1].so_nganh += 1;
		$scope.ds_khoa[khoa_id-1].ds_nganh.push({"ma_nganh": "none", "ten_nganh": "none", "diem_chuan": 0});
	}
	$scope.giam_nganh = function(khoa_id){
		if ($scope.ds_khoa[khoa_id-1].so_nganh >0 ){
			$scope.ds_khoa[khoa_id-1].so_nganh -= 1;
			$scope.ds_khoa[khoa_id-1].ds_nganh.pop();
		}				
	}

});
