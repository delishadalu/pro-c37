//Create variables here
var dog,database,food,milk,feedtime

var dogimg,happydogimg,bedroomimg,gardenimg,washroomimg

var gameState="hungry";

var currentTime,button1,button2;

function preload()
{
  //load images here
  dogimg= loadImage("images/dogImg.png");
  happyDogimg=loadImage("images/dogImg1.png");
  bedroomimg=loadImage("images/BedRoom.png")
  washroomimg=loadImage("images/WashRoom.png")
  gardenimg=loadImage("images/Garden.png")
}

function setup() {
	createCanvas(1200, 500);
  database= firebase.database()

  dog= createSprite(900,300,50,50)
  dog.addImage(dogimg)
  dog.scale=0.15

  milk= new Food()
 
 

 button1= createButton("feed the dog")
button1.position(500,80)
button1.mousePressed(function(){
  milk.feedDog()
})

 button2=createButton("add feed")
button2.position(600,80)
button2.mousePressed(function(){
  milk.addFeed()
})

milk.getData();

database.ref("gameState").on("value",function(data){
  gameState=data.val();
})


}


function draw() {  

  
  if(gameState==="hungry")
  {
    background(46,139,87);
    button1.show();
    dog.addImage(dogimg);
      
  }
  
  else 
  {
    button1.hide()
   dog.remove()
   
  
  }

  currentTime=20
 
  
        if(currentTime===(feedtime+1))
        {
          milk.garden()
          
          database.ref("/").update({
            'gameState': "playing"
          })
        }

         else if(currentTime===(feedtime+2))
        {
          milk.bedroom();
          database.ref("/").update({
            'gameState': "sleeping"
          })
        }

        else if (currentTime>(feedtime+2) && currentTime<(feedtime+4))
        {
          milk.washroom();
          database.ref("/").update({
            'gameState': "bathing"
          })
        }

        else 
        { 
          
          milk.display()
         
            database.ref("/").update({
            'gameState': "hungry"
        })
        }
       
      

       
  drawSprites();
  //add styles here

  fill("white")
  textSize(15)
text ("last fed at: "+feedtime,300,45)

}



