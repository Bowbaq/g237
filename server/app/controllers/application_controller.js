before('protect from forgery', function () {
    protectFromForgery('29eac2c425242f8447fbcc1c3654371fe730d321');
});

// publish('requireAdmin', requireAdmin);
// function requireAdmin() {
//   if (req.isAuthenticated()) { 
//     return next(); 
//   } else {
//     redirect('/login');
//   }
// }