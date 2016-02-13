# Angular Carousel

## Features

* Image slides
* HTML slides (for custom directives like View in a Room)
* Thumbnails
* Next and previous buttons
* Swipe to navigate
* Responsive

## How to use

```html
<carousel carousel-items="items"></carousel>
```

```javascript
angular.module('ExampleApp', ['mathrivest.angular-carousel']).controller('MainCtrl', function ($scope) {

    $scope.items = [
        {
            title: 'Item 1',
            image: 'images/abstract-1.jpg'
        },
        {
            title: 'Item 2',
            image: 'images/abstract-2.jpg'
        },
        {
            title: 'Item 3',
            image: 'images/abstract-3.jpg'
        },
        {
         image: 'images/demo-room-2.jpg',
         html: '<h1>Html slide example</h1>'
        },
    ];

});
```

# Angular View in a Room

Provided foreground and background assets, the View in a Room directive will display the images over each others, calculate the positions and keep the ratios correct. The position is based off the natural sizes of the images.

When the display is resized (when on a mobile device, tablet etc) the ratios will be kept and the position will adjust accordingly.

## Features

* Responsive
* Keeps proportions when resized
* Fullscreen mode (Not ready yet)

## How to use

```html
<view-in-room background="{{room.background}}"
    foreground="{{room.foreground}}"
    x="{{room.position.x}}"
    y="{{room.position.y}}"></view-in-room>
```
```javascript
angular.module('ExampleApp', ['mathrivest.angular-view-in-room']).controller('MainCtrl', function ($scope) {

    $scope.room = {
        foreground: 'images/demo-art-2.jpg',
        background: 'images/demo-room-2.jpg',
        position: {
            x: 200,
            y: 12
        }
    };

});
```