const express = require("express")
const Controller = require("../controllers/controller")
const authentication = require("../middlewares/authentication")

const router = express.Router()

router.post("/register", Controller.register)
router.post("/login", Controller.login)

router.post("/organizationNode", authentication, Controller.createOrganization)
router.get("/organizationNode", authentication  ,Controller.getOrganizations)
router.get("/organizationNode/myOrganizations", authentication, Controller.getMyOrganization)
module.exports = router