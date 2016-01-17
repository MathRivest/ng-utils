'use strict';

angular.module('mathrivest.angular-view-in-room', [])
	.directive('viewInRoom', function () {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				foreground: '=',
				background: '=',
			},
			template: '<div class="ViewInRoom">' + '</div>',
			controller: ['$scope', '$sce', function($scope, $sce) {
			}],
			link: function link(scope, element, attrs) {
				console.log(scope, element, attrs);
				var foreground = angular.element('<img class="ViewInRoom-foreground" src="'+scope.foreground+'">'),
					background = angular.element('<img class="ViewInRoom-background" src="'+scope.background+'">');
				element.append(background).append(foreground);
			}
		}
	});

if (typeof module !== 'undefined' && module && module.exports) {
	module.exports = 'mathrivest.angular-view-in-room';
}