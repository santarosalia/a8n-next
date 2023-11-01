import { getAccessToken } from "@/api/Api";
import { NextResponse } from "next/server";

export const auth = async () => {
    const accessToken = await getAccessToken();
    if (accessToken) {

    }
    
    
    
    // .then(accessToken => {
    //     const user = JSON.parse(JSON.stringify(decodeJwt(accessToken?.value!)));
    //     dispatch(setUser(user));
    //     dispatch(setIsLoading(false));
    // }).catch((e: NextResponse) => {
    //     switch (e.status) {
    //         case 401 : {
    //             getRefreshToken().then(accessToken => {
    //                 const user = JSON.parse(JSON.stringify(decodeJwt(accessToken?.value!)));
    //                 dispatch(setUser(user));
    //                 dispatch(setIsLoading(false));
    //             }).catch((e: NextResponse) => {
    //                 switch (e.status) {
    //                     case 401 : {
    //                         deleteAccessToken().then(() => {
    //                             dispatch(setUser(null));
    //                             dispatch(setIsLoading(false));
    //                         });
    //                     }
    //                 }
    //             });
    //             break;
    //         }
    //         case 404 : {
    //             dispatch(setUser(null));
    //             dispatch(setIsLoading(false));
    //             break;
    //         }
    //         default : {
    //             dispatch(setUser(null));
    //             dispatch(setIsLoading(false));
    //             break;
    //         }
    //     }
        
    // });
}