const tetris = (()=>{

    const gameGrid = document.querySelector('.gameGrid');
    const nextPieceGrid = document.querySelector('.nextPieceGrid');

    let currentPos = 2;
    let currentRotation = 0;
    let randomizer = 0;
    let score = 0;
    
    
    const spawnGrid = ()=>{
        for(let i=0; i<180; i++){
            const gridElement = document.createElement('div');
            gridElement.classList.add('gridElement');
            gridElement.dataset.pos = i;
            gameGrid.appendChild(gridElement);
        }
        

        for(let i=0; i<10; i++){
            const gridElement = document.createElement('div');
            gridElement.classList.add('gridElement');
            gridElement.classList.add('floor');
            gridElement.classList.add('bottom');
            gameGrid.appendChild(gridElement);
        }

        // for(let i=0; i<16; i++){
        //     const gridElement = document.createElement('div');
        //     gridElement.classList.add('a');
        //     nextPieceGrid.appendChild(gridElement);
        // }
    }

    const spawnPiece = () =>{
        const jTetris = [
            [1,11,21,2],
            [10,11,12,22],
            [1,11,21,20],
            [10,20,21,22],
        ]
        const lTetris = [
            [0,11,21,1],
            [10,11,12,2],
            [1,11,21,22],
            [10,11,12,20],
        ]
        const tTetris = [
            [1,10,11,12],
            [1,11,12,21],
            [10,11,12,21],
            [1,10,11,21],
        ]
        const sTetris = [
            [0,10,11,21],
            [11,12,20,21],
            [0,10,11,21],
            [11,12,20,21],
        ]
        const zTetris = [
            [1,10,11,20],
            [10,11,21,22],
            [1,10,11,20],
            [10,11,21,22],
        ]
        const oTetris = [
            [0,1,10,11],
            [0,1,10,11],
            [0,1,10,11],
            [0,1,10,11],
        ]
        const iTetris = [
            [1,11,21,31],
            [10,11,12,13],
            [1,11,21,31],
            [10,11,12,13],
        ]

        const allPiece = [lTetris, jTetris, tTetris, sTetris, zTetris, iTetris, oTetris];
        randomizer = Math.floor(Math.random()*7);
        
        return allPiece[randomizer];
    }
    
    let newPiece = spawnPiece();
    let current = newPiece[currentRotation];

    const color = () =>{
        if(randomizer == 0){
            return '#0000ff';
        }else if(randomizer == 1){
            return '#ff7f00'
        }else if(randomizer == 2){
            return '#800080'
        }else if(randomizer == 3){
            return '#00FF00'
        }else if(randomizer == 4){
            return '#ff0000'
        }else if(randomizer == 5){
            return '#00ffff'
        }else if(randomizer == 6){
            return '#ffff00'
        }
    }
    
    const display = () =>{
        const gridElements = document.querySelectorAll('.gridElement');
        current.forEach(index =>{
            gridElements[currentPos + index].classList.add('piece');
            gridElements[currentPos + index].style.backgroundColor = color();
            });
    }

    const removePiece = () =>{
        const gridElements = document.querySelectorAll('.gridElement');
        current.forEach(index => {
            gridElements[currentPos + index].style.backgroundColor = 'rgba(127, 255, 212, 0.264)'
            gridElements[currentPos + index].classList.remove('piece');
        });
    }

    const moveDown = () =>{
        const gridElements = document.querySelectorAll('.gridElement');
        if(!current.some(index => gridElements[currentPos+index+10].classList.contains('floor'))){
            removePiece();
            currentPos += 10;
            display();
        }
        else{
            isfloor();
        }
    }

    const moveRight = () =>{
        if(current.some(index =>(currentPos + index)%10 == 9)) return;
        removePiece();
        currentPos += 1;
        display();
    }

    const moveLeft = () =>{
        const gridElements = document.querySelectorAll('.gridElement');
        removePiece();
        if(!current.some(index =>(currentPos + index)%10 == 0)) {
            currentPos -= 1;
            if(current.some(index => gridElements[currentPos+index].classList.contains('floor'))){
                currentPos += 1;
            }
        }
        display();
    }

    const rotate = () =>{
        currentRotation++;
        if(currentRotation == 4){
            currentRotation = 0;
        }
        removePiece();
        current = newPiece[currentRotation];
        display();
    }

    const controls = () =>{
        let rightEdge = false;
        document.addEventListener('keydown', (e)=>{
            if(e.key == "ArrowRight"){
                moveRight();
            }if(e.key == "ArrowLeft"){
                moveLeft();
            }if(e.key == "ArrowDown"){
                moveDown();
            }if(e.key == "ArrowUp"){
                rotate();
            }if(e.key == " "){
                moveDown();
            }
        });
    }

    const isfloor = () =>{
        const gridElements = document.querySelectorAll('.gridElement');
        if(current.some(index => gridElements[currentPos + index + 10].classList.contains('floor'))){
            current.forEach(index => gridElements[currentPos + index].classList.add('floor'))
            console.log('hello');
            newPiece = spawnPiece();
            current = newPiece[currentRotation];
            currentPos = 4;
            display();
            scoreMechanic();
        }
    }

    const scoreMechanic = () =>{
        let gridElements = Array.from(document.querySelectorAll('.gridElement'));
        console.log(gridElements)

        for(let i = 0; i<180; i+=10){
            const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]
            console.log(row.every(j => gridElements[j].classList.contains('floor')))
            if(row.every(j => gridElements[j].classList.contains('floor'))){
                score += 10;
                console.log(score);
                row.forEach(index =>{
                    gridElements[index].classList.remove('floor');
                    gridElements[index].classList.remove('piece');
                    gridElements[index].style.backgroundColor = "rgba(127, 255, 212, 0.264)";

                })
                const refreshedBlocks = gridElements.splice(i, 10);
                gridElements = refreshedBlocks.concat(gridElements);
                gridElements.forEach(cell=>{
                    gameGrid.appendChild(cell);
                })
            }
        }
    }
    
    return {spawnGrid, display, removePiece, controls, moveDown}

})();

tetris.spawnGrid();
tetris.display();
tetris.controls();
tetris.moveDown();