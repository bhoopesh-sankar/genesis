import abi from '../abis/src/contracts/Agroblockchain.sol/Agroblockchain.json'
import address from '../abis/Agroblockchain.json'
import { getGlobalState, setGlobalState } from '../store'
import { ethers } from 'ethers'

const { ethereum } = window
const contractAddress = address.address
const contractAbi = abi.abi

const connectWallet = async () => {
  try {
    if (!ethereum) return alert('Please install Metamask')
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
    setGlobalState('connectedAccount', accounts[0]?.toLowerCase())
  } catch (error) {
    reportError(error)
  }
}

const isWallectConnected = async () => {
  try {
    if (!ethereum) return alert('Please install Metamask')
    const accounts = await ethereum.request({ method: 'eth_accounts' })
    setGlobalState('connectedAccount', accounts[0]?.toLowerCase())

    window.ethereum.on('chainChanged', (chainId) => {
      window.location.reload()
    })

    window.ethereum.on('accountsChanged', async () => {
      setGlobalState('connectedAccount', accounts[0]?.toLowerCase())
      await isWallectConnected()
    })

    if (accounts.length) {
      setGlobalState('connectedAccount', accounts[0]?.toLowerCase())
    } else {
      alert('Please connect wallet.')
      console.log('No accounts found.')
    }
  } catch (error) {
    reportError(error)
  }
}

const getEthereumContract = async () => {
  const connectedAccount = getGlobalState('connectedAccount')

  if (connectedAccount) {
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(contractAddress, contractAbi, signer)

    return contract
  } else {
    return getGlobalState('contract')
  }
}

const createProject = async ({
  prdname,
  quantity,
  description,
  imageURL,
  cost,
  loc,
  expiresAt
}) => {
  try {
    if (!ethereum) return alert('Please install Metamask')

    const contract = await getEthereumContract()
    cost = ethers.utils.parseEther(cost)
    await contract.CreateOrders(prdname, quantity,description, imageURL, cost, loc, expiresAt)
  } catch (error) {
    reportError(error)
  }
}

const loadProjects = async () => {
  try {
    if (!ethereum) return alert('Please install Metamask')

    const contract = await getEthereumContract()
    const projects = await contract.getOrders()
    const stats = await contract.stats()
    setGlobalState('stats', structureStats(stats))
    setGlobalState('projects', structuredProjects(projects))
    console.log(projects)
  } catch (error) {
    reportError(error)
  }
}

const loadProject = async (id) => {
  try {
    if (!ethereum) return alert('Please install Metamask')
    const contract = await getEthereumContract()
    const project = await contract.getOrder(id)

    setGlobalState('project', structuredProjects([project])[0])
  } catch (error) {
    alert(JSON.stringify(error.message))
    reportError(error)
  }
}

const ReviewAndRating = async (rev, rat) => {
  try {
    if (!ethereum) return alert('Please install Metamask')
    const contract = await getEthereumContract()
    const suggestions = await contract.getReview(rev, rat)
    console.log(suggestions);
    alert("Rating stored");
  } catch (error) {
    alert(JSON.stringify(error.message))
    reportError(error)
  }
}
const getReviewList = async () => {
  try {
    if (!ethereum) return alert('Please install Metamask')
    const contract = await getEthereumContract()
    const reviews = await contract.getReviewlist();
    setGlobalState('reviews', structuredReviews(reviews));
    // alert("after setGlobal")
  } catch (error) {
    alert(JSON.stringify(error.message))
    reportError(error)
  }
}

const structuredReviews = (reviews) =>
reviews
    .map((review) => ({
      review: review.review.toLowerCase(),
      rating: review.rating.toNumber(),
    }))
    .reverse()


const backProject = async (id, quantity,email, address, amount) => {
  try {
    if (!ethereum) return alert('Please install Metamask')
    const connectedAccount = getGlobalState('connectedAccount')
    const contract = await getEthereumContract()
    const price = ethers.utils.parseUnits(amount, "ether")
    let transaction = await contract.purchaseOrder(id, quantity,email, address,  { value: price });
    await transaction.wait();
  } catch (error) {
    reportError(error)
  }
}

const getBackers = async (id) => {
  try {
    if (!ethereum) return alert('Please install Metamask')
    const contract = await getEthereumContract()
    let backers = await contract.getBuyer(id)

    setGlobalState('backers', structuredBackers(backers))
  } catch (error) {
    reportError(error)
  }
}

const payoutProject = async (id) => {
  try {
    if (!ethereum) return alert('Please install Metamask')
    const connectedAccount = getGlobalState('connectedAccount')
    const contract = await getEthereumContract()

    await contract.payOutProject(id, {
      from: connectedAccount,
    })
  } catch (error) {
    reportError(error)
  }
}


const structuredBackers = (backers) =>
  backers
    .map((backer) => ({
      owner: backer.owner.toLowerCase(),
      boughtquantity: backer.boughtquantity.toNumber(),
      buyerloc: backer.buyerloc.toLowerCase(),
      buyeremail: backer.buyeremail,
      price: parseInt(backer.price._hex) / 10 ** 18,
      timestamp: new Date(backer.timestamp.toNumber() * 1000).toJSON(),
    }))
    .reverse()



const structuredProjects = (projects) =>
  projects
    .map((project) => ({
      id: project.id.toNumber(),
      owner: project.owner.toLowerCase(),
      prdname: project.prdname,
      quantity: project.quantity.toNumber(),
      description: project.description.toLowerCase(),
      imageURL: project.imageURL,
      cost: parseInt(project.cost._hex) / 10 ** 18,
      loc: project.loc,
      delivery: project.delivery,
      timestamp: new Date(project.timestamp.toNumber()).getTime(),
      expiresAt: new Date(project.expiresAt.toNumber()).getTime(),
    }))
    .reverse()

const structureStats = (stats) => ({
  totalorders: stats.totalorders,
})

const reportError = (error) => {
  console.log(error.message)
  throw new Error('No ethereum object.')
}

export {
  connectWallet,
  isWallectConnected,
  createProject,
  loadProjects,
  loadProject,
  backProject,
  getBackers,
  payoutProject,
  ReviewAndRating,
  structuredReviews,
  getReviewList,
}
