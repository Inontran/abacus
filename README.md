# abacus
Слайдер (ползунок) из четвертого задания программы обучения для Metalamp (FSD). Реализован в виде jQuery-плагина, поэтому для работы его работы необходима библиотека [jQuery](https://jquery.com/) версии не ниже 1.9.1.

Демо-страница: [https://inontran.github.io/abacus/](https://inontran.github.io/abacus/).

Документация: [https://inontran.github.io/abacus/docs](https://inontran.github.io/abacus/docs).

Структура TS-кода:
![uml/uml.svg](https://inontran.github.io/abacus/uml/uml.svg?v=2)

Для работы с исходным кода проекта необходим NPM.


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
API данного слайдера делалось на основе слайдера из библеотеки jQuery UI.
Поэтому в качестве дополнительного источника можно пользоваться [документацией](https://api.jqueryui.com/slider/) jQuery UI, но есть отличия.

| [Опции](https://inontran.github.io/abacus/docs/interfaces/abacus_interfaces.abacusoptions.html)                    | [Методы](#methods)            | [События](https://inontran.github.io/abacus/docs/interfaces/abacus_interfaces.abacusoptions.html)        |
|:------------------------------------------------------------------------------------------------------------------ |:----------------------------- |:-------------------------------------------------------------------------------------------------------- |
| [animate](https://inontran.github.io/abacus/docs/interfaces/abacus_interfaces.abacusoptions.html#animate)          | [destroy](#method-destroy)    | [change](https://inontran.github.io/abacus/docs/interfaces/abacus_interfaces.abacusoptions.html#change)  |
| [classes](https://inontran.github.io/abacus/docs/interfaces/abacus_interfaces.abacusoptions.html#classes)          | disable                       | [create](https://inontran.github.io/abacus/docs/interfaces/abacus_interfaces.abacusoptions.html#create)  |
| [disabled](https://inontran.github.io/abacus/docs/interfaces/abacus_interfaces.abacusoptions.html#disabled)        | enable                        | [slide](https://inontran.github.io/abacus/docs/interfaces/abacus_interfaces.abacusoptions.html#slide)    |
| [max](https://inontran.github.io/abacus/docs/interfaces/abacus_interfaces.abacusoptions.html#max)                  | instance                      | [start](https://inontran.github.io/abacus/docs/interfaces/abacus_interfaces.abacusoptions.html#start)    |
| [min](https://inontran.github.io/abacus/docs/interfaces/abacus_interfaces.abacusoptions.html#min)                  | option                        | [stop](https://inontran.github.io/abacus/docs/interfaces/abacus_interfaces.abacusoptions.html#stop)      |
| [orientation](https://inontran.github.io/abacus/docs/interfaces/abacus_interfaces.abacusoptions.html#orientation)  | value                         |
| [range](https://inontran.github.io/abacus/docs/interfaces/abacus_interfaces.abacusoptions.html#range)              | values                        |
| [scale](https://inontran.github.io/abacus/docs/interfaces/abacus_interfaces.abacusoptions.html#scale)              | widget                        |
| [step](https://inontran.github.io/abacus/docs/interfaces/abacus_interfaces.abacusoptions.html#step)                | 
| [tooltip](https://inontran.github.io/abacus/docs/interfaces/abacus_interfaces.abacusoptions.html#tooltip)          | 
| [value](https://inontran.github.io/abacus/docs/interfaces/abacus_interfaces.abacusoptions.html#value)              | 
| [values](https://inontran.github.io/abacus/docs/interfaces/abacus_interfaces.abacusoptions.html#values)            | 


<div id="methods">

  ### Методы

</div>

<div id="method-destroy">

  #### destroy()

  Удаляет функционал слайдера. Возвращает элемент в состояние до инициализации.  
  **Возвращает:** ``jQuery``

  **Примеры кода:**  
  Вызов метода ``destroy``:
  ```
  $('.selector').abacus('destroy');
  ```
</div>

<div id="method-disable">

  #### disable()

  Отключает слайдер, как атрибут ``disabled`` поля ввода.  
  **Возвращает:** ``jQuery``

  **Примеры кода:**  
  Вызов метода ``disable``:
  ```
  $('.selector').abacus('disable');
  ```
</div>

<div id="method-enable">

  #### enable()

  Включает слайдер, возвращает его в активное состояние. Например, после применения метода ``disable``.  
  **Возвращает:** ``jQuery``

  **Примеры кода:**  
  Вызов метода ``enable``:
  ```
  $('.selector').abacus('enable');
  ```
</div>

<div id="method-instance">

  #### instance()

  Возвращает экземпляр объекта слайдера.  
  **Возвращает:** ``View``

  **Примеры кода:**  
  Вызов метода ``instance``:
  ```
  $('.selector').abacus('instance');
  ```
</div>

<div id="method-option">

  #### option()

  Возвращает объект, содеражащий пары ключ-значение, в которых записаны свойства слайдера.  
  **Возвращает:** ``AbacusProperty``

  **Примеры кода:**  
  Вызов метода ``option``:
  ```
  $('.selector').abacus('option');
  ```
</div>

<div>

  #### option(optionName)

  Возвращает значение свойства слайдера, название которого соответствует ``optionName``.  
  **Возвращает:** ``number`` или ``string`` или ``number[]`` или ``boolean`` или ``AbacusClasses`` или ``undefined``

  **Примеры кода:**  
  Вызов метода ``option``:
  ```
  $('.selector').abacus('option', 'disabled');
  ```
</div>