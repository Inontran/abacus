# abacus
Слайдер (ползунок) из четвертого задания программы обучения для Metalamp (FSD).

Демо-страница: [https://inontran.github.io/abacus/](https://inontran.github.io/abacus/).

Структура TS-кода:
![uml/uml.svg](https://inontran.github.io/abacus/uml/uml.svg?v=2)

Для работы с проектом необходим NPM.

### Описание команд
Клонирование проекта по SSH:
```
git clone git@github.com:Inontran/abacus.git
```

Клонирование проекта по HTTPS:
```
git clone https://github.com/Inontran/abacus.git
```

Установка проекта:
```
npm install
```

Запуск тестов:
```
npm run test
```

Сборка проекта в режиме разработки:
```
npm run dev
```

Сборка проекта для продакшена:
```
npm run build
```

Собирать проект в режиме разработки и следить за изменениями в файлах исходного кода:
```
npm run watch
```

Собирать проект в режиме разработки и запустить его в dev-server:
```
npm run start
```

Получить документацию из комментариев формата JSDoc:
```
npm run doc:build
```

Проверка js/ts кода с помощью eslint:
```
npm run eslint
```

Вывод в консоль конфигурацию eslint:
```
npm run eslint:dump
```

Исправление js/ts кода с помощью eslint:
```
npm run eslint:fix
```

Проверка стилей с помощью stylelint:
```
npm run stylelint
```

Исправление простых ошибок в стилях с помощью stylelint:
```
npm run stylelint:fix
```

Загрузить демо-страницу на GitHub Pages:
```
npm run gh-deploy
```