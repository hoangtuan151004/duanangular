// //thực hiện thao tác CRUD
// const productModel = require('./product.model')
// const categoryModel = require('./category.model')
// const { router } = require("../app");

// module.exports = {getpros, getProductById, getByCategory,getHotProduct, getSaleProduct, getNewProduct}
// module.exports = {getNew, insert, getAll,getByKey,updateById, remove };

// //lấy danh sách sản phẩm
// async function getpros(){
//     try {
//         const result = await productModel.find()  //đợi để lấy tất cả các cơ sở dữ liệu trong productModel
//         return result
//     } catch (error) {
//         console.log('Lỗi lấy danh sách',error);
//         throw error

//     }
// }

// async function getProductById(productId) {
//     try {
//         const product = await productModel.findById(productId);
//         return product;
//     } catch (error) {
//         console.log('Lỗi lấy thông tin sản phẩm', error);
//         throw error;
//     }
// }

// async function getByCategory(category) {
//     try {
//       const productsCategory = await productModel
//         .find({
//           "category.categoryId": category,
//         })
//       return productsCategory;
//     } catch (error) {
//       console.log("Lỗi lấy sản phẩm theo danh mục", error);
//       throw error;
//     }
//   }

//   async function getHotProduct() {
//     try {
//         const result = await productModel.find({view: {$gte: 1000}}).sort({view: -1}).limit(8);
//         return result;
//     } catch (error) {
//         console.log('Lỗi lấy danh sách sản phẩm hot', error);
//         throw error;
//     }
// }

// async function getSaleProduct() {
//   try {
//       const prosale = await productModel.find().sort({price_2: -1}).limit(8);
//       return prosale;
//   } catch (error) {
//     console.log('Lỗi lấy danh sách sản phẩm giảm giá', error);

//       throw error;
//   }
// }

// async function getNewProduct() {
//   try {

//     const newProducts = await productModel.find().sort({ ngaytao: -1 }).limit(8);
//     return newProducts;
//   } catch (error) {
//     console.log('Lỗi lấy danh sách sản phẩm mới:', error.message);
//     throw error;
//   }
// }

// async function getAll() {
//   try {
//     // const result = await productModel.find().limit(6).sort({price: 1});  //1: sắp xếp tăng dần, -1 sắp xếp giảm dần

//     //select name, price, quantity
//     //  const result = await productModel.find({},{name:1,price:1,quantity:1});

//     //select name, price, quantity where price >10000
//     // const result = await productModel.find({price:{$gt:10000}},
//     //$gt: greater than; $lt: less than
//     //$gte: greater than or equal, $lte: less than or equal
//     // {name:1,price:1,quantity:1});

//     //select name, price, quantity where price >10000 and quantity >100
//     // const result = await productModel.find(
//     //   {
//     //     $and: [
//     //       {price:{$lt:10000}},
//     //     {quantity:{$lt:100}}
//     //     ]
//     //   },
//     // {name: 1,price:1,quantity:1}
//     // )

//     ////select name, price, quantity where price <10000 and price >20000
//     // const result = await productModel.find(
//     //   {
//     //     $or: [{ price: { $lt: 10000 } },
//     //           { price: { $gt: 20000 } }],
//     //   },
//     //   { name: 1, price: 1, quantity: 1 }
//     // );

//     //select name, price, quantity where name like %product%
//     const result= await productModel.find({
//       name:{$regex:'o',$option:'i'}
//       //không phân biệt hoa thường
//     },
//     { name: 1, price: 1, quantity: 1 }
//     )
//     return result;
//   } catch {
//     console.log("loi lay danh sach san pham", error);
//     throw error;
//   }
// }

// async function getNew (){
//   try {
//     const result = await productModel.find().sort({_id: -1}).limit(5)
//   } catch (error) {
//     console.log('Lỗi lấy sản phẩm mới')
//     throw error
//   }
// }

// //lấy sản phẩm theo id
// async function updateById(id, body){
//   try{
//     const pro = await productModel.findById(id)
//     if(!pro){
//       throw new Error('Không tìm thấy sản phẩm')
//     }
//     const {name,price,image,quantity, description, category} = body
//     let cateFind = null
//     if(category){
//       cateFind = await categoryModel.findById(category)
//     // const cateFind = await categoryModel.findById(category)
//     if(!cateFind){
//       throw new Error('Không tìm thấy danh mục')
//     }

//   }
//     const cateUpdate = cateFind?{
//       categoryId: cateFind._id,
//       categoryName: cateFind.name
//     }:pro.category
//     const result = await productModel.findByIdAndUpdate(
//       id, {name, price, image, quantity, description, category:cateUpdate},
//       {new: true}
//     )
//   }catch(error){
//     console.log("Lỗi update ", error);
//     throw error;
//   }
// }

const productModel = require("./product.model");
const categoryModel = require("./category.model");

