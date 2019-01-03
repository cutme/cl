const path = require('path');
const loaders = require('./loaders');
const plugins = require('./plugins');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: 5 });
const HtmlCriticalPlugin = require("html-critical-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const minify = {
    collapseWhitespace: true,
    removeComments: true,
    minifyJS: true,
    minifyURLs: true,
    removeEmptyAttributes: true,
    removeScriptTypeAttributes: true,
}

console.log(process.env.NODE_ENV);

const templateFileMapper = [{template: "./src/about-us.html", file: "about-us.html"},
                            {template: "./src/agents.html", file: "agents.html"},

                            {template: "./src/co-add-property-01.html", file: "co-add-property-01.html"},
                            {template: "./src/co-add-property-02.html", file: "co-add-property-02.html"},
                            {template: "./src/co-add-property-03.html", file: "co-add-property-03.html"},
                            {template: "./src/co-add-property-04.html", file: "co-add-property-04.html"},
                            {template: "./src/co-add-property-05.html", file: "co-add-property-05.html"},
                            {template: "./src/co-add-property-06.html", file: "co-add-property-06.html"},
                                                        
                            {template: "./src/co-brochures.html", file: "co-brochures.html"},
                            {template: "./src/co-contact.html", file: "co-contact.html"},
                            
                            {template: "./src/co-create-brochure-01.html", file: "co-create-brochure-01.html"},
                            {template: "./src/co-create-brochure-02.html", file: "co-create-brochure-02.html"},
                            {template: "./src/co-create-brochure-03.html", file: "co-create-brochure-03.html"},
                            {template: "./src/co-create-brochure-04.html", file: "co-create-brochure-04.html"},
                            {template: "./src/co-create-brochure-05.html", file: "co-create-brochure-05.html"},
                            {template: "./src/co-create-brochure-06.html", file: "co-create-brochure-06.html"},
                            {template: "./src/co-create-brochure-07.html", file: "co-create-brochure-07.html"},
                            
                            {template: "./src/co-dashboard.html", file: "co-dashboard.html"},
                            
                            {template: "./src/co-free-property-val-01.html", file: "co-free-property-val-01.html"},
                            {template: "./src/co-free-property-val-02.html", file: "co-free-property-val-02.html"},
                            {template: "./src/co-free-property-val-03.html", file: "co-free-property-val-03.html"},

                            {template: "./src/co-dashboard.html", file: "co-dashboard.html"},
                            
                            {template: "./src/co-manage-properties.html", file: "co-manage-properties.html"},
                            
                            {template: "./src/co-messages--archive.html", file: "co-messages--archive.html"},
                            {template: "./src/co-messages--deleted.html", file: "co-messages--deleted.html"},
                            {template: "./src/co-messages--inbox.html", file: "co-messages--inbox.html"},
                            {template: "./src/co-messages--post.html", file: "co-messages--post.html"},
                            {template: "./src/co-messages--sent.html", file: "co-messages--sent.html"},
                            
                            {template: "./src/co-myaccount.html", file: "co-myaccount.html"},
                            
                            {template: "./src/co-saved-agents.html", file: "co-saved-agents.html"},
                            {template: "./src/co-saved-properties.html", file: "co-saved-properties.html"},
                            {template: "./src/co-saved-suppliers.html", file: "co-saved-suppliers.html"},  
                            
                            {template: "./src/co-search-agent-1.html", file: "co-search-agent-1.html"},  
                            {template: "./src/co-search-agent-2.html", file: "co-search-agent-2.html"},
                            {template: "./src/co-search-property-1.html", file: "co-search-property-1.html"},
                            {template: "./src/co-search-property-2.html", file: "co-search-property-2.html"},
                            {template: "./src/co-search-supplier-1.html", file: "co-search-supplier-1.html"},
                            {template: "./src/co-search-supplier-2.html", file: "co-search-supplier-2.html"},                                                  
                            
                            {template: "./src/cookie-policy.html", file: "cookie-policy.html"},
                            {template: "./src/index.html", file: "index.html"}, 
                            
                            {template: "./src/privacy-policy.html", file: "privacy-policy.html"},
                            {template: "./src/property.html", file: "property.html"},
                            {template: "./src/property-owners.html", file: "property-owners.html"},
                            
                            {template: "./src/register-agent.html", file: "register-agent.html"},
                            {template: "./src/register-property-owners.html", file: "register-property-owners.html"},
                            {template: "./src/register-property.html", file: "register-property.html"},
                            {template: "./src/register-supplier.html", file: "register-supplier.html"},   
                            
                            {template: "./src/s-contact.html", file: "s-contact.html"},

                            {template: "./src/s-dashboard.html", file: "s-dashboard.html"},

                            {template: "./src/s-messages--archive.html", file: "s-messages--archive.html"},
                            {template: "./src/s-messages--deleted.html", file: "s-messages--deleted.html"},
                            {template: "./src/s-messages--inbox.html", file: "s-messages--inbox.html"},
                            {template: "./src/s-messages--post.html", file: "s-messages--post.html"},
                            {template: "./src/s-messages--sent.html", file: "s-messages--sent.html"},
                            
                            {template: "./src/s-myaccount.html", file: "s-myaccount.html"},
                            
                            {template: "./src/s-saved-agents.html", file: "s-saved-agents.html"},
                            {template: "./src/s-saved-properties.html", file: "s-saved-properties.html"},
                            {template: "./src/s-saved-suppliers.html", file: "s-saved-suppliers.html"},
                            
                            {template: "./src/s-search-agent-1.html", file: "s-search-agent-1.html"},  
                            {template: "./src/s-search-agent-2.html", file: "s-search-agent-2.html"},
                            {template: "./src/s-search-property-1.html", file: "s-search-property-1.html"},
                            {template: "./src/s-search-property-2.html", file: "s-search-property-2.html"},
                            {template: "./src/s-search-supplier-1.html", file: "s-search-supplier-1.html"},
                            {template: "./src/s-search-supplier-2.html", file: "s-search-supplier-2.html"},
                                                 
                            {template: "./src/search-agent-1.html", file: "search-agent-1.html"},
                            {template: "./src/search-agent-2.html", file: "search-agent-2.html"},
                            {template: "./src/search-property-1.html", file: "search-property-1.html"},
                            {template: "./src/search-property-2.html", file: "search-property-2.html"},
                            {template: "./src/search-supplier-1.html", file: "search-supplier-1.html"},
                            {template: "./src/search-supplier-2.html", file: "search-supplier-2.html"},
                            
                            {template: "./src/suppliers.html", file: "suppliers.html"},
                            {template: "./src/terms.html", file: "terms.html"}];




