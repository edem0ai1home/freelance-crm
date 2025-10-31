// Загружаем клиентов при запуске
document.addEventListener('DOMContentLoaded', function () {
  loadClients();
});

// Функция добавления клиента
function addClient() {
  const input = document.getElementById('clientName') as HTMLInputElement;
  const name = input.value.trim();

  if (name === '') {
    alert('Введите имя клиента');
    return;
  }

  // Добавляем в список
  const list = document.getElementById('clientList');
  const li = document.createElement('li');
  li.textContent = name;
  list?.appendChild(li);

  // Сохраняем в localStorage
  saveClient(name);

  // Очищаем поле
  input.value = '';
  input.focus();
}

// Сохранить клиента
function saveClient(name: string) {
  let clients = getClients();
  clients.push(name);
  localStorage.setItem('clients', JSON.stringify(clients));
}

// Загрузить клиентов
function getClients(): string[] {
  const data = localStorage.getItem('clients');
  return data ? JSON.parse(data) : [];
}

// Отобразить сохранённых клиентов
function loadClients() {
  const list = document.getElementById('clientList');
  const clients = getClients();

  clients.forEach(name => {
    const li = document.createElement('li');
    li.textContent = name;
    list?.appendChild(li);
  });
}