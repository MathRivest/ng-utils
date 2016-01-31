'use strict';

angular.module('mathrivest.angular-view-in-room', [])
	.directive('viewInRoom', function ($timeout, $window) {
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
				'<img class="ViewInRoom-background" src="{{background}}">' +
				'<img class="ViewInRoom-foreground" src="{{foreground}}">' +
			'</div>',
			controller: ['$scope', '$sce', function($scope) {
				$scope.move = function(x, y){
					$scope.x = x;
					$scope.y = y;
				};
				$scope.move(10, 10);
			}],
			link: function link(scope, element, attrs) {
				var bg = element.find('img')[0],
					fg = element.find('img')[1];

				var resize = function () {
					var finalWidth = (fg.naturalWidth * bg.clientWidth) / bg.naturalWidth,
						finalHeight = (fg.naturalHeight * bg.clientHeight) / bg.naturalHeight,
						finalLeft = (scope.x * bg.clientWidth) / bg.naturalWidth,
						finalTop = (scope.y * bg.clientHeight) / bg.naturalHeight;

					fg.style.width = finalWidth + 'px';
					fg.style.height = finalHeight + 'px';
					fg.style.left = finalLeft + 'px';
					fg.style.top = finalTop + 'px';
				};

				// Wait for images to load
				bg.onload = function() {
					resize();
				};

				// Resize event performance
				var wait;
				angular.element($window).bind('resize', function() {
					clearTimeout(wait);
					wait = setTimeout(resize, 0);
				})
			}
		}
	});

if (typeof module !== 'undefined' && module && module.exports) {
	module.exports = 'mathrivest.angular-view-in-room';
}