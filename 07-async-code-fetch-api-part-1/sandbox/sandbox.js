// TODO How Event Loop works

// while (eventLoop.waitForTask()) {
//   const taskQueue = eventLoop.selectTaskQueue();
//   if (taskQueue.hasNextTask()) {
//     taskQueue.processNextTask()
//   }
//
//   const microtaskQueue = eventLoop.microTaskQueue();
//   if (microtaskQueue.hasNextMicroTask()) {
//     microtaskQueue.processNextMicroTask()
//   }
//
//   if (eventLoop.shouldRender()) {
//     eventLoop.render();
//   }
// }


/// ---- ---
