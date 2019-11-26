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
};
