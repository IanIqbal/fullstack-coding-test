const { User, OrganizationNode, NodeLabel, sequelize } = require("../models")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const nodeFormatter = require("../helpers/nodeFormatter")
class Controller {

    static async register(req, res, next) {
        try {

            const { name, username, password } = req.body
            const user = await User.create({ name, username, password })

            res.status(201).json(user)
        } catch (error) {
            next(error)
        }
    }

    static async login(req, res, next) {
        try {
            const { username, password } = req.body

            if (!username) {
                throw { name: "Invalid input", value: "Username" }
            }

            if (!password) {
                throw { name: "Invalid input", value: "Password" }
            }
            const user = await User.findOne({ where: { username } })

            if (!user) {
                throw { name: "Invalid username/password" }
            }

            const passwordCheck = bcrypt.compareSync(password, user.password)

            if (!passwordCheck) {
                throw { name: "Invalid username/password" }
            }

            const access_token = jwt.sign({ id: user.id }, process.env.SECRET)

            res.status(200).json({ access_token, name:user.name, username:user.username })
        } catch (error) {
            next(error)
        }
    }

    static async createOrganization(req, res, next) {
        const t = await sequelize.transaction()
        try {

            const { UserId } = req.user
            const { name, nodes } = req.body

            const organization = await OrganizationNode.create({ name, UserId }, { transaction: t })


            console.log(organization);
            nodes.forEach(el => {

                el.OrganizationNodeId = organization.id

            })

            console.log(nodes);
            const newNodes = await NodeLabel.bulkCreate(nodes, { transaction: t })

            t.commit()

            res.status(201).json({ organization, newNodes })
        } catch (error) {
            next(error)
        }
    }


    static async getOrganizations(req, res, next) {
        try {

            let organizations = await OrganizationNode.findAll({ include: [{ model: NodeLabel }, { model: User }] })

            organizations.forEach(el => {
                let tidyNodes = nodeFormatter(el.NodeLabels)
                el.dataValues.tidyNodes = tidyNodes
            })

            res.status(200).json({ organizations })

        } catch (error) {
            next(error)
        }
    }
    static async getMyOrganization(req, res, next) {
        try {
            const { UserId } = req.user
            let organizations = await OrganizationNode.findAll({ where: { UserId }, include: [{ model: NodeLabel }] })

            organizations.forEach(el => {
                let tidyNodes = nodeFormatter(el.NodeLabels)
                el.dataValues.tidyNodes = tidyNodes
            })

            res.status(200).json({ organizations })

        } catch (error) {
            next(error)
        }
    }



}

module.exports = Controller