function buildMetadata(samples){
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
        let metadata=data.metadata;
        //filter to desire number
        let resultArray=metadata.filter(sampleObj=> sampleObj.id==sample);
        let result=resultArray[0];
        //d3 used to sele which panel
        let Panel=d3.select("#sample-metadata");

        //html to clear metada
        Panel.html("");

        //loop to append d3 rows
        for (key in result){
            Panel.append("h6").text('${key.toUpperCase()}: ${result[key]}');

        };
        //building the gauge chart for the bonus
        buildingGuage(result.wfreq);
    });
}

function buildcharts(sample) {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data)=>{
        let samples=data.samples;
        let resultArray=samples. filter(sampleObj=>sampleObj.id == sample);
        let result=resultArray[0];

        let otu_ids=result.otu_ids;
        letotu_labels=result.otu_labels;
        let sample_values=result.sample_values;

        // building a bubble chart
        let bubbleLayout={
            title:"Bacteria Cultures Per Sample",
            margin:{t:0},
            hovermode:"closest",
            xaxis:{title:"OTU ID"},
            margin:{t:30}

        };
        let bubbleData=[
            {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode:"markers",
            marker:{
                size:sample_values,
                color:otu_ids,
                colorscale:"Earth"
            }
            }
        ];

        Plotly.newPlot("bubble", bubbleData, bubbleLayout);
        let yticks=otu_ids.slice(0,10).map(otuID=> 'OTU ${otuID}').reverse ();
        let barData= [
            {
            y:yticks,
            x:sample_values.slice(0,10).revers(),
            text:otu_labels.slice(0,10).revers(),
            type:"bar",
            orientation:"h",
         }

        ];

        let barLayout={
            title:"Top 10 Bacteria Cultures Fount",
            margin:{t:30, 1:50}
        };
        Plotly.newPlot("bar", barData,barLayout);
    });
}

function init() {
    //referece to dropdown
    let select=d3.select("#selDataset");

    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data)=>{
        let sampleNames=data.names;
        
        for(let i=0; i<sampleNames.length; i++){
            select
                .append("option")
                .text(sampleNames[i])
                .property("value", sampleNames[i]);

        };

        //use first data to have initial plots
        let first=sampleNames[0];
        buildcharts(first);
        buildMetadata(first);
    });
}

function optionChanged(newSample) {
    //use new data when ever new sample is picked
    buildcharts(newSample);
    buildMetadata(newSample);
}

//initiate the dashboard
init();