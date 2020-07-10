
const populateSeasonSelector = () => {
  seasonSelector = $('#seasonSelected');
  // Cheat for functionality like python's range() function and map over.
  seasons = [...Array(20).keys()].map(num => { return 2020 - num });
  seasons.forEach(season => {
    seasonOption = `<option value='${season}'>${season}</option>`;
    seasonSelector.append(seasonOption);
  });
};

const loadData = () => {
  selectedSeason = $('#seasonSelected').val();
  apiURL = `http://ergast.com/api/f1/${selectedSeason}/driverStandings.json`;
  $.getJSON(apiURL, ( data ) => {
    dataTableBody = $('#dataTableBody');
    dataTableBody.empty();
    data.MRData.StandingsTable.StandingsLists[0].DriverStandings.forEach( item => {
      
      // destructure driver object for simplicity
      let { familyName, givenName, nationality, url } = item.Driver;
      
      driverTableRow = `
        <tr>
          <td>${item.position}</td>
          <td><a href="${url}">${givenName} ${familyName}</a></td>
          <td>${item.points}</td>
          <td>${item.wins}</td>
          <td>${nationality}</td>
          <td>${item.Constructors[0].name}</td>
        </tr>
      `; // end of driverTableRow interpolated string
      dataTableBody.append(driverTableRow);
    });
  });
}

// Populate the season selector with season numbers
populateSeasonSelector();

// handle request for season data
$('#loadDataButton').click(loadData);