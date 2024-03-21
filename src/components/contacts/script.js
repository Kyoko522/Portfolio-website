const form = document.querySelector('form');

function sendemail () {
    Email.send({
        Host : "sheelpatel5252@gmail.com",
        Username : "username",
        Password : "password",
        To : 'them@website.com',
        From : "you@isp.com",
        Subject : "This is the subject",
        Body : "And this is the body"
    }).then(
      message => alert(message)
    );
}