const board = (() => {
	const gameBoard = ['', '', '', '', '', '', '', '', '',];
	const winningConditions = [
		[1, 2, 3],
		[4, 5, 6],
		[7, 8, 9],
		[1, 5, 9],
		[3, 5, 7],
		[1, 4, 7],
		[2, 5, 8],
		[3, 6, 9],
	];
	return { gameBoard, winningConditions }
})();


const playerFactory = (name, symbol, squaresTaken = []) => {
	return { name, symbol, squaresTaken };
}


const Player1 = playerFactory('John', 'x');
const Player2 = playerFactory('Doe', 'o');


const game = (() => {
	let turn = 1;
	const getTurn = () => turn;
	const whosTurn = () => (turn % 2) === 1 ? Player1 : Player2;
	const nextTurn = () => ++turn;
	let gameOver = false;
	const reset = () => {
		turn = 1;
		game.gameOver = false;
		Player1.squaresTaken = [];
		Player2.squaresTaken = [];
	}
	return { getTurn, whosTurn, nextTurn, gameOver, reset };
})();


const displayController = (() => {
	const winner = document.querySelector('#winner');
	const createField = () => {
		game.reset();
		winner.textContent = "";
		const field = document.getElementById('field');
		const markup = board.gameBoard.map((el, index) =>
			`<div class="square" id="${index + 1}"></div>`
		).join('');
		field.innerHTML = markup;
	};
	const makeATurn = () => {
		const squares = document.querySelectorAll('.square');
		
			squares.forEach((square) => {
				square.addEventListener('click', function(e) {
					if(!game.gameOver && game.getTurn() <= 9) {	
						this.textContent = game.whosTurn().symbol;
						this.classList.add('taken');
						game.whosTurn().squaresTaken.push(this.getAttribute('id'));

						// дебильная ковертация, потому что так и не смог сравнить массив squaresTaken с массивом массивов winningCounditions

						board.winningConditions.forEach(cond => {
			    		if(game.whosTurn().squaresTaken.sort().join(" ").includes(cond.join(" "))) {
			        game.gameOver = `${game.whosTurn().name} won!`;
			    		} else if (game.getTurn() >= 9) {
							game.gameOver ='It is a tie!';
			    		}});
						game.nextTurn();

						if(game.gameOver) {
							winner.textContent = game.gameOver;
						}
					} 
				}
			)})
	};
	return { createField, makeATurn };
})();


const resetBtn = document.querySelector('#reset-btn');
resetBtn.addEventListener('click', function() {
	displayController.createField();
	displayController.makeATurn();
})

displayController.createField();
displayController.makeATurn();
