


var width = 1000; 
var height = 1000; 
var size = 10 ; 


function Cell( i , j ) {
  this.x = i ;
  this.y = j ; 
  this.color = 0; 
  this.f = 0; 
  this.g = 0; 
  this.w = grid.cellWidth ; 
  this.h =  grid.cellHeight ; 
  this.connectedLimeCells = []; 
  this.connectedBlocks = []; 
  this.connectedOpenWhites = []; 
  this.neighbors = [] ; 
  this.show = function(col) // pas the color of the cell . 
  { 
      fill(col);
      noStroke();  
      rect(this.x*this.w ,this.y*this.h  , this.w-1  , this.h-1  ); 
  }

}



function searchTree()
{
  for(var i = 0;i<grid.size; i++)
  {
    for(var j = 0;j <grid.size ; j++)
    {
      if(i-1 >= 0 )
      {
        grid.dots[i][j].neighbors.push(grid.dots[i-1][j]) ; 
        if(grid.dots[i-1][j].color === 2)
        {
          grid.dots[i][j].connectedLimeCells.push(grid.dots[i-1][j]); 
        }
        else if(grid.dots[i-1][j].color === 1)
        {
          grid.dots[i][j].connectedBlocks.push(grid.dots[i-1][j]);  
        }
        else if(grid.dots[i-1][j].color === 0)
        {
          grid.dots[i][j].connectedOpenWhites.push(grid.dots[i-1][j]); 
        }
       
      } 
      if(i+1 <= 9)
      {
        grid.dots[i][j].neighbors.push(grid.dots[i+1][j]) ; 
        if(grid.dts[i+1][j].color === 2) 
        {
          grid.dots[i][j].connectedLimeCells.push(grid.dots[i+1][j]); 
        }
        else if(grid.dots[i+1][j].color === 1])
        {
          grid.dots[i][j].connectedBlocks.push(grid.dots[i+1][j]); 
        }
        else if(grid.dots[i+1][j].color === 3 )
        {
          grid.dots[i][j].connectedOpenWhites.push(grid.dots[i+1][j]); 
        }
      }
      if(j-1 >= 0)
      {
        grid.dots[i][j].neighbors.push(grid.dots[i][j-1]) ; 
        if(grid.dots[i][j-1].color === 2)
        {
          grid.dots[i][j].connectedLimeCells.push(grid.dost[i][j-1]); 
        }
        else if(grid.dots[i][j-1].color === 1)
        {
          grid.dots[i][j].connectedBlocks.push(grid.dots[i][j-1]); 
        }
        else if(grid.dots[i][j-1].color === 3)
        {
          grid.dots[i][j].connectedOpenWhites.push(grid.dots[i][j-1]); 
        }
      
      }
      if(j+1 <= 9 )
      {
        grid.dots[i][j].neighbors.push(grid.dots[i][j+1]) ; 
        if(grid.dots[i][j+1].color === 2)
        {
          grid.dots[i][j].connectedLimeCells.push(grid.dots[i][j+1]); 
        }
        else if(grid.dots[i][j+1].color === 1)
        {
          grid.dots[i][j].connectedBlocks.push(grid.dots[i][j+1]); 

        }
        else if(grid.dots[i][j+1].color === 3)
        {
          grid.dots[i][j].connectedOpenWhites.push(grid.dots[i][j+1]);
        }
        
      }
    }
  }



}

function startingPoint() // it is called for finding a lime cell on the top row .  
{
  returnList = []; 
  for(var i = 0;i<size; i++)
  {
    if(grid.dots[0][i] === 2) 
    {
      returnList.push(grid.dots[0][i]); 
    } 
  }
  return returnList ; 
}



function doesPercolate(list)  // it is called if top row already has a lime cell. returns false if grid can not reachg to the bottom . 
{
  for(var elm of list )
  {
    tempList = []; 
    for(var neig of elm.neighbors)
    {
      if(neig.color ===  2)
      {
        tempList.push(neig); 
      }
      if(neig.color === 2 && neig.x === 9)
      {
        return true ; 
      }
      
    }
    result = doesPercolate(tempList); 
    
  }
  return false ; 

  


  
}
function correctAfterDelete()
{
   
  for(var i = 0;i<size;i++)
  {
    for(var j = 0;j<size ;j++)
    {
      if(grid.dots[i][j].color === 2)
      {
        tempList = []; 
        for(var neighbor of grid.dots[i][j].neighbors)
        {
          if(neighbor.color === 3)
          {
            neighbor.color = 2 ;  
          }
        }
      }    
    }
  }

}


function deleteBlock()
{

 var i =  Math.floor(Math.random() * (10)) ; 
 var j =  Math.floor(Math.random() * (10)) ; 

 if(grid.dots[i][j].color === 1)
 {
   // it is a block so open it : 
   grid.dots[i][j] = 2 ; 

 }
 


}


class Grid  {

  constructor() //  NxN grid .
  this.size = size ;
  this.dots = new Array(N);
  this.openSet = []; 
  this.closedSet = []; 
  this.size = 10 ; 
  this.cellWidth = width / size ;
  this.cellHeight = height / size ;   
  

  for(var i = 0; i<N ; i++)
  {
    this.dots[i] = new Array(N); 
  } 
  
 
  
  
  init()
{
   // declared a NxN array . 
  
  for (var i = 0; i < this.size; i++)
  {
    for (int j = 0; j < this.size; j++)
    {
        var randColor = Math.floor(Math.random() * (3)) + 1; 
        this.dots[i][j] = new Cell(i , j);
        this.dots[i][j].color = randColor; 
            
  
    }
  }
  
}

  
};


function setup()
{
  createCanvas(width, height); 
  


  var grid = new Grid(); 


}// setup ends here . 



function draw()
{

for(var i = 0;i<grid.size  ;i++ )
{ 
    for(var j = 0; j<grid.size;j++)
    {
      if(grid.dots[i][j].color === 1)
      {
        grid.dots[i][j].show(color(0,0,0));// black 
      }
      else if(grid.dots[i][j] === 2 )
      {
        grid.dots[i][j].show(color(187,255,51)); // lime
      }
      else if(grid.dots[i][j] === 3)
      {
        grid.dots[i][j].show(color(255,255,255)); // white  
      }
      
    }

}


searchTree(); // searches tree n every draw() loop and generates trees in between
              // cells that has same color.

// GOT IT .
returnList = startingPoint(); 

if(returnList.length != 0 )
{

  if(doesPrecolate()) // if grid pecolates . terminate  the program or set a reset
  {
    console.log('It does percolate!!'); 
    return;   
  }
  else if(!doesPercolate()) // continue draw loop with deleted blocks 
  {
    deleteBlock(); // deletes blocks randomly . 
                // you should searchTree() after this again . 
  correctAfterDelete(); 
              }
  // CHECK WHETHER THE TREE REACHES FROM TOP TO BOTTOM? 
}
else {
  deleteBlock(); 
  correctAfterDelete(); 
}// after deletion it will  go back to the starting point of the draw function loop . 

}


