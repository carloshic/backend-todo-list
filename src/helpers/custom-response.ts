import { CRStatus } from './custom-response-status';

export class CResponse {
    constructor(
        public status: CRStatus,
        public message: string,
        public data?: any,
    ) {}
}
