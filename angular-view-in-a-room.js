'use strict';

angular.module('mathrivest.angular-view-in-room', [])
	.directive('viewInRoom', function ($timeout, $window, $compile) {
		return {
			restrict: 'E',
			scope: {
				foreground: '@',
				background: '@',
				x: '@',
				y: '@'
			},
			replace: true,
			transclude: true,
			template: '<div class="ViewInRoom">' +
				'<img class="ViewInRoom-background" src="{{background}}">' +
				'<img class="ViewInRoom-foreground" src="{{foreground}}">' +
			'</div>',
			controller: function($scope, $element){
				var fsElement = null,
					elInitialContainer = $element.parent();

				$scope.toggleFs = function() {
					if(fsElement){
						fsElement.removeClass('is-fullscreen');
						elInitialContainer.append(fsElement)
						fsElement = null;
					}else{
						fsElement = $element;
						fsElement.addClass('is-fullscreen');
						angular.element(document.body).append(fsElement);
					}
				};
			},
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

				var initFs = function() {
					var fsButton = angular.element('<button class="ViewInRoom-fullscreenBtn">Toggle Fullscreen</button>');
					fsButton.bind('click', function(){
						scope.toggleFs();
					});
					element.append(fsButton);
				};

				// Wait for images to load
				bg.onload = function() {
					resize();
					initFs();
				};

				// Resize event performance
				var wait;
				angular.element($window).bind('resize', function() {
					clearTimeout(wait);
					wait = setTimeout(resize, 0);
				});
			}
		}
	});

if (typeof module !== 'undefined' && module && module.exports) {
	module.exports = 'mathrivest.angular-view-in-room';
}