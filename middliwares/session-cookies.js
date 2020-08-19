const User_acces = require('../Schemas/main_user').User

module.exports = (req, res, next)=>{
	if(req.session.user_id == "")
	{
			res.redirect("/")
	}
	else
	{
		User_acces.findById(req.session.user_id, (err, user)=>{
			if(err)
			{
				console.log(err)
				res.redirect("/")
			}
			else
			{
				res.locals = {user: user};
				console.log(user.name + "punk")
				next();
			}

		});
	}
}