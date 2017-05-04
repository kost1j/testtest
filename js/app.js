(function(){
	var app = angular.module("store",[]);
	app.factory('httpq', function($http, $q){
		return{
			get: function(){
				var deffered = $q.defer();
				$http.get.apply(null, arguments)
					.then(deffered.resolve)
					.catch(deffered.resolve);
				return deffered.promise;
			}
		}
	});
	/*Объявление контроллера*/
	app.controller("StoreController", function(httpq, $scope){
		var store = this;
		store.loadCost = 0; 
		store.costTarget = 15;
 		/*------------------------------Загрузка данных с сервера------------------------*/
		this.loadData = function(url){
			httpq.get(url)
				.then(function(data){
					console.log(data.data);
					store.loadCost = data.data["balance_usd"];
					store.moveIndicator(store.loadCost);
				})
				.catch(function(){
						alert("Произошла ошибка загрузки данных с сервера.\nПожалуйста не паникуйте и попробуйте перезагрузить приложние.")
					}
				);
		};
		this.moveIndicator = function(data){
			var widthBlock = parseInt($(".indicator-block__state-line-wrapper").css('width'));
			var stateCost = parseInt($(".indicator-block__state-cost").css('left'));
			var stateCostPosition = 0;
			var widthIndicator = 0;
			var costIndicator = 0;
			var shift = setInterval(function(){
					if((costIndicator + 0.2) <= data){
						// console.log("Привет " + costIndicator);
						
						 costIndicator= costIndicator + 0.2;
						 costIndicator=+parseFloat(costIndicator).toFixed(1);
						 costIndicator=((costIndicator-Math.round(costIndicator))==0)?Math.floor(costIndicator):costIndicator;
						 widthIndicator = costIndicator*100/store.costTarget;
						 stateCostPosition = costIndicator*(widthBlock-10)/store.costTarget + stateCost;
						 $(".indicator-block__state-line").css('width', widthIndicator +'%');
						 $(".indicator-block__state-cost").css('left', stateCostPosition);
					     $(".indicator-block__state-cost-text").html("$"+costIndicator);
				 	}else{
						if(store.costTarget <= costIndicator){
							 $(".indicator-block__target").css('background', '#00A910');
						}else{
							 $(".massage-block").css('display', 'block');
						}
						clearInterval(shift)
					}
					
			},2000);
	
		};
		this.loadData("http://alex.devel.softservice.org/testapi/");/*<---вызываем загрузку*/
	});

})();      