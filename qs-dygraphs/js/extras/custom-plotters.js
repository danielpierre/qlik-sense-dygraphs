// Darken a color (used by barChartPlotter and multiColumnBarPlotter)
function darkenColor(colorStr) {
    // Defined in dygraph-utils.js
    var color = Dygraph.toRGB_(colorStr);
    color.r = Math.floor((255 + color.r) / 2);
    color.g = Math.floor((255 + color.g) / 2);
    color.b = Math.floor((255 + color.b) / 2);
    return 'rgb(' + color.r + ',' + color.g + ',' + color.b + ')';
}

// This function draws bars for a single series. See
// multiColumnBarPlotter below for a plotter which can draw multi-series
// bar charts.
function barChartPlotter(e) {
    var ctx = e.drawingContext,
        points = e.points,
        y_bottom = e.dygraph.toDomYCoord(0),
        min_sep, sep, bar_width, p, center_x
    ;

    ctx.fillStyle = darkenColor(e.color);

    // Find the minimum separation between x-values.
    // This determines the bar width.
    min_sep = Infinity;
    for (var i = 1; i < points.length; i++) {
        sep = points[i].canvasx - points[i - 1].canvasx;
        if (sep < min_sep) min_sep = sep;
    }
    bar_width = Math.floor(2.0 / 3 * min_sep);

    // Do the actual plotting.
    for (var i = 0; i < points.length; i++) {
        p = points[i];
        center_x = p.canvasx;

        ctx.fillRect(center_x - bar_width / 2, p.canvasy,
                bar_width, y_bottom - p.canvasy);

        ctx.strokeRect(center_x - bar_width / 2, p.canvasy,
                bar_width, y_bottom - p.canvasy);
    }
}

// The Candle chart plotter is adapted from code written by
// Zhenlei Cai (jpenguin@gmail.com)
// https://github.com/danvk/dygraphs/pull/141/files
function candlePlotter(e) {
    // This is the officially endorsed way to plot all the series at once.
    if (e.seriesIndex !== 0) return;

    var BAR_WIDTH = 8,
        setCount = e.seriesCount,
        sets = e.allSeriesPoints,
        area = e.plotArea,
        ctx = e.drawingContext,
        prices = [],
        price, topY, bottomY, centerX, bodyY, bodyHeight
    ;

    if (setCount != 4) {
        throw "Exactly 4 prices each point must be provided for candle chart (open close high low)";
    }

    for (var p = 0 ; p < sets[0].length; p++) {
        price = {
            open : sets[0][p].yval,
            close : sets[1][p].yval,
            high : sets[2][p].yval,
            low : sets[3][p].yval,
            openY : sets[0][p].y,
            closeY : sets[1][p].y,
            highY : sets[2][p].y,
            lowY : sets[3][p].y
        };
        prices.push(price);
    }

    // ctx.strokeStyle = '#202020'; // line stroke color (black)
    ctx.strokeStyle = '#5378C1'; // blue
    ctx.lineWidth = 0.6;

    for (p = 0 ; p < prices.length; p++) {
        ctx.beginPath();

        price = prices[p];
        topY = area.h * price.highY + area.y;
        bottomY = area.h * price.lowY + area.y;
        centerX = area.x + sets[0][p].x * area.w;
        ctx.moveTo(centerX, topY);
        ctx.lineTo(centerX, bottomY);
        ctx.closePath();
        ctx.stroke();
        if (price.open > price.close) {
            // ctx.fillStyle ='rgba(244,44,44,1.0)'; // red
            ctx.fillStyle ='rgba(83,120,193,1.0)'; // blue
            bodyY = area.h * price.openY + area.y;
        }
        else {
            // ctx.fillStyle ='rgba(44,244,44,1.0)'; // green
            ctx.fillStyle ='rgba(255,255,255,1.0)'; // white
            bodyY = area.h * price.closeY  + area.y;
        }
        bodyHeight = area.h * Math.abs(price.openY - price.closeY);
        // ctx.fillRect(centerX - BAR_WIDTH / 2, bodyY, BAR_WIDTH,  bodyHeight);

        // Custom candlestick styling - draw outline, then fill
        ctx.rect(centerX - BAR_WIDTH / 2, bodyY, BAR_WIDTH,  bodyHeight);
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.fillRect(centerX - BAR_WIDTH / 2, bodyY, BAR_WIDTH,  bodyHeight);
    }
}

// Multiple column bar chart
function multiColumnBarPlotter(e) {
    // We need to handle all the series simultaneously.
    if (e.seriesIndex !== 0) return;

    var g = e.dygraph,
        ctx = e.drawingContext,
        sets = e.allSeriesPoints,
        y_bottom = e.dygraph.toDomYCoord(0),
        strokeColors = g.getColors(),
        fillColors = [],
        min_sep, points, sep, bar_width, p, center_x, x_left
    ;

    // Find the minimum separation between x-values.
    // This determines the bar width.
    min_sep = Infinity;
    for (var j = 0; j < sets.length; j++) {
        points = sets[j];
        for (var i = 1; i < points.length; i++) {
            sep = points[i].canvasx - points[i - 1].canvasx;
            if (sep < min_sep) min_sep = sep;
        }
    }
    bar_width = Math.floor(2.0 / 3 * min_sep);

    for (var i = 0; i < strokeColors.length; i++) {
        fillColors.push(darkenColor(strokeColors[i]));
    }

    for (var j = 0; j < sets.length; j++) {
        ctx.fillStyle = fillColors[j];
        ctx.strokeStyle = strokeColors[j];
        for (var i = 0; i < sets[j].length; i++) {
            p = sets[j][i];
            center_x = p.canvasx;
            x_left = center_x - (bar_width / 2) * (1 - j/(sets.length-1));

            ctx.fillRect(x_left, p.canvasy,
                    bar_width/sets.length, y_bottom - p.canvasy);

            ctx.strokeRect(x_left, p.canvasy,
                    bar_width/sets.length, y_bottom - p.canvasy);
        }
    }
}