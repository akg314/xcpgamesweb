google.charts.load('current', {'packages':['corechart'], callback: drawChart});
     // Define rounding utility function
function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
};
    
function on_resize(c,t){onresize=function(){clearTimeout(t);t=setTimeout(c,100)};return c};  
     
function drawChart() {
    chartsLoaded = true; //because executes on load callback
    var myData;
    if (typeof chartData == 'undefined') { 
        setTimeout(function() {drawChart()}, 1000);
        return console.log("trades aren't defined, google charts loaded before data is available. will redraw with call back timer in .1 sec"); 
    } else {
        myData = chartData;
    // Create the data table.
    var data = new google.visualization.DataTable();
    //add all the currencies
    data.addColumn('datetime','Date');
    data.addColumn('number','BCY');
    data.addColumn('number','BTC');
    data.addColumn('number','XCP');
    data.addColumn('number','RUSTBITS');
    data.addColumn('number','JPY');
    data.addColumn('number','USD');
    //add one tooltip column
    data.addColumn({type: 'string', role: 'tooltip'});
    //create info columns to dynamically generate tooltip
    data.addColumn('string','type');
    data.addColumn('number','asset_qty');
    data.addColumn('string','payment');
    data.addColumn('number','payment_qty');
    //add rows
    for (var i = 0; i < myData.length; i++) {
        date = new Date(myData[i].time);
        bcy_price = myData[i].bcy_qty / myData[i].asset_qty;
        btc_price = myData[i].btc_qty / myData[i].asset_qty;
        xcp_price = myData[i].xcp_qty / myData[i].asset_qty;
        rust_price = myData[i].rust_qty / myData[i].asset_qty;
        jpy_price = myData[i].jpy_qty / myData[i].asset_qty;
        usd_price = myData[i].usd_qty / myData[i].asset_qty;
        tooltip = "hi";
        type = myData[i].type;
        asset_qty = myData[i].asset_qty;
        payment = myData[i].payment;
        payment_qty = myData[i].payment_qty;
        data.addRow([date, bcy_price, btc_price, xcp_price, rust_price, jpy_price, usd_price, tooltip, type, asset_qty, payment, payment_qty]);
    }
// Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
    
    // create columns array and add date column for domain
    var columns = [0];
    // display these data series by default
    var defaultSeries = 1;
    //get column # of tooltip col
    var tooltipCol = 7;
    //add the colors you want for each display
    var series = [{color: "#3366CC"}, {color: "#DC3912"}, {color: "#FF9900"},{color: "#109618"}, {color: "#990099"}, {color: "#DD4477"}];
    //push the default series
    columns.push({label: data.getColumnLabel(defaultSeries),
                 type: data.getColumnType(defaultSeries),
                 sourceColumn: defaultSeries});
    //backup its color for later
    series[0].backupColor = series[0].color;
    //push the tooltip column with dynamically generated trade data
    columns.push({
        sourceColumn: 7,
        role: 'tooltip',
        type: 'string',
        properties: {html: true},
        calc: (function () {
            return function (dt, row) {
                //grab vars from data
                var date = dt.getValue(row,0);
                var type = dt.getValue(row,8);
                var asset_qty = dt.getValue(row,9);
                var pmt = dt.getValue(row,10);
                var bcy_price = dt.getValue(row,1);
                var btc_price = dt.getValue(row,2);
                var xcp_price = dt.getValue(row,3);
                var currencyString;
                var pmt_qty = dt.getValue(row,11);
                var price = pmt_qty / asset_qty;
                var color;
                if (type == "sell") { color = '#f2dede' } else {color = '#dff0d8'};
                //white space for subsequent lines
                var whiteSpace = '<span style="color:' + color + '"><strong>' + round(asset_qty,4) + '</strong></span>';
                if (pmt == "BITCRYSTALS") { 
                    pmt = "BCY"; //shorten if paid in bitcrystals
                    currencyString = whiteSpace + ' @ ' + round(btc_price,4) + " BTC" + '<br>' + whiteSpace + ' @ ' +  round(xcp_price,2) + " XCP"
                } else if (pmt == "BTC") {
                    currencyString = whiteSpace + ' @ ' + round(bcy_price,4) + " BCY" + '<br>' + whiteSpace + ' @ ' +  round(xcp_price,2) + " XCP" 
                } else if (pmt == "XCP") {
                    currencyString = whiteSpace + ' @ ' + round(bcy_price,4) + " BCY" + '<br>' + whiteSpace + ' @ ' +  round(btc_price,2) + " BTC"
                } else {
                    currencyString = whiteSpace + ' @ ' + round(bcy_price,4) + " BCY" + '<br>' + whiteSpace + ' @ ' +  round(btc_price,2) + " BTC" + '<br>' + whiteSpace + ' @ ' +  round(xcp_price,2) + " XCP" 
                }; 
                var firstLine = '<strong>' + round(asset_qty,4) + ' @ '+ round(price,4) + ' ' + pmt + '/card' + '</strong>';
                //grab the other currency texts
                return '<div style="padding:5px;white-space:nowrap;background-color:' + color + '">' + firstLine + '<br>' + '<hr style="padding:0px;margin:0px">' + currencyString + '</div>';
            }
        })()
    });
    //push all the columns to be shown in legend to the columns array, i = 1 is the default col so skip it
    for (var i = 2; i < 7; i++) {
        columns.push({
            label: data.getColumnLabel(i),
            type: data.getColumnType(i),
            sourceColumn: i,
            calc: function () {
                return null;
            }
        });
        //back up the colors for these columns and then grey them out in the legend
        series[i-1].backupColor = series[i-1].color;
        series[i-1].color = '#CCCCCC';
    }  
    var options = {
          title: 'Recent Trades - 90 Days',
          chartArea: {top:30, left:50, bottom: 40, height: 350, width:'70%'},
          width: '100%',
          height: 400,
          pointSize: 5,
          series: series,
          tooltip: { isHtml: true },    // CSS styling affects only HTML tooltips.
    }
     // Create a view with the default data
    var view = new google.visualization.DataView(data);
    view.setRows(data.getFilteredRows([{column: 0, minValue: new Date(Date.now() - 7.884e9)}])); //filter data to start to 3 months before today's date
    view.setColumns(columns); //set columns using the ones selected
    chart.draw(view, options);
}

function showHideSeries () {
    var sel = chart.getSelection();
    if (sel.length > 0) {
        if (sel[0].row == null) {
            var col = sel[0].column;
            var col = columns[col].sourceColumn;
            if (series[col - 1].color !== "#CCCCCC") { //if its not greyed on legend, it's already displayed
                console.log("Already displayed.");
            }
            else {
                columns = [0]; //reset columns array
                //iterate over all the display columns
                for (var i = 1; i < 7; i++) {
                    if (i == col) {
                        columns.push(i);
                        columns.push({
                            sourceColumn: 7,
                            role: 'tooltip',
                            type: 'string',
                            properties: {html: true}, 
                            calc: (function () {
                                return function (dt, row) {
                                        var date = dt.getValue(row,0);
                                        var type = dt.getValue(row,8);
                                        var asset_qty = dt.getValue(row,9);
                                        var pmt = dt.getValue(row,10);
                                        var bcy_price = dt.getValue(row,1);
                                        var btc_price = dt.getValue(row,2);
                                        var xcp_price = dt.getValue(row,3);
                                        var currencyString;
                                        var pmt_qty = dt.getValue(row,11);
                                        var price = pmt_qty / asset_qty;
                                        var color;
                                        if (type == "sell") { color = '#f2dede' } else {color = '#dff0d8'};
                                        //white space for subsequent lines
                                        var whiteSpace = '<span style="color:' + color + '"><strong>' + round(asset_qty,4) + '</strong></span>';
                                        if (pmt == "BITCRYSTALS") { 
                                            pmt = "BCY"; //shorten if paid in bitcrystals
                                            currencyString = whiteSpace + ' @ ' + round(btc_price,4) + " BTC" + '<br>' + whiteSpace + ' @ ' +  round(xcp_price,2) + " XCP"
                                        } else if (pmt == "BTC") {
                                            currencyString = whiteSpace + ' @ ' + round(bcy_price,4) + " BCY" + '<br>' + whiteSpace + ' @ ' +  round(xcp_price,2) + " XCP" 
                                        } else if (pmt == "XCP") {
                                            currencyString = whiteSpace + ' @ ' + round(bcy_price,4) + " BCY" + '<br>' + whiteSpace + ' @ ' +  round(btc_price,2) + " BTC"
                                        } else {
                                            currencyString = whiteSpace + ' @ ' + round(bcy_price,4) + " BCY" + '<br>' + whiteSpace + ' @ ' +  round(btc_price,2) + " BTC" + '<br>' + whiteSpace + ' @ ' +  round(xcp_price,2) + " XCP" 
                                        }; 
                                        var firstLine = '<strong>' + round(asset_qty,4) + ' @ '+ round(price,4) + ' ' + pmt + '/card' + '</strong>';
                                        //grab the other currency texts
                                        
                                        return '<div style="padding:5px;white-space:nowrap;background-color:' + color + '">' + firstLine + '<br>' + '<hr style="padding:0px;margin:0px">' + currencyString + '</div>';
                                    }
                                })()
                        }); //push tooltip Col right after the one to display
                        series[i-1].color = series[i-1].backupColor; //change its color
                    } else { //hide it if it's not the one we selected
                            columns.push({
                            label: data.getColumnLabel(i),
                            type: data.getColumnType(i),
                            sourceColumn: i,
                            calc: function () {
                                return null;
                            }
                        })
                        series[i-1].color = '#CCCCCC';
                    }
                }
            }
        }
        console.log(columns);
        //redraw the graph view based on the updates
        var view = new google.visualization.DataView(data);
        view.setRows(data.getFilteredRows([{column: 0, minValue: new Date(Date.now() - 7.884e9)}])); //filter data to start to 3 months before today's date
        view.setColumns(columns);
        chart.draw(view, options);
        }
    }
    google.visualization.events.addListener(chart, 'select', showHideSeries);
};
              
  

on_resize(function() {
    if (typeof chartsLoaded == 'undefined') {
    console.log("window resized. library not loaded.")
    } else {
        drawChart(chartData); //TO DO: add window parameters to draw chart based on new sizing
    }
})();
