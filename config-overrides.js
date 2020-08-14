const { override, fixBabelImports } = require('customize-cra');

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true
        // style: 'css'
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {
            dark: true
        }
    }),
);
