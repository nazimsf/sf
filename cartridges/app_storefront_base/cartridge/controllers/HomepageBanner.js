'use strict';

// homepageBanner.js (controller)
var pageData = {};
var contentAsset = require('dw/content/ContentMgr').getContent('homepage-banner');

// Pass the image URL and other data to the ISML template
pageData.bannerImageUrl = contentAsset.imageURL;  // Fetch the image URL from Content Asset
response.render('homepageBanner', pageData);
