const fetchNeoData = async () => {
  const apiKey = "ZMLlAglkUNYoV2P0p505GatwW27jYv3uj32fKMe4";
  const startDateInput = document.getElementById("start-date").value;
  const endDateInput = document.getElementById("end-date").value;
  sessionStorage.setItem("startDate", startDateInput);
  sessionStorage.setItem("endDate", endDateInput);
  console.log(startDateInput, endDateInput);

  const apiURL = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDateInput}&end_date=${endDateInput}&api_key=${apiKey}`;
  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    console.log(data);
    const elementCount = document.getElementById("elementCount");
    elementCount.innerHTML = `<h4>Total NEO's: ${data.element_count}</h4>`;
    const neosContainer = document.getElementById("neos");
    const neoList = Object.values(data.near_earth_objects).flat();
    console.log(Object.values(data.near_earth_objects));
    console.log(Object.values(data.near_earth_objects).flat());
    neoList.forEach((neo) => {
      const cardClass = neo.is_potentially_hazardous_asteroid
        ? "bg-danger text-white"
        : "bg-light";
      const buttonClass = neo.is_potentially_hazardous_asteroid
        ? "btn-light"
        : "btn-outline-dark";
      const neoCard = `
      <div class="col mb-4">
      <div class="card h-100 ${cardClass} ">
      <div class="card-body d-flex flex-column align-items-center justify-content-center">
        <h5 class="card-title">${neo.name}</h5>
        <p class="card-text">${neo.id}</p>
        <a href="neo-details.html?id=${neo.id}" class="btn ${buttonClass}">Details</a>
      </div>
    </div>
    </div> 
      `;
      neosContainer.innerHTML += neoCard;
    });
  } catch (error) {
    console.error("Failed fetching data: ", error);
  }
};

const setApodBackground = async () => {
  const apiKey = "ZMLlAglkUNYoV2P0p505GatwW27jYv3uj32fKMe4";
  const apiURL = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    console.log(data);
    const imageContainer = document.getElementById("imageContainer").style;
    imageContainer.backgroundImage = `url(${data.hdurl})`;
    imageContainer.backgroundSize = "cover";
    imageContainer.width = "100%";
    imageContainer.height = "100dvh";
    imageContainer.position = "fixed";
    imageContainer.zIndex = "-1";
    imageContainer.top = "0";
  } catch (error) {
    console.error(error);
  }
};

const loadPreviousSelections = () => {
  const storedStartDate = sessionStorage.getItem("startDate")
  const storedEndDate = sessionStorage.getItem("endDate")

  if (storedStartDate && storedEndDate) {
    fetchNeoData()
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setApodBackground();
  loadPreviousSelections()
});
