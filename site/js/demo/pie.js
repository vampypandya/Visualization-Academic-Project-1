function update_pie(categ, display) {
    d3.selectAll("svg > *").remove();

    Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
    Chart.defaults.global.defaultFontColor = '#858796';


    var ctx = document.getElementById("myPieChart");
    var dic = {};
    d3.csv("main_div23.csv", function (data) {
        var category = categ;
        var display_list = [];
        console.log(categ);
        data.forEach(function (d) {
            display_list.push([d['BusinessName'], d['LicenseNumber'], d[category], "\n"]);

            if (d[category] in dic) {
                dic[d[category]] = dic[d[category]] + 1;

            } else {
                dic[d[category]] = 1;
            }
        });
        console.log(display_list);

        // Extra Display
        var modal = document.getElementById("myModal");
        var span = document.getElementsByClassName("close")[0];
        span.onclick = function () {
            modal.style.display = "none";
        }
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }


        var keysss = Object.keys(dic);
        var values = Object.values(dic);
        var data = values;
        var color = d3.scaleOrdinal(['#4daf4a', '#377eb8', '#ff7f00', '#984ea3', '#e41a1c']);
        var svg = d3.select("svg"),
            width = svg.attr("width"),
            height = svg.attr("height"),
            radius = Math.min(width, height) / 2 - 100,
            g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        var pie = d3.pie();

        var arc = d3.arc()
            .innerRadius(radius)
            .outerRadius(radius + 50);
        var arcOver = d3.arc()
            .innerRadius(radius - 30)
            .outerRadius(radius + 50);

        var div = d3.select("body")
            .append("div")  // declare the tooltip div
            .attr("class", "tooltip-donut")              // apply the 'tooltip' class
            .style("opacity", 0);

        var arcs = g.selectAll("arc")
            .data(pie(data))
            .enter()
            .append("g")
            .attr("class", "arc")


        arcs.append("path")
            .attr("fill", function (d, i) {
                return color(i);
            })
            .attr("d", function (d) {
                return arc(d);
            })
            .on("mouseover", function (d, i) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div.html(
                    keysss[i] +
                    "<br/>" + values[i])
                    .style("left", (d3.event.pageX + 30) + "px")
                    .style("top", (d3.event.pageY - 30) + "px");
                d3.select(this)
                    .style("fill", "red")
                    .attr("d", arcOver);
            })
            .on("click", function (d, i) {
                modal.style.display = "block"
                var display_gen_data = [];
                var main = "<br>";
                for (let j = 0; j < display_list.length; j++) {

                    console.log(display_list[j][2]);
                    if (display_list[j][2] == keysss[i]) {
                        main = main.concat(display_list[j][0],", ",display_list[j][1],'<br><br>');
                    }
                }



                console.log(main);
                document.getElementById("head13").innerHTML = main;
            })
            .on("mouseout", function (d, i) {

                div.transition()
                    .duration(200)
                    .style("opacity", 0);
                d3.select(this)
                    .style("fill", color(i))
                    .attr("d", arc);

            });


    });

}
