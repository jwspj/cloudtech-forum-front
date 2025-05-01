window.onload = function() {
    fetch(BASE_URL + '/posts')
      .then(response => response.json())
      .then(data => populateList(data))
      .catch(error => console.error('取得エラー:', error));
  };
  
  function populateList(data) {
    const listContainer = document.getElementById('contentList');
    listContainer.innerHTML = '';
  
    data.forEach(item => {
      const itemDiv = document.createElement('div');
      itemDiv.className = 'content-item';
  
      const updated = document.createElement('div');
      updated.className = 'updated-at';
      updated.textContent = `更新: ${item.updated_at || '不明'}`;
      itemDiv.appendChild(updated);
  
      const profileRow = document.createElement('div');
      profileRow.className = 'profile-row';
  
      const profileImg = document.createElement('img');
      profileImg.src = 'image.jpg';
      profileImg.alt = 'プロフィール画像';
      profileImg.className = 'profile-image';
  
      const label = document.createElement('span');
      label.className = 'content-label';
      label.textContent = 'テストユーザ';
  
      profileRow.appendChild(profileImg);
      profileRow.appendChild(label);
      itemDiv.appendChild(profileRow);
  
      const content = document.createElement('div');
      content.className = 'content-text';
      content.textContent = item.content;
      itemDiv.appendChild(content);
  
      const actionLinks = document.createElement('div');
      actionLinks.className = 'action-links';
  
      const editLink = document.createElement('a');
      editLink.textContent = '編集';
      editLink.onclick = () => {
        window.location.href = `detail.html?id=${item.id}`;
      };
  
      const deleteLink = document.createElement('a');
      deleteLink.textContent = '削除';
      deleteLink.onclick = () => {
        if (confirm('本当に削除しますか？')) {
          fetch(`${BASE_URL}/posts/${item.id}`, {
            method: 'DELETE'
          })
          .then(response => {
            if (response.ok) {
              location.reload();
            } else {
              alert('削除に失敗しました');
            }
          })
          .catch(error => {
            console.error('削除エラー:', error);
            alert('削除に失敗しました');
          });
        }
      };

      const LikeLink = document.createElement('a');
      LikeLink.textContent = 'いいね';
  
      actionLinks.appendChild(editLink);
      actionLinks.appendChild(deleteLink);
      actionLinks.appendChild(LikeLink);
      itemDiv.appendChild(actionLinks);
  
      listContainer.appendChild(itemDiv);
    });
  }
  
  function createContent() {
    const content = document.getElementById('newContent').value.trim();
    if (!content) {
      alert('コンテンツを入力してください');
      return;
    }
  
    fetch(BASE_URL + '/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ Content: content })
    })
    .then(response => {
      if (response.ok) {
        location.reload();
      } else {
        alert('登録失敗');
      }
    })
    .catch(error => console.error('登録エラー:', error));
  }
  