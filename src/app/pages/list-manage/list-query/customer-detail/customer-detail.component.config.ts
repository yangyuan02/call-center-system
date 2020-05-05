export interface ICustomerItem {
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

export interface ISourceCache {
    originPage: string;
    currentCustomer: ICustomerItem;
    customerListCache: ICustomerItem[];
}

export interface IDefeatReasonItem {
    id?: number;
    defeatReason: string;
    isDelete?: string;
    [key: string]: any;
}

export interface IGiftItem {
    id: number;
    tenantCode: string;
    giftName: string;
    giftPrice: string;
    [key: string]: any;
}

export const insList = [
    {
        name: '车辆损失险',
        code: 'CarDamageRisk',
        id: 1,
        hasCheckbox: true,
        type: 'inputNumber',
        value: {
            hasCurrentIns: false,
            checked: false,
            payPremium: null
        }
    },
    {
        name: '第三者责任险',
        code: 'ThirdPartyRisk',
        id: 2,
        hasCheckbox: true,
        type: 'autocomplete',
        config: {
            options: [
                '5万', '10万', '15万', '20万', '30万', '50万', '100万', '150万', '200万', '250万', '300万', '500万'
            ]
        },
        value: {
            hasCurrentIns: false,
            checked: false,
            payPremium: null
        }
    },
    {
        name: '盗抢险',
        code: 'TheftProtectionRisk',
        id: 3,
        hasCheckbox: true,
        type: 'inputNumber',
        value: {
            hasCurrentIns: false,
            checked: false,
            payPremium: null
        }
    },
    {
        name: '上人员责任险（司机）',
        code: 'DriverRisk',
        id: 4,
        hasCheckbox: true,
        type: 'autocomplete',
        config: {
            options: [
                '1万', '2万', '3万', '4万', '5万', '10万', '15万', '20万', '50万', '100万'
            ]
        },
        value: {
            hasCurrentIns: false,
            checked: false,
            payPremium: null
        }
    },
    {
        name: '车上人员责任险（乘客）',
        code: 'PassengerRisk',
        id: 5,
        hasCheckbox: true,
        type: 'autocomplete',
        config: {
            options: [
                '1万', '2万', '3万', '4万', '5万', '10万', '15万', '20万', '50万', '100万'
            ]
        },
        value: {
            hasCurrentIns: false,
            checked: false,
            payPremium: null
        }
    },
    {
        name: '车身划痕损失险',
        code: 'ScratchRisk',
        id: 6,
        hasCheckbox: true,
        type: 'autocomplete',
        config: {
            options: [
                '2000元', '5000元', '1万', '2万'
            ]
        },
        value: {
            hasCurrentIns: false,
            checked: false,
            payPremium: null
        }
    },
    {
        name: '玻璃单独破碎险',
        code: 'GlassRisk',
        id: 7,
        hasCheckbox: false,
        type: 'select',
        config: {
            options: [
                { name: '国产', value: '1' },
                { name: '进口', value: '2' },
            ]
        },
        value: {
            hasCurrentIns: false,
            checked: false,
            type: null
        }
    },
    {
        name: '自燃损失险',
        code: 'BurningRisk',
        id: 8,
        hasCheckbox: true,
        type: 'inputNumber',
        value: {
            hasCurrentIns: false,
            checked: false,
            payPremium: null
        }
    },
    {
        name: '涉水行驶损失险',
        code: 'EngineWaterRisk',
        id: 9,
        hasCheckbox: true,
        type: 'inputNumber',
        value: {
            hasCurrentIns: false,
            checked: false,
            payPremium: null
        }
    },
    {
        name: '机动车损失保险无法找到第三方特约险',
        code: 'NoThirdRisk',
        id: 10,
        hasCheckbox: false,
        type: 'inputNumber',
        value: {
            hasCurrentIns: false,
            checked: false,
            payPremium: null
        }
    },
    {
        name: '新增设备损失险',
        code: 'NewEquipmentCoverage',
        id: 11,
        hasCheckbox: true,
        type: 'inputNumber',
        value: {
            hasCurrentIns: false,
            checked: false,
            payPremium: null
        }
    },
    {
        name: '驾意险',
        code: 'DriverAccidentRisk',
        id: 12,
        hasCheckbox: false,
        type: 'inputNumber',
        value: {
            hasCurrentIns: false,
            checked: false,
            payPremium: null
        }
    },
    {
        name: '津贴保',
        code: 'GlassFilmPriceRisk',
        id: 13,
        hasCheckbox: false,
        type: 'inputNumber',
        value: {
            hasCurrentIns: false,
            checked: false,
            payPremium: null
        }
    },
    {
        name: '玻璃膜价格',
        code: 'GlassFilmPriceRisk',
        id: 14,
        hasCheckbox: false,
        type: 'inputNumber',
        value: {
            hasCurrentIns: false,
            checked: false,
            payPremium: null
        }
    },
];