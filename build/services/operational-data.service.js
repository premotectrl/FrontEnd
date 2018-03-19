var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs/Rx';
import * as Protobufjs from 'protobuf';
const BASE_URL = 'wss://www-dev.kuka-atx.com';
const OPERATIONAL_DATA_PREFIX = '/api/operationalData/operationalDataOut/proto/';
let OperationalDataService = class OperationalDataService {
    constructor() {
        this.parser = new ReplaySubject(1);
        this.parser$ = this.parser.asObservable();
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
    get(assetId) {
        return this.connectToSocket(assetId).combineLatest(this.parser$, (rawData, parser) => {
            return parser.decode(new Uint8Array(rawData));
        });
    }
    connectToSocket(assetId) {
        let url = BASE_URL + OPERATIONAL_DATA_PREFIX + assetId;
        console.log(url);
        if (!this.source) {
            let ws = new WebSocket(url);
            ws.binaryType = 'arraybuffer';
            let source = Observable.create(obs => {
                ws.onmessage = (event) => obs.next(event.data);
                ws.onerror = obs.error.bind(obs);
                ws.onclose = obs.complete.bind(obs);
                return ws.close.bind(obs);
            });
            return source;
        }
    }
};
OperationalDataService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], OperationalDataService);
export { OperationalDataService };
//# sourceMappingURL=operational-data.service.js.map