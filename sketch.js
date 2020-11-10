//Creating variables.
var tower, towerimage;
var ghost, ghostimage;
var door, doorimage, r, block; 
var climber, climberi;
var doorgroup, climbergroup, blockgroup;
var spookysound;

var PLAY = 1;
var END = 0;
var gamestate = PLAY;

function preload()
{
  //For preloading images.
  towerimage = loadImage("tower.png");
  ghostimage = loadImage("ghost-standing.png");
  doorimage = loadImage("door.png");
  climberi  = loadImage("climber.png");
  
  spookysound = loadSound("spooky.wav");
}

function setup()
{
  //For creating canvas.
  createCanvas(600,600);
  
  //Characteristics of the tower.
  tower = createSprite(300,300,600,600);
  tower.addImage("tower",towerimage);
  tower.velocityY = 3;
  
  ghost = createSprite(300,300);
  ghost.addImage(ghostimage);
  ghost.scale = 0.3;
  
  doorgroup = new Group();
  climbergroup = new Group();
  blockgroup = new Group();
}

function draw()
{
  //Background.
  background('white');
  console.log(tower.y);
  
  if(gamestate === PLAY)
  {
    spookysound.play();
    
    ghost.velocityY = ghost.velocityY + 1;

  //For adding infinite towers.
  if(tower.y > 600)
    {
      tower.y = 300;
    }
  
  if(keyDown('LEFT_ARROW'))
  {
    ghost.x = ghost.x - 3;
  }  
  
  if(keyDown('RIGHT_ARROW'))
  {
    ghost.x = ghost.x + 3;
  }  
  
  if(keyDown('space'))
  {
    ghost.velocityY = -10;
  } 
  
  spawndoors();
  
  if(climbergroup.isTouching(ghost))
  {
    ghost.velocityY = 0;
  }  
    
  if(blockgroup.isTouching(ghost) || ghost.y > 600)
  {
    gamestate = END;
  } 

  } else
  
  if(gamestate === END)
  {
    background("black");
    
    ghost.destroy();
    
    stroke("yellow");
    fill("yellow");
    textSize(20);
    text("GAME OVER", 250,300);
  }  
  
  //For drawing sprites.
  drawSprites();
}

function spawndoors()
{
  if(frameCount % 240 === 0)
  {
    door = createSprite(300,0);
    door.addImage(doorimage);
    door.velocityY = 3;
    door.Lifetime = 200;
    doorgroup.add(door);
  
    climber = createSprite(300,20);
    climber.addImage(climberi);
    climber.velocityY = door.velocityY;
    climber.Lifetime = door.Lifetime;
    climbergroup.add(climber);
  
    block = createSprite(300,25,climber.width,5);
    block.velocityY = door.velocityY;
    block.visible = false;
    block.Lifetime = door.Lifetime;
    blockgroup.add(block);
    
    r = Math.round(random(100,500));
    
    door.x = r;
    climber.x = r;
    block.x = r;
    
    ghost.depth = door.depth + 1;
    
    
  }  
  

  
}
