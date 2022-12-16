const tetris = (()=>{

    const gameGrid = document.querySelector('.gameGrid');
    let currentPos = 2;
    let currentRotation = 0;    
    
    
    const spawnGrid = ()=>{
        for(let i=0; i<180; i++){
            const gridElement = document.createElement('div');
            gridElement.classList.add('gridElement');
            gridElement.dataset.pos = i;
            gameGrid.appendChild(gridElement);
        }
    }

    const spawnPiece = () =>{
        const jTetris = [
            [1,11,21,2],
            [10,11,12,22],
            [1,11,21,20],
            [10,20,21,22],
        ]
        const lTetris = [
            [1,12,22,2],
            [10,11,12,2],
            [0,10,20,21],
            [12,20,21,22],
        ]
        const tTetris = [
            [1,2,3,12],
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

        const allPiece = [lTetris, jTetris, sTetris, zTetris, sTetris, iTetris, oTetris];
        
        return allPiece[Math.floor(Math.random()*7)];
    }
    
    let newPiece = spawnPiece();
    let current = newPiece[currentRotation];
    
    const display = () =>{
        const gridElements = document.querySelectorAll('.gridElement');
        current.forEach(index =>{
            gridElements[currentPos + index].classList.add('piece');
        })
    }

    const removePiece = () =>{
        const gridElements = document.querySelectorAll('.gridElement');
        gridElements.forEach(element => {
            if(element.classList.contains('piece')){
                element.classList.remove('piece')
            }
        });
    }

    const moveDown = () =>{
        removePiece();
        currentPos += 10;
        display();
    }

    const controls = () =>{
        document.addEventListener('keydown', (e)=>{
            if(e.key == "ArrowRight"){
                removePiece();
                currentPos += 1;
                display();
            }if(e.key == "ArrowLeft"){
                removePiece();
                currentPos -= 1;
                display();
            }if(e.key == "ArrowDown"){
                moveDown();
            }if(e.key == "ArrowUp"){
                currentRotation++;
                if(currentRotation == 4){
                    currentRotation = 0;
                }
                current = newPiece[currentRotation];
                removePiece();
                display();
            }
        });
    }
    
    return {spawnGrid, display, removePiece, controls, moveDown}

})();

tetris.spawnGrid();
tetris.display();
tetris.controls();
setInterval(tetris.moveDown, 1000)