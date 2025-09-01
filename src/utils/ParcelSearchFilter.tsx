import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { useSearchParams } from "react-router";

export default function ParcelSearchFilter() {
  const [searchParams, setSearchParams] = useSearchParams();



  const selectedStatus = searchParams.get("currentStatus") || "";
  const selectedType = searchParams.get("parcelType") || "";
  const selectedSort = searchParams.get("sort") || "";
  const searchQuery = searchParams.get("search") || "TRK-";



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

  const handleSearchChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    setSearchParams(params);
  };


  const handleClearFilter = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("currentStatus");
    params.delete("parcelType");
    params.delete("sort");
    params.delete("search");
    setSearchParams(params);
  };

  return (
    <div className="border border-muted rounded-md p-2 bg-gray-50 dark:bg-gray-900">
      <div className="flex justify-between items-center mb-1">
        <h1 className="font-bold uppercase">Search | Filter</h1>
        <Button size="sm" variant="default" className="text-white border rounded-full font-bold uppercase" onClick={handleClearFilter}>Clear</Button>
      </div>
      <div className="flex flex-col lg:flex-row justify-between gap-2 align-middle">

        <div className="relative my-2 lg:my-1">
          <Label className="font-semibold">Enter tracking ID</Label>
          <Search className="absolute left-2 top-2/3 lg:top-[47%] -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            id="trackingId"
            type="search"
            // placeholder="Enter tracking ID"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-8 w-[230px] mt-1.5 bg-white dark:bg-black dark:hover:bg-black"
          />
        </div>


        <div className="flex gap-1 align-middle justify-between">
          <Label className="font-semibold">Status</Label>
          <Select
            onValueChange={handleStatusChange}
            value={selectedStatus}
          >
            <SelectTrigger className="w-[120px] my-1 lg:my-6.5 bg-white dark:bg-black dark:hover:bg-black">
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
          <Label className="font-semibold">Type</Label>
          <Select
            onValueChange={handleTypeChange}
            value={selectedType}
          >
            <SelectTrigger className="w-[120px] my-1 lg:my-6.5 bg-white dark:bg-black dark:hover:bg-black">
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
          <Label className="font-semibold">Sort</Label>
          <Select onValueChange={handleSortChange} value={selectedSort}>
            <SelectTrigger className="w-[120px] my-1 lg:my-6.5 bg-white dark:bg-black dark:hover:bg-black">
              <SelectValue placeholder="Select Sort" />
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
