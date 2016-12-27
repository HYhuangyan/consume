var gulp = require("gulp");

var webserver = require("gulp-webserver");

var url = require("url");
var fs = require("fs");

var sass = require("gulp-sass");

var webpack = require("gulp-webpack");

var named = require("vinyl-named");

var uglify = require("gulp-uglify");

var minifyCss = require("gulp-minify-Css");

var rev = require("gulp-rev");

var revCollector = require("gulp-rev-collector");
var watch = require("gulp-watch");

var sequence = require("gulp-watch-sequence");

/*

1. 创建src（src是开发目录。所有操作都在src中进行）目录
2.在src创建index。html（因为我们制作的是spa项目）


 */
gulp.task("copy-index",function(){
	return gulp.src("./src/index.html")
	.pipe(gulp.dest("./www"))

	
})

gulp.task("copy-img",function(){
	return gulp.src("./src/img/**")
	.pipe(gulp.dest("./www/css/img"))

	
})
gulp.task("copy-json",function(){
	return gulp.src("./mock/**")
	.pipe(gulp.dest("./www/mock"))

	
})



/*webserver的本地服务器配置*/

gulp.task("webserver",function(){
	gulp.src("./www")
	.pipe(webserver({
		livereload:true,
	/*	directoryListing:true,*/
		open:true,	// 自己直接打开

		middleware:function(req,res,next){
			//获取浏览器的url，将url进行解析
			var urlObj = url.parse(req.url,true),
			method = req.method;

			switch(urlObj.pathname){

				case "/skill":
					//
					res.setHeader("Content-Type","application/json");
					//通过filleStstem文件操作函数去读取制定目录下的json文件。并将读取到的内容返回浏览器端
					fs.readFile("./mock/skill.json","utf-8",function(err,data){
						res.end(data);
					})
				return;

				case "/project":
					//
					res.setHeader("Content-Type","application/json");
					//通过filleStstem文件操作函数去读取制定目录下的json文件。并将读取到的内容返回浏览器端
					fs.readFile("./mock/project.json","utf-8",function(err,data){
						res.end(data);
					})
				return;

				case "/work":
					//
					res.setHeader("Content-Type","application/json");
					//通过filleStstem文件操作函数去读取制定目录下的json文件。并将读取到的内容返回浏览器端
					fs.readFile("./mock/work.json","utf-8",function(err,data){
						res.end(data);
					})
				return;
			}

			next();//next是实现循环
		}//end middleware

	
	}))
})


/*实现mock模拟数据操作现在根目录下创建mock目录*/

gulp.task("sasstocss",function(){
	return gulp.src("./src/style/index.css")
	.pipe(sass())
	.pipe(minifyCss())
	.pipe(gulp.dest("./www/css"));

	
})

gulp.task("packjs",function(){
	return gulp.src("./src/scripts/index.js")
	.pipe(named())
	.pipe(webpack())
	.pipe(uglify())
	.pipe(gulp.dest("./www/js"));
})


var cssDistFiles = ["./www/css/index.css"]
var jsDistFiles = ["./www/js/index.js"]

gulp.task("verCss",function(){
	return gulp.src(cssDistFiles)
	.pipe(rev())
	.pipe(gulp.dest("./www/css"))
	.pipe(rev.manifest())
	.pipe(gulp.dest("./www/ver/css"))

})

gulp.task("verJs",function(){
	return gulp.src(jsDistFiles)
	.pipe(rev())
	.pipe(gulp.dest("./www/js"))
	.pipe(rev.manifest())
	.pipe(gulp.dest("./www/ver/js"))

})

gulp.task("html",function(){
	gulp.src(["./www/ver/**/*.json","./www/*.html"])
	.pipe(revCollector({
		replaceReved:true
	}))
	.pipe(gulp.dest("./www"))

})




gulp.task("watch",function(){
	gulp.watch("./src/index.html",["copy-index"]);
	
	var queue = sequence(300);
	
	watch("./src/style/**",{
		name:"CSS",
		emitOnGlob:false
	},queue.getHandler("sasstocss","verCss","html"));

	watch("./src/scripts/**/*.js",{
		name:"JS",
		emitOnGlob:false
	},queue.getHandler("packjs","verJs","html"));
})

gulp.task("default",["webserver","watch"])
