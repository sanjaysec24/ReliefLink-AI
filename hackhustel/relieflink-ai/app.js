// Initialize Lucide icons
lucide.createIcons();

// DOM Elements
const screenHome = document.getElementById('screen-home');
const screenInput = document.getElementById('screen-input');
const screenResult = document.getElementById('screen-result');

const btnStart = document.getElementById('btn-start');
const btnBackHome = document.getElementById('btn-back-home');
const btnBackInput = document.getElementById('btn-back-input');
const analysisForm = document.getElementById('analysis-form');

// Result Elements
const resRegion = document.getElementById('res-region');
const resPriorityText = document.getElementById('res-priority-text');
const resPriorityDesc = document.getElementById('res-priority-desc');
const pulseIndicator = document.getElementById('pulse-indicator');
const resTarget = document.getElementById('res-target');
const resResourceType = document.getElementById('res-resource-type');
const resEta = document.getElementById('res-eta');
const resRoute = document.getElementById('res-route');
const resAllocation = document.getElementById('res-allocation');
const mapDest = document.getElementById('map-dest');
const currentTimeEl = document.getElementById('current-time');

// Set current time in dashboard
function updateTime() {
    const now = new Date();
    currentTimeEl.textContent = now.toLocaleTimeString() + ' Local';
}
setInterval(updateTime, 1000);
updateTime();

// Navigation Logic
function switchScreen(hideScreen, showScreen) {
    hideScreen.classList.remove('active');
    
    setTimeout(() => {
        hideScreen.style.display = 'none';
        showScreen.style.display = 'flex';
        
        // Force reflow
        void showScreen.offsetWidth;
        
        showScreen.classList.add('active');
    }, 400); // Wait for fade out animation
}

// Initial Setup
screenHome.classList.add('active');

// Event Listeners
btnStart.addEventListener('click', () => {
    switchScreen(screenHome, screenInput);
});

btnBackHome.addEventListener('click', (e) => {
    e.preventDefault();
    switchScreen(screenInput, screenHome);
});

btnBackInput.addEventListener('click', () => {
    switchScreen(screenResult, screenInput);
});

// Form Submission & Logic
analysisForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const region = document.getElementById('region').value;
    const severity = document.getElementById('severity').value;
    const resource = document.getElementById('resource').value;
    
    // Switch to loading screen
    switchScreen(screenInput, document.getElementById('screen-loading'));
    
    // Simulate AI Processing
    setTimeout(() => {
        processAnalysis(region, severity, resource);
        switchScreen(document.getElementById('screen-loading'), screenResult);
    }, 1500); // 1.5s simulated loading state
});

function processAnalysis(region, severity, resource) {
    // Set Region & Resource Type
    resRegion.textContent = region;
    resResourceType.textContent = resource;
    
    // Process Severity
    mapDest.className = 'node destination';
    pulseIndicator.className = 'pulse-ring';
    resPriorityText.className = 'priority-text';
    
    if (severity === 'High') {
        resPriorityText.textContent = 'HIGH PRIORITY';
        resPriorityText.classList.add('color-high');
        pulseIndicator.classList.add('pulse-high');
        mapDest.classList.add('high');
        
        resPriorityDesc.textContent = 'Critical immediate action required. Bypassing standard queues.';
        resEta.textContent = '15 - 30 mins';
        resRoute.textContent = 'Fastest available vector (Air Support recommended). Avoiding congested surface zones.';
        resAllocation.textContent = 'Immediate Multi-Unit Dispatch';
    } else if (severity === 'Medium') {
        resPriorityText.textContent = 'MODERATE';
        resPriorityText.classList.add('color-med');
        pulseIndicator.classList.add('pulse-med');
        mapDest.classList.add('med');
        
        resPriorityDesc.textContent = 'Elevated priority. Deploying secondary fleet assets.';
        resEta.textContent = '1 - 2 hours';
        resRoute.textContent = 'Main Highway 4, standard convoy configuration with priority lane clearance.';
        resAllocation.textContent = 'Standard Ground Convoy';
    } else {
        resPriorityText.textContent = 'LOW PRIORITY';
        resPriorityText.classList.add('color-low');
        pulseIndicator.classList.add('pulse-low');
        mapDest.classList.add('low');
        
        resPriorityDesc.textContent = 'Standard processing. Monitoring situation for escalation.';
        resEta.textContent = '4 - 6 hours';
        resRoute.textContent = 'Secondary access roads, consolidated shipment.';
        resAllocation.textContent = 'Scheduled Delivery Units';
    }
    
    // Process Resource Types
    if (resource === 'Medical') {
        resTarget.textContent = `${region} General Hospital Main Wing`;
    } else if (resource === 'Food' || resource === 'Water') {
        resTarget.textContent = `${region} Central Relief Camp`;
    } else {
        resTarget.textContent = `${region} Logistics Hub`;
    }
    
    // AI Supply and Demand Logic
    const resRequired = document.getElementById('res-required');
    const resAvailable = document.getElementById('res-available');
    const resShortage = document.getElementById('res-shortage');
    
    let required = 0, available = 0;
    if (severity === 'High') {
        required = Math.floor(Math.random() * 500) + 800; // 800-1300
        available = Math.floor(Math.random() * 300) + 200; // 200-500
        resShortage.style.display = 'flex';
        resShortage.innerHTML = '<i data-lucide="alert-circle"></i> Shortage detected – Immediate dispatch required';
        resShortage.className = 'shortage-alert alert-high';
    } else if (severity === 'Medium') {
        required = Math.floor(Math.random() * 300) + 400; // 400-700
        available = Math.floor(Math.random() * 200) + 350; // 350-550
        if (required > available) {
            resShortage.style.display = 'flex';
            resShortage.innerHTML = '<i data-lucide="alert-triangle"></i> Moderate shortage – Reallocating regional assets';
            resShortage.className = 'shortage-alert alert-med';
        } else {
            resShortage.style.display = 'none';
        }
    } else {
        required = Math.floor(Math.random() * 100) + 100; // 100-200
        available = Math.floor(Math.random() * 300) + 400; // 400-700
        resShortage.style.display = 'flex';
        resShortage.innerHTML = '<i data-lucide="check-circle"></i> Supply stable – Standard deployment confirmed';
        resShortage.className = 'shortage-alert alert-low';
    }
    
    resRequired.textContent = `${required} units`;
    resAvailable.textContent = `${available} units`;
    
    // Re-initialize any new icons injected into the DOM
    lucide.createIcons();
}
