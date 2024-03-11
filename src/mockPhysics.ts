// our pretend physics engine
interface Vec2 {
    x: number;
    y: number;
}

interface Ball {
    position: Vec2;
    velocity: Vec2;
    radius: number;
    mass: number;
    data?: any;    
}

interface Table {
    balls: Ball[];
}

function createVector(x: number, y: number): Vec2 {
    return { x, y }
}

function createBall(): Ball {
    return {
        position: createVector(Math.random() * 100, Math.random() * 100),
        velocity: createVector(-1 + (Math.random() * 2), -1 + (Math.random() * 2)),
        radius: 10,
        mass: 10,
        data: null
    }
}

export function createTable(ballCount: number): Table {
    const table: Table = {
        balls: []
    };
    for (let i=0;i<ballCount;i++) {
        table.balls.push(createBall());
    }

    return table;
}

export function updateTable(table: Table): Table {
    for (const ball of table.balls) {
        ball.position.x += ball.velocity.x;
        ball.position.y += ball.velocity.y;
        ball.velocity.x *= 0.999;
        ball.velocity.x *= 0.999;
    }

    for (const ballA of table.balls) {
        for (const ballB of table.balls) {
            if (ballA !== ballB) {
                // perform some collision or other
                const dx = ballB.position.x - ballA.position.y;
                const dy = ballB.position.y - ballA.position.y;
                const len = Math.sqrt((dx*dx) + (dy*dy));
                if (len < ballB.radius + ballA.radius) {
                    // collision!
                }
            }
        }
    }

    return table;
}