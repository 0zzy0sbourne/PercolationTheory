let width = 600; 
let height = 600;
let colNum = 20 ; 
class Queue {
    constructor(){// send our grid as parameter
        this.queue = []; 
    }
    enqueue = (cell) => {
        this.queue.unshift(cell); 
    }
    dequeue = () => {
        this.queue.shift();

    }
    front = () => {
        return this.queue[0]; 

    }
    isEmpty = () => {
        if(this.queue.length === 0) 
        {
            return true ; 
        }
        else{
            return false ; 
        }

    }
    };


function Cell(i,j , height , width , color) {
    this.cellColor = color ; 
    this.cellWidth = width ; 
    this.cellHeight = height;  
    this.x = j; // num from left 
    this.y = i; // num from top 
    this.connectedLimeCells = []; 
    this.connectedBlocks = []; 
    this.connectedOpenWhites = []; 
    this.neighbors = [] ; 
  
    this.show = () => { // INITIAL GRID CONSISTS OF CLOSED AND OPEN SITES ONLY
        if(this.cellColor === 1 || this.cellColor === 2) // BLACK
        {
            fill(11,2,0); 
        }
        else if(this.cellColor === 3 ) // WHITE
        {
            fill(243, 249, 247); 
        }
        else if(this.cellColor === 4) // COLORFUL
        {
            fill(100, 191, 245); 
        }
        noStroke(); 
        rect(this.x * this.cellWidth , this.y * this.cellHeight , this.cellWidth , this.cellHeight); 
    }
}
class Grid  {

