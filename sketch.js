var dog, dogimg, dogHappyimg;
var foodS, foodStock;
var database;

function preload()
{
  createCanvas (500, 500);
 
 dogimg = loadImage ("images/dogImg.png");
 dogHappyimg = loadImage ("images/dogImg1.png");

}

function setup() {
	createCanvas(500, 800);
  
  database = firebase.database();

   dog = createSprite (350, 250, 100, 50); 
   dog.scale = 0.5
   dog.addImage(dogimg);

   foodStock = database.ref('food');
   foodStock.on("value", readStock);

}


function draw() {
  
  background(46, 139, 87);
  console.log(foodS);
  if (keyWentDown(UP_ARROW)){

    writeStock(foodS);
    dog.addImage(dogHappyimg);

  }


  drawSprites();
  //add styles here
  fill("red")
  text ("foodLeft:" + foodS, 400, 20);



}

function writeStock (x) {

  if (x<=0){
    x = 0;
  } else{
    x = x-1;
  }

  database.ref('/').update({
    food:x
  })
}


function readStock (data){
  foodS = data.val();
}

