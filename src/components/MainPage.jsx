import { useEffect } from "react";
import Agri from "../assets/agri1.png";
import { setGlobalState, useGlobalState } from "../store";
const MainPage = () => {
  useEffect(() => {
    document.title = "Home";
  }, []);
  return (
    <div>
    <div className="text-center bg-grey text-gray-800 py-24 px-6">
      {/* <div className="h-screen flex justify-center items-center"> */}
        {/* <div className="flex flex-cols-2 items-center w-full p-2 gap-10"> */}
          {/* <div className="p-2 rounded-[3rem]">
            <img className="w-[800px] h-[400px]" src={Agri} alt="image"></img>
          </div>
          <div className="grid  w-[500px]">
            <div className="font-bold text-4xl pb-8">About Us</div>
            <div>
              <p className="sm:text-left text-xl">
                Agro Blockchain acts as a bridge between farmers and consumers.
                It enables a peer to peer connection between them, which avoids
                the intermediate and helps the farmers to earn better than the
                current agricultural system. By the way consumers get the fresh
                products directly at preferable cost.{" "}
              </p>
            </div>
            </div> */}
            <div className="grid  w-[500px]">
          {/* </div> */}
        {/* </div> */}
      </div>
      <h1
        className="text-5xl md:text-6xl xl:text-7xl font-bold
      tracking-tight mb-12"
      >
        <span className="capitalize">Welcome to</span>
        <br />
        <span className="uppercase text-green-600">Agricultural Marketing</span>
      </h1>
      <br />
      <div
        style={{
          border: "3px solid grey",
          boxShadow: "5px 10px 10px 5px grey",
          marginLeft: "4%",
          marginRight: "4%",
          padding: "70px",
        }}
      >
        <p
          style={{
            fontSize: "188.6%",
            fontFamily: "sans-serif",
            textAlign: "justify",
            color: "ThreeDDarkShadow",
          }}
        >
          Agro Blockchain acts as a bridge between farmers and consumers. It
          enables a peer to peer connection between them, which avoids the
          intermediate and helps the farmers to earn better than the current
          agricultural system. By the way consumers get the fresh products
          directly at preferable cost.
        </p>
      </div>
      <br />
      <br />
      <br />
      <br />
      <h1 style={{ fontWeight: "bold", fontSize: "20px" }}>
        Contact Us: agroblockhainhelpline@gmail.com
      </h1>
      </div>
      </div>
  );
};

export default MainPage;
