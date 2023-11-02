import { BoardCategory, Plan, DetailPrice, Level } from "@/interface/Interface"


export const BOARD_CATEGORY = {
    [BoardCategory.ALL] : 'all',
    [BoardCategory.NOTICE] : 'notice',
    [BoardCategory.SHARE] : 'share'
}

export const EXTENSION_ID = process.env.NEXT_PUBLIC_EXTENSION_ID;

export const EXTENSION_URL = 'https://chrome.google.com/webstore/detail/a8n/cfoccihaknngbcniilfkeebigdnoonnh';

export const PLANS: Plan[] = [
    {
        title : 'Free',
        subtitle : 'Testing and limited usage',
        access : [
            'One minute of process',
            'Save 5 processes'
        ],
        buttonText : 'Try for free',
        href : EXTENSION_URL,
        img : '/free.png',
        level : Level.FREE,
        processMaxCount : 5
    },
    {
        title : 'Unlimited',
        subtitle : 'Schedule process',
        access : [
            'Unlimited recording',
            'Unlimited save',
            'Schedule 5 processes'
        ],
        buttonText : 'Get Started',
        href : '/plans/unlimited',
        price : '1',
        img : '/unlimited.png',
        level : Level.UNLIMITED,
        processMaxCount : 100,
        detailPrices : [{
            index : 0,
            period : '1 Month',
            price : {
                us : '7.77',
                ko : '7000'
            },
            desc : ''
        }, {
            index : 1,
            period : '1 Year',
            price : {
                us : '3.33',
                ko : '3000'
            },
            desc : ''
        }, {
            index : 2,
            period : '3 Years',
            price : {
                us : '1.00',
                ko : '1000'
            },
            desc : ''
        }]
    },
    {
        title : 'Ultimate',
        subtitle : 'Manage process',
        access : [
            'Unlimited schdule',
            'Manage process'
        ],
        buttonText : 'Get Started',
        href : '/plans/ultimate',
        price : '3',
        img : '/ultimate.png',
        level : Level.ULTIMATE,
        processMaxCount : 500,
    }
]

export const PAGES = [{
    name : 'Plans',
    url : '/plans'
},{
    name : 'Usage',
    url : '/usage'
},{
    name : 'Board',
    url : '/board'
},{
    name : 'Get Extension',
    url : EXTENSION_URL
}];
export enum CRX_RECEIVER {
    SERVICE_WORKER = 'SERVICE_WORKER'
}
export enum CRX_COMMAND {
    CMD_CHECK_LUNATIC_MONSTER = 'CMD_CHECK_LUNATIC_MONSTER',
    CMD_SIGN_IN_LUNATIC_MONSTER = 'CMD_SIGN_IN_LUNATIC_MONSTER'
}