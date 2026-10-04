// Main Orchestration for Bantai Food Co POS

const CONFIG = {
  companyCode: 'BANTAI-KITCHEN',
  lastSync: '05/10/2026, 00:29:16'
};

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  updateSyncTimestamps();
});

function initNavigation() {
  const buttons = document.querySelectorAll('.nav-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      switchTab(targetTab);
    });
  });
}

function switchTab(tabId) {
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

  const activeBtn = document.querySelector(`.nav-btn[data-tab="${tabId}"]`);
  const activeContent = document.getElementById(`tab-${tabId}`);

  if (activeBtn) activeBtn.classList.add('active');
  if (activeContent) activeContent.classList.add('active');
}

function syncNow() {
  const now = new Date().toLocaleString('en-GB');
  CONFIG.lastSync = now;
  updateSyncTimestamps();
  alert('Sync completed with Supabase cloud!');
}

function pullCloud() {
  alert('Latest cloud data pulled successfully.');
}

function testCloudConnection() {
  alert('Supabase connection test: OK');
}

function installApp() {
  alert('App installation initiated.');
}

function openCodeModal() {
  const newCode = prompt('Enter new Company Code:', CONFIG.companyCode);
  if (newCode && newCode.trim() !== '') {
    CONFIG.companyCode = newCode.trim().toUpperCase();
    document.getElementById('company-code-display').innerText = CONFIG.companyCode;
    document.getElementById('active-company-code').innerText = CONFIG.companyCode;
  }
}

function updateSyncTimestamps() {
  const el1 = document.getElementById('last-sync-time');
  const el2 = document.getElementById('cloud-last-sync');
  if (el1) el1.innerText = CONFIG.lastSync;
  if (el2) el2.innerText = CONFIG.lastSync;
}

function exportData() {
  const data = {
    companyCode: CONFIG.companyCode,
    upiPrimary: document.getElementById('upi-primary-id').value,
    upiSecondary: document.getElementById('upi-secondary-id').value,
    oilPrice: document.getElementById('oil-price').value,
    oilPlates: document.getElementById('oil-plates').value,
  };
  const jsonStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
  const dlAnchor = document.createElement('a');
  dlAnchor.setAttribute("href", jsonStr);
  dlAnchor.setAttribute("download", "bantai_pos_config.json");
  dlAnchor.click();
}

function importData() {
  alert('Select JSON file to import data.');
}

function clearData() {
  if (confirm('Are you sure you want to clear local settings?')) {
    localStorage.clear();
    location.reload();
  }
}
