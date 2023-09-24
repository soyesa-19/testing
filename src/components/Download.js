import { useState } from "react";
import {getDateDifference,
    addDaysToDate,
    exportCsv,
    downloadCsv,} from "../utils/helper";

const Download = ({listing, setPagesize, setTitle, setListing}) => {

    const [isDownloading, setDownloading]= useState(false)

    const transformData = (data) => {
        let res = data.map((item) => {
          let obj = {};
          obj["Unit Id"] = item.listingId;
          obj["Name"] = item.propertyMetadata.headline;
          const daysFromStart = getDateDifference(item.rateSummary.beginDate);
          const rentNightsArr = item.rateSummary?.rentNights?.slice(daysFromStart);
          rentNightsArr?.forEach((rentNight, idx) => {
            let dateString = addDaysToDate(idx);
            obj[dateString] = rentNight;
          });
          return obj;
        });
        return res;
      };

    const handleDownload=() => {
        setDownloading(true)
        const transformedListings = transformData(listing);

        const csv = exportCsv(transformedListings);
        downloadCsv(csv, "data.csv");
        setPagesize(0)
        setTitle('')
        setListing([])
        setDownloading(false)
    }
    return(
        <>
            <button onClick={handleDownload}>
                Download CSV
            </button>
            { isDownloading && <p>Downloading...</p>}
        </>
    )
}

export default Download;