import { Component, OnInit, OnDestroy } from '@angular/core';
import { jackInTheBoxAnimation, jackInTheBoxOnEnterAnimation } from 'src/app/shared/animate/index';
import { NzModalService, NzMessageService, NzModalRef } from 'ng-zorro-antd';
import LocalStorageService from 'src/app/core/cache/local-storage';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalStorageItemName } from 'src/app/core/cache/cache-menu';
import { ISourceCache, ICustomerItem, IDefeatReasonItem } from './customer-detail.component.config';
import { dictionary } from 'src/app/shared/dictionary/dictionary';
import { CustomerService } from '../customer-manage.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { DefeatSubmitModalComponent } from '../modal/defeat-submit-modal/defeat-submit-modal.component';

interface ICommon {
    [key: string]: any;
}

@Component({
    selector: 'customer-detail',
    templateUrl: './customer-detail.component.html',
    styleUrls: ['./customer-detail.component.scss'],
    animations: [
        jackInTheBoxAnimation(),
        jackInTheBoxOnEnterAnimation({duration: 900})
    ]
})
export class CustomerDetailComponent implements OnInit, OnDestroy {
    /** 资源缓存 */
    sourceCache: ISourceCache | null;
    /** 表单 */
    validateForm: FormGroup;
    /** 表单选项列表 */
    formList = {
        insuranceCompanysList: dictionary.get('insuranceCompanys'),
        useNatureList: [],
        categoryList: [],
    };
    /** 需要保存的参数 */
    otherFormParams: ICommon;
    /** 战败原因 */
    defeatReasonList: IDefeatReasonItem[];
    /** 当前展示的客户 */
    currentCustomer: ICommon;

    constructor(
        private modalService: NzModalService,
        private message: NzMessageService,
        private localCache: LocalStorageService,
        private fb: FormBuilder,
        private customerService: CustomerService
    ) {
        const cache = this.localCache.get(LocalStorageItemName.CUSTOMERDETAIL);
        this.sourceCache = cache && cache.value || null;
        this.otherFormParams = {
            giftList: []
        };
        this.defeatReasonList = [];
    }

    ngOnInit() {
        this.sourceCache && this.showDetailForm(this.sourceCache.currentCustomer);

        this.validateForm = this.fb.group({
            /** 客户信息 */
            name: [null, [Validators.required]],
            idCard: [null, [Validators.required]],
            callPhone: [null, [Validators.required]],
            otherLink: [null],
            address: [null],
            customerInfoRemark: [null],
            /** 车辆信息 */
            plate: [null],
            brandModel: [null],
            vinCode: [null],
            engineNumber: [null],
            seating: [null],
            firstRegisterDate: [null],
            insuranceDueDate: [null],
            inspectPeriodDate: [null],
            preInsuranceCompany: [null],
            useNature: [null],
            category: [null],
            price: [null],
            /** 最终报价 */
            viPrice: [null],
            viDiscount: [null],
            isDiscount: [null],
            cashBack: [null],
            clivtaFlag: [null],
            clivtaPrice: [null],
            travelTaxFlag: [null],
            travelTax: [null],
            billedPremium: [null],
            paidInAmount: [null],
            /** 时间信息 */
            clivtaDate: [null],
            viDate: [null],
            /** 保单派送信息 */
            deliveryTime: [null],
            recipient: [null],
            phone: [null],
            salesman: [null],
            remark: [null]
        });

        this.loadDefeatReasonList();
    }

    /**
     * @callback
     * @desc 展示客户详情
     * @param customer 
     */
    showDetailForm(customer: ICustomerItem) {
        this.sourceCache.customerListCache.forEach((item: ICustomerItem) => {
            item['selected'] = customer.id === item.id;
        });
        this.loadDetailCustomerForm(customer);
        this.currentCustomer = customer;
    }

    /**
     * @func
     * @desc 加载客户详情
     * @param customer 
     */
    loadDetailCustomerForm(customer: ICustomerItem) {
        
    }

    /**
     * @func
     * @desc 加载战败原因
     */
    loadDefeatReasonList() {
        this.customerService.queryDefeatReasonList().pipe(
            catchError(err => of(err))
        ).subscribe(res => {
            if (res instanceof Array) {
                this.defeatReasonList = res;
            }
        });
    }

    /**
     * @callback
     * @desc 添加赠品
     */
    chooseGift() {

    }

    /**
     * @callback
     * @desc 删除礼物
     * @param index 
     */
    deleteGift(index: number) {
        this.otherFormParams.giftList.splice(index, 1);
    }

    /**
     * @callback
     * @desc 保存信息
     */
    submitForm() {
        for (const i in this.validateForm.controls) {
            this.validateForm.controls[i].markAsDirty();
            this.validateForm.controls[i].updateValueAndValidity();
          }
  
          if (this.validateForm.valid) {
          }
    }

    /**
     * @callback
     * @desc 失败提交
     */
    defeatSubmit() {
        const modal = this.modalService.create({
            nzTitle: '失败提交',
            nzContent: DefeatSubmitModalComponent,
            nzComponentParams: {
                defeatReasonList: this.defeatReasonList.map(item => ({
                    ...item,
                    name: item.defeatReason,
                    value: item.id
                })),
                customerId: this.currentCustomer.id
            },
            nzMaskClosable: false,
            nzFooter: null
        });

        modal.afterClose.subscribe((res) => {
            if (res === 'success') {
                this.message.create('success', `提交成功`);
            }
        });
    }

    ngOnDestroy() {}
}
