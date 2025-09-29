export class CursorTracker {
    static sheet = null;
    static counter = 0;

    constructor(config = {}) {
        this.id = ++CursorTracker.counter;
        this.className = `tracker-${this.id}`;
        this.particleClass = `particle-${this.id}`;

        // Main tracker
        this.content = config.content || null;
        this.color = config.color || "#fff";
        this.size = config.size || 20;
        this.speed = config.speed || 0.15;

        // Offsets
        this.offsetX = config.offsetX || 0;
        this.offsetY = config.offsetY || 0;

        // Particle config
        this.particleCount = config.particleCount || 8;
        this.particleSize = config.particleSize || 6;
        this.particleColor = config.particleColor || "rgba(255,255,255,0.3)";
        this.particleSpeed = config.particleSpeed || 0.1;
        this.particleRotation = config.particleRotation || 10;

        // Initial position
        this.x = window.innerWidth / 2;
        this.y = window.innerHeight / 2;
        this.targetX = this.x;   
        this.targetY = this.y;
        this.prevX = this.x;
        this.prevY = this.y;

        // Idle State
        this.onIdle= config.onIdle? 
            typeof config.onIdle==="function" ? 
                config.onIdle : null
            :null
        this.onActive= config.onActive? 
            typeof config.onActive==="function" ? 
                config.onActive : null
            :null
        this.triggerIdleTime= 3000;
        this.hasMoved= false;
        this.angle= 0;
        this.lastMoveTime= Date.now();

        this.trail = Array(this.particleCount).fill({x: this.x, y: this.y, rotation: 0});

        this.injectStyles();
        this.createElements();
        this.onMove= this.onMove.bind(this);
        this.animate= this.animate.bind(this);
        this.refAFId= requestAnimationFrame(this.animate);
        
        window.addEventListener("mousemove", this.onMove);
    }

    injectStyles() {
        if (!CursorTracker.sheet) {
            CursorTracker.sheet = new CSSStyleSheet();
            document.adoptedStyleSheets = [...document.adoptedStyleSheets, CursorTracker.sheet];
        }

        CursorTracker.sheet.insertRule(`
        .${this.className} {
            position: fixed;
            width: ${this.size}px;
            height: ${this.size}px;
            background: ${this.content ? "transparent" : this.color};
            font-size: ${this.size}px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            pointer-events: none;
            transform: translate(-50%, -50%);
            z-index: 9999;
            transition: opacity 0.5s ease;
        }
        `);

        CursorTracker.sheet.insertRule(`
        .${this.particleClass} {
            position: fixed;
            width: ${this.particleSize}px;
            height: ${this.particleSize}px;
            background: ${this.content ? "transparent" : this.particleColor};
            font-size: ${this.particleSize}px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            pointer-events: none;
            transform: translate(-50%, -50%) rotate(0deg);
            z-index: 9998;
            opacity: 0.7;
        }
        `);
    }

    createElements() {
        this.el = document.createElement("div");
        this.el.className = this.className;
        if (this.content) this.el.innerHTML = this.content;
        document.body.appendChild(this.el);

        this.particleEls = this.trail.map(() => {
            const p = document.createElement("div");
            p.className = this.particleClass;
            document.body.appendChild(p);
            return p;
        });
    }

    onMove(e) {
        this.targetX = e.clientX + this.offsetX;
        this.targetY = e.clientY + this.offsetY;
        this.hasMoved= true;
        this.lastMoveTime= Date.now();
    }

    animate() {
        const now= Date.now();
        if(!this.hasMoved){
            if(this.onIdle){
                this.onIdle(this);
            }else{
                // change its visibility ratio 
                this.el.style.transition = "opacity 0.5s ease";
                this.el.style.opacity= "0.05";
                // make circles in the center as rotations
                // this.angle += 0.02;
                // const radius= 40;
                // this.targetX= window.innerWidth / 2 + Math.cos(this.angle) * radius;
                // this.targetY= window.innerHeight / 2 + Math.sin(this.angle) * radius;
            }
        }
        if(this.hasMoved && now-this.lastMoveTime>this.triggerIdleTime){
            // there is no mouse-move for 5 seconds and return to idle-state
            this.hasMoved= false;
        }
        if(this.hasMoved){
            if(this.onActive){
                this.onActive(this);
            }else{
                this.el.style.opacity= "1";
                this.el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
                this.el.style.transform = "translate(-50%, -50%) scale(1)";
            }
        }
    
        const dx = this.targetX - this.x;
        const dy = this.targetY - this.y;
        this.x += dx * this.speed;
        this.y += dy * this.speed;
        this.el.style.left = this.x + "px";
        this.el.style.top = this.y + "px";

        const movementAngle = Math.atan2(dy, dx) * (180 / Math.PI);

        let prevX = this.x, prevY = this.y;
        for (let i = 0; i < this.particleEls.length; i++) {
            const p = this.particleEls[i];
            let tx = this.trail[i].x;
            let ty = this.trail[i].y;

            tx += (prevX - tx) * this.particleSpeed;
            ty += (prevY - ty) * this.particleSpeed;

            const rotation = movementAngle + (i * this.particleRotation);

            Object.assign(p.style, {
                left: tx + "px",
                top: ty + "px",
                transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
                opacity: ((i + 1)/this.particleCount).toString()
            });

            this.trail[i] = {x: tx, y: ty, rotation};
            prevX = tx; prevY = ty;
        }

        requestAnimationFrame(this.animate.bind(this));
    }
    pause(){
        cancelAnimationFrame(this.refAFId);
    }
    resume(){
        this.refAFId= requestAnimationFrame(this.animate);
    }
    update(config = {}) {
        for( const key in config){
            if(config[key] !== 'undefined'){
                this[key]= config[key];
            }
        }
    }

    destroy() {
        this.el.remove();
        this.particleEls.forEach(p => p.remove());
    }
}
