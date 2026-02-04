import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';

export const sendEmail = async({email, emailType, userId}: any) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId,{verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000})
        } else if (emailType ==="RESET") {
            await User.findByIdAndUpdate(userId,{forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000})
        }

       // Looking to send emails in production? Check out our Email API/SMTP product!
var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "05cc9c9c72c823",
    pass: "e1581bf20bf524"
    //TODO: add these credentials to .env file
  }
});

const mailOptions = {
    from: 'ahmedusman50721@gmail.com',
    to: email,
    subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
    html: `<p>Click <a href="${process.env.DOMAIN}/verify-email?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "Verify your email" : "reset your password"} or copy the link below in your browser.
    <br> ${process.env.DOMAIN}/verify-email?token=${hashedToken}
    </p>`
}
   
const mailresponse = await transport.sendMail(mailOptions);
return mailresponse;

    } catch (error: any) {
        throw new Error(error.message);
    }
} 



// domain.com/verifytoken/mytoken
// domain.com/verifytoken?token=mytoken