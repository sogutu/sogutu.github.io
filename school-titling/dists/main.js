/*=========================================================================================
        Initialising Map 
=========================================================================================*/ 
var map = L.map('map').setView([0.5,35.3], 10);
map.zoomControl.setPosition('topleft');

/*=========================================================================================
        Adding basemap - OSM Tiled Layer 
==========================================================================================*/
var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

/*=========================================================================================
        Icon Marker
========================================================================================== */
var myIcon = L.icon({
    iconUrl: './lib/img/school.png',
    iconSize: [40, 40],
})

/*=========================================================================================
        Loading geoJSON Data 
===========================================================================================*/
var marker = L.markerClusterGroup();
var PPri = L.geoJSON(pprimary, {
    onEachFeature: function(feature, layer) {
        layer.bindPopup(feature.properties.school_nam)
    },
    style: {
        fillColor: 'green',
    }
});
PPri.addTo(marker);
    //marker.addTo(map); 

var SCounties = L.geoJSON(subcounties, {
    onEachFeature: function(feature, layer) {
        layer.bindPopup(feature.properties.CONSTITUEN)
    }
});
//SCounties.addTo(map);

var marker2 = L.markerClusterGroup();
var PSec = L.geoJSON(secschools, {
    onEachFeature: function(feature, layer) {
        layer.bindPopup(feature.properties.SCHOOL_NAM)
    }
});
PSec.addTo(marker2);
//marker2.addTo(map);

var marker3 = L.markerClusterGroup();
var after2016 = L.geoJSON(ta2016, {
    onEachFeature: function(feature, layer) {
        layer.bindPopup(feature.properties.SCHOOL_NAM)
    }
});
after2016.addTo(marker3);
marker3.addTo(map);

var marker4 = L.markerClusterGroup();
var before2016 = L.geoJSON(tb2016, {
    onEachFeature: function(feature, layer) {
        layer.bindPopup(feature.properties.SCHOOL_NAM)
    }
});
before2016.addTo(marker4);
//marker4.addTo(map);

/*============================================================================================
        Layer Control
============================================================================================== */
var baseMaps = {
"OSM": osm
};
var overlayMaps = {
    "Primary Schools": marker,
    "Sec Schools": marker2,
    "Title Issued After 2016": marker3,
    "Title Issued Before 2016": marker4,
    "Sub Counties": SCounties
};

L.control.layers(baseMaps, overlayMaps, {collapsed: true, position: 'topright'}).addTo(map);