import { useEffect } from 'react'
import DeliverymanHero from '../components/DeliverymanHero'
import DeliveryOrders from '../components/DeliveryOrder'
import Projects from '../components/Projects'
import { loadProjects } from '../services/blockchain'
import { useGlobalState } from '../store'

const DeliverymanHome = () => {
    const [projects] = useGlobalState('projects')

    useEffect(async () => {
        await loadProjects()

    }, [])
    return (
        <>
            <DeliverymanHero />
            <DeliveryOrders projects={projects} />
        </>
    )
}

export default DeliverymanHome
