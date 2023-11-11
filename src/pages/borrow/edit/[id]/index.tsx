import { getBorrowDetail } from "@/api/borrow";
import BorrowForm from "@/components/BorrowForm";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


export default function BorrowEdit() {
    const [editData, setEditData] = useState();
    const router = useRouter()
    useEffect(() => {
        getBorrowDetail(router.query.id).then((res) => {
            setEditData(res.data);
        })
    }, [router.query.id])
    return <BorrowForm title="借阅编辑" editData={editData}/>
}
