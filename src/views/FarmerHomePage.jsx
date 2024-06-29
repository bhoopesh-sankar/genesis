import { useEffect } from 'react'
import AddButton from '../components/AddButton'
import CreateProject from '../components/CreateProject'
import Hero from '../components/FarmerHero'
import { Projects } from '../components/Projects'
import { loadProjects } from '../services/blockchain'
import { useGlobalState } from '../store'
import { FarmerProjects } from '../components/FarmerProjects'

const FarmerHero = () => {
    const [projects] = useGlobalState('projects')

    useEffect(async () => {
        await loadProjects()

    }, [])
    return (
        <>
            <Hero />
            <FarmerProjects projects={projects} />
            <CreateProject />
            <AddButton />
        </>
    )
}

export default FarmerHero
