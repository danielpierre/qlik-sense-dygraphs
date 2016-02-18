/*** Helper functions ***/

// Calculate statistics for a boxplot chart from a set of values
function boxplotStats(vals) {
    var half, values, min, max, median, h1, h2, q1, q3, iqr;

    values = vals.concat()
                 .sort(function (a, b) { return a - b; })
                 .filter(function (d) { return d !== null && typeof d !== 'undefined'; });

    min = Math.min.apply(Math, values);
    max = Math.max.apply(Math, values);

    half = Math.floor(values.length/2);
    h1 = values.slice(0,half);

    // median and h2
    if (values.length % 2) {  // remainder
        median = values[half]; // value at 'half' index
        h2 = values.slice(half+1);
    }
    else {
        median = (values[half-1] + values[half]) / 2.0;
        h2 = values.slice(half);
    }

    // quartiles
    half = Math.floor(h1.length/2);
    q1 = h1.length % 2 ? h1[half] : (h1[half-1] + h1[half]) / 2.0;
    half = Math.floor(h2.length/2);
    q3 = h2.length % 2 ? h2[half] : (h2[half-1] + h2[half]) / 2.0;
    iqr = q3 - q1

    return [ min, q1, median, q3, max, iqr ];
}

// Replace null values in the x-axis domain array with data series values ('Dimension2' input)
function fillData(layout, data, domain, series) {
    var x, d, s;
    for (x = domain.length; x--;) {  // For each row in the x-domain
        for (d = data.length; d--;) { // iterate over each row in data
            s = series.indexOf(data[d][1]) + 1; // look up the data series index for the y-value
            if (data[d][0] === domain[x][0]) { // if x-values match
                domain[x][s] = data[d][2];     // assign the y-value to the x-domain row at the series index
            }
        } // data row
    } // x-domain row

    // Replace null values with arrays of null values if error bars set in property panel
    if (layout.props.customBars === true) {
        domain = domain.map(function (d) {
            return d.map(function (i) {
                return i === null ? [null, null, null] : i
            });
        });
    }
    // Convert the x-values to date format if set in the property panel
    return layout.props.xAxisDataType === 'date' ? domain.map(function (d) { return [ new Date(d[0]) ].concat( d.slice(1) ) })
                                                 : domain;
}

// Adjust legend font size -- This will add a class rule to override the current setting.
// While in edit mode, the existing class rule will not be removed.
// If the sheet is saved and reopened, only the most recently selected class rule will remain.
function legendFontSize(layout) {
    var newCssContent;
    if (layout.props.legendFontSize !== '') {
        newCssContent = ' .dygraph-legend { font-size: ' + layout.props.legendFontSize + 'px !important; }';
    }
    else {
        newCssContent = ' .dygraph-legend { font-size: 14px !important; }';
    }
    $("<style>").html(newCssContent).appendTo("head");
}

// Apply legend highlighting style -- This will add class rules to override the current setting.
// While in edit mode, existing class rules will not be removed.
// If the sheet is saved and reopened, only the most recently selected class rule will remain.
function legendHighlightOpts(layout) {
    var newCssContent;
    switch (layout.props.legendHighlightOpts) {
        case 'fill':
            newCssContent = ' .dygraph-legend > span { display: inline; }' +
                            ' .dygraph-legend > span.highlight { border: none; background-color: #f1f1f1; } ';
            break;
        case 'single':
            newCssContent = ' .dygraph-legend > span { display: none; }' +
                            ' .dygraph-legend > span.highlight { display: inline; border: none; background-color: initial; } ';
            break;
        default:
            newCssContent = ' .dygraph-legend > span { display: inline; }' +
                            ' .dygraph-legend > span.highlight { border: 1px solid grey; background-color: initial; } ';
    }
    $("<style>").html(newCssContent).appendTo("head");
}

// Map element
function mapElement($element, layout) {
    var width = $element.width(),
        height = $element.height(),
        id = "qs-dygraphs-" + layout.qInfo.qId;
    // Remove the element if it has already been created
    if (document.getElementById(id)) {
        $("#" + id).remove();
    }
    // Create the element with the appropiate id and size
    $element.append($('<div />;').attr("id", id).width(width).height(height));
    return id;
}

