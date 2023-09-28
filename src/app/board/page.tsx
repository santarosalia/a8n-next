import { redirect } from "next/navigation"

export default () => {
    redirect('board/all?page=1');
}