module.exports = {
  getpros,
  getProductById,
  getByCategory,
  getGiaTangDan,
  getHotProduct,
  getSaleProduct,
  getNewProduct,
  getNew,
  insert,
  getAll,
  getProLienQuan,
  getByKey,
  updateById,
  remove,
  deleteByPrice,
  getProPage,
  getProductDetail,
  timvaxoa,
  getRelatedProductsByProductId,
  findByName
};

async function insert(body) {
  try {
    const { name, img, description, price, category } = body;
    //tim id danh muc tra trong collection categories
    const proNew = new productModel({
      name,
      description,
      img,
      price,
      category
    });
    //luu database
    const result = proNew.save();
    return result;
  } catch (error) {
    console.log("Lỗi insert product: ", error);
    throw error;
  }
}

async function getpros() {
  try {
    const result = await productModel.find();
    return result;
  } catch (error) {
    console.log("Lỗi lấy danh sách", error);
    throw error;
  }
}


async function getProductById(productId) {
  try {
    const product = await productModel.findById(productId);
    return product;
  } catch (error) {
    console.log("Lỗi lấy thông tin sản phẩm", error);
    throw error;
  }
}

//lấy danh sách sản phẩm theo danh mục
async function getByCategory(category) {
  try {
    const productsCategory = await productModel.find({
      "category.categoryId": category,
    });
    return productsCategory;
  } catch (error) {
    console.log("Lỗi lấy sản phẩm theo danh mục", error);
    throw error;
  }
}

//xem chi tiet
async function getProductDetail(productId) {
  try {
    const product = await productModel.findById(productId);
    if (!product) {
      throw new Error("Không tìm thấy sản phẩm");
    }
    return product;
  } catch (error) {
    console.error("Lỗi lấy thông tin chi tiết sản phẩm:", error);
    throw error;
  }
}

//sản phẩm nổi bật
async function getHotProduct() {
  try {
    const result = await productModel
      .find({ view: { $gte: 1000 } })
      .sort({ view: -1 })
      .limit(8);
    return result;
  } catch (error) {
    console.log("Lỗi lấy danh sách sản phẩm hot", error);
    throw error;
  }
}

async function getSaleProduct() {
  try {
    const prosale = await productModel.find().sort({ price_2: -1 }).limit(8);
    return prosale;
  } catch (error) {
    console.log("Lỗi lấy danh sách sản phẩm giảm giá", error);
    throw error;
  }
}

async function getNewProduct() {
  try {
    const newProducts = await productModel
      .find()
      .sort({ ngaytao: -1 })
      .limit(8);
    return newProducts;
  } catch (error) {
    console.log("Lỗi lấy danh sách sản phẩm mới:", error.message);
    throw error;
  }
}

async function getAll() {
  try {
    const result = await productModel.find();
    return result;
  } catch (error) {
    console.log("Lỗi lấy danh sách sản phẩm", error);
    throw error;
  }
}

async function getNew() {
  try {
    const result = await productModel.find().sort({ _id: -1 }).limit(5);
    return result;
  } catch (error) {
    console.log("Lỗi lấy sản phẩm mới", error);
    throw error;
  }
}

// async function insert(body) {
//   try {
//     const { name, description, image, price, quantity, category } = body;
//     const categoryFind = await categoryModel.findById(category);
//     if (!categoryFind) {
//       throw new Error("Không tìm thấy danh mục");
//     }
//     const proNew = new productModel({
//       name,
//       description,
//       image,
//       price,
//       quantity,
//       category: {
//         categoryId: categoryFind._id,
//         categoryName: categoryFind.name,
//       },
//     });
//     const result = await proNew.save();
//     return result;
//   } catch (error) {
//     console.log("Lỗi insert product: ", error);
//     throw error;
//   }
// }

async function getProductById(productId) {
  try {
    const product = await productModel.findById(productId);
    return product;
  } catch (error) {
    console.log("Lỗi lấy thông tin sản phẩm", error);
    throw error;
  }
}

//tìm kiếm sản phẩm
async function getByKey(key, value) {
  try {
    let pro = await productModel.findOne(
      { [key]: value },
      "name price_2 category"
    );
    pro = {
      Masp: pro._id,
      Ten: pro.name,
      Gia: pro.price,
      Danhmuc: pro.category,
    };
    return pro;
  } catch (error) {
    console.log("Lỗi lấy sản phẩm: ", error);
    throw error;
  }
}

//Lấy danh sách sản phẩm có sắp xếp giá tăng dần và giới hạn số lượng

async function getGiaTangDan() {
  try {
    const sanPhamSapXep = await productModel
      .find()
      .sort({ price_2: 1 })
      .limit(4);
    return sanPhamSapXep;
  } catch (error) {
    console.log(
      "Lấy danh sách sản phẩm có sắp xếp giá tăng dần và giới hạn số lượng:",
      error
    );
    throw error;
  }
}

