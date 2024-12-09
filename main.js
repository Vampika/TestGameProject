const data = {
	"rating": [
		{
			"id": "123",
			"name": "Владимир",
			"lastName": "Ларионов",
			"img": "./male.png",
			"points": "463"
		},
		{
			"id": "9",
			"name": "Владимир",
			"lastName": "Сергеев",
			"img": "./male.png",
			"points": "521"
		},
		{
			"id": "231",
			"name": "Вениамин",
			"lastName": "Васильев",
			"img": "./male.png",
			"points": "865"
		},
		{
			"id": "321",
			"name": "Мария",
			"lastName": "Логинова",
			"img": "./female.png",
			"points": "865"
		},
		{
			"id": "492",
			"name": "Борис",
			"lastName": "Казанцев",
			"img": "./male.png",
			"points": "784"
		},
		{
			"id": "452",
			"name": "Полина",
			"lastName": "Калинина",
			"img": "./female.png",
			"points": "225"
		},
		{
			"id": "796",
			"name": "Даниил",
			"lastName": "Воробьёв",
			"img": "./male.png",
			"points": "642"
		},
		{
			"id": "4",
			"name": "Эрик",
			"lastName": "Аксёнов",
			"img": "./male.png",
			"points": "150"
		},
		{
			"id": "1155",
			"name": "Иван",
			"lastName": "Иванов",
			"img": "./male.png",
			"points": "100"
		},
		{
			"id": "12145",
			"name": "Артем",
			"lastName": "Алексеев",
			"img": "./male.png",
			"points": "1000"
		}
	],
	"friends": [
		{
			"id": "9",
			"name": "Владимир",
			"lastName": "Сергеев",
			"img": "./male.png"
		},
		{
			"id": "4",
			"name": "Эрик",
			"lastName": "Аксёнов",
			"img": "./male.png"
		},
		{
			"id": "15411",
			"name": "Ирина",
			"lastName": "Чеснокова",
			"img": "./female.png"
		},
		{
			"id": "15564",
			"name": "Дарина",
			"lastName": "Боброва",
			"img": "./female.png"
		}
	]
}

//create slider

const gallery = document.querySelector("#gallery");
const leftBtn = document.querySelector("#left-btn");
const rightBtn = document.querySelector("#right-btn");
const friendsCount = 20;
const friendWidth = 60;
let currentIndex = 0;
let maxIndex = 0;

for (let i = 0; i < friendsCount; i++) {
	const newFriendDiv = document.createElement('div');
	if (i % 2)
		newFriendDiv.className = 'gallery__friend';
	else
		newFriendDiv.className = 'gallery__no-friend';
	gallery.appendChild(newFriendDiv);
}

maxIndex = gallery.childElementCount - 7;

leftBtn.addEventListener('click', () => {
	if (currentIndex > 0) {
		currentIndex--;
		gallery.style.transform = `translateX(-${60 * currentIndex}px)`;
	}
});

rightBtn.addEventListener('click', () => {
	if (currentIndex < maxIndex) {
		currentIndex++;
		gallery.style.transform = `translateX(-${60 * currentIndex}px)`;

	}
});

//rating section
const openRatingButton = document.querySelector("#rating-btn");
const closeRatingButton = document.querySelector("#rating-close-btn");

const modalWindow = document.querySelector(".modal");
const ratingWrapper = document.querySelector(".rating");

closeRatingButton.addEventListener("click", () => {
	modalWindow.classList.remove("active");
	ratingWrapper.classList.remove("show");
});

openRatingButton.addEventListener("click", () => {
	modalWindow.classList.add('active');
	setTimeout(() => {
		ratingWrapper.classList.add('show');
	}, 100);
});

const ratingData = data["rating"];
const friendIds = data["friends"].map(friend => friend.id);

const table = document.querySelector("#rating-table").querySelector("tbody");

ratingData.forEach((user, index) => {
	const newRow = table.insertRow();

	if (friendIds.includes(user.id))
		newRow.style.color = "green"

	const nameCell = newRow.insertCell(0);
	nameCell.textContent = index;

	const lastNameCell = newRow.insertCell(1);
	lastNameCell.textContent = user.name + " " + user.lastName;

	const pointsCell = newRow.insertCell(2);
	pointsCell.textContent = user.points;
});


//Character animation
const steps = [0.09, 0.15, 0.22, 0.29, 0.36, 0.41, 0.47, 0.57, 0.63, 0.72, 0.77, 0.83, 0.9];
let currentStep = 0;

const path = document.querySelector('#myPath');
const pathLength = path.getTotalLength();
const block = document.querySelector('.character');
let startTime = null;
let progress = 0; // Начальный прогресс анимации

const startPoint = path.getPointAtLength(0); // Начальная точка пути
block.style.transform = `translate(${startPoint.x + 80 - 429}px, ${startPoint.y + 28 - 492}px)`; // Установим начальную позицию блока

function animate(timestamp) {
	if (!startTime) startTime = timestamp;
	const elapsed = timestamp - startTime;
	const newProgress = elapsed / 450000; // Обновляем прогресс на основе времени

	// Обновляем текущий прогресс
	progress = Math.min(progress + newProgress, 1); // Убедимся, что прогресс не превышает 1

	const point = path.getPointAtLength(progress * pathLength);
	block.style.transform = `translate(${point.x + 80 - 429}px, ${point.y + 28 - 492}px)`;

	// Если прогресс меньше 1, продолжаем анимацию, иначе останавливаем
	if (progress < steps[currentStep]) {
		requestAnimationFrame(animate); // Промежуточный кадр
	}
	else {
		currentStep++;
	}
}

document.getElementById('step-btn').addEventListener('click', function () {
	startTime = performance.now(); // Сбросить время начальной точки
	requestAnimationFrame(animate); // Запускаем анимацию
});





































