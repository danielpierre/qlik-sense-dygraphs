# What's new at version 2?

**dygraphs for Qlik Sense** 2.x brings a number of new features to offer much more flexibility in handling input data and customizing chart display.&nbsp;&nbsp;This document provides a summary of all modifications and additions implemented since version 1.0.

## Data Handling

- Implemented the **pageExtensionData** function from the [senseUtils](https://github.com/skokenes/senseUtils) library.&nbsp;&nbsp;This allows a dataset to be retrieved and rendered in the chart in its entirety, thus removing the display limit of 1000 data points in version 1.0.

- There are now two ways to specify the data series to be displayed in the chart:
  1. A dimension may be used to specify multiple data series for display.<br>
  &ensp;_OR_<br>
  2. A measure may be used to specify each individual data series and its values (in the same fashion as version 1.0).&nbsp;&nbsp;In this mode, the display properties of each data series may be customized individually.

## Chart Display

For users familiar with version 1.0, perhaps the most noticeable change is a complete reorganization of properties in the **Graph Options** menu.&nbsp;&nbsp;All options, including those found in the earlier version, are now distributed among eight sections for easier navigation.

As noted above, display properties may now be configured on a per-series basis.&nbsp;&nbsp;Hence, **Graph Options** represent settings that are applied globally, i.e. to all data series in the chart, whereas **Per-Series Options** are applied to data series individually and may override the global settings, when measures are used to specify the data series.&nbsp;&nbsp;Per-Series Options are found in the properties section for each measure that is set.

### New Options

An additional number of options from the [dygraphs](http://dygraphs.com/) library are now available for use in dygraphs for Qlik Sense, providing more possibilities for displaying data.

Newly added options with brief descriptions are listed below, alphabetically.&nbsp;&nbsp;Also noted are existing options which have been replaced or enhanced.&nbsp;&nbsp;For complete descriptions of these features, please see the [README.md](README.md) file.

- **Connect Separated Data Points** - Draw a continuous line for data series instead of showing gaps where values are missing.

- **Data Series Colors** - Provide a list of colors for displaying data series.

- **Data Series Source** - Choose whether a dimension or multiple measures will provide the data series to be displayed.

- **Error Bars** - Sets of three measures are no longer required for displaying error bars.&nbsp;&nbsp;Low and high values are now set using the _Low Error Value_ and _High Error Value_ properties of a measure, respectively (see _Per-Series Options_).

- **Fixed Digits After Decimal** - Display y-axis labels and values displayed on mouseover with a fixed number of digits after the decimal point.

- **Fixed Zoom** - Keep the zoom level fixed to the initial horizontal extent of the chart and disable zooming.

- **High Error Value** - see _Error Bars_.

- **Highlighted Point Size** - Set the size of dots drawn over highlighted data points.

- **Legend Display Style** - A dropdown menu replaces the _Always Show Legend_ checkbox.&nbsp;&nbsp;Three options are now available: _Mouseover_, _Always_ and _Follow_ (new)

- **Line Smoothing** - Draw a smooth line between points using Be&#769;zier curves.

- **Low Error Value** - see _Error Bars_.

- **Pan Edge Limit** - Limit panning past the range of values on the x-axis when interacting with the chart.

- **Per-Series Options** - Configure display properties for each data series individually (see _Data Series Source_).

- **Point Size** - Set the size of dots drawn over data points.

- **Presentation** - Choose the type of chart to be displayed.

- **Stacked Legend Items** - Display legend items on separate lines.

- **Stroke Border Color** - Set the color of the border drawn around graph lines.

- **Stroke Border Width** - Set the width of the border drawn around graph lines.

- **Stroke Pattern** - Set the pattern of graph lines.

- **Stroke Width** - Set the width of graph lines.

- **Ticker and Label Format** - Specify how tick marks and labels will be generated and displayed on the x-axis.

- **UTC Date/Time Labels** - Show date/time labels according to UTC instead of local time.

- **x-Axis Range** - Set the horizontal range of the chart.

- **y-Axis Range** - Set the vertical range of the chart.

- **Zoom Animation** - Animate zoom transitions when interacting with the chart.

## Backwards Compatibility

### Version 1.0

Given the numerous changes, this version _does not_ provide backwards compatibility with version 1.0.&nbsp;&nbsp;To recreate a chart configured with the previous version, the following approach is suggested:

1. Create a new element by dragging and dropping **dygraphs** from the Charts menu onto a sheet where there is an existing dygraphs chart element.
2. Use the existing element's **Labels** and **Display** properties as a reference to set the corresponding properties in the new element.
3. Apply settings in the **Input Data** section of Graph Options:
   1. Set the **`Data Series Source`** to **Measures**.
   2. Set the **`x-Axis Data Type`**, if necessary.
4. Set the measures for the new element, using the existing element's measures properties as a reference.<br>If error bars are enabled in the existing element, consolidate each set of three measures (which represent low, middle, and high values) into a single measure in the new element.&nbsp;&nbsp;The measure **`Expression`** in the new element will represent the data series (middle value).&nbsp;&nbsp;Enter the expressions that represent the low and high values into the **`Low Error Value`** and **`High Error Value`** properties, respectively.
5. Set the dimension for the new element.
6. Remove the old element and save.

### Version 2.0.x

Addition of the **`Fixed Digits After Decimal`** option in version 2.1 may cause values on the y-axis and in the in the legend to display incorrectly in charts configured with the version 2.0.x releases, if non-default settings for **Value Display** options are applied (e.g. **`Show K/M/B for thousands/millions/billions (base 10) on y-axis`** is set to 'On' but the displayed values are not be abbreviated).&nbsp;&nbsp;Take the following steps to ensure that the **Value Display** settings are displayed correctly:

1. Edit the sheet that contains a dygraphs chart element whose **Value Display** properties are not displaying correctly.

2. Temporarily set a value for **`Fixed Digits After Decimal`** in the **Value Display** properties for the element.

3. Remove the value from **`Fixed Digits After Decimal`** and save.&nbsp;&nbsp;**Value Display** settings should now be displayed properly in the chart.