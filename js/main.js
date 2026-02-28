  // 仅添加：隐藏F12 Sources目录结构核心代码
  history.replaceState({}, document.title, window.location.pathname);
  
  document.getElementById('siteName').innerText = siteName;
  // 双滑块同步
  function toggleTheme() {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    document.querySelectorAll('.switch input').forEach(c => c.checked = isDark);
  }
  // 渲染卡片
  function renderList(containerId, list) {
    const el = document.getElementById(containerId);
    el.innerHTML = '';
    
    // 特殊处理视频容器
    if (containerId === 'videoContainer') {
      list.forEach(item => {
        const div = document.createElement('div');
        div.className = 'video-item';
        
        // 简单判断是否为常见视频文件扩展名
        const isVideoFile = /\.(mp4|webm|ogg|mov)$/i.test(item.url);
        
        let contentHtml = '';
        if (isVideoFile) {
          // 添加 preload="metadata" 防止自动加载，不添加 autoplay
          contentHtml = `<video src="${item.url}" controls preload="metadata" style="width:100%;height:calc(100% - 40px);object-fit:cover;"></video>`;
        } else {
          // 尝试在 URL 中添加 autoplay=0 参数（针对 Bilibili/Youtube 等）
          let url = item.url;
          if (url.includes('?')) {
            url += '&autoplay=0';
          } else {
            url += '?autoplay=0';
          }
          contentHtml = `<iframe src="${url}" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>`;
        }

        div.innerHTML = `
          <div class="video-title">${item.name}</div>
          ${contentHtml}
        `;
        el.appendChild(div);
      });
      return;
    }

    // 特殊处理音乐容器
    if (containerId === 'musicContainer') {
      list.forEach(item => {
        const div = document.createElement('div');
        div.className = 'music-item';
        div.innerHTML = `
          <div class="music-info">
            <div class="music-icon">🎵</div>
            <div class="music-name">${item.name}</div>
          </div>
          <audio controls src="${item.url}" style="width: 100%; height: 32px;"></audio>
        `;
        el.appendChild(div);
        
        // 自动暂停其他播放器
        const audio = div.querySelector('audio');
        audio.onplay = () => {
           document.querySelectorAll('audio').forEach(a => {
             if (a !== audio) {
               a.pause();
             }
           });
        };
      });
      return;
    }

    list.forEach(item => {
      const div = document.createElement('div');
      div.className = 'nav-item';
      const iconIndex = parseInt(item.icon || 0, 10);
      const icon = icons[iconIndex] || icons[0];
      div.innerHTML = `<div class="icon">${icon}</div><div>${item.name}</div>`;
      div.onclick = () => window.open(item.url, '_blank');
      el.appendChild(div);
    });
  }
  renderList('navContainer', navList);
  renderList('scriptContainer', scriptList);
  renderList('toolContainer', toolList);
  renderList('imgContainer', imgList);
  renderList('videoContainer', videoList);
  renderList('musicContainer', musicList);
  // 登录
  function tryLogin() {
    const u = document.getElementById('user').value.trim();
    const p = document.getElementById('pwd').value.trim();
    if (u === ADMIN_USER && p === ADMIN_PASS) {
      sessionStorage.setItem('loginType', 'admin');
      document.body.classList.remove('guest');
      document.getElementById('loginMask').style.display = 'none';
      // 仅修改：管理员登录显示admin.png
      document.getElementById('avatarImg').src = '../image/face/admin.png';
    } else {
      document.getElementById('errTip').style.display = 'block';
    }
  }
  function guestLogin() {
    const val = document.getElementById('inviteCodeInput').value.trim();
    if (val === INVITE_CODE) {
      sessionStorage.setItem('loginType', 'guest');
      document.body.classList.add('guest');
      document.getElementById('loginMask').style.display = 'none';
      // 仅添加：游客登录显示guest.png
      document.getElementById('avatarImg').src = '../image/face/guest.png';
    } else {
      document.getElementById('guestErrTip').style.display = 'block';
    }
  }
  function logout() {
    sessionStorage.removeItem('loginType');
    location.reload();
  }

  // 自动恢复登录状态
  (function() {
    // 恢复登录
    const savedLogin = sessionStorage.getItem('loginType');
    if (savedLogin === 'admin') {
      document.body.classList.remove('guest');
      document.getElementById('loginMask').style.display = 'none';
      document.getElementById('avatarImg').src = '../image/face/admin.png';
    } else if (savedLogin === 'guest') {
      document.body.classList.add('guest');
      document.getElementById('loginMask').style.display = 'none';
      document.getElementById('avatarImg').src = '../image/face/guest.png';
    }

    // 恢复选项卡
    const lastTab = sessionStorage.getItem('currentTab');
    if (lastTab) {
      switchTab(lastTab);
    }
  })();
  function switchTab(tab) {
    sessionStorage.setItem('currentTab', tab); // 保存当前选项卡
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    
    // 找到对应的 tab 按钮并激活
    const tabBtn = document.querySelector(`.tab[onclick="switchTab('${tab}')"]`);
    if (tabBtn) tabBtn.classList.add('active');
    
    document.getElementById(tab).classList.add('active');
  }
  // 隐藏F12 Source面板的文件/目录结构
  history.replaceState({}, document.title, window.location.pathname);
  document.write = function(){};
  window.__webpack_public_path__ = '';