var apiKey = "pk.eyJ1IjoibmVsc29ubWF1IiwiYSI6ImNqNnhhNXFrMzFyZTEyeGxwcmd2Z2J2dHQifQ.vIgELGdEcZ6EMTDKIXcWMg";
L.mapbox.accessToken = apiKey;

var map = L.mapbox.map('map', 'mapbox.streets')
    .setView([40, 9], 8);

// carico i dati e li aggiungo sulla mappa
// dati da https://docs.google.com/spreadsheets/d/1YdY0TASPL_hLWt2P9-LsNMK59IKMatWOOX1G7V1NWgw/edit#gid=0
var gsheetSource = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ53_TTsmwPXyzPeDbMgbU-Mn0A4PAw0u3XIrgyNOouHZ85_tIK-cCc01zgEU3Azyi372ky1jPIPnvw/pub?gid=0&single=true&output=csv';
var skyData = omnivore.csv(gsheetSource, null, L.mapbox.featureLayer()).addTo(map);


// associo ai dati l'apertura della modale
skyData.on('click', function(e) {
  // Force close the popup.// ma in realtà c'è un display none perché Leaflet non consente di disabilitare il popup...
  e.layer.closePopup();

  var feature = e.layer.feature;
  var title = feature.properties.Titolo;
  var place = feature.properties.Località;
  var date = feature.properties.Data;
  var content = feature.properties.Contenuto;
  var sommario = feature.properties.Sommario;

  // Modal Content
  $("#marker_title").html(title);
  $("#marker_place").html("<i class='fa fa-map-marker' aria-hidden='true'></i> " + place + " - <i class='fa fa-calendar' aria-hidden='true'></i> "+ date);
  $("#marker_content").html(sommario + "<br><br>" + content);
//  $("#marker_contacts").html("<i class='fa fa-address-card' aria-hidden='true'></i> " + email + " | " + website);
  $('#exampleModal').modal('show');
});
