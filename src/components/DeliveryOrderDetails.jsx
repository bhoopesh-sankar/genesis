import Identicons from 'react-identicons'
import { FaEthereum } from 'react-icons/fa'
import {
    daysRemaining,
    setGlobalState,
    truncate,
    useGlobalState,
} from '../store'
import BackProject from './BackProject'
import { payoutProject } from '../services/blockchain'
import { useEffect, useState } from 'react'

const DeliveryOrderDetails = ({ project }) => {
    useEffect(() => {
        document.title = "Product Details";
    }, []);
    const [connectedAccount] = useGlobalState('connectedAccount')
    const ZeroQuantity = project?.quantity;
    const expired = new Date().getTime() > Number(project?.expiresAt + '000')
    const owner = project?.owner;
    const handleSubmit = async (e) => {
        e.preventDefault()
        setGlobalState('backModal', 'scale-100')
    }

    return (
        <div className="pt-24 mb-5 px-6 flex justify-center">
            <div className="flex justify-center flex-col md:w-2/3">
                <h1 style={{ fontWeight: 'bold', fontSize: '200%', paddingLeft: '40%', }}>Product Details</h1>
                <div
                    className="flex justify-start items-start
        sm:space-x-4 flex-wrap"
                >
                    <form onSubmit={handleSubmit}>
                        <div >
                            <div >
                                <div >
                                    <small >
                                        <span style={{ fontWeight: 'bold', fontSize: '150%', }}>Product  : </span>
                                        <span style={{ fontWeight: 'bold', fontSize: '150%', paddingLeft: '35px', }}>{project?.prdname}</span>
                                    </small>
                                </div>
                                <div >
                                    <small >
                                        <span style={{ fontWeight: 'bold', fontSize: '150%', }}>Owner  : </span>
                                        <span style={{ fontWeight: 'bold', fontSize: '150%', paddingLeft: '45px', }}>{project?.owner}</span>
                                    </small>
                                </div>
                                <div className="flex justify-between items-center font-bold mt-2">
                                    <small >
                                        <span style={{ fontWeight: 'bold', fontSize: '150%', }}>Price/Kg : </span>
                                        <span style={{ fontWeight: 'bold', fontSize: '150%', paddingLeft: '30px', }}>{project?.cost} DETH</span>
                                    </small>
                                </div>
                                <div className="flex justify-between items-center font-bold mt-2">
                                    <small >
                                        <span style={{ fontWeight: 'bold', fontSize: '150%', }}>Quantity :</span>
                                        <span style={{ fontWeight: 'bold', fontSize: '150%', paddingLeft: '25px', }}> {project?.quantity} Kg</span>
                                    </small>
                                </div>
                                <div className="flex justify-between items-center font-bold mt-2">
                                    <small >
                                        <span style={{ fontWeight: 'bold', fontSize: '150%', }}>Address :</span>
                                        <span style={{ fontWeight: 'bold', fontSize: '150%', paddingLeft: '39px', }}>{project?.loc} </span>
                                    </small>
                                </div>
                                <div className="flex justify-between items-center font-bold mt-2">
                                    <small>
                                        <span style={{ fontWeight: 'bold', fontSize: '150%', }}>Expire :</span>
                                        <span style={{ fontWeight: 'bold', fontSize: '150%', paddingLeft: '50px', }}> {expired
                                            ? 'Expired'
                                            : daysRemaining(project.expiresAt) + ' left'}</span>
                                    </small>

                                </div>
                                <div className="flex justify-start items-center space-x-2 mt-4">
                                    {ZeroQuantity === 0 || expired
                                        ? <span
                                            className="inline-block px-6 py-2.5 bg-red-600
            text-white font-medium text-xs leading-tight uppercase
            rounded-full shadow-md hover:bg-red-700"
                                        >
                                            Closed
                                        </span> : <button
                                            type="submit"
                                            className="inline-block px-6 py-2.5 bg-green-600
            text-white font-medium text-xs leading-tight uppercase
            rounded-full shadow-md hover:bg-green-700"
                                        >
                                            Email
                                        </button>}
                                </div>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default DeliveryOrderDetails
