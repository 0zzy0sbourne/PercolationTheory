let width = 600; 
let height = 600;
let colNum = 20 ; 

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
        else if(this.cellColor === 4)
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
     
    }
  };
  Grid.prototype.openSiteCalc = function(){
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

  }; 
  Grid.prototype.threshold = function() {
    let result  = this.openSiteNum / this.siteNum
    this.Threshold = result;  
    return this.Threshold;  
  };
Grid.prototype.doesPercolate = function(){
let currentNodes = []; 
for(var i = 0 ;i < this.dimensionSize; i++)
{
    if(this.rects[0][i].cellColor === 4)
    {
        currentNodes.push(this.rects[0][i])
    }
   
}








}; 
Grid.prototype.deleteBlock= function(){ // TODO: DELETE A CLOSED BLOCK FROM THE TOP ROW FIRSTLY
    let openAndColourful = this.openSiteCalc() ;  
    if(openAndColourful != 0 )
    {
        let xpos = Math.floor(Math.random() * 19) ; 
        let ypos =  Math.floor(Math.random() *19); 
        this.rects[xpos][ypos].cellColor = 4; 
    }
    else {
        let randTopCell = Math.floor(Math.random() * 19)  ; //0-19 INTERVAL (FOR INDEXES) 
        this.rects[0][randTopCell].cellColor = 4 ;  
    }

};
Grid.prototype.connectNeighbor = function(){
    for(var i = 0;i< this.dimensionSize ;i++)
    {
        for(var j = 0;j<this.dimensionSize ;j++)
        {
            if(this.rects[i][j].cellColor === 4) // IF IT IS COLOURFUL
            {
            
                for(const neighbor in this.rects[i][j].neighbors)
                {
                    if(neighbor.cellColor === 3 ) //  IF IT'S NEIGHBOR IS WHITE
                    {
                        neighbor.cellColor = 4 ; 
                    }
                }
            }
        }
    }

}; 

 
    
    
function setup()
{
    createCanvas(width , height) ;
    let grid = new Grid(colNum , width, height);
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
        grid.connectNeighbor(); 
    }
    else if(grid.doesPercolate())
    {   
        console.log(grid.threshold()); 
        console.log("Grid Percolates!"); 
        return ; 
    }
    
    
    

}