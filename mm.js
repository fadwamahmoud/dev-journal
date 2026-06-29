setTimeout(() => console.log("timeout"), 0); // timers phase
setImmediate(() => console.log("immediate")); // immedaite => check phase
Promise.resolve().then(() => console.log("promise")); // immediately resolves so is done in current iteration
process.nextTick(() => console.log("nextTick")); // next tick after current operation is done
