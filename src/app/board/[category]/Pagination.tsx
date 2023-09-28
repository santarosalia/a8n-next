import { Pagination, PaginationItem } from "@mui/material"
import Link from "next/link";

export default ({count, page, category} : {count: number, page: string, category: string}) => {
    return (
        <Pagination
            count={count}
            page={Number(page)}
            renderItem={(item) => (
                <PaginationItem
                component={Link}
                href={`${category}?page=${item.page}`}
                key={item.page}
                {...item}/>
                
            )}></Pagination>
    )
}