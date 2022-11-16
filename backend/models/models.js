import sequelize  from "../db.js";
import { DataTypes } from "sequelize";



const Language = sequelize.define("language", {
    id:{ type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true },
    value:{ type:DataTypes.STRING, unique:true },
    url:{ type:DataTypes.STRING, unique:true }
},{freezeTableName:true});


const Brand = sequelize.define("brand", {
    id:{ type:DataTypes.INTEGER, primaryKey:true, autoIncrement: true },
    value: { type: DataTypes.STRING, unique:true },
    country: { type: DataTypes.STRING }
},{freezeTableName:true});


const User = sequelize.define("user", {
    id:{ type:DataTypes.INTEGER, primaryKey: true, autoIncrement:true },
    username:{ type:DataTypes.STRING, unique:true },
    password:{ type: DataTypes.STRING },
    first_name:{ type: DataTypes.STRING },
    last_name:{ type: DataTypes.STRING },
    phone:{ type:DataTypes.STRING, unique:true },
    email:{ type:DataTypes.STRING, unique:true },
    role:{ type: DataTypes.STRING, defaultValue:"USER" }
},{freezeTableName:true});


const Product = sequelize.define("product", {
    id:{ type:DataTypes.INTEGER, primaryKey: true, autoIncrement:true },
    vendor_code:{ type:DataTypes.STRING, unique:true },
    price:{ type:DataTypes.DOUBLE, defaultValue: 0 },
    price_old:{ type:DataTypes.DOUBLE, defaultValue: 0 },
    amount:{ type:DataTypes.INTEGER },
    min_order_amount:{ type:DataTypes.INTEGER },
    max_order_amount:{ type:DataTypes.INTEGER },
    hiden:{ type:DataTypes.BOOLEAN, defaultValue: false },
    createdAt: { type:DataTypes.STRING }
    // category_id FK
    // brand_id
},{freezeTableName:true});

const Product_translate = sequelize.define("product_translate", {
    // product_id FK
    // language_id FK
    title:{ type:DataTypes.STRING, unique:true },
    description:{ type:DataTypes.STRING }
},{freezeTableName:true});

const Product_keyword = sequelize.define("product_keyword", {
    // language_id FK
    value:{ type:DataTypes.STRING }
},{freezeTableName:true});

const Product_img = sequelize.define("product_img", {
    id:{ type:DataTypes.INTEGER, primaryKey: true, autoIncrement:true },
    url:{ type:DataTypes.STRING },
    index:{ type:DataTypes.INTEGER }    
},{freezeTableName:true});


const Cart = sequelize.define("cart", {
    id:{ type:DataTypes.INTEGER, primaryKey: true, autoIncrement:true },
    // user_id FK
},{freezeTableName:true});

const Product_in_cart = sequelize.define("product_in_cart", {
    id:{ type:DataTypes.INTEGER, primaryKey: true, autoIncrement:true },
    amount:{ type:DataTypes.DOUBLE, defaultValue: 1 },
    // product_id FK 
    // cart_id
},{freezeTableName:true});


const Category = sequelize.define("category", {
    id:{ type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    parent_id:{ type:DataTypes.INTEGER, allowNull: true, defaultValue: null },
    hiden: {type:DataTypes.BOOLEAN, allowNull:false, defaultValue: false}
},{freezeTableName:true});

const Category_translate = sequelize.define("category_translate", {
    // category_id FK
    // language_id FK
    description:{ type:DataTypes.STRING, allowNull:false },
    title:{ type:DataTypes.STRING, allowNull: false, unique: true }
},{freezeTableName:true});

const Category_keyword = sequelize.define("category_translate", {
    // category_id FK
    // language_id FK
    value:{ type:DataTypes.STRING, unique:true, allowNull: false }
},{freezeTableName:true});


const Category_characteristics = sequelize.define("category_characteristics", {
    id: { type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true },
    value:{ type:DataTypes.STRING, allowNull: false }
    // category_id FK
    // language_id FK
},{freezeTableName:true});

const Product_characteristics = sequelize.define("product_characteristics", {
    id: { type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true },
    value: { type:DataTypes.STRING, allowNull: false }
    // product FK
    // Category_characteristics_id FK
    // language_id FK
},{freezeTableName:true});


const Order = sequelize.define("order", {
    id: { type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true },
    comment: { type:DataTypes.STRING }
    // user_id FK
    // product_in_order_id FK
    // status_id FK
},{freezeTableName:true});

const Product_in_order = sequelize.define("product_in_order", {
    id: { type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true },
    amount: { type:DataTypes.INTEGER, allowNull:false }
    // product_id FK
},{freezeTableName:true});


const Status = sequelize.define("status", {
    id: { type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true },
    color: { type:DataTypes.STRING, allowNull:false },
    // Status_translate_id FK
},{freezeTableName:true});

const Status_translate = sequelize.define("status_translate", {
    id: { type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true },
    value: { type:DataTypes.STRING, allowNull:false },
    // language_id FK    
},{freezeTableName:true});


const Review = sequelize.define("review", {
    grade:{ type:DataTypes.INTEGER, defaultValue: 0, allowNull: false },    
    text:{ type:DataTypes.STRING, allowNull:true},    
    // order_id FK
},{freezeTableName:true});

 
Language.hasMany(Category_translate);
Category_translate.hasOne(Category);

Category_keyword.hasOne(Category);
Category_keyword.hasOne(Language);
  
Category.hasMany(Product);

Product_characteristics.hasOne(Language);
Product_characteristics.hasOne(Category_characteristics);

Product.hasMany(Product_img);
Product.hasOne(Brand);
Product.hasMany(Product_characteristics);

Language.hasOne(Product_translate);
Product.hasMany(Product_translate);

Product_keyword.hasOne(Language);

User.hasOne(Cart);

Cart.hasMany(Product_in_cart);
Product.hasMany(Product_in_cart);

Category_translate.hasOne(Category);
Category_characteristics.hasOne(Category);
Category_keyword.hasOne(Category);

Language.hasOne(Status_translate);
Status_translate.hasOne(Status);

Product_in_order.hasOne(Product);

Order.hasMany(Product_in_order);
Order.hasOne(Status);

Review.hasOne(Order);

export {
    Language,
    Brand,
    User,
    Product,
    Product_characteristics,
    Product_img,
    Product_in_cart,
    Product_in_order,
    Product_keyword,
    Product_translate,
    Category,
    Category_characteristics,
    Category_keyword,
    Category_translate,
    Cart,
    Order,
    Status,
    Status_translate,
    Review 
};