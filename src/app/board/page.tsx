'use client'
import { useRouter } from "next/navigation"
export default () => {
    const router = useRouter();
    router.push('/board/1');
    return (<></>)
}