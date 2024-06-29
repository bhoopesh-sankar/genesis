import { TbBusinessplan } from "react-icons/tb";
import { Link } from "react-router-dom";
import { connectWallet } from "../services/blockchain";
import { truncate, useGlobalState } from "../store";
import { AiOutlineCaretDown } from "react-icons/ai";
import { AiOutlineCaretUp } from "react-icons/ai";
import { useState } from "react";

const Header = () => {
  const [connectedAccount] = useGlobalState("connectedAccount");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenReg, setOpenReg] = useState(false);
  const help = async (e) => {
    window.location.replace("/help");
  };

  const Admin = async (e) => {
    window.location.replace("/Adminlogin");
  };
  const Farmerlogin = async (e) => {
    window.location.replace("/farmerLogin");
  };
  const Farmerregister = async (e) => {
    window.location.replace("/farmerRegister");
  };
  const Consumerregister = async (e) => {
    window.location.replace("/consumerRegister");
  };
  const Consumerlogin = async (e) => {
    window.location.replace("/consumerLogin");
  };
  const Deliverymanregister = async (e) => {
    window.location.replace("/deliverymanRegister");
  };
  const Deliverymanlogin = async (e) => {
    window.location.replace("/deliverymanLogin");
  };
  return (
    <header
      className="flex justify-between items-center
        p-5 bg-white shadow-lg fixed top-0 left-0 right-0"
    >
      <Link
        to="/"
        className="flex justify-start items-center
      text-xl text-black space-x-1"
      >
        <span>
          <h2 style={{ fontWeight: "bold" }}>Agro-Blockchain</h2>
        </span>
      </Link>

      <div className="flex space-x-2 justify-center gap-8">
        <div>
          <button
            type="button"
            className="flex flex-col-2 gap-4 inline-block px-6 py-2.5 bg-green-600
            text-white font-medium text-xs leading-tight uppercase
            rounded-full shadow-md hover:bg-green-700"
            onClick={() => setOpenReg((prev) => !prev)}
          >
            Register{" "}
            {!isOpenReg ? (
              <AiOutlineCaretDown size={20} />
            ) : (
              <AiOutlineCaretUp size={20} />
            )}
          </button>
          {isOpenReg && (
              <div className="flex flex-col absolute top-20 bg-green-400 items-start p-2 rounded-lg">
                <button type="button" onClick={Farmerregister}>Farmer Register</button>
                <button type="button" onClick={Consumerregister}>Consumer Register</button>
                <button type="button" onClick={Deliverymanregister}>Deliveryman Register</button>
              </div>
            )}
        </div>
        <div>
          <button
            type="button"
            className="flex flex-col-2 gap-4 inline-block px-6 py-2.5 bg-green-600
            text-white font-medium text-xs leading-tight uppercase
            rounded-full shadow-md hover:bg-green-700"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            Login
            {!isOpen ? (
              <AiOutlineCaretDown size={20} />
            ) : (
              <AiOutlineCaretUp size={20} />
            )}
          </button>
          {isOpen && (
            <div className="flex flex-col absolute bg-green-400 top-20 p-2 items-start rounded-lg">
              <button
                type="button"
                // className="inline-block px-6 py-4 bg-green-600
                //   text-white font-large text-xs leading-tight uppercase
                //   rounded-full shadow-md hover:bg-green-700"
                onClick={Farmerlogin}
              >
                Farmer Log In
              </button>
              <button type="button" onClick={Consumerlogin}>
                Consumer Log In
              </button>
              <button type="button" onClick={Deliverymanlogin}>
                Deliverymanlogin Log In
              </button>
            </div>
          )}
        </div>

        {/* <button
          type="button"
          className="inline-block px-6 py-2.5 bg-green-600
            text-white font-medium text-xs leading-tight uppercase
            rounded-full shadow-md hover:bg-green-700"
          onClick={Admin}
        >
          Admin
        </button> */}
        <button
          type="button"
          className="inline-block px-6 py-2.5 bg-green-600
            text-white font-medium text-xs leading-tight uppercase
            rounded-full shadow-md hover:bg-green-700"
          onClick={help}
        >
          Help
        </button>
        {connectedAccount ? (
          <button
            type="button"
            className="inline-block px-6 py-2.5 bg-green-600
            text-white font-medium text-xs leading-tight uppercase
            rounded-full shadow-md hover:bg-green-700"
          >
            {truncate(connectedAccount, 4, 4, 11)}
          </button>
        ) : (
          <button
            type="button"
            className="inline-block px-6 py-2.5 bg-green-600
            text-white font-medium text-xs leading-tight uppercase
            rounded-full shadow-md hover:bg-green-700"
            onClick={connectWallet}
          >
            Connect Wallet
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
