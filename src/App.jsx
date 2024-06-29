import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Project from './views/Project'
import { isWallectConnected } from './services/blockchain'
import { ToastContainer } from 'react-toastify'
import Farmerregister from './components/farmerRegister'
import Farmerlogin from './components/farmerLogin'
import MainPage from './components/MainPage'
import FarmerHero from './views/FarmerHomePage'
import Consumerregister from './components/consumerregister'
import Consumerlogin from './components/consumerlogin'
import ConsumerHero from './views/ConsumerHome'
import Help from './components/Help'
import ProjectFarmer from './views/projectFarmer'
import Deliverymanregister from './components/DeliveryRegister'
import Deliverymanlogin from './components/DeliveryLogin'
import DeliverymanHome from './views/DeliverymanHome'
import DeliveryManOrders from './views/DeliveryManOrder'
const App = () => {
  const [loaded, setLoaded] = useState(false)

  useEffect(async () => {
    await isWallectConnected()
    console.log('Blockchain loaded')
    setLoaded(true)
  }, [])

  return (
    <div className="min-h-screen relative">
      <Header />
      {loaded ? (
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/farmerHome" element={<FarmerHero />} />
          <Route path="/farmerRegister" element={<Farmerregister />} />
          <Route path="/farmerLogin" element={<Farmerlogin />} />
          <Route path="/consumerHome" element={<ConsumerHero />} />
          <Route path="/consumerRegister" element={<Consumerregister />} />
          <Route path="/consumerLogin" element={<Consumerlogin />} />
          <Route path="/deliverymanHome" element={<DeliverymanHome />} />
          <Route path="/deliverymanRegister" element={<Deliverymanregister />} />
          <Route path="/deliverymanLogin" element={<Deliverymanlogin />} />
          <Route path="/projects/:id" element={<Project />} />
          <Route path="/farmer-projects/:id" element={<ProjectFarmer />} />
          <Route path="/DeliveryOrders/:id" element={<DeliveryManOrders />} />
          <Route path="/help" element={<Help/>}/>
        </Routes>
      ) : null}

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  )
}

export default App
