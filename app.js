const cells= document.querySelectorAll(".cell");
const titleHeader = document.querySelector(".titleHeader");
const XplayerDisplay= document.querySelector("#XplayerDisplay");
const oplayerDisplay = document.querySelector("#oplayerDisplay");
const restartbtn= document.querySelector(".restartbtn");

//Initialize variable for the game
let player ='X';
let isPauseGame = false
let isGameStart = false

//Array to track the state of each cell
const inputcells = ['','','',
                    '','','',
                    '','','']

//Array of win conditions
const winConditions = [
    [0,1,2],[3,4,5],[6,7,8],//rows
    [0,3,6],[1,4,7],[2,5,8],//columns
    [0,4,8],[2,4,6] //diagonal
]

//add click events listens to each event ;)

cells.forEach((cell,index) =>{
     cell.addEventListener('click',() => tapcell(cell,index))

})
function  tapcell(cell,index){
    // console.log(cell)
    // console.log('Index :' + index)

    if(cell.textContent == ''  && !isPauseGame){

        isGameStart = true
        updatecell(cell,index);
      //DO a random pick if there are no results
      if(!checkWinner()){
          changePlayer()
          randompick()

      }

    }

}

function updatecell(cell, index){
    cell.textContent = player
    inputcells[index]= player
     cell.style.color = (player == 'X') ? '#1892EA' :'#A737FF' //(condition) ? valueIfTrue : valueIfFalse //This is the ternary operator — a shortcut for an if-else statement.

    //  explain
      //->1.  If player is 'X', use #1892EA (a shade of blue).
     //->2. If not (i.e., if player is 'O'), use #A737FF (a shade of purple).

}
function changePlayer(){
    player = (player== 'X') ? 'O': 'X'
    // if the player is X then it change to O and if the player is O then it change into X;.
}

function checkWinner(){
    for( const [a,b,c] of winConditions){
        // console.log(a)
    
        if(inputcells[a] == player &&
           inputcells[b] == player &&
           inputcells[c] == player
        ){
            declareWinner([a,b,c])
            return true
        }
    }


    // check for a draw if the the cells are filled

    if (inputcells.every(cell => cell !='')){
        declaredraw();
        return true;
}
}

//  function declareWinner(winningIndices){
//     // console.log(player + 'win!')
//     titleHeader.textContent = `&{player} win`
//     isPauseGame = true

//     // highlight winning cells
//     // console.log(winningIndices)
//     winningIndices.forEach((index)  =>
//         cells[index].style.background = '#2A2343'
// )

//     restartbtn.style.visibility ="visible"
//  }
function declareWinner(winningIndices) {
    titleHeader.textContent = `${player} wins!`
    isPauseGame = true ;
    

    // Highlight winning cells
    winningIndices.forEach((index) =>
        cells[index].style.background = '#2A2343'
    );

    restartbtn.style.visibility = 'visible';
}
restartbtn.addEventListener('click',()=>{
        restartbtn.style.visibility = 'hidden';
        inputcells.fill('')
        cells.forEach(cell => {
            cell.textContent ='';
            cell.style.background ='';
            
        })
        isGameStart = false
        isPauseGame = false
        titleHeader.textContent = 'Choose'
})


function declaredraw() {
    titleHeader.textContent= 'Draw'
    isPauseGame = true
    restartbtn.style.visibility = 'visible';

}

function choosePlayer (selectedPlayer){
    // console.log(selectedPlayer)
    //ensure the game has't started

if (!isGameStart){
    player = selectedPlayer;

    if(player == 'X')
    {
        XplayerDisplay.classList.add('player-active')
        oplayerDisplay.classList.remove('player-active')
    } 
    else 
    {
        XplayerDisplay.classList.remove('player-active')
        oplayerDisplay.classList.add('player-active')
    }
}

} 


function randompick(){
    // pause the game to allow computer to pick
    isPauseGame = true
    setTimeout(    () =>{ 
        let randomIndex
        do{
            //pick a random index
             randomIndex = Math.floor(Math.random() * inputcells.length ) 
        }while (
            //ensure the choose cell is empty
            inputcells[randomIndex ]!= ''
        )
        // console.log(randomIndex);
        //update the cell with the computer move;
        updatecell(cells[randomIndex],randomIndex,player)


        //check if computer won
        if(!checkWinner()){
            changePlayer()
            //switch back to human  player
            isPauseGame = false
            return
        }
        player =(player == 'X') ? 'O': 'X'
    },1000)//display computer move in 1 sec
}
