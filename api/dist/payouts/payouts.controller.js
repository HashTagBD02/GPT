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
exports.PayoutsController = void 0;
const common_1 = require("@nestjs/common");
const payouts_service_1 = require("./payouts.service");
const jwt_1 = require("@nestjs/jwt");
const class_validator_1 = require("class-validator");
class PayoutDto {
    method;
    amountCoins;
}
__decorate([
    (0, class_validator_1.IsEnum)(['PAYPAL', 'CRYPTO', 'GIFTCARD']),
    __metadata("design:type", String)
], PayoutDto.prototype, "method", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1000),
    __metadata("design:type", Number)
], PayoutDto.prototype, "amountCoins", void 0);
let PayoutsController = class PayoutsController {
    payouts;
    jwt;
    constructor(payouts, jwt) {
        this.payouts = payouts;
        this.jwt = jwt;
    }
    async getUserId(authHeader) {
        if (!authHeader || !authHeader.startsWith('Bearer '))
            throw new common_1.UnauthorizedException();
        const token = authHeader.substring('Bearer '.length);
        const payload = await this.jwt.verifyAsync(token).catch(() => null);
        if (!payload?.sub)
            throw new common_1.UnauthorizedException();
        return payload.sub;
    }
    async request(authHeader, body) {
        const userId = await this.getUserId(authHeader);
        return this.payouts.requestPayout(userId, body.method, body.amountCoins);
    }
};
exports.PayoutsController = PayoutsController;
__decorate([
    (0, common_1.Post)('request'),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, PayoutDto]),
    __metadata("design:returntype", Promise)
], PayoutsController.prototype, "request", null);
exports.PayoutsController = PayoutsController = __decorate([
    (0, common_1.Controller)('payouts'),
    __metadata("design:paramtypes", [payouts_service_1.PayoutsService, jwt_1.JwtService])
], PayoutsController);
//# sourceMappingURL=payouts.controller.js.map