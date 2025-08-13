const ckbaj = document.getElementById('ckbaj');
const ckbdc = document.getElementById('ckbdc');
const visibleDiv = localStorage.getItem('visibleDiv') || 'jailbreak-page';
const savedaj = localStorage.getItem('autojbstate');
const savedc = localStorage.getItem('dbugc');
const menuBtns = document.querySelectorAll('.menu-btn');
const psBtns = document.querySelectorAll('.ps-btn');
const plsbtn = document.querySelectorAll('.button-container button');
const CURRENT_VERSION = '1.1.0 -Final'; 

fetch('/version.json', { cache: 'no-store' })
  .then(response => response.json())
  .then(data => {
    const serverVersion = data.version;
    const notice = document.getElementById('version_notice');
    notice.style.display = 'block';

    if (CURRENT_VERSION === serverVersion) {
      // 绿色：已是最新版本
      notice.style.color = '#2e7d32';
      notice.style.backgroundColor = '#c8e6c9';
      notice.style.borderColor = '#388e3c';
      notice.textContent = '当前版本：' + CURRENT_VERSION + '，已是最新版本。';
    } else {
      // 红色：版本不一致，建议刷新
      notice.style.color = '#b71c1c';
      notice.style.backgroundColor = '#ffcdd2';
      notice.style.borderColor = '#d32f2f';
      notice.textContent = '检测到新版本：' + serverVersion + '，请重新缓存浏览器（三清）获取最新内容。';
    }
  })
  .catch(err => {
    const notice = document.getElementById('version_notice');
     notice.style.display = 'block';
    notice.style.color = '#b71c1c';
    notice.style.backgroundColor = '#ffcdd2';
    notice.style.borderColor = '#d32f2f';
    notice.textContent = '版本检测失败，请检查网络或稍后再试。';
    console.error('版本检测错误:', err);
  });

window.addEventListener('DOMContentLoaded', loadsettings);

document.getElementById('jailbreak').addEventListener('click', () => {
  jailbreak();
});

document.getElementById('binloader').addEventListener('click', () => {
  binloader();
});

document.querySelectorAll('button[data-func]').forEach(button => {
  button.addEventListener('click', () => {
    const payload = button.getAttribute('data-func');
    Loadpayloads(payload);
  });
});

ckbaj.addEventListener('change', (e) => {
  //alert("WARNING :\nThis option make the jailbreak unstable and this option is not recommended please use the jailbreak button instead !");
  localStorage.setItem('autojbstate', e.target.checked);
  onCheckboxChange(e.target.checked);
});

ckbdc.addEventListener('change', (e) => {
  localStorage.setItem('dbugc', e.target.checked);
  onCheckboxChange(e.target.checked);
  if (ckbdc.checked) {
    document.getElementById('DebugConsole').style.display  = 'flex';
  } else {
    document.getElementById('DebugConsole').style.display = 'none';
  }
});

function isHttps() {
  return window.location.protocol === 'https:';
}

async function loadMultipleModules(files) {
  try {
    // Dynamically import all modules
    const modules = await Promise.all(files.map(file => import(file)));
    return modules; // array of imported modules
  } catch (error) {
    console.error("Error loading modules:", error);
    throw error;
  }
}

function showabout() {
  document.getElementById('about-popup').style.display = 'flex'; // Show popup
  document.getElementById('overlay-popup').style.display = 'block'; // Show overlay
}

function closeabout() {
  document.getElementById('about-popup').style.display = 'none'; // Hide popup
  document.getElementById('overlay-popup').style.display = 'none'; // Hide overlay
}

function showsettings() {
  document.getElementById('settings-popup').style.display = 'flex'; // Show popup
  document.getElementById('overlay-popup').style.display = 'block'; // Show overlay
}

function closesettings() {
  document.getElementById('settings-popup').style.display = 'none'; // Hide popup
  document.getElementById('overlay-popup').style.display = 'none'; // Hide overlay
}

