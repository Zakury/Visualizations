class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(vector) {
        return new Vector2(this.x + vector.x, this.y + vector.y);
    }

    sub(vector) {
        return new Vector2(this.x - vector.x, this.y - vector.y);
    }

    mul(scalar) {
        return new Vector2(this.x * scalar, this.y * scalar);
    }

    div(scalar) {
        return new Vector2(this.x / scalar, this.y / scalar);
    }

    distance(vector) {
        let x = this.x - vector.x;
        let y = this.y - vector.y;

        return Math.sqrt(x ** 2 + y ** 2);
    }
}