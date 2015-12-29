var resumeApp = angular.module('resumeApp',['ui.unique']);

  
resumeApp.controller('contentController', ['$scope', '$http', function($scope, $http) {
  	$scope.name = {first:"Ben", last:"Nguyen"};
  	$scope.about = '';
	$scope.skills = [];
	$scope.projects = [];
	$scope.education = [];
	$scope.work = [];
	$scope.hobbies = [];

	$http.get('data.json').
		success(function(data, status, headers, config){
			$scope.about = data.about_me;
			$scope.skills = data.skills;
			$scope.projects = data.projects;
			$scope.education = data.education;
			$scope.work = data.work;
			$scope.hobbies = data.hobbies;
		}).
		error(function(data, status, headers, config) {

		});

	$scope.filterBySkill = function(item){
		var index = $scope.filterArr.indexOf(item);
			if(index >= 0)
				$scope.filterArr.splice(index,1);

			else{
				$scope.filterArr.push(item);
			}
		for(var i=0;i < $scope.projects.length; i++){
			for(var j=0; j< $scope.filterArr.length; j++){
				if($scope.projects[i].skills.indexOf($scope.filterArr[j]) >= 0){
					$scope.projects[i].filtered = true;
					break;
				}
				else $scope.projects[i].filtered = false;
			}
		}

		if($scope.filterArr.length <= 0){
			for(var i=0;i < $scope.projects.length; i++){
				$scope.projects[i].filtered = true;
			}
		}	
	};
}]);


// resumeApp.controller('projectsController', ['$scope', '$http', function($scope, $http) {
	
// 	$scope.p_details = null;
// 	$scope.p_skills = null;
// 	$scope.filterArr = [];

	
// 	$http.get('data.json').
// 		success(function(data, status, headers, config){
// 			$scope.projects = data;
// 			$http.get('data.json').
// 				success(function(data, status, headers, config){
// 					$scope.p_skills = data;
// 					for(var i = 0; i < $scope.projects.length; i++){
// 						var skillsArr = [];

// 						for(var j = 0; j < $scope.p_skills.length; j++)
// 							if($scope.projects[i].p_id == $scope.p_skills[j].p_id){
// 						 		skillsArr.push($scope.p_skills[j].s_name);
// 						 	}

// 						$scope.projects[i].skills = skillsArr;
// 						$scope.projects[i].filtered = true;
// 					}


// 				}).
// 				error(function(data, status, headers, config) {

// 				});
// 		}).
// 		error(function(data, status, headers, config) {

// 		});
		
// 	$http.get('data.json').
// 		success(function(data, status, headers, config){
// 			$scope.p_details = data;
// 			callback();
// 		}).
// 		error(function(data, status, headers, config) {

// 		});

  
// }]);

// resumeApp.controller('workController', ['$scope', '$http', function($scope, $http) {
// 	$scope.work = null;
// 	$scope.w_details = null;
	
// 	$http.get('data.json').
// 		success(function(data, status, headers, config){
// 			$scope.work = data;
// 		}).
// 		error(function(data, status, headers, config) {

// 		});
		
// 	$http.get('data.json', {list: "work-detail"}).
// 		success(function(data, status, headers, config){
// 			$scope.w_details = data;
// 		}).
// 		error(function(data, status, headers, config) {

// 		});
// }]);

// resumeApp.controller('educationController', ['$scope', '$http', function($scope, $http) {
// 	$scope.edu = null;
// 	$scope.e_details = null;
	
// 	$http.get('data.json').
// 		success(function(data, status, headers, config){
// 			$scope.edu = data;
// 		}).
// 		error(function(data, status, headers, config) {

// 		});
		
// 	$http.get('data.json').
// 		success(function(data, status, headers, config){
// 			$scope.e_details = data;
// 		}).
// 		error(function(data, status, headers, config) {

// 		});
// }]);

// resumeApp.controller('hobbiesController', ['$scope', '$http', function($scope, $http) {
// 	$scope.hobbies = [];
	
// 	$http.get('data.json').
// 		success(function(data, status, headers, config){
// 			$scope.hobbies = data.hobbies;
// 		}).
// 		error(function(data, status, headers, config) {

// 		});

// }]);


// resumeApp.controller('formTester', ['$scope', '$http', function($scope, $http) {
//   $scope.testData = 'TESTING';
//   $scope.submit = function(){
//   	var obj = {data : this.testData};
//   	$http.get('/post/', obj).success(function(data, status, headers, config){
//   		$scope.testData = data;
//   	});
// 	 };
// }]);


resumeApp.filter('nullToPresent', function() {
	return function(input){
		if(input == null || '') return 'Present';
		else return input;
	};
});

function catagoryFilter(item, detail, catagory){
	if(detail == catagory)
		return true;
		else return false;
}

function scrollToAnchor(aid){
    var aTag = $(aid);
    $('html,body').animate({scrollTop: aTag.offset().top - 60},'medium');
}