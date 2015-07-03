var mySubmitFunc = function(error) {
  if(error) {
    if(AccountsTemplates.getState() === "signUp") {
      alert('WARNING: UNAUTHORIZED USER! \nThis activity has been logged and will be reported.');
    }
  }
}

AccountsTemplates.configure({
  enablePasswordChange: true,
  showForgotPasswordLink: true,
  onSubmitHook: mySubmitFunc
});

AccountsTemplates.configureRoute('signIn', {layoutTemplate: 'appLayout'});
AccountsTemplates.configureRoute('signUp', {layoutTemplate: 'appLayout'});
AccountsTemplates.configureRoute('ensureSignedIn', {layoutTemplate: 'appLayout'});
AccountsTemplates.configureRoute('changePwd', {layoutTemplate: 'appLayout'});
AccountsTemplates.configureRoute('forgotPwd', {layoutTemplate: 'appLayout'});
