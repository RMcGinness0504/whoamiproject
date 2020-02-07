let oscillator;
let ampl = 1;
let textSine = 0;
let pianoKeys = [];
let foods = [];
let foodImages = [null,null,null];
let whiteFreq = [261.6,293.7,329.6,349.2,392,440,493.9];
let blackFreq = [277.2,311.1,370,415.3,466.2];

let person = {}; // new  JSON Object
person.name = "Robert McGinness";
person.major = "Game Design";
person.favoriteFoods = ["garlic","chocolate","soup"];

function preload()
{
  foodImages[0] = loadImage("glic.png");
  foodImages[1] = loadImage("choc.png");
  foodImages[2] = loadImage("soup.png");
}

class FoodItem
{
   constructor(num,xx,yy,r)
  {
    this.index = num;
    this.name = person.favoriteFoods[num];
    this.x = xx;
    this.y = yy;
    this.rotation = r;
  }
  
  move()
  {
     this.y+=100*(deltaTime/1000);
     this.rotation+=90*(deltaTime/1000);
     if(this.y > height + 32)
     {
        this.y = -32;
        this.x = random()*width;
     }
  }
  
  display()
  {
     push();
     translate(this.x,this.y);
     rotate(this.rotation);
     image(foodImages[this.index],-1 * foodImages[this.index].width/2,-1 * foodImages[this.index].height/2);
    textAlign(CENTER)
    text(person.favoriteFoods[this.index],-1 * foodImages[this.index].width,-24, foodImages[this.index].width*2,30);
    textAlign(RIGHT)
     pop();
  }
}

class PianoKey
{
   constructor(p, x, y, w, h, b)
  {
     this.pitch = p;
     this.xPosition = x;
     this.yPosition = y;
     this.width = w;
     this.height = h;
     this.isBlack = b;
  }
  
  show()
  {
     rect(this.xPosition,this.yPosition,this.width,this.height);
  }
}

function setup() {
  oscillator = new p5.Oscillator();
  angleMode(DEGREES);
  createCanvas(400, 400);
  for (let p = 0;p < 7;p++)
  {
    pianoKeys.push(new PianoKey(whiteFreq[p],p*50 + 25,220,50,160,false));
  }
  
  for (let p = 0;p < 2;p++)
  {
    pianoKeys.push(new PianoKey(blackFreq[p],p*50 + 55,220,40,100,true));
  }
  
  for (let p = 3;p < 6;p++)
  {
    pianoKeys.push(new PianoKey(blackFreq[p-1],p*50 + 55,220,40,100,true));
  }
  
  for (let f = 0;f < 400;f+=40)
  {
      foods.push(new FoodItem(floor(random()*3),random()*width,f,random()*360));
  }
}

function draw()
{ 
  textSine+=deltaTime 
  ampl = ampl - ((deltaTime/1000)*0.5);
  if (ampl <= 0)
    ampl = 0;
  oscillator.amp(ampl);
  
  background(204,102,255);
  textSize(32 + sin(textSine/4)*6 + 6);
  fill(0);
  text(person.name,12,35);
  text(person.name, 8,35);
  text(person.name,10,37);
  text(person.name,10,33);
  fill(255);
  text(person.name,10,35);
  
  textSize(16 + sin(textSine/4)*3 + 3);
  fill(0);
  text(person.major,10,50);
  text(person.major,14,50);
  text(person.major,12,48);
  text(person.major,12,52);
  fill(255);
  text(person.major,12,50);
  
   for(let p = 0;p < pianoKeys.length;p++)
   {
     fill(255);
     if (pianoKeys[p].isBlack)
       fill(0);
     pianoKeys[p].show();
   }
  
  for(let f = 0;f < foods.length;f++)
  {
     foods[f].move();
     foods[f].display(); 
  }
}

function checkCollision(x1,y1,w1,h1, x2,y2,w2,h2)
{
  if(x1 < x2+w2 && x2 < x1+w1 && y1 < y2+h2 && y2 < y1+h1)
    return true;
  else
    return false;
}

function mousePressed()
{
  for (let p = pianoKeys.length-1;p >= 0;p--)
  {
      if (checkCollision(pianoKeys[p].xPosition,pianoKeys[p].yPosition,pianoKeys[p].width,pianoKeys[p].height,mouseX,mouseY,1,1))
      {
         oscillator.freq(pianoKeys[p].pitch);
         ampl = 1;
         oscillator.start();
         break;
      }
  }
}