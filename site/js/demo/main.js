function update(value) {
    d3.selectAll("svg > *").remove();
    const bar = ['Status', 'ApplicationorRenewal', 'LicenseStatus', 'LicenseCategory','Zip','LicenseType','ApplicationCategory','City'];
    const hist = ["EndYear","EndMonth","EndDay","StartYear",'StartMonth','StartDay','LicenseCreationDateStartYear','LicenseCreationDateStartMonth','LicenseCreationDateStartDay','LicenseExpirationDateEndYear','LicenseExpirationDateEndMonth','LicenseExpirationDateEndDay'];
    console.log('Yhere');
    // value.i
    console.log(value);
    console.log(bar);
    console.log(hist);
    console.log(hist.indexOf(value));
    if (hist.indexOf(value) != -1) {
        console.log("Inside");
        update_hist(value);
    } else if (bar.indexOf(value) != -1) {
        console.log("Inside Bar");
        update_bar2(value);
    }
}

function alter(current, parameter) {
    d3.selectAll("svg > *").remove();
    if (current = 'bar'){
        update_pie(paramater);
    }
    else{
        update_bar(parameter);
    }
}

function change_heading(element) {

    d3.selectAll("svg > *").remove();

    d3.select("svg")
        .attr("width", 800)
        .attr("height", 600)

    var disabled_list = ['Zip','City','LicenseCategory'];

    var value = element.value;
    console.log(disabled_list.indexOf(value));
    if (disabled_list.indexOf(value)!=-1){
        console.log('Disabled')
        document.getElementById("bar-vis").disabled = true;
    }
    var display = element.options[element.selectedIndex].text;
    console.log(display);
    document.getElementById("head11").innerHTML = display;
    update_pie(value,display);
}

