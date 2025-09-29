CursorTracker Component Tracking Mouse Position with custom or default animation behaviour

--A sample of config params for initialization--
new CursorTracker({
    content: "♡",
    size: 20, 
    particleCount: 8,
    particleSize: 6,
    particleColor: "rgba(0,255,0,0.3)",
    speed: 0.12,
    particleSpeed: 0.06,
    offsetX: 0,  // offset on x-axis relative to the mouse position
    offsetY: -20, // offset on y-axis relative to the mouse position
    particleRotation: 8,
    // custom behaviour of the tracker when the mouse is not moving, it is optional, if not defined, default behaviour is implemented
    onIdle: (tracker) => {
        tracker.el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        tracker.el.style.opacity = "0.15";
        tracker.el.style.transform = "translate(-50%, -50%) scale(1.2)"; // pulse when idle
    },
    //custom behaviour of the tracker when the mouse is moving, it is optional, if not defined, default behaviour is implemented
    onActive: (tracker) => {
        tracker.el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        tracker.el.style.opacity = "1"; 
        tracker.el.style.transform = "translate(-50%, -50%) scale(1)"; // back to normal
    }
})
