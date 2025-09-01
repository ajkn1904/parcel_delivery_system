/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SkeletonCard } from "@/utils/SkeletonCard";
import GetPagination from "@/utils/GetPagination";
import { useGetAllParcelsQuery, useUpdateParcelMutation } from "@/redux/features/parcels/parcel.api";
import { toast } from "sonner";
import ParcelSearchFilter from "@/utils/ParcelSearchFilter";
import { Link, useNavigate, useSearchParams } from "react-router";
import ParcelDetailsModal from "@/utils/ParcelDetailsModal";

export default function Parcel() {
  const [activeRow, setActiveRow] = useState<string | null>(null);
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const parcelsPerPage = 10;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const currentStatus = searchParams.get("currentStatus") || undefined;
  const parcelType = searchParams.get("parcelType") || undefined;
  const sort = searchParams.get("sort") || undefined;
  const search = searchParams.get("search") || undefined;

  const { data, isLoading } = useGetAllParcelsQuery({
    currentStatus,
    parcelType,
    sort,
    search,
    page: currentPage,
    limit: parcelsPerPage,
  });

  const parcelData = data?.data ?? [];
  const total = data?.meta?.total ?? 0;
  const totalPage = Math.ceil(total / parcelsPerPage);
  const [updateParcel] = useUpdateParcelMutation();

  // Modal state
  const [selectedParcelId, setSelectedParcelId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleParcelStatus = async (parcel: any) => {
    const toastId = toast.loading("Updating parcel status...");
    try {
      await updateParcel({ id: parcel._id, parcel }).unwrap();
      toast.success("Parcel status updated!", { id: toastId });
    } catch (err) {
      console.error(err);
      toast.error("Failed to update parcel status", { id: toastId });
    }
  };

  const openModal = (parcelId: string) => {
    setSelectedParcelId(parcelId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedParcelId(null);
    setIsModalOpen(false);
  };

  if (isLoading) return <SkeletonCard />;

  return (
    <div className="w-full max-w-6xl mx-auto px-5">
      <div className="flex justify-between lg:items-center my-8">
        <div>
          <h1 className="text-4xl font-bold text-orange-500 dark:text-orange-400 mb-16">
            PARCEL: {total}
          </h1>
          <Button className="my-8 text-white">
            <Link to={"/parcel/create"}>CREATE PARCEL</Link>
          </Button>
        </div>
        <ParcelSearchFilter />
      </div>

      <div className="border border-muted rounded-md">
        {parcelData.length < 1 ? (
          <p className="font-bold text-xl text-center mx-auto">No Data Found</p>
        ) : (
          <Table>
            <TableHeader className="bg-blue-200 dark:bg-blue-900">
              <TableRow>
                <TableHead className="border-r-2">No.</TableHead>
                <TableHead>Tracking ID</TableHead>
                <TableHead>Sender</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>After Discount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Updated</TableHead>
                <TableHead className="border-l-2 text-center">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {parcelData.map((parcel: any, index: number) => (
                <TableRow key={parcel._id} onClick={() => setActiveRow(parcel._id)}
                  onMouseEnter={() => setHoveredRow(parcel._id)}
                  onMouseLeave={() => { setActiveRow(null); setHoveredRow(null) }}
                  className={`cursor-pointer ${(activeRow === parcel._id) ? "bg-blue-500 dark:bg-gray-600" : "hover:bg-blue-100 hover:text-black dark:hover:bg-gray-800 dark:hover:text-white"}`}>
                  <TableCell className="font-medium border-r-2">
                    {(currentPage - 1) * parcelsPerPage + index + 1}
                  </TableCell>
                  <TableCell className="font-medium">{parcel.trackingId}</TableCell>
                  <TableCell>{parcel.sender?.email ?? "Unknown"}</TableCell>
                  <TableCell>{parcel.parcelType}</TableCell>
                  <TableCell>
                    {parcel.afterDiscountDeliveryFee
                      ? Math.round(parcel.afterDiscountDeliveryFee) + " tk"
                      : Math.round(parcel.deliveryFee) + " tk"}
                  </TableCell>
                  <TableCell className="font-medium">{parcel.currentStatus}</TableCell>
                  <TableCell className="font-medium">
                    {parcel?.trackingEvents?.[parcel.trackingEvents.length - 1].location ?? "N/A"}
                  </TableCell>
                  <TableCell>{new Date(parcel.updatedAt).toDateString()}</TableCell>
                  <TableCell className="flex justify-between gap-2 border-l-2">
                    {/* TRACK BUTTON */}
                    <Button
                      variant={"outline"}
                      size="sm"
                      className={`${activeRow === parcel._id || hoveredRow === parcel._id ? "bg-orange-400 text-white" : "text-orange-400"} hover:bg-orange-500 hover:text-white`}
                      onClick={() => navigate(`/tracking/${parcel._id}`, { state: { trackingId: parcel.trackingId } })}
                    >
                      TRACK
                    </Button>


                    <Button size="sm" variant={"outline"} className={`${activeRow === parcel._id || hoveredRow === parcel._id ? "bg-blue-500 text-white" : "text-blue-500"} hover:bg-blue-600 hover:text-white`} onClick={() => openModal(parcel._id)}>
                      VIEW
                    </Button>

                    {/* CONDITIONAL STATUS BUTTONS */}
                    {
                      parcel.currentStatus === "Requested" || parcel.currentStatus === "Approved" ? (
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-[76px] text-muted-foreground"
                          disabled
                        >
                          PENDING
                        </Button>
                      ) : parcel.currentStatus === "Dispatched" ? (
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-[76px] text-violet-600 dark:text-violet-500"
                          disabled
                        >
                          DISPATCHED
                        </Button>
                      ) : parcel.currentStatus === "In Transit" ? (
                        <Button
                          onClick={() => handleParcelStatus(parcel)}
                          size="sm"
                          className={`${activeRow === parcel._id || hoveredRow === parcel._id ? "bg-green-600 dark:bg-green-600 text-white" : "bg-green-500 dark:bg-green-700 text-green-700"} hover:bg-green-800 dark:hover:bg-green-500 text-white`}
                        >
                          CONFIRM
                        </Button>

                      ) : parcel.currentStatus === "Canceled" ? (
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-[76px] text-red-600 dark:text-red-500"
                          disabled
                        >
                          CANCELED
                        </Button>
                      ) : parcel.currentStatus === "Delivered" ? (
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-[76px] text-green-500 dark:text-green-400"
                          disabled
                        >
                          DELIVERED
                        </Button>
                      ) : null
                    }


                  </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
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

      {/* Modal */}
      {isModalOpen && selectedParcelId && (
        <ParcelDetailsModal parcelId={selectedParcelId} onClose={closeModal} />
      )}
    </div>
  );
}
