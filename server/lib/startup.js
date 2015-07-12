Meteor.startup(function() {
  process.env.PORT = 30480,
  process.env.MONGO_URL = "mongodb://ventureappofficial:Greetsy2015@db1.ventureappofficial.me:27017/admin",
  process.env.MONGO_OPLOG_URL = "mongodb://oplogger:Greetsy2015@db1.ventureappofficial.me:27017/local?authSource=admin",
  process.env.REDIS_URL = "redis://Greetsy2015~pO]u!+5#]/@}MM@Greetsy2015@db2.ventureappofficial.me:6379",
  process.env.REDIS_CONFIGURE_KEYSPACE_NOTIFICATIONS = 1,
  process.env.NODE_ENV = "production"
});
