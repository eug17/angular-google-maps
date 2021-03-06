import {
  Component,
  ElementRef,
  EventEmitter,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  Input,
  Output
} from "@angular/core";
import { Subscription } from "rxjs";

import { MouseEvent } from "../map-types";
import { GoogleMapsAPIWrapper } from "../services/google-maps-api-wrapper";
import {
  FullscreenControlOptions,
  LatLng,
  LatLngLiteral,
  MapTypeControlOptions,
  PanControlOptions,
  RotateControlOptions,
  ScaleControlOptions,
  StreetViewControlOptions,
  ZoomControlOptions,
  ControlPosition,
  DrawingModes,
  ExtraControls,
  ExtraControl
} from "../services/google-maps-types";
import {
  LatLngBounds,
  LatLngBoundsLiteral,
  MapTypeStyle
} from "../services/google-maps-types";
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
@Component({
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
    `
    .agm-map-container-inner {
      width: inherit;
      height: 100%;
    }
    .agm-map-content {
      display:none;
    }
  `
  ],
  template: `
    <div class='agm-map-container-inner sebm-google-map-container-inner'></div>
    <div class='agm-map-content'>
      <ng-content></ng-content>
    </div>
  `
})
export class AgmMap implements OnChanges, OnInit, OnDestroy {
  /**
   * The longitude that defines the center of the map.
   */
  @Input() longitude: number = 0;

  /**
   * The latitude that defines the center of the map.
   */
  @Input() latitude: number = 0;

  /**
   * The zoom level of the map. The default zoom level is 8.
   */
  @Input() zoom: number = 8;
  /**
   * The zoom level of the map. The default zoom level is 8.
   */
  @Input() tilt: number = 0;

  /**
   * The minimal zoom level of the map allowed. When not provided, no restrictions to the zoom level
   * are enforced.
   */
  @Input() minZoom: number;

  /**
   * The maximal zoom level of the map allowed. When not provided, no restrictions to the zoom level
   * are enforced.
   */
  @Input() maxZoom: number;

  /**
   * Enables/disables if map is draggable.
   */
  // tslint:disable-next-line:no-input-rename
  @Input("mapDraggable") draggable: boolean = true;

  /**
   * Enables/disables zoom and center on double click. Enabled by default.
   */
  @Input() disableDoubleClickZoom: boolean = false;

  /**
   * Enables/disables all default UI of the Google map. Please note: When the map is created, this
   * value cannot get updated.
   */
  @Input() disableDefaultUI: boolean = false;

  /**
   * If false, disables scrollwheel zooming on the map. The scrollwheel is enabled by default.
   */
  @Input() scrollwheel: boolean = true;

  /**
   * Color used for the background of the Map div. This color will be visible when tiles have not
   * yet loaded as the user pans. This option can only be set when the map is initialized.
   */
  @Input() backgroundColor: string;

  /**
   * The name or url of the cursor to display when mousing over a draggable map. This property uses
   * the css  * cursor attribute to change the icon. As with the css property, you must specify at
   * least one fallback cursor that is not a URL. For example:
   * [draggableCursor]="'url(http://www.example.com/icon.png), auto;'"
   */
  @Input() draggableCursor: string;

  /**
   * The name or url of the cursor to display when the map is being dragged. This property uses the
   * css cursor attribute to change the icon. As with the css property, you must specify at least
   * one fallback cursor that is not a URL. For example:
   * [draggingCursor]="'url(http://www.example.com/icon.png), auto;'"
   */
  @Input() draggingCursor: string;

  /**
   * If false, prevents the map from being controlled by the keyboard. Keyboard shortcuts are
   * enabled by default.
   */
  @Input() keyboardShortcuts: boolean = true;

  /**
   * The enabled/disabled state of the Zoom control.
   */
  @Input() zoomControl: boolean = true;

  /**
   * Options for the Zoom control.
   */
  @Input() zoomControlOptions: ZoomControlOptions;

  /**
   * Styles to apply to each of the default map types. Note that for Satellite/Hybrid and Terrain
   * modes, these styles will only apply to labels and geometry.
   */
  @Input() styles: MapTypeStyle[] = [];

