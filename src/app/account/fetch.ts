import { ExecuteMessage } from "@/interface/Interface";

export const fetchProcess = async (userId: string) => {
    const res = await fetch(`/api/process/${userId}`, {
        method : 'GET'
    });
    const result = await res.json();
    return result as ExecuteMessage[];
}