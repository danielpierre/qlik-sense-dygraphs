// Create a single array that contains both dimension and measure label strings
function labelArray(dimensions, measures) {
	var dim = dimensions.map(function(d) {
		return d.title;
	});
	var msr = measures.map(function(d) {
		return d.title;
	});
	return dim.concat(msr);
}

// Get the numeric value for a given row in the qMatrix
function qNumValue(index) {
	return index.qNum;
}

// Split array into sets of three values
function ternion(array) {
	var chunk = 3, sets = [];
	for (var i = 0, j = array.length; i < j; i+= chunk) {
	    sets.push(array.slice(i,i+chunk));
	}
	return sets;
}

// Get the label value for each set of three measures
function setLabel(index) {
	return layout.props.labels.slice(2).indexOf(index) % 3 === 0;
}

// Add alternate legend highlighting style -- This will add class rules to override the current setting.  While in edit mode,
// will not be removed.  If the sheet is saved and reopened, only the most recently selected class rule will remain.
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

// Adjust legend font size
function legendFontSize(layout) {
	if (layout.props.legendFontSize !== '' && typeof layout.props.legendFontSize !== 'undefined') {
		var newCssContent = ' .dygraph-legend { font-size: ' + layout.props.legendFontSize + 'px !important; }';
	}
	else if (layout.props.legendFontSize === '') {
		var newCssContent = ' .dygraph-legend { font-size: 14px !important; }';
	}
	$("<style>").html(newCssContent).appendTo("head");
}

// Set additional options --  these properties do not work with default values
// and should only be set if necessary
function addOptions(layout, measures, options) {
	// Add highlight series properties to options if set in property panel
	if (layout.props.highlightSeriesOpts === true) {
		options.highlightSeriesOpts = {
			strokeWidth: 2,
		    // strokeBorderWidth: 1,
		    highlightCircleSize: 4
		}
	}
	// Add custom bars to options if set in property panel
	if (layout.props.customBars === true && measures.length % 3 === 0) {
		options.customBars = true
	}
	// Add axis title sizes to options if set in property panel
	if (layout.props.axisTitleFontSize !== '' && typeof layout.props.axisTitleFontSize !== 'undefined') {
		options.xLabelHeight = Number(layout.props.axisTitleFontSize) + 2;
		options.yLabelWidth = Number(layout.props.axisTitleFontSize) + 2;
	}
	// Add graph title size to options if set in property panel
	if (layout.props.titleFontSize !== '' && typeof layout.props.titleFontSize !== 'undefined') {
		options.titleHeight = Number(layout.props.titleFontSize) + 8;
	}
	// Add number of digits before decimal to options if set in property panel
	if (layout.props.maxNumberWidth !== '' && typeof layout.props.maxNumberWidth !== 'undefined') {
		options.maxNumberWidth = Number(layout.props.maxNumberWidth);
	}
	// Add number of digits after decimal to options if set in property panel
	if (layout.props.digitsAfterDecimal !== '' && typeof layout.props.digitsAfterDecimal !== 'undefined') {
		options.digitsAfterDecimal = Number(layout.props.digitsAfterDecimal);
	}
	// Add number of digits before decimal to options if set in property panel
	if (layout.props.sigFigs !== '' && typeof layout.props.sigFigs !== 'undefined') {
		options.sigFigs = Number(layout.props.sigFigs);
	}
	// Add axis range padding to options if set in property panel
	if (layout.props.xRangePad !== '' && typeof layout.props.xRangePad !== 'undefined') {
		options.xRangePad = Number(layout.props.xRangePad);
	}
	if (layout.props.yRangePad !== '' && typeof layout.props.yRangePad !== 'undefined') {
		options.yRangePad = Number(layout.props.yRangePad);
	}
}