// Create an array from comma-separated list of colors
function parseColors(input) {
    var colors, i;
    colors = input.toLowerCase().split(',').map(function (v) {
        return v.trim();
    });
    for (i = 0; i < colors.length; i++) {
        if (colors[i].indexOf('rgb(') !== -1) {
            colors[i] = colors.slice(i, i + 3).join();
            colors.splice(i + 1, 2);
        }
    }
    return colors;
}

// Create an array from input of comma-separated date strings
function parseDateRange(input) {
    return input.split(',').map(function (v) {
        return Date.parse(v.trim());
    });
}

// Create an array from input of comma-separated numbers
function parseRange(input) {
    return input.split(',').map(function (v) {
        return +v.trim();
    });
}

// Return the name of a month from its numeric index
function monthName(m) {
    var month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return month[m];
}

// Return the name of a weekday from its numeric index
function weekdayName(d) {
    var weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    return weekday[d];
}

/*** dygraphs rendering functions ***/

// Set additional options -- these properties do not work with default values
// and should only be set if necessary
function addOptions(layout, data, options, measures) {

    // Add axis title sizes to options if set in property panel
    if (layout.props.axisTitleFontSize !== '') {
        options.xLabelHeight = +layout.props.axisTitleFontSize + 2;
        options.yLabelWidth = +layout.props.axisTitleFontSize + 2;
    }
    // Override the default color palette if set in the property panel
    if (layout.props.colors !== '') {
        options.colors = parseColors(layout.props.colors);
    }
    // Set the horizontal range of the graph to [earliest, latest] or [low, high] if set in the property panel
    if (layout.props.dateWindow !== '') {
        options.dateWindow = layout.props.xAxisDataType === 'date' ? parseDateRange(layout.props.dateWindow)
                                                                   : parseRange(layout.props.dateWindow);
    }
    // Add max number of digits after decimal to options if set in property panel
    if (layout.props.digitsAfterDecimal !== '') {
        options.digitsAfterDecimal = +layout.props.digitsAfterDecimal;
    }
    // Draw gridlines for the secondary y-axis
    if (layout.props.drawY2Grid === true) {
        options.axes.y2 = options.axes.y2 || {};
        options.axes.y2.drawGrid = true;
        options.axes.y2.gridLinePattern = [2,2];
    }
    // Add fixed number of digits after decimal to options if set in property panel
    if (layout.props.fixedDigitsAfterDecimal != '') {
        options.axes.y.axisLabelFormatter = fixedDigitsAfterDecimal;
        options.axes.y.valueFormatter = fixedDigitsAfterDecimal;
    }
    // Disable zoom if set in the property panel and initiate pan with click-drag instead
    // (default interaction model for rangeSelector)
    if (layout.props.fixedZoom === true) {
        options.interactionModel = Dygraph.Interaction.dragIsPanInteractionModel;
    }
    // Add highlight series properties to options if set in property panel
    if (layout.props.highlightSeriesOpts === true) {
        options.highlightSeriesOpts = {
            strokeWidth: 2,
            // strokeBorderWidth: 1,
            highlightCircleSize: 4
        }
    }
    // Plot ticks for y-axes independently rather than aligning them
    if (layout.props.independentTicks === true) {
        options.axes.y2 = options.axes.y2 || {};
        options.axes.y2.independentTicks = true;
    }
    // Add number of digits before decimal to options if set in property panel
    if (layout.props.maxNumberWidth !== '') {
        options.maxNumberWidth = +layout.props.maxNumberWidth;
    }
    // Plot as a bar chart if set in the property panel
    if (layout.props.plotter === 'bar') {
        options.plotter = barChartPlotter;
    }
    // Plot as a multi-column bar chart if set in the property panel
    if (layout.props.plotter === 'multibar') {
        options.plotter = multiColumnBarPlotter;
    }
    // Plot as a candlestick chart if set in the property panel
    if (layout.props.plotter === 'candle' && measures.length === 4) {
        options.plotter = candlePlotter;
    }
    // Plot as a boxplot chart if set in the property panel
    if (layout.props.plotter === 'boxplot') {
        options.plotter = boxPlotter;
    }
    // Add number of digits before decimal to options if set in property panel
    if (layout.props.sigFigs !== '') {
        options.sigFigs = +layout.props.sigFigs;
    }
    // Apply line smoothing if set in property panel
    if (layout.props.smoothing > 0) {
        smoothPlotter.smoothing = layout.props.smoothing; // set smoothing amount
        // Apply smoothing to each data series
        layout.props.labels.slice(1).forEach(function (label) {
            options.series[label] = { plotter: smoothPlotter };
        });
    }
    // Use custom display formats for date labels on the x-axis and in the legend if set in the property panel
    if (layout.props.tickerLabelFormat !== 'auto' && layout.props.xAxisDataType === 'date') {
        // Display custom date format in the legend
        options.axes.x.valueFormatter = dateValueFormatter;

        if (layout.props.tickerLabelFormat === 'year' ||
            layout.props.tickerLabelFormat === 'month' ||
            layout.props.tickerLabelFormat === 'weekday') {
            // Generate one tick mark and label per value in the x-value range
            // and display the date with a custom format
            options.axes.x.ticker = dateTicker;
        } else {
            // Display custom date format for x-axis labels and
            // generate tick marks using the default Dygraph.dateTicker
            options.axes.x.axisLabelFormatter = dateAxisLabelFormatter;
            /*** Increase x-axis label width ***/
            options.axes.x.axisLabelWidth = 78;
        }
    }
    // Add graph title size to options if set in property panel
    if (layout.props.titleFontSize !== '') {
        options.titleHeight = +layout.props.titleFontSize + 8;
    }
    // Set the vertical range of the graph to [low, high] if set in the property panel
    if (layout.props.valueRange !== '') {
        options.valueRange = parseRange(layout.props.valueRange);
    }
    // Add axis range padding to options if set in property panel
    if (layout.props.xRangePad !== '') {
        options.xRangePad = +layout.props.xRangePad;
    }
    if (layout.props.yRangePad !== '') {
        options.yRangePad = +layout.props.yRangePad;
    }

    // Provide custom display formats for the date label in the legend
    function dateValueFormatter(ms) {
        var date = new Date(ms),
            format = layout.props.tickerLabelFormat,
            labelsUTC = layout.props.labelsUTC,
            day, month, year;

        // Set the date to UTC time in order to display the correct year/month/weekday
        // when affected by timezone offset (e.g when timezone offset is negative and
        // input dates only include the year). Otherwise, use local time.
        if (labelsUTC === true) {
            date = new Date( date.getTime() + (date.getTimezoneOffset() * 60000) );
        }

        day = date.getDate().toString();
        month = (date.getMonth() + 1).toString();
        year = date.getFullYear().toString();

        switch (format) {
            case 'mm/dd/yyyy':
                return (month[1] ? month : '0' + month[0] ) + '/' + (day[1] ? day : '0' + day[0] ) + '/' + year;
            case 'dd/mm/yyyy':
                return (day[1] ? day : '0' + day[0] ) + '/' + (month[1] ? month : '0' + month[0] ) + '/' + year;
            case 'year':
                return date.getFullYear();
            case 'month':
                return monthName( date.getMonth() );
            case 'weekday':
                return weekdayName( date.getDay() );
        }
    }
    // Provide custom display formats for date labels on the x-axis
    function dateAxisLabelFormatter(d) {
        var format = layout.props.tickerLabelFormat,
            labelsUTC = layout.props.labelsUTC,
            day, month, year;

        // Set the date to UTC time in order to display the correct year/month/weekday
        // when affected by timezone offset (e.g when timezone offset is negative and
        // input dates only include the year). Otherwise, use local time.
        if (labelsUTC === true) {
            d = new Date( d.getTime() + (d.getTimezoneOffset() * 60000) );
        }

        day = d.getDate().toString();
        month = (d.getMonth() + 1).toString();
        year = d.getFullYear().toString();

        if (format === 'mm/dd/yyyy') {
            return (month[1] ? month : '0' + month[0] ) + '/' + (day[1] ? day : '0' + day[0] ) + '/' + year;
        }
        else { // 'dd/mm/yyyy'
            return (day[1] ? day : '0' + day[0] ) + '/' + (month[1] ? month : '0' + month[0] ) + '/' + year;
        }

    };
    // Provide custom formats for date labels on the x-axis and generate one tick mark per label
    function dateTicker(min, max, pixels, opts, dygraph, vals) {
        var format = layout.props.tickerLabelFormat,
            labelsUTC = layout.props.labelsUTC,
            tDates;

        // Set the date to UTC time in order to display the correct year/month/weekday
        // when affected by timezone offset (e.g when timezone offset is negative and
        // input dates only include the year). Otherwise, use local time.
        tDates = data.map(function (d) {
            return labelsUTC === true ? new Date( d[0].getTime() + (d[0].getTimezoneOffset() * 60000) )
                                      : d[0]
            ;
        });

        // Display year only
        if (format === 'year') {
            return tDates.map(function (d) {
                return { 'v': d, 'label': d.getFullYear() };
            });
        }
        // Display month name only
        else if (format === 'month') {
            return tDates.map(function (d) {
                return { 'v': d, 'label': monthName( d.getMonth() ) };
            });
        }
        // Display weekday name only
        else { // (format === 'weekday')
            return tDates.map(function (d) {
                return { 'v': d, 'label': weekdayName( d.getDay() ) };
            });
        }
    }
    // Fix the number of digits after the decimal to a specified number for non-zero values
    function fixedDigitsAfterDecimal(y) {
        var digits = layout.props.fixedDigitsAfterDecimal;
        return y === 0 ? y : y.toFixed(digits);
    }
}

// Create a dygraph object
function qsDygraph(id, layout, data, measures) {

    var options, g;

    // Apply property panel settings to dygraphs options
    options = {
        animatedZooms          : layout.props.animatedZooms,
        axisLabelFontSize      : layout.props.axisLabelFontSize === '' ? 14
                               : +layout.props.axisLabelFontSize,
        connectSeparatedPoints : layout.props.connectSeparatedPoints,
        customBars             : layout.props.customBars,
        drawPoints             : layout.props.drawPoints,
        fillGraph              : layout.props.fillGraph,
        highlightCircleSize    : layout.props.highlightCircleSize === '' ? 3
                               : +layout.props.highlightCircleSize,
        labels                 : layout.props.labels,
        labelsKMB              : layout.props.labelsKMB,
        labelsKMG2             : layout.props.labelsKMG2,
        labelsSeparateLines    : layout.props.labelsSeparateLines,
        labelsUTC              : layout.props.labelsUTC,
        legend                 : layout.props.legend === 'never' ? 'onmouseover'
                               : layout.props.legend,
        panEdgeFraction        : +layout.props.panEdgeFraction,
        pointSize              : layout.props.pointSize === '' ? 1
                               : +layout.props.pointSize,
        showLabelsOnHighlight  : layout.props.legend === 'never' ? false
                               : true,
        showRangeSelector      : layout.props.showRangeSelector,
        stackedGraph           : layout.props.stackedGraph,
        stepPlot               : layout.props.stepPlot,
        strokeBorderColor      : layout.props.strokeBorderColor || 'white',
        strokeBorderWidth      : +layout.props.strokeBorderWidth || null,
        strokePattern          : layout.props.strokePattern === 'dashed'   ? [7, 3] // Dygraph.DASHED_LINE
                               : layout.props.strokePattern === 'alt-dash' ? [10, 2, 5, 2]
                               : layout.props.strokePattern === 'dotted'   ? [2, 2] // Dygraph.DOTTED_LINE
                               : layout.props.strokePattern === 'dot-dash' ? [7, 2, 2, 2] // Dygraph.DOT_DASH_LINE
                               : null,
        strokeWidth            : layout.props.strokeWidth === '' ? 1.0
                               : +layout.props.strokeWidth,
        title                  : layout.props.title,
        xlabel                 : layout.props.xlabel,
        ylabel                 : layout.props.ylabel,
        y2label                : layout.props.y2label,
        axes : {
            x : { drawGrid : layout.props.drawXGrid },
            y : { drawGrid : layout.props.drawYGrid }
        },
        series : layout.props.dataSeries || {} // initialize series object if no per-series options are set
    };

    addOptions(layout, data, options, measures); // Set additional options

    // Create the graph
    g = new Dygraph(document.getElementById(id),
        data,
        options
    );

}

/*** Callback functions for senseUtils.pageExtensionData ***/

// Render the chart object - 'Dimension2' input
function renderD($element, layout, fullMatrix) {

    var qMatrix, dimensions, measures, data, dataSeries, xDomain, id;

    // Create an array that contains the complete qMatrix
    qMatrix = fullMatrix;

    // Create a new array that contains dimensions labels
    dimensions = layout.qHyperCube.qDimensionInfo.map(function (d) {
        return d.qFallbackTitle;
    });

    // Create a new array that contains measures labels
    measures = layout.qHyperCube.qMeasureInfo.map(function (d) {
        return d.qFallbackTitle;
    });

    // Create a new array with a row for each row in the qMatrix
    data = qMatrix.map(function (d) {
        /**
         * For each element in the matrix, create a new array that has a value for each dimension and each measure.
         * Convert non-numeric values to null and use the string value of the first dimension if date is set for
         * the x-axis in the property panel.
         * If custom bars are set, create a nested array for each measure that contains the low value, the measure itself,
         * and the high value.
         * Substitute the measure value for either the low or high value if not set.  This allows an error bar to be shown
         * either above or below the series.  Error bars will be drawn above and below the series if both expressions are set.
         * The data series will be drawn by itself if neither expression is set.
         */
        if (layout.props.customBars === true) {
            return layout.props.xAxisDataType === 'date'
                 ? [ d[0].qText ]
                       .concat( [d[1].qText] )
                       .concat( d.slice(2).map(function (index) {
                           return [
                               !isNaN(index.qAttrExps.qValues[0].qNum) ? index.qAttrExps.qValues[0].qNum : !isNaN(index.qNum) ? index.qNum : null,
                               !isNaN(index.qNum) ? index.qNum : null,
                               !isNaN(index.qAttrExps.qValues[1].qNum) ? index.qAttrExps.qValues[1].qNum : !isNaN(index.qNum) ? index.qNum : null
                           ];
                       }))
                 : [ d[0].qNum ]
                       .concat( [d[1].qText] )
                       .concat( d.slice(2).map(function (index) {
                           return [
                               !isNaN(index.qAttrExps.qValues[0].qNum) ? index.qAttrExps.qValues[0].qNum : !isNaN(index.qNum) ? index.qNum : null,
                               !isNaN(index.qNum) ? index.qNum : null,
                               !isNaN(index.qAttrExps.qValues[1].qNum) ? index.qAttrExps.qValues[1].qNum : !isNaN(index.qNum) ? index.qNum : null
                           ];
                       }))
            ;
        }
        else {
            return layout.props.xAxisDataType === 'date'
                 ? [ d[0].qText ]
                       .concat( [d[1].qText] )
                       .concat( d.slice(2).map(function (index) {
                           return isNaN(index.qNum) ? null : index.qNum;
                       }))
                 : [ d[0].qNum ]
                       .concat( [d[1].qText] )
                       .concat( d.slice(2).map(function (index) {
                           return isNaN(index.qNum) ? null : index.qNum;
                       }))
            ;
        }
    });

    // Determine the data series to be displayed (unique values of second dimension)
    dataSeries = data.reduce(function (a, d) {
            if (a.indexOf(d[1]) < 0) a.push(d[1]);
            return a;
    }, []);

    // Create an array for data series labels
    layout.props.labels = [ dimensions[0] ].concat(dataSeries);

    // Determine the domain of the x-axis (unique values of first dimension)
    // and create a new array that contains a row for each unique x-value.
    // In each row, place a null value for each data series.
    xDomain = data.reduce(function (a, d) {
            if (a.indexOf(d[0]) < 0) a.push(d[0]);
            return a;
    }, []).map(function (d) {
        return [d].concat(dataSeries.map(function (d) { return null; }));
    });

    data = fillData(layout, data, xDomain, dataSeries); // replace null values in data array where data points exist

    // Sort the data array on the x-axis values to preserve the original order of data points
    // when switching between x-axis data types
    data.sort((function (index) {
        return function (a, b) {
            return ( a[index] === b[index] ? 0 : (a[index] < b[index] ? -1 : 1) );
        };
    })(0));

    // If boxplot chart is selected in the property panel,
    // calculate boxplot statistics for the set of y-values
    // at each x-value and use corresponding labels
    if (layout.props.plotter === 'boxplot') {
        data = data.map(function (d) {
            return d.slice(0,1).concat( boxplotStats(d.slice(1)) )
        });
        layout.props.labels = [ dimensions[0] ].concat( ['Min', 'Q1', 'Median', 'Q3', 'Max', 'IQR'] );
    }

    legendHighlightOpts(layout); // Set legend highlighting style
    legendFontSize(layout); // Set legend font size
    id = mapElement($element, layout); // Map element and assign it an id

    // Render dygraph object when the appropriate number
    // of dimensions and measures have been set
    if (dimensions.length === 2 && measures.length === 1) {
        qsDygraph(
            id,
            layout,
            data,
            measures
        );
    }

    // Render dygraph object
    qsDygraph(
        id,
        layout,
        data,
        measures
    );

}

// Render chart object - 'Measures' input
function renderM($element, layout, fullMatrix) {

    var qMatrix, dimensions, measures, data, id;

    // Create an array that contains the complete qMatrix
    qMatrix = fullMatrix;

    // Create a new array that contains dimensions labels
    dimensions = layout.qHyperCube.qDimensionInfo.map(function (d) {
        return d.qFallbackTitle;
    });

    // Create a new array that contains measures labels
    measures = layout.qHyperCube.qMeasureInfo.map(function (d) {
        return d.qFallbackTitle;
    });

    layout.props.labels = dimensions.concat(measures); // Create an array for dimensions and measures labels

    data = qMatrix.map(function (d) {
        /**
         * For each element in the matrix, create a new array that has a value for the dimension and each measure.
         * Convert non-numeric values to null and convert the dimension value to date format if set in the property panel.
         * If custom bars are set, create a nested array for each measure that contains the low value, the measure itself,
         * and the high value.
         * Substitute the measure value for either the low or high value if not set.  This allows an error bar to be shown
         * either above or below the series.  Error bars will be drawn above and below the series if both expressions are set.
         * The data series will be drawn by itself if neither expression is set.
         */
        if (layout.props.customBars === true) {
            return layout.props.xAxisDataType === 'date'
                 ? [ new Date(d[0].qText) ].concat( d.slice(1).map(function (index) {
                       return [ !isNaN(index.qAttrExps.qValues[0].qNum) ? index.qAttrExps.qValues[0].qNum : !isNaN(index.qNum) ? index.qNum : null,
                                !isNaN(index.qNum) ? index.qNum : null,
                                !isNaN(index.qAttrExps.qValues[1].qNum) ? index.qAttrExps.qValues[1].qNum : !isNaN(index.qNum) ? index.qNum : null
                              ]
                   }))
                 : [ d[0].qNum ].concat( d.slice(1).map(function (index) {
                       return [ !isNaN(index.qAttrExps.qValues[0].qNum) ? index.qAttrExps.qValues[0].qNum : !isNaN(index.qNum) ? index.qNum : null,
                                !isNaN(index.qNum) ? index.qNum : null,
                                !isNaN(index.qAttrExps.qValues[1].qNum) ? index.qAttrExps.qValues[1].qNum : !isNaN(index.qNum) ? index.qNum : null
                              ]
                   }))
            ;
        }
        else {
            return layout.props.xAxisDataType === 'date' ? [ new Date(d[0].qText) ].concat( d.slice(1).map(function (index) { return isNaN(index.qNum) ? null : index.qNum }) )
                                                         : d.map(function (index) { return isNaN(index.qNum) ? null : index.qNum });
        }
    });

    // Sort the data array on the x-axis values to preserve the original order of data points
    // when switching between x-axis data types
    data.sort((function (index) {
        return function (a, b) {
            return ( a[index] === b[index] ? 0 : (a[index] < b[index] ? -1 : 1) );
        };
    })(0));

    // Create an object for each measure that contains per-series properties
    layout.props.dataSeries = layout.qHyperCube.qMeasureInfo.reduce(function (o, d) {

        o[d.qFallbackTitle] = {
            'axis'                : d.props.axis,
            'color'               : d.props.color,
            'drawPoints'          : d.props.drawPoints,
            'fillGraph'           : d.props.fillGraph,
            'highlightCircleSize' : d.props.highlightCircleSize === '' ? 3
                                  : +d.props.highlightCircleSize,
            'plotter'             : d.props.plotter === 'bar'   ? barChartPlotter
                                  : Dygraph.Plotters.linePlotter,
            'pointSize'           : d.props.pointSize === '' ? 1
                                  : +d.props.pointSize,
            'stepPlot'            : d.props.stepPlot,
            'strokeBorderColor'   : d.props.strokeBorderColor || 'white',
            'strokeBorderWidth'   : +d.props.strokeBorderWidth || null,
            'strokePattern'       : d.props.strokePattern === 'dashed'   ? [7, 3] // Dygraph.DASHED_LINE
                                  : d.props.strokePattern === 'alt-dash' ? [10, 2, 5, 2]
                                  : d.props.strokePattern === 'dotted'   ? [2, 2] // Dygraph.DOTTED_LINE
                                  : d.props.strokePattern === 'dot-dash' ? [7, 2, 2, 2] // Dygraph.DOT_DASH_LINE
                                  : null,
            'strokeWidth'         : d.props.strokeWidth === '' ? 1.0
                                  : +d.props.strokeWidth
        };

        // Remove option properties for a data series which are set to default values.
        // This will prevent per-series default options from overriding global options,
        // which should take precedence if per-series options are not set.
        if (o[d.qFallbackTitle].color === '') { delete o[d.qFallbackTitle].color; }
        if (o[d.qFallbackTitle].drawPoints === false) { delete o[d.qFallbackTitle].drawPoints; }
        if (o[d.qFallbackTitle].fillGraph === false) { delete o[d.qFallbackTitle].fillGraph; }
        if (o[d.qFallbackTitle].highlightCircleSize === 3) { delete o[d.qFallbackTitle].highlightCircleSize; }
        if (o[d.qFallbackTitle].plotter === Dygraph.Plotters.linePlotter) { delete o[d.qFallbackTitle].plotter; }
        if (o[d.qFallbackTitle].pointSize === 1) { delete o[d.qFallbackTitle].pointSize; }
        if (o[d.qFallbackTitle].stepPlot === false) { delete o[d.qFallbackTitle].stepPlot; }
        if (o[d.qFallbackTitle].strokeBorderColor === 'white') { delete o[d.qFallbackTitle].strokeBorderColor; }
        if (o[d.qFallbackTitle].strokeBorderWidth === null) { delete o[d.qFallbackTitle].strokeBorderWidth; }
        if (o[d.qFallbackTitle].strokePattern === null) { delete o[d.qFallbackTitle].strokePattern; }
        if (o[d.qFallbackTitle].strokeWidth === 1.0) { delete o[d.qFallbackTitle].strokeWidth; }

        // Apply line smoothing if set in the property panel
        if (d.props.smoothing > 0) {
            smoothPlotter.smoothing = d.props.smoothing; // set smoothing amount
            o[d.qFallbackTitle].plotter = smoothPlotter; // apply smoothing
        }

        return o;

    }, {});

    // Limit the number of labels to the hypercube width if necessary (100+ measures)
    if (layout.qHyperCube.qDataPages[0].qArea.qWidth !== layout.props.labels.length) {
        layout.props.labels = layout.props.labels.slice(0, layout.qHyperCube.qDataPages[0].qArea.qWidth);
    }

    legendHighlightOpts(layout); // Set legend highlighting style
    legendFontSize(layout); // Set legend font size
    id = mapElement($element, layout); // Map element and assign it an id

    // Render dygraph object
    qsDygraph(
        id,
        layout,
        data,
        measures
    );

}