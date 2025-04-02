const fetchNeoDetails = async () => {
  const apiKey = "ZMLlAglkUNYoV2P0p505GatwW27jYv3uj32fKMe4";
  const urlParams = new URLSearchParams(window.location.search);
  const neoId = urlParams.get("id");
  console.log(neoId);
  const apiURL = `https://api.nasa.gov/neo/rest/v1/neo/${neoId}?api_key=${apiKey}`;

  try {
    const response = await fetch(apiURL);
    const neoData = await response.json();
    console.log(neoData);
    document.getElementById("neoTitle").textContent = `Name: ${neoData.name}`;
    document.getElementById(
      "neoDate"
    ).textContent = `Close Approach Date: ${neoData.close_approach_data[0].close_approach_date}`;
    document.getElementById(
      "neoSize"
    ).textContent = `Estimated Diameter: ${neoData.estimated_diameter.kilometers.estimated_diameter_max} - ${neoData.estimated_diameter.kilometers.estimated_diameter_min}`;

    if (neoData.is_potentially_hazardous_asteroid) {
      document.body.style.backgroundImage =
        "url('https://c02.purpledshub.com/uploads/sites/41/2023/09/asteroid-bennuu.jpg?w=1029&webp=1')";
    } else {
      document.body.style.backgroundImage =
        "url('https://www-cdn.eumetsat.int/files/2022-03/earth-space.jpg')";
    }
  } catch (error) {
    console.error(error)
  }

  document.body.style.backgroundSize = "cover"
  document.body.style.backgroundRepeat = "no-repeat"
};

fetchNeoDetails();
