import { CRX_COMMAND, CRX_RECEIVER, EXTENSION_ID } from "@/constants/Constants";
import { Post, ProcessDetail, ProcessInfo } from "@/interface/Interface";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

export const getAccessToken = async () => {
    const res = await fetch(`/api/auth/accesstoken`, {
        method : 'GET'
    });
    if (!res.ok) return null;
    const result: RequestCookie = await res.json();
    return result;
}

export const signIn = async (inputs: {
    email: string,
    password: string
}) => {
    const res = await fetch(`/api/signin`, {
        method : 'POST',
        body : JSON.stringify(inputs)
    });
    const accessToken: string | null = await res.json();
    return accessToken;
}

export const getRefreshToken = async () => {
    const res = await fetch(`/api/auth/refreshtoken`, {
        method : 'GET'
    });
    if (!res.ok) return null;
    const result: RequestCookie = await res.json();
    return result;
}

export const refreshAuth = async () => {
    const res = await fetch(`/api/auth/refreshtoken`, {
        method : 'PUT'
    });
    if (!res.ok) return null;
    const result: RequestCookie = await res.json();
    return result;
}

export const deleteAccessToken = async () => {
    await fetch('/api/auth/accesstoken', {
        method : 'DELETE'
    });
}

export const getPosts = async (category:string, page: number) => {
    const res = await fetch(`/api/board/${category}/?page=${page}`, {
        method : 'GET'
    });
    const result: { count: number, posts: Post[] } = await res.json();
    return result;
}

export const isExistsCrx = async () => {
    if (!chrome || !chrome.runtime) return false;
    const result: boolean = await sendMessageToCrx(CRX_COMMAND.CMD_CHECK_LUNATIC_MONSTER);
    return result;
}

export const signInCrx = async () => {
    if (!chrome || !chrome.runtime) return;
    const refreshToken = await getRefreshToken();
    const result: boolean = await sendMessageToCrx(CRX_COMMAND.CMD_SIGN_IN_LUNATIC_MONSTER, JSON.stringify(refreshToken?.value));
    return result;
}

export const sendMessageToCrx = async (command: CRX_COMMAND, payload?: any) => {
    return await chrome.runtime.sendMessage(EXTENSION_ID, {
        receiver : CRX_RECEIVER.SERVICE_WORKER,
        command : command,
        payload : payload
    });
}


export const fetchProcesseInfos = async () => {
    const res = await fetch(`/api/process`, {
        method : 'GET'
    });
    const result = await res.json();
    return result as ProcessInfo[];
}

export const fetchProcessDetail = async (processId: string) => {
    const res = await fetch(`/api/process/${processId}`, {
        method : 'GET'
    });
    if (!res.ok) return null;
    const result: ProcessDetail = await res.json();
    result.data = JSON.parse(result.data as string);
    return result;
}