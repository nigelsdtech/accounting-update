/*
* Pull billing payments from emails and update personal budgeting spreadsheet
*
*/


var cfg          = require('config');
var log4js       = require('log4js');
var gmailModel   = require('gmail-model')


/*
* Initialize
*/


// logs 

log4js.configure(cfg.get('log.log4jsConfigs'));

var log = log4js.getLogger(cfg.get('log.appName'));
log.setLevel(cfg.get('log.level'));



/*
* Main program
*/

log.info('Begin script')
log.info('============')

log.info('App name = %s', process.env.npm_package_config_appName)
log.info('Auth scopes = %s', process.env.npm_package_config_googleAuthScopes)


// Check through emails for info on bill payouts

var gmailParams = {
  name             : cfg.get('gmail.mailboxName'),
  userId           : cfg.get('gmail.userId'),
  googleScopes     : cfg.get('auth.scopes'),
  tokenFile        : cfg.get('auth.tokenFile'),
  tokenDir         : cfg.get('auth.tokenFileDir'),
  clientSecretFile : cfg.get('auth.clientSecretFile'),
  log4js           : log4js,
  logLevel         : cfg.get('log.level')
}

var gmail = new gmailModel(gmailParams);


gmail.listLabels();
