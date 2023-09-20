import { Plan } from "./interface";

export const plans: Plan[] = [
    {
        title : 'Free',
        subtitle : 'Testing and limited usage',
        access : [
            'One minute of process',
            'Save 5 processes'
        ],
        buttonText : 'Try for free',
        href : 'https://naver.com'
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
        href : 'https://naver.com',
        price : '1'
    },
    {
        title : 'Ultimate',
        subtitle : 'Manage process',
        access : [
            'Unlimited schdule',
            'Manage process'
        ],
        buttonText : 'Get Started',
        href : 'https://naver.com',
        price : '3'
    }
]