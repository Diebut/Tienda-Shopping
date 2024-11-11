const {User} = require("../models/userModel")
const bcrypt = require("bcrypt")

const userAll = async (req, res) => {
    try {
        const users = await User.findAll({ order: [['id', 'DESC']] });
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error);
    }
};


const userDelete = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).send("Usuario no encontrado");
        
        await user.destroy();
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
};


const getUserId = async (req, res) =>{
    try {
        const user = await User.findByPk(req.params.id)

        res.status(200).send({
            id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } catch (error) {
        res.status(500).send(error)
    }
};

const getUserOrders = async (req, res) => {
    const query  = req.query.new
        try {
            const orders = query ? await Order.find().sort({id:-1}).limit(4) : await Order.find().sort({id:-1});
            res.status(200).send(orders);
        } catch (err) {
            res.status(500).send(err);
        }
};

const updateUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).send("Usuario no encontrado");

        if (req.body.email && req.body.email !== user.email) {
            const emailInUse = await User.findOne({ where: { email: req.body.email } });
            if (emailInUse) return res.status(400).send("El correo electrónico ya está en uso");
        }

        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }

        await user.update({
            name: req.body.name || user.name,
            email: req.body.email || user.email,
            isAdmin: req.body.isAdmin ?? user.isAdmin,
            password: req.body.password || user.password,
        });

        res.status(200).send({
            id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } catch (error) {
        res.status(500).send(error);
    }
};


  // GET MONTHLY INCOME
/* const getMonthlyIncome = async (req, res) => {
    const previousMonth = moment().month(moment().month() - 1).set("date", 1).format("YYYY-MM-DD HH:mm:ss");

    try {
        const users = await User.aggregate([
        { $match: { createdAt: { $gte: previousMonth } } },
        {
            $project: {
                month: { $month: "$createdAt" },
                sales: "$amount",
        },
        },
            {
            $group: {
                id: "$month",
                total: { $sum: 1 },
            },
        },
    ]);
        res.status(200).send(income);
    } catch (err) {
        res.status(500).send(err);
    }
}; */

module.exports = {userAll, userDelete, getUserId, getUserOrders, updateUser};