

// Sidebar toggle for mobile
const sidebarToggle = document.getElementById('sidebar-toggle');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');


overlay.addEventListener('click', () => {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
});

// Initialize charts
document.addEventListener('DOMContentLoaded', function () {
    // Portfolio Allocation Chart
    const portfolioAllocationCtx = document.getElementById('portfolioAllocationChart').getContext('2d');
    const portfolioAllocationChart = new Chart(portfolioAllocationCtx, {
        type: 'doughnut',
        data: {
            labels: ['US Stocks', 'International Stocks', 'Bonds', 'Real Estate', 'Commodities'],
            datasets: [{
                data: [46, 24, 15, 9, 6],
                backgroundColor: [
                    '#3b82f6', // Primary
                    '#10b981', // Secondary
                    '#f59e0b', // Warning
                    '#ef4444', // Danger
                    '#7c3aed'  // Purple
                ],
                borderWidth: 0,
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%',
            plugins: {
                legend: {
                    display: true,
                    position: 'right',
                    labels: {
                        boxWidth: 12,
                        padding: 20,
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return context.label + ': ' + context.parsed + '%';
                        }
                    }
                }
            }
        }
    });

    // Portfolio Performance Chart
    const portfolioPerformanceCtx = document.getElementById('portfolioPerformanceChart').getContext('2d');
    const portfolioPerformanceChart = new Chart(portfolioPerformanceCtx, {
        type: 'line',
        data: {
            labels: ['Apr 8', 'Apr 15', 'Apr 22', 'Apr 29', 'May 6'],
            datasets: [{
                label: 'Portfolio Value',
                data: [140200, 139500, 142800, 145600, 148325],
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                borderWidth: 2,
                pointBackgroundColor: '#3b82f6',
                pointRadius: 4,
                pointHoverRadius: 6,
                fill: true,
                tension: 0.4
            },
            {
                label: 'Benchmark (S&P 500)',
                data: [140200, 138900, 141500, 143200, 145100],
                borderColor: '#10b981',
                borderWidth: 2,
                pointBackgroundColor: '#10b981',
                pointRadius: 0,
                pointHoverRadius: 4,
                fill: false,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    grid: {
                        display: false
                    }
                },
                y: {
                    beginAtZero: false,
                    ticks: {
                        callback: function (value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    align: 'end',
                    labels: {
                        boxWidth: 12,
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return context.dataset.label + ': $' + context.parsed.y.toLocaleString();
                        }
                    }
                }
            },
            interaction: {
                mode: 'index',
                intersect: false
            }
        }
    });

    // Performance tab switching
    const performanceTabs = document.querySelectorAll('.performance-tab');
    performanceTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            performanceTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Update chart data based on selected timeframe
            // This would typically fetch new data from your backend
            // For demonstration, we'll just show different random data
            if (tab.textContent === '1M') {
                updateChartData(portfolioPerformanceChart,
                    ['Apr 8', 'Apr 15', 'Apr 22', 'Apr 29', 'May 6'],
                    [140200, 139500, 142800, 145600, 148325],
                    [140200, 138900, 141500, 143200, 145100]
                );
            } else if (tab.textContent === '3M') {
                updateChartData(portfolioPerformanceChart,
                    ['Feb 8', 'Mar 1', 'Mar 15', 'Apr 1', 'Apr 15', 'May 1', 'May 6'],
                    [135600, 136800, 138200, 139800, 142500, 145900, 148325],
                    [135600, 136200, 137500, 139200, 141800, 143600, 145100]
                );
            } else if (tab.textContent === '6M') {
                updateChartData(portfolioPerformanceChart,
                    ['Nov 8', 'Dec 8', 'Jan 8', 'Feb 8', 'Mar 8', 'Apr 8', 'May 6'],
                    [128400, 130500, 132800, 135600, 139800, 144200, 148325],
                    [128400, 129800, 132000, 134500, 138200, 142500, 145100]
                );
            }
            // Additional timeframes could be added similarly
        });
    });

    function updateChartData(chart, labels, portfolioData, benchmarkData) {
        chart.data.labels = labels;
        chart.data.datasets[0].data = portfolioData;
        chart.data.datasets[1].data = benchmarkData;
        chart.update();
    }
});