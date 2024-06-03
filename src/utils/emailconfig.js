const nodemailer = require('nodemailer');
const Encryption = require('../utils/Encryption');
const sql = require('mssql');
const db = require('../config/db');

exports.PasswordEmail = async (user, userCode, templeteID) => {
    try {

        const currentDate = new Date();
        const formattedDateAndTime = currentDate.toLocaleString();
        // Fetch email template from database
        const pool = await new sql.ConnectionPool(db).connect();
        const result = await pool.request()
            .input('EmailTemplateID', sql.Int, templeteID) // Assuming EmailTemplateID 3 is for forgot password email
            .query('SELECT * FROM EmailTemplate WHERE EmailTemplateID = @EmailTemplateID');

        const emailTemplate = result.recordset[0];
        if (!emailTemplate) {
            throw new Error('Email template not found');
        }
        if (templeteID === 2) {

            resetLink = `http://172.16.12.162:3001/ChangePassword`;
            emailSubject = emailTemplate.EmailTemplateSubject;
            emailMessage = emailTemplate.EmailTemplateMessage
                .replace('#ToName#', userCode)
                .replace('#DateAndTime#', formattedDateAndTime);

            console.log(emailMessage)

        } else if (templeteID === 3) {
            expiresOn = encodeURIComponent(Encryption.Encrypt(new Date().toISOString().slice(0, 10)));
            resetLink = `http://172.16.12.17:3001/resetpassword`;
            emailSubject = emailTemplate.EmailTemplateSubject;
            emailMessage = emailTemplate.EmailTemplateMessage
                .replace('#UserEmailID#', userCode)
                .replace('#SetPWDUrl#', resetLink)
                .replace('#userId#', encodeURIComponent(userCode))
                .replace('#ExpireOn#', encodeURIComponent(expiresOn));

            console.log(emailMessage)
        } else {
            throw new Error('Email templateID not found');
        }

        // Call the function to set up email configuration
        setupEmail();

        return { user, emailSubject, emailMessage };

    } catch (error) {
        throw error;
    }

    // Function to set up email configuration
    async function setupEmail() {
        try {
            // Connect to the database
            const pool = await new sql.ConnectionPool(db).connect();
            // Query to retrieve SMTP configuration
            const result = await pool.request().query`SELECT SmtpClientHost, Port, SSLEnabled, SMTPUserid, SMTPPassword FROM Config`;

            if (result.recordset.length > 0) {
                // Extract configuration data
                const { SmtpClientHost, Port, SSLEnabled, SMTPUserid, SMTPPassword } = result.recordset[0];

                // Decrypt the password
                // const en = Encryption.Encrypt("fRnVjS6EdtCUp1FK");
                const decryptedPassword = decryptPassword(SMTPPassword);

                // Function to decrypt the password
                function decryptPassword(text) {
                    return Encryption.Decrypt(text);
                }



                // Create nodemailer transporter
                const transporter = nodemailer.createTransport({
                    host: SmtpClientHost,
                    port: Port,
                    secure: SSLEnabled, // true for 465, false for other ports
                    auth: {
                        user: SMTPUserid,
                        pass: decryptedPassword
                    }
                });
                // Send email
                let info = await transporter.sendMail({
                    from: '', // Your email address
                    to: user.EmailId, // User's email address
                    subject: emailSubject,
                    html: emailMessage
                });

                console.log("Email configuration set up successfully.");
                console.log('Email sent: ', info.messageId);
            } else {
                console.log("No SMTP configuration found in the database.");
            }
        } catch (err) {
            console.error("Error setting up email configuration:", err);
        } finally {
            // Close the connection
            sql.close();
        }
    }
};