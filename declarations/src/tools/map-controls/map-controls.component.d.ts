import { PublicMapService } from "../../map.public.service";
export declare class MapControlsComponent {
    private publicMapService;
    private navigateEmitter;
    constructor(publicMapService: PublicMapService);
    private scale(x);
    private resetTransform();
    private rotateRight();
    private rotateLeft();
}
