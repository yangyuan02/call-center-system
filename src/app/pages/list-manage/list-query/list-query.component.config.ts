import { dictionary } from 'src/app/shared/dictionary/dictionary';

const tableStateList = dictionary.get('customerLlistTableState');
export const companyList = dictionary.get('insuranceCompanys');
const ownerShipList = dictionary.get('category');
export const renewalStateList = dictionary.get('renewalState');

export interface ISearchListItem {
    id: number;
    label?: string;
    placeholder?: string;
    type: string;
    config?: any;
    [key: string]: any;
}

export const searchListLayout = {
    nzXs: '24',  
    nzMd: '12', 
    nzLg: '12', 
    nzXl: '8',
    nzXXl: '6'
};

const commonGrid = {
    label: { nzXs: '24', nzSm: '9', nzMd: '', nzLg: '', nzXl: '' },
    control: { nzXs: '24', nzSm: '15', nzMd: '', nzLg: '', nzXl: '' }
};

export const searchListItem: ISearchListItem[] = [
    {
        id: 1,
        label: '品牌',
        key: 'brandName',
        placeholder: '输入品牌',
        type: 'text',
        grid: commonGrid,
    },
    {
        id: 2,
        label: '车牌号',
        key: 'carNo',
        placeholder: '输入车牌号',
        type: 'text',
        grid: commonGrid,
    },
    {
        id: 3,
        label: '是否在职',
        key: 'inJob',
        placeholder: '请选择是否在职',
        type: 'select',
        grid: commonGrid,
        config: {
            options: [{ name: '是', value: true }, { name: '否', value: false }]
        }
    },
    {
        id: 4,
        label: '是否高端车',
        key: 'isHigh',
        placeholder: '请选择是否高端车',
        type: 'select',
        grid: commonGrid,
        config: {
            options: [{ name: '是', value: true }, { name: '否', value: false }]
        }
    },
    {
        id: 5,
        label: '是否过户',
        key: 'isTransfer',
        placeholder: '请选择是是否过户',
        type: 'select',
        grid: commonGrid,
        config: {
            options: [{ name: '是', value: true }, { name: '否', value: false }]
        }
    },
    {
        id: 6,
        label: '去年保险公司',
        key: 'lastCompanyCode',
        placeholder: '请选择去年保险公司',
        type: 'select',
        grid: commonGrid,
        config: {
            options: [
                ...companyList
            ]
        }
    },
    {
        id: 7,
        label: '指导价',
        placeholder: '',
        type: 'numberRange',
        grid: commonGrid,
        config: {
            start: {
                key: 'minPurchasePrice',
                min: 0,
                max: Infinity,
                step: 1
            },
            end: {
                key: 'maxPurchasePrice',
                min: 0,
                max: Infinity,
                step: 1
            }
        }
    },
    {
        id: 8,
        label: '车辆所属',
        placeholder: '请选择车辆所属',
        key: 'ownerShip',
        type: 'select',
        grid: commonGrid,
        config: {
            options: [
                ...ownerShipList
            ]
        }
    },
    {
        id: 9,
        label: '是否续保车',
        placeholder: '请选择是否续保车',
        key: 'renewalState',
        type: 'select',
        grid: commonGrid,
        config: {
            options: [{ name: '是', value: '1' }, { name: '否', value: '2' }]
        }
    },
    {
        id: 10,
        label: '初登日期',
        key: 'registerTime',
        type: 'dateRange',
        grid: commonGrid
    }
];

export interface ISearchListModel {
    brandName: string;
    carNo: string;
    inJob: boolean;
    isHigh: boolean;
    isTransfer: boolean;
    lastCompanyCode: string;
    minPurchasePrice: number;
    maxPurchasePrice: number;
    ownerShip: string;
    renewalState: string;
    registerTime: string[];
    [key: string]: any;
}

export const searchListModel: ISearchListModel = {
    brandName: null,
    carNo: null,
    inJob: null,
    isHigh: null,
    isTransfer: null,
    lastCompanyCode: null,
    minPurchasePrice: null,
    maxPurchasePrice: null,
    ownerShip: null,
    renewalState: null,
    registerTime: []
};

export const tableConifg = {
    thead: [
        { name: '车牌号' },
        { name: '客户名称' },
        { name: '车架号' },
        { name: '品牌型号' },
        { name: '注册日期' },
        { name: '商业险到期时间' },
        { name: '交强险到期时间' },
        { name: '去年投保公司' },
        { name: '客户类型' },
        { name: '归属人' },
        { name: '更新时间' }
    ]
};

export interface IQueryListItem {
    name: string;
    phone: string;
    plate: string;
    preInsuranceCompanyName: string;
    insuranceDueDate: string;
    handleDate: string;
    distributeDate: string;
    teamName: string;
    salesmanName: string;
    isRenewalName: string;
    dialStatusName: string;
    [key: string]: any;
}

export const listValue = (): IQueryListItem[] => {
    return Array.apply(null, Array(20)).map((item, index: number) => {
        return {
            id: index + 1,
            appointmentId: null,
            appointmentLevel: null,
            appointmentStatus: null,
            appointmentTime: null,
            appointmentTimeBegin: null,
            appointmentTimeEnd: null,
            batch: null,
            brandModel: null,
            currentPageNum: null,
            dialStatus: '11006',
            dialStatusName: '名单无效',
            distributeDate: null,
            distributionDateBegin: null,
            distributionDateEnd: null,
            failureReasons: '08004',
            firstRegisterDate: '20151010',
            firstRegisterDateBegin: null,
            firstRegisterDateEnd: null,
            handleDate: '2018-10-05',
            insuranceDueDate: '2018-10-16',
            insuranceDueDateBegin: null,
            insuranceDueDateEnd: null,
            isFlashSend: 0,
            isRenewal: 0,
            isRenewalName: '非续保',
            modifyDate: '20181107221132',
            modifyDateBegin: null,
            modifyDateEnd: null,
            name: '李其美',
            otherLink: null,
            outDocType: null,
            ownerId: 78018,
            pageSize: null,
            phone: '13862184016',
            plate: null,
            plateNumber: 'E5F38B',
            preInsuranceCompany: null,
            preInsuranceCompanyName: null,
            priceCheckStatus: null,
            province: '苏',
            remark: null,
            salesmanId: null,
            salesmanName: '王小利',
            sortArrStr: null,
            sortList: null,
            startPageSize: null,
            taskId: 24587,
            teamId: null,
            teamName: '石家庄团队',
            thisInsuranceCompany: null,
            userId: 85,
            viFlag: null
        };
    });
};