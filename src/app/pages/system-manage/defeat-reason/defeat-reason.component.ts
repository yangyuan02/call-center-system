import { Component, OnInit, OnDestroy } from '@angular/core';
import { jackInTheBoxAnimation, jackInTheBoxOnEnterAnimation } from 'src/app/shared/animate/index';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { tableConifg, IDefeatReasonItem, listValue } from './defeat-reason.component.config';
import { DefeatReasonFormModalComponent } from '../modal/defeat-reason-form/defeat-reason-form.component';
import { SystemManageService } from '../system-manage.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

type ITableCfg = typeof tableConifg;

@Component({
    selector: 'defeat-reason-list',
    templateUrl: './defeat-reason.component.html',
    styleUrls: ['./defeat-reason.component.scss'],
    animations: [
        jackInTheBoxAnimation(),
        jackInTheBoxOnEnterAnimation({duration: 900})
    ]
})
export class DefeatReasonComponent implements OnInit, OnDestroy {
    /** 战败原因展示列表 */
    defeatReasonList: IDefeatReasonItem[];
    /** table列表配置 */
    tableCfg: ITableCfg = tableConifg;
    /** 是否正在加载 */
    isLoading: boolean;

    constructor(
        private message: NzMessageService,
        private modalService: NzModalService,
        private systemManageService: SystemManageService
    ) {
        this.defeatReasonList = [];
    }

    ngOnInit() {
        this.loadDefeatReasonList();
    }

    /**
     * @func
     * @desc 加载战败原因
     */
    loadDefeatReasonList() {
        this.isLoading = true;

        this.systemManageService.queryDefeatreasonList().pipe(
            catchError(err => of(err))
        ).subscribe(res => {
            if (res instanceof Array) {
                this.defeatReasonList = res;
            }

            this.isLoading = false;
        });
    }

    /**
     * @callback
     * @desc 添加战败原因
     */
    addDefeatReason() {
        const modal = this.modalService.create({
            nzTitle: '添加战败原因',
            nzContent: DefeatReasonFormModalComponent,
            nzComponentParams: {
                type: 'add'
            },
            nzMaskClosable: false,
            nzFooter: null
        });

        modal.afterClose.subscribe((res: string) => {
            if (res === 'success') {
                this.message.create('success', `添加成功`);
                this.loadDefeatReasonList();
            }
        });
    }

    /**
     * @callback
     * @desc 修改战败原因
     * @param defeatReason 
     */
    modifyDefeatReason(defeatReason: IDefeatReasonItem) {
        const modal = this.modalService.create({
            nzTitle: '修改战败原因',
            nzContent: DefeatReasonFormModalComponent,
            nzComponentParams: {
                defeatReason,
                type: 'update'
            },
            nzMaskClosable: false,
            nzFooter: null
        });

        modal.afterClose.subscribe((res: string) => {
            if (res === 'success') {
                this.message.create('success', `修改成功`);
                this.loadDefeatReasonList();
            }
        });
    }

    /**
     * @callback
     * @desc 删除战败原因
     * @param defeatReason 
     */
    deleteDefeatReason(defeatReason: IDefeatReasonItem) {
        this.modalService.confirm({
            nzTitle: '提示',
            nzContent: `您确定删除该条数据吗?`,
            nzOnOk: () => {
                const params = {
                    idList: [defeatReason.id]
                };

                this.systemManageService.deleteDefeatreason(params).pipe(
                    catchError(err => of(err))
                ).subscribe(res => {
                    this.message.success('删除成功');
                    this.loadDefeatReasonList();
                });
            },
            nzOnCancel: () => {
                this.message.info('您已取消删除操作');
            }
        });
    }

    ngOnDestroy() {}
}