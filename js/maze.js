function shuffle(array) {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
class Board {
    constructor(len, hei) {
        this.grid = Array.from({
            length: len,
        }, (x) => Array.from({
            length: hei,
        }, (x) => 1));

        this.directions = [{
                name: 'top',
                x: 0,
                y: 1,
                code: 5,
                oppcode: 7,
            },
            {
                name: 'right',
                x: 1,
                y: 0,
                code: 2,
                oppcode: 3,
            },
            {
                name: 'bottom',
                x: 0,
                y: -1,
                code: 7,
                oppcode: 5,
            },
            {
                name: 'left',
                x: -1,
                y: 0,
                code: 3,
                oppcode: 2,
            },
        ];

        this.balllist = [];
    }

    addBall(x, y) {
        this.balllist.push(new Ball(x, y));
    }

    moveBall(direction, ballnr) {
        let ball = this.balllist[ballnr];
        let dir = this.directions.find((e) => (e.name === direction));
        if ( ball.x+dir.x < this.grid.length &&
             ball.y-dir.y < this.grid[0].length &&
             ball.x+dir.x >= 0 &&
             ball.y-dir.y >= 0 ) {
            console.log('in bounds');
            if ( dir.code === 3 || dir.code===2) {
                if (this.grid[ball.x][ball.y] % dir.oppcode === 0) {
                    console.log('moved');
                    this.balllist[ballnr].x += dir.x;
                    this.balllist[ballnr].y -= dir.y;
                }
            }
            else {
                if (this.grid[ball.x][ball.y] % dir.code === 0) {
                    console.log('moved');
                    this.balllist[ballnr].x += dir.x;
                    this.balllist[ballnr].y -= dir.y;
                }
            }
        }
    };

    paintBall(ballnr) {
        const ball = document.querySelector('.ball');
        ball.style.left = 12 + 30* this.balllist[ballnr].x + 'px';
        ball.style.top = 12 + 30* this.balllist[ballnr].y + 'px';

    }


    createMaze() {
        let directions = this.directions;
        let grid = this.grid;

        function moveTo(x, y) {
            shuffle(directions).forEach((e) => {
                let nx = x + e.x;
                let ny = y + e.y;
                if ((nx < grid.length) &&
                    (ny < grid[0].length) &&
                    (nx >= 0) && (ny >= 0) &&
                    (grid[nx][ny] === 1)) {
                    grid[x][y] *= e.oppcode;
                    grid[nx][ny] *= e.code;
                    moveTo(nx, ny);
                }
            });
        }
        moveTo(0, 0);
    };
    paintMaze() {
        const grid = this.grid;
        const Board = document.querySelector('.board');
        const elements = [
            /* directioncodes : left = 2, right=3, top=5, bottom=7 */
            {
                name: 'empty',
                code: 1,
                classes: [],
            },
            {
                name: 'left',
                code: 2,
                classes: ['left'],
            },
            {
                name: 'right',
                code: 3,
                classes: ['right'],
            },
            {
                name: 'top',
                code: 5,
                classes: ['top'],
            },
            {
                name: 'bottom',
                code: 7,
                classes: ['bottom'],
            },
            {
                name: 'leftright',
                code: 2 * 3,
                classes: ['left', 'right'],
            },
            {
                name: 'lefttop',
                code: 2 * 5,
                classes: ['left', 'top'],
            },
            {
                name: 'leftbottom',
                code: 2 * 7,
                classes: ['left', 'bottom'],
            },
            {
                name: 'righttop',
                code: 3 * 5,
                classes: ['right', 'top'],
            },
            {
                name: 'rightbottom',
                code: 3 * 7,
                classes: ['right', 'bottom'],

            },
            {
                name: 'topbottom',
                code: 5 * 7,
                classes: ['top', 'bottom'],
            },
            {
                name: 'leftrighttop',
                code: 2 * 3 * 5,
                classes: ['left', 'right', 'top'],
            },
            {
                name: 'leftrightbottom',
                code: 2 * 3 * 7,
                classes: ['left', 'right', 'bottom'],
            },
            {
                name: 'righttopbottom',
                code: 3 * 5 * 7,
                classes: ['right', 'top', 'bottom'],
            },
            {
                name: 'lefttopbottom',
                code: 2 * 5 * 7,
                classes: ['left', 'top', 'bottom'],
            },
            {
                name: 'leftrighttopbottom',
                code: 2 * 3 * 5 * 7,
                classes: ['left', 'right', 'top', 'bottom'],
            },
        ];

        function createBlock(kind) {
            const element = document.createElement('div');
            element.className = 'element';
            if (kind !== 0) {
                for (let child of elements.find((el) => (el.code === kind)).classes) {
                    let created = document.createElement('div');
                    created.className = 'path ' + child;
                    element.appendChild(created);
                }
            }
            return element;
        }
        for (let i = 0; i < grid[0].length; i++) {
            let row = document.createElement('div');
            row.className = 'row';
            for (let j = 0; j < grid.length; j++) {
                row.appendChild(createBlock(grid[j][i]));
            }
            Board.appendChild(row);
        }
    }
}

class Ball {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

let maze = (function() {

    let board = new Board(10, 20);
    board.createMaze();
    board.paintMaze();
    board.addBall(0, 0);
    document.addEventListener('keydown', (event) => {
        console.log(event);
        if (event.key === 'ArrowRight') {
            board.moveBall('right', 0);
        }
        if (event.key === 'ArrowLeft') {
            board.moveBall('left', 0);
        }
        if (event.key === 'ArrowDown') {
            board.moveBall('bottom', 0);
        }
        if (event.key === 'ArrowUp') {
            board.moveBall('top', 0);
        }
        board.paintBall(0);
    });
    console.log(board.balllist[0]);
}());

