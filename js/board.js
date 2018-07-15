const Board = document.querySelector('.board');
elements = [
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

function createRandomBlock() {
  const element = document.createElement('div');
  element.className = 'element';
  let item = elements[Math.floor(Math.random() * (elements.length))];
  for (let child of item.classes) {
    let created = document.createElement('div');
    created.className = 'path ' + child;
    element.appendChild(created);
  }
  return element;
}


function paintGrid(grid) {
  for (let i = 0; i < grid[0].length; i++) {
    let row = document.createElement('div');
    row.className = 'row';
    for (let j = 0; j < grid.length; j++) {
      row.appendChild(createBlock(grid[j][i]));
    }
    Board.appendChild(row);
  }
}


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

let recursiveback = function(grid) {
  function moveTo(x, y) {
    shuffle(directions).forEach((e) => {
      nx = x + e[0];
      ny = y + e[1];
      if ((nx < grid.length) &&
        (ny < grid[0].length) &&
        (nx >= 0) && (ny >= 0) &&
        (grid[nx][ny] === 1)) {
        grid[x][y] *= e[2];
        grid[nx][ny] *= e[3];
        moveTo(nx, ny);
      }
    });
  }
  moveTo(0, 0);
  return grid;
};

function createMaze(len, hei, creationalg) {
  grid = Array.from({
    length: len,
  }, (x) => Array.from({
    length: hei,
  }, (x) => 1));
  directions = [
    /* [x,y,directioncode,oppsite direction code] */
    [0, 1, 7, 5],
    [1, 0, 3, 2],
    [0, -1, 5, 7],
    [-1, 0, 2, 3],
  ];
  return creationalg(grid);
}


class Ball {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.active = true;
  }

  move(direction) {
    console.log(direction);
  }
  getx() {
    return this.x;
  }
  gety() {
    return this.y;
  }
}

class Player {
  constructor(name) {
    this.name = name;
    this.x = 0;
    this.y = 0;
  }
  showname() {
    console.log(this.name);
  }
}

document.addEventListener('keypress', (event) => {
  const keyName = event.key;
});

const ball = new Ball();
const player = new Player('hans');
player.showname();

paintGrid(createMaze(20, 10, recursiveback));

