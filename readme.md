# React Weather Widget 🌦

Інтерактивний віджет на **React + Webpack**, який визначає ваше місцезнаходження по IP (через Cloudflare Worker) та відображає поточну погоду.

---

## 🚀 Live Demo
[Відкрити демо на GitHub Pages](https://nikita-7onenko-dev.github.io/React-Weather-Widget/)

---

## 📸 Скріншоти

### Віджет у дії
![Скриншот 1](./screenshots/main-screen.png)

### Панель управління містами
![Скриншот 2](./screenshots/management-pane.png)

---

## 📌 Можливості
- Автоматичне визначення міста IP (без запиту дозволу геолокації)
- Отримання погодних даних із зовнішнього API
- Можливість додати кілька міст

---

## 🛠 Технологии
- **React**
- **Webpack**
- **JavaScript (ES6+)**
- **SCSS Modules**
- **Cloudflare Workers** (для отримання IP клиента)

---

## 📂 Встановлення та запуск локально

```bash
# Клонувати репозиторій
git clone (https://github.com/Nikita-7onenko-dev/React-Weather-Widget.git)

# Перейти до папки проекту
cd react-weather-widget

# Встановити залежності
npm install

# Запустити проект у режимі розробки
npm start

# Або зібрати проект для продакшену, і потім у папці dist запустити index.html 
npm run build:prod
