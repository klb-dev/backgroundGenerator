const css = document.querySelector('h3');
const color1 = document.querySelector('.color1');
const color2 = document.querySelector('.color2');
const body = document.getElementById('gradient');
const random = document.getElementById('random');

color1.addEventListener('input', setGradient);

color2.addEventListener('input', setGradient);

random.addEventListener('click', generateRandomColors);

setGradient();
function setGradient() {
    body.style.background = `linear-gradient(to right, ${color1.value}, ${color2.value})`;
    const color1Rgb = hexToRgb(color1.value);
    const color2Rgb = hexToRgb(color2.value);
    const color1Hsl = rgbToHsl(color1Rgb.r, color1Rgb.g, color1Rgb.b);
    const color2Hsl = rgbToHsl(color2Rgb.r, color2Rgb.g, color2Rgb.b);
    css.textContent = `RGB: ${body.style.background}; 
Hex: linear-gradient(to right, ${color1.value}, ${color2.value});
HSL: linear-gradient(to right, ${color1Hsl}, ${color2Hsl});`;
	updateFontColor();
}

function rgbToHsl (r, g, b) {
	r /=255;
	g /=255;
	b /=255;
	const max = Math.max(r, g, b), min = Math.min (r, g, b);
	let h, s, l = (max + min) / 2;

	if (max === min) {
		h = s = 0;
	} else {
		const d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

		switch(max) {
			case r: 
				h = (g - b) / d + (g < b ? 6 : 0); 
				break;
			case g: 
				h = (b - r) / d + 2; 
				break;
			case b: 
				h = (r - g) / d + 4; 
				break;
		}
		h /= 6;
	}

	return `hsl(${(h * 360).toFixed(0)}, ${(s * 100).toFixed(0)}%, ${(l * 100).toFixed(0)}%)`;
}

function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
}

function generateRandomColors() {
	const randomColor1 = "#" + Math.floor(Math.random()*16777215).toString(16);
	const randomColor2 = "#" + Math.floor(Math.random()*16777215).toString(16);
	color1.value = randomColor1;
	color2.value = randomColor2;
	setGradient();
}

function updateFontColor() {
    const color1Rgb = hexToRgb(color1.value);
    const color2Rgb = hexToRgb(color2.value);
    const luminance1 = calculateLuminance(color1Rgb.r, color1Rgb.g, color1Rgb.b);
    const luminance2 = calculateLuminance(color2Rgb.r, color2Rgb.g, color2Rgb.b);
    const averageLuminance = (luminance1 + luminance2) / 2;

    body.style.color = averageLuminance > 0.5 ? '#000' : '#fff';
}

function calculateLuminance(r, g, b) {
    const a = [r, g, b].map(function (v) {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}