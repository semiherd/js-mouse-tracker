import { CursorTracker } from './tracker.js';
 
const MouseTrackerManager = {
    trackers: [],
    create(config) {
        const t = new CursorTracker(config);
        this.trackers.push(t);
        return t;
    },
    destroyAll() {
        this.trackers.forEach(t => t.destroy());
        this.trackers = [];
    }
};    

// --- Demo Trackers ---
MouseTrackerManager.create({
    content: "🐭",
    size: 30,
    particleCount: 12,
    particleSize: 10,
    particleColor: "rgba(0,0,255,0.3)",
    speed: 0.2,
    particleSpeed: 0.12,
    offsetX: -20,
    offsetY: 20,
    particleRotation: 15,
    idleAnimation: true,
});

MouseTrackerManager.create({
    content: "♡",
    size: 20,
    particleCount: 8,
    particleSize: 6,
    particleColor: "rgba(0,255,0,0.3)",
    speed: 0.12,
    particleSpeed: 0.06,
    offsetX: 0,
    offsetY: -20,
    particleRotation: 8,
    onIdle: (tracker) => {
        tracker.el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        tracker.el.style.opacity = "0.15";
        tracker.el.style.transform = "translate(-50%, -50%) scale(1.2)"; // pulse when idle
    },
    onActive: (tracker) => {
        tracker.el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        tracker.el.style.opacity = "1"; 
        tracker.el.style.transform = "translate(-50%, -50%) scale(1)"; // back to normal
    }
});