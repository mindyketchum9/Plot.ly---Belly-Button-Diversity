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

    // Initializes the page with default plots
	function init() {

		// Choose data for test ID No. 940 plotted as default
		defaultDataset = data.samples.filter(sample => sample.id === "940")[0];
		console.log(defaultDataset);

		// Select all sample_values, otu_ids and otu_labels of the selected test ID
		allSampleValuesDefault = defaultDataset.sample_values;
		allOtuIdsDefault = defaultDataset.otu_ids;
		allOtuLabelsDefault = defaultDataset.otu_labels;

		// Select the top 10 OTUs for the ID with their sample_values, otu_ids and otu_labels
		sampleValuesDefault = allSampleValuesDefault.slice(0, 10).reverse();
		otuIdsDefault = allOtuIdsDefault.slice(0, 10).reverse();
		otuLabelsDefault = allOtuLabelsDefault.slice(0, 10).reverse();

		console.log(sampleValuesDefault);
		console.log(otuIdsDefault);
		console.log(otuLabelsDefault);

		// BAR CHART
		// Add trace for the default Data
		var trace1 = {
			x: sampleValuesDefault,
			y: otuIdsDefault.map(outId => `OTU ${outId}`),
			text: otuLabelsDefault,
			type: "bar",
			orientation: "h"
		};
