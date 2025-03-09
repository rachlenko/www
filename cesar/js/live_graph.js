                                      <script>
        // Configuration
        const config = {
            maxDataPoints: 20,
            updateInterval: 2000, // ms
            thresholds: {
                cpuLoad: { yellow: 70, red: 90 },
                memoryUsage: { yellow: 70, red: 90 },
                diskIO: { yellow: 60, red: 80 },
                freeSpace: { yellow: 20, red: 10 } // Reversed logic
            }
        };

        // Initialize data arrays
        const timeLabels = [];
        const cpuData = [];
        const memoryData = [];
        const diskIOData = [];
        const freeSpaceData = [];

        // Setup CPU & Memory Chart
        const cpuMemoryCtx = document.getElementById('cpuMemoryChart').getContext('2d');
        const cpuMemoryChart = new Chart(cpuMemoryCtx, {
            type: 'line',
            data: {
                labels: timeLabels,
                datasets: [
                    {
                        label: 'CPU Load (%)',
                        data: cpuData,
                        borderColor: '#FF4D4F',
                        backgroundColor: 'rgba(255, 77, 79, 0.1)',
                        tension: 0.4,
                        borderWidth: 2,
                        pointRadius: 0,
                        pointHoverRadius: 5
                    },
                    {
                        label: 'Memory Usage (%)',
                        data: memoryData,
                        borderColor: '#FAAD14',
                        backgroundColor: 'rgba(250, 173, 20, 0.1)',
                        tension: 0.4,
                        borderWidth: 2,
                        pointRadius: 0,
                        pointHoverRadius: 5
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        title: {
                            display: true,
                            text: 'Percentage (%)'
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            maxRotation: 0,
                            autoSkip: true,
                            maxTicksLimit: 10
                        }
                    }
                },
                animation: {
                    duration: 0
                },
                plugins: {
                    legend: {
                        position: 'top'
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    }
                }
            }
        });

        // Setup Disk Chart
        const diskCtx = document.getElementById('diskChart').getContext('2d');
        const diskChart = new Chart(diskCtx, {
            type: 'line',
            data: {
                labels: timeLabels,
                datasets: [
                    {
                        label: 'Disk I/O (MB/s)',
                        data: diskIOData,
                        borderColor: '#1890FF',
                        backgroundColor: 'rgba(24, 144, 255, 0.1)',
                        tension: 0.4,
                        borderWidth: 2,
                        pointRadius: 0,
                        pointHoverRadius: 5,
                        yAxisID: 'y'
                    },
                    {
                        label: 'Free Disk Space (%)',
                        data: freeSpaceData,
                        borderColor: '#52C41A',
                        backgroundColor: 'rgba(82, 196, 26, 0.1)',
                        tension: 0.4,
                        borderWidth: 2,
                        pointRadius: 0,
                        pointHoverRadius: 5,
                        yAxisID: 'y1'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        position: 'left',
                        title: {
                            display: true,
                            text: 'Disk I/O (MB/s)'
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    y1: {
                        beginAtZero: true,
                        max: 100,
                        position: 'right',
                        title: {
                            display: true,
                            text: 'Free Space (%)'
                        },
                        grid: {
                            display: false
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            maxRotation: 0,
                            autoSkip: true,
                            maxTicksLimit: 10
                        }
                    }
                },
                animation: {
                    duration: 0
                },
                plugins: {
                    legend: {
                        position: 'top'
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    }
                }
            }
        });

        // Helper functions
        function generateRandomValue(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        function formatTime(date) {
            return date.toTimeString().split(' ')[0];
        }

        function updateStatusIndicator(elementPrefix, value, thresholds, reverseLogic = false) {
            const dotElement = document.getElementById(`${elementPrefix}-status-dot`);
            const textElement = document.getElementById(`${elementPrefix}-status-text`);

            let statusClass, statusText;

            if (reverseLogic) {
                if (value <= thresholds.red) {
                    statusClass = 'red';
                    statusText = 'ERROR';
                } else if (value <= thresholds.yellow) {
                    statusClass = 'yellow';
                    statusText = 'WARNING';
                } else {
                    statusClass = 'green';
                    statusText = 'OK';
                }
            } else {
                if (value >= thresholds.red) {
                    statusClass = 'red';
                    statusText = 'ERROR';
                } else if (value >= thresholds.yellow) {
                    statusClass = 'yellow';
                    statusText = 'WARNING';
                } else {
                    statusClass = 'green';
                    statusText = 'OK';
                }
            }

            // Remove all possible classes
            dotElement.classList.remove('green', 'yellow', 'red');
            textElement.classList.remove('green', 'yellow', 'red');

            // Add the correct class
            dotElement.classList.add(statusClass);
            textElement.classList.add(statusClass);

            // Update the text
            textElement.textContent = statusText;
        }

        // Update function for metrics
        function updateMetrics() {
            const currentTime = new Date();
            const timeString = formatTime(currentTime);

            // Generate new values
            const cpuValue = generateRandomValue(5, 100);
            const memoryValue = generateRandomValue(10, 95);
            const diskIOValue = generateRandomValue(0, 100);
            const freeSpaceValue = generateRandomValue(5, 95);

            // Update card values
            document.getElementById('cpu-value').textContent = `${cpuValue}%`;
            document.getElementById('memory-value').textContent = `${memoryValue}%`;
            document.getElementById('diskio-value').textContent = `${diskIOValue} MB/s`;
            document.getElementById('diskspace-value').textContent = `${freeSpaceValue}%`;

            // Update timestamps
            const elements = ['cpu-time', 'memory-time', 'diskio-time', 'diskspace-time'];
            elements.forEach(id => {
                document.getElementById(id).textContent = `Updated at ${timeString}`;
            });

            // Update status indicators
            updateStatusIndicator('cpu', cpuValue, config.thresholds.cpuLoad);
            updateStatusIndicator('memory', memoryValue, config.thresholds.memoryUsage);
            updateStatusIndicator('diskio', diskIOValue, config.thresholds.diskIO);
            updateStatusIndicator('diskspace', freeSpaceValue, config.thresholds.freeSpace, true);

            // Update chart data
            timeLabels.push(timeString);
            cpuData.push(cpuValue);
            memoryData.push(memoryValue);
            diskIOData.push(diskIOValue);
            freeSpaceData.push(freeSpaceValue);

            // Limit the number of data points
            if (timeLabels.length > config.maxDataPoints) {
                timeLabels.shift();
                cpuData.shift();
                memoryData.shift();
                diskIOData.shift();
                freeSpaceData.shift();
            }

            // Update the charts
            cpuMemoryChart.update();
            diskChart.update();
        }

        // Initial update
        updateMetrics();

        // Start periodic updates
        setInterval(updateMetrics, config.updateInterval);