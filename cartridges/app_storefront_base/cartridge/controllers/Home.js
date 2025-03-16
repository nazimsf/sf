'use strict';

/**
 * @namespace Home
 */

var server = require('server');
var cache = require('*/cartridge/scripts/middleware/cache');
var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');
var pageMetaData = require('*/cartridge/scripts/middleware/pageMetaData');

/**
 * Home-Show : This endpoint is called when a shopper navigates to the home page
 * @name Base/Home-Show
 * @function
 * @memberof Home
 * @param {middleware} - consentTracking.consent
 * @param {middleware} - cache.applyDefaultCache
 * @param {category} - non-sensitive
 * @param {renders} - isml
 * @param {serverfunction} - get
 */
server.get('Show', consentTracking.consent, cache.applyDefaultCache, function (req, res, next) {
    var ContentMgr = require('dw/content/ContentMgr');
    var Site = require('dw/system/Site');
    var PageMgr = require('dw/experience/PageMgr');
    var Logger = require('dw/system/Logger');
    var pageMetaHelper = require('*/cartridge/scripts/helpers/pageMetaHelper'); // Moved inside the route

    var pageData = {};

    // Set page meta tags
    pageMetaHelper.setPageMetaTags(req.pageMetaData, Site.current);

    // Retrieve the homepage page
    var page = PageMgr.getPage('homepage');

    // Retrieve the content asset
    var contentAsset = ContentMgr.getContent('homepage-banner');
    if (contentAsset && contentAsset.custom && contentAsset.custom.imageUrl) {
        pageData.bannerImageUrl = contentAsset.custom.imageUrl;
    } else {
        Logger.warn('Content asset "homepage-banner" is missing or does not have an "imageUrl" attribute.');
        pageData.bannerImageUrl = '/images/cs.jpg'; // Fallback image
    }

    // Render the appropriate page
    if (page && page.isVisible()) {
        res.page('homepage');
    } else {
        res.render('home/homePage', pageData);
    }
    next();
}, pageMetaData.computedPageMetaData);

/**
 * Home-ErrorNotFound : This endpoint is called when a requested page is not found
 * @name Base/Home-ErrorNotFound
 * @function
 * @memberof Home
 * @param {renders} - isml
 * @param {serverfunction} - get
 */
server.get('ErrorNotFound', function (req, res, next) {
    res.setStatusCode(404);
    res.render('error/notFound');
    next();
});

module.exports = server.exports();