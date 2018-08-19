const { ADMIN_PASS: adminPass } = process.env;

exports.login = (ctx) => {
  const { password } = ctx.request.body;

  console.log(password);

  if (adminPass === password) {
    ctx.body = {
      success: true
    };

    ctx.session.logged = true;
  } else {
    ctx.body = {
      success: false
    };

    ctx.status = 401; // Unauthorized
  }
};

exports.check = (ctx) => {
  ctx.body = {
    logged: !!ctx.session.logged // 값이 없어도 false를 반환하도록 !! <-
  };
};

exports.logout = (ctx) => {
  ctx.session = null;
  ctx.status = 204; // No Content
}