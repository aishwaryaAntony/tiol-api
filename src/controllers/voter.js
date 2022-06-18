import db from "../models";
import { addVoteToSelectedNominee } from "../helpers/selectedNomineeHelper";

exports.fetch_all_voters = async (req, res, next) => {
    try {
        let fetchAllVoters = await db.Voter.findAll({});

        res.status(200).json({
            status: 'success',
            payload: fetchAllVoters,
            message: 'Voters fetched successfully'
        });
    }
    catch (error) {
        console.log("Error at Voter method- GET / :" + error);
        res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error while  fetched voters'
        });
    }
}

exports.fetch_vote_by_id = async (req, res, next) => {
    try {
        let { id } = req.params;

        let findVote = await db.Voter.findOne({
            where: {
                id: id
            }
        });
        if (findVote === null) {
            return res.status(200).json({
                status: 'failed',
                payload: null,
                message: 'Invalid Vote'
            });
        }
        res.status(200).json({
            status: 'success',
            payload: findVote,
            message: 'vote fetched  by id successfully'
        });

    }
    catch (error) {
        console.log("Error at vote By Id method- GET / :" + error);
        res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error while fetched  by id vote'
        });
    }
}

exports.create_new_vote = async (req, res, next) => {
    try {
        let { selected_nominee_id, award_sub_category_id, name, email, mobile_number, pan_number } = req.body;
        let fetchVoter = await db.Voter.findOne({
            where: {
                email: email,
                award_sub_category_id: award_sub_category_id
            }
        });
        if(fetchVoter === null){
            let newVote = await db.Voter.create({
                selected_nominee_id,
                award_sub_category_id,
                name,
                email,
                mobile_number,
                pan_number
            });
            await addVoteToSelectedNominee(selected_nominee_id);
            return res.status(200).json({
                status: 'success',
                payload: newVote,
                message: 'vote created successfully'
            });
        } else {
            return res.status(500).json({
                status: 'failed',
                payload: {},
                message: 'Already voted for this category'
            });
        }   
    }
    catch (error) {
        console.log("Error at vote method - POST / :" + error);
        res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error while creating vote'
        });
    }
}
