
var swiper = require("../scripts/common/libs/swiper/swiper.min.js");
var swiperAni = require("../scripts/common/libs/swiper/swiper.animate1.0.2.min.js");
var $=require("../scripts/common/libs/zepto-modules/zepto.js");
      require("../scripts/common/libs/zepto-modules/selector.js");
      require("../scripts/common/libs/zepto-modules/ajax.js");
      require("../scripts/common/libs/zepto-modules/event.js");
      require("../scripts/common/libs/zepto-modules/fx.js");
      require("../scripts/common/libs/zepto-modules/touch.js");
var IScroll = require("../scripts/common/libs/iscroll/iscroll.js");
var echarts = require('../scripts/common/libs/echarts.js');

     var rotate_resume = document.getElementById("rotate_resume");

var swiper = new Swiper('.swiper-container',{
          onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
            swiperAni.swiperAnimateCache(swiper); //隐藏动画元素 
            swiperAni.swiperAnimate(swiper); //初始化完成开始动画
          }, 
          onSlideChangeEnd: function(swiper){ 
            swiperAni.swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
          },

           nextButton: '.swiper-button-next',
  	       prevButton: '.swiper-button-prev',
  	       pagination: '.swiper-pagination',
  	       paginationType: 'progress'
    });

   // $(".swiper-container").css("display","none");
   // 
   // 
     var myScroll;
    $("#detail_scro").hide();
    $("#clickme").click(function(){
          play_music();
          rotate_resume.style.display = "none";
           clearInterval(timer);
          $(".swiper-container").hide();
          $("#detail_scro").show();
           $("#wrapper").addClass("skill");
         myScroll = new IScroll('#wrapper', { mouseWheel: true });
        document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);


    })









