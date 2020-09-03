const Mock = require('mockjs');

module.exports = {
    [`GET /api/query`]: (req, res) => {
        return res.json(
            Mock.mock({
                status: '200',
                data: req.query,
            })
        );
    },
    [`GET /api/page`]: (req, res) => {
        return res.json(
            Mock.mock({
                status: '200',
                data: {
                    'data|10': [
                        {
                            'id|+1': 1,
                            status: '',
                        },
                    ],
                    page: 1,
                    size: 15,
                    total: 0,
                },
            })
        );
    },
    [`GET /api/column`]: (req, res) => {
        return res.json(
            Mock.mock({
                status: '200',
                data: ['column1', 'column2'],
            })
        );
    },
};
