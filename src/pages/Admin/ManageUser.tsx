/* eslint-disable @typescript-eslint/no-explicit-any */
import BlockOrDeleteConfirmation from "@/components/BlockOrDeleteConfirmation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetAllUserQuery, useUpdateUserMutation } from "@/redux/features/user/user.api";
import GetPagination from "@/utils/getPagination";
import { SkeletonCard } from "@/utils/SkeletonCard";
import { ArchiveRestoreIcon, Ban, Check, Trash2, UserCheckIcon} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ManageUser() {
    const {data, isLoading} = useGetAllUserQuery(undefined)
    const total = data?.length ?? 0;
    const [updateUser] = useUpdateUserMutation()

    const [selectedRole, setSelectedRole] = useState<string>("");

    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;
    
    const startIndex = (currentPage - 1) * usersPerPage;
    const endIndex = startIndex + usersPerPage;
    
    const filteredUsers = selectedRole && selectedRole !== "all" ? data?.filter((user: any) => user.role === selectedRole) : data;

    const totalFiltered = filteredUsers?.length ?? 0;
    const totalPage = Math.ceil(totalFiltered / usersPerPage);
    const currentUsers = filteredUsers?.slice(startIndex, endIndex);





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


            {/* ⬇️ Role filter */}
            <div className="w-48 flex justify-between align-middle gap-2">
                <Label>Role</Label>
                <Select onValueChange={(value) => setSelectedRole(value)} value={selectedRole || "all"}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Role" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                        <SelectLabel>Roles</SelectLabel>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="sender">Sender</SelectItem>
                        <SelectItem value="receiver">User</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
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



        {totalFiltered > 5 && totalPage > 1 && (
            <div className="flex justify-center mt-10">
                <GetPagination
                totalItems={total}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                itemsPerPage={usersPerPage}
                />
            </div>
        )}

        </div>
    );
}