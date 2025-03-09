    document.addEventListener('DOMContentLoaded', function() {
      // Initialize the simulated top command
      initTopCommand();
    });

    function initTopCommand() {
      const terminal = document.getElementById('top-output');

      function generateRandomProcess() {
        const processes = [
          { name: 'prometheus', user: 'rachlenko' },
          { name: 'git-camus', user: 'rachlenko' },
          { name: 'node', user: 'www' },
          { name: 'nginx', user: 'www-data' },
          { name: 'python3', user: 'rachlenko' },
          { name: 'bash', user: 'rachlenko' },
          { name: 'vim', user: 'rachlenko' },
          { name: 'postgresd', user: 'postgres' },
          { name: 'redis-server', user: 'redis' },
          { name: 'dockerd', user: 'root' }
        ];

        const process = processes[Math.floor(Math.random() * processes.length)];
        const pid = Math.floor(Math.random() * 90000) + 10000;
        const cpu = (Math.random() * 15).toFixed(1);
        const mem = (Math.random() * 8).toFixed(1);
        const time = `${Math.floor(Math.random() * 10)}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`;

        return {
          pid,
          user: process.user,
          pr: Math.floor(Math.random() * 20),
          ni: Math.floor(Math.random() * 5),
          virt: `${Math.floor(Math.random() * 900) + 100}m`,
          res: `${Math.floor(Math.random() * 200) + 10}m`,
          shr: `${Math.floor(Math.random() * 50) + 5}m`,
          s: ['S', 'R', 'D'][Math.floor(Math.random() * 3)],
          cpu,
          mem,
          time,
          command: process.name
        };
      }

      function generateTopOutput() {
        const now = new Date();
        const uptime = `${Math.floor(Math.random() * 24)}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`;
        const loadAvg = `${(Math.random() * 2).toFixed(2)}, ${(Math.random() * 1.5).toFixed(2)}, ${(Math.random() * 1).toFixed(2)}`;
        const tasks = `${Math.floor(Math.random() * 50) + 50} total, ${Math.floor(Math.random() * 5) + 1} running, ${Math.floor(Math.random() * 45) + 45} sleeping`;

        const cpuUsage = {
          us: (Math.random() * 20).toFixed(1),
          sy: (Math.random() * 10).toFixed(1),
          ni: (Math.random() * 2).toFixed(1),
          id: (Math.random() * 70).toFixed(1),
          wa: (Math.random() * 5).toFixed(1),
          hi: (Math.random() * 1).toFixed(1),
          si: (Math.random() * 1).toFixed(1),
          st: (Math.random() * 1).toFixed(1)
        };

        const memInfo = {
          total: Math.floor(Math.random() * 4000) + 12000,
          free: Math.floor(Math.random() * 2000) + 4000,
          used: Math.floor(Math.random() * 6000) + 6000,
          buff: Math.floor(Math.random() * 1000) + 1000
        };

        let output = `top - ${now.toLocaleTimeString()} up ${uptime}, ${Math.floor(Math.random() * 3) + 1} users, load average: ${loadAvg}
${tasks}
%Cpu(s): ${cpuUsage.us} us, ${cpuUsage.sy} sy, ${cpuUsage.ni} ni, ${cpuUsage.id} id, ${cpuUsage.wa} wa, ${cpuUsage.hi} hi, ${cpuUsage.si} si, ${cpuUsage.st} st
MiB Mem : ${memInfo.total.toFixed(1)} total, ${memInfo.free.toFixed(1)} free, ${memInfo.used.toFixed(1)} used, ${memInfo.buff.toFixed(1)} buff/cache
MiB Swap: ${(memInfo.total * 0.5).toFixed(1)} total, ${(memInfo.total * 0.4).toFixed(1)} free, ${(memInfo.total * 0.1).toFixed(1)} used. ${(memInfo.total - memInfo.used).toFixed(1)} avail Mem

  PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND`;

        // Generate processes (between 10-15)
        const processCount = Math.floor(Math.random() * 6) + 10;
        const processes = [];

        for (let i = 0; i < processCount; i++) {
          processes.push(generateRandomProcess());
        }

        // Sort by CPU usage (descending)
        processes.sort((a, b) => parseFloat(b.cpu) - parseFloat(a.cpu));

        // Add processes to output
        processes.forEach(proc => {
          output += `\n${String(proc.pid).padStart(5)} ${proc.user.padEnd(9)} ${String(proc.pr).padStart(2)} ${String(proc.ni).padStart(3)}  ${proc.virt.padStart(6)} ${proc.res.padStart(6)} ${proc.shr.padStart(6)} ${proc.s}  ${String(proc.cpu).padStart(5)} ${String(proc.mem).padStart(5)} ${proc.time.padStart(8)} ${proc.command}`;
        });

        return output;
      }

      // Initial output
      terminal.textContent = generateTopOutput();

      // Update every 3 seconds
      setInterval(() => {
        terminal.textContent = generateTopOutput();
      }, 3000);
    }