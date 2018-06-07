queue()
 .defer(d3.csv,"Data/data.csv")
 .await(makeGraphs);
  
  function makeGraphs (error, Photosdata){
      var ndx=crossfilter(Photosdata);
      
      show_data_bar(ndx);
      show_select_bar(ndx);
       
       dc.renderAll;
  }
  
  function show_select_bar(ndx){
      var dim = ndx.dimension(dc.pluck('proffesional'));
     var group = dim.group();
     
     dc.selectMenu("#selector")
     .dimension(dim)
     .group(group);
  }
  
  
  
  function show_data_bar(ndx){
      var name_dim= ndx.dimension(dc.pluck("sex"));
      var name_group=name_dim.group().reduceSum(dc.pluck("Photos"));
      
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