export const extractParams = (data, params) => {
    let result = data.map((item) => {
      let obj = {};
      params.forEach((param) => {
        obj[param] = item[param];
      });
      return obj;
    });
    return result;
  };

  export const getDateDifference = (date) => {
    const dateObj1 = new Date(date);
    const dateObj2 = new Date();
    const timeDiff = Math.abs(dateObj2.getTime() - dateObj1.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays;
  };
  
  export const addDaysToDate = (days) => {
    const dateObj = new Date();
    dateObj.setDate(dateObj.getDate() + days);
    return dateObj.toLocaleDateString();
  };
  
  export const exportCsv = (data) => {
    const replacer = (key, value) => (value === null ? "" : value);
    const header = Object.keys(data[0]);
    let csv = data.map((row) =>
      header
        .map((fieldName) => JSON.stringify(row[fieldName], replacer))
        .join(",")
    );
    csv.unshift(header.join(","));
    csv = csv.join("\r\n");
    return csv;
  };

  export const downloadCsv = (csv) => {
    var csvFile;
    var downloadLink;
    
    csvFile = new Blob([csv], { type: "text/csv" });
    downloadLink = document.createElement("a");
    downloadLink.download = "address.csv";
    downloadLink.href = window.URL.createObjectURL(csvFile);
    downloadLink.style.display = "none";
  
    document.body.appendChild(downloadLink);
    downloadLink.click();
  };