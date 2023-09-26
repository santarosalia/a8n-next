declare global {
    interface Window {
        IMP: {
            init: Function,
            request_pay: Function
        }
    }
}

export {}