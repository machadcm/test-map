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

export class sprite {
  // constructor
  // usage: sprite(<context>,<sprinte>,<index>)
  //        sprite(<context>,<filename>)
  //        sprite(<context>,<width>,<height>,<color>)
  constructor(context, attr1, attr2=null, attr3=null) {
    if (context === undefined) {
      console.log("sprite: invalid context.");
    } else if (attr1 === undefined ) {
      console.log('sprite: invalid image file.')
    } else {
      this._context = context;
      if( Number.isInteger(attr1) ){
        this._type = IMAGE_BOX;
        this._width = attr1;
        this._heigth = attr2;
        this._color = attr3;
      } else if (attr1 instanceof spritesheet ) {
        this._type = IMAGE_SPRITE;
        this._image = attr2;
        this._index = attr3;
      } else {
        this._type = IMAGE_FILE;
        this._image = new Image();
        this._image.src = attr1;
      }
    }
  }
  //    if (pattern) {
  //    this.pattern = this.context.createPattern(this.image, 'repeat');
  
  // draw function
  //
  draw(x, y, width=null, height=null) {
    switch(this._type) {
      case IMAGE_SPRITE:
        this._image.draw(this._context,this._index,x,y,width,height);
        break;
      case IMAGE_FILE:
        this._image.draw(this._context,x,y,width,height);
        break;
      case IMAGE_BOX:
        this._context.fillStyle = this._color;
        this._context.fillRect(x,y,this._width,this._heigth);
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
    this._context.drawImage(
      this._image,
      -(this._image.width / 2),
      -(this._image.height / 2)
    );
    this._context.restore();
  }
}

export class canvas {
  constructor(canvasid, width=null, height=null) {
    this._canvas = document.getElementById(canvasid);
    this._context = this._canvas.getContext("2d");
    if( width == null ) {
      this._width = document.documentElement.clientWidth - 20;
      this._heigth = document.documentElement.clientHeight - 120;
    } else {
      this._width = width;
      this._heigth = height;
    }
    this._canvas.width = this._width;
    this._canvas.height = this._heigth;

    // set canvas width and height
   /*
    $(this.canvas).attr({ width: this.width, height: this.height });
    $(this.canvas).attr({
      style:
        "width:" +
        this.width +
        "px;" +
        "height:" +
        this.height +
        "px; border: 1px solid black;"
    });
    */
  }

  context() {
    return this._context;
  }
}
