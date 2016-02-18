define([], function () {

    "use strict";

    // Dimensions
    var dimensions = {
        uses: "dimensions",
        min: 1,
        max: 2
    };
    // Axis Assignment
    var axis = {
        type: "string",
        component:"dropdown",
        ref: "qDef.props.axis",
        label: "Axis",
        options: [{
            label: "Primary (left)",
            value: "y1"
        }, {
            label: "Secondary (right)",
            value: "y2"
        }],
        defaultValue: "y1"
    };
    // Error Bar Values
    var lowErrorVal = {
        type: "string",
        ref: "qAttributeExpressions.0.qExpression",
        label: "Low Error Value",
        expression: "always",
        defaultValue: ""
    };
    var highErrorVal = {
        type: "string",
        ref: "qAttributeExpressions.1.qExpression",
        label: "High Error Value",
        expression: "always",
        defaultValue: ""
    };
    // Data Series Line Display
    var seriesPlotter = {
        type: "string",
        component:"dropdown",
        ref: "qDef.props.plotter",
        label: "Presentation",
        options: [{
            label: "Line Chart",
            value: "line"
        }, {
            label: "Bar Chart",
            value: "bar"
        }],
        defaultValue: "line"
    };
    var seriesDrawPoints = {
        type: "boolean",
        component: "switch",
        ref: "qDef.props.drawPoints",
        label: "Data Points",
        options: [{
            value: true,
            label: "On"
        }, {
            value: false,
            label: "Off"
        }],
        defaultValue: false
    };
    var seriesFillGraph = {
        type: "boolean",
        component: "switch",
        ref: "qDef.props.fillGraph",
        label: "Fill Graph",
        options: [{
            value: true,
            label: "On"
        }, {
            value: false,
            label: "Off"
        }],
        defaultValue: false
    };
    var seriesStepPlot = {
        type: "boolean",
        component: "switch",
        ref: "qDef.props.stepPlot",
        label: "Step Plot",
        options: [{
            value: true,
            label: "On"
        }, {
            value: false,
            label: "Off"
        }],
        defaultValue: false
    };
    // Data Series Line Properties
    var seriesStrokePattern = {
        type: "string",
        component:"dropdown",
        ref: "qDef.props.strokePattern",
        label: "Stroke Pattern",
        options: [{
            label: "Solid",
            value: "solid"
        }, {
            label: "Dashed",
            value: "dashed"
        }, {
            label: "Dashed-Alternating",
            value: "alt-dash"
        }, {
            label: "Dotted",
            value: "dotted"
        }, {
            label: "Dot-Dash",
            value: "dot-dash"
        }],
        defaultValue: "solid"
    };
    var seriesStrokeWidth = {
        type: "string",
        ref: "qDef.props.strokeWidth",
        label: "Stroke Width"
    };
    var seriesColor = {
        type: "string",
        ref: "qDef.props.color",
        label: "Color"
    };
    var seriesPointSize = {
        type: "string",
        ref: "qDef.props.pointSize",
        label: "Point Size"
    };
    var seriesHighlightCircleSize = {
        type: "string",
        ref: "qDef.props.highlightCircleSize",
        label: "Highlighted Point Size"
    };
    var seriesStrokeBorderWidth = {
        type: "string",
        ref: "qDef.props.strokeBorderWidth",
        label: "Stroke Border Width"
    };
    var seriesStrokeBorderColor = {
        type: "string",
        ref: "qDef.props.strokeBorderColor",
        label: "Stroke Border Color"
    };
    var seriesLineSmoothing = {
        type: "number",
        component: "slider",
        ref: "qDef.props.smoothing",
        label: "Line Smoothing",
        min: 0,
        max: 0.7,
        step: 0.01,
        defaultValue: 0
    };
    // Measures
    var measures = {
        uses: "measures",
        min: 1,
        items: {
            // Axis
            axis: axis,
            // Data Series Error Bar Values
            lowErrorVal: lowErrorVal,
            highErrorVal: highErrorVal,
            // Data Series Line Display
            seriesPlotter: seriesPlotter,
            seriesDrawPoints: seriesDrawPoints,
            // seriesCustomBars: seriesCustomBars,
            seriesFillGraph: seriesFillGraph,
            seriesStepPlot: seriesStepPlot,
            // Data Series Line Properties
            seriesStrokePattern: seriesStrokePattern,
            seriesStrokeWidth: seriesStrokeWidth,
            seriesColor: seriesColor,
            seriesPointSize: seriesPointSize,
            seriesHighlightCircleSize: seriesHighlightCircleSize,
            seriesStrokeBorderWidth: seriesStrokeBorderWidth,
            seriesStrokeBorderColor: seriesStrokeBorderColor,
            seriesLineSmoothing: seriesLineSmoothing
        }
    };
    // Add-ons section - Data Handling
    var addons = {
        uses: "addons",
        items: {
            dataHandling: {
                uses: "dataHandling"
            }
        }
    };
    // Appearance section
    var appearance = {
        uses: "settings"
    };
    // Data Input properties
    var xAxisDataType = {
        type: "string",
        component:"dropdown",
        ref: "props.xAxisDataType",
        label: "x-Axis Data Type (Dimension 1)",
        options: [{
            label: "Numeric",
            value: "numeric"
        }, {
            label: "Date",
            value: "date"
        }],
        defaultValue: "numeric"
    };
    var seriesInput = {
        type: "string",
        component:"dropdown",
        ref: "props.seriesInput",
        label: "Data Series Source",
        options: [{
            label: "Dimension 2",
            value: "dimension"
        }, {
            label: "Measures",
            value: "measures"
        }],
        defaultValue: "dimension"
    };
    // Line Display properties
    var plotter = {
        type: "string",
        component:"dropdown",
        ref: "props.plotter",
        label: "Presentation",
        options: [{
            label: "Line Chart",
            value: "line"
        }, {
            label: "Bar Chart",
            value: "bar"
        }, {
            label: "Multi-Column Bar Chart",
            value: "multibar"
        }, {
            label: "Candlestick Chart (Open|Close|High|Low)",
            value: "candle"
        }, {
            label: "Boxplot Chart",
            value: "boxplot"
        }],
        defaultValue: "line"
    };
    var drawPoints = {
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
    };
    var connectSeparatedPoints = {
        type: "boolean",
        component: "switch",
        ref: "props.connectSeparatedPoints",
        label: "Connect Separated Data Points",
        options: [{
            value: true,
            label: "On"
        }, {
            value: false,
            label: "Off"
        }],
        defaultValue: false
    };
    var customBars = {
        type: "boolean",
        component: "switch",
        ref: "props.customBars",
        label: "Error Bars",
        options: [{
            value: true,
            label: "On"
        }, {
            value: false,
            label: "Off"
        }],
        defaultValue: false
    };
    var fillGraph = {
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
    };
    var stackedGraph = {
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
    };
    var stepPlot = {
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
    };
    // Line Properties properties
    var strokePattern = {
        type: "string",
        component:"dropdown",
        ref: "props.strokePattern",
        label: "Stroke Pattern",
        options: [{
            label: "Solid",
            value: "solid"
        }, {
            label: "Dashed",
            value: "dashed"
        }, {
            label: "Dashed-Alternating",
            value: "alt-dash"
        }, {
            label: "Dotted",
            value: "dotted"
        }, {
            label: "Dot-Dash",
            value: "dot-dash"
        }],
        defaultValue: "solid"
    };
    var strokeWidth = {
        type: "string",
        ref: "props.strokeWidth",
        label: "Stroke Width"
    };
    var colors = {
        type: "string",
        ref: "props.colors",
        label: "Data Series Colors",
        expression: "optional"
    };
    var pointSize = {
        type: "string",
        ref: "props.pointSize",
        label: "Point Size"
    };
    var highlightCircleSize = {
        type: "string",
        ref: "props.highlightCircleSize",
        label: "Highlighted Point Size"
    };
    var strokeBorderWidth = {
        type: "string",
        ref: "props.strokeBorderWidth",
        label: "Stroke Border Width"
    };
    var strokeBorderColor = {
        type: "string",
        ref: "props.strokeBorderColor",
        label: "Stroke Border Color"
    };
    var lineSmoothing = {
        type: "number",
        component: "slider",
        ref: "props.smoothing",
        label: "Line Smoothing",
        min: 0,
        max: 0.7,
        step: 0.01,
        defaultValue: 0
    };
    // Labels properties
    var graphTitle = {
        type: "string",
        ref: "props.title",
        label: "Graph Title"
    };
    var graphTitleFontSize = {
        type: "string",
        ref: "props.titleFontSize",
        label: "Graph Title Font Size"
    };
    var xAxisTitle = {
        type: "string",
        ref: "props.xlabel",
        label: "x-Axis Title",
        expression: "optional"
    };
    var yAxisTitle = {
        type: "string",
        ref: "props.ylabel",
        label: "y-Axis Title",
        expression: "optional"
    };
    var y2AxisTitle = {
        type: "string",
        ref: "props.y2label",
        label: "Secondary y-Axis Title",
        expression: "optional"
    };
    var axisTitleFontSize = {
        type: "string",
        ref: "props.axisTitleFontSize",
        label: "Axis Title Font Size"
    };
    var axisLabelFontSize = {
        type: "string",
        ref: "props.axisLabelFontSize",
        label: "Axis Label Font Size"
    };
    // Legend properties
    var legendDisplay = {
        type: "string",
        component:"dropdown",
        ref: "props.legend",
        label: "Legend Display Style",
        options: [{
            label: "Always",
            value: "always"
        }, {
            label: "Mouseover",
            value: "onmouseover"
        }, {
            label: "Follow",
            value: "follow"
        }, {
            label: "Never",
            value: "never"
        }],
        defaultValue: "onmouseover"
    };
    var legendHighlightOpts = {
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
    };
    var legendFontSize = {
        type: "string",
        ref: "props.legendFontSize",
        label: "Legend Font Size"
    };
    var labelsSeparateLines = {
        type: "boolean",
        component: "switch",
        ref: "props.labelsSeparateLines",
        label: "Stacked Legend Items",
        options: [{
            value: true,
            label: "On"
        }, {
            value: false,
            label: "Off"
        }],
        defaultValue: false
    };
    // Axes and Chart Area properties
    var drawXGrid = {
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
    };
    var drawYGrid = {
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
    };
    var drawY2Grid = {
        type: "boolean",
        component: "switch",
        ref: "props.drawY2Grid",
        label: "Secondary y-Axis Gridlines",
        options: [{
            value: true,
            label: "On"
        }, {
            value: false,
            label: "Off"
        }],
        defaultValue: false
    };
    var independentTicks = {
        type: "boolean",
        component: "switch",
        ref: "props.independentTicks",
        label: "Independent y-Axes Ticks",
        options: [{
            value: true,
            label: "On"
        }, {
            value: false,
            label: "Off"
        }],
        defaultValue: false
    };
    var xRangePad = {
        type: "string",
        ref: "props.xRangePad",
        label: "x-Axis Padding"
    };
    var yRangePad = {
        type: "string",
        ref: "props.yRangePad",
        label: "y-Axis Padding"
    };
    var dateWindow = {
        type: "string",
        ref: "props.dateWindow",
        label: "x-Axis Range (low/earliest, high/latest)"
    };
    var valueRange = {
        type: "string",
        ref: "props.valueRange",
        label: "y-Axis Range (low, high)"
    };
    // Value Display properties
    var maxNumberWidth = {
        type: "string",
        ref: "props.maxNumberWidth",
        label: "Digits Before Decimal"
    };
    var digitsAfterDecimal = {
        type: "string",
        ref: "props.digitsAfterDecimal",
        label: "Max Digits After Decimal"
    };
    var fixedDigitsAfterDecimal = {
        type: "string",
        ref: "props.fixedDigitsAfterDecimal",
        label: "Fixed Digits After Decimal"
    };
    var sigFigs = {
        type: "string",
        ref: "props.sigFigs",
        label: "Significant Digits (Scientific Mode)"
    };
    var labelsKMB = {
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
    };
    var labelsKMG2 = {
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
    };
    var labelsUTC = {
        type: "boolean",
        component: "switch",
        ref: "props.labelsUTC",
        label: "UTC Date/Time Labels",
        options: [{
            value: true,
            label: "On"
        }, {
            value: false,
            label: "Off"
        }],
        defaultValue: false
    };
    var tickerLabelFormat = {
        type: "string",
        component:"dropdown",
        ref: "props.tickerLabelFormat",
        label: "Ticker and Label Format (x-axis)",
        options: [{
            label: "Auto",
            value: "auto"
        }, {
            label: "MM/DD/YYYY",
            value: "mm/dd/yyyy"
        }, {
            label: "DD/MM/YYYY",
            value: "dd/mm/yyyy"
        }, {
            label: "Year (1:1)",
            value: "year"
        }, {
            label: "Month (1:1)",
            value: "month"
        }, {
            label: "Weekday (1:1)",
            value: "weekday"
        }],
        defaultValue: "auto"
    };
    // Interactive Elements properties
    var highlightSeries = {
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
        defaultValue: false,
    };
    var rangeSlider = {
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
    };
    var zoomAnimation = {
        type: "boolean",
        component: "switch",
        ref: "props.animatedZooms",
        label: "Zoom Animation",
        options: [{
            value: true,
            label: "On"
        }, {
            value: false,
            label: "Off"
        }],
        defaultValue: false
    };
    var fixedZoom = {
        type: "boolean",
        component: "switch",
        ref: "props.fixedZoom",
        label: "Fixed Zoom",
        options: [{
            value: true,
            label: "On"
        }, {
            value: false,
            label: "Off"
        }],
        defaultValue: false
    };
    var panEdgeFraction = {
        type: "string",
        ref: "props.panEdgeFraction",
        label: "Pan Edge Limit"
    };
    // Data Input section
    var dataInput = {
        type: "items",
        label: "Input Data",
        items: {
            xAxisDataType: xAxisDataType,
            seriesInput: seriesInput
        }
    };
     // Line Display section
    var lineDisplay = {
        type: "items",
        label: "Data Line Display",
        items: {
            plotter: plotter,
            drawPoints: drawPoints,
            connectSeparatedPoints: connectSeparatedPoints,
            customBars: customBars,
            fillGraph: fillGraph,
            stackedGraph: stackedGraph,
            stepPlot: stepPlot
        }
    };
    // Line Properties section
    var lineProperties = {
        type: "items",
        label: "Data Line Properties",
        items: {
            strokePattern: strokePattern,
            strokeWidth: strokeWidth,
            colors: colors,
            pointSize: pointSize,
            highlightCircleSize: highlightCircleSize,
            strokeBorderWidth: strokeBorderWidth,
            strokeBorderColor: strokeBorderColor,
            lineSmoothing: lineSmoothing

        }
    };
    // Labels section
    var labels = {
        type: "items",
        label: "Labels",
        items: {
            graphTitle: graphTitle,
            graphTitleFontSize: graphTitleFontSize,
            xAxisTitle: xAxisTitle,
            yAxisTitle: yAxisTitle,
            y2AxisTitle: y2AxisTitle,
            axisTitleFontSize: axisTitleFontSize,
            axisLabelFontSize: axisLabelFontSize
        }
    };
    // Legend section
    var legend = {
        type: "items",
        label: "Legend",
        items: {
            legendDisplay: legendDisplay,
            legendHighlightOpts: legendHighlightOpts,
            legendFontSize: legendFontSize,
            labelsSeparateLines: labelsSeparateLines
        }
    };
    // Axes and Chart Area section
    var axesChartArea = {
        type: "items",
        label: "Axes and Chart Area",
        items: {
            drawXGrid: drawXGrid,
            drawYGrid: drawYGrid,
            drawY2Grid: drawY2Grid,
            independentTicks: independentTicks,
            xRangePad: xRangePad,
            yRangePad: yRangePad,
            dateWindow: dateWindow,
            valueRange: valueRange
        }
    };
    // Value Display section
    var valueDisplay = {
        type: "items",
        label: "Value Display",
        items: {
            maxNumberWidth: maxNumberWidth,
            digitsAfterDecimal: digitsAfterDecimal,
            fixedDigitsAfterDecimal: fixedDigitsAfterDecimal,
            sigFigs: sigFigs,
            labelsKMB: labelsKMB,
            labelsKMG2: labelsKMG2,
            labelsUTC: labelsUTC,
            tickerLabelFormat: tickerLabelFormat
        }
    };
    // Interactive Elements section
    var interactiveElements = {
        type: "items",
        label: "Interactive Elements",
        items: {
            highlightSeries : highlightSeries,
            rangeSlider: rangeSlider,
            zoomAnimation: zoomAnimation,
            fixedZoom: fixedZoom,
            panEdgeFraction: panEdgeFraction
        }
    };
    // Dygraphs Options main section
    var dygraphsSettings = {
        component: "expandable-items",
        label: "Graph Options",
        items: {
            dataInput: dataInput,
            lineDisplay: lineDisplay,
            lineProperties: lineProperties,
            labels: labels,
            legend: legend,
            axesChartArea: axesChartArea,
            valueDisplay: valueDisplay,
            interactiveElements: interactiveElements
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