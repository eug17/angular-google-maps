var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef, EventEmitter, Input, Output } from "@angular/core";
import { GoogleMapsAPIWrapper } from "../services/google-maps-api-wrapper";
import { ControlPosition } from "../services/google-maps-types";
import { CircleManager } from "../services/managers/circle-manager";
import { InfoWindowManager } from "../services/managers/info-window-manager";
import { MarkerManager } from "../services/managers/marker-manager";
import { PolygonManager } from "../services/managers/polygon-manager";
import { PolylineManager } from "../services/managers/polyline-manager";
import { KmlLayerManager } from "./../services/managers/kml-layer-manager";
import { DataLayerManager } from "./../services/managers/data-layer-manager";
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
        this.mapClick = new EventEmitter();
        /**
         * This event emitter gets emitted when the user right-clicks on the map (but not when they click
         * on a marker or infoWindow).
         */
        this.mapRightClick = new EventEmitter();
        /**
         * This event emitter gets emitted when the user double-clicks on the map (but not when they click
         * on a marker or infoWindow).
         */
        this.mapDblClick = new EventEmitter();
        /**
         * This event emitter is fired when the map center changes.
         */
        this.centerChange = new EventEmitter();
        /**
         * This event is fired when the viewport bounds have changed.
         */
        this.boundsChange = new EventEmitter();
        /**
         * This event is fired when the map becomes idle after panning or zooming.
         */
        this.idle = new EventEmitter();
        /**
         * This event is fired when the zoom level has changed.
         */
        this.zoomChange = new EventEmitter();
        /**
         * This event is fired when the google map is fully initialized.
         * You get the google.maps.Map instance as a result of this EventEmitter.
         */
        this.mapReady = new EventEmitter();
        /**
         * This event is fired when polygon drawing complete.
         */
        this.polygonComplete = new EventEmitter();
        /**
         * This event is fired when polygon deleted.
         */
        this.polygonDeleted = new EventEmitter();
        /**
         * This event is callBack on custom cotroll button
         */
        this.extraControlsAction = new EventEmitter();
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
        Input(),
        __metadata("design:type", Number)
    ], AgmMap.prototype, "longitude", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], AgmMap.prototype, "latitude", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], AgmMap.prototype, "zoom", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], AgmMap.prototype, "tilt", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], AgmMap.prototype, "minZoom", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], AgmMap.prototype, "maxZoom", void 0);
    __decorate([
        Input("mapDraggable"),
        __metadata("design:type", Boolean)
    ], AgmMap.prototype, "draggable", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AgmMap.prototype, "disableDoubleClickZoom", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AgmMap.prototype, "disableDefaultUI", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AgmMap.prototype, "scrollwheel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], AgmMap.prototype, "backgroundColor", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], AgmMap.prototype, "draggableCursor", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], AgmMap.prototype, "draggingCursor", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AgmMap.prototype, "keyboardShortcuts", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AgmMap.prototype, "zoomControl", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AgmMap.prototype, "zoomControlOptions", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], AgmMap.prototype, "styles", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AgmMap.prototype, "usePanning", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AgmMap.prototype, "streetViewControl", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AgmMap.prototype, "streetViewControlOptions", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AgmMap.prototype, "fitBounds", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], AgmMap.prototype, "fitPoints", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AgmMap.prototype, "fitMultiple", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AgmMap.prototype, "trafficLayer", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AgmMap.prototype, "scaleControl", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AgmMap.prototype, "scaleControlOptions", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AgmMap.prototype, "mapTypeControl", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AgmMap.prototype, "mapCustomControl", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AgmMap.prototype, "mapTypeControlOptions", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AgmMap.prototype, "panControl", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AgmMap.prototype, "panControlOptions", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AgmMap.prototype, "rotateControl", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AgmMap.prototype, "rotateControlOptions", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AgmMap.prototype, "fullscreenControl", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AgmMap.prototype, "fullscreenControlOptions", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], AgmMap.prototype, "mapTypeId", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AgmMap.prototype, "clickableIcons", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], AgmMap.prototype, "gestureHandling", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AgmMap.prototype, "drawingModes", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], AgmMap.prototype, "drawingManagerPosition", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], AgmMap.prototype, "extraControls", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], AgmMap.prototype, "mapClick", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], AgmMap.prototype, "mapRightClick", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], AgmMap.prototype, "mapDblClick", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], AgmMap.prototype, "centerChange", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], AgmMap.prototype, "boundsChange", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], AgmMap.prototype, "idle", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], AgmMap.prototype, "zoomChange", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], AgmMap.prototype, "mapReady", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], AgmMap.prototype, "polygonComplete", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], AgmMap.prototype, "polygonDeleted", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], AgmMap.prototype, "extraControlsAction", void 0);
    AgmMap = AgmMap_1 = __decorate([
        Component({
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
        __metadata("design:paramtypes", [ElementRef,
            GoogleMapsAPIWrapper,
            PolygonManager])
    ], AgmMap);
    return AgmMap;
}());
export { AgmMap };
//# sourceMappingURL=map.js.map