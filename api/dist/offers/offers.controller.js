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
exports.OffersController = void 0;
const common_1 = require("@nestjs/common");
const offers_service_1 = require("./offers.service");
const jwt_1 = require("@nestjs/jwt");
let OffersController = class OffersController {
    offers;
    jwt;
    constructor(offers, jwt) {
        this.offers = offers;
        this.jwt = jwt;
    }
    list() {
        return this.offers.listActiveOffers();
    }
    async click(authHeader, body) {
        if (!authHeader || !authHeader.startsWith('Bearer '))
            throw new common_1.UnauthorizedException();
        const token = authHeader.substring('Bearer '.length);
        const payload = await this.jwt.verifyAsync(token).catch(() => null);
        if (!payload?.sub)
            throw new common_1.UnauthorizedException();
        return this.offers.createClick(payload.sub, body?.offerId, body?.provider);
    }
};
exports.OffersController = OffersController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OffersController.prototype, "list", null);
__decorate([
    (0, common_1.Post)('click'),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OffersController.prototype, "click", null);
exports.OffersController = OffersController = __decorate([
    (0, common_1.Controller)('offers'),
    __metadata("design:paramtypes", [offers_service_1.OffersService, jwt_1.JwtService])
], OffersController);
//# sourceMappingURL=offers.controller.js.map