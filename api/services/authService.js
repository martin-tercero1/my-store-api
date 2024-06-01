const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const { config } = require('./../../config/config');
const UsersServices = require('./usersServices');
const service = new UsersServices();

class AuthServices {
  async getUser(email, password) {
    const user = service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw boom.unauthorized();
    }
    delete user.dataValues.password;

    return user;
  }
  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role,
    };
    const token = jwt.sign(payload, config.jwtSecret);

    return {
      user,
      token,
    };
  }
  async sendRecovery() {
    const user = service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }

    const payload = {
      sub: user.id
    }

    const token = jwt.sign(payload, config.jwtSecret, {expiresIn: '15min'});
    const link = `http://myfrontend.com/recovery?token=${token}`;

    await service.update(user.id, { recoveryToken: token });

    const mail = {
      from: `"Martin Tercero 👻" <${config.emailUser}>`, // sender address
      to: `${user.email}`, // list of receivers
      subject: 'Forgot your password? ✔', // Subject line
      // text: 'Hello world?', // plain text body
      html: `<b>Visit this link to recover your password: ${link}</b>`, // html body
    };

    const result = await this.sendMail(mail);

    return result;

  }
  async sendMail(infoMail) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: config.emailUser,
        pass: config.emailPassword,
      },
    });

    // send mail with defined transport object
    const info = await transporter.sendMail(infoMail);

    return {
      message: 'Mail sent'
    };
  }

  async changePassword(token, newPassword) {
    try {
      const payload = jwt.verify(token, config.jwtSecret);
      const user = await service.findOne(payload.sub);
      if (user.recoveryToken !== token) {
        throw boom.unauthorized();
      }
      const hash = await bcrypt.hash(newPassword, 10);
      await service.update(user.id, { recoveryToken: null, password: hash });
      // we should not return the recovery password
      return { message: 'Password was changed succesfully' }
    } catch(error) {
      throw boom.unauthorized();
    }
  }
}

module.exports = AuthServices;