const htmlPlugins = () => {
  return templateFileMapper.map(entry => {
    return new HtmlWebpackPlugin({
      template: entry.template,
      filename: entry.file,
    });
  })
};


module.exports = {
    mode: 'production',
    devtool: 'source-map',
    
    entry: {
        'app.js': [
          path.resolve(__dirname, '../src/app.js')
        ]
    },

    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: "js/[name].js",
        publicPath: ''
    },

    module: {
    	rules: [
			loaders.css,
            loaders.fonts,
            loaders.images,
            loaders.js,
        ]
    },
    
    plugins: htmlPlugins().concat([
        new ProgressBarPlugin(),
        
        plugins.MiniCssExtractPlugin,

        createHappyPlugin('scss', ['css-loader?importLoaders:1!postcss-loader?sourceMap:1!sass-loader']),
        
        plugins.js,
        
        new CopyWebpackPlugin([
            { from: path.resolve(__dirname, '../src/inc/'), to: path.resolve(__dirname, '../dist/inc/') },
        ])
    ]),
	
	optimization: {
	    minimize: false,
        namedModules: true, // NamedModulesPlugin()
        noEmitOnErrors: true, // NoEmitOnErrorsPlugin
        concatenateModules: true //ModuleConcatenationPlugin
    }
};


function createHappyPlugin(id, loaders) {
    return new HappyPack({
        id: id,
        loaders: loaders,
        threadPool: happyThreadPool,
        verbose: false,
    });
}

