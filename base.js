//get selected algorithm
function getAlgo() {
  algo = document.getElementById("get-algo").value;
  return algo;
}

// function for changing specific bar color filtering with data
// d => single data, color => hexa color code
function changeBarColor(d, color) {
  var smi = heightScale(d);
  svg.selectAll("rect").each(function (d, i) {
    if (smi == d3.select(this).attr("height")) {
      d3.select(this).style("fill", color);
    }
  });
}

// function for generating random data
function randomData(max, range) {
  data = [];
  n = 0;
  while (n < max) {
    d = Math.floor(Math.random() * range) + 1;
    if (data.includes(d) != true) {
      data.push(d);
      n++;
    }
  }
  return data;
}

//function for creating chart. Note: data is an array of integer value
function createChart(data) {
  svg = d3.select("#chart").append("svg");

  bandScale = d3.scaleBand().domain(data).range([0, areaWidth]).padding(0.1);

  svg.attr("width", areaWidth).attr("height", areaHeight);

  svg
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", function (d, i) {
      return bandScale(d);
    })
    .attr("y", function (d) {
      return areaHeight - heightScale(d);
    })
    .attr("width", function () {
      return bandScale.bandwidth();
    })
    .attr("height", function (d) {
      return heightScale(d);
    })
    .style("fill", "rgb(173, 216, 230)");

  svg
    .selectAll("text")
    .data(data)
    .enter()
    .append("text")
    .text(function (d) {
      return d;
    })
    .attr("x", function (d, i) {
      return bandScale(d) + 10;
    })
    .attr("y", function (d) {
      return areaHeight - 15;
    })
    .style("width", bandScale.bandwidth())
    .style("fill", "black")
    .style("font-size", areaWidth / data.length / 3)
    .style("font-family", "sans-serif")
    .style("z-index", 1);
}

// bar visualization while sorting. Bar Swapping
function swapBar(data) {
  bandScale.domain(data);
  svg
    .transition()
    .duration(750)
    .selectAll("rect")
    .attr("x", function (d) {
      return bandScale(d);
    });
  svg
    .transition()
    .duration(750)
    .selectAll("text")
    .attr("x", function (d) {
      return bandScale(d) + 10;
    });
}

function togglePlay() {
  var sortElement = document.getElementById("sort");
  var stopElement = document.getElementById("stop");
  if (isFound) {
    sortElement.classList.add("none");
    stopElement.classList.add("none");
  } else {
    sortElement.classList.toggle("none");
    stopElement.classList.toggle("none");
  }
}
