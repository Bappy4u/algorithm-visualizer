data = [4, 8, 15, 16, 23, 15, 16, 23, 15, 16, 23, 15, 16, 23, 30];
var svgWidth = 500,
  svgHeight = 300,
  barPadding = 5;
var barWidth = svgWidth / data.length;

var svg = d3.selectAll("svg").attr("width", svgWidth).attr("height", svgHeight);

function chart(data) {
  var yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data)])
    .range([0, svgHeight]);

  var barChart = svg
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("y", function (d) {
      return svgHeight - yScale(d);
    })
    .attr("height", function (d) {
      return yScale(d);
    })
    .attr("width", barWidth - barPadding)
    .attr("transform", function (d, i) {
      var translate = [barWidth * i, 0];
      return "translate(" + translate + ")";
    })
    .style("fill", "steelblue");

  var text = svg
    .selectAll("text")
    .data(data)
    .enter()
    .append("text")
    .text(function (d, i) {
      return d;
    })
    .attr("y", function (d) {
      return svgHeight - d - 2;
    })
    .attr("x", function (d, i) {
      return barWidth * i + barWidth / data.length;
    });
}
chart(data);

data = [1, 2, 3, 4, 5, 6];
document.getElementById("sort").addEventListener("click", function () {
  chart(data);
});