function checksettings() {
  if (localStorage.getItem('HEN')) {
    menuBtns.forEach(el => {
      el.onmouseover = () => el.style.backgroundColor = '#00F0FF';
      el.onmouseout = () => el.style.backgroundColor = '';
    });

    psBtns.forEach(el => {
      el.onmouseover = () => {
      el.style.boxShadow = '0 0px 48px #00F0FF, 0 0px 10px #000c';
        const svg = el.querySelector('svg');
        if (svg) svg.style.fill = '#00F0FF';
      };
      el.onmouseout = () => {
        el.style.boxShadow = '';
        const svg = el.querySelector('svg');
        if (svg) svg.style.fill = '';
      };
    });

    plsbtn.forEach(btn => {
      btn.style.borderColor = '#00F0FF';
      btn.addEventListener('mouseenter', () => {
        btn.style.backgroundColor = '#00F0FF';
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.backgroundColor = ''; 
      });
    });

    document.getElementById('console').style.borderColor = '#00F0FF';
    document.getElementById('header-title').style.borderColor = '#00F0FF';
    document.getElementById('header-title').style.textShadow = '0px 0px 15px #00F0FF';
    
    const containers = document.querySelectorAll('.button-container');
    containers.forEach(container => {
      container.style.borderColor = '#00F0FF';
    });
  } else {
    menuBtns.forEach(el => {
      el.onmouseover = () => el.style.backgroundColor = '#CFDEF3';
      el.onmouseout = () => el.style.backgroundColor = '';
    });

    psBtns.forEach(el => {
      el.onmouseover = () => {
        el.style.boxShadow = '0 0px 48px #CFDEF3, 0 0px 10px #000c';
        const svg = el.querySelector('svg');
        if (svg) svg.style.fill = '#CFDEF3';
      };
      el.onmouseout = () => {
        el.style.boxShadow = '';
        const svg = el.querySelector('svg');
        if (svg) svg.style.fill = '';
      };
    });

    plsbtn.forEach(btn => {
      btn.style.borderColor = '#CFDEF3';
      btn.addEventListener('mouseenter', () => {
        btn.style.backgroundColor = '#CFDEF3';
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.backgroundColor = '';
      });
    });

    document.getElementById('console').style.borderColor = '#CFDEF3';
    document.getElementById('header-title').style.borderColor = '#CFDEF3';
    document.getElementById('header-title').style.textShadow = '0px 0px 15px #CFDEF3';
    document.getElementById('button-container').style.borderColor = '#CFDEF3';

    const containers = document.querySelectorAll('.button-container');
    containers.forEach(container => {
      container.style.borderColor = '#CFDEF3';
    });
  }
}

function showpayloads() {
  if (document.getElementById('payloadsbtn').textContent == '系统工具') {
  document.getElementById('jailbreak-page').style.display = 'none';
  document.getElementById('payloads-page').style.display = 'block';
  document.getElementById('payloadsbtn').textContent = '返回注入菜单';
  localStorage.setItem('visibleDiv', 'payloads-page');
  }else{
  document.getElementById('jailbreak-page').style.display = 'block';
  document.getElementById('payloads-page').style.display = 'none';
  document.getElementById('payloadsbtn').textContent = '系统工具';
  localStorage.setItem('visibleDiv', 'jailbreak-page');

  };
  CheckFW();
}

function showtoolspayloads() {
  document.getElementById('payloads-linux').style.display = 'none';
  document.getElementById('payloads-tools').style.display = 'block';
}

function showlinuxpayloads() {
  document.getElementById('payloads-linux').style.display = 'block';
  document.getElementById('payloads-tools').style.display = 'none';
}

function loadjbflavor() {
  const savedValue = localStorage.getItem('selectedHEN');
  if (savedValue) {
    const radio = document.querySelector(`input[name="hen"][value="${savedValue}"]`);
    if (radio) {
      radio.checked = true;
    }
  }
}

function savejbflavor() {
  const radios = document.querySelectorAll('input[name="hen"]');
  radios.forEach(radio => {
    if (radio.checked) {
      localStorage.setItem('selectedHEN', radio.value);
    }
  });
}

