var data, svg, bandScale, text;
data = [];
for (var i = 0; i < 15; i++) {
  data.push(Math.floor(Math.random() * 100) + 1);
}
createChart();

function createChart() {
  svg = d3.select("#chart").append("svg");

  var h = 100,
    w = 800;

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
      return bandScale(d) + 5;
    })
    .attr("y", function (d) {
      var val = h - heightScale(d);
      if (val > 20) {
        return val;
      } else {
        return 50;
      }
    })
    .style("width", bandScale.bandwidth)
    .style("fill", "black")
    .style("font-size", w / data.length / 3)
    .style("font-family", "sans-serif")
    .style("z-index", 1);
}

document.getElementById("random-data").addEventListener("click", function () {
  data = [];
  for (var i = 0; i < 15; i++) {
    data.push(Math.floor(Math.random() * 100) + 1);
  }
  svg.remove();
  createChart();
});
function selectionSort() {
  const timer = (ms) => new Promise((res) => setTimeout(res, ms));
  async function sort() {
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
      if (data[i] != smallest) {
        temp = data[i];
        data[i] = smallest;
        data[pos] = temp;
        var smi = bandScale(smallest);
        svg.selectAll("rect").each(function (d, i) {
          console.log(d3.select(this).attr("height"));
          if (smi == d3.select(this).attr("height")) {
            console.log(smi);
          }
        });
        var swooshAudio = new Audio(
          "/algorithm-visualizer/sound-effects/swoosh.mp3"
        );
        swooshAudio.play();
      }
      sortAnimate(data);
      await timer(1000); // then the created Promise can be awaited
    }
    svg.selectAll("rect").style("fill", "green");
    var completeAudio = new Audio(
      "/algorithm-visualizer/sound-effects/complete.mp3"
    );
    completeAudio.play();
  }
  sort();
}

document
  .getElementById("selection-sort")
  .addEventListener("click", selectionSort);

function sortAnimate(data) {
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
  svg
    .transition()
    .duration(750)
    .selectAll("text")
    .attr("x", function (d) {
      return bandScale(d) + 5;
    });
}
