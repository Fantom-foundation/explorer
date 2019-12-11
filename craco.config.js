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
    jest: {
        configure: {
            roots: ['<rootDir>/src', '<rootDir>/__mocks__'],
        },
    },
};
