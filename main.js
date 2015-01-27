var canvas = document.getElementById('canvas'),
		result = document.getElementById('result'),
		download = document.getElementById('download'),
		a = canvas.getContext('2d'),
		b = result.getContext('2d'),
		img = new Image();

download.setAttribute('href', result.toDataURL('image/jpeg', 1));

var coordinate = {};
function setCordinate(e) {
	coordinate.x = e.layerX - coordinate.oldX;
	coordinate.y = e.layerY - coordinate.oldY;
	canvas.width = canvas.width;
	a.drawImage(img, 0, 0);
	a.strokeRect(coordinate.oldX, coordinate.oldY, coordinate.x, coordinate.y);
}

function sliceAndDraw() {
	if(coordinate.x < 0) {
		coordinate.oldX += coordinate.x;
		coordinate.x = -coordinate.x;
	}
	if(coordinate.y < 0) {
		coordinate.oldY += coordinate.y;
		coordinate.y = -coordinate.y;
	}
	result.width = coordinate.x;
	result.height = coordinate.y;
	b.drawImage(img, coordinate.oldX, coordinate.oldY, coordinate.x, coordinate.y, 0, 0, coordinate.x, coordinate.y);
	download.setAttribute('href', result.toDataURL('image/png', 1));
}
function mouseOut(e) {
	e.target.removeEventListener('mousemove', setCordinate);
	e.target.removeEventListener('mouseout', mouseOut);
	sliceAndDraw();
}
canvas.addEventListener('mousedown', function(e) {
	coordinate.oldX = e.layerX;
	coordinate.oldY = e.layerY;
	e.target.addEventListener('mousemove', setCordinate);
	e.target.addEventListener('mouseout', mouseOut);
});
canvas.addEventListener('mouseup', function(e) {
	e.target.removeEventListener('mousemove', setCordinate);
	sliceAndDraw();
});

var input = document.querySelectorAll('input');
for(var i = 0, len = input.length; i < len; i++) {
	input[i].addEventListener('change', function(e) {
		coordinate.oldX = +input[0].value;
		coordinate.oldY = +input[1].value;
		coordinate.x = +input[2].value;
		coordinate.y = +input[3].value;
		sliceAndDraw();
	});
}

var detailsE = document.getElementById('coordinate');
canvas.addEventListener('mousemove', function(e) {
	detailsE.innerHTML = 'X:' + e.layerX + ', Y:' + e.layerY;
});

var path = document.getElementById('path');
document.getElementById('load-image').addEventListener('click', function(e) {
	img.src = path.value;

	canvas.width = img.width;
	canvas.height = img.height;
	result.width = img.width;
	result.height = img.height;
	a.drawImage(img, 0, 0);
	b.drawImage(img, 0, 0);
})