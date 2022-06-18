import db from '../models';

module.exports = {
    addNomineeApplicationToUser: async (email, userProfile) => {
        return new Promise(async (resolve, reject) => {
            try {
                let fetchNomineeApplications = await db.NomineeApplication.findAll({
                    where: {
                        email: email
                    }
                });
                if (fetchNomineeApplications.length > 0) {
                    for (let nominationAction of fetchNomineeApplications) {
                        await db.NomineeApplication.update({
                            user_profile_ref: userProfile.id,
                            nominee_name: userProfile.full_name
                        }, {
                            where: {
                                id: nominationAction.id
                            }
                        });
                    }
                }
                resolve("success")
            } catch (error) {
                resolve(null)
            }
        })
    },

}