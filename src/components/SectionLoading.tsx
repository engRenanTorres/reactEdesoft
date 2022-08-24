import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

const SectionLoading = () => {
  return (
    <div className="max-w-7xl mx-auto my-0 px-8 py-4 flex justify-center text-shade-green">
      <CircularProgress color="inherit" />
    </div>
  );
};

export default SectionLoading;