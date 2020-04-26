// @TODO: YOUR CODE HERE!
var svgHeight = 500;
var svgWidth = 800;

var margin = {
  top: 10,
  right: 30,
  bottom: 50,
  left: 60
};

var chartHeight = svgHeight - margin.top - margin.bottom;
var chartWidth = svgWidth - margin.left - margin.right;

var svg = d3.select("#scatter").append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

 
d3.csv('assets/data/data.csv').then(function(allData) {
    // console.log(allData)
    allData.forEach(function(data) {
        data.healthcare = +data.healthcare;
        data.poverty = +data.poverty
    });

    var dataPoverty = allData.map(data => data.poverty);
    var dataHealthcare = allData.map(data => data.healthcare);

    var xScale = d3.scaleLinear()
        .domain([d3.min(dataPoverty)-1,d3.max(dataPoverty)+1])
        .range([0, chartWidth]);
    
    var yScale = d3.scaleLinear()
        .domain([d3.min(dataHealthcare)-1, d3.max(dataHealthcare)+1])
        .range([chartHeight, 0]);
                
    var yAxis = d3.axisLeft(yScale);
    var xAxis = d3.axisBottom(xScale);

    chartGroup.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(xAxis);
    chartGroup.append("g")
        .call(yAxis);
    
    // Axis Labels
    svg.append("text")
        .attr("class", "aText")
        .attr("text-anchor", "end")
        .attr("x", svgWidth/2)
        .attr("y", chartHeight + margin.top + 40)
        .text("In Poverty(%)");

    svg.append("text")
        .attr("class", "aText") 
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-90)")
        .attr("y", margin.left-40)
        .attr("x", margin.top-chartHeight/2)
        .text("Lacks Healthcare (%)")
    
    // var toolTip = d3.selectAll("#scatter").append("div")
    //    .attr("class", "d3-tip");

    // Scatter plot
    chartGroup.append("g").selectAll("dot")
        .data(allData)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return xScale(d.poverty); } )
        .attr("cy", function (d) { return yScale(d.healthcare); } )
        .attr("r", 15)
        .attr("class","stateCircle")
        // .on("mouseover", function(d) {
        // toolTip.style("display", "block");
        // toolTip.transition()
        //     .duration(200)
        //     .style("opacity", 1);
        // toolTip.html(d.state + "<br/> Poverty: " + d.poverty 
        // + "% <br/> Healthcare: " + d.healthcare +"%")
        //     .style("left", (d3.event.pageX) + "px")
        //     .style("top", (d3.event.pageY) + "px")
        // })
        // .on("mouseout", function(d) {
        //     toolTip.style("display", "none");
        //     toolTip.transition()
        //         .duration(500)
        //         .style("opacity", 0)
        
        // });
        
    chartGroup.append("g").selectAll("text")
        .data(allData)
        .enter()
        .append("text")
        .attr("class","stateText")
        .style("font", "12px sans-serif")
        .attr("dx", function (d) { return 0 }  )
        .text(function (d) { return d.abbr }  )
        .attr("x", function (d) { return xScale(d.poverty); } )
        .attr("y", function (d) { return yScale(d.healthcare); } )
        // .on("mouseover", function(d) {
        //     toolTip.style("display", "block");
        //     toolTip.transition()
        //         .duration(200)
        //         .style("opacity", 1);
        //     toolTip.html(d.state + "<br/> Poverty: " + d.poverty 
        //     + "% <br/> Healthcare: " + d.healthcare +"%")
        //         .style("left", (d3.event.pageX) + "px")
        //         .style("top", (d3.event.pageY) + "px")
        //     })
        //     .on("mouseout", function(d) {
        //         toolTip.style("display", "none");
        //         toolTip.transition()
        //             .duration(500)
        //             .style("opacity", 0)
            
        //     });
 
}).catch(function(error) {
    console.log(error);
  });