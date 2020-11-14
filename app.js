const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieselect = document.getElementById("movie");
let ticketprice = +movieselect.value;

populateUI();

// save selected movie index and price

function setmoviedata(movieindex, movieprice) {
  localStorage.setItem("selectMovieIndex", movieindex);
  localStorage.setItem("selectedMoviePrice", movieprice);
}

function updateselectedcount() {
  const slectedseat = document.querySelectorAll(".row .seat.selected");
  const slectedseatcount = slectedseat.length;
  count.innerText = slectedseatcount;
  total.innerText = slectedseatcount * ticketprice;

  // save in local sotrage
  const seatsindex = [...slectedseat].map(function (seat) {
    return [...seats].indexOf(seat);
  });

  localStorage.setItem("slectedSeats", JSON.stringify(seatsindex));
}

// get data from LS and populate UI

function populateUI() {
  const selectedseats = JSON.parse(localStorage.getItem("slectedSeats"));

  if (selectedseats !== null && selectedseats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedseats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectMovieIndex = localStorage.getItem("selectMovieIndex");

  if (selectMovieIndex !== null) {
    movieselect.slectedIndex = selectMovieIndex;
  }
}

movieselect.addEventListener("change", function (e) {
  ticketprice = +e.target.value;
  setmoviedata(e.target.slectedIndex, e.target.value);
  updateselectedcount();
});

container.addEventListener("click", function (e) {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");

    updateselectedcount();
  }
});
