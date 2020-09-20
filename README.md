# PercolationTheory
Percolation Theory is a problem under the Graph Theory researches. <br /> 
In statistical physics and mathematics, percolation theory describes the behavior of a network when nodes or links are removed.
<br /> 
<br /> 
# Setup
In this project we have a NxN grid initialized with open sites(white blocks), closed sites(black blocks), and one random open site with water in it(coloured blue).
<br />
# Program Flow 
In every frame time, a random closed site is opened and program checks whether water percolates towards bottom of the grid. <br / > 
doesPercolate() function establish this process. <br /> 
If it returns true, program (open site numbers / total site numbers) is pushed to a threshold array. 
<br /> 
<br /> 
By repeating this computation experiment T times and averaging the results, we obtain a more accurate estimate of the percolation threshold. Let xt be the fraction of open sites in computational experiment t. The sample mean x¯¯¯
provides an estimate of the percolation threshold; the sample standard deviation s; measures the sharpness of the threshold. 

