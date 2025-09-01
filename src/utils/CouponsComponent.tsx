/* eslint-disable @typescript-eslint/no-explicit-any */
import BlockOrDeleteConfirmation from "@/components/BlockOrCancelOrDeleteConfirmation";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useDeleteCouponMutation, useGetAllCouponsQuery } from "@/redux/features/coupons/coupon.api";
import { CouponModal } from "@/utils/CouponModal";
import { CreateCouponModal } from "@/utils/CreateCouponModal";
import GetPagination from "@/utils/GetPagination";

import { SkeletonCard } from "@/utils/SkeletonCard";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function CouponComponent() {
    const { data, isLoading } = useGetAllCouponsQuery(undefined)
    const total = data?.data?.length ?? 0;
    //const [updateCoupon] = useUpdateCouponMutation()
    const [deleteCoupon] = useDeleteCouponMutation()

    const [activeRow, setActiveRow] = useState<string | null>(null);
    const [hoveredRow, setHoveredRow] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const couponsPerPage = 5;

    const startIndex = (currentPage - 1) * couponsPerPage;
    const endIndex = startIndex + couponsPerPage;


    const totalPage = Math.ceil(total / couponsPerPage);
    const currentData = data?.data.slice(startIndex, endIndex);




    const handleDeleteCoupon = async (id: string) => {
        const toastId = toast.loading("Coupon deleting...");
        try {
            const res = await deleteCoupon({ id }).unwrap();

            if (res.success) {
                toast.success("Coupon Deleted!", { id: toastId });
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong!", { id: toastId });
        }
    };



    if (isLoading) {
        return <SkeletonCard />
    }

    return (
        <div className="w-full max-w-7xl mx-auto px-5">
            <div className="flex justify-between my-8">
                <h1 className="text-4xl font-semibold text-orange-500 dark:text-orange-400">COUPON : {data ? total : 0}</h1>

                <CreateCouponModal />

            </div>



            <div className="border border-muted rounded-md">
                <Table className="bg-gray-50 dark:bg-gray-900">
                    <TableHeader className="bg-blue-200 dark:bg-blue-900">
                        <TableRow>
                            <TableHead className="uppercase font-bold border-r-2">No.</TableHead>
                            <TableHead className="uppercase font-bold">Code</TableHead>
                            <TableHead className="uppercase font-bold">Discount Percentage</TableHead>
                            <TableHead className="uppercase font-bold">Expiry Date</TableHead>
                            <TableHead className="uppercase font-bold">Created At</TableHead>
                            <TableHead className="uppercase font-bold border-l-2 text-center">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentData?.map((coupon: { _id: string, code: string, discountPercentage: string, expiryDate: any, createdAt: string, }, index: number) => (
                            <TableRow key={coupon._id} onClick={() => setActiveRow(coupon._id)}
                                onMouseEnter={() => setHoveredRow(coupon._id)}
                                onMouseLeave={() => { setActiveRow(null); setHoveredRow(null) }}
                                className={`cursor-pointer ${(activeRow === coupon._id) ? "bg-blue-500 dark:bg-gray-600" : "hover:bg-blue-100 hover:text-black dark:hover:bg-gray-800 dark:hover:text-white"} ${new Date() <= new Date(coupon?.expiryDate) ? 'bg-red-500/20 hover:bg-red-500/50' : ''}`} >
                                <TableCell className="font-medium border-r-2">{(currentPage - 1) * couponsPerPage + index + 1}</TableCell>
                                <TableCell className="font-medium">
                                    {coupon?.code}
                                </TableCell>
                                <TableCell className="font-medium">
                                    {coupon?.discountPercentage}%
                                </TableCell>
                                <TableCell className="font-medium">
                                    {
                                        (new Date() <= new Date(coupon?.expiryDate)) ?
                                            'EXPIRED' :
                                            <>{new Date(coupon?.expiryDate).toDateString()}</>
                                    }
                                </TableCell>
                                <TableCell className="font-medium text-center">
                                    {new Date(coupon.createdAt).toLocaleString(undefined, { year: "numeric", month: "short", day: "numeric", })}
                                </TableCell>
                                <TableCell className="flex justify-between gap-2 border-l-2">

                                    {/* <Button variant={"secondary"} size="sm" className="text-green-600 hover:bg-green-600 hover:text-white">
                            <couponRoundPen />
                        </Button> */}


                                    <CouponModal id={coupon._id} code={coupon.code} discountPercentage={Number(coupon.discountPercentage)} expiryDate={coupon.expiryDate} activeRow={activeRow} hoveredRow={hoveredRow} />

                                    <BlockOrDeleteConfirmation onConfirm={() => handleDeleteCoupon(coupon._id)} actionType={"delete"} customTitle={coupon.code}>

                                        <Button variant={"outline"} size="sm" className={`${activeRow === coupon._id || hoveredRow === coupon._id ? "bg-red-400 text-white" : "text-red-400"} hover:bg-red-500 hover:text-white`}>
                                            <Trash2 />
                                        </Button>

                                    </BlockOrDeleteConfirmation>

                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>



            {total > 5 && totalPage > 1 && (
                <div className="flex justify-center mt-10">
                    <GetPagination
                        totalItems={total}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        itemsPerPage={couponsPerPage}
                    />
                </div>
            )}

        </div>
    );
}