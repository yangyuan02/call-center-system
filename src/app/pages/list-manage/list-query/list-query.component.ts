import { Component, OnInit, OnDestroy } from '@angular/core';
import { jackInTheBoxAnimation, jackInTheBoxOnEnterAnimation } from 'src/app/shared/animate/index';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { ISearchListItem, searchListItem, ISearchListModel, searchListModel, 
    tableConifg, IQueryListItem, searchListLayout, companyList, renewalStateList, customerStatusList } from './list-query.component.config';
import { IPageChangeInfo, PaginationService } from 'src/app/shared/component/search-list-pagination/pagination';
import { IQueryCustomerParams, ListManageService } from '../list-manage.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { findValueName } from 'src/app/core/utils/function';
import * as dayjs from 'dayjs';
import { Router } from '@angular/router';
import LocalStorageService from 'src/app/core/cache/local-storage';
import { LocalStorageItemName } from 'src/app/core/cache/cache-menu';
import { ApiService } from 'src/app/api/api.service';

type ITableCfg = typeof tableConifg;
type pageChangeType = 'pageIndex' | 'pageSize';

interface ICommon {
    [key: string]: any;
}

@Component({
    selector: 'list-query-list',
    templateUrl: './list-query.component.html',
    styleUrls: ['./list-query.component.scss'],
    animations: [
        jackInTheBoxAnimation(),
        jackInTheBoxOnEnterAnimation({duration: 900})
    ]
})
export class ListQueryComponent implements OnInit, OnDestroy {
    /** 搜索配置 */
    searchListItem: ISearchListItem[];
    searchListModel: ISearchListModel;
    searchListLayout: ICommon;
    /** 列表展示数据 */
    queryList: IQueryListItem[];
    /** table列表配置 */
    tableCfg: ITableCfg = tableConifg;
    /** 分页 */
    pageInfo: PaginationService;
    /** 是否正在加载 */
    isLoading: boolean;

    constructor(
        private message: NzMessageService,
        private modalService: NzModalService,
        private listManageService: ListManageService,
        private router: Router,
        private localCache: LocalStorageService,
        private apiService: ApiService
    ) {
        this.searchListItem = [...searchListItem];
        this.searchListModel = {...searchListModel};
        this.searchListLayout = {...searchListLayout};
        this.queryList = [];
        this.pageInfo = new PaginationService({
            total: 0,
            pageSize: 10,
            pageIndex: 1
        });
        this.isLoading = true;
    }

    ngOnInit() {
        this.setSearchListModelValue();
        this.search();
    }

    /**
     * @callback
     * @desc 搜索
     */
    search() {
        const params = this.formatSearchParams();

        this.loadQqueryList(params);
    }

    /**
     * @callback
     * @desc 重置
     */
    reseat() {
        this.searchListModel = {...searchListModel};
    }

    /**
     * @func
     * @desc format请求的参数
     */
    formatSearchParams(): IQueryCustomerParams {
        const { registerTime, insuranceTime, distributionTime, appointmentTime, updateTime } = this.searchListModel;
        const params = {
            ...this.searchListModel,
            startRegisterTime: registerTime[0] && new Date(registerTime[0]).getTime() || null,
            endRegisterTime: registerTime[1] && new Date(registerTime[1]).getTime() || null,
            insuranceStartDate: insuranceTime[0] && new Date(insuranceTime[0]).getTime() || null,
            insuranceEndDate: insuranceTime[1] && new Date(insuranceTime[1]).getTime() || null,
            distributionStartDate: distributionTime[0] && new Date(distributionTime[0]).getTime() || null,
            distributionEndDate: distributionTime[1] && new Date(distributionTime[1]).getTime() || null,
            appointmentStartDate: appointmentTime[0] && new Date(appointmentTime[0]).getTime() || null,
            appointmentEndDate: appointmentTime[1] && new Date(appointmentTime[1]).getTime() || null,
            updateStartDate: updateTime[0] && new Date(updateTime[0]).getTime() || null,
            updateEndDate: updateTime[1] && new Date(updateTime[1]).getTime() || null,
        };

        return params;
    }

