var apiKey = "pk.eyJ1IjoibmVsc29ubWF1IiwiYSI6ImNqNnhhNXFrMzFyZTEyeGxwcmd2Z2J2dHQifQ.vIgELGdEcZ6EMTDKIXcWMg";
L.mapbox.accessToken = apiKey;

var map = L.mapbox.map('map', 'mapbox.streets')
    .setView([39.3, 9], 8);

// carico i dati e li aggiungo sulla mappa
// dati da https://docs.google.com/spreadsheets/d/1xnVi1UjRAd50idDmXtKcYv-UxNWAE-rHL8qJeF3ef5o/edit#gid=0
var gsheetSource = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRj_8QPjxAq9VDaTvU1xbR9ZSJls4pLY9jN0itafpMuqXgMT05oGNHeGG8bab1cTZF7_G_dL57AvB49/pub?gid=0&single=true&output=csv';
var skyData = omnivore.csv(gsheetSource, null, L.mapbox.featureLayer()).addTo(map);


// associo ai dati l'apertura della modale
skyData.on('click', function(e) {
  // Force close the popup.// ma in realtà c'è un display none perché Leaflet non consente di disabilitare il popup...
  e.layer.closePopup();

  var feature = e.layer.feature;
  var title = feature.properties.Titolo;
  var place = feature.properties.Comune;
  // var date = feature.properties.Data;
  var content = feature.properties.Descrizione;
  var sommario = feature.properties.Autori;

  // Modal Content
  $("#marker_title").html(title);
  $("#marker_place").html("<i class='fa fa-map-marker' aria-hidden='true'></i> " + place + " - <i class='fa fa-calendar' aria-hidden='true'></i> ");
  $("#marker_content").html(sommario + "<br><br>" + content);
//  $("#marker_contacts").html("<i class='fa fa-address-card' aria-hidden='true'></i> " + email + " | " + website);
  $('#exampleModal').modal('show');
});