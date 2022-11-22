import { Vector } from "../utils/vector";
import { AABB, regularPolygon, Circle, Line } from "../primitives/index";
class IntersectionDetector {
    constructor(){}

    

    PointOnLine(point, line){
        let dy = line.getEnd().y - line.getStart().y;
        let dx  = line.getEnd(). x - line.getStart().x;

        let m = dy / dx;

        let b = line.getEnd().y + (m * line.getEnd().x);

        return point.y == m * point.x + b; 

    }

    PointInCircle(point, circle){
        let CircleCenter = circle.getCenter();
        let centerToPoint = new Vector2f(point).sub(circleCenter);

        return centerToPoint.Squaring() <= circle.getRadius() * circle.getRadius(); //crear método Squaring para elevar al cuadrado
    }

    pointInAABB(point, AABB){
        let min = AABB.getMin();
        let max = AABB.getMax();

        return point.x <= max.x && min.x <= point.x && point.y <= max.y && min.y <= point.y;

    }
    pointInBox2D(point, box2D){
        //Implementar
    }

    lineAndCircle(line, circle){
        if(this.PointInCircle(line.getStart(), circle) || this.PointInCircle(line.getEnd(), circle)){
            return true;
        }

        let ab = new Vector2f(line.getEnd()).sub(line.getStart());//Implementar .sub 
        let circleCenter = circle.getCenter();
        let centerToLineStart = new Vector2f(circleCenter).sub(line.getStart());
        let t = centerToLineStart.dot(ab) / ab.dot(ab);//Implementar .dot dot(vector){ return x * vector.x + y * vector.y}

        if (t < 0 || t > 1){
            return false;
        }

        let closestPoint = new Vector2f(line.getStart()).add(ab.mul(t));//Implementar add y mul => suma y multiplicación de vectores

        return pointInCirlce(closestPoint, circle); 

    }

    CircleAndLine(circle, line){
        return this.lineAndCircle(line, circle);
    }

    CircleAndCircle(c1, c2){
        let vecBetweenCenters = new Vector2f(C1.getCenter()).sub(c2.getCenter());
        let radiSum = c1.getRadius() + c2.getRadius();
        
        return vecBetweenCenters.Squared() <= radiSum * radiSum;
    }

    CircleAndAABB(circle, AABB){
        let min = AABB.getMin();
        let max = AABB.getMax();

        let = closestPointToCircle = new Vector2f(circle.getCenter());
        if (closestPointToCircle.x < min.x){
            closestPointToCircle.x = min.x;
        }
        else if (closestPointToCircle.x > max.x){
            closestPointToCircle.x = max.x;
        }

        if (closestPointToCircle.y < min.y){
            closestPointToCircle.y = min.y;
        }
        else if (closestPointToCircle.y > max.y){
            closestPointToCircle.y = max.y;
        }

        let circleToAABB = new Vector2f(circle.getCenter()).sub(closestPointToCircle);
        return circleToAABB.Squared() <= circle.getRadius() * circle.getRadius();
        
    }

    AABBAndCircle(AABB, circle){
        return this.CircleAndAABB(circle, box);
    }

    CircleAndBox2D(circle, Box2D){
        //Implementar
    }

    AABBAndAABB(b1, b2){
        //Implementar
    }

    AABBAndBox2D(AABB, Box2D){
        //Implementar
    }



    lineAndAABB(line, AABB){
        if (this.pointInAABB(line.getStart(), box) || this.pointInAABB(line.getEnd(), box)){
            return true;
        }

        let unitVector = new Vector2f(line.getEnd()).sub(line.getStart());
        unitVector.normalize(); //Implementar normalize
        unitVector.x = (unitVector.x != 0) ? 1 / unitVector.x : 0;
        unitVector.y = (unitVector.y != 0) ? 1 / unitVector.y : 0;

        let min = new Vector2f(AABB.getMin());
        min.sub(line.getStart()).mul(unitVector);
        let  max = new Vector2f(AABB.getMax());
        max.sub(line.getStart()).mul(unitVector);

        let tmin = Math.max(Math.min(min.x, max.x), Math.min(min.y, max.y));
        let tmax = Math.min(Math.max(min.x, max.x), Math.max(min.y, max.y));

        if (tmax < 0 || tmin > tmax){
            return false;
        }

        let t = (twin < 0) ? tmax : tmin;
        return t > 0 && t * t < line.Squaring();
    }

    lineAndBox2D(line, box2D){
        //Implementar
    }

    //Crear clase Ray2D y RaycastResult para el raycasting
    //Raycast
    RaycastCircle(circle, Ray2D, resutl){
        RayCastResult.reset(result); // reset es un método de RayCastResult;

        let originToCircle = new Vector2f(circle.getCenter()).sub(Ray2D.getOrigin());
        let radiusSquared = circle.getRadius() * circle.getRadius();
        let originToCircleSquared = originToCircle.Squared();

        let a = originToCircle.dot(Ray2D.getDirection());
        let bSq = originToCircleSquared - (a * a);
        if (radiusSquared - bSq < 0){
            return false;
        }
        let f =  Math.sqrt(radiusSquared - bSq);
        let t = 0;
        if (originToCircleSquared < radiusSquared) {
            t = a + f;
        }
        else {
            t = a - f;
        }
        if (result != null) {
            let point = new Vector2f(Ray2D.getOrigin()).add(new Vector2f(Ray2D.getDirection()).mul(t));
            let normal = new Vector2f(point).sub(circle.getCenter());
            normal.normalize();

            result.init(point, normal, true);  //Init es un método de RayCastResult
        }

        return true;
    }

    RaycastAABB(AABB, Ray2D, result){
        RayCastResult.reset(result);

        let unitVector = Ray2D.getDirection();
        unitVector.normalize(); //Implementar normalize
        unitVector.x = (unitVector.x != 0) ? 1 / unitVector.x : 0;
        unitVector.y = (unitVector.y != 0) ? 1 / unitVector.y : 0;

        let min = new Vector2f(AABB.getMin());
        min.sub(Ray2D.getOrigin()).mul(unitVector);
        let  max = new Vector2f(AABB.getMax());
        max.sub(Ray2D.getOrigin()).mul(unitVector);

        let tmin = Math.max(Math.min(min.x, max.x), Math.min(min.y, max.y));
        let tmax = Math.min(Math.max(min.x, max.x), Math.max(min.y, max.y));

        if (tmax < 0 || tmin > tmax){
            return false;
        }

        let t = (twin < 0) ? tmax : tmin;
        let hit  = t > 0;
        if (!hit) {
            return false;
        }

        if (result != null) {
            let point = new Vector2f(Ray2D.getOrigin()).add(new Vector2f(Ray2D.getDirection()).mul(t));
            let normal = new Vector2f(Ray2D.getOrigin()).sub(point);
            normal.normalize();

            result.init(point, normal, true); 
        }

        return true;
    }

    RaycastBox2D(Box2D, Ray2D, result){
        //Implementar
    }


}

export default IntersectionDetector;
