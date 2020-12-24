// Use D3 fetch to read the JSON file
// The data from the JSON file is named importedData
d3.json("static/js/samples.json").then((importedData) => {

	console.log(importedData);

    // var data = importedData;
    
    // Add test Subject ID No. to dropdown menus
	var names = importedData.names;

	names.forEach((name) => {
		d3.select("#selDataset").append("option").text(name).property("value");
	})
optionChanged(names[0])
})

//     // Initializes the page with default plots
 	function chart(sampleid) {
d3.json("static/js/samples.json").then((data) => {
		// Choose data for test ID No. 940 plotted as default
		defaultDataset = data.samples.filter(sample => sample.id == sampleid);
		firstdata=defaultDataset[0]
		console.log(defaultDataset);

		// Select all sample_values, otu_ids and otu_labels of the selected test ID
		allSampleValuesDefault =firstdata.sample_values;
		allOtuIdsDefault = firstdata.otu_ids;
		allOtuLabelsDefault = firstdata.otu_labels;

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

        // data
		var barData = [trace1];

		// Apply the group bar mode to the layout
		var barlayout = {
			title: `<b>Top 10 OTUs found in selected Test Subject ID No<b>`,
			xaxis: { title: "Sample Value"},
			yaxis: { title: "OTU ID"},
			autosize: false,
			width: 450,
			height: 600
		}

		// Render the plot to the div tag with id "bar"
		Plotly.newPlot("bar", barData, barlayout);

		// BUBBLE CHART
		var trace2 = {
			x: allOtuIdsDefault,
			y: allSampleValuesDefault,
			text: allOtuLabelsDefault,
			mode: 'markers',
			marker: {
				color: allOtuIdsDefault,
				size: allSampleValuesDefault
			}
		};
		
		var bubbleData = [trace2];
		
		var bubbleLayout = {
			title: '<b>Bubble Chart displaying sample values of OTU IDs of the selected individual<b>',
			xaxis: { title: "OTU ID"},
			yaxis: { title: "Sample Value"}, 
			showlegend: false,
		};
		
		Plotly.newPlot('bubble', bubbleData, bubbleLayout);

		// DEMOGRAPHIC INFO
		demoDefault = data.metadata.filter(sample => sample.id == sampleid);
		firstdemo=demoDefault[0]
		console.log(demoDefault);

        // Display each key-value pair from the metadata JSON object
		Object.entries(firstdemo).forEach(([key, value]) => d3.select("#sample-metadata")
													.append("p").text(`${key.toUpperCase()}: ${value}`));

	})}

function optionChanged(sampleid){

	chart(sampleid)
}
