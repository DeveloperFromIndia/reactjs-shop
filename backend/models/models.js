import sequelize  from "../db.js";
import { DataTypes } from "sequelize";


const Currencies = sequelize.define("currencies", {
    id:{ type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true },
    value:{ type:DataTypes.STRING, defaultValue:1 },
    sign:{ type:DataTypes.STRING, unique:true, allowNull: false },
});


const Language = sequelize.define("language", {
    id:{ type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true },
    title:{ type:DataTypes.STRING, unique:true, allowNull: false },
    url:{ type:DataTypes.STRING, allowNull:true }
});


const Brand = sequelize.define("brand", {
    id:{ type:DataTypes.INTEGER, primaryKey:true, autoIncrement: true },
    value: { type: DataTypes.STRING, unique:true },
    country: { type: DataTypes.STRING },
    url: { type: DataTypes.STRING, allowNull:true }
});

const Users = sequelize.define("users", {
    id:{ type:DataTypes.INTEGER, primaryKey: true, autoIncrement:true },
    username:{ type:DataTypes.STRING, unique:true },
    password:{ type: DataTypes.STRING },
    first_name:{ type: DataTypes.STRING },
    last_name:{ type: DataTypes.STRING },
    phone:{ type:DataTypes.STRING, unique:true },
    email:{ type:DataTypes.STRING, unique:true },
    full_name: { type:DataTypes.VIRTUAL, 
        get() { return `${this.first_name} ${this.last_name}`},
        set(value) { throw new Error("ACTION FORBIDDEN")}
    }
}, { timestamps: true });


const Product = sequelize.define("product", {
    id:{ type:DataTypes.INTEGER, primaryKey: true, autoIncrement:true },
    vendor_code:{ type:DataTypes.STRING, unique:true },
    price:{ type:DataTypes.DOUBLE, defaultValue: 0 },
    price_old:{ type:DataTypes.DOUBLE, defaultValue: 0 },
    amount:{ type:DataTypes.INTEGER },
    min_order_amount:{ type:DataTypes.INTEGER, defaultValue:1 },
    max_order_amount:{ type:DataTypes.INTEGER, allowNull: true, defaultValue: null },
    hiden:{ type:DataTypes.BOOLEAN, defaultValue: false },
}, { timestamps:true });

const Product_translate = sequelize.define("product_translate", {
    id:{ type:DataTypes.INTEGER, primaryKey: true, autoIncrement:true },
    title:{ type:DataTypes.STRING },
    description:{ type:DataTypes.STRING },
});


const Product_keyword = sequelize.define("product_keyword", {
    value:{ type:DataTypes.STRING }
});

const Product_img = sequelize.define("product_img", {
    id:{ type:DataTypes.INTEGER, primaryKey: true, autoIncrement:true },
    url:{ type:DataTypes.STRING },
    public_id:{ type:DataTypes.STRING },
    index:{ type:DataTypes.INTEGER }    
});


const Cart = sequelize.define("cart", {
    id:{ type:DataTypes.INTEGER, primaryKey: true, autoIncrement:true },
}, { timestamps:true });

const Product_in_cart = sequelize.define("product_in_cart", {
    id:{ type:DataTypes.INTEGER, primaryKey: true, autoIncrement:true },
    amount:{ type:DataTypes.DOUBLE, defaultValue: 1 },
});


