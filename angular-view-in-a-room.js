'use strict';

angular.module('mathrivest.angular-view-in-room', [])
	.directive('viewInRoom', function () {
		return {
			restrict: 'E',
			scope: {
				foreground: '@',
				background: '@',
				x: '@',
				y: '@'
			},
			replace: true,
			template: '<div class="ViewInRoom">' +
				'<img class="ViewInRoom-foreground" src="{{foreground}}" style="left: {{x}}px; top: {{y}}px">' +
				'<img class="ViewInRoom-background" src="{{background}}">' +
			'</div>',
			controller: ['$scope', '$sce', function($scope) {
				$scope.move = function(x, y){
					$scope.x = x;
					$scope.y = y;
				};
				$scope.move(10, 10);
			}],
			link: function link(scope, element, attrs) {
				
			}
		}
	});

if (typeof module !== 'undefined' && module && module.exports) {
	module.exports = 'mathrivest.angular-view-in-room';
}