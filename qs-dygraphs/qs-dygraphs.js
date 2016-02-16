/* dygraphs for Qlik Sense : Copyright (c) 2015 Daniel Pierre.  Released under the MIT license.
 * Version : 2.2
 * Details : https://github.com/danielpierre/qlik-sense-dygraphs
 */

define( ["jquery", "text!./qs-dygraphs.css", "./properties", "./initialproperties", "./qs-dygraphs.globals",
    "./js/senseUtils", "./js/dygraph-combined", "./js/extras/smooth-plotter", "./js/extras/custom-plotters"
],
function ($, cssContent, props, initProps) {

    'use strict';

    $("<style>").html(cssContent).appendTo("head");

    return {

        // Object properties
        initialProperties : initProps,
        definition : props,
        snapshot : { canTakeSnapshot : true },
        paint : function ($element, layout, fullMatrix) {

            // Retrieve the full data set and create a flattened data matrix
            // to process with the appropriate callback for the series input type
            if (layout.props.seriesInput === 'dimension') {
                senseUtils.pageExtensionData(this, $element, layout, renderD);
            }
            else {
                senseUtils.pageExtensionData(this, $element, layout, renderM);
            }

        }

    };

});