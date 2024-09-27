import React from "react";
import ReactLoading from "react-loading";

const Loading = () => {
  return (
    <div className=" w-full flex justify-center items-center h-[50vh]">
      <ReactLoading type="bubbles" color="#ffa216" height={"5%"} width={"5%"} />
    </div>
  );
};

export default Loading;