  /**
   * When true and the latitude and/or longitude values changes, the Google Maps panTo method is
   * used to
   * center the map. See: https://developers.google.com/maps/documentation/javascript/reference#Map
   */
  @Input() usePanning: boolean = false;

  /**
   * The initial enabled/disabled state of the Street View Pegman control.
   * This control is part of the default UI, and should be set to false when displaying a map type
   * on which the Street View road overlay should not appear (e.g. a non-Earth map type).
   */
  @Input() streetViewControl: boolean = true;

  /**
   * Options for the Street View control.
   */
  @Input() streetViewControlOptions: StreetViewControlOptions;

  /**
   * Sets the viewport to contain the given bounds.
   */
  @Input() fitBounds: LatLngBoundsLiteral | LatLngBounds = null;

  /**
   * Sets the viewport to contain the given Array of LatLng | LatLngLiteral.
   */
  @Input() fitPoints: Array<LatLng> | Array<LatLngLiteral> = null;

  /**
   * Sets the viewport to contain the given Array each time when fitPoints is changed.
   */
  @Input() fitMultiple: boolean = false;

  /**
   * Sets the viewport to contain the given Array each time when fitPoints is changed.
   */
  @Input() trafficLayer: boolean = false;

  /**
   * The initial enabled/disabled state of the Scale control. This is disabled by default.
   */
  @Input() scaleControl: boolean = false;

  /**
   * Options for the scale control.
   */
  @Input() scaleControlOptions: ScaleControlOptions;

  /**
   * The initial enabled/disabled state of the Map type control.
   */
  @Input() mapTypeControl: boolean = false;

  /**
   * The initial enabled/disabled state of the Map type control.
   */
  @Input() mapCustomControl: boolean = false;

  /**
   * Options for the Map type control.
   */
  @Input() mapTypeControlOptions: MapTypeControlOptions;

  /**
   * The initial enabled/disabled state of the Pan control.
   */
  @Input() panControl: boolean = false;

  /**
   * Options for the Pan control.
   */
  @Input() panControlOptions: PanControlOptions;

  /**
   * The initial enabled/disabled state of the Rotate control.
   */
  @Input() rotateControl: boolean = false;

  /**
   * Options for the Rotate control.
   */
  @Input() rotateControlOptions: RotateControlOptions;

  /**
   * The initial enabled/disabled state of the Fullscreen control.
   */
  @Input() fullscreenControl: boolean = false;

  /**
   * Options for the Fullscreen control.
   */
  @Input() fullscreenControlOptions: FullscreenControlOptions;

  /**
   * The map mapTypeId. Defaults to 'roadmap'.
   */
  @Input()
  mapTypeId:
    | "roadmap"
    | "hybrid"
    | "satellite"
    | "terrain"
    | string = "roadmap";

  /**
   * When false, map icons are not clickable. A map icon represents a point of interest,
   * also known as a POI. By default map icons are clickable.
   */
  @Input() clickableIcons: boolean = true;

  /**
   * This setting controls how gestures on the map are handled.
   * Allowed values:
   * - 'cooperative' (Two-finger touch gestures pan and zoom the map. One-finger touch gestures are not handled by the map.)
   * - 'greedy'      (All touch gestures pan or zoom the map.)
   * - 'none'        (The map cannot be panned or zoomed by user gestures.)
   * - 'auto'        [default] (Gesture handling is either cooperative or greedy, depending on whether the page is scrollable or not.
   */
  @Input() gestureHandling: "cooperative" | "greedy" | "none" | "auto" = "auto";

  /**
   * This setting controls apperance drawing Manager
   */
  @Input() drawingModes: DrawingModes = [];

