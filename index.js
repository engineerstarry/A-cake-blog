import express from "express";
import bodyParser from "body-parser";
const app = express();
const port = process.env.PORT || 3000;

// allows u to use static files
app.use(express.static("public"))


// allows information from the user to be accessed from the backend
app.use(bodyParser.urlencoded({ extended: true }));

// fetches the sight inside  res.render
app.get('/', (req, res) => {
res.render("index.ejs",{postHistory});
})
app.get('/Contact', (req, res) => {
res.render("Contact.ejs");
})
app.get('/faq', (req, res) => {
res.render("faq.ejs");
})
app.get("/about", (req,res) =>{
    res.render("about.ejs");
})

//array to contain all the posts in the homepage
var postHistory =[];

// id to identify each post in the array
var nextId = 0;

// when the button "done" is clicked it posts the recipe
app.post("/done",(req,res)=>{

const postData = req.body["post-recipe"];
const postData2= req.body["food-recipe"];
var id= nextId++;
postHistory.push({postData,postData2,id});

res.render("index.ejs",{postData:postData,
    postData2:postData2,
    postHistory:postHistory,
    id:id,
})






})


// when the delete button is clicked it deletes the selected post from the array
app.post("/delete/:id", (req,res)=>{
 const id = Number(req.params.id);   // get ID from URL

  postHistory = postHistory.filter(post => post.id !== id);
  // remove the post

  res.redirect("/"); // reload page  

})


// when edit button is clicked it directs user to an edit page prefilled with the old post data
app.get("/edit/:id", (req,res)=>{
const id = Number(req.params.id);
const post = postHistory.find(p => p.id == id);

if (post){
    res.render("edit.ejs",{post,id});
}
else{
res.status(404).send("Post not found");
}

}
)


/*
app.post("/edit/:id",(req,res)=>{
const id = Number(req.params.id);
const post = postHistory.find(p => p.id == id);
if (req.body.id) {

post =req.body;
}

})
*/

// when the done button is clicked in the edit page it updates the old post data with the edit
app.post("/done/:id",(req,res)=>{
  const id = Number(req.params.id);
 const patch = postHistory.find(c=>c.id == id);

 const postDataEdit = req.body["edited-recipe-name"];
const postDataEdit2= req.body["edited-recipe"];

 if(patch){
patch.postData = postDataEdit;
patch.postData2 = postDataEdit2;
 }
 else{
  res.status(404).send("cannot find patch variable")
 }

res.redirect("/")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})