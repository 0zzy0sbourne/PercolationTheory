# PercolationTheory
Percolation Theory is a problem under the __Graph Theory__ researches. <br /> 
In statistical physics and mathematics, percolation theory describes the behavior of a network when nodes or links are removed.
<br /> 
<br /> 
# Setup
In this project we have a NxN grid initialized with open sites(white blocks), closed sites(black blocks), and one random open site with water in it(coloured blue).
<br />
<br /> 
# Program Flow 
In every frame time, a random closed site is opened and program checks whether water percolates towards bottom of the grid. <br / > 
__doesPercolate()__ function establish this process. <br /> 
If it returns true, program __(open site numbers / total site numbers)__ is pushed to a threshold array. 
<br /> 
<br /> 
By repeating this computation experiment T times and averaging the results, we obtain a more accurate estimate of the percolation threshold. Let __xt__ be the fraction of open sites in computational experiment __t__. The sample mean __x¯¯¯__
provides an estimate of the __Percolation Threshold__; the sample standard deviation __s__; measures the __sharpness of the threshold__. 
<br /> 
Finally we can find the __Confidence Interval__ and plot the threshold function as __Sigmoid Function__ .

