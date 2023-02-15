import * as React from "react";
import Skeleton from "@mui/material/Skeleton";

export default function Placeholder() {
  return (
    <div className="flex items-center bg-zinc-50 gap-4 border p-4">
      {/* <Skeleton variant="text" /> */}
      <Skeleton variant="circular" width={200} height={200} />
      <span className=" w-7/12">
        <Skeleton variant="text" className="text-2xl w-2/5" />
        <Skeleton variant="text" className="text-2xl w-3/4" />
        <Skeleton variant="rounded" className="mt-4" width={153} height={46} />
      </span>
      <span className="flex-1">
        <Skeleton variant="text" className="text-2xl w-24" />
        <Skeleton variant="text" className="text-2xl w-24" />
        <Skeleton variant="text" className="text-2xl w-24" />
      </span>
    </div>
  );
}