function loadajbsettings(){
  if (savedaj !== null) {
    ckbaj.checked = savedaj === 'true';
    onCheckboxChange(ckbaj.checked);
  }

  if (savedc !== null){
    ckbdc.checked = savedc === 'true';
    onCheckboxChange(ckbdc.checked);
  }

  if (ckbaj.checked) {
    if (sessionStorage.getItem('jbsuccess')) {
      console.log('Aleardy jailbroken !');
    } else {
      document.getElementById('jailbreak').style.display = 'none';
      document.getElementById('loader').style.display = 'flex';
      setTimeout(() => {
        jailbreak();
      }, 3000);
    }
  }

  if (ckbdc.checked) {
    document.getElementById('DebugConsole').style.display  = 'flex';
  } else {
    document.getElementById('DebugConsole').style.display = 'none';
  }

  if (visibleDiv === 'jailbreak-page') {
    document.getElementById('jailbreak-page').style.display = 'block';
    document.getElementById('payloads-page').style.display = 'none';
    document.getElementById('payloadsbtn').textContent = '系统工具';
  } else {
    document.getElementById('jailbreak-page').style.display = 'none';
    document.getElementById('payloads-page').style.display = 'block';
    document.getElementById('payloadsbtn').textContent = '返回注入菜单';
    localStorage.setItem('visibleDiv', 'payloads-page');
  }
}

async function jailbreak() {
  try {
    document.getElementById('jailbreak').style.display = 'none';
    document.getElementById('loader').style.display = 'flex';
    const modules = await loadMultipleModules([
      '../payloads/Jailbreak.js',
      '../psfree/alert.mjs'
    ]);
    console.log("All modules are loaded!");
    const JailbreakModule = modules[0];

    if (localStorage.getItem('HEN')) {
      if (JailbreakModule && typeof JailbreakModule.HEN === 'function') {
          JailbreakModule.HEN();
      } else {
          console.error("HEN function not found in Jailbreak.js module");
      }
    } else if (localStorage.getItem('GoldHEN')) {
      if (JailbreakModule && typeof JailbreakModule.GoldHEN === 'function') {
          JailbreakModule.GoldHEN();
      } else {
          console.error("GoldHEN function not found in Jailbreak.js module");
      }
    } else {
      if (JailbreakModule && typeof JailbreakModule.GoldHEN === 'function') {
          JailbreakModule.GoldHEN();
      } else {
          console.error("GoldHEN function not found in Jailbreak.js module");
      }
    }
  } catch (e) {
    console.error("Failed to jailbreak:", e);
  }
}

async function binloader() {
  try {
    sessionStorage.setItem('binloader', 1);
    const modules = await loadMultipleModules([
      '../psfree/alert.mjs'
    ]);
    console.log("All modules are loaded!");

    const goldhenModule = modules[0];
    if (goldhenModule && typeof goldhenModule.runBinLoader === 'function') {
      goldhenModule.runBinLoader();
    } else {
      console.error("GoldHEN function not found in GoldHEN.js module");
    }
  } catch (e) {
    console.error("Failed to jailbreak:", e);
  }
}

async function Loadpayloads(payload) {
  try {
    let modules;
    sessionStorage.removeItem('binloader');
    if (isHttps()) {
      modules = await loadMultipleModules([
        '../payloads/payloads.js',
        '../psfree/alert.mjs'
      ]);
      console.log("All modules are loaded!");
    } else {
      modules = await loadMultipleModules([
        '../payloads/payloads.js'
      ]);
      console.log("All modules are loaded!");
    }

    const payloadModule = modules[0];
    if (payloadModule && typeof payloadModule[payload] === 'function') {
      payloadModule[payload]();
    } else {
      console.error(`${payload} function not found in payloads.js module`);
    }
  } catch (e) {
    console.error(`Failed to load ${payload}:`, e);
  }
}

function loadsettings() {
  loadajbsettings();
  checksettings();
}

function onCheckboxChange(checked) {
  if (checked) {
    console.log('Checkbox is checked!');
  } else {
    console.log('Checkbox is unchecked!');
  }
}