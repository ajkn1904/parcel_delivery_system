/* eslint-disable @typescript-eslint/no-explicit-any */
import BlockOrDeleteConfirmation from "@/components/BlockOrDeleteConfirmation";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetAllUserQuery, useUpdateUserMutation } from "@/redux/features/user/user.api";
import { SkeletonCard } from "@/utils/SkeletonCard";
import { ArchiveRestoreIcon, Ban, Check, Trash2, UserCheckIcon} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ManageUser() {
    const {data, isLoading} = useGetAllUserQuery(undefined)
    const total = data?.length;
    const [updateUser] = useUpdateUserMutation()
     const [currentPage, setCurrentPage] = useState(1);

  // 👇 page size
  const usersPerPage = 5;
  const totalPage = Math.ceil(total / usersPerPage);

  // 👇 Slice data for current page
  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const currentUsers = data?.slice(startIndex, endIndex);

    const handleBlockUser = async (id: string, data: any) => {
        const toastId = toast.loading(data?.isBlocked ? "Unblocking User..." : "Blocking User...");
        try {
            const payload = {
                ...data,
                isBlocked: !data?.isBlocked
            };

            delete payload._id;
            delete payload.password; 

            const res = await updateUser({ id, ...payload }).unwrap();

            if (res.success) {
                toast.success(data?.isBlocked ? "Unblocked!" : "Blocked!", { id: toastId });
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong!", { id: toastId });
        }
    };



    const handleDeleteUser = async (id: string, data: any) => {
    const toastId = toast.loading(data?.isDeleted ? "Unblocking User..." : "Blocking User...");
        try {
            const payload = {
                ...data,
                isDeleted: !data?.isDeleted
            };
            delete payload._id;
            delete payload.password; 

            const res = await updateUser({ id, ...payload }).unwrap();

            if (res.success) {
                toast.success(data?.isDeleted ? "Restored!" : "Deleted!", { id: toastId });
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong!", { id: toastId });
        }
    };






    if(isLoading){
        return <SkeletonCard/>
    }

    return (
        <div className="w-full max-w-7xl mx-auto px-5">
        <div className="flex justify-between my-8">
            <h1 className="text-xl font-semibold">User : {data ? total : 0}</h1>
            
        </div>
        <div className="border border-muted rounded-md">
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead className="">Name</TableHead>
                <TableHead className="">Email</TableHead>
                <TableHead className="">Role</TableHead>
                <TableHead className="">Is-blocked</TableHead>
                <TableHead className="">Is-deleted</TableHead>
                <TableHead className=" border-l-2 text-center">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {currentUsers?.map((user: { _id:string, name: string, email: string, role: string, isBlocked: boolean, isDeleted: boolean,  }) => (
                <TableRow key={user._id}>
                    <TableCell className="font-medium">
                    {user?.name}
                    </TableCell>
                    <TableCell className="font-medium">
                    {user?.email}
                    </TableCell>
                    <TableCell className="font-medium">
                    {user?.role}
                    </TableCell>
                    <TableCell className="font-medium text-center">
                    {user?.isBlocked ? <Check className="text-red-500 mx-auto"/> : "_"}
                    </TableCell>
                    <TableCell className="font-medium text-center">
                    {user?.isDeleted ? <Check className="text-red-500 mx-auto"/> : '_'}
                    </TableCell>
                    <TableCell className="flex justify-between gap-2 border-l-2">

                    {/* <Button variant={"secondary"} size="sm" className="text-green-600 hover:bg-green-600 hover:text-white">
                        <UserRoundPen />
                    </Button> */}

                    <BlockOrDeleteConfirmation onConfirm={() => handleBlockUser(user._id, user)} actionType={user.isBlocked ? "unblock" : "block"} customTitle={user.email}>
                        {user.isBlocked ?
                        <Button variant={"outline"} size="sm" className="text-green-500 hover:bg-green-500 hover:text-white">
                        <UserCheckIcon/>
                        </Button>
                        :
                        <Button variant={"outline"} size="sm" className="text-red-500 hover:bg-red-500 hover:text-white">
                        <Ban/>
                        </Button>}
                    </BlockOrDeleteConfirmation>
                    <BlockOrDeleteConfirmation onConfirm={() => handleDeleteUser(user._id, user)} actionType={user.isDeleted ? "restore" : "delete"} customTitle={user.email}>
                        {user.isDeleted ?
                        <Button variant={"outline"} size="sm" className="text-green-500 hover:bg-green-500 hover:text-white">
                        <ArchiveRestoreIcon/>
                        </Button>
                        :
                        <Button variant={"outline"} size="sm" className="text-red-500 hover:bg-red-500 hover:text-white">
                        <Trash2 />
                        </Button>
                        }
                    </BlockOrDeleteConfirmation>
                    
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </div>



        {totalPage > 1 && (
            <div className="flex justify-center mt-10">
                <div>
                <Pagination>
                    <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                        onClick={() => setCurrentPage((prev) => prev - 1)}
                        className={
                            currentPage === 1
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer"
                        }
                        />
                    </PaginationItem>
                    {Array.from({ length: totalPage }, (_, index) => index + 1).map(
                        (page) => (
                        <PaginationItem
                            key={page}
                            onClick={() => setCurrentPage(page)}
                        >
                            <PaginationLink isActive={currentPage === page}>
                            {page}
                            </PaginationLink>
                        </PaginationItem>
                        )
                    )}
                    <PaginationItem>
                        <PaginationNext
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                        className={
                            currentPage === totalPage
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer"
                        }
                        />
                    </PaginationItem>
                    </PaginationContent>
                </Pagination>
                </div>
            </div>
        )}

        </div>
    );
}