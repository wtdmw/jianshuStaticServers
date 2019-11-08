var express = require('express');
var router = express.Router();

/* GET page. */
router.get('/**', function (req, res, next) {
    var renderViwes = req.path;
    console.log(renderViwes)
    if (renderViwes === "/") {
        renderViwes = "index";
    } else {
        renderViwes = renderViwes.slice(1)
    }

    console.log(renderViwes)
    res.render(renderViwes);
});

module.exports = router;