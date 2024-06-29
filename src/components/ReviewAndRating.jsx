import { useState } from "react";
import { ReviewAndRating } from "../services/blockchain";
import { setGlobalState } from "../store";
import { structuredReviews } from "../services/blockchain";
const Review = () => {

    const [rev,setRev] = useState("")
    const [rat,setRat] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        const rating = await ReviewAndRating(rev,rat);
        window.reload()

    };
    return (
        <div className="pt-24 mb-5 px-6 flex justify-center">
            <div className="flex justify-center flex-col md:w-2/3">
            <h1 style={{ fontWeight: 'bold', fontSize: '200%', paddingLeft: '40%', }}>Reviews and Ratings </h1>
            <br/>
            <div style={{paddingLeft:'34%'}}>
            <label style={{ fontWeight: 'bold', fontSize: '150%', paddingRight: '2%'}}>Enter the Review:</label>
            <input style={{border:'3px solid black', borderRadius:'12px'}} type="text" name="rev" placeholder="Review" onChange={(e) => setRev(e.target.value)} value = {rev} required ></input>
            </div>
            <br/>
            <div style={{paddingLeft:'34%'}}>
            <label style={{ fontWeight: 'bold', fontSize: '150%', paddingRight: '2.8%' }}>Enter the Rating:</label>
            <input style={{border:'3px solid black', borderRadius:'12px'}} type="number" name="rat" placeholder="Rating" onChange={(e) => setRat(e.target.value)} value = {rat} required ></input>
            </div>
            <br></br>
            <div style={{paddingLeft:'50%'}}>
                <button className="inline-block px-6 py-2.5 bg-green-600
            text-white font-medium text-xs leading-tight uppercase
            rounded-full shadow-md hover:bg-green-700" onClick={handleSubmit} >Submit</button>
            </div>
            </div>
            
            
        </div>
    
        )
} 

export default Review;