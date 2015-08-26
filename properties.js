define([], function () {

	"use strict";

	// Dimensions and Measures
	var dimensions = {
        uses: "dimensions",
        min: 1,
        max: 1
    };

    var measures = {
        uses: "measures",
        min: 1
    };

    // Add-ons Section - Data Handling
    var addons = {
		uses: "addons",
		items: {
			dataHandling: {
				uses: "dataHandling"
			}
		}
	}

    // Appearance Section
    var appearance = {
        uses: "settings"
    };

    // Main Property Panel Definition
	var dygraphsSettings = {
		component: "expandable-items",
		label: "Graph Options",
		items: {
        	Labels: {
        		type: "items",
        		label: "Labels",
        		items: {
        			GraphTitle: {
						type: "string",
						ref: "props.title",
						label: "Graph Title"
					},
					GraphTitleFontSize: {
						type: "string",
						ref: "props.titleFontSize",
						label: "Graph Title Font Size"
					},
        			xAxisTitle: {
						type: "string",
						ref: "props.xlabel",
						label: "x-Axis Title",
						expression: "optional"
					},
					yAxisTitle: {
						type: "string",
						ref: "props.ylabel",
						label: "y-Axis Title",
						expression: "optional"
					},
					AxisTitleFontSize: {
						type: "string",
						ref: "props.axisTitleFontSize",
						label: "Axis Title Font Size"
					},
					AxisLabelFontSize: {
						type: "string",
						ref: "props.axisLabelFontSize",
						label: "Axis Label Font Size"
					},
					LegendFontSize: {
						type: "string",
						ref: "props.legendFontSize",
						label: "Legend Font Size"
					},
					LegendHighlight: {
						type: "string",
						component:"dropdown",
						ref: "props.legendHighlightOpts",
						label: "Legend Highlight Style",
						options: [{
							label: "Border",
							value: "border"
						}, {
							label: "Fill",
							value: "fill"
						}, {
							label: "Single Series",
							value: "single"
						}],
						defaultValue: "border"
					},
					MaxNumberWidth: {
						type: "string",
						ref: "props.maxNumberWidth",
						label: "Digits Before Decimal"
					},
					DigitsAfterDecimal: {
						type: "string",
						ref: "props.digitsAfterDecimal",
						label: "Digits After Decimal"
					},
					SigFigs: {
						type: "string",
						ref: "props.sigFigs",
						label: "Significant Digits (Scientific Mode)"
					},
					LabelsKMB: {
						type: "boolean",
						component: "switch",
						ref: "props.labelsKMB",
						label: "Show K/M/B for thousands/millions/billions (base 10) on y-axis",
						options: [{
							value: true,
							label: "On"
						}, {
							value: false,
							label: "Off"
						}],
						defaultValue: false
					},
					LabelsKMG2: {
						type: "boolean",
						component: "switch",
						ref: "props.labelsKMG2",
						label: "Show k/M/G for kilo/Mega/Giga (base 2) on y-axis",
						options: [{
							value: true,
							label: "On"
						}, {
							value: false,
							label: "Off"
						}],
						defaultValue: false
					}
        		}
        	},
        	Display: {
        		type: "items",
        		label: "Display",
        		items: {
        			xAxisDataType: {
						type: "string",
						component:"dropdown",
						ref: "props.xAxisDataType",
						label: "x-Axis Data Type",
						options: [{
							label: "Numeric",
							value: "numeric"
						}, {
							label: "Date",
							value: "date"
						}],
						defaultValue: "numeric"
					},
					Legend: {
						type: "boolean",
						ref: "props.legend",
						label: "Always Show Legend",
						defaultValue: false
					},
					CustomBars: {
						type: "boolean",
						component: "switch",
						ref: "props.customBars",
						label: "Error Bars (for measures | 3)",
						options: [{
							value: true,
							label: "On"
						}, {
							value: false,
							label: "Off"
						}],
						defaultValue: false
					},
					DataPoints: {
						type: "boolean",
						component: "switch",
						ref: "props.drawPoints",
						label: "Data Points",
						options: [{
							value: true,
							label: "On"
						}, {
							value: false,
							label: "Off"
						}],
						defaultValue: false
					},
					HighlightSeries: {
						type: "boolean",
						component: "switch",
						ref: "props.highlightSeriesOpts",
						label: "Highlight Closest Series",
						options: [{
							value: true,
							label: "On"
						}, {
							value: false,
							label: "Off"
						}],
						defaultValue: false
					},
					RangeSlider: {
						type: "boolean",
						component: "switch",
						ref: "props.showRangeSelector",
						label: "Range Selector",
						options: [{
							value: true,
							label: "On"
						}, {
							value: false,
							label: "Off"
						}],
						defaultValue: false
					},
					FillGraph: {
						type: "boolean",
						component: "switch",
						ref: "props.fillGraph",
						label: "Fill Graph",
						options: [{
							value: true,
							label: "On"
						}, {
							value: false,
							label: "Off"
						}],
						defaultValue: false
					},
					StackedGraph: {
						type: "boolean",
						component: "switch",
						ref: "props.stackedGraph",
						label: "Stacked Graph",
						options: [{
							value: true,
							label: "On"
						}, {
							value: false,
							label: "Off"
						}],
						defaultValue: false
					},
					StepPlot: {
						type: "boolean",
						component: "switch",
						ref: "props.stepPlot",
						label: "Step Plot",
						options: [{
							value: true,
							label: "On"
						}, {
							value: false,
							label: "Off"
						}],
						defaultValue: false
					},
					DrawXGrid: {
						type: "boolean",
						component: "switch",
						ref: "props.drawXGrid",
						label: "x-Axis Gridlines",
						options: [{
							value: true,
							label: "On"
						}, {
							value: false,
							label: "Off"
						}],
						defaultValue: true
					},
					DrawYGrid: {
						type: "boolean",
						component: "switch",
						ref: "props.drawYGrid",
						label: "y-Axis Gridlines",
						options: [{
							value: true,
							label: "On"
						}, {
							value: false,
							label: "Off"
						}],
						defaultValue: true
					},
					xRangePad: {
						type: "string",
						ref: "props.xRangePad",
						label: "x-Axis Padding"
					},
					yRangePad: {
						type: "string",
						ref: "props.yRangePad",
						label: "y-Axis Padding"
					}
        		}
        	}
	    }
	};

	return {
        type: "items",
        component: "accordion",
        items: {
            dimensions: dimensions,
            measures: measures,
            addons: addons,
            appearance: appearance,
            dygraphsSettings: dygraphsSettings
        }
    };
});