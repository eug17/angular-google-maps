import { Inject, Injectable, InjectionToken } from '@angular/core';

import { DocumentRef, WindowRef } from '../../utils/browser-globals';

import { MapsAPILoader } from './maps-api-loader';

export enum GoogleMapsScriptProtocol {
  HTTP = 1,
  HTTPS = 2,
  AUTO = 3
}

/**
 * Token for the config of the LazyMapsAPILoader. Please provide an object of type {@link
 * LazyMapsAPILoaderConfig}.
 */
export const LAZY_MAPS_API_CONFIG = new InjectionToken('angular-google-maps LAZY_MAPS_API_CONFIG');

/**
 * Configuration for the {@link LazyMapsAPILoader}.
 */
export interface LazyMapsAPILoaderConfigLiteral {
	/**
	 * The Google Maps API Key (see:
	 * https://developers.google.com/maps/documentation/javascript/get-api-key)
	 */
  apiKey?: string;

	/**
	 * The Google Maps client ID (for premium plans).
	 * When you have a Google Maps APIs Premium Plan license, you must authenticate
	 * your application with either an API key or a client ID.
	 * The Google Maps API will fail to load if both a client ID and an API key are included.
	 */
  clientId?: string;

	/**
	 * The Google Maps channel name (for premium plans).
	 * A channel parameter is an optional parameter that allows you to track usage under your client
	 * ID by assigning a distinct channel to each of your applications.
	 */
  channel?: string;

	/**
	 * Google Maps API version.
	 */
  apiVersion?: string;

	/**
	 * Host and Path used for the `<script>` tag.
	 */
  hostAndPath?: string;

	/**
	 * Protocol used for the `<script>` tag.
	 */
  protocol?: GoogleMapsScriptProtocol;

	/**
	 * Defines which Google Maps libraries should get loaded.
	 */
  libraries?: string[];

	/**
	 * The default bias for the map behavior is US.
	 * If you wish to alter your application to serve different map tiles or bias the
	 * application, you can overwrite the default behavior (US) by defining a `region`.
	 * See https://developers.google.com/maps/documentation/javascript/basics#Region
	 */
  region?: string;

	/**
	 * The Google Maps API uses the browser's preferred language when displaying
	 * textual information. If you wish to overwrite this behavior and force the API
	 * to use a given language, you can use this setting.
	 * See https://developers.google.com/maps/documentation/javascript/basics#Language
	 */
  language?: string;
}

@Injectable()
export class LazyMapsAPILoader extends MapsAPILoader {
  private _scriptLoadingPromise: Promise<void>;
  private _config: LazyMapsAPILoaderConfigLiteral;
  private _windowRef: WindowRef;
  private _documentRef: DocumentRef;

  constructor(@Inject(LAZY_MAPS_API_CONFIG) config: any, w: WindowRef, d: DocumentRef) {
    super();
    this._config = config || {};
    this._windowRef = w;
    this._documentRef = d;
  }

  load(): Promise<void> {
    if (this._scriptLoadingPromise) {
      return this._scriptLoadingPromise;
    }

    const callbackName: string = `agmLazyMapsAPILoader`;
    const google: string = `google`;
    let isFound = false;
    const scripts = this._documentRef.getNativeDocument().getElementsByTagName("script");
    for (let i = 0; i < scripts.length; ++i) {
      if (
        scripts[i].getAttribute("src") != null &&
        scripts[i].getAttribute("src").includes(this._getScriptSrc(callbackName))
      ) {
        isFound = true;
      }
    }
    if (isFound) {
      return new Promise<void>((resolve: Function) => {
        resolve(<any>this._windowRef.getNativeWindow()[google]);
      });
    }
    const script = this._documentRef.getNativeDocument().createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.defer = true;

    script.src = this._getScriptSrc(callbackName);

    this._scriptLoadingPromise = new Promise<void>((resolve: Function, reject: Function) => {
      (<any>this._windowRef.getNativeWindow())[callbackName] = () => { resolve(<any>this._windowRef.getNativeWindow()[google]); };

      script.onerror = (error: Event) => { reject(error); };
    });

    this._documentRef.getNativeDocument().body.appendChild(script);
    return this._scriptLoadingPromise;
  }

  getLibraries() {
    return this._config.libraries;
  }

  private _getScriptSrc(callbackName: string): string {
    let protocolType: GoogleMapsScriptProtocol =
      (this._config && this._config.protocol) || GoogleMapsScriptProtocol.HTTPS;
    let protocol: string;

    switch (protocolType) {
      case GoogleMapsScriptProtocol.AUTO:
        protocol = '';
        break;
      case GoogleMapsScriptProtocol.HTTP:
        protocol = 'http:';
        break;
      case GoogleMapsScriptProtocol.HTTPS:
        protocol = 'https:';
        break;
    }

    const hostAndPath: string = this._config.hostAndPath || 'maps.googleapis.com/maps/api/js';
    const queryParams: { [key: string]: string | Array<string> } = {
      v: this._config.apiVersion || '3',
      callback: callbackName,
      key: this._config.apiKey,
      client: this._config.clientId,
      channel: this._config.channel,
      libraries: this._config.libraries,
      region: this._config.region,
      language: this._config.language
    };
    const params: string =
      Object.keys(queryParams)
        .filter((k: string) => queryParams[k] != null)
        .filter((k: string) => {
          // remove empty arrays
          return !Array.isArray(queryParams[k]) ||
            (Array.isArray(queryParams[k]) && queryParams[k].length > 0);
        })
        .map((k: string) => {
          // join arrays as comma seperated strings
          let i = queryParams[k];
          if (Array.isArray(i)) {
            return { key: k, value: i.join(',') };
          }
          return { key: k, value: queryParams[k] };
        })
        .map((entry: { key: string, value: string }) => { return `${entry.key}=${entry.value}`; })
        .join('&');
    return `${protocol}//${hostAndPath}?${params}`;
  }
}
