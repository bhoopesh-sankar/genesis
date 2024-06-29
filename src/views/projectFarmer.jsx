import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BackProject from '../components/BackProject'
import ProjectDetails from '../components/ProjectDetails'
import FarmerProjectDetails from '../components/FarmerProjectDetails'
import FarmerProjectBackers from '../components/FarmerProjectBackers'
import { getBackers, loadProject,getReviewList } from '../services/blockchain'
import { useGlobalState } from '../store'
import ProjectBackers from '../components/ProjectBackers'
import Review from '../components/ReviewAndRating'
import { ReviewRating } from '../components/Reviews'

const ProjectFarmer = () => {
  const { id } = useParams()
  const [loaded, setLoaded] = useState(false)
  const [project] = useGlobalState('project')
  const [backers] = useGlobalState('backers')
  const [reviews] = useGlobalState("reviews");

  useEffect(async () => {
    await loadProject(id)
    await getBackers(id);
    await getReviewList();
    setLoaded(true)
  }, [])
  return loaded ? (
    <>
      <FarmerProjectDetails project={project} />
      <BackProject project={project} />
      <FarmerProjectBackers backers={backers} />
      {/* <Review /> */}
      <h1 style={{ fontWeight: 'bold', fontSize: '200%', paddingLeft: '40%', }}>Reviews and Ratings</h1>
      <ReviewRating reviews={reviews} />
      
      
    </>
  ) : null
}

export default ProjectFarmer;
