'use strict';

angular.module('mathrivest.angular-carousel', ['ngTouch'])
	.directive('carousel', function () {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				carouselItems: '=',
			},
			templateUrl: 'angular-carousel.tpl.html',
			controller: ['$scope', '$sce', function($scope, $sce) {
				// Sanitizing content
				angular.forEach($scope.carouselItems, function(value, key){
					if(value.html) {
						value.safeHtml = $sce.trustAsHtml(value.html);
					}
				});

				function goToItem(index) {
					if(index <= $scope.carousel.items.length - 1 && index >= 0) {
						$scope.carousel.activeSlide = index;
					}
					$scope.carousel.isFirst = $scope.carousel.activeSlide == 0 ? true : false;
					$scope.carousel.isLast = $scope.carousel.activeSlide == $scope.carousel.items.length - 1 ? true : false;
				}

				function previous() {
					goToItem($scope.carousel.activeSlide - 1);
				}

				function next() {
					goToItem($scope.carousel.activeSlide + 1);
				}

				$scope.carousel = {
					items: $scope.carouselItems,
					activeSlide: 0,
					isFirst: true,
					isLast: false,
					goToItem: goToItem,
					previous: previous,
					next: next
				}
			}],
			link: function(scope, element) {
				// need to compile other directives
			}
		}
	});

if (typeof module !== 'undefined' && module && module.exports) {
	module.exports = 'mathrivest.angular-carousel';
}