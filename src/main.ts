import P5 from 'p5';
import Circle from './circle';
import './style.css';

new P5((p5: P5) => {
	const createPallete = (colors: number) => {
		const pallete: P5.Color[] = [];
		for (let i = 0; i < colors; i++)
			pallete.push(
				p5.color(`#${p5.floor(p5.random(16777215)).toString(16)}`)
			);

		return pallete;
	};

	const backgroundColor = `#${p5.floor(p5.random(16777215)).toString(16)}`;

	const circles: Circle[] = [];
	p5.setup = () => {
		const canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight);
		canvas.parent('app');

		const pallete = createPallete(4);

		for (let i = 0; i <= 5000; i++)
			circles.push(
				new Circle(
					p5.random(15, p5.width - 15),
					p5.random(15, p5.height - 15),
					p5.random(10, 25),
					pallete,
					p5
				)
			);
	};

	p5.draw = () => {
		p5.background(backgroundColor);

		circles.forEach((circle) => {
			circle.display();
			circle.update();
		});

		p5.text(
			'Icons made by xnimrodx from https://www.flaticon.com/',
			p5.width - 295,
			p5.height - 5
		);
	};

	p5.mousePressed = () => {
		if (
			p5.mouseX >= p5.width - 295 &&
			p5.mouseX <= p5.width &&
			p5.mouseY >= p5.height - 5 &&
			p5.mouseY <= p5.height
		) {
			//range accounting for text length
			window.open('https://www.flaticon.com/authors/xnimrodx');
		}
	};
});
