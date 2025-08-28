import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSearchParams } from "react-router";

export default function ParcelSearchFilter() {
  const [searchParams, setSearchParams] = useSearchParams();


  
  const selectedStatus = searchParams.get("currentStatus") || "";
  const selectedType = searchParams.get("parcelType") || "";
  const selectedSort = searchParams.get("sort") || "";



  const statusOptions = [
    { label: "Pending", value: "Requested" },
    { label: "In Transit", value: "In Transit" },
    { label: "Delivered", value: "Delivered" },
    { label: "Canceled", value: "Canceled" },
    { label: "Returned", value: "Returned" },
  ];
  const typeOptions = [
    { label: "Documents", value: "Documents" },
    { label: "Electronics", value: "Electronics" },
    { label: "Clothing", value: "Clothing" },
    { label: "Grocery", value: "Grocery" },
    { label: "Other", value: "Other" },
  ];
  const sortOptions = [
    { label: "Ascending", value: "createdAt" },
    { label: "Descending", value: "-createdAt" },
  ];



  const handleStatusChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("currentStatus", value);
    setSearchParams(params);
  };
  const handleTypeChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("parcelType", value);
    setSearchParams(params);
  };
  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", value);
    setSearchParams(params);
  };




  const handleClearFilter = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("currentStatus");
    params.delete("parcelType");
    params.delete("sort");
    setSearchParams(params);
  };

  return (
    <div className="border border-muted rounded-md p-2">
        <div className="flex justify-between items-center mb-1">
            <h1>Filters</h1>
            <Button size="sm" variant="ghost" className="border rounded-full font-bold" onClick={handleClearFilter}>Clear</Button>
        </div>
        <div className="flex flex-col justify-between gap-2">
            <div className="flex gap-1 align-middle items-center">
                <Label className="">Status</Label>
                <Select
                onValueChange={handleStatusChange}
                value={selectedStatus}
                >
                <SelectTrigger className="w-[120px] my-1">
                    <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    {statusOptions.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                        {item.label}
                        </SelectItem>
                    ))}
                    </SelectGroup>
                </SelectContent>
                </Select>
            </div>
            <div className="flex gap-1 justify-between">
                <Label className="">Type</Label>
                <Select
                onValueChange={handleTypeChange}
                value={selectedType}
                >
                <SelectTrigger className="w-[120px] mb-1">
                    <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                    <SelectLabel>Type</SelectLabel>
                    {typeOptions.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                        {item.label}
                        </SelectItem>
                    ))}
                    </SelectGroup>
                </SelectContent>
                </Select>
            </div>
            <div className="flex gap-1 justify-between">
                <Label>Sort</Label>
                <Select onValueChange={handleSortChange} value={selectedSort}>
                    <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Select Sort"/>
                    </SelectTrigger>
                    <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Sort</SelectLabel>
                        {sortOptions.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                            {item.label}
                        </SelectItem>
                        ))}
                    </SelectGroup>
                    </SelectContent>
                </Select>
                </div>

            

        </div>
    </div>
  );
}
