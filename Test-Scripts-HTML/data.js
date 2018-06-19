queue()
    .defer(d3.json, "https://data.nasa.gov/resource/9g7e-7hzz.json")
    .await(makeGraphs);

function makeGraphs(error, facilitiesData) {
    var ndx = crossfilter(facilitiesData);
    show_center(ndx);
    show_center1(ndx);
    show_center2(ndx);
    show_center3(ndx);
    show_center4(ndx);
    dc.renderAll();
}

function show_center(ndx) {
    var dim = ndx.dimension(dc.pluck('center'));
    var group = dim.group();

    dc.barChart('#data-results')
        .width(800)
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


function show_center1(ndx) {
    var dim = ndx.dimension(dc.pluck('status'));
    var group = dim.group();

    dc.barChart('#data-results1')
        .width(800)
        .height(400)
        .margins({ top: 10, right: 50, bottom: 100, left: 50 })
        .dimension(dim)
        .group(group)
        .transitionDuration(400)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Center Status")
        .yAxis().ticks(20);
}


function show_center2(ndx) {
    var center_dim = ndx.dimension(dc.pluck('status'));
    var status_per_center = center_dim.group().reduceSum(dc.pluck('center'));
    
    dc.barChart("#data-results2")
        .width(800)
        .height(500)
        .margins({top: 10, right: 50, bottom: 180, left: 50})
        .dimension(center_dim)
        .group(status_per_center)
        .transitionDuration(400)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Center Name")
        .yAxis().ticks(4);
}


            

function show_center3(ndx) {
    var name_dim = ndx.dimension(dc.pluck('city'));
    var group = name_dim.group();
        var total_spend_per_person = name_dim.group().reduceSum(dc.pluck('status'));
        dc.pieChart('#data-results3')
            .height(500)
            .radius(180)
            .transitionDuration(1500)
            .dimension(name_dim)
            .group(group);
}  

function show_center4(ndx) {
    var name_dim = ndx.dimension(dc.pluck('status'));
    var group = name_dim.group();
        var total_spend_per_person = name_dim.group().reduceSum(dc.pluck('status'));
        dc.pieChart('#data-results4')
            .height(500)
            .radius(180)
            .transitionDuration(1500)
            .dimension(name_dim)
            .group(group);
} 