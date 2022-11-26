// Set the URL
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

    // Chart the Data
    function chart(sample) {
        d3.json(url).then(function(data) {
            var samples = data.samples;
            var results_array = samples.filter(sampleObj => sampleObj.id == sample)

            //Print the Selected Sample Data
            var result = results_array[0]
            console.log(result)

            //Set the Variables
            var result_sampleval = result.sample_values
            var result_otuids = result.otu_ids
            var result_otulabels = result.otu_label

            let trace1 = {
                x: result_sampleval.slice(0,10).reverse(),
                y: result_otuids.slice(0,10).map(object => `OTU ${object}`).reverse(),
                text: result_otulabels,
                type: 'bar',
                orientation: 'h'
            }

            let bar_data = [trace1]
              
            let layout1 = {

            }

            let trace2 = {
                x: result_otuids,
                y: result_sampleval,
                text: result_otulabels,
                mode: "markers",
                marker: {
                    color: result_otuids,
                    size: result_sampleval,
                    colorscale: 'armyrose'
                }
            }

            let bubble_data = [trace2]

            let layout2 = {
            }

            // Bar Chart
            Plotly.newPlot('bar', bar_data, layout1);

            // Bubble Chart
            Plotly.newPlot('bubble', bubble_data, layout2);
        });
    };

    // Demographic Info
    function demo(meta_sample) {
        d3.json(url).then(function(data) {
            var metadata = data.metadata;
            var subject = metadata.filter((sample_obj) => sample_obj.id == meta_sample)[0];
            var demoInfoBox = d3.select("#sample-metadata");
            demoInfoBox.html("");
            Object.entries(subject).forEach(([key, value]) => demoInfoBox.append("h6").text(`${key}: ${value}`))
        })
    };

    // Initialize
    function init() {

    // Select the Dropdown Menu
    let dropdownMenu = d3.select("#selDataset");

    // Set up Dropdown Menu
    d3.json(url).then((data)=>{

        //Check
        console.log(data)
        var sampleNames = data.names
        
        // Assign the Dropdown Menu to a Variable
        sampleNames.forEach((name)=>{
            dropdownMenu.append('option').text(name).property('value');
        });

        var firstSample = sampleNames[0];
        chart(firstSample);
        demo(firstSample);
    })};

    function optionChanged (newSample) {
        chart(newSample);
        demo(newSample);
    }

// End Initialize
init();