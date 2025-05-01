const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

window.onload = function () {
  if (!id) {
    alert('IDが見つかりません');
    window.location.href = 'index.html';
    return;
  }

  fetch(`${BASE_URL}/posts/${id}`)
    .then(response => response.json())
    .then(data => {
      document.getElementById('id').textContent = data.id;
      document.getElementById('userId').textContent = data.user_id;
      document.getElementById('createdAt').textContent = data.created_at;
      document.getElementById('updatedAt').textContent = data.updated_at;
      document.getElementById('contentAfter').value = data.content;
    })
    .catch(error => {
      console.error('詳細取得エラー:', error);
      alert('データ取得エラー');
      window.location.href = 'index.html';
    });
};

function goBack() {
  window.location.href = 'index.html';
}

function updateContent() {
  const updatedContent = document.getElementById('contentAfter').value.trim();

  if (!updatedContent) {
    alert('修正後の内容を入力してください');
    return;
  }

  fetch(`${BASE_URL}/posts/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ Content: updatedContent })
  })
    .then(response => {
      if (response.ok) {
        alert('更新成功');
        window.location.href = 'index.html';
      } else {
        alert('更新失敗');
      }
    })
    .catch(error => console.error('更新エラー:', error));
}
