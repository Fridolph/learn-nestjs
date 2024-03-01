"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RangeService = void 0;
const common_1 = require("@nestjs/common");
let RangeService = class RangeService {
    getRange() {
        return {
            code: 0,
            data: [],
            msg: '请求数据为空',
        };
    }
    getRangeParam(size) {
        let ret = handleParams(size);
        return {
            code: 0,
            data: ret,
            msg: '请求成功',
        };
    }
};
exports.RangeService = RangeService;
exports.RangeService = RangeService = __decorate([
    (0, common_1.Injectable)()
], RangeService);
function handleParams(num) {
    let ret = [];
    for (let i = 0; i < num; i++) {
        ret.push('' + (i + 1));
    }
    return ret;
}
//# sourceMappingURL=range.service.js.map