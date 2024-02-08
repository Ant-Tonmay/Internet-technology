const router = require("express").Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const filePath = "/home/ant/Documents/Internet-Tech/Assignment2/data-history.json";
    var obj;
    const fname = `${Date.now()}-${file.originalname}` ;
    fs.readFile(filePath, "utf8", function (err, data) {
      if (err) throw err;
      obj = JSON.parse(data);
      obj.push(fname);
      console.log(obj);
      fs.writeFile(filePath,JSON.stringify(obj),'utf-8',(err)=>{
        if(err){
          console.log(err)
        }
      })
    });
    
    return cb(null, fname);
  },
});

//const upload = multer({dest:"/uploads"})
const upload = multer({ storage: storage });

router.get("/", async (req, res) => {
  res.render("upload-data");
});

router.post("/", upload.single("fileInput"), async (req, res) => {
  res.send("Uploaded Succesfully!!");
});

module.exports = router;
