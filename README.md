# dygraphs for Qlik Sense

This visualization extension allows dygraphs charts to be integrated with Qlik Sense.  It makes use of the [dygraphs](http://dygraphs.com/) JavaScript library to produce interactive, zoomable charts.  The extension incorporates a selection of the dygraphs library's customization options to offer numerous possibilities for chart configuration, display and interactivity.

***

## Installation

1. Download the content.
2. Deploy the extension to your Qlik Sense environment.
   * Qlik Sense Desktop:
     Copy the entire contents of the .zip file to
     "C:\Users\<UserName>\Documents\Qlik\Sense\Extensions\qs-dygraphs"

   * Qlik Sense Server:
     Follow the instructions for ["Deploying visualizations in Qlik Sense"](http://help.qlik.com/sense/2.0/en-US/developer/#../Subsystems/Extensions/Content/Howtos/deploy-extensions.htm%3FTocPath%3DBuilding%2520visualization%2520extensions|Working%2520with%2520visualization%2520extensions|_____9)

## Usage

Add a dimension for the x-axis.
Add a measure for each data series to be displayed.
Define the configuration, display and behaviour of the chart using the Graph Options properties.  Graph Options are divided into two sections: Labels and Display.

### Notes
* Valid data types for the x-axis (dimension) are numeric (default) and date.
* To display error bars for a series, three measures are required and should be arranged by value in ascending order (i.e. low, middle, high).  Multiple series may be displayed with error bars if sets of three measures are selected and arranged in the same fashion.
* The Error Bars and Fill Graph properties are not compatible.

More detailed instructions will follow.

## License

Copyright © 2015 Daniel Pierre

Released under the MIT license.