import { deleteAccessToken, getAccessToken, getRefreshToken, refreshAuth } from "@/api/Api";
import { decodeJwt } from "@/app/lib/jwt";

export const authorization = async () => {
    const accessToken = await getAccessToken();
    if (accessToken) {
        const user = JSON.parse(JSON.stringify(decodeJwt(accessToken?.value!)));
        return user;
    } else {
        const refreshToken = await getRefreshToken();
        if (refreshToken) {
           const accessToken = await refreshAuth();
           const user = JSON.parse(JSON.stringify(decodeJwt(accessToken?.value!)));
           return user;
        }
    }
    await deleteAccessToken();
    return null;
}