//Lấy danh sách sản phẩm liên quan với sản phẩm hiển thị ở trang chi tiết
async function getProLienQuan(productId) {
  try {
    // Lấy thông tin sản phẩm cụ thể
    const sanPham = await productModel.findById(productId);
    const sanPhamLienQuan = await productModel.find({
      $and: [
        { "category.categoryId": sanPham.category.categoryId }, // lay san pham cung danh muc
        { _id: { $ne: productId } }, // bo qua san pham hien tai
      ],
    });
    return sanPhamLienQuan;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách sản phẩm liên quan:", error.message);
    throw error;
  }
}

// Tìm và xóa sản phẩm có điều kiện tên
async function timvaxoa(name) {
  try {
    const result = await productModel.findOneAndDelete({ name: name });
    return result;
  } catch (error) {
    console.error("Lỗi xóa sản phẩm không thành công:", error);
    throw error;
  }
}

// Tìm và xóa nhiều sản phẩm có điều kiện giá nhỏ hơn hoặc bằng
async function deleteByPrice(price) {
  try {
    const deletedProducts = await productModel.deleteMany({
      price_2: { $lte: price },
    });
    return deletedProducts;
  } catch (error) {
    console.error("Lỗi tìm và xóa sản phẩm:", error.message);
    throw error;
  }
}

//Lấy danh sách sản phẩm theo trang và giới hạn số lượng

async function getProPage(page, limit) {
  try {
    const skip = (page - 1) * limit;
    const result = await productModel.find().skip(skip).limit(limit);
    return result;
  } catch (error) {
    console.log("Lỗi lấy sản phẩm theo trang", error.message);
    throw error;
  }
}

async function updateById(id, body) {
  try {
    const product = await productModel.findById(id);
    if (!product) {
      throw new Error("Không tìm thấy sản phẩm");
    }
    const { name, price, img, description, category } = body;
    let categoryFind = null;
    if (category) {
      categoryFind = await categoryModel.findById(category);
      if (!categoryFind) {
        throw new Error("Không tìm thấy danh mục");
      }
    }
    const categoryUpdate = categoryFind
      ? {
          categoryId: categoryFind._id,
          categoryName: categoryFind.name,
        }
      : product.category;

    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      { name, price, img, description, category: categoryUpdate },
      { new: true }
    );
    return updatedProduct;
  } catch (error) {
    console.log("Lỗi update sản phẩm", error);
    throw error;
  }
}
// async function updateById(id, body) {
//   try {
//     const pro = await productModel.findById(id);
//     if (!pro) {
//       throw new Error("Không tìm thấy sản phẩm");
//     }
//     const { name, price_1,price_2,image, mota_1,mota_2, category } = body;
//     let cateFind = null;
//     if (category) {
//       cateFind = await categoryModel.findById(category);
//       if (!cateFind) {
//         throw new Error("Không tìm thấy danh mục");
//       }
//     }
//     const cateUpdate = cateFind
//       ? {
//           categoryId: cateFind._id,
//           categoryName: cateFind.name,
//         }
//       : pro.category;
//     const result = await productModel.findByIdAndUpdate(
//       id,
//       { name, price_1,price_2, image, mota_1, mota_2, category: cateUpdate },
//       { new: true }
//     );
//     return result;
//   } catch (error) {
//     console.log("Lỗi update ", error);
//     throw error;
//   }
// }

// xóa sp theo id
async function remove(id) {
  try {
    const result = await productModel.findByIdAndDelete(id);
    return result;
  } catch (error) {
    console.log("Lỗi xóa product không thành công", error);
    throw error;
  }
}


async function getRelatedProductsByProductId(id) {
  try {
      // Tìm sản phẩm với productId được cung cấp
      const product = await productModel.findById(id);
      // Trích xuất categoryId từ sản phẩm tìm được
      const categoryId = product.category.categoryId;

      // Tìm tất cả các sản phẩm trong cùng một category
      const relatedProducts = await productModel.find({
          'category.categoryId': categoryId,
          _id: { $ne: id } // loại trừ sản phẩm hiện tại
      }).limit(4);
      console.log('Related Products in controller:', relatedProducts); // Kiểm tra kết quả trả về từ database

      return relatedProducts;
  } catch (error) {
      console.log('Lỗi lấy sản phẩm liên quan', error);
      throw error;
  }
}
async function findByName(name) {
  try {
    // Thay thế các dấu cách bằng ".*" để tìm kiếm bất kỳ ký tự nào
    const regexName = name.replace(/\s/g, ".*");

    const products = await productModel.find({ name: { $regex: regexName, $options: "i" } });
    return products;
  } catch (error) {
    console.error("Lỗi khi tìm kiếm sản phẩm theo tên:", error.message);
    throw error;
  }
}


