import db from '../models';

module.exports = {
    addVoteToSelectedNominee: async (SelectedNomineeId) => {
        return new Promise(async (resolve, reject) => {
            try {
                let fetchSelectedNominee = await db.SelectedNominee.findOne({
                    where: {
                        id: SelectedNomineeId
                    }
                });
                if (fetchSelectedNominee !== null) {
                    await db.SelectedNominee.update({
                        total_votes: fetchSelectedNominee.total_votes + 1
                    }, {
                        where: {
                            id: fetchSelectedNominee.id
                        }
                    });
                }
                resolve("success")
            } catch (error) {
                resolve(null)
            }
        })
    },

}