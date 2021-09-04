# abacus
Слайдер (ползунок) из четвертого задания программы обучения для Metalamp (FSD).

Демо-страница: [https://inontran.github.io/abacus/](https://inontran.github.io/abacus/).

Документация: [https://inontran.github.io/abacus/docs](https://inontran.github.io/abacus/docs).

Структура TS-кода:
![uml/uml.svg](https://inontran.github.io/abacus/uml/uml.svg?v=2)

Для работы с проектом необходим NPM.


## Описание команд для работы с проектом
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

Загрузить демо-страницу на GitHub Pages (желательно перед этим сгенерировать документацию, а потом собрать проект):
```
npm run gh-deploy
```


## API
API данного слайдера делалось на основе слайдера из библеотеки jQuery UI. Поэтому в качестве дополнительного источника можно пользоваться [документацией](https://api.jqueryui.com/slider/) jQuery UI, но есть отличия.

| [Опции](#options)             | Методы        | События |
|:----------------------------- |:------------- |:------- |
| [animate](#option-animate)    | destroy       | change  |
| classes                       | disable       | create  |
| disabled                      | enebale       | slide   |
| max                           | instance      | start   |
| min                           | option        | stop    |
| orientation                   | value         |
| range                         | values        |
| scale                         | widget        |
| step                          | 
| tooltip                       | 
| value                         | 
| values                        | 


<div id="options">

  ### Опции

</div>

<div id="option-animate">

  #### animate

  **Тип**: ``string`` или ``number`` или ``boolean``  
  **Значение по-умолчанию**: ``false``  

  Следует ли плавно перемещать ручку, когда пользователь нажимает на дорожку ползунка. Также принимает любую допустимую продолжительность анимации.  
  **Поддерживается несколько типов данных:**

  - **boolean**: Если параметр равен ``true``, то элементы слайдера анимируются с продолжительностью в 400 мс.
  - **string**: Название продолжительности анимации. Принимает занчения ``fast``(200 мс) или ``slow``(600 мс).
  - **number**: Продолжительность анимации в миллисекундах.

</div>