module.exports = {
  //bootstrapCustomizations: "./bootstrap-customizations.scss",
  mainSass: "./assets/css/_main.scss", // path to your main SASS file (optional)
  verbose: true, // print out your custom files used
  debug: false, // print out the full generated scss file
  styleLoader: "style-loader!css-loader!sass-loader", // see example for the ExtractTextPlugin
  scripts: {
    // add every bootstrap script you need
    'transition': true,
    'dropdown': true,
    'modal': true,
    'scrollspy': true,
    'tab': true,
    'tooltip': true,
    'alert': true,
    'button': true,
    'collapse': true,
    'carousel': true,
    'affix': true
  },
  styles: {
    // add every bootstrap style you need
    "mixins": true,
    "normalize": true,
    "print": true,
    "scaffolding": true,
    "type": true,
    "code": true,
    "grid": true,
    "tables": true,
    "forms": true,
    "buttons": true,
    "component-animations": true,
    "glyphicons": true,
    "dropdowns": true,
    "button-groups": true,
    "input-groups": true,
    "navs": true,
    "navbar": true,
    "breadcrumbs": true,
    "pagination": true,
    "pager": true,
    "labels": true,
    "badges": true,
    "jumbotron": true,
    "thumbnails": true,
    "alerts": true,
    "progress-bars": true,
    "media": true,
    "list-group": true,
    "panels": true,
    "wells": true,
    "close": true,
    "modals": true,
    "tooltip": true,
    "popovers": true,
    "carousel": true,
    "utilities": true,
    "responsive-utilities": true
  }
};