    constructor(size , canvasWidth , canvasHeight){
    this.Threshold = 0;
    this.openSiteNum = 0;  
    this.siteNum = size * size ; 
    this.dimensionSize = size ;
    this.rects = new Array(this.dimensionSize);
    this.cellWidth = canvasWidth / this.dimensionSize ; 
    this.cellHeight = canvasHeight / this.dimensionSize; 
    for(var i = 0; i<this.dimensionSize; i++)
    {
        this.rects[i] = new Array(this.dimensionSize); 
    } // CREATED AN  (dimensionSize x dimensionSize) GRID
        
    for (var i = 0; i < this.dimensionSize; i++)
    {
        for (var j = 0; j < this.dimensionSize; j++)
        {
            this.randColor = Math.floor(Math.random() * (3)) + 1; 
            this.rects[i][j] = new Cell(i , j , this.cellHeight , this.cellWidth , this.randColor );   
        }
    }
    this.openSiteCalc = () => {
    for(var i = 0;i<this.dimensionSize;i++)
        {
            for(var j = 0;j<this.dimensionSize;j++)
            {
                if(this.rects[i][j].cellColor === 3 || this.rects[i][j].cellColor === 4)
                {
                    this.openSiteNum = this.openSiteNum + 1 ; 
                }   
            }
        }
    return this.openSiteNum; 
    }
    this.doesPercolate = () => {
        let visited = [];
        let subgraph = []; // push the all connected nodes to starting nodecell. 
        let toprow = []; 
        let queue = new Queue(); 
        for(var i = 0;i<this.dimensionSize;i++)
        {
            if(this.rects[0][i].cellColor === 4 )
            {
                toprow.push(this.rects[0][i]); 
            }
            
        }
        let toprowlength = toprow.length; 
        let startingCellindex = Math.floor(Math.random() * (toprowlength-1)) ; 
        // define this metod in the constructer of the grid by initializing  as empty. 
        visited.push(toprow[startingCellindex]); 
        queue.enqueue(toprow[startingCellindex]); // picking a random red block from the top row .
        subgraph.push(toprow[startingCellindex]); 
        while(visited.length < this.siteNum) // THIS IS WRONG!!!!!!!!!*****************************************************************
        {   let neighborsListLength = queue.front().neighbors.length ; 
            for(var i = 0;i<neighborsListLength;i++)
            {
                if(queue.front().neighbors[i].x === 19) // if any of the child is on the bottom return true(it percolates)
                {
                    return true ; 
                }
                if(visited.includes(queue.front().neighbors[i]))// do nothing if visited is contains the child because it is the parent of current node .
                {
            
                }
                else if(!visited.includes(queue.front().neighbors[i]))
                {
                    visited.push(queue.front().neighbors[i]);
                    queue.enqueue(queue.front().neighbors[i]) ;
                }
            }
            
            queue.dequeue(); // delete the parent which  all the childs of it has bee traversed.
            
        }
        return false ; 
            
    }
    this.threshold = () => {
    let result  = this.openSiteNum / this.siteNum
    this.Threshold = result;  
    return this.Threshold;
    }

    this.deleteBlock = () => {
    // TODO: DELETE A CLOSED BLOCK FROM THE TOP ROW FIRSTLY
    // TODO: CREATE A LIST OF CELLS WHICH IS CLOSED . 
    let closed = [];  
    for(var i = 0;i<this.dimensionSize ; i++)
    {
        for(var j = 0;j<this.dimensionSize;j++)
        {
            if(this.rects[i][j].cellColor === 1 || this.rects[i][j].cellColor === 2 )
            {
                closed.push(this.rects[i][j]); 
            }
        }
    }
    // CLOSED IS FILLED 
    let closedSize = closed.length; 
    let randClosedIndex = Math.floor(Math.random() * (closedSize-1)) ; 
    closed[randClosedIndex].cellColor = 3 ; // OPENED THE CELL 
    this.connectNeighbor();
    }
    this.connectNeighbor = () => { /// THERE IS AN ISSUE WITH YOUR ALGORİTHM CHECK IT AFTER PROJECTS IS DONE
       let iter = 0; 
       while(iter<3)
       {
        for(var i = 0;i< this.dimensionSize ;i++)
        {
            for(var j = 0;j<this.dimensionSize ;j++)
            {
                if(this.rects[i][j].cellColor === 4) // IF IT IS COLOURFUL
                {
                    for(var m = 0;m < this.rects[i][j].neighbors.length;m++)
                    {
                        if(this.rects[i][j].neighbors[m].cellColor === 3)//  IF IT'S NEIGHBOR IS WHITE
                        {
                            this.rects[i][j].neighbors[m].cellColor = 4 ; 
                        }
                    }   
                   
                }
                
                else if(this.rects[i][j].cellColor === 3)
                {
                    for(var k = 0;k<this.rects[i][j].neighbors.length;k++)
                    {
                        if(this.rects[i][j].neighbors[k].cellColor === 4)
                        {
                            this.rects[i][j].cellColor = 4 ; 
                        }
                    }
                }
                
            }
        }
        iter++; 
        }
  
    }






    }
    
  
};
let grid = new Grid(colNum , width, height);
function setup()
{
    createCanvas(width , height) ;
    
    //TODO : // FILL THE NEIGHBORS LIST FOR EACH CELL.
    for(var i= 0;i<grid.dimensionSize ; i++)
    {
        for(var j = 0; j<grid.dimensionSize;j++)
        {
            if(i-1 >= 0)
            {
                grid.rects[i][j].neighbors.push(grid.rects[i-1][j]); 
            }   
            if(j-1 >= 0)
            {
                grid.rects[i][j].neighbors.push(grid.rects[i][j-1]);  
            }
            if(j+1 <= this.rowNum)
            {
                grid.rects[i][j].neighbors.push(grid.rects[i][j+1]); 
            }
            if(i+1 <= this.rowNum)
            {
                grid.rects[i][j].neighbors.push(grid.rects[i+1][j]); 
            }
        }
    }
    
    //TODO  : CHECK FOR CONNECTED COLOURFUL CELLS AND WHITE CELLS . 

   let randColourfulIndex = Math.floor(Math.random() * (grid.dimensionSize-1)); 
   grid.rects[0][randColourfulIndex].cellColor = 4 ; 
    grid.connectNeighbor(); 
    for(var i = 0; i<grid.dimensionSize;i++)
    {
        for(var j = 0;j<grid.dimensionSize; j++)
        {
            grid.rects[i][j].show(); 
        }
    }
}

function draw()
{
    if(!grid.doesPercolate())
    {
        grid.deleteBlock();  
        for(var i = 0;i<grid.dimensionSize;i++)
        {
            for(var j = 0;j<grid.dimensionSize;j++)
            {
                grid.rects[i][j].show(); 
            }            
        }
        grid.connectNeighbor(); 
        for(var i = 0;i<grid.dimensionSize;i++)
        {
            for(var j = 0;j<grid.dimensionSize;j++)
            {
                grid.rects[i][j].show(); 
            }            
        }
    }
    else if(grid.doesPercolate())
    {    
        for(var i = 0;i<grid.dimensionSize;i++)
        {
            for(var j = 0;j<grid.dimensionSize;j++)
            {
                grid.rects[i][j].show(); 
            }            
        }
        console.log(grid.threshold()); 
        console.log("Grid Percolates!"); 
        return ; 
    }
    
    
    

}
