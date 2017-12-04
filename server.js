/*const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const dom = new JSDOM('<!doctype html><html><body></body></html>', { url: 'http://aquabox:8080' });
global.window = dom.window;
global.document = window.document;
global.navigator = window.navigator;*/
require("./project").server({
  httpPort: process.env.PORT || 8080 // Optional, but added here for demo purposes
});

