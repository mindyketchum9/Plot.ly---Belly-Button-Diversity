// Use D3 fetch to read the JSON file
// The data from the JSON file is named importedData
d3.json("data/samples.json").then((importedData) => {

	console.log(importedData);

    var data = importedData;
    
    // Add test Subject ID No. to dropdown menus
	var names = data.names;

	names.forEach((name) => {
		d3.select("#selDataset").append("option").text(name);
	})
