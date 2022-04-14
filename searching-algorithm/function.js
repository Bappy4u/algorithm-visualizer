var svg,
  bandScale,
  text,
  maxElement = 15,
  dataRange = maxElement * 2,
  areaHeight = 250,
  areaWidth = 800,
  time = 300,
  traverseColor = "#ffcaa1",
  smallestColor = "#ab87ff",
  unsortedColor = "#add8e6",
  sortedColor = "green",
  isSorting = false,
  isFound = false;

var swooshAudio = new Audio("./../sound-effects/swoosh.mp3");
var completeAudio = new Audio("./../sound-effects/complete.mp3");
swooshAudio.volume = 0.3;
completeAudio.volume = 0.3;

// generating random data
var data = randomData(maxElement, dataRange);
function setSpeed() {
  time = 1000 - document.getElementById("speed").value;
}
//a d3 function for scaling height for all the data this function
var heightScale = d3
  .scaleLinear()
  .domain([0, d3.max(data)])
  .range([0, areaHeight]);

// initialized a chart with random value
createChart(data);

const SearchAlgo = {
  liearSearch() {
    // promise for async bubble sort with delay

    const timer = (ms) => new Promise((res) => setTimeout(res, ms));
    // async function for bubble sort

    async function search(self) {
      var temp;
      for (let i = 0; i < data.length - 1; i++) {
        // If user click on stop button then this function will stop performing here.

        // changing initial smallest bar color
        await timer(time);
        changeBarColor(data[i], traverseColor);
        console.log(data[i]);
        await timer(time);
        console.log("Searching");

        if (data[i] == target) {
          changeBarColor(data[i], sortedColor);
          console.log("found");
          await timer(time);
          break;
        }
      }

      // after complete sorting complete making all the bar green and playing complete sound effects

      completeAudio.play();
      isSorting = false;
      isFound = true;
    }

    // calling async function here
    search(this);
  },

  binarySearch() {
    // promise for async bubble sort with delay

    const timer = (ms) => new Promise((res) => setTimeout(res, ms));
    // async function for bubble sort

    async function search(self) {
      console.log(target);
      let l = 0,
        r = data.length - 1,
        mid;
      while (l <= r) {
        // If user click on stop button then this function will stop performing here.
        mid = (l + r) / 2;
        await timer(time);
        changeBarColor(data[mid], traverseColor);
        if (data[mid] == target) {
          changeBarColor(data[mid], sortedColor);
          isFound = true;
          let text = target + " Found at position " + (mid + 1);
          document.getElementById("foundNotice").innerHTML = text;
          await timer(time);
          break;
        } else if (data[mid] < target) {
          l = mid + 1;
        } else {
          r = mid - 1;
        }
        // changing initial smallest bar color

        await timer(time);
      }
      if (!isFound) {
        document.getElementById("foundNotice").innerHTML =
          target + " doesn't exist.";
      }

      // after complete sorting complete making all the bar green and playing complete sound effects

      completeAudio.play();
      isSorting = false;
    }

    // calling async function here
    search(this);
  },
};

function startSearching() {
  let algo = document.getElementById("get-algo").value;
  if (algo == "linear-search") {
    const linearSearchStarted = SearchAlgo.liearSearch.bind(SearchAlgo);
    linearSearchStarted();
  } else if (algo == "binary-search") {
    const binarySearchStarted = SearchAlgo.binarySearch.bind(SearchAlgo);
    binarySearchStarted();
  } else if (algo == "merge-sort") {
    const mergeSortStarted = SortAlgo.mergeSort.bind(SortAlgo);
    mergeSortStarted();
  }
}

document.getElementById("search").addEventListener("click", function () {
  target = parseInt(document.getElementById("targetValue").value);

  if (isNaN(target)) {
    alert("Please enter a valid number");
  } else {
    startSearching();
  }
});

document.getElementById("random-data").addEventListener("click", function () {
  svg.remove();
  var data = randomData(maxElement, dataRange);
  createChart(data);
});

document.getElementById("sound").addEventListener("click", function () {
  if (this.classList.contains("line-through")) {
    swooshAudio.volume = 0.3;
    completeAudio.volume = 0.3;
  } else {
    swooshAudio.volume = 0;
    completeAudio.volume = 0;
  }
  this.classList.toggle("line-through");
});
