var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Express' });
});

module.exports = router;


let currentpage=1;
let totalpage=0
const next=()=>{
  if(currentpage<totalpage){
    currentpage++
    getAllPage(currentpage)
  }
}

const prev =()=>{
  if(currentpage>1){
    currentpage--
    getAllPage(currentpage)
  }

const getAllPage = async(page=currentpage,limit= 10)=>{
  const response = await fetch(
    `http://localhost:3000/product?page=${page}&{limit}`
  )
  const data = await response.json();
  console.log(data)
  totalpage=data.countPage;
  let kq=""
  let stt=1
  data.result.map((i)=>{
    kq+=``
  })
}
}