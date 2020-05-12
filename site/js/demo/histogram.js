function update_hist(categ) {
    console.log("Hist");
    d3.selectAll("svg > *").remove();

    var margin = 200;
    var color = d3.scaleOrdinal(['#4daf4a', '#377eb8', '#ff7f00', '#984ea3', '#e41a1c']);
    // var svg = d3.select("svg"),
    //     width = svg.attr("width") - margin,
    //     height = svg.attr("height") - margin
    //
    // svg.append("g")
    //     .attr("transform",
    //         "translate(" + 100 + "," + 100 + ")");
    var margin = {top: 10, right: 30, bottom: 60, left: 50},
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;


    var svg = d3.select("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");



    d3.csv("main_div23.csv", function (error, data) {
            if (error) throw error;
            console.log(width);
            // format the data
            data.forEach(function (d) {
                d.date = d[categ];
            });


            var x = d3.scaleLinear()
                .domain([d3.min(data, function (d) {
                    return +d.date
                }), d3.max(data, function (d) {
                    return +d.date
                })])
                .rangeRound([0, width]);
            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x));
            var y = d3.scaleLinear()
                .range([height, 0]);
            var yAxis = svg.append("g")

            svg.append("text")
                .attr("class", "x label")
                .attr("text-anchor", "end")
                .attr("x", width)
                .attr('dx', "-10em")
                .attr("y", height + 40)
                .text(categ);

            svg.append("text")
                .attr("class", "y label")
                .attr("text-anchor", "end")
                .attr("y", 6)
                .attr("dx", "-7em")
                .attr("dy", "-2.5em")
                .attr("transform", "rotate(-90)")
                .text("Frequency");


            function update(nBin) {

                var histogram = d3.histogram()
                    .value(function (d) {
                        return d.date;
                    })
                    .domain(x.domain())
                    .thresholds(x.ticks(nBin));

                var bins = histogram(data);

                y.domain([0, d3.max(bins, function (d) {
                    return d.length;
                })]);
                yAxis
                    .transition()
                    .duration(1000)
                    .call(d3.axisLeft(y));

                // Join the rect with the bins data
                var u = svg.selectAll("rect")
                    .data(bins)

                // Manage the existing bars and eventually the new ones:
                u
                    .enter()
                    .append("rect") // Add a new rect for each new elements
                    .merge(u) // get the already existing elements as well
                    .transition() // and apply changes to all of them
                    .duration(1000)
                    .attr("x", 1)
                    .attr("transform", function (d) {
                        return "translate(" + x(d.x0) + "," + y(d.length) + ")";
                    })
                    .attr("width", function (d) {
                        return x(d.x1) - x(d.x0) - 1;
                    })
                    .attr("height", function (d) {
                        return height - y(d.length);
                    })
                    .attr("fill", function (d, i) {
                        return color(i);
                    })


                // If less bar in the new histogram, I delete the ones not in use anymore
                u
                    .exit()
                    .remove()
            }

            update(20)

            var slider = d3
                .sliderBottom()
                .min(0)
                .max(d3.max(data, function (d) {
                    return +d.date
                }) - d3.min(data, function (d) {
                    return +d.date
                }))
                .step(1)
                .width(600)
                .fill('#2196f3')
                .displayValue(false)
                .on('onchange', val => {
                    update(+val);
                });

            // console.log(d3.select('#slider').selectAll('svg')._parents.length);
            // d3.select('#slider').remove('svg');

            d3.select('#slider')
                .append('svg')
                .attr('width', 2000)
                .attr('height', 100)
                .append('g')
                .attr('transform', 'translate(30,30)')
                .call(slider);


        }
    );

}