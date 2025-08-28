/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SkeletonCard } from "@/utils/SkeletonCard";
import GetPagination from "@/utils/getPagination";
import { useDeleteParcelMutation, useGetAllParcelsQuery, useUpdateParcelByAdminMutation } from "@/redux/features/parcels/parcel.api";
import { toast } from "sonner";
import BlockOrDeleteConfirmation from "@/components/BlockOrDeleteConfirmation";
import { Trash2 } from "lucide-react";
import { ParcelModal } from "@/utils/ParcelModal";
import ParcelSearchFilter from "@/utils/ParcelSearchFilter";
import { useSearchParams } from "react-router";

export default function ManageParcel() {
    const [currentPage, setCurrentPage] = useState(1);
    const parcelsPerPage = 10;


    const [searchParams] = useSearchParams();

    const currentStatus = searchParams.get("currentStatus") || undefined;
    const parcelType = searchParams.get("parcelType") || undefined;
    const sort = searchParams.get("sort") || undefined;
    const search = searchParams.get("search") || undefined;

    // Pass pagination params to backend query
    const { data, isLoading } = useGetAllParcelsQuery({
        currentStatus,
        parcelType,
        sort,
        search,
        page: currentPage,
        limit: parcelsPerPage,
    });

    const parcelData = data?.data ?? [];
    //console.log(parcelData);
    const total = data?.meta?.total ?? 0;
    const totalPage = Math.ceil(total / parcelsPerPage);
    const [updateParcel] = useUpdateParcelByAdminMutation();
    const [deleteParcel] = useDeleteParcelMutation();

    const handleEditParcelStatus = async (id: string, parcel: any) => {
        const toastId = toast.loading("Status Updating...");
        try {
            const payload = { ...parcel, isBlocked: !parcel.isBlocked };
            delete payload._id;

            const res = await updateParcel({ id, ...payload }).unwrap();
            if (res.success) {
                toast.success("Updated!", { id: toastId });
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong!", { id: toastId });
        }
    };

    const handleDeleteParcel = async (id: string) => {
        const toastId = toast.loading("Deleting parcel...");
        try {
            const res = await deleteParcel({ id }).unwrap();
            if (res.success) {
                toast.success("Deleted!", { id: toastId });
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong!", { id: toastId });
        }
    };

    if (isLoading) return <SkeletonCard />;


    return (
        <div className="w-full max-w-6xl mx-auto px-5">
            <div className="flex justify-between my-8">
                <h1 className="text-xl font-semibold">Total Parcel: {total}</h1>

                <ParcelSearchFilter/>
            </div>

            <div className="border border-muted rounded-md">
                {parcelData < 1 ? 
                    <p className="font-bold text-xl text-center mx-auto">No Data Found</p>
                    :
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="border-r-2">No.</TableHead>
                                <TableHead>Tracking ID</TableHead>
                                <TableHead>Parcel Type</TableHead>
                                <TableHead>Sender</TableHead>
                                <TableHead>Receiver</TableHead>
                                <TableHead>Pickup Address</TableHead>
                                <TableHead>Delivery Address</TableHead>
                                <TableHead>Delivery Method</TableHead>
                                <TableHead>Weight (kg)</TableHead>
                                <TableHead>Delivery Fee</TableHead>
                                <TableHead>After Discount</TableHead>
                                <TableHead>Discount</TableHead>
                                <TableHead>Payment Method</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Created At</TableHead>
                                <TableHead className="border-l-2 text-center">Action</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {parcelData.map((parcel: any, index: number) => (
                                <TableRow key={parcel._id}>
                                    <TableCell className="font-medium border-r-2">{(currentPage - 1) * parcelsPerPage + index + 1}</TableCell>
                                    <TableCell className="font-medium">{parcel.trackingId}</TableCell>
                                    <TableCell>{parcel.parcelType}</TableCell>
                                    <TableCell>{parcel.sender?.email ?? "Unknown"}</TableCell>
                                    <TableCell>{parcel.receiver?.email ?? "Unknown"}</TableCell>
                                    <TableCell>{parcel.pickupAddress}</TableCell>
                                    <TableCell>{parcel.deliveryAddress}</TableCell>
                                    <TableCell>{parcel.deliveryMethod}</TableCell>
                                    <TableCell>{parcel.weight}</TableCell>
                                    <TableCell>{parcel.deliveryFee}</TableCell>
                                    <TableCell>{parcel.afterDiscountDeliveryFee}</TableCell>
                                    <TableCell>{parcel.discountAmount}</TableCell>
                                    <TableCell>{parcel.paymentMethod}</TableCell>
                                    <TableCell className="font-medium">{parcel.currentStatus}</TableCell>
                                    <TableCell>{new Date(parcel.createdAt).toLocaleString()}</TableCell>
                                    <TableCell className="flex justify-between gap-2 border-l-2">
                                        <ParcelModal
                                            tId={parcel.trackingId}
                                            sender={parcel.sender?.email ?? "Unknown"}
                                            receiver={parcel.receiver?.email ?? "Unknown"}
                                            parcelData={parcel}
                                        />


                                        <BlockOrDeleteConfirmation onConfirm={() => handleDeleteParcel(parcel._id)} actionType={parcel.isDeleted ? "restore" : "delete"} customTitle={parcel.trackingId}
                                        >
                                            <Button variant={"outline"} size="sm" className="text-red-500 hover:bg-red-500 hover:text-white">
                                                <Trash2 />
                                            </Button>
                                        </BlockOrDeleteConfirmation>

                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                }
            </div>

            {total > parcelsPerPage && totalPage > 1 && (
                <div className="flex justify-center mt-10">
                    <GetPagination
                        totalItems={total}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        itemsPerPage={parcelsPerPage}
                    />
                </div>
            )}
        </div>
    );
}
