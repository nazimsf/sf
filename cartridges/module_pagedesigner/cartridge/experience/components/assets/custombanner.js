'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');

/**
 * Render logic for Custom Banner Component
 * @param {dw.experience.ComponentScriptContext} context The component script context object.
 * @returns {string} The template to be displayed
 */
module.exports.render = function (context) {
    var content = context.content;
    var model = new HashMap();

    // Set the image and category URL for the banner
    model.bannerImage = content.bannerImage;
    model.categoryUrl = content.categoryUrl; // Assuming 'categoryUrl' is the field in the content object

    return new Template('experience/components/assets/custombanner').render(model).text;
};