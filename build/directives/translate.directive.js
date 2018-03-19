var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Directive, Input, Inject, ElementRef, ChangeDetectorRef } from "@angular/core";
import { ANGULAR_1_TRANSLATE_INJECTION_TOKEN } from "../services/injection-tokens";
// This Angular directive will act as an interface to the "upgraded" AngularJS component
let TranslateDirective = class TranslateDirective {
    constructor($translate, el, changeDetectorRef) {
        this.$translate = $translate;
        this.el = el;
        this.changeDetectorRef = changeDetectorRef;
    }
    ngOnInit() {
        let translationPromise;
        if (this.translate)
            translationPromise = this.$translate(this.translate);
        else
            translationPromise = this.$translate(this.el.nativeElement.innerText.trim());
        translationPromise.then(translation => {
            this.el.nativeElement.innerText = translation;
            this.changeDetectorRef.markForCheck();
        });
    }
};
__decorate([
    Input("translate"),
    __metadata("design:type", String)
], TranslateDirective.prototype, "translate", void 0);
TranslateDirective = __decorate([
    Directive({ selector: '[translate]' }),
    __param(0, Inject(ANGULAR_1_TRANSLATE_INJECTION_TOKEN)),
    __metadata("design:paramtypes", [Object, ElementRef,
        ChangeDetectorRef])
], TranslateDirective);
export { TranslateDirective };
//# sourceMappingURL=translate.directive.js.map