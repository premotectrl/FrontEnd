import { InjectionToken, Directive, Input, Inject, ElementRef, ChangeDetectorRef } from "@angular/core";

import { ANGULAR_1_TRANSLATE_INJECTION_TOKEN } from "../services/injection-tokens";

// This Angular directive will act as an interface to the "upgraded" AngularJS component
@Directive({selector: '[translate]'})
export class TranslateDirective {
    @Input("translate")
    private translate: string;
    constructor(
        @Inject(ANGULAR_1_TRANSLATE_INJECTION_TOKEN) private $translate,
        private el: ElementRef,
        private changeDetectorRef: ChangeDetectorRef,
    ) {

    }

    public ngOnInit() {
        let translationPromise: Promise<string>;

        if (this.translate)
            translationPromise = this.$translate(this.translate);
        else 
            translationPromise = this.$translate(this.el.nativeElement.innerText.trim());

        translationPromise.then(translation => {
            this.el.nativeElement.innerText = translation;
            this.changeDetectorRef.markForCheck();
        });
    }
}