'use strict';

angular.module('mathrivest.angular-carousel', ['ngTouch'])
    .directive('bindHtmlCompile', ['$compile', function ($compile) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                scope.$watch(function () {
                    return scope.$eval(attrs.bindHtmlCompile);
                }, function (value) {
                    element.html(value);
                    $compile(element.contents())(scope);
                });
            }
        };
    }])
    .directive('carousel', function ($compile) {
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
                        console.log('controller');
                        $compile(value.safeHtml)($scope);
                    }
                });

                function goToItem(index) {
                    if(index <= $scope.carousel.items.length - 1 && index >= 0) {
                        $scope.carousel.isNonConsecutive = true;
                        if($scope.carousel.activeSlide == index + 1 || $scope.carousel.activeSlide == index - 1){
                            $scope.carousel.isNonConsecutive = false;
                        }
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
                    isNonConsecutive: false,
                    activeSlide: 0,
                    isFirst: true,
                    isLast: false,
                    goToItem: goToItem,
                    previous: previous,
                    next: next
                }
            }],
            link: function link(scope, element, attrs) {
                $compile(element.contents())(scope);
            }
        }
    });

if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = 'mathrivest.angular-carousel';
}