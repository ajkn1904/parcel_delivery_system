/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SkeletonCard } from "@/utils/SkeletonCard";
import GetPagination from "@/utils/GetPagination";
import { useDeleteParcelMutation, useGetAllParcelsQuery } from "@/redux/features/parcels/parcel.api";
import { toast } from "sonner";
import BlockOrDeleteConfirmation from "@/components/BlockOrCancelOrDeleteConfirmation";
import { Trash2 } from "lucide-react";
import { ParcelModal } from "@/utils/ParcelModal";
import ParcelSearchFilter from "@/utils/ParcelSearchFilter";
import { useNavigate, useSearchParams } from "react-router";

export default function ManageParcel() {
    const [currentPage, setCurrentPage] = useState(1);
    const [activeRow, setActiveRow] = useState<string | null>(null);
    const [hoveredRow, setHoveredRow] = useState<string | null>(null);

    const parcelsPerPage = 5;
    const navigate = useNavigate()

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
    //const [updateParcel] = useUpdateParcelByAdminMutation();
    const [deleteParcel] = useDeleteParcelMutation();

    // const handleEditParcelStatus = async (id: string, parcel: any) => {
    //     const toastId = toast.loading("Status Updating...");
    //     try {
    //         const payload = { ...parcel, isBlocked: !parcel.isBlocked };
    //         delete payload._id;

    //         const res = await updateParcel({ id, ...payload }).unwrap();
    //         if (res.success) {
    //             toast.success("Updated!", { id: toastId });
    //         }
    //     } catch (error) {
    //         console.log(error);
    //         toast.error("Something went wrong!", { id: toastId });
    //     }
    // };

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
            <div className="flex justify-between lg:items-center my-8">
                <h1 className="text-3xl lg:text-4xl font-semibold text-orange-500 dark:text-orange-400">PARCEL: {total}</h1>

                <ParcelSearchFilter />
            </div>

            <div className="border border-muted rounded-4xl">
                {parcelData < 1 ?
                    <p className="font-bold text-xl text-center mx-auto">No Data Found</p>
                    :
                    <Table>
                        <TableHeader className="bg-blue-200 dark:bg-blue-900">
                            <TableRow >
                                <TableHead className="border-r-2 uppercase font-bold">No.</TableHead>
                                <TableHead className="uppercase font-bold">Tracking ID</TableHead>
                                <TableHead className="uppercase font-bold">Type</TableHead>
                                <TableHead className="uppercase font-bold">Sender</TableHead>
                                <TableHead className="uppercase font-bold">Receiver</TableHead>
                                <TableHead className="uppercase font-bold">Pickup Address</TableHead>
                                <TableHead className="uppercase font-bold">Delivery Address</TableHead>
                                <TableHead className="uppercase font-bold">Delivery Method</TableHead>
                                <TableHead className="uppercase font-bold">Weight (kg)</TableHead>
                                <TableHead className="uppercase font-bold">Delivery Fee</TableHead>
                                <TableHead className="uppercase font-bold">Discount</TableHead>
                                <TableHead className="uppercase font-bold">After Discount</TableHead>
                                <TableHead className="uppercase font-bold">Payment Method</TableHead>
                                <TableHead className="uppercase font-bold">Status</TableHead>
                                <TableHead className="uppercase font-bold">Estimated D.Date</TableHead>
                                <TableHead className="uppercase font-bold">Created At</TableHead>
                                <TableHead className="border-l-2 text-center uppercase font-bold">Action</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody className="bg-gray-50 dark:bg-gray-900">
                            {parcelData.map((parcel: any, index: number) => (
                                <TableRow
                                    key={parcel._id}
                                    onClick={() => setActiveRow(parcel._id)}
                                    onMouseEnter={() => setHoveredRow(parcel._id)}
                                    onMouseLeave={() => { setActiveRow(null); setHoveredRow(null) }}
                                    className={`cursor-pointer ${(activeRow === parcel._id) ? "bg-blue-500 dark:bg-gray-600" : "hover:bg-blue-100 hover:text-black dark:hover:bg-gray-800 dark:hover:text-white"}`}
                                >
                                    <TableCell className="font-medium border-r-2">{(currentPage - 1) * parcelsPerPage + index + 1}</TableCell>
                                    <TableCell className="font-medium">{parcel.trackingId}</TableCell>
                                    <TableCell>{parcel.parcelType}</TableCell>
                                    <TableCell>{parcel.sender?.email ?? "Unknown"}</TableCell>
                                    <TableCell>{parcel.receiver?.email ?? "Unknown"}</TableCell>
                                    <TableCell>{parcel.pickupAddress}</TableCell>
                                    <TableCell>{parcel.deliveryAddress}</TableCell>
                                    <TableCell>{parcel.deliveryMethod}</TableCell>
                                    <TableCell>{parcel.weight}</TableCell>
                                    <TableCell>{parcel.deliveryFee} tk</TableCell>
                                    <TableCell>{parcel.discountAmount}</TableCell>
                                    <TableCell>{parcel.afterDiscountDeliveryFee ? parcel.afterDiscountDeliveryFee + 'tk' : ''}</TableCell>
                                    <TableCell>{parcel.paymentMethod}</TableCell>
                                    <TableCell className="font-medium">{parcel.currentStatus}</TableCell>
                                    <TableCell>{new Date(parcel.estimatedDeliveryDate).toDateString()}</TableCell>
                                    <TableCell>{new Date(parcel.createdAt).toDateString()}</TableCell>
                                    <TableCell className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className={`${activeRow === parcel._id || hoveredRow === parcel._id ? "bg-orange-400 text-white" : "text-orange-400"} hover:bg-orange-600 dark:hover:bg-orange-500 hover:text-white`}
                                            onClick={() => navigate(`/tracking/${parcel._id}`)}
                                        >
                                            TRACK
                                        </Button>

                                        <ParcelModal parcelData={parcel} activeRow={activeRow} hoveredRow={hoveredRow} />

                                        <BlockOrDeleteConfirmation
                                            onConfirm={() => handleDeleteParcel(parcel._id)}
                                            actionType={parcel.isDeleted ? "restore" : "delete"}
                                            customTitle={parcel.trackingId}
                                        >
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className={`${activeRow === parcel._id || hoveredRow === parcel._id ? "bg-red-400 text-white" : "text-red-400"} hover:bg-red-500 hover:text-white`} >
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
