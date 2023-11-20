import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const todolist = [];
const worklist = [];
var today = '';



const dateToday = (req,res,next) => {
	var options = { weekday: 'long', month: 'long', day: 'numeric' };
	var date = new Date();
	var formatDate = date.toLocaleDateString("en-US",options);
	var data = {date:formatDate};
	today = data.date;
	next();
}
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(dateToday);

app.get("/",(req,res)=>{
    res.render("index.ejs", { todolist: todolist, date: today});
});

app.get("/",(req,res)=>{
    res.render("work.ejs", { todolist: todolist, date: today});
});


app.post("/submit",(req,res)=>{
    todolist.push(req.body.list);
    res.redirect("/");
})

app.post('/work/submit', (req, res) => {
	worklist.push(req.body.list);
	res.redirect("/work", { worklist: worklist });
});



app.listen(port,()=>{
    console.log('listening on port 3000');
});