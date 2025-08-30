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
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="">Code</TableHead>
                            <TableHead className="">Discount Percentage</TableHead>
                            <TableHead className="">Expiry Date</TableHead>
                            <TableHead className="">Created At</TableHead>
                            <TableHead className=" border-l-2 text-center">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentData?.map((coupon: { _id: string, code: string, discountPercentage: string, expiryDate: any, createdAt: string, }) => (
                            <TableRow key={coupon._id}>
                                <TableCell className="font-medium">
                                    {coupon?.code}
                                </TableCell>
                                <TableCell className="font-medium">
                                    {coupon?.discountPercentage}%
                                </TableCell>
                                <TableCell className="font-medium">
                                    {new Date(coupon?.expiryDate).toLocaleString()}
                                </TableCell>
                                <TableCell className="font-medium text-center">
                                    {new Date(coupon.createdAt).toLocaleString(undefined, { year: "numeric", month: "short", day: "numeric", })}
                                </TableCell>
                                <TableCell className="flex justify-between gap-2 border-l-2">

                                    {/* <Button variant={"secondary"} size="sm" className="text-green-600 hover:bg-green-600 hover:text-white">
                        <couponRoundPen />
                    </Button> */}


                                    <CouponModal id={coupon._id} code={coupon.code} discountPercentage={Number(coupon.discountPercentage)} expiryDate={coupon.expiryDate} />

                                    <BlockOrDeleteConfirmation onConfirm={() => handleDeleteCoupon(coupon._id)} actionType={"delete"} customTitle={coupon.code}>

                                        <Button variant={"outline"} size="sm" className="text-red-500 hover:bg-red-500 hover:text-white">
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