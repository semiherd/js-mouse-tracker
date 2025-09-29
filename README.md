CursorTracker Component Tracking Mouse Position with custom or default animation behaviour<br /><br />

--A sample of config params for initialization--<br /><br />
new CursorTracker({<br />
    content: "♡",<br />
    size: 20, <br />
    particleCount: 8,<br />
    particleSize: 6,<br />
    particleColor: "rgba(0,255,0,0.3)",<br />
    speed: 0.12,<br />
    particleSpeed: 0.06,<br />
    offsetX: 0,  // offset on x-axis relative to the mouse position<br />
    offsetY: -20, // offset on y-axis relative to the mouse position<br />
    particleRotation: 8,<br />
    // custom behaviour of the tracker when the mouse is not moving, it is optional, if not defined, default behaviour is implemented<br />
    onIdle: (tracker) => {<br />
        tracker.el.style.transition = "opacity 0.5s ease, transform 0.5s ease";<br />
        tracker.el.style.opacity = "0.15";<br />
        tracker.el.style.transform = "translate(-50%, -50%) scale(1.2)"; // pulse when idle<br />
    },<br />
    //custom behaviour of the tracker when the mouse is moving, it is optional, if not defined, default behaviour is implemented<br />
    onActive: (tracker) => {<br />
        tracker.el.style.transition = "opacity 0.5s ease, transform 0.5s ease";<br />
        tracker.el.style.opacity = "1"; <br />
        tracker.el.style.transform = "translate(-50%, -50%) scale(1)"; // back to normal<br />
    }<br />
})<br />
