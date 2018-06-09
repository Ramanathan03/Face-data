queue()
 .defer(d3.csv,"Data/data.csv")
 .await(makeGraphs);
  
  function makeGraphs (error, Photosdata){
      var ndx=crossfilter(Photosdata);
     
      Photosdata.forEach(function (d){
       d.Photos=parseInt(d.Photos);
        d.yrsWorking=parseInt(d["yrsWorking"]);
      });
      
       
      
      show_data_bar(ndx);
      show_select_bar(ndx);
      show_pie_chart(ndx);
      show_scatter_chart(ndx); 
       dc.renderAll();
       
  }
  
 
function show_select_bar(ndx){
     var dim = ndx.dimension(dc.pluck('UsageRank'));
    var group = dim.group();
   
    dc.selectMenu("#selector")
    .dimension(dim)
    .group(group);
 }
              var gendercolor= d3.scale.ordinal()
                .domain(["male","female"])
                .range(["#ff6600",  "#ff0066"]);
                
                var colorScale = d3.scale.ordinal().domain(["Artist", "Athlete", "Politician"])
                                   .range(["#eeff00", "#ff0022", "#2200ff"]);


      
      function show_pie_chart(ndx){
            var pie_dim=ndx.dimension(dc.pluck('proffesional'));
            var pie_group=pie_dim.group();
            
            dc.pieChart('#pie')
            .height(300)
            .radius(90)
            .transitionDuration(550)
            .dimension(pie_dim)
            .group(pie_group)
            .legend(dc.legend().x(80).y(5).itemHeight(13).gap(8))
            .colors(function(d){ return colorScale(d); });
             
      }
  
  
  function show_data_bar(ndx){
      var name_dim= ndx.dimension( function(d){
          return d.sex;
      });
      var name_group=name_dim.group();
      
    
      
      dc.barChart("#chart_one")
       .width(400)
       .height(300)
       .margins({top:10,left:50,bottom:30,right:50})
       .dimension(name_dim)
       .group(name_group)
       .transitionDuration(500)
       .x(d3.scale.ordinal())
     .xUnits(dc.units.ordinal)
      .colorAccessor(function(d){
          return (d.key[0]);
    })
          
    .colors(function(d){ return gendercolor(d); })
          
      
    .xAxisLabel("Gender")
    .yAxisLabel("No.of Photos")
        .yAxis().ticks(20);
       
  } 
  
  function show_scatter_chart(ndx){
      var ndim=ndx.dimension(dc.pluck('yrsWorking'));
      var work_dim =ndx.dimension(function (d){
                return [d.yrsWorking,d.Photos];
      });
      var minWorking=ndim.bottom(1)[0].yrsWorking;
      var maxWorking=ndim.top(1)[0].yrsWorking;
      
      var work_group=work_dim.group();
      
      dc.scatterPlot('#chart-scatter')
      .width(400)
      .height(300)
      .x(d3.scale.linear().domain([minWorking,maxWorking]))
      .brushOn(false)
      .symbolSize(10)
      .clipPadding(10)
      .yAxisLabel("will")
      .dimension(work_dim)
      .group(work_group)
      .margins({top:10,left:50,bottom:30,right:50});
      
      
  }
  
  
