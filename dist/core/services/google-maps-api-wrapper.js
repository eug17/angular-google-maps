import { Injectable, NgZone } from "@angular/core";
import { Observable } from "rxjs/Observable";
import * as mapTypes from "./google-maps-types";
import { MapsAPILoader } from "./maps-api-loader/maps-api-loader";
/**
 * Wrapper class that handles the communication with the Google Maps Javascript
 * API v3
 */
var GoogleMapsAPIWrapper = (function () {
    function GoogleMapsAPIWrapper(_loader, _zone) {
        var _this = this;
        this._loader = _loader;
        this._zone = _zone;
        this._trafficLayerExist = false;
        this._map = new Promise(function (resolve) {
            _this._mapResolver = resolve;
        });
    }
    GoogleMapsAPIWrapper.prototype.createMap = function (el, mapOptions) {
        var _this = this;
        return this._loader.load().then(function () {
            var map = new google.maps.Map(el, mapOptions);
            _this._mapResolver(map);
            return;
        });
    };
    GoogleMapsAPIWrapper.prototype.setMapOptions = function (options) {
        this._map.then(function (m) {
            m.setOptions(options);
        });
    };
    /**
     * Creates a google map marker with the map context
     */
    GoogleMapsAPIWrapper.prototype.createMarker = function (options) {
        if (options === void 0) { options = {}; }
        return this._map.then(function (map) {
            options.map = map;
            return new google.maps.Marker(options);
        });
    };
    GoogleMapsAPIWrapper.prototype.createInfoWindow = function (options) {
        return this._map.then(function () {
            return new google.maps.InfoWindow(options);
        });
    };
    /**
     * Creates a google.map.Circle for the current map.
     */
    GoogleMapsAPIWrapper.prototype.createCircle = function (options) {
        return this._map.then(function (map) {
            options.map = map;
            return new google.maps.Circle(options);
        });
    };
    GoogleMapsAPIWrapper.prototype.createPolyline = function (options) {
        return this.getNativeMap().then(function (map) {
            var line = new google.maps.Polyline(options);
            line.setMap(map);
            return line;
        });
    };
    GoogleMapsAPIWrapper.prototype.createPolygon = function (options) {
        if (options.paths && !Array.isArray(options.paths)) {
            try {
                options.paths = JSON.parse(options.paths);
            }
            catch (e) {
                options.paths = [];
            }
        }
        return this.getNativeMap().then(function (map) {
            var polygon = new google.maps.Polygon(options);
            polygon.setMap(map);
            return polygon;
        });
    };
    GoogleMapsAPIWrapper.prototype.getLibraries = function () {
        var _this = this;
        return new Promise(function (resolve) {
            resolve(_this._loader.getLibraries());
        });
    };
    GoogleMapsAPIWrapper.prototype.attachDrawingManager = function (controlPosition, drawingModes, polygonOptions, circleOptions, markerIcon) {
        var _this = this;
        if (controlPosition === void 0) { controlPosition = 9; }
        if (drawingModes === void 0) { drawingModes = ["polygon"]; }
        if (markerIcon === void 0) { markerIcon = null; }
        return this.getNativeMap().then(function (map) {
            _this._drawingManager = new google.maps.drawing.DrawingManager({
                drawingMode: null,
                drawingControl: true,
                drawingControlOptions: {
                    position: google.maps.ControlPosition[mapTypes.ControlPosition[controlPosition]],
                    drawingModes: drawingModes
                },
                markerOptions: { icon: markerIcon },
                circleOptions: circleOptions,
                polygonOptions: polygonOptions
            });
            _this._drawingManager.setMap(map);
            return _this._drawingManager;
        });
    };
    GoogleMapsAPIWrapper.prototype.attachPolygonListeners = function (eventName) {
        var _this = this;
        return Observable.create(function (observer) {
            _this._drawingManager.addListener(eventName, function (polygon) {
                return _this._zone.run(function () { return observer.next(polygon); });
            });
        });
    };
    GoogleMapsAPIWrapper.prototype.updateDrawingManagerOptions = function (drawingModes, controlPosition) {
        var _this = this;
        if (drawingModes === void 0) { drawingModes = []; }
        if (controlPosition === void 0) { controlPosition = 9; }
        if (!this._drawingManager) {
            return;
        }
        if (drawingModes.length === 0) {
            this._drawingManager.setMap(null);
        }
        else {
            this.getNativeMap().then(function (map) {
                _this._drawingManager.setOptions({
                    drawingMode: drawingModes[0],
                    drawingControlOptions: {
                        position: google.maps.ControlPosition[mapTypes.ControlPosition[controlPosition]],
                        drawingModes: drawingModes
                    }
                });
                _this._drawingManager.setMap(map);
            });
        }
    };
    /**
     * Determines if given coordinates are insite a Polygon path.
     */
    GoogleMapsAPIWrapper.prototype.containsLocation = function (latLng, polygon) {
        return google.maps.geometry.poly.containsLocation(latLng, polygon);
    };
    GoogleMapsAPIWrapper.prototype.subscribeToMapEvent = function (eventName) {
        var _this = this;
        return Observable.create(function (observer) {
            _this._map.then(function (m) {
                m.addListener(eventName, function (arg) {
                    _this._zone.run(function () { return observer.next(arg); });
                });
            });
        });
    };
    GoogleMapsAPIWrapper.prototype.setCenter = function (latLng) {
        return this._map.then(function (map) { return map.setCenter(latLng); });
    };
    GoogleMapsAPIWrapper.prototype.getZoom = function () {
        return this._map.then(function (map) { return map.getZoom(); });
    };
    GoogleMapsAPIWrapper.prototype.getBounds = function () {
        return this._map.then(function (map) { return map.getBounds(); });
    };
    GoogleMapsAPIWrapper.prototype.setZoom = function (zoom) {
        return this._map.then(function (map) { return map.setZoom(zoom); });
    };
    GoogleMapsAPIWrapper.prototype.getCenter = function () {
        return this._map.then(function (map) { return map.getCenter(); });
    };
    GoogleMapsAPIWrapper.prototype.panTo = function (latLng) {
        return this._map.then(function (map) { return map.panTo(latLng); });
    };
    GoogleMapsAPIWrapper.prototype.fitBounds = function (latLng) {
        return this._map.then(function (map) { return map.fitBounds(latLng); });
    };
    GoogleMapsAPIWrapper.prototype.handleTrafficLayer = function (handle) {
        var _this = this;
        if (!handle && this._trafficLayerExist) {
            this._trafficLayer.setMap(null);
            this._trafficLayerExist = false;
        }
        if (!this._trafficLayerExist && handle) {
            this._trafficLayer = new google.maps.TrafficLayer();
            this._map.then(function (map) { return _this._trafficLayer.setMap(map); });
            this._trafficLayerExist = true;
        }
    };
    GoogleMapsAPIWrapper.prototype.panToBounds = function (latLng) {
        return this._map.then(function (map) { return map.panToBounds(latLng); });
    };
    GoogleMapsAPIWrapper.prototype.createLatLngBounds = function () {
        return this.getNativeMap().then(function () {
            return new google.maps.LatLngBounds();
        });
    };
    /**
     * Returns the native Google Maps Map instance. Be careful when using this instance directly.
     */
    GoogleMapsAPIWrapper.prototype.getNativeMap = function () {
        return this._map;
    };
    /**
     * Triggers the given event name on the map instance.
     */
    GoogleMapsAPIWrapper.prototype.triggerMapEvent = function (eventName) {
        return this._map.then(function (m) { return google.maps.event.trigger(m, eventName); });
    };
    GoogleMapsAPIWrapper.prototype.addExtraControll = function (control) {
        var _this = this;
        return this._map.then(function (map) {
            var _controlDiv = document.createElement("div");
            var _controlUI = document.createElement("div");
            _controlUI.className = control.class || "control-ui";
            _controlUI.style.textAlign = "center";
            _controlUI.title = control.title || "Click to recenter the map";
            _controlDiv.appendChild(_controlUI);
            var _controlText = document.createElement("div");
            _controlText.className = "control-text";
            _controlText.innerHTML = control.text || "Center Map";
            _controlUI.appendChild(_controlText);
            var position = control.position ||
                "TOP_CENTER";
            var controllPosition = map.controls[google.maps.ControlPosition[position]].push(_controlDiv);
            var observable = Observable.create(function (observer) {
                _controlUI.addEventListener("click", function () {
                    _this._zone.run(function () { return observer.next(control.type); });
                });
            });
            return {
                position: position,
                controllPosition: controllPosition,
                subscription: observable
            };
        });
    };
    return GoogleMapsAPIWrapper;
}());
export { GoogleMapsAPIWrapper };
GoogleMapsAPIWrapper.decorators = [
    { type: Injectable },
];
/** @nocollapse */
GoogleMapsAPIWrapper.ctorParameters = function () { return [
    { type: MapsAPILoader, },
    { type: NgZone, },
]; };
//# sourceMappingURL=google-maps-api-wrapper.js.map