(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', 'rxjs'], factory) :
	(factory((global.ngmaps = global.ngmaps || {}, global.ngmaps.core = global.ngmaps.core || {}),global.ng.core,global.rxjs));
}(this, (function (exports,_angular_core,rxjs) { 'use strict';

/**
 * Identifiers used to specify the placement of controls on the map. Controls are
 * positioned relative to other controls in the same layout position. Controls that
 * are added first are positioned closer to the edge of the map.
 */
var ControlPosition;
(function (ControlPosition) {
    ControlPosition[ControlPosition["BOTTOM_CENTER"] = 0] = "BOTTOM_CENTER";
    ControlPosition[ControlPosition["BOTTOM_LEFT"] = 1] = "BOTTOM_LEFT";
    ControlPosition[ControlPosition["BOTTOM_RIGHT"] = 2] = "BOTTOM_RIGHT";
    ControlPosition[ControlPosition["LEFT_BOTTOM"] = 3] = "LEFT_BOTTOM";
    ControlPosition[ControlPosition["LEFT_CENTER"] = 4] = "LEFT_CENTER";
    ControlPosition[ControlPosition["LEFT_TOP"] = 5] = "LEFT_TOP";
    ControlPosition[ControlPosition["RIGHT_BOTTOM"] = 6] = "RIGHT_BOTTOM";
    ControlPosition[ControlPosition["RIGHT_CENTER"] = 7] = "RIGHT_CENTER";
    ControlPosition[ControlPosition["RIGHT_TOP"] = 8] = "RIGHT_TOP";
    ControlPosition[ControlPosition["TOP_CENTER"] = 9] = "TOP_CENTER";
    ControlPosition[ControlPosition["TOP_LEFT"] = 10] = "TOP_LEFT";
    ControlPosition[ControlPosition["TOP_RIGHT"] = 11] = "TOP_RIGHT";
})(ControlPosition || (ControlPosition = {}));
var MapTypeId;
(function (MapTypeId) {
    /** This map type displays a transparent layer of major streets on satellite images. */
    MapTypeId[MapTypeId["HYBRID"] = 0] = "HYBRID";
    /** This map type displays a normal street map. */
    MapTypeId[MapTypeId["ROADMAP"] = 1] = "ROADMAP";
    /** This map type displays satellite images. */
    MapTypeId[MapTypeId["SATELLITE"] = 2] = "SATELLITE";
    /** This map type displays maps with physical features such as terrain and vegetation. */
    MapTypeId[MapTypeId["TERRAIN"] = 3] = "TERRAIN";
})(MapTypeId || (MapTypeId = {}));
var MapTypeControlStyle;
(function (MapTypeControlStyle) {
    MapTypeControlStyle[MapTypeControlStyle["DEFAULT"] = 0] = "DEFAULT";
    MapTypeControlStyle[MapTypeControlStyle["DROPDOWN_MENU"] = 1] = "DROPDOWN_MENU";
    MapTypeControlStyle[MapTypeControlStyle["HORIZONTAL_BAR"] = 2] = "HORIZONTAL_BAR";
})(MapTypeControlStyle || (MapTypeControlStyle = {}));
var ScaleControlStyle;
(function (ScaleControlStyle) {
    ScaleControlStyle[ScaleControlStyle["DEFAULT"] = 0] = "DEFAULT";
})(ScaleControlStyle || (ScaleControlStyle = {}));
var ZoomControlStyle;
(function (ZoomControlStyle) {
    ZoomControlStyle[ZoomControlStyle["DEFAULT"] = 0] = "DEFAULT";
    ZoomControlStyle[ZoomControlStyle["LARGE"] = 1] = "LARGE";
    ZoomControlStyle[ZoomControlStyle["SMALL"] = 2] = "SMALL";
})(ZoomControlStyle || (ZoomControlStyle = {}));

var __decorate$2 = (window && window.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MapsAPILoader = /** @class */ (function () {
    function MapsAPILoader() {
    }
    MapsAPILoader = __decorate$2([
        _angular_core.Injectable()
    ], MapsAPILoader);
    return MapsAPILoader;
}());

var __decorate$1 = (window && window.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$1 = (window && window.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Wrapper class that handles the communication with the Google Maps Javascript
 * API v3
 */
var GoogleMapsAPIWrapper = /** @class */ (function () {
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
                    position: google.maps.ControlPosition[ControlPosition[controlPosition]],
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
        return rxjs.Observable.create(function (observer) {
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
                        position: google.maps.ControlPosition[ControlPosition[controlPosition]],
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
        return rxjs.Observable.create(function (observer) {
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
            var observable = rxjs.Observable.create(function (observer) {
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
    GoogleMapsAPIWrapper = __decorate$1([
        _angular_core.Injectable(),
        __metadata$1("design:paramtypes", [MapsAPILoader, _angular_core.NgZone])
    ], GoogleMapsAPIWrapper);
    return GoogleMapsAPIWrapper;
}());

var __decorate$3 = (window && window.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$2 = (window && window.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var CircleManager = /** @class */ (function () {
    function CircleManager(_apiWrapper, _zone) {
        this._apiWrapper = _apiWrapper;
        this._zone = _zone;
        this._circles = new Map();
    }
    CircleManager.prototype.addCircle = function (circle) {
        this._circles.set(circle, this._apiWrapper.createCircle({
            center: { lat: circle.latitude, lng: circle.longitude },
            clickable: circle.clickable,
            draggable: circle.draggable,
            editable: circle.editable,
            fillColor: circle.fillColor,
            fillOpacity: circle.fillOpacity,
            radius: circle.radius,
            strokeColor: circle.strokeColor,
            strokeOpacity: circle.strokeOpacity,
            strokePosition: circle.strokePosition,
            strokeWeight: circle.strokeWeight,
            visible: circle.visible,
            zIndex: circle.zIndex
        }));
    };
    
    /**
     * Removes the given circle from the map.
     */
    CircleManager.prototype.removeCircle = function (circle) {
        var _this = this;
        return this._circles.get(circle).then(function (c) {
            c.setMap(null);
            _this._circles.delete(circle);
        });
    };
    CircleManager.prototype.setOptions = function (circle, options) {
        return this._circles.get(circle).then(function (c) { return c.setOptions(options); });
    };
    
    CircleManager.prototype.getBounds = function (circle) {
        return this._circles.get(circle).then(function (c) { return c.getBounds(); });
    };
    
    CircleManager.prototype.getCenter = function (circle) {
        return this._circles.get(circle).then(function (c) { return c.getCenter(); });
    };
    
    CircleManager.prototype.getRadius = function (circle) {
        return this._circles.get(circle).then(function (c) { return c.getRadius(); });
    };
    CircleManager.prototype.setCenter = function (circle) {
        return this._circles.get(circle).then(function (c) { return c.setCenter({ lat: circle.latitude, lng: circle.longitude }); });
    };
    
    CircleManager.prototype.setEditable = function (circle) {
        return this._circles.get(circle).then(function (c) { return c.setEditable(circle.editable); });
    };
    
    CircleManager.prototype.setDraggable = function (circle) {
        return this._circles.get(circle).then(function (c) { return c.setDraggable(circle.draggable); });
    };
    
    CircleManager.prototype.setVisible = function (circle) {
        return this._circles.get(circle).then(function (c) { return c.setVisible(circle.visible); });
    };
    
    CircleManager.prototype.setRadius = function (circle) {
        return this._circles.get(circle).then(function (c) { return c.setRadius(circle.radius); });
    };
    
    CircleManager.prototype.createEventObservable = function (eventName, circle) {
        var _this = this;
        return rxjs.Observable.create(function (observer) {
            var listener = null;
            _this._circles.get(circle).then(function (c) {
                listener = c.addListener(eventName, function (e) { return _this._zone.run(function () { return observer.next(e); }); });
            });
            return function () {
                if (listener !== null) {
                    listener.remove();
                }
            };
        });
    };
    CircleManager = __decorate$3([
        _angular_core.Injectable(),
        __metadata$2("design:paramtypes", [GoogleMapsAPIWrapper, _angular_core.NgZone])
    ], CircleManager);
    return CircleManager;
}());

var __decorate$5 = (window && window.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$4 = (window && window.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var MarkerManager = /** @class */ (function () {
    function MarkerManager(_mapsWrapper, _zone) {
        this._mapsWrapper = _mapsWrapper;
        this._zone = _zone;
        this._markers = new Map();
    }
    MarkerManager.prototype.deleteMarker = function (marker) {
        var _this = this;
        var m = this._markers.get(marker);
        if (m == null) {
            // marker already deleted
            return Promise.resolve();
        }
        return m.then(function (m) {
            return _this._zone.run(function () {
                m.setMap(null);
                _this._markers.delete(marker);
            });
        });
    };
    MarkerManager.prototype.updateMarkerPosition = function (marker) {
        return this._markers.get(marker).then(function (m) { return m.setPosition({ lat: marker.latitude, lng: marker.longitude }); });
    };
    MarkerManager.prototype.updateTitle = function (marker) {
        return this._markers.get(marker).then(function (m) { return m.setTitle(marker.title); });
    };
    MarkerManager.prototype.updateLabel = function (marker) {
        return this._markers.get(marker).then(function (m) { m.setLabel(marker.label); });
    };
    MarkerManager.prototype.updateDraggable = function (marker) {
        return this._markers.get(marker).then(function (m) { return m.setDraggable(marker.draggable); });
    };
    MarkerManager.prototype.updateIcon = function (marker) {
        return this._markers.get(marker).then(function (m) { return m.setIcon(marker.iconUrl); });
    };
    MarkerManager.prototype.updateOpacity = function (marker) {
        return this._markers.get(marker).then(function (m) { return m.setOpacity(marker.opacity); });
    };
    MarkerManager.prototype.updateVisible = function (marker) {
        return this._markers.get(marker).then(function (m) { return m.setVisible(marker.visible); });
    };
    MarkerManager.prototype.updateZIndex = function (marker) {
        return this._markers.get(marker).then(function (m) { return m.setZIndex(marker.zIndex); });
    };
    MarkerManager.prototype.addMarker = function (marker) {
        var markerPromise = this._mapsWrapper.createMarker({
            position: { lat: marker.latitude, lng: marker.longitude },
            label: marker.label,
            draggable: marker.draggable,
            icon: marker.iconUrl,
            opacity: marker.opacity,
            visible: marker.visible,
            zIndex: marker.zIndex,
            title: marker.title
        });
        this._markers.set(marker, markerPromise);
    };
    MarkerManager.prototype.getNativeMarker = function (marker) {
        return this._markers.get(marker);
    };
    MarkerManager.prototype.createEventObservable = function (eventName, marker) {
        var _this = this;
        return rxjs.Observable.create(function (observer) {
            _this._markers.get(marker).then(function (m) {
                m.addListener(eventName, function (e) { return _this._zone.run(function () { return observer.next(e); }); });
            });
        });
    };
    MarkerManager = __decorate$5([
        _angular_core.Injectable(),
        __metadata$4("design:paramtypes", [GoogleMapsAPIWrapper, _angular_core.NgZone])
    ], MarkerManager);
    return MarkerManager;
}());

var __decorate$4 = (window && window.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$3 = (window && window.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var InfoWindowManager = /** @class */ (function () {
    function InfoWindowManager(_mapsWrapper, _zone, _markerManager) {
        this._mapsWrapper = _mapsWrapper;
        this._zone = _zone;
        this._markerManager = _markerManager;
        this._infoWindows = new Map();
    }
    InfoWindowManager.prototype.deleteInfoWindow = function (infoWindow) {
        var _this = this;
        var iWindow = this._infoWindows.get(infoWindow);
        if (iWindow == null) {
            // info window already deleted
            return Promise.resolve();
        }
        return iWindow.then(function (i) {
            return _this._zone.run(function () {
                i.close();
                _this._infoWindows.delete(infoWindow);
            });
        });
    };
    InfoWindowManager.prototype.setPosition = function (infoWindow) {
        return this._infoWindows.get(infoWindow).then(function (i) { return i.setPosition({
            lat: infoWindow.latitude,
            lng: infoWindow.longitude
        }); });
    };
    InfoWindowManager.prototype.setZIndex = function (infoWindow) {
        return this._infoWindows.get(infoWindow)
            .then(function (i) { return i.setZIndex(infoWindow.zIndex); });
    };
    InfoWindowManager.prototype.open = function (infoWindow) {
        var _this = this;
        return this._infoWindows.get(infoWindow).then(function (w) {
            if (infoWindow.hostMarker != null) {
                return _this._markerManager.getNativeMarker(infoWindow.hostMarker).then(function (marker) {
                    return _this._mapsWrapper.getNativeMap().then(function (map) { return w.open(map, marker); });
                });
            }
            return _this._mapsWrapper.getNativeMap().then(function (map) { return w.open(map); });
        });
    };
    InfoWindowManager.prototype.close = function (infoWindow) {
        return this._infoWindows.get(infoWindow).then(function (w) { return w.close(); });
    };
    InfoWindowManager.prototype.setOptions = function (infoWindow, options) {
        return this._infoWindows.get(infoWindow).then(function (i) { return i.setOptions(options); });
    };
    InfoWindowManager.prototype.addInfoWindow = function (infoWindow) {
        var options = {
            content: infoWindow.content,
            maxWidth: infoWindow.maxWidth,
            zIndex: infoWindow.zIndex,
        };
        if (typeof infoWindow.latitude === 'number' && typeof infoWindow.longitude === 'number') {
            options.position = { lat: infoWindow.latitude, lng: infoWindow.longitude };
        }
        var infoWindowPromise = this._mapsWrapper.createInfoWindow(options);
        this._infoWindows.set(infoWindow, infoWindowPromise);
    };
    /**
     * Creates a Google Maps event listener for the given InfoWindow as an Observable
     */
    InfoWindowManager.prototype.createEventObservable = function (eventName, infoWindow) {
        var _this = this;
        return rxjs.Observable.create(function (observer) {
            _this._infoWindows.get(infoWindow).then(function (i) {
                i.addListener(eventName, function (e) { return _this._zone.run(function () { return observer.next(e); }); });
            });
        });
    };
    InfoWindowManager = __decorate$4([
        _angular_core.Injectable(),
        __metadata$3("design:paramtypes", [GoogleMapsAPIWrapper, _angular_core.NgZone,
            MarkerManager])
    ], InfoWindowManager);
    return InfoWindowManager;
}());

var __decorate$6 = (window && window.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$5 = (window && window.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var PolygonManager = /** @class */ (function () {
    function PolygonManager(_mapsWrapper, _zone) {
        this._mapsWrapper = _mapsWrapper;
        this._zone = _zone;
        this._polygons = new Map();
    }
    PolygonManager.prototype.addPolygon = function (path) {
        var polygonPromise = this._mapsWrapper.createPolygon({
            clickable: path.clickable,
            draggable: path.draggable,
            editable: path.editable,
            fillColor: path.fillColor,
            fillOpacity: path.fillOpacity,
            geodesic: path.geodesic,
            paths: path.paths,
            strokeColor: path.strokeColor,
            strokeOpacity: path.strokeOpacity,
            strokeWeight: path.strokeWeight,
            visible: path.visible,
            zIndex: path.zIndex
        });
        this._polygons.set(path, polygonPromise);
    };
    PolygonManager.prototype.updatePolygon = function (polygon) {
        var _this = this;
        var m = this._polygons.get(polygon);
        if (m == null) {
            return Promise.resolve();
        }
        return m.then(function (l) {
            return _this._zone.run(function () {
                l.setPaths(polygon.paths);
            });
        });
    };
    PolygonManager.prototype.setPolygonOptions = function (path, options) {
        var _this = this;
        return this._polygons.get(path).then(function (l) {
            l.setOptions(options);
            if (options['paths']) {
                _this.updatePolygon(path);
            }
        });
    };
    PolygonManager.prototype.deletePolygon = function (paths) {
        var _this = this;
        var m = this._polygons.get(paths) || null;
        if (m == null) {
            this._polygons.forEach(function (p) {
                _this._polygons.delete(p);
            });
            return Promise.resolve();
        }
        return m.then(function (l) {
            return _this._zone.run(function () {
                l.setMap(null);
                _this._polygons.delete(paths);
            });
        });
    };
    PolygonManager.prototype.createEventObservable = function (eventName, path) {
        var _this = this;
        return rxjs.Observable.create(function (observer) {
            _this._polygons.get(path).then(function (l) {
                l.addListener(eventName, function (e) {
                    return _this._zone.run(function () { return observer.next(e); });
                });
            });
        });
    };
    PolygonManager.prototype.createDragEventObservable = function (eventName, path) {
        var _this = this;
        return rxjs.Observable.create(function (observer) {
            _this._polygons.get(path).then(function (l) {
                l.addListener(eventName, function () {
                    return _this._zone.run(function () { return observer.next(_this.getBounds(l)); });
                });
                // google.maps.event.addListener(l, eventName, () =>
                //   this._zone.run(() => observer.next(this.getBounds(l)))
                // );
            });
        });
    };
    PolygonManager.prototype.createPolyChangesObservable = function (eventName, path) {
        var _this = this;
        return rxjs.Observable.create(function (observer) {
            _this._polygons.get(path).then(function (l) {
                l.getPaths().forEach(function (path) {
                    google.maps.event.addListener(path, eventName, function () {
                        return _this._zone.run(function () { return observer.next(_this.getBounds(l)); });
                    });
                });
            });
        });
    };
    PolygonManager.prototype.getBounds = function (polygon) {
        var bounds = [];
        var length = polygon.getPath().getLength();
        for (var i = 0; i < length; i++) {
            var ln = {
                lat: polygon
                    .getPath()
                    .getAt(i)
                    .lat(),
                lng: polygon
                    .getPath()
                    .getAt(i)
                    .lng()
            };
            bounds.push(ln);
        }
        return bounds;
    };
    PolygonManager = __decorate$6([
        _angular_core.Injectable(),
        __metadata$5("design:paramtypes", [GoogleMapsAPIWrapper,
            _angular_core.NgZone])
    ], PolygonManager);
    return PolygonManager;
}());

var __decorate$7 = (window && window.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$6 = (window && window.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var PolylineManager = /** @class */ (function () {
    function PolylineManager(_mapsWrapper, _zone) {
        this._mapsWrapper = _mapsWrapper;
        this._zone = _zone;
        this._polylines = new Map();
    }
    PolylineManager_1 = PolylineManager;
    PolylineManager._convertPoints = function (line) {
        var path = line._getPoints().map(function (point) {
            return { lat: point.latitude, lng: point.longitude };
        });
        return path;
    };
    PolylineManager.prototype.addPolyline = function (line) {
        var path = PolylineManager_1._convertPoints(line);
        var polylinePromise = this._mapsWrapper.createPolyline({
            clickable: line.clickable,
            draggable: line.draggable,
            editable: line.editable,
            geodesic: line.geodesic,
            strokeColor: line.strokeColor,
            strokeOpacity: line.strokeOpacity,
            strokeWeight: line.strokeWeight,
            visible: line.visible,
            zIndex: line.zIndex,
            path: path
        });
        this._polylines.set(line, polylinePromise);
    };
    PolylineManager.prototype.updatePolylinePoints = function (line) {
        var _this = this;
        var path = PolylineManager_1._convertPoints(line);
        var m = this._polylines.get(line);
        if (m == null) {
            return Promise.resolve();
        }
        return m.then(function (l) { return _this._zone.run(function () { l.setPath(path); }); });
    };
    PolylineManager.prototype.setPolylineOptions = function (line, options) {
        return this._polylines.get(line).then(function (l) { l.setOptions(options); });
    };
    PolylineManager.prototype.deletePolyline = function (line) {
        var _this = this;
        var m = this._polylines.get(line);
        if (m == null) {
            return Promise.resolve();
        }
        return m.then(function (l) {
            return _this._zone.run(function () {
                l.setMap(null);
                _this._polylines.delete(line);
            });
        });
    };
    PolylineManager.prototype.createEventObservable = function (eventName, line) {
        var _this = this;
        return rxjs.Observable.create(function (observer) {
            _this._polylines.get(line).then(function (l) {
                l.addListener(eventName, function (e) { return _this._zone.run(function () { return observer.next(e); }); });
            });
        });
    };
    var PolylineManager_1;
    PolylineManager = PolylineManager_1 = __decorate$7([
        _angular_core.Injectable(),
        __metadata$6("design:paramtypes", [GoogleMapsAPIWrapper, _angular_core.NgZone])
    ], PolylineManager);
    return PolylineManager;
}());

var __decorate$8 = (window && window.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$7 = (window && window.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Manages all KML Layers for a Google Map instance.
 */
var KmlLayerManager = /** @class */ (function () {
    function KmlLayerManager(_wrapper, _zone) {
        this._wrapper = _wrapper;
        this._zone = _zone;
        this._layers = new Map();
    }
    /**
     * Adds a new KML Layer to the map.
     */
    KmlLayerManager.prototype.addKmlLayer = function (layer) {
        var newLayer = this._wrapper.getNativeMap().then(function (m) {
            return new google.maps.KmlLayer({
                clickable: layer.clickable,
                map: m,
                preserveViewport: layer.preserveViewport,
                screenOverlays: layer.screenOverlays,
                suppressInfoWindows: layer.suppressInfoWindows,
                url: layer.url,
                zIndex: layer.zIndex
            });
        });
        this._layers.set(layer, newLayer);
    };
    KmlLayerManager.prototype.setOptions = function (layer, options) {
        this._layers.get(layer).then(function (l) { return l.setOptions(options); });
    };
    KmlLayerManager.prototype.deleteKmlLayer = function (layer) {
        var _this = this;
        this._layers.get(layer).then(function (l) {
            l.setMap(null);
            _this._layers.delete(layer);
        });
    };
    /**
     * Creates a Google Maps event listener for the given KmlLayer as an Observable
     */
    KmlLayerManager.prototype.createEventObservable = function (eventName, layer) {
        var _this = this;
        return rxjs.Observable.create(function (observer) {
            _this._layers.get(layer).then(function (m) {
                m.addListener(eventName, function (e) { return _this._zone.run(function () { return observer.next(e); }); });
            });
        });
    };
    KmlLayerManager = __decorate$8([
        _angular_core.Injectable(),
        __metadata$7("design:paramtypes", [GoogleMapsAPIWrapper, _angular_core.NgZone])
    ], KmlLayerManager);
    return KmlLayerManager;
}());

var __decorate$9 = (window && window.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$8 = (window && window.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Manages all Data Layers for a Google Map instance.
 */
var DataLayerManager = /** @class */ (function () {
    function DataLayerManager(_wrapper, _zone) {
        this._wrapper = _wrapper;
        this._zone = _zone;
        this._layers = new Map();
    }
    /**
     * Adds a new Data Layer to the map.
     */
    DataLayerManager.prototype.addDataLayer = function (layer) {
        var newLayer = this._wrapper.getNativeMap().then(function (m) {
            var dataLayer = new google.maps.Data({
                map: m,
                style: layer.style
            });
            if (layer.geoJson) {
                dataLayer.features = dataLayer.addGeoJson(layer.geoJson);
            }
            return dataLayer;
        });
        this._layers.set(layer, newLayer);
    };
    DataLayerManager.prototype.deleteDataLayer = function (layer) {
        var _this = this;
        this._layers.get(layer).then(function (l) {
            l.setMap(null);
            _this._layers.delete(layer);
        });
    };
    DataLayerManager.prototype.updateGeoJson = function (layer, geoJson) {
        this._layers.get(layer).then(function (l) {
            l.forEach(function (feature) {
                l.remove(feature);
                var index = l.features.indexOf(feature, 0);
                if (index > -1) {
                    l.features.splice(index, 1);
                }
            });
            l.features = l.addGeoJson(geoJson);
        });
    };
    DataLayerManager.prototype.setDataOptions = function (layer, options) {
        this._layers.get(layer).then(function (l) {
            l.setControlPosition(options.controlPosition);
            l.setControls(options.controls);
            l.setDrawingMode(options.drawingMode);
            l.setStyle(options.style);
        });
    };
    /**
     * Creates a Google Maps event listener for the given DataLayer as an Observable
     */
    DataLayerManager.prototype.createEventObservable = function (eventName, layer) {
        var _this = this;
        return rxjs.Observable.create(function (observer) {
            _this._layers.get(layer).then(function (d) {
                d.addListener(eventName, function (e) { return _this._zone.run(function () { return observer.next(e); }); });
            });
        });
    };
    DataLayerManager = __decorate$9([
        _angular_core.Injectable(),
        __metadata$8("design:paramtypes", [GoogleMapsAPIWrapper, _angular_core.NgZone])
    ], DataLayerManager);
    return DataLayerManager;
}());

var __decorate = (window && window.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (window && window.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * AgmMap renders a Google Map.
 * **Important note**: To be able see a map in the browser, you have to define a height for the
 * element `agm-map`.
 *
 * ### Example
 * ```typescript
 * import { Component } from '@angular/core';
 *
 * @Component({
 *  selector: 'my-map-cmp',
 *  styles: [`
 *    agm-map {
 *      height: 300px;
 *    }
 * `],
 *  template: `
 *    <agm-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
 *    </agm-map>
 *  `
 * })
 * ```
 */
var AgmMap = /** @class */ (function () {
    function AgmMap(_elem, _mapsWrapper, _polygonManager) {
        var _this = this;
        this._elem = _elem;
        this._mapsWrapper = _mapsWrapper;
        this._polygonManager = _polygonManager;
        /**
         * The longitude that defines the center of the map.
         */
        this.longitude = 0;
        /**
         * The latitude that defines the center of the map.
         */
        this.latitude = 0;
        /**
         * The zoom level of the map. The default zoom level is 8.
         */
        this.zoom = 8;
        /**
         * The zoom level of the map. The default zoom level is 8.
         */
        this.tilt = 0;
        /**
         * Enables/disables if map is draggable.
         */
        // tslint:disable-next-line:no-input-rename
        this.draggable = true;
        /**
         * Enables/disables zoom and center on double click. Enabled by default.
         */
        this.disableDoubleClickZoom = false;
        /**
         * Enables/disables all default UI of the Google map. Please note: When the map is created, this
         * value cannot get updated.
         */
        this.disableDefaultUI = false;
        /**
         * If false, disables scrollwheel zooming on the map. The scrollwheel is enabled by default.
         */
        this.scrollwheel = true;
        /**
         * If false, prevents the map from being controlled by the keyboard. Keyboard shortcuts are
         * enabled by default.
         */
        this.keyboardShortcuts = true;
        /**
         * The enabled/disabled state of the Zoom control.
         */
        this.zoomControl = true;
        /**
         * Styles to apply to each of the default map types. Note that for Satellite/Hybrid and Terrain
         * modes, these styles will only apply to labels and geometry.
         */
        this.styles = [];
        /**
         * When true and the latitude and/or longitude values changes, the Google Maps panTo method is
         * used to
         * center the map. See: https://developers.google.com/maps/documentation/javascript/reference#Map
         */
        this.usePanning = false;
        /**
         * The initial enabled/disabled state of the Street View Pegman control.
         * This control is part of the default UI, and should be set to false when displaying a map type
         * on which the Street View road overlay should not appear (e.g. a non-Earth map type).
         */
        this.streetViewControl = true;
        /**
         * Sets the viewport to contain the given bounds.
         */
        this.fitBounds = null;
        /**
         * Sets the viewport to contain the given Array of LatLng | LatLngLiteral.
         */
        this.fitPoints = null;
        /**
         * Sets the viewport to contain the given Array each time when fitPoints is changed.
         */
        this.fitMultiple = false;
        /**
         * Sets the viewport to contain the given Array each time when fitPoints is changed.
         */
        this.trafficLayer = false;
        /**
         * The initial enabled/disabled state of the Scale control. This is disabled by default.
         */
        this.scaleControl = false;
        /**
         * The initial enabled/disabled state of the Map type control.
         */
        this.mapTypeControl = false;
        /**
         * The initial enabled/disabled state of the Map type control.
         */
        this.mapCustomControl = false;
        /**
         * The initial enabled/disabled state of the Pan control.
         */
        this.panControl = false;
        /**
         * The initial enabled/disabled state of the Rotate control.
         */
        this.rotateControl = false;
        /**
         * The initial enabled/disabled state of the Fullscreen control.
         */
        this.fullscreenControl = false;
        /**
         * The map mapTypeId. Defaults to 'roadmap'.
         */
        this.mapTypeId = "roadmap";
        /**
         * When false, map icons are not clickable. A map icon represents a point of interest,
         * also known as a POI. By default map icons are clickable.
         */
        this.clickableIcons = true;
        /**
         * This setting controls how gestures on the map are handled.
         * Allowed values:
         * - 'cooperative' (Two-finger touch gestures pan and zoom the map. One-finger touch gestures are not handled by the map.)
         * - 'greedy'      (All touch gestures pan or zoom the map.)
         * - 'none'        (The map cannot be panned or zoomed by user gestures.)
         * - 'auto'        [default] (Gesture handling is either cooperative or greedy, depending on whether the page is scrollable or not.
         */
        this.gestureHandling = "auto";
        /**
         * This setting controls apperance drawing Manager
         */
        this.drawingModes = [];
        /**
         * This setting controls apperance drawing Manager controlls position
         */
        this.drawingManagerPosition = "TOP_CENTER";
        /**
         * This setting controls apperance drawing Manager controlls position
         */
        this.extraControls = [];
        this._observableSubscriptions = [];
        this._listeners = [];
        this._polygons = [];
        this._extraControls = {};
        this._subscriptions = [];
        /**
         * This event emitter gets emitted when the user clicks on the map (but not when they click on a
         * marker or infoWindow).
         */
        this.mapClick = new _angular_core.EventEmitter();
        /**
         * This event emitter gets emitted when the user right-clicks on the map (but not when they click
         * on a marker or infoWindow).
         */
        this.mapRightClick = new _angular_core.EventEmitter();
        /**
         * This event emitter gets emitted when the user double-clicks on the map (but not when they click
         * on a marker or infoWindow).
         */
        this.mapDblClick = new _angular_core.EventEmitter();
        /**
         * This event emitter is fired when the map center changes.
         */
        this.centerChange = new _angular_core.EventEmitter();
        /**
         * This event is fired when the viewport bounds have changed.
         */
        this.boundsChange = new _angular_core.EventEmitter();
        /**
         * This event is fired when the map becomes idle after panning or zooming.
         */
        this.idle = new _angular_core.EventEmitter();
        /**
         * This event is fired when the zoom level has changed.
         */
        this.zoomChange = new _angular_core.EventEmitter();
        /**
         * This event is fired when the google map is fully initialized.
         * You get the google.maps.Map instance as a result of this EventEmitter.
         */
        this.mapReady = new _angular_core.EventEmitter();
        /**
         * This event is fired when polygon drawing complete.
         */
        this.polygonComplete = new _angular_core.EventEmitter();
        /**
         * This event is fired when polygon deleted.
         */
        this.polygonDeleted = new _angular_core.EventEmitter();
        /**
         * This event is callBack on custom cotroll button
         */
        this.extraControlsAction = new _angular_core.EventEmitter();
        this._mapsWrapper.createLatLngBounds().then(function (bounds) {
            _this.bounds = bounds;
            console.log("this.bounds", _this.bounds);
        });
    }
    AgmMap_1 = AgmMap;
    /** @internal */
    AgmMap.prototype.ngOnInit = function () {
        // todo: this should be solved with a new component and a viewChild decorator
        var container = this._elem.nativeElement.querySelector(".agm-map-container-inner");
        this._initMapInstance(container);
    };
    AgmMap.prototype._initMapInstance = function (el) {
        var _this = this;
        this._mapsWrapper
            .createMap(el, {
            center: { lat: this.latitude || 0, lng: this.longitude || 0 },
            zoom: this.zoom,
            tilt: this.tilt,
            minZoom: this.minZoom,
            maxZoom: this.maxZoom,
            disableDefaultUI: this.disableDefaultUI,
            disableDoubleClickZoom: this.disableDoubleClickZoom,
            scrollwheel: this.scrollwheel,
            backgroundColor: this.backgroundColor,
            draggable: this.draggable,
            draggableCursor: this.draggableCursor,
            draggingCursor: this.draggingCursor,
            keyboardShortcuts: this.keyboardShortcuts,
            styles: this.styles,
            zoomControl: this.zoomControl,
            zoomControlOptions: this.zoomControlOptions,
            streetViewControl: this.streetViewControl,
            streetViewControlOptions: this.streetViewControlOptions,
            scaleControl: this.scaleControl,
            scaleControlOptions: this.scaleControlOptions,
            mapTypeControl: this.mapTypeControl,
            mapTypeControlOptions: this.mapTypeControlOptions,
            panControl: this.panControl,
            panControlOptions: this.panControlOptions,
            rotateControl: this.rotateControl,
            rotateControlOptions: this.rotateControlOptions,
            fullscreenControl: this.fullscreenControl,
            fullscreenControlOptions: this.fullscreenControlOptions,
            mapTypeId: this.mapTypeId,
            clickableIcons: this.clickableIcons,
            gestureHandling: this.gestureHandling
        })
            .then(function () { return _this._mapsWrapper.getNativeMap(); })
            .then(function (map) { return _this.mapReady.emit(map); });
        // register event listeners
        this._handleMapCenterChange();
        this._handleMapZoomChange();
        this._handleMapMouseEvents();
        this._handleBoundsChange();
        this._handleIdleEvent();
        this._mapsWrapper.getLibraries().then(function (libs) {
            console.log("libs", libs);
            if (libs && libs.indexOf("drawing") > -1) {
                _this._setDrawingManager();
            }
        });
    };
    /** @internal */
    AgmMap.prototype.ngOnDestroy = function () {
        // unsubscribe all registered observable subscriptions
        this._observableSubscriptions.forEach(function (s) { return s.unsubscribe(); });
        this._listeners.forEach(function (s) {
            s.remove();
        });
        this._drawingManagerRemovePolygonListeners();
    };
    /* @internal */
    AgmMap.prototype.ngOnChanges = function (changes) {
        this._updateMapOptionsChanges(changes);
        this._updatePosition(changes);
    };
    AgmMap.prototype._updateMapExtraControlls = function (_controls) {
        var _this = this;
        // console.log('controlls', _controls);
        // console.log('controlls this', this);
        // let keys = Object.keys(this._extraControls);
        this._mapsWrapper.getNativeMap().then(function () {
            //   console.log('map.controlls', map.controls);
            var _loop_1 = function (c) {
                if (_this._extraControls[c.type] === undefined) {
                    _this._mapsWrapper.addExtraControll(c).then(function (_control) {
                        // console.log('_control', _control);
                        var s = _control.subscription.subscribe(function (type) {
                            if (type === "centerMap") {
                                _this._mapsWrapper.setCenter(c.coord);
                            }
                            if (type === "removePolygon") {
                                // console.log('removePolygon');
                                // remove listeners and subscriptions
                                _this._listeners.forEach(function (s) {
                                    s.remove();
                                });
                                _this._drawingManagerRemovePolygonListeners();
                                _this._polygons.forEach(function (poly) {
                                    //   poly.setMap(null);
                                    _this._polygonManager.deletePolygon(poly);
                                });
                                _this.polygonDeleted.emit();
                            }
                        });
                        // this._extraControls.push({ 'type': c.type, 'position': _control.position });
                        _this._extraControls[c.type] = _control;
                        _this._observableSubscriptions.push(s);
                    });
                }
                else {
                    //   console.log('this._extraControls', this._extraControls);
                    //   console.log('map.controls', map.controls);
                    //   let position = c.position as keyof typeof ControlPosition || 'TOP_CENTER';
                    //   console.log('position', position);
                    //   //   map.controls[position].splice(this._extraControls[c.type], 1);
                }
            };
            for (var _i = 0, _controls_1 = _controls; _i < _controls_1.length; _i++) {
                var c = _controls_1[_i];
                _loop_1(c);
            }
        });
    };
    AgmMap.prototype._updateMapOptionsChanges = function (changes) {
        // console.log('changes', changes);
        var options = {};
        var optionKeys = Object.keys(changes).filter(function (k) { return AgmMap_1._mapOptionsAttributes.indexOf(k) !== -1; });
        optionKeys.forEach(function (k) {
            options[k] = changes[k].currentValue;
        });
        this._mapsWrapper.setMapOptions(options);
        if (changes["extraControls"]) {
            this._updateMapExtraControlls(changes["extraControls"].currentValue);
        }
        // console.log('drawingModes', changes);
        if (changes["drawingModes"] && !changes["drawingModes"].firstChange) {
            var position = this
                .drawingManagerPosition;
            var typedPosition = ControlPosition[position];
            //   console.log('updateDrawingManagerOptions position', position);
            this._mapsWrapper.updateDrawingManagerOptions(changes["drawingModes"].currentValue, typedPosition);
        }
    };
    /**
     * Triggers a resize event on the google map instance.
     * When recenter is true, the of the google map gets called with the current lat/lng values or fitBounds value to recenter the map.
     * Returns a promise that gets resolved after the event was triggered.
     */
    AgmMap.prototype.triggerResize = function (recenter) {
        var _this = this;
        if (recenter === void 0) { recenter = true; }
        // Note: When we would trigger the resize event and show the map in the same turn (which is a
        // common case for triggering a resize event), then the resize event would not
        // work (to show the map), so we trigger the event in a timeout.
        return new Promise(function (resolve) {
            setTimeout(function () {
                return _this._mapsWrapper.triggerMapEvent("resize").then(function () {
                    if (recenter) {
                        _this.fitBounds != null ? _this._fitBounds() : _this._setCenter();
                    }
                    resolve();
                });
            });
        });
    };
    AgmMap.prototype._updatePosition = function (changes) {
        if (changes["trafficLayer"]) {
            this.trafficLayer = changes["trafficLayer"].currentValue;
            if (!this.trafficLayer) {
                this._mapsWrapper.handleTrafficLayer(false);
            }
            else {
                this._mapsWrapper.handleTrafficLayer(true);
            }
        }
        if (changes["fitPoints"] && this.fitPoints != null) {
            //   console.log('fitPoints changes', changes);
            this.fitPoints = changes["fitPoints"].currentValue;
            this._fitPoints();
        }
        if (changes["latitude"] == null &&
            changes["longitude"] == null &&
            changes["fitBounds"] == null) {
            // no position update needed
            return;
        }
        // we prefer fitBounds in changes
        if (changes["fitBounds"] && this.fitBounds != null) {
            this._fitBounds();
            return;
        }
        if (typeof this.latitude !== "number" ||
            typeof this.longitude !== "number") {
            return;
        }
        this._setCenter();
    };
    AgmMap.prototype._drawingManagerRemovePolygonListeners = function () {
        this._subscriptions.forEach(function (s) { return s.unsubscribe(); });
        this._subscriptions = [];
    };
    AgmMap.prototype._setDrawingManager = function () {
        var _this = this;
        // if (!this.drawingModes.length) {
        //   return;
        // }
        var drawingCircleOptions = {
            fillColor: "#ffff00",
            fillOpacity: 1,
            strokeWeight: 5,
            clickable: false,
            editable: true,
            draggable: true,
            zIndex: 1
        };
        var polygonOptions = {
            fillColor: "#d75f8f",
            fillOpacity: 0.5,
            strokeOpacity: 0.5,
            strokeWeight: 5,
            clickable: true,
            editable: true,
            draggable: true,
            zIndex: 1
        };
        var position = this.drawingManagerPosition;
        var typedPosition = ControlPosition[position];
        this._mapsWrapper
            .attachDrawingManager(typedPosition, this.drawingModes, polygonOptions, drawingCircleOptions)
            .then(function () {
            var lis = _this._mapsWrapper
                .attachPolygonListeners("polygoncomplete")
                .subscribe(function (polygon) {
                polygon.paths = _this._polygonManager.getBounds(polygon);
                _this.polygonComplete.emit(polygon.paths);
                polygon.setMap(null);
            });
            _this._listeners.push(lis);
        });
    };
    AgmMap.prototype._setCenter = function () {
        var newCenter = {
            lat: this.latitude,
            lng: this.longitude
        };
        if (this.usePanning) {
            this._mapsWrapper.panTo(newCenter);
        }
        else {
            this._mapsWrapper.setCenter(newCenter);
        }
    };
    AgmMap.prototype._fitPoints = function () {
        var _this = this;
        this._mapsWrapper.createLatLngBounds().then(function (bounds) {
            _this.bounds = bounds;
            for (var _i = 0, _a = _this.fitPoints; _i < _a.length; _i++) {
                var m = _a[_i];
                if (typeof m === 'object') {
                    _this.bounds.extend(m);
                }
            }
            _this._mapsWrapper.fitBounds(_this.bounds);
            _this._mapsWrapper.panToBounds(_this.bounds);
            //   console.log(this.bounds);
        });
    };
    AgmMap.prototype._fitBounds = function () {
        if (this.usePanning) {
            this._mapsWrapper.panToBounds(this.fitBounds);
            return;
        }
        this._mapsWrapper.fitBounds(this.fitBounds);
    };
    AgmMap.prototype._handleMapCenterChange = function () {
        var _this = this;
        var s = this._mapsWrapper
            .subscribeToMapEvent("center_changed")
            .subscribe(function () {
            _this._mapsWrapper.getCenter().then(function (center) {
                _this.latitude = center.lat();
                _this.longitude = center.lng();
                _this.centerChange.emit({
                    lat: _this.latitude,
                    lng: _this.longitude
                });
            });
        });
        this._observableSubscriptions.push(s);
    };
    AgmMap.prototype._handleBoundsChange = function () {
        var _this = this;
        var s = this._mapsWrapper
            .subscribeToMapEvent("bounds_changed")
            .subscribe(function () {
            _this._mapsWrapper.getBounds().then(function (bounds) {
                _this.boundsChange.emit(bounds);
            });
        });
        this._observableSubscriptions.push(s);
    };
    AgmMap.prototype._handleMapZoomChange = function () {
        var _this = this;
        var s = this._mapsWrapper
            .subscribeToMapEvent("zoom_changed")
            .subscribe(function () {
            _this._mapsWrapper.getZoom().then(function (z) {
                _this.zoom = z;
                _this.zoomChange.emit(z);
            });
        });
        this._observableSubscriptions.push(s);
    };
    AgmMap.prototype._handleIdleEvent = function () {
        var _this = this;
        var s = this._mapsWrapper
            .subscribeToMapEvent("idle")
            .subscribe(function () {
            _this.idle.emit(void 0);
        });
        this._observableSubscriptions.push(s);
    };
    AgmMap.prototype._handleMapMouseEvents = function () {
        var _this = this;
        var events = [
            { name: "click", emitter: this.mapClick },
            { name: "rightclick", emitter: this.mapRightClick },
            { name: "dblclick", emitter: this.mapDblClick }
        ];
        events.forEach(function (e) {
            var s = _this._mapsWrapper
                .subscribeToMapEvent(e.name)
                .subscribe(function (event) {
                var value = {
                    coords: { lat: event.latLng.lat(), lng: event.latLng.lng() }
                };
                e.emitter.emit(value);
            });
            _this._observableSubscriptions.push(s);
        });
    };
    var AgmMap_1;
    /**
     * Map option attributes that can change over time
     */
    AgmMap._mapOptionsAttributes = [
        "disableDoubleClickZoom",
        "scrollwheel",
        "draggable",
        "draggableCursor",
        "draggingCursor",
        "keyboardShortcuts",
        "zoomControl",
        "zoomControlOptions",
        "styles",
        "streetViewControl",
        "streetViewControlOptions",
        "zoom",
        "mapTypeControl",
        "mapTypeControlOptions",
        "minZoom",
        "maxZoom",
        "panControl",
        "panControlOptions",
        "rotateControl",
        "rotateControlOptions",
        "fullscreenControl",
        "fullscreenControlOptions",
        "scaleControl",
        "scaleControlOptions",
        "mapTypeId",
        "clickableIcons",
        "gestureHandling"
    ];
    __decorate([
        _angular_core.Input(),
        __metadata("design:type", Number)
    ], AgmMap.prototype, "longitude", void 0);
    __decorate([
        _angular_core.Input(),
        __metadata("design:type", Number)
    ], AgmMap.prototype, "latitude", void 0);
    __decorate([
        _angular_core.Input(),
        __metadata("design:type", Number)
    ], AgmMap.prototype, "zoom", void 0);
    __decorate([
        _angular_core.Input(),
        __metadata("design:type", Number)
    ], AgmMap.prototype, "tilt", void 0);
    __decorate([
        _angular_core.Input(),
        __metadata("design:type", Number)
    ], AgmMap.prototype, "minZoom", void 0);
    __decorate([
        _angular_core.Input(),
        __metadata("design:type", Number)
    ], AgmMap.prototype, "maxZoom", void 0);
    __decorate([
        _angular_core.Input("mapDraggable"),
        __metadata("design:type", Boolean)
    ], AgmMap.prototype, "draggable", void 0);
    __decorate([
        _angular_core.Input(),
        __metadata("design:type", Boolean)
    ], AgmMap.prototype, "disableDoubleClickZoom", void 0);
    __decorate([
        _angular_core.Input(),
        __metadata("design:type", Boolean)
    ], AgmMap.prototype, "disableDefaultUI", void 0);
    __decorate([
        _angular_core.Input(),
        __metadata("design:type", Boolean)
    ], AgmMap.prototype, "scrollwheel", void 0);
    __decorate([
        _angular_core.Input(),
        __metadata("design:type", String)
    ], AgmMap.prototype, "backgroundColor", void 0);
    __decorate([
        _angular_core.Input(),
        __metadata("design:type", String)
    ], AgmMap.prototype, "draggableCursor", void 0);
    __decorate([
        _angular_core.Input(),
        __metadata("design:type", String)
    ], AgmMap.prototype, "draggingCursor", void 0);
    __decorate([
        _angular_core.Input(),
        __metadata("design:type", Boolean)
    ], AgmMap.prototype, "keyboardShortcuts", void 0);
    __decorate([
        _angular_core.Input(),
        __metadata("design:type", Boolean)
    ], AgmMap.prototype, "zoomControl", void 0);
    __decorate([
        _angular_core.Input(),
        __metadata("design:type", Object)
    ], AgmMap.prototype, "zoomControlOptions", void 0);
    __decorate([
        _angular_core.Input(),
        __metadata("design:type", Array)
    ], AgmMap.prototype, "styles", void 0);
    __decorate([
        _angular_core.Input(),
        __metadata("design:type", Boolean)
    ], AgmMap.prototype, "usePanning", void 0);
    __decorate([
        _angular_core.Input(),
        __metadata("design:type", Boolean)
    ], AgmMap.prototype, "streetViewControl", void 0);
    __decorate([
        _angular_core.Input(),
        __metadata("design:type", Object)
    ], AgmMap.prototype, "streetViewControlOptions", void 0);
    __decorate([
        _angular_core.Input(),
        __metadata("design:type", Object)
    ], AgmMap.prototype, "fitBounds", void 0);
    __decorate([
        _angular_core.Input(),
        __metadata("design:type", Array)
    ], AgmMap.prototype, "fitPoints", void 0);
    __decorate([
        _angular_core.Input(),
        __metadata("design:type", Boolean)
    ], AgmMap.prototype, "fitMultiple", void 0);
    __decorate([
        _angular_core.Input(),
        __metadata("design:type", Boolean)
    ], AgmMap.prototype, "trafficLayer", void 0);
    __decorate([
        _angular_core.Input(),
        __metadata("design:type", Boolean)
    ], AgmMap.prototype, "scaleControl", void 0);
    __decorate([
        _angular_core.Input(),
        __metadata("design:type", Object)
    ], AgmMap.prototype, "scaleControlOptions", void 0);
    __decorate([
        _angular_core.Input(),
        __metadata("design:type", Boolean)
    ], AgmMap.prototype, "mapTypeControl", void 0);
    __decorate([
        _angular_core.Input(),
        __metadata("design:type", Boolean)
    ], AgmMap.prototype, "mapCustomControl", void 0);
    __decorate([
        _angular_core.Input(),
        __metadata("design:type", Object)
    ], AgmMap.prototype, "mapTypeControlOptions", void 0);
    __decorate([
        _angular_core.Input(),
        __metadata("design:type", Boolean)
    ], AgmMap.prototype, "panControl", void 0);
    __decorate([
        _angular_core.Input(),
        __metadata("design:type", Object)
    ], AgmMap.prototype, "panControlOptions", void 0);
    __decorate([
        _angular_core.Input(),
        __metadata("design:type", Boolean)
    ], AgmMap.prototype, "rotateControl", void 0);
    __decorate([
        _angular_core.Input(),
        __metadata("design:type", Object)
    ], AgmMap.prototype, "rotateControlOptions", void 0);
    __decorate([
        _angular_core.Input(),
        __metadata("design:type", Boolean)
    ], AgmMap.prototype, "fullscreenControl", void 0);
    __decorate([
        _angular_core.Input(),
        __metadata("design:type", Object)
    ], AgmMap.prototype, "fullscreenControlOptions", void 0);
    __decorate([
        _angular_core.Input(),
        __metadata("design:type", String)
    ], AgmMap.prototype, "mapTypeId", void 0);
    __decorate([
        _angular_core.Input(),
        __metadata("design:type", Boolean)
    ], AgmMap.prototype, "clickableIcons", void 0);
    __decorate([
        _angular_core.Input(),
        __metadata("design:type", String)
    ], AgmMap.prototype, "gestureHandling", void 0);
    __decorate([
        _angular_core.Input(),
        __metadata("design:type", Object)
    ], AgmMap.prototype, "drawingModes", void 0);
    __decorate([
        _angular_core.Input(),
        __metadata("design:type", String)
    ], AgmMap.prototype, "drawingManagerPosition", void 0);
    __decorate([
        _angular_core.Input(),
        __metadata("design:type", Array)
    ], AgmMap.prototype, "extraControls", void 0);
    __decorate([
        _angular_core.Output(),
        __metadata("design:type", _angular_core.EventEmitter)
    ], AgmMap.prototype, "mapClick", void 0);
    __decorate([
        _angular_core.Output(),
        __metadata("design:type", _angular_core.EventEmitter)
    ], AgmMap.prototype, "mapRightClick", void 0);
    __decorate([
        _angular_core.Output(),
        __metadata("design:type", _angular_core.EventEmitter)
    ], AgmMap.prototype, "mapDblClick", void 0);
    __decorate([
        _angular_core.Output(),
        __metadata("design:type", _angular_core.EventEmitter)
    ], AgmMap.prototype, "centerChange", void 0);
    __decorate([
        _angular_core.Output(),
        __metadata("design:type", _angular_core.EventEmitter)
    ], AgmMap.prototype, "boundsChange", void 0);
    __decorate([
        _angular_core.Output(),
        __metadata("design:type", _angular_core.EventEmitter)
    ], AgmMap.prototype, "idle", void 0);
    __decorate([
        _angular_core.Output(),
        __metadata("design:type", _angular_core.EventEmitter)
    ], AgmMap.prototype, "zoomChange", void 0);
    __decorate([
        _angular_core.Output(),
        __metadata("design:type", _angular_core.EventEmitter)
    ], AgmMap.prototype, "mapReady", void 0);
    __decorate([
        _angular_core.Output(),
        __metadata("design:type", _angular_core.EventEmitter)
    ], AgmMap.prototype, "polygonComplete", void 0);
    __decorate([
        _angular_core.Output(),
        __metadata("design:type", _angular_core.EventEmitter)
    ], AgmMap.prototype, "polygonDeleted", void 0);
    __decorate([
        _angular_core.Output(),
        __metadata("design:type", _angular_core.EventEmitter)
    ], AgmMap.prototype, "extraControlsAction", void 0);
    AgmMap = AgmMap_1 = __decorate([
        _angular_core.Component({
            selector: "agm-map",
            providers: [
                GoogleMapsAPIWrapper,
                MarkerManager,
                InfoWindowManager,
                CircleManager,
                PolylineManager,
                PolygonManager,
                KmlLayerManager,
                DataLayerManager
            ],
            host: {
                // todo: deprecated - we will remove it with the next version
                "[class.sebm-google-map-container]": "true"
            },
            styles: [
                "\n    .agm-map-container-inner {\n      width: inherit;\n      height: 100%;\n    }\n    .agm-map-content {\n      display:none;\n    }\n  "
            ],
            template: "\n    <div class='agm-map-container-inner sebm-google-map-container-inner'></div>\n    <div class='agm-map-content'>\n      <ng-content></ng-content>\n    </div>\n  "
        }),
        __metadata("design:paramtypes", [_angular_core.ElementRef,
            GoogleMapsAPIWrapper,
            PolygonManager])
    ], AgmMap);
    return AgmMap;
}());

var __decorate$10 = (window && window.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$9 = (window && window.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AgmCircle = /** @class */ (function () {
    function AgmCircle(_manager) {
        this._manager = _manager;
        /**
         * Indicates whether this Circle handles mouse events. Defaults to true.
         */
        this.clickable = true;
        /**
         * If set to true, the user can drag this circle over the map. Defaults to false.
         */
        // tslint:disable-next-line:no-input-rename
        this.draggable = false;
        /**
         * If set to true, the user can edit this circle by dragging the control points shown at
         * the center and around the circumference of the circle. Defaults to false.
         */
        this.editable = false;
        /**
         * The radius in meters on the Earth's surface.
         */
        this.radius = 0;
        /**
         * The stroke position. Defaults to CENTER.
         * This property is not supported on Internet Explorer 8 and earlier.
         */
        this.strokePosition = 'CENTER';
        /**
         * The stroke width in pixels.
         */
        this.strokeWeight = 0;
        /**
         * Whether this circle is visible on the map. Defaults to true.
         */
        this.visible = true;
        /**
         * This event is fired when the circle's center is changed.
         */
        this.centerChange = new _angular_core.EventEmitter();
        /**
         * This event emitter gets emitted when the user clicks on the circle.
         */
        this.circleClick = new _angular_core.EventEmitter();
        /**
         * This event emitter gets emitted when the user clicks on the circle.
         */
        this.circleDblClick = new _angular_core.EventEmitter();
        /**
         * This event is repeatedly fired while the user drags the circle.
         */
        this.drag = new _angular_core.EventEmitter();
        /**
         * This event is fired when the user stops dragging the circle.
         */
        this.dragEnd = new _angular_core.EventEmitter();
        /**
         * This event is fired when the user starts dragging the circle.
         */
        this.dragStart = new _angular_core.EventEmitter();
        /**
         * This event is fired when the DOM mousedown event is fired on the circle.
         */
        this.mouseDown = new _angular_core.EventEmitter();
        /**
         * This event is fired when the DOM mousemove event is fired on the circle.
         */
        this.mouseMove = new _angular_core.EventEmitter();
        /**
         * This event is fired on circle mouseout.
         */
        this.mouseOut = new _angular_core.EventEmitter();
        /**
         * This event is fired on circle mouseover.
         */
        this.mouseOver = new _angular_core.EventEmitter();
        /**
         * This event is fired when the DOM mouseup event is fired on the circle.
         */
        this.mouseUp = new _angular_core.EventEmitter();
        /**
         * This event is fired when the circle's radius is changed.
         */
        this.radiusChange = new _angular_core.EventEmitter();
        /**
         * This event is fired when the circle is right-clicked on.
         */
        this.rightClick = new _angular_core.EventEmitter();
        this._circleAddedToManager = false;
        this._eventSubscriptions = [];
    }
    AgmCircle_1 = AgmCircle;
    /** @internal */
    AgmCircle.prototype.ngOnInit = function () {
        this._manager.addCircle(this);
        this._circleAddedToManager = true;
        this._registerEventListeners();
    };
    /** @internal */
    AgmCircle.prototype.ngOnChanges = function (changes) {
        if (!this._circleAddedToManager) {
            return;
        }
        if (changes['latitude'] || changes['longitude']) {
            this._manager.setCenter(this);
        }
        if (changes['editable']) {
            this._manager.setEditable(this);
        }
        if (changes['draggable']) {
            this._manager.setDraggable(this);
        }
        if (changes['visible']) {
            this._manager.setVisible(this);
        }
        if (changes['radius']) {
            this._manager.setRadius(this);
        }
        this._updateCircleOptionsChanges(changes);
    };
    AgmCircle.prototype._updateCircleOptionsChanges = function (changes) {
        var options = {};
        var optionKeys = Object.keys(changes).filter(function (k) { return AgmCircle_1._mapOptions.indexOf(k) !== -1; });
        optionKeys.forEach(function (k) { options[k] = changes[k].currentValue; });
        if (optionKeys.length > 0) {
            this._manager.setOptions(this, options);
        }
    };
    AgmCircle.prototype._registerEventListeners = function () {
        var _this = this;
        var events = new Map();
        events.set('center_changed', this.centerChange);
        events.set('click', this.circleClick);
        events.set('dblclick', this.circleDblClick);
        events.set('drag', this.drag);
        events.set('dragend', this.dragEnd);
        events.set('dragStart', this.dragStart);
        events.set('mousedown', this.mouseDown);
        events.set('mousemove', this.mouseMove);
        events.set('mouseout', this.mouseOut);
        events.set('mouseover', this.mouseOver);
        events.set('mouseup', this.mouseUp);
        events.set('radius_changed', this.radiusChange);
        events.set('rightclick', this.rightClick);
        events.forEach(function (eventEmitter, eventName) {
            _this._eventSubscriptions.push(_this._manager.createEventObservable(eventName, _this).subscribe(function (value) {
                switch (eventName) {
                    case 'radius_changed':
                        _this._manager.getRadius(_this).then(function (radius) { return eventEmitter.emit(radius); });
                        break;
                    case 'center_changed':
                        _this._manager.getCenter(_this).then(function (center) {
                            return eventEmitter.emit({ lat: center.lat(), lng: center.lng() });
                        });
                        break;
                    default:
                        eventEmitter.emit({ coords: { lat: value.latLng.lat(), lng: value.latLng.lng() } });
                }
            }));
        });
    };
    /** @internal */
    AgmCircle.prototype.ngOnDestroy = function () {
        this._eventSubscriptions.forEach(function (s) { s.unsubscribe(); });
        this._eventSubscriptions = null;
        this._manager.removeCircle(this);
    };
    /**
     * Gets the LatLngBounds of this Circle.
     */
    AgmCircle.prototype.getBounds = function () { return this._manager.getBounds(this); };
    AgmCircle.prototype.getCenter = function () { return this._manager.getCenter(this); };
    var AgmCircle_1;
    AgmCircle._mapOptions = [
        'fillColor', 'fillOpacity', 'strokeColor', 'strokeOpacity', 'strokePosition', 'strokeWeight',
        'visible', 'zIndex'
    ];
    __decorate$10([
        _angular_core.Input(),
        __metadata$9("design:type", Number)
    ], AgmCircle.prototype, "latitude", void 0);
    __decorate$10([
        _angular_core.Input(),
        __metadata$9("design:type", Number)
    ], AgmCircle.prototype, "longitude", void 0);
    __decorate$10([
        _angular_core.Input(),
        __metadata$9("design:type", Boolean)
    ], AgmCircle.prototype, "clickable", void 0);
    __decorate$10([
        _angular_core.Input('circleDraggable'),
        __metadata$9("design:type", Boolean)
    ], AgmCircle.prototype, "draggable", void 0);
    __decorate$10([
        _angular_core.Input(),
        __metadata$9("design:type", Boolean)
    ], AgmCircle.prototype, "editable", void 0);
    __decorate$10([
        _angular_core.Input(),
        __metadata$9("design:type", String)
    ], AgmCircle.prototype, "fillColor", void 0);
    __decorate$10([
        _angular_core.Input(),
        __metadata$9("design:type", Number)
    ], AgmCircle.prototype, "fillOpacity", void 0);
    __decorate$10([
        _angular_core.Input(),
        __metadata$9("design:type", Number)
    ], AgmCircle.prototype, "radius", void 0);
    __decorate$10([
        _angular_core.Input(),
        __metadata$9("design:type", String)
    ], AgmCircle.prototype, "strokeColor", void 0);
    __decorate$10([
        _angular_core.Input(),
        __metadata$9("design:type", Number)
    ], AgmCircle.prototype, "strokeOpacity", void 0);
    __decorate$10([
        _angular_core.Input(),
        __metadata$9("design:type", String)
    ], AgmCircle.prototype, "strokePosition", void 0);
    __decorate$10([
        _angular_core.Input(),
        __metadata$9("design:type", Number)
    ], AgmCircle.prototype, "strokeWeight", void 0);
    __decorate$10([
        _angular_core.Input(),
        __metadata$9("design:type", Boolean)
    ], AgmCircle.prototype, "visible", void 0);
    __decorate$10([
        _angular_core.Input(),
        __metadata$9("design:type", Number)
    ], AgmCircle.prototype, "zIndex", void 0);
    __decorate$10([
        _angular_core.Output(),
        __metadata$9("design:type", _angular_core.EventEmitter)
    ], AgmCircle.prototype, "centerChange", void 0);
    __decorate$10([
        _angular_core.Output(),
        __metadata$9("design:type", _angular_core.EventEmitter)
    ], AgmCircle.prototype, "circleClick", void 0);
    __decorate$10([
        _angular_core.Output(),
        __metadata$9("design:type", _angular_core.EventEmitter)
    ], AgmCircle.prototype, "circleDblClick", void 0);
    __decorate$10([
        _angular_core.Output(),
        __metadata$9("design:type", _angular_core.EventEmitter)
    ], AgmCircle.prototype, "drag", void 0);
    __decorate$10([
        _angular_core.Output(),
        __metadata$9("design:type", _angular_core.EventEmitter)
    ], AgmCircle.prototype, "dragEnd", void 0);
    __decorate$10([
        _angular_core.Output(),
        __metadata$9("design:type", _angular_core.EventEmitter)
    ], AgmCircle.prototype, "dragStart", void 0);
    __decorate$10([
        _angular_core.Output(),
        __metadata$9("design:type", _angular_core.EventEmitter)
    ], AgmCircle.prototype, "mouseDown", void 0);
    __decorate$10([
        _angular_core.Output(),
        __metadata$9("design:type", _angular_core.EventEmitter)
    ], AgmCircle.prototype, "mouseMove", void 0);
    __decorate$10([
        _angular_core.Output(),
        __metadata$9("design:type", _angular_core.EventEmitter)
    ], AgmCircle.prototype, "mouseOut", void 0);
    __decorate$10([
        _angular_core.Output(),
        __metadata$9("design:type", _angular_core.EventEmitter)
    ], AgmCircle.prototype, "mouseOver", void 0);
    __decorate$10([
        _angular_core.Output(),
        __metadata$9("design:type", _angular_core.EventEmitter)
    ], AgmCircle.prototype, "mouseUp", void 0);
    __decorate$10([
        _angular_core.Output(),
        __metadata$9("design:type", _angular_core.EventEmitter)
    ], AgmCircle.prototype, "radiusChange", void 0);
    __decorate$10([
        _angular_core.Output(),
        __metadata$9("design:type", _angular_core.EventEmitter)
    ], AgmCircle.prototype, "rightClick", void 0);
    AgmCircle = AgmCircle_1 = __decorate$10([
        _angular_core.Directive({
            selector: 'agm-circle'
        }),
        __metadata$9("design:paramtypes", [CircleManager])
    ], AgmCircle);
    return AgmCircle;
}());

var __decorate$11 = (window && window.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$10 = (window && window.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var infoWindowId = 0;
/**
 * AgmInfoWindow renders a info window inside a {@link AgmMarker} or standalone.
 *
 * ### Example
 * ```typescript
 * import { Component } from '@angular/core';
 *
 * @Component({
 *  selector: 'my-map-cmp',
 *  styles: [`
 *    .agm-map-container {
 *      height: 300px;
 *    }
 * `],
 *  template: `
 *    <agm-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
 *      <agm-marker [latitude]="lat" [longitude]="lng" [label]="'M'">
 *        <agm-info-window [disableAutoPan]="true">
 *          Hi, this is the content of the <strong>info window</strong>
 *        </agm-info-window>
 *      </agm-marker>
 *    </agm-map>
 *  `
 * })
 * ```
 */
var AgmInfoWindow = /** @class */ (function () {
    function AgmInfoWindow(_infoWindowManager, _el) {
        this._infoWindowManager = _infoWindowManager;
        this._el = _el;
        /**
         * Sets the open state for the InfoWindow. You can also call the open() and close() methods.
         */
        this.isOpen = false;
        /**
         * Emits an event when the info window is closed.
         */
        this.infoWindowClose = new _angular_core.EventEmitter();
        this._infoWindowAddedToManager = false;
        this._id = (infoWindowId++).toString();
    }
    AgmInfoWindow_1 = AgmInfoWindow;
    AgmInfoWindow.prototype.ngOnInit = function () {
        this.content = this._el.nativeElement.querySelector('.agm-info-window-content');
        this._infoWindowManager.addInfoWindow(this);
        this._infoWindowAddedToManager = true;
        this._updateOpenState();
        this._registerEventListeners();
    };
    /** @internal */
    AgmInfoWindow.prototype.ngOnChanges = function (changes) {
        if (!this._infoWindowAddedToManager) {
            return;
        }
        if ((changes['latitude'] || changes['longitude']) && typeof this.latitude === 'number' &&
            typeof this.longitude === 'number') {
            this._infoWindowManager.setPosition(this);
        }
        if (changes['zIndex']) {
            this._infoWindowManager.setZIndex(this);
        }
        if (changes['isOpen']) {
            this._updateOpenState();
        }
        this._setInfoWindowOptions(changes);
    };
    AgmInfoWindow.prototype._registerEventListeners = function () {
        var _this = this;
        this._infoWindowManager.createEventObservable('closeclick', this).subscribe(function () {
            _this.isOpen = false;
            _this.infoWindowClose.emit();
        });
    };
    AgmInfoWindow.prototype._updateOpenState = function () {
        this.isOpen ? this.open() : this.close();
    };
    AgmInfoWindow.prototype._setInfoWindowOptions = function (changes) {
        var options = {};
        var optionKeys = Object.keys(changes).filter(function (k) { return AgmInfoWindow_1._infoWindowOptionsInputs.indexOf(k) !== -1; });
        optionKeys.forEach(function (k) { options[k] = changes[k].currentValue; });
        this._infoWindowManager.setOptions(this, options);
    };
    /**
     * Opens the info window.
     */
    AgmInfoWindow.prototype.open = function () { return this._infoWindowManager.open(this); };
    /**
     * Closes the info window.
     */
    AgmInfoWindow.prototype.close = function () {
        var _this = this;
        return this._infoWindowManager.close(this).then(function () { _this.infoWindowClose.emit(); });
    };
    /** @internal */
    AgmInfoWindow.prototype.id = function () { return this._id; };
    /** @internal */
    AgmInfoWindow.prototype.toString = function () { return 'AgmInfoWindow-' + this._id.toString(); };
    /** @internal */
    AgmInfoWindow.prototype.ngOnDestroy = function () { this._infoWindowManager.deleteInfoWindow(this); };
    var AgmInfoWindow_1;
    AgmInfoWindow._infoWindowOptionsInputs = ['disableAutoPan', 'maxWidth'];
    __decorate$11([
        _angular_core.Input(),
        __metadata$10("design:type", Number)
    ], AgmInfoWindow.prototype, "latitude", void 0);
    __decorate$11([
        _angular_core.Input(),
        __metadata$10("design:type", Number)
    ], AgmInfoWindow.prototype, "longitude", void 0);
    __decorate$11([
        _angular_core.Input(),
        __metadata$10("design:type", Boolean)
    ], AgmInfoWindow.prototype, "disableAutoPan", void 0);
    __decorate$11([
        _angular_core.Input(),
        __metadata$10("design:type", Number)
    ], AgmInfoWindow.prototype, "zIndex", void 0);
    __decorate$11([
        _angular_core.Input(),
        __metadata$10("design:type", Number)
    ], AgmInfoWindow.prototype, "maxWidth", void 0);
    __decorate$11([
        _angular_core.Input(),
        __metadata$10("design:type", Boolean)
    ], AgmInfoWindow.prototype, "isOpen", void 0);
    __decorate$11([
        _angular_core.Output(),
        __metadata$10("design:type", _angular_core.EventEmitter)
    ], AgmInfoWindow.prototype, "infoWindowClose", void 0);
    AgmInfoWindow = AgmInfoWindow_1 = __decorate$11([
        _angular_core.Component({
            selector: 'agm-info-window',
            template: "<div class='agm-info-window-content'>\n      <ng-content></ng-content>\n    </div>\n  "
        }),
        __metadata$10("design:paramtypes", [InfoWindowManager, _angular_core.ElementRef])
    ], AgmInfoWindow);
    return AgmInfoWindow;
}());

var __decorate$12 = (window && window.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$11 = (window && window.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var layerId = 0;
var AgmKmlLayer = /** @class */ (function () {
    function AgmKmlLayer(_manager) {
        this._manager = _manager;
        this._addedToManager = false;
        this._id = (layerId++).toString();
        this._subscriptions = [];
        /**
         * If true, the layer receives mouse events. Default value is true.
         */
        this.clickable = true;
        /**
         * By default, the input map is centered and zoomed to the bounding box of the contents of the
         * layer.
         * If this option is set to true, the viewport is left unchanged, unless the map's center and zoom
         * were never set.
         */
        this.preserveViewport = false;
        /**
         * Whether to render the screen overlays. Default true.
         */
        this.screenOverlays = true;
        /**
         * Suppress the rendering of info windows when layer features are clicked.
         */
        this.suppressInfoWindows = false;
        /**
         * The URL of the KML document to display.
         */
        this.url = null;
        /**
         * The z-index of the layer.
         */
        this.zIndex = null;
        /**
         * This event is fired when a feature in the layer is clicked.
         */
        this.layerClick = new _angular_core.EventEmitter();
        /**
         * This event is fired when the KML layers default viewport has changed.
         */
        this.defaultViewportChange = new _angular_core.EventEmitter();
        /**
         * This event is fired when the KML layer has finished loading.
         * At this point it is safe to read the status property to determine if the layer loaded
         * successfully.
         */
        this.statusChange = new _angular_core.EventEmitter();
    }
    AgmKmlLayer_1 = AgmKmlLayer;
    AgmKmlLayer.prototype.ngOnInit = function () {
        if (this._addedToManager) {
            return;
        }
        this._manager.addKmlLayer(this);
        this._addedToManager = true;
        this._addEventListeners();
    };
    AgmKmlLayer.prototype.ngOnChanges = function (changes) {
        if (!this._addedToManager) {
            return;
        }
        this._updatePolygonOptions(changes);
    };
    AgmKmlLayer.prototype._updatePolygonOptions = function (changes) {
        var options = Object.keys(changes)
            .filter(function (k) { return AgmKmlLayer_1._kmlLayerOptions.indexOf(k) !== -1; })
            .reduce(function (obj, k) {
            obj[k] = changes[k].currentValue;
            return obj;
        }, {});
        if (Object.keys(options).length > 0) {
            this._manager.setOptions(this, options);
        }
    };
    AgmKmlLayer.prototype._addEventListeners = function () {
        var _this = this;
        var listeners = [
            { name: 'click', handler: function (ev) { return _this.layerClick.emit(ev); } },
            { name: 'defaultviewport_changed', handler: function () { return _this.defaultViewportChange.emit(); } },
            { name: 'status_changed', handler: function () { return _this.statusChange.emit(); } },
        ];
        listeners.forEach(function (obj) {
            var os = _this._manager.createEventObservable(obj.name, _this).subscribe(obj.handler);
            _this._subscriptions.push(os);
        });
    };
    /** @internal */
    AgmKmlLayer.prototype.id = function () { return this._id; };
    /** @internal */
    AgmKmlLayer.prototype.toString = function () { return "AgmKmlLayer-" + this._id.toString(); };
    /** @internal */
    AgmKmlLayer.prototype.ngOnDestroy = function () {
        this._manager.deleteKmlLayer(this);
        // unsubscribe all registered observable subscriptions
        this._subscriptions.forEach(function (s) { return s.unsubscribe(); });
    };
    var AgmKmlLayer_1;
    AgmKmlLayer._kmlLayerOptions = ['clickable', 'preserveViewport', 'screenOverlays', 'suppressInfoWindows', 'url', 'zIndex'];
    __decorate$12([
        _angular_core.Input(),
        __metadata$11("design:type", Boolean)
    ], AgmKmlLayer.prototype, "clickable", void 0);
    __decorate$12([
        _angular_core.Input(),
        __metadata$11("design:type", Boolean)
    ], AgmKmlLayer.prototype, "preserveViewport", void 0);
    __decorate$12([
        _angular_core.Input(),
        __metadata$11("design:type", Boolean)
    ], AgmKmlLayer.prototype, "screenOverlays", void 0);
    __decorate$12([
        _angular_core.Input(),
        __metadata$11("design:type", Boolean)
    ], AgmKmlLayer.prototype, "suppressInfoWindows", void 0);
    __decorate$12([
        _angular_core.Input(),
        __metadata$11("design:type", String)
    ], AgmKmlLayer.prototype, "url", void 0);
    __decorate$12([
        _angular_core.Input(),
        __metadata$11("design:type", Number)
    ], AgmKmlLayer.prototype, "zIndex", void 0);
    __decorate$12([
        _angular_core.Output(),
        __metadata$11("design:type", _angular_core.EventEmitter)
    ], AgmKmlLayer.prototype, "layerClick", void 0);
    __decorate$12([
        _angular_core.Output(),
        __metadata$11("design:type", _angular_core.EventEmitter)
    ], AgmKmlLayer.prototype, "defaultViewportChange", void 0);
    __decorate$12([
        _angular_core.Output(),
        __metadata$11("design:type", _angular_core.EventEmitter)
    ], AgmKmlLayer.prototype, "statusChange", void 0);
    AgmKmlLayer = AgmKmlLayer_1 = __decorate$12([
        _angular_core.Directive({
            selector: 'agm-kml-layer'
        }),
        __metadata$11("design:paramtypes", [KmlLayerManager])
    ], AgmKmlLayer);
    return AgmKmlLayer;
}());

var __decorate$13 = (window && window.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$12 = (window && window.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var layerId$1 = 0;
/**
 * AgmDataLayer enables the user to add data layers to the map.
 *
 * ### Example
 * ```typescript
 * import { Component } from 'angular2/core';
 * import { AgmMap, AgmDataLayer } from
 * 'angular-google-maps/core';
 *
 * @Component({
 *  selector: 'my-map-cmp',
 *  directives: [AgmMap, AgmDataLayer],
 *  styles: [`
 *    .agm-container {
 *      height: 300px;
 *    }
 * `],
 *  template: `
 * <agm-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
 * 	  <agm-data-layer [geoJson]="geoJsonObject" (layerClick)="clicked($event)" [style]="styleFunc">
 * 	  </agm-data-layer>
 * </agm-map>
 *  `
 * })
 * export class MyMapCmp {
 *   lat: number = -25.274449;
 *   lng: number = 133.775060;
 *   zoom: number = 5;
 *
 * clicked(clickEvent) {
 *    console.log(clickEvent);
 *  }
 *
 *  styleFunc(feature) {
 *    return ({
 *      clickable: false,
 *      fillColor: feature.getProperty('color'),
 *      strokeWeight: 1
 *    });
 *  }
 *
 *  geoJsonObject: Object = {
 *    "type": "FeatureCollection",
 *    "features": [
 *      {
 *        "type": "Feature",
 *        "properties": {
 *          "letter": "G",
 *          "color": "blue",
 *          "rank": "7",
 *          "ascii": "71"
 *        },
 *        "geometry": {
 *          "type": "Polygon",
 *          "coordinates": [
 *            [
 *              [123.61, -22.14], [122.38, -21.73], [121.06, -21.69], [119.66, -22.22], [119.00, -23.40],
 *              [118.65, -24.76], [118.43, -26.07], [118.78, -27.56], [119.22, -28.57], [120.23, -29.49],
 *              [121.77, -29.87], [123.57, -29.64], [124.45, -29.03], [124.71, -27.95], [124.80, -26.70],
 *              [124.80, -25.60], [123.61, -25.64], [122.56, -25.64], [121.72, -25.72], [121.81, -26.62],
 *              [121.86, -26.98], [122.60, -26.90], [123.57, -27.05], [123.57, -27.68], [123.35, -28.18],
 *              [122.51, -28.38], [121.77, -28.26], [121.02, -27.91], [120.49, -27.21], [120.14, -26.50],
 *              [120.10, -25.64], [120.27, -24.52], [120.67, -23.68], [121.72, -23.32], [122.43, -23.48],
 *              [123.04, -24.04], [124.54, -24.28], [124.58, -23.20], [123.61, -22.14]
 *            ]
 *          ]
 *        }
 *      },
 *      {
 *        "type": "Feature",
 *        "properties": {
 *          "letter": "o",
 *          "color": "red",
 *          "rank": "15",
 *          "ascii": "111"
 *        },
 *        "geometry": {
 *          "type": "Polygon",
 *          "coordinates": [
 *            [
 *              [128.84, -25.76], [128.18, -25.60], [127.96, -25.52], [127.88, -25.52], [127.70, -25.60],
 *              [127.26, -25.79], [126.60, -26.11], [126.16, -26.78], [126.12, -27.68], [126.21, -28.42],
 *              [126.69, -29.49], [127.74, -29.80], [128.80, -29.72], [129.41, -29.03], [129.72, -27.95],
 *              [129.68, -27.21], [129.33, -26.23], [128.84, -25.76]
 *            ],
 *            [
 *              [128.45, -27.44], [128.32, -26.94], [127.70, -26.82], [127.35, -27.05], [127.17, -27.80],
 *              [127.57, -28.22], [128.10, -28.42], [128.49, -27.80], [128.45, -27.44]
 *            ]
 *          ]
 *        }
 *      },
 *      {
 *        "type": "Feature",
 *        "properties": {
 *          "letter": "o",
 *          "color": "yellow",
 *          "rank": "15",
 *          "ascii": "111"
 *        },
 *        "geometry": {
 *          "type": "Polygon",
 *          "coordinates": [
 *            [
 *              [131.87, -25.76], [131.35, -26.07], [130.95, -26.78], [130.82, -27.64], [130.86, -28.53],
 *              [131.26, -29.22], [131.92, -29.76], [132.45, -29.87], [133.06, -29.76], [133.72, -29.34],
 *              [134.07, -28.80], [134.20, -27.91], [134.07, -27.21], [133.81, -26.31], [133.37, -25.83],
 *              [132.71, -25.64], [131.87, -25.76]
 *            ],
 *            [
 *              [133.15, -27.17], [132.71, -26.86], [132.09, -26.90], [131.74, -27.56], [131.79, -28.26],
 *              [132.36, -28.45], [132.93, -28.34], [133.15, -27.76], [133.15, -27.17]
 *            ]
 *          ]
 *        }
 *      },
 *      {
 *        "type": "Feature",
 *        "properties": {
 *          "letter": "g",
 *          "color": "blue",
 *          "rank": "7",
 *          "ascii": "103"
 *        },
 *        "geometry": {
 *          "type": "Polygon",
 *          "coordinates": [
 *            [
 *              [138.12, -25.04], [136.84, -25.16], [135.96, -25.36], [135.26, -25.99], [135, -26.90],
 *              [135.04, -27.91], [135.26, -28.88], [136.05, -29.45], [137.02, -29.49], [137.81, -29.49],
 *              [137.94, -29.99], [137.90, -31.20], [137.85, -32.24], [136.88, -32.69], [136.45, -32.36],
 *              [136.27, -31.80], [134.95, -31.84], [135.17, -32.99], [135.52, -33.43], [136.14, -33.76],
 *              [137.06, -33.83], [138.12, -33.65], [138.86, -33.21], [139.30, -32.28], [139.30, -31.24],
 *              [139.30, -30.14], [139.21, -28.96], [139.17, -28.22], [139.08, -27.41], [139.08, -26.47],
 *              [138.99, -25.40], [138.73, -25.00], [138.12, -25.04]
 *            ],
 *            [
 *              [137.50, -26.54], [136.97, -26.47], [136.49, -26.58], [136.31, -27.13], [136.31, -27.72],
 *              [136.58, -27.99], [137.50, -28.03], [137.68, -27.68], [137.59, -26.78], [137.50, -26.54]
 *            ]
 *          ]
 *        }
 *      },
 *      {
 *        "type": "Feature",
 *        "properties": {
 *          "letter": "l",
 *          "color": "green",
 *          "rank": "12",
 *          "ascii": "108"
 *        },
 *        "geometry": {
 *          "type": "Polygon",
 *          "coordinates": [
 *            [
 *              [140.14, -21.04], [140.31, -29.42], [141.67, -29.49], [141.59, -20.92], [140.14, -21.04]
 *            ]
 *          ]
 *        }
 *      },
 *      {
 *        "type": "Feature",
 *        "properties": {
 *          "letter": "e",
 *          "color": "red",
 *          "rank": "5",
 *          "ascii": "101"
 *        },
 *        "geometry": {
 *          "type": "Polygon",
 *          "coordinates": [
 *            [
 *              [144.14, -27.41], [145.67, -27.52], [146.86, -27.09], [146.82, -25.64], [146.25, -25.04],
 *              [145.45, -24.68], [144.66, -24.60], [144.09, -24.76], [143.43, -25.08], [142.99, -25.40],
 *              [142.64, -26.03], [142.64, -27.05], [142.64, -28.26], [143.30, -29.11], [144.18, -29.57],
 *              [145.41, -29.64], [146.46, -29.19], [146.64, -28.72], [146.82, -28.14], [144.84, -28.42],
 *              [144.31, -28.26], [144.14, -27.41]
 *            ],
 *            [
 *              [144.18, -26.39], [144.53, -26.58], [145.19, -26.62], [145.72, -26.35], [145.81, -25.91],
 *              [145.41, -25.68], [144.97, -25.68], [144.49, -25.64], [144, -25.99], [144.18, -26.39]
 *            ]
 *          ]
 *        }
 *      }
 *    ]
 *  };
 * }
 * ```
 */
var AgmDataLayer = /** @class */ (function () {
    function AgmDataLayer(_manager) {
        this._manager = _manager;
        this._addedToManager = false;
        this._id = (layerId$1++).toString();
        this._subscriptions = [];
        /**
         * This event is fired when a feature in the layer is clicked.
         */
        this.layerClick = new _angular_core.EventEmitter();
        /**
         * The geoJson to be displayed
         */
        this.geoJson = null;
    }
    AgmDataLayer_1 = AgmDataLayer;
    AgmDataLayer.prototype.ngOnInit = function () {
        if (this._addedToManager) {
            return;
        }
        this._manager.addDataLayer(this);
        this._addedToManager = true;
        this._addEventListeners();
    };
    AgmDataLayer.prototype._addEventListeners = function () {
        var _this = this;
        var listeners = [
            { name: 'click', handler: function (ev) { return _this.layerClick.emit(ev); } },
        ];
        listeners.forEach(function (obj) {
            var os = _this._manager.createEventObservable(obj.name, _this).subscribe(obj.handler);
            _this._subscriptions.push(os);
        });
    };
    /** @internal */
    AgmDataLayer.prototype.id = function () { return this._id; };
    /** @internal */
    AgmDataLayer.prototype.toString = function () { return "AgmDataLayer-" + this._id.toString(); };
    /** @internal */
    AgmDataLayer.prototype.ngOnDestroy = function () {
        this._manager.deleteDataLayer(this);
        // unsubscribe all registered observable subscriptions
        this._subscriptions.forEach(function (s) { return s.unsubscribe(); });
    };
    /** @internal */
    AgmDataLayer.prototype.ngOnChanges = function (changes) {
        if (!this._addedToManager) {
            return;
        }
        var geoJsonChange = changes['geoJson'];
        if (geoJsonChange) {
            this._manager.updateGeoJson(this, geoJsonChange.currentValue);
        }
        var dataOptions = {};
        var optionKeys = Object.keys(changes).filter(function (k) { return AgmDataLayer_1._dataOptionsAttributes.indexOf(k) !== -1; });
        optionKeys.forEach(function (k) { return dataOptions[k] = changes[k].currentValue; });
        this._manager.setDataOptions(this, dataOptions);
    };
    var AgmDataLayer_1;
    AgmDataLayer._dataOptionsAttributes = ['style'];
    __decorate$13([
        _angular_core.Output(),
        __metadata$12("design:type", _angular_core.EventEmitter)
    ], AgmDataLayer.prototype, "layerClick", void 0);
    __decorate$13([
        _angular_core.Input(),
        __metadata$12("design:type", Object)
    ], AgmDataLayer.prototype, "geoJson", void 0);
    __decorate$13([
        _angular_core.Input(),
        __metadata$12("design:type", Function)
    ], AgmDataLayer.prototype, "style", void 0);
    AgmDataLayer = AgmDataLayer_1 = __decorate$13([
        _angular_core.Directive({
            selector: 'agm-data-layer'
        }),
        __metadata$12("design:paramtypes", [DataLayerManager])
    ], AgmDataLayer);
    return AgmDataLayer;
}());

var __decorate$14 = (window && window.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$13 = (window && window.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var markerId = 0;
/**
 * AgmMarker renders a map marker inside a {@link AgmMap}.
 *
 * ### Example
 * ```typescript
 * import { Component } from '@angular/core';
 *
 * @Component({
 *  selector: 'my-map-cmp',
 *  styles: [`
 *    .agm-map-container {
 *      height: 300px;
 *    }
 * `],
 *  template: `
 *    <agm-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
 *      <agm-marker [latitude]="lat" [longitude]="lng" [label]="'M'">
 *      </agm-marker>
 *    </agm-map>
 *  `
 * })
 * ```
 */
var AgmMarker = /** @class */ (function () {
    function AgmMarker(_markerManager) {
        this._markerManager = _markerManager;
        /**
         * If true, the marker can be dragged. Default value is false.
         */
        // tslint:disable-next-line:no-input-rename
        this.draggable = false;
        /**
         * If true, the marker is visible
         */
        this.visible = true;
        /**
         * Whether to automatically open the child info window when the marker is clicked.
         */
        this.openInfoWindow = true;
        /**
         * The marker's opacity between 0.0 and 1.0.
         */
        this.opacity = 1;
        /**
         * All markers are displayed on the map in order of their zIndex, with higher values displaying in
         * front of markers with lower values. By default, markers are displayed according to their
         * vertical position on screen, with lower markers appearing in front of markers further up the
         * screen.
         */
        this.zIndex = 1;
        /**
         * This event emitter gets emitted when the user clicks on the marker.
         */
        this.markerClick = new _angular_core.EventEmitter();
        /**
         * This event is fired when the user stops dragging the marker.
         */
        this.dragEnd = new _angular_core.EventEmitter();
        /**
         * This event is fired when the user mouses over the marker.
         */
        this.mouseOver = new _angular_core.EventEmitter();
        /**
         * This event is fired when the user mouses outside the marker.
         */
        this.mouseOut = new _angular_core.EventEmitter();
        /**
         * @internal
         */
        this.infoWindow = new _angular_core.QueryList();
        this._markerAddedToManger = false;
        this._observableSubscriptions = [];
        this._id = (markerId++).toString();
    }
    /* @internal */
    AgmMarker.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.handleInfoWindowUpdate();
        this.infoWindow.changes.subscribe(function () { return _this.handleInfoWindowUpdate(); });
    };
    AgmMarker.prototype.handleInfoWindowUpdate = function () {
        var _this = this;
        if (this.infoWindow.length > 1) {
            throw new Error('Expected no more than one info window.');
        }
        this.infoWindow.forEach(function (marker) {
            marker.hostMarker = _this;
        });
    };
    /** @internal */
    AgmMarker.prototype.ngOnChanges = function (changes) {
        if (typeof this.latitude !== 'number' || typeof this.longitude !== 'number') {
            return;
        }
        if (!this._markerAddedToManger) {
            this._markerManager.addMarker(this);
            this._markerAddedToManger = true;
            this._addEventListeners();
            return;
        }
        if (changes['latitude'] || changes['longitude'] || changes['rotate']) {
            this._markerManager.updateMarkerPosition(this);
        }
        if (changes['title']) {
            this._markerManager.updateTitle(this);
        }
        if (changes['label']) {
            this._markerManager.updateLabel(this);
        }
        if (changes['draggable']) {
            this._markerManager.updateDraggable(this);
        }
        if (changes['iconUrl']) {
            this._markerManager.updateIcon(this);
        }
        if (changes['opacity']) {
            this._markerManager.updateOpacity(this);
        }
        if (changes['visible']) {
            this._markerManager.updateVisible(this);
        }
        if (changes['zIndex']) {
            this._markerManager.updateZIndex(this);
        }
    };
    AgmMarker.prototype._addEventListeners = function () {
        var _this = this;
        var cs = this._markerManager.createEventObservable('click', this).subscribe(function () {
            if (_this.openInfoWindow) {
                _this.infoWindow.forEach(function (infoWindow) { return infoWindow.open(); });
            }
            _this.markerClick.emit(null);
        });
        this._observableSubscriptions.push(cs);
        var ds = this._markerManager.createEventObservable('dragend', this)
            .subscribe(function (e) {
            _this.dragEnd.emit({ coords: { lat: e.latLng.lat(), lng: e.latLng.lng() } });
        });
        this._observableSubscriptions.push(ds);
        var mover = this._markerManager.createEventObservable('mouseover', this)
            .subscribe(function (e) {
            _this.mouseOver.emit({ coords: { lat: e.latLng.lat(), lng: e.latLng.lng() } });
        });
        this._observableSubscriptions.push(mover);
        var mout = this._markerManager.createEventObservable('mouseout', this)
            .subscribe(function (e) {
            _this.mouseOut.emit({ coords: { lat: e.latLng.lat(), lng: e.latLng.lng() } });
        });
        this._observableSubscriptions.push(mout);
    };
    /** @internal */
    AgmMarker.prototype.id = function () { return this._id; };
    /** @internal */
    AgmMarker.prototype.toString = function () { return 'AgmMarker-' + this._id.toString(); };
    /** @internal */
    AgmMarker.prototype.ngOnDestroy = function () {
        this._markerManager.deleteMarker(this);
        // unsubscribe all registered observable subscriptions
        this._observableSubscriptions.forEach(function (s) { return s.unsubscribe(); });
    };
    __decorate$14([
        _angular_core.Input(),
        __metadata$13("design:type", Number)
    ], AgmMarker.prototype, "latitude", void 0);
    __decorate$14([
        _angular_core.Input(),
        __metadata$13("design:type", Number)
    ], AgmMarker.prototype, "longitude", void 0);
    __decorate$14([
        _angular_core.Input(),
        __metadata$13("design:type", String)
    ], AgmMarker.prototype, "title", void 0);
    __decorate$14([
        _angular_core.Input(),
        __metadata$13("design:type", String)
    ], AgmMarker.prototype, "label", void 0);
    __decorate$14([
        _angular_core.Input('markerDraggable'),
        __metadata$13("design:type", Boolean)
    ], AgmMarker.prototype, "draggable", void 0);
    __decorate$14([
        _angular_core.Input(),
        __metadata$13("design:type", String)
    ], AgmMarker.prototype, "iconUrl", void 0);
    __decorate$14([
        _angular_core.Input(),
        __metadata$13("design:type", Boolean)
    ], AgmMarker.prototype, "visible", void 0);
    __decorate$14([
        _angular_core.Input(),
        __metadata$13("design:type", Boolean)
    ], AgmMarker.prototype, "openInfoWindow", void 0);
    __decorate$14([
        _angular_core.Input(),
        __metadata$13("design:type", Number)
    ], AgmMarker.prototype, "opacity", void 0);
    __decorate$14([
        _angular_core.Input(),
        __metadata$13("design:type", Number)
    ], AgmMarker.prototype, "zIndex", void 0);
    __decorate$14([
        _angular_core.Output(),
        __metadata$13("design:type", _angular_core.EventEmitter)
    ], AgmMarker.prototype, "markerClick", void 0);
    __decorate$14([
        _angular_core.Output(),
        __metadata$13("design:type", _angular_core.EventEmitter)
    ], AgmMarker.prototype, "dragEnd", void 0);
    __decorate$14([
        _angular_core.Output(),
        __metadata$13("design:type", _angular_core.EventEmitter)
    ], AgmMarker.prototype, "mouseOver", void 0);
    __decorate$14([
        _angular_core.Output(),
        __metadata$13("design:type", _angular_core.EventEmitter)
    ], AgmMarker.prototype, "mouseOut", void 0);
    __decorate$14([
        _angular_core.ContentChildren(AgmInfoWindow),
        __metadata$13("design:type", _angular_core.QueryList)
    ], AgmMarker.prototype, "infoWindow", void 0);
    AgmMarker = __decorate$14([
        _angular_core.Directive({
            selector: 'agm-marker'
        }),
        __metadata$13("design:paramtypes", [MarkerManager])
    ], AgmMarker);
    return AgmMarker;
}());

var __decorate$15 = (window && window.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$14 = (window && window.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * AgmPolygon renders a polygon on a {@link AgmMap}
 *
 * ### Example
 * ```typescript
 * import { Component } from '@angular/core';
 *
 * @Component({
 *  selector: 'my-map-cmp',
 *  styles: [`
 *    agm-map {
 *      height: 300px;
 *    }
 * `],
 *  template: `
 *    <agm-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
 *      <agm-polygon [paths]="paths">
 *      </agm-polygon>
 *    </agm-map>
 *  `
 * })
 * export class MyMapCmp {
 *   lat: number = 0;
 *   lng: number = 0;
 *   zoom: number = 10;
 *   paths: Array<LatLngLiteral> = [
 *     { lat: 0,  lng: 10 },
 *     { lat: 0,  lng: 20 },
 *     { lat: 10, lng: 20 },
 *     { lat: 10, lng: 10 },
 *     { lat: 0,  lng: 10 }
 *   ]
 *   // Nesting paths will create a hole where they overlap;
 *   nestedPaths: Array<Array<LatLngLiteral>> = [[
 *     { lat: 0,  lng: 10 },
 *     { lat: 0,  lng: 20 },
 *     { lat: 10, lng: 20 },
 *     { lat: 10, lng: 10 },
 *     { lat: 0,  lng: 10 }
 *   ], [
 *     { lat: 0, lng: 15 },
 *     { lat: 0, lng: 20 },
 *     { lat: 5, lng: 20 },
 *     { lat: 5, lng: 15 },
 *     { lat: 0, lng: 15 }
 *   ]]
 * }
 * ```
 */
var AgmPolygon = /** @class */ (function () {
    // private _listeners: Subscription[] = [];
    function AgmPolygon(_polygonManager) {
        this._polygonManager = _polygonManager;
        /**
         * Indicates whether this Polygon handles mouse events. Defaults to true.
         */
        this.clickable = true;
        /**
         * If set to true, the user can drag this shape over the map. The geodesic
         * property defines the mode of dragging. Defaults to false.
         */
        // tslint:disable-next-line:no-input-rename
        this.draggable = false;
        /**
         * If set to true, the user can edit this shape by dragging the control
         * points shown at the vertices and on each segment. Defaults to false.
         */
        this.editable = false;
        /**
         * When true, edges of the polygon are interpreted as geodesic and will
         * follow the curvature of the Earth. When false, edges of the polygon are
         * rendered as straight lines in screen space. Note that the shape of a
         * geodesic polygon may appear to change when dragged, as the dimensions
         * are maintained relative to the surface of the earth. Defaults to false.
         */
        this.geodesic = false;
        /**
         * The ordered sequence of coordinates that designates a closed loop.
         * Unlike polylines, a polygon may consist of one or more paths.
         *  As a result, the paths property may specify one or more arrays of
         * LatLng coordinates. Paths are closed automatically; do not repeat the
         * first vertex of the path as the last vertex. Simple polygons may be
         * defined using a single array of LatLngs. More complex polygons may
         * specify an array of arrays. Any simple arrays are converted into Arrays.
         * Inserting or removing LatLngs from the Array will automatically update
         * the polygon on the map.
         */
        this.paths = [];
        /**
         * This event is fired when the DOM click event is fired on the Polygon.
         */
        this.polyClick = new _angular_core.EventEmitter();
        /**
         * This event is fired when the DOM dblclick event is fired on the Polygon.
         */
        this.polyDblClick = new _angular_core.EventEmitter();
        /**
         * This event is repeatedly fired while the user drags the polygon.
         */
        this.polyDrag = new _angular_core.EventEmitter();
        /**
         * This event is fired when the user stops dragging the polygon.
         */
        this.polyDragEnd = new _angular_core.EventEmitter();
        /**
         * This event is fired when the user starts dragging the polygon.
         */
        this.polyDragStart = new _angular_core.EventEmitter();
        /**
         * This event is fired when the DOM mousedown event is fired on the Polygon.
         */
        this.polyMouseDown = new _angular_core.EventEmitter();
        /**
         * This event is fired when the DOM mousemove event is fired on the Polygon.
         */
        this.polyMouseMove = new _angular_core.EventEmitter();
        /**
         * This event is fired on Polygon mouseout.
         */
        this.polyMouseOut = new _angular_core.EventEmitter();
        /**
         * This event is fired on Polygon mouseover.
         */
        this.polyMouseOver = new _angular_core.EventEmitter();
        /**
         * This event is fired whe the DOM mouseup event is fired on the Polygon
         */
        this.polyMouseUp = new _angular_core.EventEmitter();
        /**
         * This even is fired when the Polygon is right-clicked on.
         */
        this.polyRightClick = new _angular_core.EventEmitter();
        /**
         * This even is fired when the Polygon is right-clicked on.
         */
        this.changedShape = new _angular_core.EventEmitter();
        this._polygonAddedToManager = false;
        this._isDragging = false;
        this._subscriptions = [];
    }
    AgmPolygon_1 = AgmPolygon;
    /** @internal */
    AgmPolygon.prototype.ngAfterContentInit = function () {
        if (!this._polygonAddedToManager) {
            this._init();
        }
    };
    AgmPolygon.prototype.ngOnChanges = function (changes) {
        if (!this._polygonAddedToManager) {
            this._init();
            return;
        }
        this._polygonManager.setPolygonOptions(this, this._updatePolygonOptions(changes));
        this._addEventListeners();
    };
    AgmPolygon.prototype._init = function () {
        this._polygonManager.addPolygon(this);
        this._polygonAddedToManager = true;
        this._addEventListeners();
    };
    AgmPolygon.prototype._removeEventListeners = function () {
        this._subscriptions.forEach(function (s) { return s.unsubscribe(); });
        this._subscriptions = [];
    };
    AgmPolygon.prototype._addEventListeners = function () {
        var _this = this;
        var handlers = [
            {
                name: "click",
                handler: function (ev) { return _this.polyClick.emit(ev); }
            },
            {
                name: "dbclick",
                handler: function (ev) { return _this.polyDblClick.emit(ev); }
            },
            {
                name: "mousedown",
                handler: function (ev) { return _this.polyMouseDown.emit(ev); }
            },
            {
                name: "mousemove",
                handler: function (ev) { return _this.polyMouseMove.emit(ev); }
            },
            {
                name: "mouseout",
                handler: function (ev) { return _this.polyMouseOut.emit(ev); }
            },
            {
                name: "mouseover",
                handler: function (ev) { return _this.polyMouseOver.emit(ev); }
            },
            {
                name: "mouseup",
                handler: function (ev) { return _this.polyMouseUp.emit(ev); }
            },
            {
                name: "rightclick",
                handler: function (ev) { return _this.polyRightClick.emit(ev); }
            }
        ];
        handlers.forEach(function (obj) {
            var os = _this._polygonManager
                .createEventObservable(obj.name, _this)
                .subscribe(obj.handler);
            _this._subscriptions.push(os);
        });
        var drag = [
            { name: "drag", handler: function (ev) { return _this.polyDrag.emit(ev); } },
            {
                name: "dragend",
                handler: function (ev) {
                    _this._isDragging = false;
                    _this.polyDragEnd.emit(ev);
                }
            },
            {
                name: "dragstart",
                handler: function (ev) {
                    _this._isDragging = true;
                    _this.polyDragStart.emit(ev);
                }
            }
        ];
        drag.forEach(function (obj) {
            var dr = _this._polygonManager
                .createDragEventObservable(obj.name, _this)
                .subscribe(obj.handler);
            _this._subscriptions.push(dr);
        });
        if (this.editable) {
            var listeners = [
                {
                    name: "insert_at",
                    handler: function (ev) {
                        if (!_this._isDragging) {
                            _this.changedShape.emit(ev);
                        }
                    }
                },
                {
                    name: "remove_at",
                    handler: function (ev) {
                        if (!_this._isDragging) {
                            _this.changedShape.emit(ev);
                        }
                    }
                },
                {
                    name: "set_at",
                    handler: function (ev) {
                        if (!_this._isDragging) {
                            _this.changedShape.emit(ev);
                        }
                    }
                }
            ];
            listeners.forEach(function (obj) {
                var lis = _this._polygonManager
                    .createPolyChangesObservable(obj.name, _this)
                    .subscribe(obj.handler);
                _this._subscriptions.push(lis);
            });
        }
    };
    AgmPolygon.prototype._updatePolygonOptions = function (changes) {
        this._removeEventListeners();
        return Object.keys(changes)
            .filter(function (k) { return AgmPolygon_1._polygonOptionsAttributes.indexOf(k) !== -1; })
            .reduce(function (obj, k) {
            obj[k] = changes[k].currentValue;
            return obj;
        }, {});
    };
    /** @internal */
    AgmPolygon.prototype.id = function () {
        return this._id;
    };
    /** @internal */
    AgmPolygon.prototype.ngOnDestroy = function () {
        this._polygonManager.deletePolygon(this);
        // unsubscribe all registered observable subscriptions
        this._subscriptions.forEach(function (s) { return s.unsubscribe(); });
        // this._listeners.forEach((listeners) => s.unsubscribe());
    };
    var AgmPolygon_1;
    AgmPolygon._polygonOptionsAttributes = [
        "clickable",
        "draggable",
        "editable",
        "fillColor",
        "fillOpacity",
        "geodesic",
        "icon",
        "map",
        "paths",
        "strokeColor",
        "strokeOpacity",
        "strokeWeight",
        "visible",
        "zIndex"
    ];
    __decorate$15([
        _angular_core.Input(),
        __metadata$14("design:type", Boolean)
    ], AgmPolygon.prototype, "clickable", void 0);
    __decorate$15([
        _angular_core.Input("polyDraggable"),
        __metadata$14("design:type", Boolean)
    ], AgmPolygon.prototype, "draggable", void 0);
    __decorate$15([
        _angular_core.Input(),
        __metadata$14("design:type", Boolean)
    ], AgmPolygon.prototype, "editable", void 0);
    __decorate$15([
        _angular_core.Input(),
        __metadata$14("design:type", String)
    ], AgmPolygon.prototype, "fillColor", void 0);
    __decorate$15([
        _angular_core.Input(),
        __metadata$14("design:type", Number)
    ], AgmPolygon.prototype, "fillOpacity", void 0);
    __decorate$15([
        _angular_core.Input(),
        __metadata$14("design:type", Boolean)
    ], AgmPolygon.prototype, "geodesic", void 0);
    __decorate$15([
        _angular_core.Input(),
        __metadata$14("design:type", Array)
    ], AgmPolygon.prototype, "paths", void 0);
    __decorate$15([
        _angular_core.Input(),
        __metadata$14("design:type", String)
    ], AgmPolygon.prototype, "strokeColor", void 0);
    __decorate$15([
        _angular_core.Input(),
        __metadata$14("design:type", Number)
    ], AgmPolygon.prototype, "strokeOpacity", void 0);
    __decorate$15([
        _angular_core.Input(),
        __metadata$14("design:type", Number)
    ], AgmPolygon.prototype, "strokeWeight", void 0);
    __decorate$15([
        _angular_core.Input(),
        __metadata$14("design:type", Boolean)
    ], AgmPolygon.prototype, "visible", void 0);
    __decorate$15([
        _angular_core.Input(),
        __metadata$14("design:type", Number)
    ], AgmPolygon.prototype, "zIndex", void 0);
    __decorate$15([
        _angular_core.Output(),
        __metadata$14("design:type", _angular_core.EventEmitter)
    ], AgmPolygon.prototype, "polyClick", void 0);
    __decorate$15([
        _angular_core.Output(),
        __metadata$14("design:type", _angular_core.EventEmitter)
    ], AgmPolygon.prototype, "polyDblClick", void 0);
    __decorate$15([
        _angular_core.Output(),
        __metadata$14("design:type", _angular_core.EventEmitter)
    ], AgmPolygon.prototype, "polyDrag", void 0);
    __decorate$15([
        _angular_core.Output(),
        __metadata$14("design:type", _angular_core.EventEmitter)
    ], AgmPolygon.prototype, "polyDragEnd", void 0);
    __decorate$15([
        _angular_core.Output(),
        __metadata$14("design:type", _angular_core.EventEmitter)
    ], AgmPolygon.prototype, "polyDragStart", void 0);
    __decorate$15([
        _angular_core.Output(),
        __metadata$14("design:type", _angular_core.EventEmitter)
    ], AgmPolygon.prototype, "polyMouseDown", void 0);
    __decorate$15([
        _angular_core.Output(),
        __metadata$14("design:type", _angular_core.EventEmitter)
    ], AgmPolygon.prototype, "polyMouseMove", void 0);
    __decorate$15([
        _angular_core.Output(),
        __metadata$14("design:type", _angular_core.EventEmitter)
    ], AgmPolygon.prototype, "polyMouseOut", void 0);
    __decorate$15([
        _angular_core.Output(),
        __metadata$14("design:type", _angular_core.EventEmitter)
    ], AgmPolygon.prototype, "polyMouseOver", void 0);
    __decorate$15([
        _angular_core.Output(),
        __metadata$14("design:type", _angular_core.EventEmitter)
    ], AgmPolygon.prototype, "polyMouseUp", void 0);
    __decorate$15([
        _angular_core.Output(),
        __metadata$14("design:type", _angular_core.EventEmitter)
    ], AgmPolygon.prototype, "polyRightClick", void 0);
    __decorate$15([
        _angular_core.Output(),
        __metadata$14("design:type", _angular_core.EventEmitter)
    ], AgmPolygon.prototype, "changedShape", void 0);
    AgmPolygon = AgmPolygon_1 = __decorate$15([
        _angular_core.Directive({
            selector: "agm-polygon"
        }),
        __metadata$14("design:paramtypes", [PolygonManager])
    ], AgmPolygon);
    return AgmPolygon;
}());

var __decorate$17 = (window && window.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$16 = (window && window.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * AgmPolylinePoint represents one element of a polyline within a  {@link
 * SembGoogleMapPolyline}
 */
var AgmPolylinePoint = /** @class */ (function () {
    function AgmPolylinePoint() {
        /**
         * This event emitter gets emitted when the position of the point changed.
         */
        this.positionChanged = new _angular_core.EventEmitter();
    }
    AgmPolylinePoint.prototype.ngOnChanges = function (changes) {
        if (changes['latitude'] || changes['longitude']) {
            var position = {
                lat: changes['latitude'].currentValue,
                lng: changes['longitude'].currentValue
            };
            this.positionChanged.emit(position);
        }
    };
    __decorate$17([
        _angular_core.Input(),
        __metadata$16("design:type", Number)
    ], AgmPolylinePoint.prototype, "latitude", void 0);
    __decorate$17([
        _angular_core.Input(),
        __metadata$16("design:type", Number)
    ], AgmPolylinePoint.prototype, "longitude", void 0);
    __decorate$17([
        _angular_core.Output(),
        __metadata$16("design:type", _angular_core.EventEmitter)
    ], AgmPolylinePoint.prototype, "positionChanged", void 0);
    AgmPolylinePoint = __decorate$17([
        _angular_core.Directive({ selector: 'agm-polyline-point' }),
        __metadata$16("design:paramtypes", [])
    ], AgmPolylinePoint);
    return AgmPolylinePoint;
}());

var __decorate$16 = (window && window.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$15 = (window && window.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var polylineId = 0;
/**
 * AgmPolyline renders a polyline on a {@link AgmMap}
 *
 * ### Example
 * ```typescript
 * import { Component } from '@angular/core';
 *
 * @Component({
 *  selector: 'my-map-cmp',
 *  styles: [`
 *    .agm-map-container {
 *      height: 300px;
 *    }
 * `],
 *  template: `
 *    <agm-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
 *      <agm-polyline>
 *          <agm-polyline-point [latitude]="latA" [longitude]="lngA">
 *          </agm-polyline-point>
 *          <agm-polyline-point [latitude]="latB" [longitude]="lngB">
 *          </agm-polyline-point>
 *      </agm-polyline>
 *    </agm-map>
 *  `
 * })
 * ```
 */
var AgmPolyline = /** @class */ (function () {
    function AgmPolyline(_polylineManager) {
        this._polylineManager = _polylineManager;
        /**
         * Indicates whether this Polyline handles mouse events. Defaults to true.
         */
        this.clickable = true;
        /**
         * If set to true, the user can drag this shape over the map. The geodesic property defines the
         * mode of dragging. Defaults to false.
         */
        // tslint:disable-next-line:no-input-rename
        this.draggable = false;
        /**
         * If set to true, the user can edit this shape by dragging the control points shown at the
         * vertices and on each segment. Defaults to false.
         */
        this.editable = false;
        /**
         * When true, edges of the polygon are interpreted as geodesic and will follow the curvature of
         * the Earth. When false, edges of the polygon are rendered as straight lines in screen space.
         * Note that the shape of a geodesic polygon may appear to change when dragged, as the dimensions
         * are maintained relative to the surface of the earth. Defaults to false.
         */
        this.geodesic = false;
        /**
         * Whether this polyline is visible on the map. Defaults to true.
         */
        this.visible = true;
        /**
         * This event is fired when the DOM click event is fired on the Polyline.
         */
        this.lineClick = new _angular_core.EventEmitter();
        /**
         * This event is fired when the DOM dblclick event is fired on the Polyline.
         */
        this.lineDblClick = new _angular_core.EventEmitter();
        /**
         * This event is repeatedly fired while the user drags the polyline.
         */
        this.lineDrag = new _angular_core.EventEmitter();
        /**
         * This event is fired when the user stops dragging the polyline.
         */
        this.lineDragEnd = new _angular_core.EventEmitter();
        /**
         * This event is fired when the user starts dragging the polyline.
         */
        this.lineDragStart = new _angular_core.EventEmitter();
        /**
         * This event is fired when the DOM mousedown event is fired on the Polyline.
         */
        this.lineMouseDown = new _angular_core.EventEmitter();
        /**
         * This event is fired when the DOM mousemove event is fired on the Polyline.
         */
        this.lineMouseMove = new _angular_core.EventEmitter();
        /**
         * This event is fired on Polyline mouseout.
         */
        this.lineMouseOut = new _angular_core.EventEmitter();
        /**
         * This event is fired on Polyline mouseover.
         */
        this.lineMouseOver = new _angular_core.EventEmitter();
        /**
         * This event is fired whe the DOM mouseup event is fired on the Polyline
         */
        this.lineMouseUp = new _angular_core.EventEmitter();
        /**
         * This even is fired when the Polyline is right-clicked on.
         */
        this.lineRightClick = new _angular_core.EventEmitter();
        this._polylineAddedToManager = false;
        this._subscriptions = [];
        this._id = (polylineId++).toString();
    }
    AgmPolyline_1 = AgmPolyline;
    /** @internal */
    AgmPolyline.prototype.ngAfterContentInit = function () {
        var _this = this;
        if (this.points.length) {
            this.points.forEach(function (point) {
                var s = point.positionChanged.subscribe(function () { _this._polylineManager.updatePolylinePoints(_this); });
                _this._subscriptions.push(s);
            });
        }
        if (!this._polylineAddedToManager) {
            this._init();
        }
        var s = this.points.changes.subscribe(function () { return _this._polylineManager.updatePolylinePoints(_this); });
        this._subscriptions.push(s);
        this._polylineManager.updatePolylinePoints(this);
    };
    AgmPolyline.prototype.ngOnChanges = function (changes) {
        if (!this._polylineAddedToManager) {
            this._init();
            return;
        }
        var options = {};
        var optionKeys = Object.keys(changes).filter(function (k) { return AgmPolyline_1._polylineOptionsAttributes.indexOf(k) !== -1; });
        optionKeys.forEach(function (k) { return options[k] = changes[k].currentValue; });
        this._polylineManager.setPolylineOptions(this, options);
    };
    AgmPolyline.prototype._init = function () {
        this._polylineManager.addPolyline(this);
        this._polylineAddedToManager = true;
        this._addEventListeners();
    };
    AgmPolyline.prototype._addEventListeners = function () {
        var _this = this;
        var handlers = [
            { name: 'click', handler: function (ev) { return _this.lineClick.emit(ev); } },
            { name: 'dbclick', handler: function (ev) { return _this.lineDblClick.emit(ev); } },
            { name: 'drag', handler: function (ev) { return _this.lineDrag.emit(ev); } },
            { name: 'dragend', handler: function (ev) { return _this.lineDragEnd.emit(ev); } },
            { name: 'dragstart', handler: function (ev) { return _this.lineDragStart.emit(ev); } },
            { name: 'mousedown', handler: function (ev) { return _this.lineMouseDown.emit(ev); } },
            { name: 'mousemove', handler: function (ev) { return _this.lineMouseMove.emit(ev); } },
            { name: 'mouseout', handler: function (ev) { return _this.lineMouseOut.emit(ev); } },
            { name: 'mouseover', handler: function (ev) { return _this.lineMouseOver.emit(ev); } },
            { name: 'mouseup', handler: function (ev) { return _this.lineMouseUp.emit(ev); } },
            { name: 'rightclick', handler: function (ev) { return _this.lineRightClick.emit(ev); } },
        ];
        handlers.forEach(function (obj) {
            var os = _this._polylineManager.createEventObservable(obj.name, _this).subscribe(obj.handler);
            _this._subscriptions.push(os);
        });
    };
    /** @internal */
    AgmPolyline.prototype._getPoints = function () {
        if (this.points) {
            return this.points.toArray();
        }
        return [];
    };
    /** @internal */
    AgmPolyline.prototype.id = function () { return this._id; };
    /** @internal */
    AgmPolyline.prototype.ngOnDestroy = function () {
        this._polylineManager.deletePolyline(this);
        // unsubscribe all registered observable subscriptions
        this._subscriptions.forEach(function (s) { return s.unsubscribe(); });
    };
    var AgmPolyline_1;
    AgmPolyline._polylineOptionsAttributes = [
        'draggable', 'editable', 'visible', 'geodesic', 'strokeColor', 'strokeOpacity', 'strokeWeight',
        'zIndex'
    ];
    __decorate$16([
        _angular_core.Input(),
        __metadata$15("design:type", Boolean)
    ], AgmPolyline.prototype, "clickable", void 0);
    __decorate$16([
        _angular_core.Input('polylineDraggable'),
        __metadata$15("design:type", Boolean)
    ], AgmPolyline.prototype, "draggable", void 0);
    __decorate$16([
        _angular_core.Input(),
        __metadata$15("design:type", Boolean)
    ], AgmPolyline.prototype, "editable", void 0);
    __decorate$16([
        _angular_core.Input(),
        __metadata$15("design:type", Boolean)
    ], AgmPolyline.prototype, "geodesic", void 0);
    __decorate$16([
        _angular_core.Input(),
        __metadata$15("design:type", String)
    ], AgmPolyline.prototype, "strokeColor", void 0);
    __decorate$16([
        _angular_core.Input(),
        __metadata$15("design:type", Number)
    ], AgmPolyline.prototype, "strokeOpacity", void 0);
    __decorate$16([
        _angular_core.Input(),
        __metadata$15("design:type", Number)
    ], AgmPolyline.prototype, "strokeWeight", void 0);
    __decorate$16([
        _angular_core.Input(),
        __metadata$15("design:type", Boolean)
    ], AgmPolyline.prototype, "visible", void 0);
    __decorate$16([
        _angular_core.Input(),
        __metadata$15("design:type", Number)
    ], AgmPolyline.prototype, "zIndex", void 0);
    __decorate$16([
        _angular_core.Output(),
        __metadata$15("design:type", _angular_core.EventEmitter)
    ], AgmPolyline.prototype, "lineClick", void 0);
    __decorate$16([
        _angular_core.Output(),
        __metadata$15("design:type", _angular_core.EventEmitter)
    ], AgmPolyline.prototype, "lineDblClick", void 0);
    __decorate$16([
        _angular_core.Output(),
        __metadata$15("design:type", _angular_core.EventEmitter)
    ], AgmPolyline.prototype, "lineDrag", void 0);
    __decorate$16([
        _angular_core.Output(),
        __metadata$15("design:type", _angular_core.EventEmitter)
    ], AgmPolyline.prototype, "lineDragEnd", void 0);
    __decorate$16([
        _angular_core.Output(),
        __metadata$15("design:type", _angular_core.EventEmitter)
    ], AgmPolyline.prototype, "lineDragStart", void 0);
    __decorate$16([
        _angular_core.Output(),
        __metadata$15("design:type", _angular_core.EventEmitter)
    ], AgmPolyline.prototype, "lineMouseDown", void 0);
    __decorate$16([
        _angular_core.Output(),
        __metadata$15("design:type", _angular_core.EventEmitter)
    ], AgmPolyline.prototype, "lineMouseMove", void 0);
    __decorate$16([
        _angular_core.Output(),
        __metadata$15("design:type", _angular_core.EventEmitter)
    ], AgmPolyline.prototype, "lineMouseOut", void 0);
    __decorate$16([
        _angular_core.Output(),
        __metadata$15("design:type", _angular_core.EventEmitter)
    ], AgmPolyline.prototype, "lineMouseOver", void 0);
    __decorate$16([
        _angular_core.Output(),
        __metadata$15("design:type", _angular_core.EventEmitter)
    ], AgmPolyline.prototype, "lineMouseUp", void 0);
    __decorate$16([
        _angular_core.Output(),
        __metadata$15("design:type", _angular_core.EventEmitter)
    ], AgmPolyline.prototype, "lineRightClick", void 0);
    __decorate$16([
        _angular_core.ContentChildren(AgmPolylinePoint),
        __metadata$15("design:type", _angular_core.QueryList)
    ], AgmPolyline.prototype, "points", void 0);
    AgmPolyline = AgmPolyline_1 = __decorate$16([
        _angular_core.Directive({
            selector: 'agm-polyline'
        }),
        __metadata$15("design:paramtypes", [PolylineManager])
    ], AgmPolyline);
    return AgmPolyline;
}());

var WindowRef = /** @class */ (function () {
    function WindowRef() {
    }
    WindowRef.prototype.getNativeWindow = function () { return window; };
    return WindowRef;
}());
var DocumentRef = /** @class */ (function () {
    function DocumentRef() {
    }
    DocumentRef.prototype.getNativeDocument = function () { return document; };
    return DocumentRef;
}());
var BROWSER_GLOBALS_PROVIDERS = [WindowRef, DocumentRef];

var __extends = (window && window.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$18 = (window && window.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$17 = (window && window.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (window && window.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};

(function (GoogleMapsScriptProtocol) {
    GoogleMapsScriptProtocol[GoogleMapsScriptProtocol["HTTP"] = 1] = "HTTP";
    GoogleMapsScriptProtocol[GoogleMapsScriptProtocol["HTTPS"] = 2] = "HTTPS";
    GoogleMapsScriptProtocol[GoogleMapsScriptProtocol["AUTO"] = 3] = "AUTO";
})(exports.GoogleMapsScriptProtocol || (exports.GoogleMapsScriptProtocol = {}));
/**
 * Token for the config of the LazyMapsAPILoader. Please provide an object of type {@link
 * LazyMapsAPILoaderConfig}.
 */
var LAZY_MAPS_API_CONFIG = new _angular_core.InjectionToken('angular-google-maps LAZY_MAPS_API_CONFIG');
var LazyMapsAPILoader = /** @class */ (function (_super) {
    __extends(LazyMapsAPILoader, _super);
    function LazyMapsAPILoader(config, w, d) {
        var _this = _super.call(this) || this;
        _this._config = config || {};
        _this._windowRef = w;
        _this._documentRef = d;
        return _this;
    }
    LazyMapsAPILoader.prototype.load = function () {
        var _this = this;
        if (this._scriptLoadingPromise) {
            return this._scriptLoadingPromise;
        }
        var callbackName = "agmLazyMapsAPILoader";
        var google = "google";
        var isFound = false;
        var scripts = this._documentRef.getNativeDocument().getElementsByTagName("script");
        for (var i = 0; i < scripts.length; ++i) {
            if (scripts[i].getAttribute("src") != null &&
                scripts[i].getAttribute("src").includes(this._getScriptSrc(callbackName))) {
                isFound = true;
            }
        }
        if (isFound) {
            return new Promise(function (resolve) {
                resolve(_this._windowRef.getNativeWindow()[google]);
            });
        }
        var script = this._documentRef.getNativeDocument().createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.defer = true;
        script.src = this._getScriptSrc(callbackName);
        this._scriptLoadingPromise = new Promise(function (resolve, reject) {
            _this._windowRef.getNativeWindow()[callbackName] = function () { resolve(_this._windowRef.getNativeWindow()[google]); };
            script.onerror = function (error) { reject(error); };
        });
        this._documentRef.getNativeDocument().body.appendChild(script);
        return this._scriptLoadingPromise;
    };
    LazyMapsAPILoader.prototype.getLibraries = function () {
        return this._config.libraries;
    };
    LazyMapsAPILoader.prototype._getScriptSrc = function (callbackName) {
        var protocolType = (this._config && this._config.protocol) || exports.GoogleMapsScriptProtocol.HTTPS;
        var protocol;
        switch (protocolType) {
            case exports.GoogleMapsScriptProtocol.AUTO:
                protocol = '';
                break;
            case exports.GoogleMapsScriptProtocol.HTTP:
                protocol = 'http:';
                break;
            case exports.GoogleMapsScriptProtocol.HTTPS:
                protocol = 'https:';
                break;
        }
        var hostAndPath = this._config.hostAndPath || 'maps.googleapis.com/maps/api/js';
        var queryParams = {
            v: this._config.apiVersion || '3',
            callback: callbackName,
            key: this._config.apiKey,
            client: this._config.clientId,
            channel: this._config.channel,
            libraries: this._config.libraries,
            region: this._config.region,
            language: this._config.language
        };
        var params = Object.keys(queryParams)
            .filter(function (k) { return queryParams[k] != null; })
            .filter(function (k) {
            // remove empty arrays
            return !Array.isArray(queryParams[k]) ||
                (Array.isArray(queryParams[k]) && queryParams[k].length > 0);
        })
            .map(function (k) {
            // join arrays as comma seperated strings
            var i = queryParams[k];
            if (Array.isArray(i)) {
                return { key: k, value: i.join(',') };
            }
            return { key: k, value: queryParams[k] };
        })
            .map(function (entry) { return entry.key + "=" + entry.value; })
            .join('&');
        return protocol + "//" + hostAndPath + "?" + params;
    };
    LazyMapsAPILoader = __decorate$18([
        _angular_core.Injectable(),
        __param(0, _angular_core.Inject(LAZY_MAPS_API_CONFIG)),
        __metadata$17("design:paramtypes", [Object, WindowRef, DocumentRef])
    ], LazyMapsAPILoader);
    return LazyMapsAPILoader;
}(MapsAPILoader));

/**
 * When using the NoOpMapsAPILoader, the Google Maps API must be added to the page via a `<script>`
 * Tag.
 * It's important that the Google Maps API script gets loaded first on the page.
 */
var LAZY_MAPS_API_CONFIG$1 = new _angular_core.InjectionToken('angular-google-maps LAZY_MAPS_API_CONFIG');
var NoOpMapsAPILoader = /** @class */ (function () {
    function NoOpMapsAPILoader() {
    }
    NoOpMapsAPILoader.prototype.load = function () {
        if (!window.google || !window.google.maps) {
            throw new Error('Google Maps API not loaded on page. Make sure window.google.maps is available!');
        }
        return Promise.resolve();
    };
    
    NoOpMapsAPILoader.prototype.getLibraries = function () {
        return LAZY_MAPS_API_CONFIG$1;
    };
    return NoOpMapsAPILoader;
}());

var __decorate$19 = (window && window.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @internal
 */
function coreDirectives() {
    return [
        AgmMap, AgmMarker, AgmInfoWindow, AgmCircle,
        AgmPolygon, AgmPolyline, AgmPolylinePoint, AgmKmlLayer,
        AgmDataLayer
    ];
}

/**
 * The angular-google-maps core module. Contains all Directives/Services/Pipes
 * of the core module. Please use `AgmCoreModule.forRoot()` in your app module.
 */
var AgmCoreModule = /** @class */ (function () {
    function AgmCoreModule() {
    }
    AgmCoreModule_1 = AgmCoreModule;
    /**
     * Please use this method when you register the module at the root level.
     */
    AgmCoreModule.forRoot = function (lazyMapsAPILoaderConfig) {
        return {
            ngModule: AgmCoreModule_1,
            providers: BROWSER_GLOBALS_PROVIDERS.concat([
                { provide: MapsAPILoader, useClass: LazyMapsAPILoader },
                { provide: LAZY_MAPS_API_CONFIG, useValue: lazyMapsAPILoaderConfig }
            ]),
        };
    };
    var AgmCoreModule_1;
    AgmCoreModule = AgmCoreModule_1 = __decorate$19([
        _angular_core.NgModule({ declarations: coreDirectives(), exports: coreDirectives() })
    ], AgmCoreModule);
    return AgmCoreModule;
}());

// main modules

exports.AgmCoreModule = AgmCoreModule;
exports.AgmMap = AgmMap;
exports.AgmCircle = AgmCircle;
exports.AgmInfoWindow = AgmInfoWindow;
exports.AgmKmlLayer = AgmKmlLayer;
exports.AgmDataLayer = AgmDataLayer;
exports.AgmMarker = AgmMarker;
exports.AgmPolygon = AgmPolygon;
exports.AgmPolyline = AgmPolyline;
exports.AgmPolylinePoint = AgmPolylinePoint;
exports.GoogleMapsAPIWrapper = GoogleMapsAPIWrapper;
exports.CircleManager = CircleManager;
exports.InfoWindowManager = InfoWindowManager;
exports.MarkerManager = MarkerManager;
exports.PolygonManager = PolygonManager;
exports.PolylineManager = PolylineManager;
exports.KmlLayerManager = KmlLayerManager;
exports.DataLayerManager = DataLayerManager;
exports.LAZY_MAPS_API_CONFIG = LAZY_MAPS_API_CONFIG;
exports.LazyMapsAPILoader = LazyMapsAPILoader;
exports.MapsAPILoader = MapsAPILoader;
exports.NoOpMapsAPILoader = NoOpMapsAPILoader;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=core.umd.js.map
