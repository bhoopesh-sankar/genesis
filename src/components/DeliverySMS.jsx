import React, { useEffect, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { backProject } from '../services/blockchain'
import { useGlobalState, setGlobalState } from '../store'
import emailjs from '@emailjs/browser';

const DeliverySMS = ({ project }) => {

    useEffect(() => {
        document.title = "Product Details";
    }, []);
    const [email, setEmail] = useState('');
    const [bodySMS, setBodySMS] = useState('');
    const [backModal] = useGlobalState('backModal')
    const handleSubmit = async (e) => {
        e.preventDefault();

        emailjs.sendForm('service_8gyzikc', 'template_acdrw2m', e.target, '_BhZNUJV-R5PVoFjw')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
        e.target.reset()
    };



    return (
        <div
            className={`fixed top-0 left-0 w-screen h-screen flex
    items-center justify-center bg-black bg-opacity-50
    transform transition-transform duration-300 ${backModal}`}
        >
            <div
                className="bg-white shadow-xl shadow-black
        rounded-xl w-11/12 md:w-2/5 h-7/12 p-6"
            >
                <form onSubmit={handleSubmit} className="flex flex-col">
                    <div className="flex justify-between items-center">
                        <p className="font-semibold">{project?.prdname}</p>
                        <button
                            onClick={() => setGlobalState('backModal', 'scale-0')}
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
            border-0 text-sm text-slate-500 focus:outline-none
            focus:ring-0"
                            type="email"
                            name="reply_to"
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                        />
                    </div>

                    <div
                        className="flex justify-between items-center
          bg-gray-300 rounded-xl mt-5"
                    >
                        <input
                            className="block w-full bg-transparent
            border-0 text-sm text-slate-1000 focus:outline-none
            focus:ring-0"
                            type="text"
                            name="message"
                            placeholder="Message"
                            onChange={(e) => setBodySMS(e.target.value)}
                            value={bodySMS}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="inline-block px-6 py-2.5 bg-green-600
            text-white font-medium text-md leading-tight
            rounded-full shadow-md hover:bg-green-700 mt-5"
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    )
}

export default DeliverySMS
