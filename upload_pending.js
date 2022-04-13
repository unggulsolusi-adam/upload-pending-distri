var axios = require('axios');
const nodemailer = require('nodemailer');

var config = {
  method: 'GET',
  url: 'http://127.0.0.1/api_1_distribusi/public/api/v1/patch/process_pending?api_token=1c526106-5bcb-437e-98f5-4a26d383cb3e',
  headers: {

  }
};
(async () => {
  let errCount = 0;

  while (true) {
    try {
      const data = await axios(config)

      if (data.data.success) {
        errCount = 0;
      }

      throw data
    } catch (err) {
      if (errCount < 3) {
        console.log('retry... wait 3s...');
        await (() => new Promise((resolve) => {setTimeout(() => {resolve()}, 3000)}))()

        errCount++;

        continue
      }

      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "adam.ptums.0411@gmail.com",
            pass: "ts2wUzX7"
        }
      });
  
      let message = {
        from: "adam.ptums.0411@gmail.com",
        to: "muhamadadam20@gmail.com",
        subject: "Halo Adam, ada surprise nih buat kamu!!!",
        html: "<h1>Pending ada ERROR AOKWoAWKWOAOKW. CEK GIH!!</h1>"
      }
  
      transporter.sendMail(message, (err2, info) => {
        if (err2) {
          console.log(err2)
        } else {
          console.log('Email has been upload');
        }
      })

      break;
    }
  }
})()
