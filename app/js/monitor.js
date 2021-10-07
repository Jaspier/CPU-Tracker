const path = require('path');
const osu = require('node-os-utils');
const cpu = osu.cpu;
const mem = osu.mem;
const os = osu.os;

let cpuOverload = 80;

// Run every 2 seconds
setInterval(() => {
  // CPU Usage
  cpu.usage().then(info => {
    document.getElementById('cpu-usage').innerText = info + '%';

    document.getElementById('cpu-progress').style.width = info + '%';

    // Make progress bar red if overload
    if (info >= cpuOverload) {
      document.getElementById('cpu-progress').style.background = 'red';
    } else {
      document.getElementById('cpu-progress').style.background = '#19e5e6';
    }
  });

  // CPU Free
  cpu.free().then(info => {
    document.getElementById('cpu-free').innerText = info + '%';
  });

  // Uptime
  document.getElementById('sys-uptime').innerText = secondsToDhms(os.uptime());
}, 2000);

// CPU model
document.getElementById('cpu-model').innerText = cpu.model();

// Computer name
document.getElementById('comp-name').innerText = os.hostname();

// OS
document.getElementById('os').innerText = `${os.type()} ${os.arch()}`;

// Total Memory
mem.info().then(info => {
  document.getElementById('mem-total').innerText = info.totalMemMb;
});

// Show days, hours, minutes, sec (uptime given in seconds)
function secondsToDhms(uptime) {
  uptime = +uptime;
  const days = Math.floor(uptime / (3600 * 24));
  const hours = Math.floor((uptime % (3600 * 24)) / 3600);
  const minutes = Math.floor((uptime % 3600) / 60);
  const seconds = Math.floor(uptime % 60);

  return `${days}d, ${hours}h, ${minutes}m, ${seconds}s`;
}
