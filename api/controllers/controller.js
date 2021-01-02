const SchoolModel = require('../../models/School');

const UserModel = require('../../models/User');

const saveComment = async(req, res) => {

    try {

        const schoolId = req.body.schoolId;

        const school = await SchoolModel.findById(schoolId);

        if (school === null) {
            return res.status(500).json({ res: 'School not found over the database' });
        }

        const comment = {
            userid: req.body.userid,
            body: req.body.body
        }

        school.comments.push(comment);

        await school.save();

        return res.status(200).json({ res: { schoolId: schoolId, comment: comment } });

    } catch (e) {

        console.log(e);

        return res.status(500).json({
            res: 'Error when adding a comment'

        })
    }

}

module.exports = { saveComment: saveComment };