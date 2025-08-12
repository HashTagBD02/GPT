"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostbacksController = void 0;
const common_1 = require("@nestjs/common");
const postbacks_service_1 = require("./postbacks.service");
let PostbacksController = class PostbacksController {
    service;
    constructor(service) {
        this.service = service;
    }
    async handle(provider, body) {
        const payload = {
            click_id: body.click_id ?? body.clickId ?? body.subid ?? body.sub_id,
            tx_id: body.tx_id ?? body.txid ?? body.transaction_id ?? body.event_id ?? `${Date.now()}`,
            payout_cents: body.payout_cents ?? body.payout ?? body.amount_cents ?? (typeof body.amount === 'number' ? Math.round(body.amount * 100) : undefined),
            status: body.status ?? body.event ?? 'credited',
        };
        return this.service.process(provider, payload);
    }
};
exports.PostbacksController = PostbacksController;
__decorate([
    (0, common_1.Post)(':provider'),
    __param(0, (0, common_1.Param)('provider')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PostbacksController.prototype, "handle", null);
exports.PostbacksController = PostbacksController = __decorate([
    (0, common_1.Controller)('postbacks'),
    __metadata("design:paramtypes", [postbacks_service_1.PostbacksService])
], PostbacksController);
//# sourceMappingURL=postbacks.controller.js.map