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
  unsortedColor = "#add8e6",
  sortedColor = "#56b4d3",
  isSorting = false,
  isSorted = false;

// generating random data
var data = randomData(maxElement, dataRange);
function setSpeed() {
  time = document.getElementById("speed").value;
}
//a d3 function for scaling height for all the data this function
var heightScale = d3
  .scaleLinear()
  .domain([0, d3.max(data)])
  .range([0, areaHeight]);

// initialized a chart with random value
createChart(data);

const selectionS = {
  selectionSort() {
    const timer = (ms) => new Promise((res) => setTimeout(res, ms));

    async function sort(self) {
      for (let i = 0; i < data.length; i++) {
        if (self.abort) {
          self.abort = false;
          return;
        }
        smallest = data[i];
        pos = i;
        changeBarColor(smallest, smallestColor);
        await timer(time);
        for (var j = i + 1; j < data.length; j++) {
          if (self.abort) {
            self.abort = false;
            return;
          }
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

          var swooshAudio = new Audio("./sound-effects/swoosh.mp3");
          swooshAudio.play();
        }
        changeBarColor(smallest, sortedColor);
        swapBar(data);
        await timer(time); // then the created Promise can be awaited
      }
      svg.selectAll("rect").style("fill", "#56b4d3");
      var completeAudio = new Audio("./sound-effects/complete.mp3");
      completeAudio.play();
      isSorting = false;
      isSorted = true;
      togglePlay();
    }

    sort(this);
  },

  selectionSortStop() {
    this.abort = true;
    isSorting = false;
  },
};

const bubbleS = {
  bubbleSort() {
    const timer = (ms) => new Promise((res) => setTimeout(res, ms));

    async function sort(self) {
      var temp;
      for (let i = 0; i < data.length - 1; i++) {
        if (self.abort) {
          self.abort = false;
          return;
        }

        changeBarColor(data[0], smallestColor);
        await timer(time);
        for (j = 0; j < data.length - i - 1; j++) {
          if (self.abort) {
            self.abort = false;
            changeBarColor(data[j], unsortedColor);
            return;
          }
          await timer(time);
          changeBarColor(data[j + 1], traverseColor);
          await timer(time);
          if (data[j] > data[j + 1]) {
            temp = data[j];
            data[j] = data[j + 1];
            data[j + 1] = temp;
            changeBarColor(data[j + 1], smallestColor);
            var swooshAudio = new Audio("./sound-effects/swoosh.mp3");
            swooshAudio.play();
            swapBar(data);
            await timer(time);
          } else {
            changeBarColor(data[j + 1], smallestColor);
          }
          changeBarColor(data[j], unsortedColor);
        }
        changeBarColor(data[j], sortedColor);
      }
      svg.selectAll("rect").style("fill", "#56b4d3");
      var completeAudio = new Audio("./sound-effects/complete.mp3");
      completeAudio.play();
      isSorting = false;
      isSorted = true;
      togglePlay();
    }

    sort(this);
  },

  bubbleSortStop() {
    this.abort = true;
    isSorting = false;
  },
};

function stopSorting() {
  const stopBubbleSort = bubbleS.bubbleSortStop.bind(bubbleS);
  const stopSelectionSort = selectionS.selectionSortStop.bind(selectionS);
  if (running == "bubble") {
    stopBubbleSort();
  } else if (running == "selection") {
    stopSelectionSort();
  }
}
function startSorting() {
  if (getAlgo() == "bubble-sort") {
    const bubbleSortStarted = bubbleS.bubbleSort.bind(bubbleS);
    running = "bubble";
    bubbleSortStarted();
  } else if (getAlgo() == "selection-sort") {
    const selectionSortStarted = selectionS.selectionSort.bind(selectionS);
    running = "selection";
    selectionSortStarted();
  }
}

document.getElementById("sort").addEventListener("click", function () {
  isSorting = true;
  startSorting();
  togglePlay();
});

document.getElementById("stop").addEventListener("click", function () {
  if (isSorting) {
    stopSorting();
    togglePlay();
  }
});

document.getElementById("random-data").addEventListener("click", function () {
  if (isSorting) {
    stopSorting();
    togglePlay();
  }
  if (isSorted) {
    isSorted = false;
    document.getElementById("sort").classList.remove("none");
  }
  svg.remove();
  var data = randomData(maxElement, dataRange);
  createChart(data);
});
