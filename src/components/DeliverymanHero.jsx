import { setGlobalState, useGlobalState } from '../store'
const DeliverymanHero = () => {
    const [stats] = useGlobalState('stats')

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
            <div className="flex justify-center items-center mt-10">
                <div
                    className="flex flex-col justify-center items-center
          h-20 border shadow-md w-full"
                >
                    <span><h1 style={{ fontSize: '20px', fontWeight: 'bold', textAlign: 'center', }}>List of Orders</h1></span>
                </div>
            </div>
        </div>
    )
}

export default DeliverymanHero