skillPie();
function skillPie(){

 var myChart = echarts.init(document.getElementById('pietu'));
        // 指定图表的配置项和数据
        var option = {
    title : {
        text: 'skill',
        subtext: '纯属虚构',
        x:'left'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        x : 'left',
        y : 'bottom',
        data:['规范','框架','类库','插件','布局','程序']
    },
    toolbox: {
        show : true,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            magicType : {
                show: true,
                type: ['pie', 'funnel']
            },
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    series : [
        {
            name:'skillDisplay',
            type:'pie',  
            radius : [20, 90],
            center : ['50%', '50%'],
            roseType : 'area',
            data:[
                {value:10, name:'规范'},
                {value:5, name:'框架'},
                {value:15, name:'类库'},
                {value:25, name:'插件'},
                {value:35, name:'布局'},
                {value:20, name:'程序'}
                
            ]
        }
    ]
};

        myChart.setOption(option);
}

    



      addjson("skill");
   $(".aboutme").css("display","none");
   
    $("#footer").find("ul li").tap(function(){

      var index = $(this).index();
      
      var jsonname = $(this).attr("id");
      $("#wrapper").attr("class","");
      $("#wrapper").addClass(jsonname);

      if(jsonname !="skill"){
        document.getElementById('pietu').style.display = "none" ;

      }else{
         document.getElementById('pietu').style.display = "block" ;
      }
      $(this).css("color","darkred").siblings('li').css("color","white");


      if(jsonname=="aboutme"){
          $(".aboutme").css("display","block");
          $("#scroller ul").css("display","none");
        
      }else{
          $("#scroller ul").css("display","block");
          addjson(jsonname);
          $(".aboutme").css("display","none");
      
      }
     
   


 myScroll.scrollTo(0,0);
})


 function addjson(jsonname){
        $.post('http://localhost:8000/'+jsonname, function(response){
          
         
          var str2="";
          for(var i=0;i<response.length;i++){  
            str2+="<li>";
            var str="";
            var str1="";
            str1+="<div class='div1'>";
            str+="<div class='div2'>";
             for(var each in response[i]){
                 if(each==="image"){

                    str1 +="<img src = '"+response[i][each]+"'/>";
               
                }else{
                  
                  str +="<p>"+response[i][each]+"</p>";  
                
                }
              
                     }
                     str1+="</div>"
              str+="</div>";
              str2 = str2+ str1+ str ;
             }
            $("#scroller").find("ul").html(str2);
            myScroll = new IScroll('#wrapper', { mouseWheel: true, checkDOMChanges:true });
            document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
              

          

          setTimeout(function(){
            myScroll.scrollTo(0,0);
            myScroll.refresh();

          }, 100)
                  })
      }






 function play_music(){
      if ($('#mc_play').hasClass('on')){
          $('#mc_play audio').get(0).pause();
          $('#mc_play').attr('class','stop');
      }else{
          $('#mc_play audio').get(0).play();
          $('#mc_play').attr('class','on');
      }
      $('#music_play_filter').hide();
      event.stopPropagation(); //阻止冒泡 
}

   var play_filter=document.getElementById('mc_play');
   play_filter.addEventListener('click', function(){
        play_music();
    });



 var bian= document.getElementById("bian");

    var deg = 0;

    var timer = setInterval(function(){
      if(deg<360){
        bian.style.transform = "rotate("+deg+"deg)";
        rotate_resume.style.transform = "rotate("+deg+"deg)";
        deg++;
        }else{
        deg=0;
         }
         }, 5);



var c = document.getElementById('c'),
    ctx = c.getContext('2d'),
    cw = c.width = 400,
    ch = c.height = 300,
    rand = function(a,b){return ~~((Math.random()*(b-a+1))+a);},
    dToR = function(degrees){
        return degrees * (Math.PI / 180);
    },
    circle = {
      x: (cw / 2) + 5,
      y: (ch / 2) + 22,
      radius: 90,
      speed: 2,
      rotation: 0,
      angleStart: 270,
      angleEnd: 90,
      hue: 220,
      thickness: 18,
      blur: 25
    },
    particles = [],
    particleMax = 100,
    updateCircle = function(){
      if(circle.rotation < 360){
        circle.rotation += circle.speed;
      } else {
        circle.rotation = 0; 
      }
    },
    renderCircle = function(){
      ctx.save();
      ctx.translate(circle.x, circle.y);
      ctx.rotate(dToR(circle.rotation));
      ctx.beginPath();
      ctx.arc(0, 0, circle.radius, dToR(circle.angleStart), dToR(circle.angleEnd), true);
      ctx.lineWidth = circle.thickness;    
      ctx.strokeStyle = gradient1;
      ctx.stroke();
      ctx.restore();
    },
    renderCircleBorder = function(){
      ctx.save();
      ctx.translate(circle.x, circle.y);
      ctx.rotate(dToR(circle.rotation));
      ctx.beginPath();
      ctx.arc(0, 0, circle.radius + (circle.thickness/2), dToR(circle.angleStart), dToR(circle.angleEnd), true);
      ctx.lineWidth = 2;  
      ctx.strokeStyle = gradient2;
      ctx.stroke();
      ctx.restore();
    },
    renderCircleFlare = function(){
      ctx.save();
      ctx.translate(circle.x, circle.y);
      ctx.rotate(dToR(circle.rotation+185));
      ctx.scale(1,1);
      ctx.beginPath();
      ctx.arc(0, circle.radius, 30, 0, Math.PI *2, false);
      ctx.closePath();
      var gradient3 = ctx.createRadialGradient(0, circle.radius, 0, 0, circle.radius, 30);      
      gradient3.addColorStop(0, 'hsla(330, 50%, 50%, .35)');
      gradient3.addColorStop(1, 'hsla(330, 50%, 50%, 0)');
      ctx.fillStyle = gradient3;
      ctx.fill();     
      ctx.restore();
    },
    renderCircleFlare2 = function(){
      ctx.save();
      ctx.translate(circle.x, circle.y);
      ctx.rotate(dToR(circle.rotation+165));
      ctx.scale(1.5,1);
      ctx.beginPath();
      ctx.arc(0, circle.radius, 25, 0, Math.PI *2, false);
      ctx.closePath();
      var gradient4 = ctx.createRadialGradient(0, circle.radius, 0, 0, circle.radius, 25);
      gradient4.addColorStop(0, 'hsla(30, 100%, 50%, .2)');
      gradient4.addColorStop(1, 'hsla(30, 100%, 50%, 0)');
      ctx.fillStyle = gradient4;
      ctx.fill();     
      ctx.restore();
    },
    createParticles = function(){
      if(particles.length < particleMax){
        particles.push({
          x: (circle.x + circle.radius * Math.cos(dToR(circle.rotation-85))) + (rand(0, circle.thickness*2) - circle.thickness),
          y: (circle.y + circle.radius * Math.sin(dToR(circle.rotation-85))) + (rand(0, circle.thickness*2) - circle.thickness),
          vx: (rand(0, 100)-50)/1000,
          vy: (rand(0, 100)-50)/1000,
          radius: rand(1, 6)/2,
          alpha: rand(10, 20)/100
        });
      }
    },
    updateParticles = function(){
      var i = particles.length;
      while(i--){
        var p = particles[i];
        p.vx += (rand(0, 100)-50)/750;
        p.vy += (rand(0, 100)-50)/750;
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= .01;
        
        if(p.alpha < .02){
          particles.splice(i, 1)
        }
      }
    },
    renderParticles = function(){
      var i = particles.length;
      while(i--){
        var p = particles[i];
        ctx.beginPath();
        ctx.fillRect(p.x, p.y, p.radius, p.radius);
        ctx.closePath();
        ctx.fillStyle = 'hsla(0, 0%, 100%, '+p.alpha+')';
      }
    },
    clear = function(){
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0, 0, 0, .1)';
      ctx.fillRect(0, 0, cw, ch);
      ctx.globalCompositeOperation = 'lighter';   
    }
    loop = function(){
      clear();
      updateCircle();
      renderCircle();
      renderCircleBorder();
      renderCircleFlare();
      renderCircleFlare2();
      createParticles();
      updateParticles();
      renderParticles();
    }

/* Append Canvas */
//document.body.appendChild(c);

/* Set Constant Properties */
ctx.shadowBlur = circle.blur;
ctx.shadowColor = 'hsla('+circle.hue+', 80%, 60%, 1)';
ctx.lineCap = 'round'
  
var gradient1 = ctx.createLinearGradient(0, -circle.radius, 0, circle.radius);
gradient1.addColorStop(0, 'hsla('+circle.hue+', 60%, 50%, .25)');
gradient1.addColorStop(1, 'hsla('+circle.hue+', 60%, 50%, 0)');
  
var gradient2 = ctx.createLinearGradient(0, -circle.radius, 0, circle.radius);
gradient2.addColorStop(0, 'hsla('+circle.hue+', 100%, 50%, 0)');
gradient2.addColorStop(.1, 'hsla('+circle.hue+', 100%, 100%, .7)');
gradient2.addColorStop(1, 'hsla('+circle.hue+', 100%, 50%, 0)');

/* Loop It, Loop It Good */
setInterval(loop, 16);
