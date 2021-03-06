import { dictionary } from 'src/app/shared/dictionary/dictionary';

export const companyList = dictionary.get('insuranceCompanys');
const ownerShipList = dictionary.get('category');
export const renewalStateList = dictionary.get('renewalState');
export const internalOrderStatusList = dictionary.get('internalOrderStatus');

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
    nzLg: '8',  
    nzXl: '6',
    nzXXl: '6'
};

const commonGrid = {
    label: { nzXs: '24', nzSm: '10', nzMd: '', nzLg: '', nzXl: '' },
    control: { nzXs: '24', nzSm: '14', nzMd: '', nzLg: '', nzXl: '' }
};

export const searchListItem: ISearchListItem[] = [
    {
        id: 1,
        label: '姓名',
        key: 'customerName',
        placeholder: '请输入客户姓名',
        type: 'text',
        grid: commonGrid,
    },
    {
        id: 6,
        label: '车牌',
        key: 'carNo',
        placeholder: '输入车牌',
        type: 'text',
        grid: commonGrid,
    },
    {
        id: 15,
        label: '投保公司',
        key: 'companyCode',
        placeholder: '请选择上年保险公司',
        type: 'select',
        grid: commonGrid,
        config: {
            options: [
                ...companyList
            ]
        }
    },
    {
        id: 16,
        label: '业务员',
        key: 'userId',
        placeholder: '请选择业务员',
        type: 'select',
        grid: commonGrid,
        config: {
            options: [
            ]
        }
    },
    {
        id: 17,
        label: '提交日期',
        key: 'commitTime',
        type: 'dateRange',
        grid: commonGrid
    },
    {
        id: 18,
        label: '审核状态',
        key: 'handleState',
        placeholder: '请选择审核状态',
        type: 'select',
        grid: commonGrid,
        config: {
            options: [
                ...internalOrderStatusList
            ]
        }
    },
    {
        id: 19,
        label: '出单日期',
        key: 'orderTime',
        type: 'dateRange',
        grid: commonGrid
    },
    {
        id: 20,
        label: '店铺',
        key: 'tenantCode',
        type: 'select',
        grid: commonGrid,
        config: {
            options: [
            ]
        }
    }
];

export interface ISearchListModel {
    customerName: string;
    carNo: string;
    companyCode: string;
    userId: string;
    commitTime: string[];
    handleState: string;
    orderTime: string[];
    [key: string]: any;
}

export const searchListModel: ISearchListModel = {
    customerName: null,
    carNo: null,
    companyCode: null,
    userId: null,
    commitTime: [],
    handleState: null,
    orderTime: []
};

export const tableConfig = {
    thead: [
        { name: '姓名', type: 'fixed-left' },
        { name: '车牌' },
        { name: '保险公司' },
        { name: '业务员' },
        { name: '提交日期' },
        { name: '审核状态' },
        { name: '出单日期' },
        { name: '打印状态' },
        { name: '付款状态' },
        { name: '操作', type: 'fixed-right' }
    ]
};

export interface IPolicyReviewItem {
    carId: string;
    carNo: string;
    customerName: string;
    vinNo: string;
    brandName: string;
    enrollDate: string;
    commercialEndTime: string;
    compulsoryEndTime: string;
    lastCompanyCode: string;
    lastCompanyName: string;
    customerType: string;
    assigneeName: string;
    modifierTime: string;
    [key: string]: any;
}

export interface ISalesman {
    memberId: number;
    regionId: number;
    regionName: string;
    salesmanName: string;
    teamId: number;
    teamName: string;
    [key: string]: any;
}

export const printStyle = `
.print-item {
    display: block;
    border: 1px solid #000;
    width: 600px;
    margin: 0 auto;
    margin-bottom: 24px;
  }

  .print-item::after {
      clear: both;
      overflow: hidden;
      content: '';
      display:block;
      height: 0;
      content: '';
  }

  .print-item > div.table-tr,
  .print-item > div.table-div {
      width: 100%;
      flex: 0 0 auto;
      float: left;
  }

  .print-item > div.table-tr.gift {
    width: 240px;
  }

  .print-item > div.table-tr.gift .nzFormItem {
    border-right: 1px solid #000;
  }

  .print-item > div.table-tr.date {
    width: 360px;
  }

  div.table-div span {
    width: 119px;
    display:inline-block;
    border-bottom: 1px solid #000;
    line-height: 29px;
    height: 29px;
    float: left;
    text-align: center;
  }

  div.table-div > span:not(:last-child) {
    border-right: 1px solid #000;
  }

  .nzFormItem {
    display: flex;
    margin: 0;
  }
  .nzFormItem .ant-form-item-label,
  .nzFormItem .ant-form-item-control {
    line-height: 30px;
  }
  .nzFormItem .nzFormLabel {
    text-align: center;
    border-bottom: 1px solid #000;
    border-right: 1px solid #000;
  }
  .nzFormItem .nzFormControl {
    flex: 1;
    border-bottom: 1px solid #000;
  }

  .nzFormItem .nzFormControl .ant-input {
    border: none !important;
    height: 30px;
  }
  .nzFormItem .nzFormControl .ant-input:focus {
    box-shadow: none;
  }
  .nzFormItem .nzFormControl .ant-input-number-input {
    height: 35px;
  }
  .nzFormItem .nzFormControl .ant-input-number {
    border: none;
  }
  .nzFormItem .nzFormControl .ant-input-number:focus {
    box-shadow: none;
  }
  .nzFormItem .nzFormControl .ant-input-number-focused {
    box-shadow: none;
  }
  .nzFormItem .nzFormLabel {
    flex-basis: 119px;
  }
  .nzFormItem .nzFormLabel.ins-label {
    flex-basis: 160px;
  }
  .nzFormItem .nzFormLabel,
  .nzFormItem .nzFormControl {
    line-height: 30px;
    min-height: 30px;
  }
  .nzFormItem .nzFormControl {
    padding: 0px 11px;
    white-space: nowrap;
  }
  .nzFormItem .nzFormControl.scroll-x {
    white-space: normal;
  }

  .print-item > div.table-tr:last-child .nzFormLabel,
  .print-item > div.table-tr:last-child .nzFormControl{
    border-bottom: 0;
  }
`;
