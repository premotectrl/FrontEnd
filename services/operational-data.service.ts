import { Location, LocationStrategy, PathLocationStrategy, } from '@angular/common';
import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject, ReplaySubject } from 'rxjs/Rx';
import * as Protobufjs from 'protobuf';

const BASE_URL = 'wss://www-dev.kuka-atx.com';
const OPERATIONAL_DATA_PREFIX = '/api/operationalData/operationalDataOut/proto/'

interface AGV {
	processData: String;
	deviceId: {
		entityId: String;
		serialNumber: String
	}
}

@Injectable()
export class OperationalDataService {

	private source: Observable<MessageEvent>;
	private parser: Subject<any> = new ReplaySubject(1);
	private parser$: Observable<any> = this.parser.asObservable();

	constructor() {
		let rooter = new Protobufjs.Root({ convertFieldsToCamelCase: true });
		rooter.resolvePath = function (origin, target) {
			return 'assets/' + target;
		};
        Protobufjs.load('/kuka/api/operational.proto', rooter, (error, root) => {
			if (rooter) {
				this.parser.next(rooter.lookupType('kuka.api.OperationalData'));
			}
		});
	}

	ngOnInit() {
	}

	public get(assetId: string): Observable<AGV> {
		return this.connectToSocket(assetId).combineLatest(this.parser$, (rawData, parser) => {
			return parser.decode(new Uint8Array(rawData)) as AGV;
		});
	}

	private connectToSocket(assetId): Observable<any> {
		let url = BASE_URL + OPERATIONAL_DATA_PREFIX + assetId
		console.log(url);
		if (!this.source) {
			let ws = new WebSocket(url);
			ws.binaryType = 'arraybuffer';
			let source = Observable.create(
				obs => {
					ws.onmessage = (event) => obs.next(event.data);
					ws.onerror = obs.error.bind(obs);
					ws.onclose = obs.complete.bind(obs);
					return ws.close.bind(obs);
				});
			return source;
		}
	}
}