import { Component, OnInit } from '@angular/core';
import { latLng,  tileLayer } from 'leaflet';
import { velocityLayer } from 'leaflet-velocity'
import * as $ from 'jquery';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})

export class MapComponent implements OnInit{
  streetMaps = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    detectRetina: true,
    attribution: '&amp;copy; &lt;a href="https://www.openstreetmap.org/copyright"&gt;OpenStreetMap&lt;/a&gt; contributors'
  });
  wMaps = tileLayer('http://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', {
    detectRetina: true,
    attribution: '&amp;copy; &lt;a href="https://www.openstreetmap.org/copyright"&gt;OpenStreetMap&lt;/a&gt; contributors'
  });

  Esri_WorldStreetMap = tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
    detectRetina: true,
	  attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
  });

  layersControl = {
    baseLayers: {
      'Street Maps': this.streetMaps,
      'Wikimedia Maps': this.wMaps,
      'ESRI Maps': this.Esri_WorldStreetMap
    }
  };

  options = {
    layers: this.streetMaps,
    zoom: 5,
    center: latLng([ -22,  150 ])
  };

  ngOnInit():void{
    $.getJSON("wind-gbr.json", function(data) {
      var velocity_layer = velocityLayer({
        displayValues: true,
        displayOptions: {
          velocityType: "GBR Wind",
          displayPosition: "bottomleft",
          displayEmptyString: "No wind data"
        },
        data: data,
        maxVelocity: 10
      });
      //TODO: ADD OVERLAY. Doen't work. Try [leafletLayersControlOptions]
      this.layersControl.addOverlay(velocity_layer, "Wind Velocity Layer")
    });
  }
}
