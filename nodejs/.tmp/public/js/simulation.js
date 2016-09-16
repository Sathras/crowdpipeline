/* global config */
/* global sim */
/* global $ */

// Create Canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - config.canvas_margin;
canvas.height = window.innerHeight - config.canvas_margin;

// style canvas
var margin = config.canvas_margin / 2;
$(canvas).css('margin-top', margin);
$(canvas).css('margin-left', margin);
if(config.canvas_border) $(canvas).css('border', "#000 1px solid");

document.body.appendChild(canvas);