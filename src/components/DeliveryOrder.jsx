import Identicons from 'react-identicons'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { truncate, daysRemaining } from '../store'
import { FaEthereum } from 'react-icons/fa'

const DeliveryOrders = ({ projects }) => {

    useEffect(() => {
        document.title = "DeliveryMan Order";
    }, []);
    const [end, setEnd] = useState(4)
    const [count] = useState(4)
    const [collection, setCollection] = useState([])

    const getCollection = () => projects.slice(0, end)

    useEffect(() => {
        setCollection(getCollection())
    }, [projects, end])

    return (
        <div className="flex flex-col px-6 mb-7">
            <div className="flex justify-center items-center flex-wrap">
                {collection.map((project, i) => (
                    <OrderCard key={i} project={project} />
                ))}
            </div>

            {projects.length > collection.length ? (
                <div className="flex justify-center items-center my-5">
                    <button
                        type="button"
                        className="inline-block px-6 py-2.5 bg-green-600
          text-white font-medium text-xs leading-tight uppercase
          rounded-full shadow-md hover:bg-green-700"
                        onClick={() => setEnd(end + count)}
                    >
                        Load more
                    </button>
                </div>
            ) : null}
        </div>
    )
}

const OrderCard = ({ project }) => {
    const ZeroQuantity = project.quantity;
    const expired = new Date().getTime() > Number(project?.expiresAt + '000')

    return (
        <div id="projects" className="rounded-lg shadow-lg bg-white w-64 m-4" >
            <Link to={'/DeliveryOrders/' + project.id}>

                <div className="p-4">
                    <h5 style={{ fontWeight: 'bold', }}>Product: {truncate(project.prdname, 25, 0, 28)}</h5>
                    <div
                        className="flex justify-between items-center 
        font-bold mt-1 mb-2 text-gray-700"
                    >
                        <small className="flex justify-start items-center">
                            <span> <h5 style={{ fontWeight: 'bold', }}>Price/Kg: {project.cost} DETH</h5></span>
                        </small>
                    </div>
                    <div
                        className="flex justify-between items-center 
        font-bold mt-1 mb-2 text-gray-700"
                    >
                        {expired ? <small className="flex justify-start items-center">
                            <span style={{ color: 'red', }}>Expired</span>
                        </small> : <small className="flex justify-start items-center">
                            <span>Expire: {daysRemaining(project.expiresAt) + ' left'}</span>
                        </small>}
                    </div>
                    <div
                        className="flex justify-between items-center 
        font-bold mt-1 mb-2 text-gray-700"
                    >
                        {ZeroQuantity === 0 || expired ? <small className="flex justify-start items-center">
                            <span style={{ color: 'red', }}>Order Closed</span>
                        </small> : <small className="flex justify-start items-center">
                            <span>Order Open</span>
                        </small>}
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default DeliveryOrders
