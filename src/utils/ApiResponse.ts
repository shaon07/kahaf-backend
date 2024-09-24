type ApiResponseType = {
    statusCode?: number
    status?: 'fail' | 'success'
    data?: any
    message?: string
}

export default class ApiResponse {
    statusCode: number;
    status: 'fail' | 'success';
    data: any;
    message: string;
    constructor({ statusCode, data, message, status='success' }:ApiResponseType) {
        this.statusCode = statusCode || 200
        this.status = status
        this.message = message || ''
        this.data = data || {}
    }
}