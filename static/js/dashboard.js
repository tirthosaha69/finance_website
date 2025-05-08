// DOM Elements
const overlay = document.getElementById('overlay');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuItems = document.querySelectorAll('.mobile-menu-item');
const sidebarMenuItems = document.querySelectorAll('.sidebar-menu-item');


// Close sidebar when clicking overlay
overlay.addEventListener('click', () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
});



// Mobile menu active state
mobileMenuItems.forEach(item => {
    item.addEventListener('click', () => {
        mobileMenuItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
    });
});

// Sidebar menu active state
sidebarMenuItems.forEach(item => {
    item.addEventListener('click', () => {
        sidebarMenuItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
    });
});

// Animate values
function animateValue(elementId, start, end, duration) {
    const element = document.getElementById(elementId);
    const startTime = new Date().getTime();
    const endTime = startTime + duration;

    const timer = setInterval(() => {
        const now = new Date().getTime();
        const remaining = Math.max((endTime - now) / duration, 0);
        const value = Math.round(end - (remaining * (end - start)));

        element.textContent = `${value.toLocaleString()}`;

        if (now >= endTime) {
            clearInterval(timer);
            element.textContent = `${end.toLocaleString()}`;
        }
    }, 16);
}

// Animate values on page load
window.addEventListener('load', () => {
    animateValue('income-value', 0, 8750, 1500);
    animateValue('expenses-value', 0, 5230, 1500);
    animateValue('savings-value', 0, 2100, 1500);
    animateValue('investments-value', 0, 1420, 1500);
    animateValue('budget-value', 0, 3520, 1500);

    // Initialize charts
    initCharts();
});

// Initialize charts
function initCharts() {
    // Income vs Expenses Chart
    const incomeExpensesCtx = document.getElementById('incomeExpensesChart').getContext('2d');
    const incomeExpensesChart = new Chart(incomeExpensesCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [
                {
                    label: 'Income',
                    data: [7200, 7450, 7800, 8100, 8750, 0],
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    tension: 0.3,
                    fill: true
                },
                {
                    label: 'Expenses',
                    data: [5500, 5400, 5600, 5100, 5230, 0],
                    borderColor: '#ef4444',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    tension: 0.3,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function (value) {
                            return ' ' + value.toLocaleString();
                        }
                    }
                }
            }
        }
    });

    // Expense Breakdown Chart
    const expenseBreakdownCtx = document.getElementById('expenseBreakdownChart').getContext('2d');
    const expenseBreakdownChart = new Chart(expenseBreakdownCtx, {
        type: 'doughnut',
        data: {
            labels: ['Housing', 'Food', 'Transportation', 'Utilities', 'Entertainment', 'Others'],
            datasets: [
                {
                    data: [2100, 850, 450, 380, 750, 700],
                    backgroundColor: [
                        '#3b82f6',
                        '#10b981',
                        '#f59e0b',
                        '#8b5cf6',
                        '#ec4899',
                        '#6b7280'
                    ],
                    borderWidth: 0
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        boxWidth: 15,
                        padding: 15
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            const value = context.raw;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = Math.round((value / total) * 100);
                            return `${value.toLocaleString()} (${percentage}%)`;
                        }
                    }
                }
            },
            cutout: '70%'
        }
    });
}