const Category = sequelize.define("category", {
    id:{ type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    hiden: {type:DataTypes.BOOLEAN, allowNull:false, defaultValue: false}
}, { timestamps:true });

const Category_img = sequelize.define("category_img", {
    url:{ type:DataTypes.STRING, allowNull:true },
    index:{ type:DataTypes.INTEGER, allowNull: false },
    public_id:{ type:DataTypes.STRING, allowNull: false }
});

const Category_translate = sequelize.define("category_translate", {
    id:{ type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    description:{ type:DataTypes.STRING, allowNull:true },
    title:{ type:DataTypes.STRING, allowNull: false, unique: true }
});

const Category_keyword = sequelize.define("category_keyword", {
    id:{ type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    value:{ type:DataTypes.STRING, unique:true, allowNull: false }
});


const Category_characteristics = sequelize.define("category_characteristics", {
    id: { type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true },
});

const Product_characteristics = sequelize.define("product_characteristics", {
    id: { type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true },
    value: { type:DataTypes.STRING, allowNull: false }
});


const Characteristics = sequelize.define("characteristics", {
    id: { type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true },
});

const Characteristics_translate = sequelize.define("characteristics_translate", {
    value: { type:DataTypes.STRING, allowNull: false },
    decimal: { type:DataTypes.STRING, allowNull: true },
    about: { type:DataTypes.STRING, allowNull: true }
});

const Orders = sequelize.define("orders", {
    id: { type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true },
    comment: { type:DataTypes.STRING , allowNull:true}
}, { timestamps:true });

const Product_in_order = sequelize.define("product_in_order", {
    id: { type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true },
    price: { type:DataTypes.DOUBLE, allowNull:false },
    amount: { type:DataTypes.INTEGER, allowNull:false }
}, { timestamps:true });


const Status = sequelize.define("status", {
    id: { type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true },
    url: { type:DataTypes.STRING, allowNull: true },
    color: { type:DataTypes.STRING, allowNull:false },
});

const Status_translate = sequelize.define("status_translate", {
    id: { type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true },
    value: { type:DataTypes.STRING, allowNull:false },
});


const Review = sequelize.define("review", {
    grade:{ type:DataTypes.INTEGER, defaultValue: 0, allowNull: false },    
    text:{ type:DataTypes.STRING, allowNull:true},    
}, { timestamps:true });




Users.hasOne(Cart, { onDelete: "CASCADE" });
Cart.belongsTo(Users);

Users.hasMany(Orders);
Orders.belongsTo(Users);

Status.hasMany(Orders);
Orders.belongsTo(Status);

Cart.belongsToMany(Product, { through: Product_in_cart });
Product.belongsToMany(Cart, { through: Product_in_cart });

Product.hasMany(Product_img, { onDelete: "CASCADE" });
Product_img.belongsTo(Product);

Category.hasOne(Category);

Category.hasMany(Category_img);
Category_img.belongsTo(Category);

Category.hasMany(Product);
Brand.hasMany(Product);

Product.belongsToMany(Language, { through: Product_translate });
Language.belongsToMany(Product, { through: Product_translate });

Category.belongsToMany(Language, { through: Category_translate });
Language.belongsToMany(Category, { through: Category_translate });

Category_translate.hasMany(Category_keyword, { onDelete:"CASCADE" });
Category_keyword.belongsTo(Category_translate);

Characteristics.belongsToMany(Language, { through: Characteristics_translate });
Language.belongsToMany(Characteristics, { through: Characteristics_translate });

Category.belongsToMany(Characteristics, {through: Category_characteristics});
Characteristics.belongsToMany(Category, {through: Category_characteristics});

Characteristics.belongsToMany(Product, { through: Product_characteristics });
Product.belongsToMany(Characteristics, { through: Product_characteristics });

Product_translate.hasMany(Product_keyword, { onDelete:"CASCADE" });
Product_keyword.belongsTo(Product_translate);

Status.belongsToMany(Language, { through:Status_translate });
Language.belongsToMany(Status, { through:Status_translate });

Orders.belongsToMany(Product, { through: Product_in_order });
Product.belongsToMany(Orders, { through: Product_in_order });

Orders.hasOne(Review);
Review.belongsTo(Orders);



export {
    Language,
    Brand,
    Users,
    Product,
    Product_characteristics,
    Product_img,
    Product_in_cart,
    Product_in_order,
    Product_keyword,
    Product_translate,
    Category,
    Category_img,
    Category_characteristics,
    Category_keyword,
    Category_translate,
    Characteristics,
    Characteristics_translate,
    Cart,
    Orders,
    Status,
    Status_translate,
    Review,
    Currencies 
};