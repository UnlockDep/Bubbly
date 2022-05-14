import P5 from 'p5';

export default class Circle {
	public pos: P5.Vector;
	public vel: P5.Vector;
	public spawnRadius: number;
	public color: P5.Color;

	constructor(
		public x: number,
		public y: number,
		public radius: number,
		colorsArray: P5.Color[],
		public p5: P5,
		public maxRadius = 35
	) {
		this.pos = this.p5.createVector(x, y);
		this.vel = this.p5.createVector(
			this.p5.round(this.p5.random()) == 0
				? this.p5.random()
				: -this.p5.random(),
			this.p5.random() == 0 ? this.p5.random() : -this.p5.random()
		);
		this.color = this.p5.random(colorsArray);
		this.spawnRadius = radius;
	}

	display() {
		this.p5.noStroke();
		this.p5.fill(this.color);
		this.p5.circle(this.pos.x, this.pos.y, this.radius);
	}

	update() {
		const mouseDistance = this.p5.createVector(
			this.p5.mouseX - this.pos.x,
			this.p5.mouseY - this.pos.y
		);
		if (
			this.pos.x + this.radius >= this.p5.width ||
			this.pos.x - this.radius <= 0
		)
			this.vel.x = -this.vel.x;
		if (
			this.pos.y + this.radius >= this.p5.height ||
			this.pos.y - this.radius <= 0
		)
			this.vel.y = -this.vel.y;

		if (
			mouseDistance.x < 50 &&
			mouseDistance.x > -50 &&
			mouseDistance.y < 50 &&
			mouseDistance.y > -50 &&
			this.radius <= this.maxRadius
		)
			this.radius += 6;
		else if (
			(mouseDistance.x >= 50 && this.spawnRadius <= this.radius) ||
			(mouseDistance.x <= -50 && this.spawnRadius <= this.radius) ||
			(mouseDistance.y >= 50 && this.spawnRadius <= this.radius) ||
			(mouseDistance.y <= -50 && this.spawnRadius <= this.radius)
		)
			this.radius -= 2;

		this.pos.x += this.vel.x;
		this.pos.y += this.vel.y;
	}
}
