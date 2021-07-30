var data = [23, 15, 16, 8, 5, 4, 19, 22];
var svg, bandScale;

function createChart() {
  svg = d3.select("#chart").append("svg");

  var h = 100,
    w = 500;

  //var bandWidth = w / data.length - 1;

  bandScale = d3.scaleBand().domain(data).range([0, w]).padding(0.1);
  var heightScale = d3
    .scaleLinear()
    .domain([0, d3.max(data)])
    .range([0, h]);

  svg.attr("width", w).attr("height", h);

  svg
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", function (d, i) {
      return bandScale(d);
    })
    .attr("y", function (d) {
      return h - heightScale(d);
    })
    .attr("width", function () {
      return bandScale.bandwidth();
    })
    .attr("height", function (d) {
      return heightScale(d);
    })
    .style("fill", "steelblue");
}
createChart();

function change() {
  /* var sortComparer;
  sortComparer = function (a, b) {
    return b - a;
  };

  data.sort(sortComparer);
  console.log(data);
  var dOrder = data.map(function (d) {
    return d;
  });
  */

  const timer = (ms) => new Promise((res) => setTimeout(res, ms));
  async function selectionSort() {
    // We need to wrap the loop into an async function for this to work
    for (var i = 0; i < data.length; i++) {
      smallest = data[i];
      pos = i;
      for (var j = i + 1; j < data.length; j++) {
        if (smallest > data[j]) {
          smallest = data[j];
          pos = j;
        }
      }
      temp = data[i];
      data[i] = smallest;
      data[pos] = temp;
      var dOrder = data.map(function (d) {
        return d;
      });
      bandScale.domain(dOrder);
      svg
        .transition()
        .duration(750)
        .selectAll("rect")
        .attr("x", function (d) {
          return bandScale(d);
        });
      await timer(1000); // then the created Promise can be awaited
    }
    svg.selectAll("rect").style("fill", "blue");
    alert("Sorted");
  }
  selectionSort();
}

d3.select("button").on("change", change);

document.getElementById("selection-sort").addEventListener("click", change);

var theRandomNumber = Math.floor(Math.random() * 10) + 1;

console.log(theRandomNumber);
