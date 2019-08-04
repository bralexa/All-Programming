var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Coordinates = /** @class */ (function () {
    function Coordinates(x, y) {
        this.x = x;
        this.y = y;
    }
    return Coordinates;
}());
var Square = /** @class */ (function (_super) {
    __extends(Square, _super);
    function Square(x, y, color, length) {
        var _this = _super.call(this, x, y) || this;
        _this.color = color;
        _this.length = length;
        return _this;
    }
    Square.prototype.print = function () {
        console.log("This is square, coordinates: (" + this.x + ", " + this.y + "), color: " + this.color + ", Side length: " + this.length + ", area is: " + this.AreaCalculation() + "sm^2, perimeter is: " + this.PerimeterCalculation() + "sm");
        ;
    };
    Square.prototype.AreaCalculation = function () {
        return Math.pow(this.length, 2);
    };
    Square.prototype.PerimeterCalculation = function () {
        return 4 * this.length;
    };
    Square.prototype.draw = function () {
        var _draw = '';
        for (var i = 0; i < this.length; i++) {
            for (var j = 0; j < this.length; j++) {
                if (i == 0 || i == this.length - 1) {
                    _draw += '*';
                }
                else if (j == 0 || j == this.length - 1) {
                    _draw += '*';
                }
                else {
                    _draw += ' ';
                }
            }
            _draw += '\n';
        }
        return _draw;
    };
    return Square;
}(Coordinates));
var Circle = /** @class */ (function (_super) {
    __extends(Circle, _super);
    function Circle(x, y, color, radius) {
        var _this = _super.call(this, x, y) || this;
        _this.name = 'Circle';
        _this.color = color;
        _this.radius = radius;
        return _this;
    }
    Circle.prototype.AreaCalculation = function () {
        return 3.14 * (this.radius * this.radius);
    };
    Circle.prototype.PerimeterCalculation = function () {
        return 2 * 3.14 * this.radius;
    };
    Circle.prototype.print = function () {
        return "This is circle, coordinates: (" + this.x + ", " + this.y + "), color: " + this.color + ", Radius: " + this.radius + ", area is: " + this.AreaCalculation() + "sm^2, perimeter is: " + this.PerimeterCalculation() + "sm";
    };
    return Circle;
}(Coordinates));
var Rectangle = /** @class */ (function (_super) {
    __extends(Rectangle, _super);
    function Rectangle(x, y, color, length, height) {
        var _this = _super.call(this, x, y) || this;
        _this.name = 'Rectangle';
        _this.color = color;
        _this.length = length;
        _this.height = height;
        return _this;
    }
    Rectangle.prototype.AreaCalculation = function () {
        return Math.pow(this.length, this.height);
    };
    Rectangle.prototype.PerimeterCalculation = function () {
        return 2 * (this.length + this.height);
    };
    Rectangle.prototype.print = function () {
        console.log("This is rectangle, coordinates: (" + this.x + ", " + this.y + "), color: " + this.color + ", length: " + this.length + ", Height: " + this.height + ", area is: " + this.AreaCalculation() + "sm^2, perimeter is: " + this.PerimeterCalculation() + "sm");
    };
    Rectangle.prototype.draw = function () {
        var _draw = '';
        for (var i = 0; i < this.length; i++) {
            for (var j = 0; j < this.height; j++) {
                if (i == 0 || i == this.length - 1) {
                    _draw += '*';
                }
                else if (j == 0 || j == this.height - 1) {
                    _draw += '*';
                }
                else {
                    _draw += ' ';
                }
            }
            _draw += '\n';
        }
        return _draw;
    };
    return Rectangle;
}(Coordinates));
var Tester = /** @class */ (function () {
    function Tester() {
    }
    Tester.prototype.driving = function (shape) {
        return shape.draw();
    };
    Tester.prototype.test = function () {
        var random = Math.ceil(Math.random() * 3);
        console.log(random);
        switch (random) {
            case 1:
                var circle = new Circle(3, 4, 'blue', 5);
                console.log(circle.print() + (", diameter is: " + circle.radius * 2));
                break;
            case 2:
                var square = new Square(5, 5, 'Red', 4);
                square.print();
                console.log(this.driving(square));
                break;
            case 3:
                var rectangle = new Rectangle(6, 7, 'Black', 6, 8);
                rectangle.print();
                console.log(this.driving(rectangle));
                break;
            default:
                break;
        }
    };
    return Tester;
}());
var test = new Tester();
test.test();
