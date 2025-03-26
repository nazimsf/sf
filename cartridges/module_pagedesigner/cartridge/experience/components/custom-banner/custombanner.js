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

    model.bannerImage = content.bannerImage;
    model.bannerLink = content.bannerLink;
    model.bannerLinkText = content.bannerLinkText;

    return new Template('experience/components/custom-banner/custombanner').render(model).text;
};