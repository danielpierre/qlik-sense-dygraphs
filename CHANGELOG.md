# Change Log
All notable changes to dygraphs for Qlik Sense will be documented in this file.
<!-- This project adheres to [Semantic Versioning](http://semver.org/). -->

<!-- ### \[Unreleased\]\[unreleased\] -->

### \[2.0\] - 2015-11-08
#### Added
- senseUtils library to perform asynchronous requests for data from the Qlik Engine
- Several additional display options from the dygraphs library
- Option to select input data source for data series - dimension or multiple measures
- Per-series options for applying display properties to data series individually
- Data plotting functions for line smoothing (smooth-plotter.js), bar charts, multiple-bar charts and candlestick charts (custom-plotters.js)
- Images of new properties panel layout and additional screenshots of chart configurations

#### Changed
- Extension data handling moved to global callback functions, which are passed to the pageExtensionData function in senseUtils
- Graph options reorganized in the properties panel for easier navigation
- dygraphs object rendering functions moved from main script file (qs-dygraphs.js) to global functions file (qs-dygraphs.globals.js)
- Renamed qs-dygraphs.utils.js to qs-dygraphs.globals.js to reflect that it no longer contains only helper functions

#### Fixed
- Display is no longer restricted to 1000 data points, as the pageExtensionData function retrieves the entire dataset regardless of the initial data fetch properties
- Maximum number of measures has been increased from 10 to 100 (for 'Measures' input mode) by adjusting the initial data fetch properties

#### Removed
- Global helper functions in qs-dygraphs.utils.js that are no longer used
- Images of previous properties panel layout

### \[1.0\] (Version 1.0 release) - 2015-09-04
#### Added
- Demo application with chart configuration examples
- Image folder containing thumbnails and screenshots

#### Changed
- Converted indentation from tabs to spaces in JS and QEXT files
- README now contains more detailed usage instructions and screenshots

### \[1.0\] (Initial release) - 2015-08-26
#### Added
- JS folder: dygraphs library source code (minified and development versions) and license text file
- Thumbnail image (dygraphs-thumb.png)
- Initial properties definition (initialproperties.js)
- License (LICENSE.md)
- Properties definition (properties.js)
- Main extension stylesheet (qs-dygraphs.css) - for now this just includes comments regarding the classes that may be used to style chart elements
- Main extension script (qs-dygraphs.js)
- Extension metadata (qs-dygraphs.qext)
- Global helper functions (qs-dygraphs.utils.js)
- Extension asset list for Qlik Sense Workbench/Dev Hub (wbfolder.wbl)

### Initial commit - 2015-08-26
#### Added
- .gitattributes and .gitignore files