    /**
     * @func
     * @desc 加载查询列表
     * @param params 
     * @param pageChangeType 
     */
    loadQqueryList(params: IQueryCustomerParams, pageChangeType?: pageChangeType) {
        this.isLoading = true;
        const { pageIndex, pageSize } = this.pageInfo;
        const requestParam: ICommon = {
            ...params,
            basePageInfo: {
                pageNum: pageIndex,
                pageSize
            }
        };

        delete requestParam.registerTime;

        this.listManageService.queryCustomer(requestParam).pipe(
            catchError(err => of(err))
        ).subscribe(res => {
            this.isLoading = false;

            if (!(res instanceof TypeError)) {
                if (res.list) {
                    const { list, total } = res;
                    this.queryList = list.map(item => {
                        const { distributionDate, appointmentTime, registerTime, updateTime, handleState, compulsoryEndTime } = item;
                        item['renewalStateName'] = findValueName(renewalStateList, item['renewalState']);
                        item['lastCompanyName'] = findValueName(companyList, item['lastCompanyCode']);
                        item['distributionDateTimeFormat'] = distributionDate && dayjs(distributionDate).format('YYYY-MM-DD') || '--';
                        item['appointmentTimeFormat'] = appointmentTime && dayjs(appointmentTime).format('YYYY-MM-DD') || '--';
                        item['registerTimeFormat'] = registerTime && dayjs(registerTime).format('YYYY-MM-DD') || '--';
                        item['compulsoryEndTimeFormat'] = compulsoryEndTime && dayjs(compulsoryEndTime).format('YYYY-MM-DD') || '--';
                        item['updateTimeFormat'] = updateTime && dayjs(updateTime).format('YYYY-MM-DD') || '--';
                        item['handleStateName'] = handleState && findValueName(customerStatusList, handleState) || '--';
                        return item;
                    });
                    this.pageInfo.total = total;
                } else {
                    this.queryList = [];
                    this.pageInfo.total = 0;
                }
                
                pageChangeType === 'pageSize' && (this.pageInfo.pageIndex = 1);
            }
        });
    }

    /**
     * @func
     * @desc 设置搜索参数字段的值
     * @param searchListModel 
     */
    setSearchListModelValue() {
        const cacheValue = this.readListManageSearchParams();

        if (cacheValue) {
            const { searchParams, pageInfo } = cacheValue;
            Object.assign(this.searchListModel, {
                ...searchParams
            });

            const { total, pageSize, pageIndex } = pageInfo;
            this.pageInfo.total = total;
            this.pageInfo.pageSize = pageSize;
            this.pageInfo.pageIndex = pageIndex;
        }
    }

    /**
     * @func
     * @desc 缓存保单审核查询条件
     */
    saveListManageSearchParams() {
        const cache = {
            searchParams: {
                ...this.searchListModel
            },
            pageInfo: {
                ...this.pageInfo
            },
            canRead: false
        };

        this.localCache.set(LocalStorageItemName.LISTMANAGESEARCHPARAMS, cache);
    }

    /**
     * @func
     * @desc 读取保单审核查询条件缓存
     */
    readListManageSearchParams() {
        const cache = this.localCache.get(LocalStorageItemName.LISTMANAGESEARCHPARAMS);
        const { canRead = false } = cache && cache['value'] || {};

        if (canRead) {
            /** 移除缓存 */
            this.localCache.remove(LocalStorageItemName.LISTMANAGESEARCHPARAMS);
            return cache['value'];
        }

        return null;
    }

    /**
     * @callback
     * @desc 展示客户详情信息
     * @param customer 
     */
    customerDetail(customer: IQueryListItem) {
        const cache = {
            originPage: 'listManage/query',
            customerListCache: this.queryList,
            currentCustomer: customer
        };

        this.localCache.set(LocalStorageItemName.CUSTOMERDETAIL, cache);
        this.saveListManageSearchParams();
        this.router.navigate(['/listManage/query', 'detail']);
    }

    /**
     * @callback
     * @desc 添加客户
     */
    addCustomer() {
        this.router.navigate(['/listManage/query', 'add']);
    }

    /**
     * @func
     * @desc 分页发生变化
     */
    onPageChange(changeInfo: IPageChangeInfo) {
        const property = changeInfo.type;
        this.pageInfo[property] = changeInfo.value;

        const params = this.formatSearchParams();
        this.loadQqueryList(params, property);
    }

    ngOnDestroy() {}
}
