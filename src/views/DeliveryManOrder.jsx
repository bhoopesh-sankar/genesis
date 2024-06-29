import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BackProject from '../components/BackProject'
import { getBackers, loadProject } from '../services/blockchain'
import { useGlobalState } from '../store'
import DeliveryOrderDetails from '../components/DeliveryOrderDetails'
import ProjectBackers from '../components/ProjectBackers'
import DeliverySMS from '../components/DeliverySMS'

const DeliveryManOrders = () => {
    const { id } = useParams()
    const [loaded, setLoaded] = useState(false)
    const [project] = useGlobalState('project')
    const [backers] = useGlobalState('backers')

    useEffect(async () => {
        await loadProject(id)
        await getBackers(id);
        setLoaded(true)
    }, [])
    return loaded ? (
        <>
            <DeliveryOrderDetails project={project} />
            <ProjectBackers backers={backers} />
            <DeliverySMS project={project} />
        </>
    ) : null
}

export default DeliveryManOrders
