import { useState } from "react";
import ErrorPage from "./ErrorPage";
import { fetchData } from "../utils/fetchData";
import Download from "./Download";
import { extractParams } from "../utils/helper";

const Form = () => {

    const [pageSize, setPagesize] = useState(0)
    const [title, setTitle] = useState('')
    const [isLoading, setIsloading] = useState(false)
    const [listing, setListing]=useState([])
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(pageSize === 0 && title.length === 0){
            alert('PLease enter correct data!!')
            return
        }
        setIsloading(true)
        try{
            const listings = await fetchData(pageSize, title)
            const extractedListings = extractParams(listings, [
                "listingId",
                "propertyMetadata",
                "rateSummary",
            ]);
            setListing(extractedListings)
            setIsloading(false)
        } catch (error){
            setIsloading(false)
            setError(error) 
        }
    }

    if(error){
        return <ErrorPage error={error}/>
    }

    return(
        <>
        { isLoading ? <p>Loading...</p> :             
        <form onSubmit={handleSubmit}>
            <div>
                <label>Enter Page Size</label>
                <input 
                    type='text' 
                    name='pageSize' 
                    value={pageSize} 
                    onChange={(e) => setPagesize(e.target.value)}/>
            </div>
            <div>
            <label>Enter title</label>
                <input 
                    type='text' 
                    name='titlte' 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)}/>
            </div>
            <button type="submit">
                Submit
            </button>
        </form>}
        {listing.length > 0 && <Download 
            listing={listing} 
            setPagesize={setPagesize} 
            setTitle={setTitle} 
            setListing={setListing} />}
        </>
    )
}


export default Form;