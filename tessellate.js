//
// Tessellate.js - https://github.com/davidgovea/tessellate - MIT License
//

(function(Raphael){
    Raphael.fn.grid = function(startx, starty, rows, cols, width, fill, roundR){
        var cellList = [],
            x = startx,
            y = starty,
            r = typeof roundR === 'number' ? roundR : 0;
    
        for (var i=0; i<rows; i++){
            cellList[i] = [];
            x = startx;
            for(var j=0; j<cols; j++){
                var cell = this.rect(x,y,width,width,r);
                cell.attr('fill', fill);
                cell.attr('stroke-width',0.5)
                cell.row = i;
                cell.col = j;
                cell.active = false;
                cell.occupied = false;
               // cell.click(cellClick);
                //cell.mouseover(cellOver);
                //cell.mouseout(cellOut);
                cellList[i][j] = cell;
                x += width;
            }
            y += width;
        }
    //    console.timeEnd('gridCreate');
        return cellList;
    }
    
    // Draws Octagon: clockwise path starting with top segment
    Raphael.fn.octagon = function(startx, starty, width){
        var rad2 = Math.SQRT2,
            side = width/(1+rad2),
            side_over_rad2 = side/rad2;
            p = this.path(
                "M"+(startx+side_over_rad2)+' '+(starty)+
                'l'+(side)+' '+(0)+
                'l'+(side_over_rad2)+' '+(side_over_rad2)+
                'l'+(0)+' '+(side)+
                'l'+(-side_over_rad2)+' '+(side_over_rad2)+
                'l'+(-side)+' '+(0)+
                'l'+(-side_over_rad2)+' '+(-side_over_rad2)+
                'l'+(0)+' '+(-side)+
                'l'+(side_over_rad2)+' '+(-side_over_rad2)+'z'
            );
        return p;
    }
    
    Raphael.fn.octogrid = function(startx,starty,rows,cols,width,fill){
        console.time('Create OctoGrid');
        var cellList = {},
            x = startx,
            y = starty,
            side = width/(1+Math.SQRT2);
    
        for (var i=0; i<rows; i++){
         //   cellList[i] = [];
            x = startx;
            for(var j=0; j<cols; j++){
                var cell = this.octagon(x,y,width);
                cell.attr('fill', fill);
                //cell.attr('stroke-width',0.5)
                cell.row = i;
                cell.col = j;
                cell.active = false;
               // cell.click(cellClick);
                //cell.mouseover(cellOver);
                //cell.mouseout(cellOut);
                cellList[(i+1)+"_"+(j+1)+"_1"] = cell;
                //cellList[i][j] = cell;
    
                if(i>0 && j > 0){
                    var d = this.rect((x-side/2),(y-side/2),side,side);
                    d.rotate(45);
                    d.attr('fill','#3f3f3f');
                    cellList[i+"_"+j+"_2"] = d;
                  //  d.attr('stroke-width',0.5)
                 //   d.drag(move, start, up);
                }
    
                x += width;
            }
            y += width;
        }
        console.timeEnd('Create OctoGrid');
        return cellList;
    }

    
}(Raphael));