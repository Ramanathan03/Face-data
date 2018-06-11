queue()
 .defer(d3.csv,"Data/data.csv")
 .await(makeGraphs);
  
  function makeGraphs (error, Photosdata){
      var ndx=crossfilter(Photosdata);
    
    
    
       Photosdata.forEach(function(d){
            d.yrsWorking = parseInt(d['yrsWorking'])
            d.started=parseInt(d.started);
        });
      
      show_data_bar(ndx);
      show_select_bar(ndx);
      show_pie_chart(ndx);
      show_composite_chart(ndx);
      
       dc.renderAll();
        
       
  }
  
 
function show_select_bar(ndx){
     var dim = ndx.dimension(dc.pluck('UsageRank'));
    var group = dim.group();
   
    dc.selectMenu("#selector")
    .dimension(dim)
    .group(group);
    
 }
 
 
       var namecolor= d3.scale.ordinal()
                .domain(["Artist","Athlete","Politician"])
                .range(["#ff6600",  "#ff9933","#9933ff"]);
                
              var gendercolor= d3.scale.ordinal()
                .domain(["male","female"])
                .range(["#ff6600",  "#ff0066"]);
                
                var colorScale = d3.scale.ordinal().domain(["Artist", "Athlete", "Politician"])
                                   .range(["#eeff00", "#ff0022", "#2200ff"]);


      
      function show_pie_chart(ndx){
            var pie_dim=ndx.dimension(dc.pluck('proffesional'));
            var pie_group=pie_dim.group().reduceCount();
            
            dc.pieChart('#pie')
            .height(300)
            .radius(90)
            .transitionDuration(550)
            .dimension(pie_dim)
            .group(pie_group)
            
            
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
  


 
  function show_composite_chart(ndx){
        
  var years_dim = ndx.dimension(function (d){
    return [d.yrsWorking,d.started];
  });
 
  var minYears= years_dim.bottom(1)[0].yrsWorking;
  var maxYears= years_dim.top(1)[0].yrsWorking;
 
  var years_group = years_dim.group().reduceSum(function (d){
      return d.Photos;
  });
 
   
   
  dc.scatterPlot('#chart-composite')

                .width(500)
                .height(300)
                .x(d3.scale.linear().domain([minYears,maxYears]))
                
                  
                  
                .brushOn(false)
                .title(function (d){
                  return "Started"+d.key[1];
                })
                .symbolSize(8)
                .clipPadding(10)
                .yAxisLabel("No of Photos")
                 
         
               
                .dimension(years_dim)
                .group(years_group)
                .margins({top:10 , right:50 , bottom:75, left:75});
               
    
      
     
    
         
  }
  
  
  
