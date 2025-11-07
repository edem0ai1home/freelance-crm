import json

# Вставьте сюда данные из localStorage
data = '[{"name":"ваня","status":"в_работе","date":"04.11.2025"},{"name":"даня","status":"ожидает_оплаты","date":"04.11.2025"},{"name":"сергей","status":"завершён","date":"04.11.2025"}]'
clients = json.loads(data)

# Сохраняем в JSON
with open('clients.json', 'w', encoding='utf-8') as f:
    json.dump(clients, f, ensure_ascii=False, indent=2)

# Или в CSV
import csv
with open('clients.csv', 'w', encoding='utf-8', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=['name', 'status', 'date'])
    writer.writeheader()
    writer.writerows(clients)