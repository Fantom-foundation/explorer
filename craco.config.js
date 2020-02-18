const CracoAlias = require("craco-alias");

module.exports = {
    plugins: [
        {
            plugin: CracoAlias,
            options: {
                aliases: {
                    "src": 'src/',
                }
            },
        },
    ],
    devServer: {
        headers: {
            'X-Frame-Options': 'sameorigin'
        }
    }
};
 