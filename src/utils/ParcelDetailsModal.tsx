import { Button } from "@/components/ui/button";
import { useGetSingleParcelQuery } from "@/redux/features/parcels/parcel.api";

interface ParcelModalProps {
    parcelId: string;
    onClose: () => void;
}

export default function ParcelDetailsModal({ parcelId, onClose }: ParcelModalProps) {
    const { data } = useGetSingleParcelQuery({ id: parcelId })
    console.log(data);
    return (
        <div className="fixed inset-0 bg-accent bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-md w-96">
                <h2 className="text-xl font-semibold mb-4">Parcel Details</h2>
                <p>Parcel ID: {data?.trackingId}</p>
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
                    <p><strong>Estimated Delivery:</strong> {new Date(data?.estimatedDeliveryDate).toLocaleDateString()}</p>
                    <p><strong>Fee:</strong> {data?.deliveryFee} tk</p>
                    <p><strong>Paid:</strong> {data?.isPaid ? "Yes" : "No"}</p>
                </div>

                <Button className="mt-4" onClick={onClose}>
                    Close
                </Button>
            </div>
        </div>
    );
}
