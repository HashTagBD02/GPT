import { PostbacksService } from './postbacks.service';
export declare class PostbacksController {
    private service;
    constructor(service: PostbacksService);
    handle(provider: string, body: any): Promise<{
        ok: boolean;
        ignored: boolean;
    } | {
        ok: boolean;
        ignored?: undefined;
    }>;
}
