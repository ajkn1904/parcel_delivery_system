import { Button } from "@/components/ui/button";
import { useGetSingleParcelQuery } from "@/redux/features/parcels/parcel.api";
import { SkeletonCard } from "./SkeletonCard";

interface ParcelModalProps {
    parcelId: string;
    onClose: () => void;
}

export default function ParcelDetailsModal({ parcelId, onClose }: ParcelModalProps) {
    const { data, isLoading } = useGetSingleParcelQuery({ id: parcelId })

    //console.log(data);
    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-md w-96">
                <h2 className="text-xl text-orange-500 dark:text-orange-400 text-center font-semibold mb-4 uppercase">Parcel Details</h2>
                {isLoading ?
                    <SkeletonCard />
                    :
                    <div className="space-y-2 text-sm">
                        <p><strong>Tracking ID:</strong> {data?.trackingId}</p>
                        <p><strong>Sender:</strong> {data?.sender?.email}</p>
                        <p><strong>Receiver:</strong> {data?.receiver?.email || "N/A"}</p>
                        <p><strong>Type:</strong> {data?.parcelType}</p>
                        <p><strong>Weight:</strong> {data?.weight} kg</p>
                        <p><strong>Delivery Method:</strong> {data?.deliveryMethod}</p>
                        <p><strong>Pickup Address:</strong> {data?.pickupAddress}</p>
                        <p><strong>Delivery Address:</strong> {data?.deliveryAddress}</p>
                        <p><strong>Status:</strong> {data?.currentStatus}</p>
                        <p><strong>Estimated Delivery:</strong> {new Date(data?.estimatedDeliveryDate).toDateString()}</p>
                        <p><strong>Payment Method:</strong> {data?.paymentMethod}</p>
                        {
                            data?.discountAmount === "0 tk" ?
                                (<p><strong>Discount:</strong> 0 tk</p>)
                                :
                                (<p><strong>Discount:</strong> {data?.discountAmount}</p>)
                        }

                        {
                            data?.discountAmount === "0 tk" ? (<p><strong>To Pay:</strong> {Math.round(data?.deliveryFee)} tk</p>)
                                :
                                (<p><strong>To Pay:</strong> {Math.round(data?.afterDiscountDeliveryFee)} tk</p>)
                        }
                        <p><strong>Paid:</strong> {data?.isPaid ? "Yes" : "No"}</p>
                    </div>
                }
                <Button className="mt-4 uppercase text-white" onClick={onClose}>
                    Close
                </Button>
            </div>
        </div>
    );
}
