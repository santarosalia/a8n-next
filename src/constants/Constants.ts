import { Category, Plan } from "@/interface/Interface"


export const CATEGORY = {
    [Category.ALL] : 'all',
    [Category.NOTICE] : 'notice',
    [Category.SHARE] : 'share'
}


export const plans: Plan[] = [
    {
        title : 'Free',
        subtitle : 'Testing and limited usage',
        access : [
            'One minute of process',
            'Save 5 processes'
        ],
        buttonText : 'Try for free',
        href : 'https://naver.com',
        img : '/free.png'
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
        img : '/unlimited.png'
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
        img : '/ultimate.png'
    }
]