const state = {
  token: localStorage.getItem('token') || '',
};

function setAuthStatus() {
  const el = document.getElementById('auth-status');
  el.textContent = state.token ? 'Logged in' : 'Logged out';
  document.getElementById('profile').classList.toggle('hidden', !state.token);
  document.getElementById('wallet').classList.toggle('hidden', !state.token);
}

async function api(path, opts = {}) {
  const headers = Object.assign({ 'Content-Type': 'application/json' }, opts.headers || {});
  if (state.token) headers['Authorization'] = `Bearer ${state.token}`;
  const res = await fetch(path, { ...opts, headers });
  const text = await res.text();
  try { return JSON.parse(text); } catch { return text; }
}

async function loadOffers() {
  const list = document.getElementById('offersList');
  list.innerHTML = 'Loading offers...';
  const offers = await api('/offers');
  if (!Array.isArray(offers)) {
    list.textContent = 'Failed to load offers';
    return;
  }
  list.innerHTML = '';
  offers.forEach((o) => {
    const div = document.createElement('div');
    div.className = 'offer';
    div.innerHTML = `<div><strong>${o.title}</strong><br/><small>${o.description || ''}</small></div>
      <div>
        <div>${o.payoutCents / 100} USD (~${(o.payoutCents * 10)} coins)</div>
        <button>Get</button>
      </div>`;
    div.querySelector('button').onclick = async () => {
      const result = await api('/offers/click', { method: 'POST', body: JSON.stringify({ provider: o.provider, offerId: o.id }) });
      alert('Click created: ' + JSON.stringify(result));
    };
    list.appendChild(div);
  });
}

async function loadProfile() {
  const data = await api('/users/me');
  document.getElementById('profileData').textContent = JSON.stringify(data, null, 2);
}

async function loadBalance() {
  const bal = await api('/wallet/balance');
  document.getElementById('balance').textContent = bal.coinBalance ?? 0;
  const ledger = await api('/wallet/ledger');
  document.getElementById('ledger').textContent = JSON.stringify(ledger, null, 2);
}

function bindAuth() {
  document.getElementById('registerBtn').onclick = async () => {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const displayName = document.getElementById('displayName').value.trim() || 'User';
    const res = await api('/auth/register', { method: 'POST', body: JSON.stringify({ email, password, displayName }) });
    if (res.accessToken) {
      state.token = res.accessToken;
      localStorage.setItem('token', state.token);
      setAuthStatus();
      await loadProfile();
      await loadBalance();
    } else {
      alert('Register failed: ' + JSON.stringify(res));
    }
  };
  document.getElementById('loginBtn').onclick = async () => {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const res = await api('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
    if (res.accessToken) {
      state.token = res.accessToken;
      localStorage.setItem('token', state.token);
      setAuthStatus();
      await loadProfile();
      await loadBalance();
    } else {
      alert('Login failed: ' + JSON.stringify(res));
    }
  };
  document.getElementById('logoutBtn').onclick = () => {
    state.token = '';
    localStorage.removeItem('token');
    setAuthStatus();
  };
}

function bindPayout() {
  document.getElementById('requestPayoutBtn').onclick = async () => {
    const method = document.getElementById('payoutMethod').value;
    const amountCoins = parseInt(document.getElementById('payoutCoins').value, 10);
    const res = await api('/payouts/request', { method: 'POST', body: JSON.stringify({ method, amountCoins }) });
    alert('Payout request: ' + JSON.stringify(res));
    await loadBalance();
  };
}

(async function init() {
  setAuthStatus();
  bindAuth();
  bindPayout();
  await loadOffers();
  if (state.token) {
    await loadProfile();
    await loadBalance();
  }
})();