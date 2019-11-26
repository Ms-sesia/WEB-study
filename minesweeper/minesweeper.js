// difficulty : Easy - 8 by 8, mine 20 / Normal - 16 by 16, mine 40 / Hard - 16 by 32, mine 90
let diff = document.querySelector('#diff'); 
let startBtn = document.querySelector('#exec');
let gameTable = document.querySelector('#table tbody');

const gameSize = (D) => {
    return 
}

let randomNumber = (numArray, mineNumber) => {    // 랜덤한 숫자 선택해서 배열 리턴.
    let extractNumber = [];
    for( i = 0 ; i < mineNumber ; i++) {
        extractNumber.push(
            numArray.splice( Math.floor(Math.random() * (numArray.length - i)), 1)[0]
        );
    }
    return extractNumber;
};
let minePlant = (hor, ver, mine, arr) => {
    let size = hor * ver;
    let sizeNumber = Array(size).fill().map((el, index) => {    // 1~난이도별 지뢰판 사이즈만큼의 숫자 배열 .
        return el = index +1;
    });

    let choiceLocation = randomNumber(sizeNumber, mine);
    return choiceLocation;
};

let drowingMap = (H, V, mapArray) => {

    for( i=0; i < H; i++) {
        let tr = document.createElement('tr');
        for( j=0; j < V; j++) {
            let td = document.createElement('td');
            td.addEventListener('contextmenu', (e) => { // 우클릭이벤트
                e.preventDefault();
                let Tr = e.target.parentNode;
                let Tbody = e.target.parentNode.parentNode;
                let valTd = Array.prototype.indexOf.call(Tr.children, td);
                let valTr = Array.prototype.indexOf.call(Tbody.children, tr);
                console.log(valTr, valTd);
            });
            td.textContent = mapArray[i][j];    // 지뢰 심기.
            tr.appendChild(td);
        }
        gameTable.appendChild(tr);
        
    }
    //console.log(typeof(gameTable));
};

let gameStart = (hor, ver, mine) => {
    let mapArray = Array(hor)
        .fill('')
        .map(() => Array(ver).fill(''));    // hor by ver 사이즈의 2차원 배열. 배열로 요소를 채우는게 아니라 각 요소를 채워줘야 나중에 변경을 할 수 있다.
    
    let mineLocation = minePlant(hor, ver, mine, mapArray); // 지뢰 심을 위치. ex) 41 > 4, 1 에 지뢰
    for( i=0; i<mineLocation.length; i++) {
        mapArray[Math.floor(mineLocation[i] / hor)][mineLocation[i] % ver] = "X";   // mapArray[행][열]
    }
    drowingMap(hor, ver, mapArray);    
};

let diffSelect = (gameDiff) => {
    if(gameDiff === 'Easy') gameStart(8, 8, 20);
    if(gameDiff === 'Normal') gameStart(16, 16, 40);
    if(gameDiff === 'Hard') gameStart(16, 32, 90);
};

startBtn.addEventListener('click', () => {
    let selectDiff = diff.options[diff.selectedIndex].value;
    gameTable.innerHTML = '';
    diffSelect(selectDiff);    
})

