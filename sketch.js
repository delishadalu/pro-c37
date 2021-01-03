//Create variables here
var dog,database,food
var dogimg,happydogimg
function preload()
{
  //load images here
  dogimg= loadImage("images/dogImg.png");
  happyDogimg=loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
  database= firebase.database()

  dog= createSprite(250,300,50,50)
  dog.addImage(dogimg)
  dog.scale=0.15

  database.ref('food').on("value",readStock)
}


function draw() {  
background(46,139,87)
if(food!==0)
{
  dog.addImage(dogimg)
}

if(keyWentDown(UP_ARROW)){
  dog.addImage(happyDogimg)
  writeStock(food)
}

  drawSprites();
  //add styles here

  fill("white")
textSize(15)
text("press up arrow key to feed the dog",100,30)

text("food remaining: "+ food,100,200)

}

function readStock(data)
{
food=data.val()
}

function writeStock(x)
{
  if(x===0)
  { 
    dog.addImage(happyDogimg)
   
  }
  else{
        
        x=x-1;
        database.ref('/').update({
        'food':x
          })
           
}
}

