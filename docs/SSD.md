# System Specification Document (SSD)
## Project: Скарбничка (Expense Tracker)

### 1. System Architecture
Система побудована як **Single Page Application (SPA)** за архітектурою клієнт-сервер (де роль сервера виконує локальне сховище або майбутній REST API). Перемикання між екранами відбувається на стороні клієнта за допомогою кастомного History API роутера.

### 2. Technology Stack
- **Frontend:** HTML5, CSS3 (Glassmorphism UI, CSS Variables).
- **Logic:** Vanilla JavaScript (ES6+, Native ES Modules).
- **State Management:** Кастомний реактивний Store (на базі патерну Observer).
- **Storage:** Web Storage API (LocalStorage).

### 3. User Interfaces (UI)
Додаток складається з трьох основних екранів:
1. **Dashboard:** Головна панель з віджетом загального балансу та списком 3 останніх транзакцій.
2. **Transactions:** Форма додавання нової витрати (inputs: назва, сума, селект категорії) та повний список історії транзакцій з кнопками видалення.
3. **Settings:** Екран з інформацією про додаток та кнопкою "Очистити всі дані" (з підтвердженням дії).

### 4. Data Models
Основним об'єктом системи є `Transaction`. У форматі JSON він має таку структуру:

```json
{
  "id": 1683456789000,
  "text": "Кава",
  "amount": 65.00,
  "category": "Їжа",
  "date": "01.05.2026"
}
```

### 5. API Design (Planned)
В майбутньому планується міграція з `localStorage` на повноцінний бекенд. 
Специфікація API наведена у файлі `swagger.yaml` та включає два основних ендпоінти:
- `GET /api/transactions`
- `POST /api/transactions`
