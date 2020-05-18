import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface ICommon {
    [key: string]: any;
}

export interface IQueryCustomerParams {
    customerName: string;
    carNo: string;
    companyCode: string;
    userId: string;
    commitStartDate: number;
    commitEndDate: number;
    orderStartDate: number;
    orderEndDate: number;
    [key: string]: any;
}

@Injectable()
export class FinancialReportService {
    constructor(
        private http: HttpClient) {
    }

    /** 财务报表列表 */
    queryFinanceList(params: ICommon = {}): Observable<any> {
        return this.http.post(`api/finance/list`, params);
    }

    /** 导出财务报表 */
    exportFinanceReport(params: ICommon = {}): Observable<any> {
        return this.http.post(`api/finance/export`, params);
    }
}