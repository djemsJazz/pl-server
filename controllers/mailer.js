const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: "smtp-relay.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: 'dahmoun.d@bessapromotion.com',
        pass: 'bessapro120'
    }
});

exports.sendOtp = async (req, res) => {
    const { userMail, otp } = req
    const html = `
        <h2 style='text-align: center'>Bienvenue Dans votre espace</h2>
        <h4 style='text-align: center'>Utilisez le code ci-dessous pour vous connecter</h4>
        <br/>
        <h2 style='text-align: center; color: #fff; background-color: #888'>${otp}</h2>
    `
    try {
        await transporter.sendMail({
            from: 'My Site dahmoun.d@bessapromotion.com',
            to: userMail,
            subject: 'Bienvenue dans votre espace',
            html: html
        })
        return res.sendStatus(200)
    } catch (error) {
        console.log('Error', error);
        return res.sendStatus(400)
    }
}


// await transporter.sendMail({
//     from: '"BPSuivi" contact@bessapromotion.com',
//     to: mailRecipient,
//     subject: mailSubject,
//     text: mailTexte,
//     template: 'task-mail',
//     context: {
//         residenceName: residenceId.name,
//         blocName: blocId.name,
//         floor: appartement.floor,
//         number: appartement.number,
//         location: appartement.floor,
//         taskType: task.type.name,
//         taskContent: task.name,
//         taskLocation: task.location,
//         taskId: task._id
//     },
// }, (err, info) => {
//     if (err) {
//         console.log('send mail error', err)
//         return res.sendStatus(400)
//     }
//     delete req.task
//     delete req.mailSubject
//     delete req.mailTexte
//     return res.status(200).send(task)
// });