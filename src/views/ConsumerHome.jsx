import { useEffect } from 'react'
import ConsumerHeroPage from '../components/ConsumerHeroPage'
import CreateProject from '../components/CreateProject'
import { Projects } from '../components/Projects'
import { loadProjects, getBackers } from '../services/blockchain'
import { useGlobalState } from '../store'
import ComponentList from '../components/SearchAndFilter'
import ConsumerHeroPageTwo from '../components/ConsumerHeroPageTwo'

const ConsumerHero = () => {
    const [projects] = useGlobalState('projects')

    useEffect(async () => {
        await loadProjects()

    }, [])
    return (
        <>
            <ConsumerHeroPage />
            <ComponentList />
        </>
    )
}

export default ConsumerHero
