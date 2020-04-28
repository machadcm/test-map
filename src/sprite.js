//
//

// file with multiple images
//
export class spritesheet {
  constructor(filename, width, height, row, col) {
    this._image = new Image();
    this._image.src = filename;
    this._width = width;
    this._heigth = height;
    this._row = row;
    this._col = col;
  }

  draw(context, index, x, y, w, h) {
    var imgx =
      this.imageWidth * Math.round(((index / this.col) % 1) * this.col, 0);
    var imgy = this.imageHeight * Math.floor(index / this.col);

    var posx = x * this.imageWidth - (y & 0x01 ? 0 : this.imageWidth / 2);
    var posy = (y * this.imageHeight) / 2 - this.imageHeight / 2;

    // print only when inside canvas
    //if ( ( posx > (-1 * this.imageWidth )) > 0 && (posx < context.canvas.width) &&
    //   ( posy > (-1 * this.imageHeight)) > 0 && (posy < context.canvas.height) )
    context.drawImage(
      this.image,
      imgx,
      imgy,
      this.imageWidth,
      this.imageHeight,
      posx,
      posy,
      this.imageWidth,
      this.imageHeight
    );
  }

  draw_old(context, index, x, y, w, h) {
    var imgx =
      this.imageWidth * Math.round(((index / this.col) % 1) * this.col, 0);
    var imgy = this.imageHeight * Math.floor(index / this.col);

    var posx = ((x - y - 1) * this.imageWidth) / 2;
    var posy = ((x + y - 1) * this.imageHeight) / 2;

    // print only when inside canvas
    if (
      posx > -1 * this.imageWidth > 0 &&
      posx < context.canvas.width &&
      posy > -1 * this.imageHeight > 0 &&
      posy < context.canvas.height
    )
      context.drawImage(
        this.image,
        imgx,
        imgy,
        this.imageWidth,
        this.imageHeight,
        posx,
        posy,
        this.imageWidth,
        this.imageHeight
      );
  }
}

// sprite image class - image class
//
const IMAGE_FILE=0x01
const IMAGE_SPRITE=0x02
const IMAGE_BOX=0x03
const IMAGE_HEX_R=0x04
const IMAGE_HEX_Q=0x05


export class sprite {
  // constructor
  // usage: sprite(<context>,<sprinte>,<index>)
  //        sprite(<context>,<filename>)
  //        sprite(<context>,<width>,<height>,<color>)
  constructor(context, type, attr1, attr2=null, attr3=null) {
    if (context === undefined) {
      console.log("sprite: invalid context.");
    } else if (type === undefined ) {
      console.log('sprite: invalid image file.')
    } else {
      this._context = context;
      this._type = type;
      switch(this._type) {
        case IMAGE_SPRITE:
          this._image = attr2;
          this._index = attr3;
          break;
        case IMAGE_FILE:
          this._image = new Image();
          this._image.src = attr1;
          break;    
        case IMAGE_BOX:
        case IMAGE_HEX_Q:
        case IMAGE_HEX_R:
          this._width = attr1;
          this._height = attr2;
          this._color = attr3;
          break;
        default:
          break;
      }
    }
  }
  
  // draw function
  //
  draw(x, y, fog=false, zoom=1, width=null, height=null) {
    switch(this._type) {
      case IMAGE_SPRITE:
        this._image.draw(this._context,this._index,x,y,width,height);
        break;
      case IMAGE_FILE:
        this._image.draw(this._context,x,y,width,height);
        break;
      case IMAGE_BOX:
        this._context.fillStyle = this._color;
        this._context.fillRect(x,y,this._width,this._height);
        break;
      case IMAGE_HEX_R:
        this._context.fillStyle = this._color;
        this._context.beginPath();
        this._context.moveTo(x, y + (0.25 * this._height * zoom) );
        this._context.lineTo(x + (0.50 * this._width * zoom) , y);
        this._context.lineTo(x + (this._width * zoom), y + (0.25 * this._height * zoom));
        this._context.lineTo(x + (this._width * zoom), y + (0.75 * this._height * zoom));        
        this._context.lineTo(x + (0.50 * this._width * zoom), y + (this._height * zoom));
        this._context.lineTo(x, y + (0.75 * this._height * zoom));    
        this._context.fill();
        break;
      case IMAGE_HEX_Q:
          this._context.fillStyle = this._color;
          this._context.beginPath();
          this._context.moveTo(x, y+(this._height/2)*zoom );
          this._context.lineTo(x + (this._width/4)*zoom, y);
          this._context.lineTo(x + (3*this._width/4)*zoom, y);
          this._context.lineTo(x + this._width*zoom, y + (this._height/2)*zoom);        
          this._context.lineTo(x + (3*this._width/4)*zoom, y + this._height*zoom);
          this._context.lineTo(x+(this._width/4)*zoom, y+this._height*zoom);    
          this._context.fill();
          break;
          default:
        break;
    }
  }

  // rotate image and draw
  rotate(x, y, angle) {
    this._context.save();
    this._context.translate(x, y);
    this._context.rotate((angle * Math.PI) / 180);
    this._context.drawImage(this._image, -(this._image.width / 2), -(this._image.height / 2));
    this._context.restore();
  }
}

export class canvas {
  constructor(canvasid, width=null, height=null) {
    this._canvas = document.getElementById(canvasid);
    this._context = this._canvas.getContext("2d");
    if( width == null ) {
      this._canvas.width  = window.innerWidth - 20;
      this._canvas.height   = window.innerHeight - 40;
    } else {
      this._canvas.width = width;
      this._canvas.height = height;
    }
  }
  // resize canvas
  resize() {
    //console.log("Window: " + window.innerWidth + " - " + window.innerHeight);
    /*
    this._canvas.width  = window.innerWidth;
    this._canvas.height   = window.innerHeight;
    */
    this._canvas.width  = "400";
    this._canvas.height   = "400"
  }

  id() {return(this._canvas);}

  context() { return this._context; }

  width() { return this._canvas.width; }

  height() { return this._canvas.height; }


}
