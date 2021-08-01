var svg,
  bandScale,
  text,
  maxElement = 15,
  dataRange = maxElement * 2,
  areaHeight = 150,
  areaWidth = 800,
  time = 300,
  traverseColor = "#ffcaa1",
  smallestColor = "#ab87ff",
  unsortedColor = "#add8e6";

// generating random data
var data = randomData(maxElement, dataRange);

//a d3 function for scaling height for all the data this function
var heightScale = d3
  .scaleLinear()
  .domain([0, d3.max(data)])
  .range([0, areaHeight]);

// initialized a chart with random value
createChart(data);

let Sort = new sortData(data);
Sort.selectionSort = function () {
  const timer = (ms) => new Promise((res) => setTimeout(res, ms));
  async function sort() {
    // We need to wrap the loop into an async function for this to work
    for (var i = 0; i < data.length; i++) {
      smallest = data[i];
      pos = i;
      changeBarColor(smallest, smallestColor);
      await timer(time);
      for (var j = i + 1; j < data.length; j++) {
        changeBarColor(data[j], traverseColor);
        if (smallest > data[j]) {
          await timer(time);
          changeBarColor(smallest, unsortedColor);
          smallest = data[j];
          pos = j;
        }

        changeBarColor(smallest, smallestColor);
        await timer(time);
        changeBarColor(data[j], unsortedColor);
      }
      if (data[i] != smallest) {
        temp = data[i];
        data[i] = smallest;
        data[pos] = temp;

        var swooshAudio = new Audio(
          "/algorithm-visualizer/sound-effects/swoosh.mp3"
        );
        swooshAudio.play();
      }
      changeBarColor(smallest, "#56b4d3");
      swapBar(data);
      await timer(time); // then the created Promise can be awaited
    }
    svg.selectAll("rect").style("fill", "#56b4d3");
    var completeAudio = new Audio(
      "/algorithm-visualizer/sound-effects/complete.mp3"
    );
    completeAudio.play();
  }
  sort();
};

Sort.bubbleSort = function () {
  const timer = (ms) => new Promise((res) => setTimeout(res, ms));
  async function sort() {
    var temp;
    for (i = 0; i < data.length - 1; i++) {
      changeBarColor(data[0], smallestColor);
      await timer(time);
      for (j = 0; j < data.length - i - 1; j++) {
        await timer(time);
        changeBarColor(data[j + 1], traverseColor);
        await timer(time);
        if (data[j] > data[j + 1]) {
          temp = data[j];
          data[j] = data[j + 1];
          data[j + 1] = temp;
          changeBarColor(data[j + 1], smallestColor);

          swapBar(data);
          await timer(time);
        } else {
          changeBarColor(data[j + 1], smallestColor);
        }
        changeBarColor(data[j], unsortedColor);
      }
    }
    svg.selectAll("rect").style("fill", "#56b4d3");
    var completeAudio = new Audio(
      "/algorithm-visualizer/sound-effects/complete.mp3"
    );
    completeAudio.play();
  }
  sort();
};

document.getElementById("sort").addEventListener("click", function () {
  if (getAlgo() == "selection-sort") {
    Sort.selectionSort();
  } else if (getAlgo() == "bubble-sort") {
    Sort.bubbleSort();
  }
});

document.getElementById("random-data").addEventListener("click", function () {
  var data = randomData(maxElement, dataRange);
  svg.remove();
  createChart(data);
});
