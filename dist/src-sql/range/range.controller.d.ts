import { RangeService } from './range.service';
export declare class RangeController {
    private rangeService;
    constructor(rangeService: RangeService);
    getRange(): {
        code: number;
        data: any[];
        msg: string;
    };
    getRangeParam(id: number): {
        code: number;
        data: any[];
        msg: string;
    };
}
