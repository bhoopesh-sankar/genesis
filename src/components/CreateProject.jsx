import { useEffect, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { createProject } from '../services/blockchain'
import { useGlobalState, setGlobalState } from '../store'

const CreateProject = () => {

  useEffect(() => {
    document.title = "Farmer Home";
  }, []);

  const [createModal] = useGlobalState('createModal')
  const [prdname, setPrdname] = useState('')
  const [quantity, setquantity] = useState('')
  const [description, setdescription] = useState('')
  const [cost, setCost] = useState('')
  const [loc, setLoc] = useState('')
  const [expiresAt, setExpiry] = useState('')
  const [imageURL, setImageURL] = useState('')

  const toTimestamp = (dateStr) => {
    const dateObj = Date.parse(dateStr)
    return dateObj / 1000
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!prdname || !quantity || !cost || !loc || !description || !expiresAt || !imageURL) return

    const params = {
      prdname,
      quantity,
      description,
      cost,
      loc,
      expiresAt: toTimestamp(expiresAt),
      imageURL,
    }

    await createProject(params)
    toast.success('Order created successfully, will reflect in 30sec.')
    onClose()
  }

  const onClose = () => {
    setGlobalState('createModal', 'scale-0')
    reset()
  }

  const reset = () => {
    setPrdname('')
    setquantity('')
    setCost('')
    setLoc('')
    setDelivery('')
    setExpiry('')
  }

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex
    items-center justify-center bg-black bg-opacity-50
    transform transition-transform duration-300 ${createModal}`}
    >
      <div
        className="bg-white shadow-xl shadow-black
        rounded-xl w-11/12 md:w-2/5 h-7/12 p-6"
      >
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex justify-between items-center">
            <p className="font-semibold">Create Order</p>
            <button
              onClick={onClose}
              type="button"
              className="border-0 bg-transparent focus:outline-none"
            >
              <FaTimes />
            </button>
          </div>

          <div
            className="flex justify-between items-center
          bg-gray-300 rounded-xl mt-5"
          >
            <input
              className="block w-full bg-transparent
            border-0 text-black text-slate-1000 focus:outline-none
            focus:ring-0"
              type="text"
              name="prdname"
              placeholder="Product Name"
              onChange={(e) => setPrdname(e.target.value)}
              value={prdname}
              required
            />
          </div>

          <div
            className="flex justify-between items-center
          bg-gray-300 rounded-xl mt-5"
          >
            <input
              className="block w-full bg-transparent
            border-0 text-black text-slate-1000 focus:outline-none
            focus:ring-0"
              type="number"
              name="quantity"
              placeholder="Quantity"
              onChange={(e) => setquantity(e.target.value)}
              value={quantity}
              required
            />
          </div>

          <div
            className="flex justify-between items-center
          bg-gray-300 rounded-xl mt-5"
          >
            <input
              className="block w-full bg-transparent
            border-0 text-black text-slate-1000 focus:outline-none
            focus:ring-0"
              type="text"
              name="description"
              placeholder="Product Description"
              onChange={(e) => setdescription(e.target.value)}
              value={description}
              required
            />
          </div>

          <div
            className="flex justify-between items-center
          bg-gray-300 rounded-xl mt-5"
          >
            <input
              className="block w-full bg-transparent
            border-0 text-sm text-slate-500 focus:outline-none
            focus:ring-0"
              type="url"
              name="imageURL"
              placeholder="Image URL"
              onChange={(e) => setImageURL(e.target.value)}
              value={imageURL}
              required
            />
          </div>

          <div
            className="flex justify-between items-center
          bg-gray-300 rounded-xl mt-5"
          >
            <input
              className="block w-full bg-transparent
            border-0 text-black text-slate-1000 focus:outline-none
            focus:ring-0"
              type="number"
              step={0.01}
              min={0.01}
              name="cost"
              placeholder="Price per Kg (DETH)"
              onChange={(e) => setCost(e.target.value)}
              value={cost}
              required
            />
          </div>

          <div
            className="flex justify-between items-center
          bg-gray-300 rounded-xl mt-5"
          >
            <input
              className="block w-full bg-transparent
            border-0 text-black text-slate-1000 focus:outline-none
            focus:ring-0"
              type="text"
              name="loc"
              placeholder="Location"
              onChange={(e) => setLoc(e.target.value)}
              value={loc}
              required
            />
          </div>

          <div
            className="flex justify-between items-center
          bg-gray-300 rounded-xl mt-5"
          >
            <input
              className="block w-full bg-transparent
            border-0 text-black text-slate-1000 focus:outline-none
            focus:ring-0"
              type="date"
              name="date"
              placeholder="Expires"
              onChange={(e) => setExpiry(e.target.value)}
              value={expiresAt}
              required
            />
          </div>

          <button
            type="submit"
            className="inline-block px-6 py-2.5 bg-green-600
            text-white font-medium text-md leading-tight
            rounded-full shadow-md hover:bg-green-700 mt-5"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateProject
