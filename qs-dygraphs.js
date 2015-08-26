/* dygraphs for Qlik Sense : Copyright (c) 2015 Daniel Pierre.  Released under the MIT license.
 * Release : 1.0
 * Details : https://github.com/danielpierre/qlik-sense-dygraphs
 */

define( ["jquery", "text!./qs-dygraphs.css", "./properties", "./initialproperties", "./qs-dygraphs.utils", "./js/dygraph-combined"
],
function ($, cssContent, props, initProps) {

	'use strict';

	$("<style>").html(cssContent).appendTo("head");

	return {

		// New object properties
		initialProperties : initProps,
		definition : props,
		snapshot : { canTakeSnapshot : true	},
		paint : function ($element, layout) {

			// Create a new array that contains dimensions labels
			var dimensions = layout.qHyperCube.qDimensionInfo.map( function(d) {
				return {
					"title":d.qFallbackTitle
				}
			});

			// Create a new array that contains measures labels
			var measures = layout.qHyperCube.qMeasureInfo.map( function(d) {
				return {
					"title":d.qFallbackTitle
				}
			});

			layout.props.labels = labelArray(dimensions, measures); // Create an array for dimensions and measures labels

		    // Create a new array with a row for each row in the qMatrix
		    var data = layout.qHyperCube.qDataPages[0].qMatrix.map(function(d) {
		        // For each element in the matrix, create a new array that has a value for each dimension and each measure,
				// and convert the dimension value to date format if set in the property panel
				return layout.props.xAxisDataType === 'date' ? [ new Date(d[0].qText) ].concat( d.slice(1).map(qNumValue) )
					   										 : d.map(qNumValue);
		    });

			// Sort the data array on the x-axis values to preserve the original order of data points
			// when switching between x-axis data types
			data.sort((function (index) {
			    return function (a, b) {
			        return ( a[index] === b[index] ? 0 : (a[index] < b[index] ? -1 : 1) );
			    };
			})(0));

			// Group measures into nested arrays of three and reduce the number of labels
			// if custom bars set in property panel
			if (layout.props.customBars === true && measures.length % 3 === 0) {
				data = data.map(function (d) {
					return [d[0]].concat(ternion(d.slice(1)));
				});
				layout.props.labels = layout.props.labels.slice(0,1).concat(layout.props.labels.slice(2).filter(function (index) {
										  return layout.props.labels.slice(2).indexOf(index) % 3 === 0;
									  }));
			}

			// Limit the number of labels to the hypercube width if necessary
			if (layout.qHyperCube.qDataPages[0].qArea.qWidth !== layout.props.labels.length) {
				layout.props.labels = layout.props.labels.slice(0, layout.qHyperCube.qDataPages[0].qArea.qWidth);
			}

			legendHighlightOpts(layout); // Set legend highlighting style
			legendFontSize(layout); // Set legend font size

		    // Map element
		    var width = $element.width();
		    var height = $element.height();
		    var id = "qs-dygraphs-" + layout.qInfo.qId;
		    if (document.getElementById(id)) {	// Remove the element if it has already been created
				$("#" + id).remove();
			}
			$element.append($('<div />;').attr("id", id).width(width).height(height));  // Create the element with the appropiate id and size

			// Render dygraph object
			qsDygraph(
				id,
				layout,
				data,
				dimensions,
				measures
			);

		}  // Paint

	};  // Extension function

}); // Extension definition

// Create a dygraph object
function qsDygraph( id, layout, data, dimensions, measures ) {

	// Apply property panel settings to dygraphs options
	var options = {
      		axisLabelFontSize 	: layout.props.axisLabelFontSize === undefined ? 14
      		                  	: layout.props.axisLabelFontSize === ''        ? 14
      		                  	: Number(layout.props.axisLabelFontSize),
      		drawPoints        	: layout.props.drawPoints,
      		fillGraph 			: layout.props.fillGraph,
      		labels            	: layout.props.labels,
      		labelsKMB 			: layout.props.labelsKMB,
      		labelsKMG2 			: layout.props.labelsKMG2,
      		legend            	: layout.props.legend === true ? 'always' : 'onmouseover',
      		showRangeSelector 	: layout.props.showRangeSelector,
      		stackedGraph      	: layout.props.stackedGraph,
      		stepPlot 			: layout.props.stepPlot,
      		title             	: layout.props.title,
      		xlabel            	: (layout.props.xlabel || ''),
      		ylabel            	: (layout.props.ylabel || ''),
      		axes : {
      			x : { drawGrid : layout.props.drawXGrid },
      			y : { drawGrid : layout.props.drawYGrid }
      		}
    };

    addOptions(layout, measures, options); // Set additional options

	// Create the graph
	var g = new Dygraph(document.getElementById(id),
      	data,
      	options
  	);
}