
interface Shape {
    draw(): string;

}

abstract class Coordinates {
    x: number;
    y: number;

    constructor(x: number, y: number) {

        this.x = x;
        this.y = y;
    }

}



class Square extends Coordinates implements Shape {
    private color: string;
    private length: number;


    constructor(x: number, y: number, color: string, length: number) {
        super(x, y);
        this.color = color;
        this.length = length;


    }

    print():string {
        return `This is square, coordinates: (${this.x}, ${this.y}), color: ${this.color}, Side length: ${this.length}, area is: ${this.AreaCalculation()}sm^2, perimeter is: ${this.PerimeterCalculation()}sm`;
        ;

    }

    AreaCalculation() {
        return Math.pow(this.length, 2);
    }

    PerimeterCalculation() {
        return 4 * this.length;
    }
    draw() {
        let _draw = '';
        for (let i = 0; i < this.length; i++) {
            for (let j = 0; j < this.length; j++) {
                if (i == 0 || i == this.length - 1) {
                    _draw += '*';
                }
                else if (j == 0 || j == this.length - 1) {
                    _draw += '*';
                } else {
                    _draw += ' ';
                }
            }
            _draw += '\n';
        }
        return _draw;
    }

}



class Circle extends Coordinates {
    private color: string;
    radius: number;
    private name = 'Circle';
    constructor(x: number, y: number, color: string, radius: number) {
        super(x, y);
        this.color = color;
        this.radius = radius;
    }
    AreaCalculation() {
        return 3.14 * (this.radius * this.radius);
    }
    PerimeterCalculation() {
        return 2 * 3.14 * this.radius;
    }
    print():string {
        return `This is circle, coordinates: (${this.x}, ${this.y}), color: ${this.color}, Radius: ${this.radius}, area is: ${this.AreaCalculation()}sm^2, perimeter is: ${this.PerimeterCalculation()}sm`;
        

    }

}

class Rectangle extends Coordinates implements Shape {
    private color: string;
    private length: number;
    private height: number;
    private name = 'Rectangle';

    constructor(x: number, y: number, color: string, length: number, height: number) {
        super(x, y);
        this.color = color;
        this.length = length;
        this.height = height;
    }

    AreaCalculation() {
        return Math.pow(this.length, this.height);
    }
    PerimeterCalculation() {
        return 2 * (this.length + this.height);
    }
    print():string {
        return `This is rectangle, coordinates: (${this.x}, ${this.y}), color: ${this.color}, length: ${this.length}, Height: ${this.height}, area is: ${this.AreaCalculation()}sm^2, perimeter is: ${this.PerimeterCalculation()}sm`;

    }
    draw() {
        let _draw = '';
        for (let i = 0; i < this.length; i++) {
            for (let j = 0; j < this.height; j++) {
                if (i == 0 || i == this.length - 1) {
                    _draw += '*';
                }
                else if (j == 0 || j == this.height - 1) {
                    _draw += '*';
                } else {
                    _draw += ' ';
                }
            }
            _draw += '\n';
        }
        return _draw;
    }
}


class Tester {
    driving(shape:Shape){
        return shape.draw();
        }
    
    public test(): void {
        var random = Math.ceil(Math.random() * 3);
        console.log(random);
        switch (random) {
            case 1:
                var circle = new Circle(3, 4, 'blue', 5);
                console.log(circle.print() + `, diameter is: ${circle.radius * 2}`);
                
                break;
            case 2:
                    var square = new Square(5, 5, 'Red', 4);
                    console.log(square.print());
                    console.log(this.driving(square));
                break;
            case 3:
                    var rectangle = new Rectangle(6, 7, 'Black', 6, 8);
                    console.log(rectangle.print());
                    console.log(this.driving(rectangle));
                break;
            default:
                break;
        }
    }
}

var test = new Tester();
test.test();

