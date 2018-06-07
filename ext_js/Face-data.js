queue()
 .defer(d3.csv,"data/data.csv")
 .await(makeGraphs);
  
  function makeGraphs (error, Photosdata){
      var ndx=crossfilter(Photosdata);
      
      show_data_bar(ndx);
       
       dc.renderAll;
  }
  
  function show_data_bar(ndx){
      var name_dim= ndx.dimension(dc.pluck('sex'));
      var name_group=name_dim.group().reduceSum();
      
      dc.barChart("#chart_one")
       .width(400)
       .height(300)
       .margins({top:10,left:50,bottom:30,right:50})
       .dimension(name_dim)
       .group(name_group)
       .transitionDuration(500)
    .x(d3.scale.ordinal())
    .xUnits(dc.units.ordinal)
    
    .xAxisLabel("Gender")
        .yAxis().ticks(20);
       
  }