import { ReactNode } from "react";

export interface Post {
    index: number,
    id: string
    title: string,
    content: string,
    user: {
        id: string,
        name: string
    },
    createdAt: string,
    updatedAt: string,
    category: string,
    hashtag: string,
    readCount: number,
    commentCount: number,
    recommend: number
}

export enum BoardCategory {
    ALL,
    NOTICE,
    SHARE,
}

export enum Level {
    FREE,
    UNLIMITED,
    ULTIMATE
}

export interface Plan {
    title: string,
    subtitle: string,
    access: string[],
    buttonText: string,
    price?: string,
    href: string,
    img: string,
    detailPrices?: DetailPrice[],
    children?: ReactNode,
    level?: Level,
    processMaxCount?: number
}

export interface DetailPrice {
    index: number,
    period: string,
    price: {
        us: string,
        ko: string
    },
    desc: string
}

interface UserSession {
    accessToken: string,
    createdAt: string,
    email: string,
    emailVerified?: string,
    id: string,
    image?: string,
    level: number,
    name: string,
    updatedAt: string
}
export enum BrowserAction {
    CREATE = 'create',
    CONNECT = 'connect',
    SWITCH_FRAME = 'switchFrame',
    RESET_FRAME = 'resetFrame',
    CLOSE = 'close',
    MAXIMIZE = 'maximize',
    MINIMIZE = 'minimize',
    SCROLL_TO = 'scrollTo',
    GO_TO = 'goTo',
    GO_BACK = 'goBack',
    GO_FORWARD = 'goForward',
    SWITCH_TAB = 'switchTab',
    WAIT = 'wait',
    HANDLE_ALERT = 'handleAlert',
    BROWSER_RECORDER_SCRAPING = 'browserRecorderScraping',
    EVALUATE = 'evaluate',
    DETACH_DEBUGGER = 'detachDebugger'
}
export enum ElementAction {
    LEFT_CLICK = 'leftClick',
    DOUBLE_CLICK = 'doubleClick',
    RIGHT_CLICK = 'rightClick',
    HOVER = 'hover',
    TYPE = 'type',
    READ = 'read',
    EXISTS = 'exists',
    GET_PROPERTY = 'getProperty',
    PRESS = 'press',
    GET_BOUNDING_BOX = 'getBoundingBox',
    READ_TAG = 'readTag',
    BOX_MODEL = 'boxModel',
    SET_CHECK_BOX_STATE = 'setCheckBoxState',
    SET_SELECT_BOX_VALUE = 'setSelectBoxValue',
    SCREENSHOT = 'screenshot',
    FIND_CHILDREN = 'findChildren',
    CLIPBOARD_WRITE = 'clipboardWrite',
    GET_OUTERHTML = 'getOuterHTML'
}
export enum ConnectOptionType {
    URL = 'URL',
    TITLE = 'Title',
    INSTANCE_UUID = 'instanceUUID'
}
export enum LocatorType {
    XPATH = 'xpath',
    FULL_XPATH = 'fullXpath',
    LINK_TEXT_XPATH = 'linkTextXpath',
    CSS_SELECTOR = 'cssSelector'
}
export enum BrowserType {
    CHROME = 'Chrome',
    EDGE = 'Edge'
}
export enum CloseTarget {
    TAB = 'tab',
    WINDOW = 'window'
}
export enum AlertOption {
    ACCEPT = 'accept',
    DISMISS = 'dismiss',
    READ = 'read',
    EXISTS = 'exists'
}
export interface ExecuteActionParameter {
    timeout? : number
    url? : string
    connectOption? : {
        type : ConnectOptionType,
        value : string,
        isContains : boolean
    }
    locatorType? : LocatorType
    locator? : string
    text? : string
    propertyName? : string
    frameName? : string
    key? : string
    check? : boolean
    selectValue? : string
    x? : number
    y? : number
    tabIndex? : number
    browserType? : BrowserType
    target? : CloseTarget
    alertOption? : AlertOption
    dataScrapingOptionString? : string
    script?: string
}
export type Action = BrowserAction | ElementAction;

export interface ExecuteMessage {
    object : {
        instanceUUID? : string
        action? : Action
        parameter? : ExecuteActionParameter
    }
}