class Observable {
  constructor(cb) {
    this.observers = [];
  }

  subscribe(cb) {
    this.observers.push(cb);
  }

  unsubscribe(cb) {
    this.observers.filter(item => item !== cb);
  }

  notify(data) {
    this.observers.forEach((observer) => observer(data));
  }
}

const observable = new Observable();

const fn1 = (data) => console.log(`receive data: ${data}`);
const fn2 = (data) => console.log(`receive data: ${data}`);
const fn3 = (data) => console.log(`receive data: ${data}`);

observable.subscribe(fn1);
observable.subscribe(fn2);
observable.subscribe(fn3);

observable.notify(42);

// let controller = new AbortController();
// let signal = controller.signal;
//
// signal.addEventListener('abort', () => alert('Canceled!'));
// controller.abort();

let controller = new AbortController();
setTimeout(() => controller.abort(), 1000);

try {
  let response = fetch('/article/fetch-abort/demo/hang', {
    signal: controller.signal,
  })
} catch (error) {
  if (error.name === 'AbortError') {
    alert('Canceled');
  } else {
    throw err;
  }
}


// ------------ WebSocket ------------ //
// ws === HTTP, wss === HTTPS
let socket = new WebSocket("wss://127.0.0.1:8080/");

socket.onopen = function() {
  console.log('Connection opened');
  console.log('Sending data');
  socket.send('Ivan');
};

socket.onmessage = function(event) {
  console.log(`[message]: Received message, ${event.data}`);
};

socket.onclose = function(event) {
  if (event.wasClean) {
    alert(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
  } else {
    // например, сервер убил процесс или сеть недоступна
    // обычно в этом случае event.code 1006
    alert('[close] Соединение прервано');
  }
};

socket.onerror = function(event) {
  console.log(`[error]`);
};

// ------------ XMLHttpRequest ------------ //
let xhr = new XMLHttpRequest();


// ------------ Event Loop ------------ //
// Tasks: events, user interaction, scripts, rendering -- (MacroTasks)
// MicroTasks: Promise, cb - MutationObserver,
// Rendering: eventLoop.shouldRender() - method


