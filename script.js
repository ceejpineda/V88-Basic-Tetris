const tetris = (()=>{

    const gameGrid = document.querySelector('.gameGrid')
    
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
            [1,11,21,2],
            [10,11,12,22],
            [0,10,20,21],
            [10,20,21,22],
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

        const allPiece = [lTetris, zTetris, sTetris, iTetris, oTetris];
        
        return lTetris[2];
        //return allPiece[Math.floor(Math.random()*5)][Math.floor(Math.random()*4)]
    }

    const display = () =>{
        const gridElements = document.querySelectorAll('.gridElement');
        let current = spawnPiece();
        let currentPos = 2;
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
    
    return {spawnGrid, display, removePiece}

})();

tetris.spawnGrid();
tetris.display();