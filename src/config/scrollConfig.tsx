const scrollConfig = ( viewFactor = 0.0) => ({
  origin: "right",
  distance: "20px",
  duration: 200,
  rotate: { x: 0, y: 0, z: 0 },
  scale: 1,
  viewFactor: viewFactor,
  easing: "cubic-bezier(0.645, 0.045, 0.355, 1)",
});

export default scrollConfig;
