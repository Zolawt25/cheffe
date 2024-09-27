import ReactLoading from "react-loading";

const BtnLoading = () => {
  return (
    <div className=" w-full flex items-end justify-center">
      <ReactLoading type="spin" color="#fff" height={"80%"} width={"80%"} />
    </div>
  );
};

export default BtnLoading;
