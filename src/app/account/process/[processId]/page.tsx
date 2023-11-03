'use client'
import { useRouter } from "next/navigation";
import { useEffect } from "react"

export default ({ params }: { params: { processId: string}}) => {
    const router = useRouter();
    useEffect(() => {
        fetch(`/api/process-detail/${params.processId}`, {
            method : 'GET'
        }).then(res => {
            if (!res.ok) router.back();
        });
    }, []);
    return (<></>)
}