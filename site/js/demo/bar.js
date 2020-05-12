function update_bar2(categ) {
    // var categ = 'trial';
    d3.selectAll("svg > *").remove();
    var svg = d3.select("svg"),
        margin = 200,
        width = svg.attr("width") - margin,
        height = svg.attr("height") - margin

    svg.append("text")
        .attr("transform", "translate(100,0)")
        .attr("x", 50)
        .attr("y", 50)
        .attr("font-size", "24px")

    var xScale = d3.scaleBand().range([0, width]).padding(0.6),
        yScale = d3.scaleLinear().range([height, 0]);
    var color = d3.scaleOrdinal(['#4daf4a', '#377eb8', '#ff7f00', '#984ea3', '#e41a1c']);
    var g = svg.append("g")
        .attr("transform", "translate(" + 100 + "," + 100 + ")");

    d3.csv("main_div23.csv", function (error, data) {
        if (error) {
            throw error;
        }
        var countObj = {};
        var details = {}


        data.forEach(function (d) {
            var city = d[categ];
            if (countObj[city] === undefined) {
                countObj[city] = 1;
            } else {
                countObj[city] = countObj[city] + 1;
            }
        });

        var listy = [];
        var done = [];
        data.forEach(function (d) {

            var city = d[categ];
            // d.count = countObj[city];
            if (done.indexOf(city) == -1) {
                var mid = {'indz': city, 'count': countObj[city]};
                listy.push(mid);
                done.push(city);
            }
        });

        var final = {"record": listy};
        var div = d3.select("body")
            .append("div")  // declare the tooltip div
            .attr("class", "tooltip-donut")              // apply the 'tooltip' class
            .style("opacity", 0);
        data = final.record;
        console.log('Hi');
        console.log(data);
        xScale.domain(data.map(d => d.indz));
        yScale.domain([0, d3.max(data, d => d.count)]);

        g.append("g")
            .call(d3.axisBottom(xScale))
            // .attr("class", "axis")
            .attr("transform", "translate(0," + height + ")")
            .append("text")
            .attr("y", 6)
            .attr("x", width - 100)
            .attr("dx", "-7em")
            .attr("dy", "3em")
            .attr("font-size","17px")
            .attr("text-anchor", "end")
            .attr("fill", "black")
            .text(categ);

        g.append("g")
            .call(d3.axisLeft(yScale).tickFormat(function (d) {
                return d;
            })
                .ticks(10))
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dx", "-10em")
            .attr("dy", "-4.1em")
            .attr("font-size","17px")
            .attr("text-anchor", "end")
            .attr("fill", "black")
            .text("Frequency");


        g.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("fill", function (d, i) {
                return color(i);
            })
            .attr("x", d => xScale(d.indz))
            .attr("y", d => yScale(d.count))
            .attr("width", xScale.bandwidth())
            .attr("height", d => height - yScale(d.count))
            .on("mouseover", function (d) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div.html(
                    d.indz +
                    "<br/>" + d.count)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px")
                var xPos = +d3.select(this).attr("x")
                var wid = +d3.select(this).attr("width")
                var hei = +d3.select(this).attr("height");
                d3.select(this).attr("x", xPos - 10).attr("width", wid + 20).attr("height", hei + 20);
            })
            .on("mouseout", function (d) {

                div.transition()
                    .duration(200)
                    .style("opacity", 0);
                d3.select(this).attr("x", d => xScale(d.indz))
                    .attr("width", xScale.bandwidth())
                    .attr("height", d => height - yScale(d.count));
            })

    });

}