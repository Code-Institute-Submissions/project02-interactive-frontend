queue()
    .defer(d3.json, "https://data.nasa.gov/resource/9g7e-7hzz.json")
    .await(makeGraphs);

function makeGraphs(error, facilitiesData) {
    var ndx = crossfilter(facilitiesData);
    show_center(ndx);
    show_status(ndx);
    show_city(ndx);
    show_status_pie(ndx);
    dc.renderAll();
}


function show_city(ndx) {
    var name_dim = ndx.dimension(dc.pluck('center'));
    var group = name_dim.group();
        var total_spend_per_person = name_dim.group().reduceSum(dc.pluck('status'));
        dc.pieChart('#data-city')
            .height(500)
            .radius(180)
            .transitionDuration(1500)
            .dimension(name_dim)
            .group(group);
}  

function show_status_pie(ndx) {
    var name_dim = ndx.dimension(dc.pluck('status'));
    var group = name_dim.group();
        var total_spend_per_person = name_dim.group().reduceSum(dc.pluck('status'));
        dc.pieChart('#data-status-pie')
            .height(500)
            .radius(180)
            .transitionDuration(1500)
            .dimension(name_dim)
            .group(group);
} 

function show_center(ndx) {
    var dim = ndx.dimension(dc.pluck('city'));
    var group = dim.group();

    dc.barChart('#data-center')
        .width(600)
        .height(400)
        .margins({ top: 10, right: 50, bottom: 180, left: 50 })
        .dimension(dim)
        .group(group)
        .transitionDuration(400)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Center Name")
        .yAxis().ticks(20);
}


function show_status(ndx) {
    var dim = ndx.dimension(dc.pluck('status'));
    var group = dim.group();

    dc.barChart('#data-status')
        .width(600)
        .height(400)
        .margins({ top: 10, right: 50, bottom: 100, left: 50 })
        .dimension(dim)
        .group(group)
        .transitionDuration(400)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Center Status")
        .yAxis().ticks(15);
}