import {
  daysRemaining,
  setGlobalState,
  useGlobalState,
} from '../store'


const ProjectDetails = ({ project }) => {
  const [connectedAccount] = useGlobalState('connectedAccount')
  const ZeroQuantity = project?.quantity;
  const expired = new Date().getTime() > Number(project?.expiresAt + '000')
  const handleSubmit = async (e) => {
    e.preventDefault()
    setGlobalState('backModal', 'scale-100')
  }

  return (
    <div className="pt-24 mb-5 px-6 flex justify-center">
      <div className="flex justify-center flex-col md:w-2/3">
        <h1 style={{ fontWeight: 'bold', fontSize: '200%', paddingLeft: '40%', }}>Product Details</h1>
        <br/>
        <div
          className="flex justify-start items-start
        sm:space-x-4 flex-wrap"
        >
          <img
            src={project?.imageURL}
            alt={project?.title}
            className="rounded-xl h-64 object-cover sm:w-1/3 w-full"
          />
          <form onSubmit={handleSubmit}>
            <div >
              <div >
                <div >
                  <small >
                    <span style={{ fontWeight: 'bold', fontSize: '150%', }}>Product  : </span>
                    <span style={{ fontWeight: 'bold', fontSize: '150%', paddingLeft: '30px', }}>{project?.prdname}</span>
                  </small>
                </div>
                <div className="flex justify-between items-center font-bold mt-2">
                  <small >
                    <span style={{ fontWeight: 'bold', fontSize: '150%', }}>Owner  : </span>
                    <span style={{ fontWeight: 'bold', fontSize: '150%', paddingLeft: '43px', }}>{project?.owner}</span>
                  </small>
                </div>
                <div className="flex justify-between items-center font-bold mt-2">
                  <small >
                    <span style={{ fontWeight: 'bold', fontSize: '150%', }}>Price/Kg : </span>
                    <span style={{ fontWeight: 'bold', fontSize: '150%', paddingLeft: '29px', }}>{project?.cost} DETH</span>
                  </small>
                </div>
                <div className="flex justify-between items-center font-bold mt-2">
                  <small >
                    <span style={{ fontWeight: 'bold', fontSize: '150%', }}>Quantity :</span>
                    <span style={{ fontWeight: 'bold', fontSize: '150%', paddingLeft: '23px', }}> {project?.quantity} Kg</span>
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
                      Buy
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

export default ProjectDetails
