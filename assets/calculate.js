// Zakat Calculator Script
// Pendapatan Zakat Functions
function updatePendapatanNisab() {
    const nisabValue = document.querySelector('#tahun-pendapatan option:checked').getAttribute('data-nisab');
    document.getElementById('nisab-pendapatan').value = parseFloat(nisabValue).toFixed(2);
    calculatePendapatanZakat();
  }
  
  function calculatePendapatanZakat() {
    const pendapatanInput = document.getElementById('pendapatan-kasar');
    const nisabInput = document.getElementById('nisab-pendapatan');
    document.getElementById('total-pendapatan').textContent = "0.00";
  
    if (pendapatanInput.value.trim() === "") {
      document.getElementById('zakat-pendapatan-sebulan').textContent = "0.00";
      document.getElementById('zakat-pendapatan-setahun').textContent = "0.00";
      document.getElementById('hadPendapatan').classList.remove('had-nisab');
      return;
    }
  
    const pendapatanKasar = parseFloat(pendapatanInput.value) || 0;
    const nisab = parseFloat(nisabInput.value) || 0;
  
    if (pendapatanKasar >= nisab && nisab > 0) {
      const zakatSebulan = ((pendapatanKasar * 2.5) / 100) / 12;
      document.getElementById('zakat-pendapatan-sebulan').textContent = zakatSebulan.toFixed(2);
  
      const zakatSetahun = (pendapatanKasar * 2.5) / 100;
      document.getElementById('zakat-pendapatan-setahun').textContent = zakatSetahun.toFixed(2);
  
      document.getElementById('hadPendapatan').classList.remove('had-nisab');
    } else {
      document.getElementById('zakat-pendapatan-sebulan').textContent = "0.00";
      document.getElementById('zakat-pendapatan-setahun').textContent = "0.00";
      document.getElementById('hadPendapatan').classList.add('had-nisab');
    }
  }
  
  
  function resetPendapatan() {
    document.getElementById('pendapatan-kasar').value = "";
    updatePendapatanNisab();
  }
  
  
  // Perniagaan Zakat Functions
  function calculatePerniagaanZakat() {
    const asset = parseFloat(document.getElementById('perniagaan-asset').value) || 0;
    const liability = parseFloat(document.getElementById('perniagaan-liabiti').value) || 0;
    const total = asset - liability;
  
    document.getElementById('total-perniagaan').textContent = total.toFixed(2);
  
    if (total >= 0) {
      const zakatAmount = (total * 2.5) / 100;
      document.getElementById('total-perniagaan-wajib').textContent = zakatAmount.toFixed(2);
      document.getElementById('total-perniagaan-takwajib').textContent = "0.00";
    } else {
      document.getElementById('total-perniagaan-wajib').textContent = "0.00";
      document.getElementById('total-perniagaan-takwajib').textContent = Math.abs(total).toFixed(2);
    }
  }
  
  function resetPerniagaan() {
    document.getElementById('perniagaan-asset').value = "";
    document.getElementById('perniagaan-liabiti').value = "";
    document.getElementById('total-perniagaan').textContent = "0.00";
    document.getElementById('total-perniagaan-wajib').textContent = "0.00";
    document.getElementById('total-perniagaan-takwajib').textContent = "0.00";
  }
  
  document.getElementById('perniagaan-asset').addEventListener('input', calculatePerniagaanZakat);
  document.getElementById('perniagaan-liabiti').addEventListener('input', calculatePerniagaanZakat);
  
  // Emas Zakat Functions
  function updateHargaEmas() {
    const selectedYear = document.getElementById('tahun-emas').value;
    const hargaEmas = document.querySelector(`#tahun-emas option[value='${selectedYear}']`).getAttribute('harga-emas');
    document.getElementById('harga-emas').value = hargaEmas;
    calculateEmasZakat();
  }
  
  function calculateEmasZakat() {
    const hargaEmasInput = document.getElementById('harga-emas');
    const urufEmasInput = document.getElementById('uruf-emas');
    const emasDisimpanInput = document.getElementById('emas-berat');
    const emasDihiasInput = document.getElementById('emas-berat-perhiasan');
    const nisab = 85;  // Nisab in grams for zakat calculation
    const zakatRate = 2.5;  // Zakat rate (2.5%)
  
    if (emasDisimpanInput.value.trim() === "" && emasDihiasInput.value.trim() === "") {
      document.getElementById('total-emas-berat').textContent = "0.00";
      document.getElementById('total-emas').textContent = "0.00";
      document.getElementById('total-zakat-emas').textContent = "0.00";
      document.getElementById('hadEmas').classList.remove('had-nisab');
      document.getElementById('hadEmasUruf').classList.remove('had-nisab');
      return;
    }
  
    const hargaEmas = parseFloat(hargaEmasInput.value) || 0;
    const urufEmas = parseFloat(urufEmasInput.value) || 0;
    const emasDisimpan = parseFloat(emasDisimpanInput.value) || 0;
    const emasDihias = parseFloat(emasDihiasInput.value) || 0;
  
    const totalBerat = emasDisimpan + emasDihias;
    document.getElementById('total-emas-berat').textContent = totalBerat.toFixed(2);
  
    const totalEmas = totalBerat * hargaEmas;
    document.getElementById('total-emas').textContent = totalEmas.toFixed(2);
  
    // Check if total weight exceeds nisab
    if (emasDihias > urufEmas && totalBerat >= nisab) {
      let totalZakatEmas = 0;
  
      // Zakat emas perhiasan yang melebihi uruf
      totalZakatEmas += ((emasDihias - urufEmas) * hargaEmas * zakatRate) / 100;
  
      // Zakat emas simpan
      totalZakatEmas += (emasDisimpan * hargaEmas * zakatRate) / 100;
  
      document.getElementById('total-zakat-emas').textContent = totalZakatEmas.toFixed(2);
      document.getElementById('hadEmas').classList.remove('had-nisab');
      document.getElementById('hadEmasUruf').classList.remove('had-nisab');
  
    } else if (emasDisimpan >= nisab) {
        let totalZakatEmas = 0;
  
        totalZakatEmas += (emasDisimpan * hargaEmas * zakatRate) / 100;
  
        document.getElementById('total-zakat-emas').textContent = totalZakatEmas.toFixed(2);
        document.getElementById('hadEmas').classList.remove('had-nisab');
        document.getElementById('hadEmasUruf').classList.add('had-nisab');
  
    } else {
        document.getElementById('total-zakat-emas').textContent = "0.00";
        document.getElementById('hadEmas').classList.add('had-nisab');
        document.getElementById('hadEmasUruf').classList.add('had-nisab');
    }
  }
  
  function resetEmas() {
    document.getElementById('emas-berat').value = "";
    document.getElementById('total-emas-berat').textContent = "0.00";
    document.getElementById('total-emas').textContent = "0.00";
    document.getElementById('total-zakat-emas').textContent = "0.00";
    document.getElementById('hadEmas').classList.remove('had-nisab');
    document.getElementById('hadEmasUruf').classList.remove('had-nisab');
  }
  
  document.getElementById('emas-berat').addEventListener('input', calculateEmasZakat);
  document.getElementById('emas-berat-perhiasan').addEventListener('input', calculateEmasZakat);
  
  
  // Simpanan Zakat Functions
  function checkSimpananZakat() {
    const simpananInput = document.getElementById('simpanan-wang');
    if (simpananInput.value.trim() === "") {
      document.getElementById('total-simpanan').textContent = "0.00";
      document.getElementById('total-simpanan-wajib').textContent = "0.00";
      document.getElementById('total-simpanan-takwajib').textContent = "0.00";
      document.getElementById('hadSimpanan').classList.remove('had-nisab');
      return;
    }
  
    const nisab = parseFloat(document.getElementById('kadar-nisab').value) || 0;
    const savings = parseFloat(simpananInput.value) || 0;
    const zakatRate = parseFloat(document.getElementById('kadar-zakat').value) / 100;
    
    const zakatAmount = savings * zakatRate;
    const totalSimpanan = savings;
  
    document.getElementById('total-simpanan').textContent = totalSimpanan.toFixed(2);
  
    if (savings >= nisab) {
      document.getElementById('total-simpanan-wajib').textContent = zakatAmount.toFixed(2);
      document.getElementById('total-simpanan-takwajib').textContent = "0.00";
      document.getElementById('hadSimpanan').classList.remove('had-nisab');
    } else {
      document.getElementById('total-simpanan-wajib').textContent = "0.00";
      document.getElementById('total-simpanan-takwajib').textContent = zakatAmount.toFixed(2);
      document.getElementById('hadSimpanan').classList.add('had-nisab');
    }
  }
  
  document.getElementById('simpanan-wang').addEventListener('input', checkSimpananZakat);
  
  document.getElementById('tahun-simpanan').addEventListener('change', function () {
    const selectedYear = this.options[this.selectedIndex];
    const nisabValue = selectedYear.getAttribute('simpanan-nisab');
    document.getElementById('kadar-nisab').value = nisabValue;
    checkSimpananZakat();
  });