  /**
   * This setting controls apperance drawing Manager controlls position
   */
  @Input() drawingManagerPosition: string = "TOP_CENTER";
  /**
   * This setting controls apperance drawing Manager controlls position
   */
  @Input() extraControls: ExtraControls[] = [];
  /**
   * Map option attributes that can change over time
   */
  private static _mapOptionsAttributes: string[] = [
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

  private _observableSubscriptions: Subscription[] = [];
  private _listeners: any = [];
  private _polygons: any = [];
  private _extraControls: any = {};
  private _subscriptions: Subscription[] = [];

  /**
   * This event emitter gets emitted when the user clicks on the map (but not when they click on a
   * marker or infoWindow).
   */
  @Output() mapClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  /**
   * This event emitter gets emitted when the user right-clicks on the map (but not when they click
   * on a marker or infoWindow).
   */
  @Output()
  mapRightClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  /**
   * This event emitter gets emitted when the user double-clicks on the map (but not when they click
   * on a marker or infoWindow).
   */
  @Output()
  mapDblClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  /**
   * This event emitter is fired when the map center changes.
   */
  @Output()
  centerChange: EventEmitter<LatLngLiteral> = new EventEmitter<LatLngLiteral>();

  /**
   * This event is fired when the viewport bounds have changed.
   */
  @Output()
  boundsChange: EventEmitter<LatLngBounds> = new EventEmitter<LatLngBounds>();

  /**
   * This event is fired when the map becomes idle after panning or zooming.
   */
  @Output() idle: EventEmitter<void> = new EventEmitter<void>();

  /**
   * This event is fired when the zoom level has changed.
   */
  @Output() zoomChange: EventEmitter<number> = new EventEmitter<number>();

  /**
   * This event is fired when the google map is fully initialized.
   * You get the google.maps.Map instance as a result of this EventEmitter.
   */
  @Output() mapReady: EventEmitter<any> = new EventEmitter<any>();

  /**
   * This event is fired when polygon drawing complete.
   */
  @Output() polygonComplete: EventEmitter<any> = new EventEmitter<any>();

  /**
   * This event is fired when polygon deleted.
   */
  @Output() polygonDeleted: EventEmitter<any> = new EventEmitter<any>();

  /**
   * This event is callBack on custom cotroll button
   */
  @Output() extraControlsAction: EventEmitter<any> = new EventEmitter<any>();

  bounds: any;

  constructor(
    private _elem: ElementRef,
    private _mapsWrapper: GoogleMapsAPIWrapper,
    private _polygonManager: PolygonManager
  ) {
    this._mapsWrapper.createLatLngBounds().then((bounds: any) => {
      this.bounds = bounds;
      console.log("this.bounds", this.bounds);
    });
  }

  /** @internal */
  ngOnInit() {
    // todo: this should be solved with a new component and a viewChild decorator
    const container = this._elem.nativeElement.querySelector(
      ".agm-map-container-inner"
    );
    this._initMapInstance(container);
  }

  private _initMapInstance(el: HTMLElement) {
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
      .then(() => this._mapsWrapper.getNativeMap())
      .then(map => this.mapReady.emit(map));

    // register event listeners
    this._handleMapCenterChange();
    this._handleMapZoomChange();
    this._handleMapMouseEvents();
    this._handleBoundsChange();
    this._handleIdleEvent();
    this._mapsWrapper.getLibraries().then((libs: any) => {
      console.log("libs", libs);
      if (libs && libs.indexOf("drawing") > -1) {
        this._setDrawingManager();
      }
    });
  }

  /** @internal */
  ngOnDestroy() {
    // unsubscribe all registered observable subscriptions
    this._observableSubscriptions.forEach(s => s.unsubscribe());
    this._listeners.forEach((s: any) => {
      s.remove();
    });
    this._drawingManagerRemovePolygonListeners();
  }

  /* @internal */
  ngOnChanges(changes: SimpleChanges) {
    this._updateMapOptionsChanges(changes);
    this._updatePosition(changes);
  }

  private _updateMapExtraControlls(_controls: ExtraControl[]) {
    // console.log('controlls', _controls);
    // console.log('controlls this', this);
    // let keys = Object.keys(this._extraControls);
    this._mapsWrapper.getNativeMap().then(() => {
      //   console.log('map.controlls', map.controls);

      for (let c of _controls) {
        if (this._extraControls[c.type] === undefined) {
          this._mapsWrapper.addExtraControll(c).then((_control: any) => {
            // console.log('_control', _control);
            const s = _control.subscription.subscribe((type: any) => {
              if (type === "centerMap") {
                this._mapsWrapper.setCenter(c.coord);
              }
              if (type === "removePolygon") {
                // console.log('removePolygon');

                // remove listeners and subscriptions
                this._listeners.forEach((s: any) => {
                  s.remove();
                });
                this._drawingManagerRemovePolygonListeners();
                this._polygons.forEach((poly: any) => {
                  //   poly.setMap(null);
                  this._polygonManager.deletePolygon(poly);
                });
                this.polygonDeleted.emit();
              }
            });
            // this._extraControls.push({ 'type': c.type, 'position': _control.position });
            this._extraControls[c.type] = _control;
            this._observableSubscriptions.push(s);
          });
        } else {
          //   console.log('this._extraControls', this._extraControls);
          //   console.log('map.controls', map.controls);
          //   let position = c.position as keyof typeof ControlPosition || 'TOP_CENTER';
          //   console.log('position', position);
          //   //   map.controls[position].splice(this._extraControls[c.type], 1);
        }
      }
    });
  }

  private _updateMapOptionsChanges(changes: SimpleChanges) {
    // console.log('changes', changes);
    let options: { [propName: string]: any } = {};
    let optionKeys = Object.keys(changes).filter(
      k => AgmMap._mapOptionsAttributes.indexOf(k) !== -1
    );
    optionKeys.forEach(k => {
      options[k] = changes[k].currentValue;
    });
    this._mapsWrapper.setMapOptions(options);
    if (changes["extraControls"]) {
      this._updateMapExtraControlls(changes["extraControls"].currentValue);
    }
    // console.log('drawingModes', changes);
    if (changes["drawingModes"] && !changes["drawingModes"].firstChange) {
      let position = this
        .drawingManagerPosition as keyof typeof ControlPosition;
      let typedPosition = ControlPosition[position];
      //   console.log('updateDrawingManagerOptions position', position);
      this._mapsWrapper.updateDrawingManagerOptions(
        changes["drawingModes"].currentValue,
        typedPosition
      );
    }
  }

  /**
   * Triggers a resize event on the google map instance.
   * When recenter is true, the of the google map gets called with the current lat/lng values or fitBounds value to recenter the map.
   * Returns a promise that gets resolved after the event was triggered.
   */
  triggerResize(recenter: boolean = true): Promise<void> {
    // Note: When we would trigger the resize event and show the map in the same turn (which is a
    // common case for triggering a resize event), then the resize event would not
    // work (to show the map), so we trigger the event in a timeout.
    return new Promise<void>(resolve => {
      setTimeout(() => {
        return this._mapsWrapper.triggerMapEvent("resize").then(() => {
          if (recenter) {
            this.fitBounds != null ? this._fitBounds() : this._setCenter();
          }
          resolve();
        });
      });
    });
  }

  private _updatePosition(changes: SimpleChanges) {
    if (changes["trafficLayer"]) {
      this.trafficLayer = changes["trafficLayer"].currentValue;
      if (!this.trafficLayer) {
        this._mapsWrapper.handleTrafficLayer(false);
      } else {
        this._mapsWrapper.handleTrafficLayer(true);
      }
    }

    if (changes["fitPoints"] && this.fitPoints != null) {
      //   console.log('fitPoints changes', changes);
      this.fitPoints = changes["fitPoints"].currentValue;
      this._fitPoints();
    }

    if (
      changes["latitude"] == null &&
      changes["longitude"] == null &&
      changes["fitBounds"] == null
    ) {
      // no position update needed
      return;
    }

    // we prefer fitBounds in changes
    if (changes["fitBounds"] && this.fitBounds != null) {
      this._fitBounds();
      return;
    }

    if (
      typeof this.latitude !== "number" ||
      typeof this.longitude !== "number"
    ) {
      return;
    }
    this._setCenter();
  }

  private _drawingManagerRemovePolygonListeners() {
    this._subscriptions.forEach(s => s.unsubscribe());
    this._subscriptions = [];
  }

  private _setDrawingManager() {
    // if (!this.drawingModes.length) {
    //   return;
    // }
    let drawingCircleOptions = {
      fillColor: "#ffff00",
      fillOpacity: 1,
      strokeWeight: 5,
      clickable: false,
      editable: true,
      draggable: true,
      zIndex: 1
    };
    let polygonOptions = {
      fillColor: "#d75f8f",
      fillOpacity: 0.5,
      strokeOpacity: 0.5,
      strokeWeight: 5,
      clickable: true,
      editable: true,
      draggable: true,
      zIndex: 1
    };
    let position = this.drawingManagerPosition as keyof typeof ControlPosition;
    let typedPosition = ControlPosition[position];
    this._mapsWrapper
      .attachDrawingManager(
        typedPosition,
        this.drawingModes,
        polygonOptions,
        drawingCircleOptions
      )
      .then(() => {
        const lis = this._mapsWrapper
          .attachPolygonListeners("polygoncomplete")
          .subscribe((polygon: any) => {
            polygon.paths = this._polygonManager.getBounds(polygon);
            this.polygonComplete.emit(polygon.paths);
            polygon.setMap(null);
          });
        this._listeners.push(lis);
      });
  }

  private _setCenter() {
    let newCenter = {
      lat: this.latitude,
      lng: this.longitude
    };
    if (this.usePanning) {
      this._mapsWrapper.panTo(newCenter);
    } else {
      this._mapsWrapper.setCenter(newCenter);
    }
  }

  private _fitPoints() {
    this._mapsWrapper.createLatLngBounds().then((bounds: any) => {
      this.bounds = bounds;
      for (let m of this.fitPoints) {
        if (typeof m === 'object') {
          this.bounds.extend(m);
        }
      }
      this._mapsWrapper.fitBounds(this.bounds);
      this._mapsWrapper.panToBounds(this.bounds);
      //   console.log(this.bounds);
    });
  }

  private _fitBounds() {
    if (this.usePanning) {
      this._mapsWrapper.panToBounds(this.fitBounds);
      return;
    }
    this._mapsWrapper.fitBounds(this.fitBounds);
  }

  private _handleMapCenterChange() {
    const s = this._mapsWrapper
      .subscribeToMapEvent<void>("center_changed")
      .subscribe(() => {
        this._mapsWrapper.getCenter().then((center: LatLng) => {
          this.latitude = center.lat();
          this.longitude = center.lng();
          this.centerChange.emit(<LatLngLiteral>{
            lat: this.latitude,
            lng: this.longitude
          });
        });
      });
    this._observableSubscriptions.push(s);
  }

  private _handleBoundsChange() {
    const s = this._mapsWrapper
      .subscribeToMapEvent<void>("bounds_changed")
      .subscribe(() => {
        this._mapsWrapper.getBounds().then((bounds: LatLngBounds) => {
          this.boundsChange.emit(bounds);
        });
      });
    this._observableSubscriptions.push(s);
  }

  private _handleMapZoomChange() {
    const s = this._mapsWrapper
      .subscribeToMapEvent<void>("zoom_changed")
      .subscribe(() => {
        this._mapsWrapper.getZoom().then((z: number) => {
          this.zoom = z;
          this.zoomChange.emit(z);
        });
      });
    this._observableSubscriptions.push(s);
  }

  private _handleIdleEvent() {
    const s = this._mapsWrapper
      .subscribeToMapEvent<void>("idle")
      .subscribe(() => {
        this.idle.emit(void 0);
      });
    this._observableSubscriptions.push(s);
  }

  private _handleMapMouseEvents() {
    interface Emitter {
      emit(value: any): void;
    }
    type Event = { name: string; emitter: Emitter };

    const events: Event[] = [
      { name: "click", emitter: this.mapClick },
      { name: "rightclick", emitter: this.mapRightClick },
      { name: "dblclick", emitter: this.mapDblClick }
    ];

    events.forEach((e: Event) => {
      const s = this._mapsWrapper
        .subscribeToMapEvent<{ latLng: LatLng }>(e.name)
        .subscribe((event: { latLng: LatLng }) => {
          const value = <MouseEvent>{
            coords: { lat: event.latLng.lat(), lng: event.latLng.lng() }
          };
          e.emitter.emit(value);
        });
      this._observableSubscriptions.push(s);
    });
  }
}
