const router = require("express").Router();

// Services Router
const servicesRouter = require("./services");

router.use("/", servicesRouter);

// Parties Router
const partiesRouter = require("./parties");

router.use("/", partiesRouter);

module.exports = router;