// Simpanan Zakat Functions
// Zakat Calculator Script

  //Tabs
function openTab(evt, tabName) {
  const tabs = document.querySelectorAll(".tab")
  tabs.forEach((tab) => tab.classList.remove("active"))
  
  const tablinks = document.querySelectorAll(".tablinks")
  tablinks.forEach((link) => link.classList.remove("active"))
  
  document.getElementById(tabName).classList.add("active")
  evt.currentTarget.classList.add("active")
  }
  
  //Accordian
  var acc = document.getElementsByClassName("accordion")
  var i
  
  for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
      panel.style.padding = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
      panel.style.padding = "10px";
    } 
  });
  }
  
  function initTheme() {
    const currentTheme = localStorage.getItem('siteTheme') || 'default';
    applyTheme(currentTheme);
  
    // Set the initial state of the toggle button if available
    const themeToggle = document.getElementById('theme-switcher');
    if (themeToggle) {
      themeToggle.checked = currentTheme === 'deuteranopia';
    }
  }
  
  function applyTheme(theme) {
    document.body.classList.remove('default', 'deuteranopia');
    document.body.classList.add(theme);
  
    // Update button icon or color
    const themeToggle = document.getElementById('theme-switcher');
    if (themeToggle) {
      themeToggle.style.backgroundColor = theme === 'deuteranopia' ? '#ffbf00' : '#2ab860';
    }
  }
  
  function toggleTheme() {
    const newTheme = document.body.classList.contains('default') ? 'deuteranopia' : 'default';
    localStorage.setItem('siteTheme', newTheme);
    applyTheme(newTheme);
  }

  window.onload = function () {
    // Initialize Zakat Calculator with safe checks
    if (document.getElementById('tahun-pendapatan')) {
      updatePendapatanNisab();
    }
  
    if (document.getElementById('tahun-emas')) {
      updateHargaEmas();
    }
  
    const tahunSimpananElement = document.getElementById("tahun-simpanan");
    if (tahunSimpananElement && tahunSimpananElement.options.length > 0) {
      const selectedYear = tahunSimpananElement.options[0];
      const nisabValue = selectedYear.getAttribute("simpanan-nisab");
      if (document.getElementById("kadar-nisab")) {
        document.getElementById("kadar-nisab").value = nisabValue || "0.00";
      }
    }
  
    if (document.getElementById('total-perniagaan')) {
      document.getElementById('total-perniagaan').textContent = "0.00";
    }
  
    if (document.getElementById('total-perniagaan-wajib')) {
      document.getElementById('total-perniagaan-wajib').textContent = "0.00";
    }
  
    if (document.getElementById('total-perniagaan-takwajib')) {
      document.getElementById('total-perniagaan-takwajib').textContent = "0.00";
    }
  
    initTheme();
  
    const themeToggle = document.getElementById('theme-switcher');
    if (themeToggle) {
      themeToggle.addEventListener('click', toggleTheme);
    }
  };