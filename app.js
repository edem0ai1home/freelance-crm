"use strict";
// Загружаем клиентов при запуске
document.addEventListener('DOMContentLoaded', function () {
    loadClients();
});
// Функция добавления клиента
function addClient() {
    const input = document.getElementById('name');
    const name = input.value.trim();
    if (!name) {
        alert('Введите имя клиента');
        return;
    }
    // Текущая дата
    const now = new Date();
    const dateStr = now.toLocaleDateString('ru-RU'); // Например: 03.11.2025
    // Создаём объект клиента
    const client = {
        name: name,
        status: 'в_работе',
        date: dateStr
    };
    // Сохраняем в localStorage
    saveClient(client);
    // Добавляем в список на странице
    addClientToList(client);
    // Очищаем поле ввода
    input.value = '';
    input.focus();
}
// Фильтрация клиентов
function filterClients() {
    const filter = document.getElementById('statusFilter').value;
    const list = document.getElementById('list');
    list === null || list === void 0 ? void 0 : list.replaceChildren(); // Очищаем список
    const clients = getClients();
    const filtered = filter === 'all' ? clients : clients.filter(c => c.status === filter);
    filtered.forEach(addClientToList);
}
// Поиск по имени
function searchClients() {
    const input = document.getElementById('name');
    const query = input.value.trim().toLowerCase();
    const filter = document.getElementById('statusFilter').value;
    const list = document.getElementById('list');
    list === null || list === void 0 ? void 0 : list.replaceChildren();
    const clients = getClients();
    const filtered = clients.filter(c => c.name.toLowerCase().includes(query));
    const final = filter === 'all' ? filtered : filtered.filter(c => c.status === filter);
    final.forEach(addClientToList);
}
// Добавляем клиента в DOM
function addClientToList(client) {
    const list = document.getElementById('list');
    const li = document.createElement('li');
    li.className = 'client-item';
    li.innerHTML = `
    <span><strong>${client.name}</strong> | ${client.date}</span>
    <select onchange="updateStatus(this)" data-name="${client.name}">
      <option value="в_работе" ${client.status === 'в_работе' ? 'selected' : ''}>В работе</option>
      <option value="ожидает_оплаты" ${client.status === 'ожидает_оплаты' ? 'selected' : ''}>Ожидает оплаты</option>
      <option value="завершён" ${client.status === 'завершён' ? 'selected' : ''}>Завершён</option>
    </select>
    <button onclick="removeClient(this)">Удалить</button>
  `;
    list === null || list === void 0 ? void 0 : list.appendChild(li);
}
// Сохранить клиента в хранилище
function saveClient(client) {
    const clients = getClients();
    clients.push(client);
    localStorage.setItem('clients', JSON.stringify(clients));
}
// Получить всех клиентов из localStorage
function getClients() {
    const data = localStorage.getItem('clients');
    return data ? JSON.parse(data) : [];
}
// Загрузить и отобразить всех клиентов
function loadClients() {
    const clients = getClients();
    clients.forEach(addClientToList);
}
// Обновление статуса
function updateStatus(select) {
    const name = select.getAttribute('data-name');
    const newStatus = select.value;
    const clients = getClients();
    const updated = clients.map(c => c.name === name ? Object.assign(Object.assign({}, c), { status: newStatus }) : c);
    localStorage.setItem('clients', JSON.stringify(updated));
}
// Удаление клиента
function removeClient(button) {
    const li = button.parentElement;
    const span = li === null || li === void 0 ? void 0 : li.querySelector('span');
    const text = (span === null || span === void 0 ? void 0 : span.textContent) || '';
    const name = text.split('|')[0].trim(); // Извлекаем имя
    const clients = getClients().filter(c => c.name !== name);
    localStorage.setItem('clients', JSON.stringify(clients));
    li === null || li === void 0 ? void 0 : li.remove();
}
// Экспорт в CSV
function exportToCSV() {
    const clients = getClients();
    const headers = ['Имя,Статус,Дата'];
    const rows = clients.map(c => `"${c.name}","${c.status}","${c.date}"`);
    const csv = [...headers, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `clients_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
console.log("работаешь?");
