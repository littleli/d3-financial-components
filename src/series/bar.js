(function(d3, fc) {
    'use strict';

    fc.series.bar = function() {

        // convenience functions that return the x & y screen coords for a given point
        var x = function(d) { return bar.xScale.value(bar.xValue.value(d)); };
        var barTop = function(d) { return bar.yScale.value(bar.y0Value.value(d) + bar.yValue.value(d)); };
        var barBottom = function(d) { return bar.yScale.value(bar.y0Value.value(d)); };

        var bar = function(selection) {
            selection.each(function(data) {
                var container = d3.select(this);
                var series = fc.utilities.simpleDataJoin(container, 'bar', data, bar.xValue.value);

                // enter
                series.enter()
                    .append('rect');

                var width = bar.barWidth.value(data.map(x));

                // update
                series.select('rect')
                    .attr('x', function(d) {
                        return x(d) - width / 2;
                    })
                    .attr('y', barTop)
                    .attr('width', width)
                    .attr('height', function(d) {
                        return barBottom(d) - barTop(d);
                    });

                // properties set by decorate will transition too
                bar.decorate.value(series);
            });
        };

        bar.decorate = fc.utilities.property(fc.utilities.fn.noop);
        bar.xScale = fc.utilities.property(d3.time.scale());
        bar.yScale = fc.utilities.property(d3.scale.linear());
        bar.barWidth = fc.utilities.functorProperty(fc.utilities.fractionalBarWidth(0.75));
        bar.yValue = fc.utilities.property(function(d) { return d.close; });
        bar.xValue = fc.utilities.property(function(d) { return d.date; });
        bar.y0Value = fc.utilities.functorProperty(0);

        return bar;
    };
}(d3, fc));
