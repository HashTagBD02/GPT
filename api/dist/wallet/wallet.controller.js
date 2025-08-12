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
exports.WalletController = void 0;
const common_1 = require("@nestjs/common");
const wallet_service_1 = require("./wallet.service");
const jwt_1 = require("@nestjs/jwt");
let WalletController = class WalletController {
    wallet;
    jwt;
    constructor(wallet, jwt) {
        this.wallet = wallet;
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
    async balance(authHeader) {
        const userId = await this.getUserId(authHeader);
        return this.wallet.getBalance(userId);
    }
    async ledger(authHeader) {
        const userId = await this.getUserId(authHeader);
        return this.wallet.getLedger(userId);
    }
};
exports.WalletController = WalletController;
__decorate([
    (0, common_1.Get)('balance'),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "balance", null);
__decorate([
    (0, common_1.Get)('ledger'),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "ledger", null);
exports.WalletController = WalletController = __decorate([
    (0, common_1.Controller)('wallet'),
    __metadata("design:paramtypes", [wallet_service_1.WalletService, jwt_1.JwtService])
], WalletController);
//# sourceMappingURL=wallet.controller.js.map