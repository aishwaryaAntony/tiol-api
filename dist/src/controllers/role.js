'use strict';

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.fetch_all_roles = async (req, res, next) => {
    try {
        let fetchAllRoles = await _models2.default.Role.findAll({});

        res.status(200).json({
            status: 'success',
            payload: fetchAllRoles,
            message: 'roles fetched successfully'
        });
    } catch (error) {
        console.log("Error at Role method- GET / :" + error);
        res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error while  fetched roles'
        });
    }
};
exports.fetch_role_by_id = async (req, res, next) => {
    try {
        let { id } = req.params;

        let findRole = await _models2.default.Role.findOne({
            where: {
                id: id
            }
        });
        if (findRole === null) {
            return res.status(200).json({
                status: 'failed',
                payload: null,
                message: 'Invalid Role'
            });
        }
        res.status(200).json({
            status: 'success',
            payload: findRole,
            message: 'role fetched  by id successfully'
        });
    } catch (error) {
        console.log("Error at role By Id method- GET / :" + error);
        res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error while fetched  by id role'
        });
    }
};
exports.create_new_role = async (req, res, next) => {
    try {
        let { code, name, status } = req.body;

        let new_role = await _models2.default.Role.create({
            name,
            code,
            status
        });
        res.status(200).json({
            status: 'success',
            payload: new_role,
            message: 'Role created successfully'
        });
    } catch (error) {
        console.log("Error at role By Id method- POST / :" + error);
        res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error while  create role'
        });
    }
};
exports.update_role = async (req, res, next) => {
    try {
        let { id } = req.params;

        let { name, code, status } = req.body;

        let findRole = await _models2.default.Role.findOne({
            where: {
                id: id
            }
        });

        if (findRole === null) {
            return res.status(200).json({
                status: 'failed',
                payload: null,
                message: 'Invalid role'
            });
        }

        await _models2.default.Role.update({
            name: name ? name : findRole.name,
            code: code ? code : findRole.code,
            status: status ? status : findRole.status
        }, {
            where: {
                id: id
            }
        });

        let updatedRole = await _models2.default.Role.findOne({
            where: {
                id: id
            }
        });

        res.status(200).json({
            status: 'success',
            payload: updatedRole,
            message: 'Role updated successfully'
        });
    } catch (error) {
        res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error while updated role'
        });
    }
};