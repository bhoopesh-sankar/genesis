import { useEffect } from 'react';
import { setGlobalState, useGlobalState } from '../store'
const Hero = () => {

  useEffect(() => {
    document.title = "Farmer Home";
  }, []);

  return (
    <div className="text-center bg-white text-gray-800 py-24 px-6">
      <h1
        className="text-5xl md:text-6xl xl:text-7xl font-bold
      tracking-tight mb-12"
      >
        <span className="capitalize">Welcome to</span>
        <br />
        <span className="uppercase text-green-600">Agricultural Marketing</span>
      </h1>
      <div className="flex justify-center items-center space-x-2">
        <button
          type="button"
          className="inline-block px-6 py-2.5 bg-green-600
        text-white font-medium text-xs leading-tight uppercase
        rounded-full shadow-md hover:bg-green-700"
          onClick={() => setGlobalState('createModal', 'scale-100')}
        >
          Create
        </button>
      </div>

      <div className="flex justify-center items-center mt-10">
        <div
          className="flex flex-col justify-center items-center
          h-20 border shadow-md w-full"
        >
          <span><h1 style={{ fontSize: '20px', fontWeight: 'bold', textAlign:'center', }}>List of Orders</h1></span>
        </div>
      </div>
    </div>
  )
}

export default Hero
