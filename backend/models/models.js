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
    title:{ type:DataTypes.STRING, unique:true },
    description:{ type:DataTypes.STRING }
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
    value:{ type:DataTypes.STRING, unique:true, allowNull: false }
});


const Category_characteristics = sequelize.define("category_characteristics", {
    id: { type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true },
    value:{ type:DataTypes.STRING, allowNull: false }
});

const Product_characteristics = sequelize.define("product_characteristics", {
    value: { type:DataTypes.STRING, allowNull: false }
});


const Orders = sequelize.define("orders", {
    id: { type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true },
    comment: { type:DataTypes.STRING }
}, { timestamps:true });

const Product_in_order = sequelize.define("product_in_order", {
    id: { type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true },
    amount: { type:DataTypes.INTEGER, allowNull:false }
}, { timestamps:true });


const Status = sequelize.define("status", {
    id: { type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true },
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

 
Product.hasMany(Product_img);
Product.hasMany(Product_translate);
Product_translate.hasMany(Product_keyword);
Language.hasMany(Product_translate);
Brand.hasMany(Product);

Category.hasMany(Category_translate);
Category_translate.hasMany(Category_keyword);

Category.belongsTo(Category);
Category.hasMany(Product);
Category.hasMany(Category_img);
Category.hasMany(Category_characteristics);
Language.hasMany(Category_characteristics);

Category_characteristics.hasMany(Product_characteristics);
Product.hasMany(Product_characteristics);

Cart.hasMany(Product_in_cart);
Product.hasMany(Product_in_cart);

Users.hasOne(Cart);

Users.hasMany(Orders);
Status.hasOne(Orders);

Status.hasOne(Status_translate);
Language.hasMany(Status_translate);


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
    Cart,
    Orders,
    Status,
    Status_translate,
    Review,
    Currencies 
};