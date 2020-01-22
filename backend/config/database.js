const Sequelize = require("sequelize");
module.exports = new Sequelize(
  "postgres://pzlucshicdrolm:db10f9441ee12d9684f8caa5762caf400e01ae9871ebaa28fd7691ef972963f8@ec2-174-129-255-15.compute-1.amazonaws.com:5432/df11h63ghv65ch",
  {
	dialect: "postgres",
	"dialectOptions": {
		"ssl": true
	  },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);
