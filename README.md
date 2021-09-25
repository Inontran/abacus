# abacus
Слайдер (ползунок) из четвертого задания программы обучения для Metalamp (FSD). Реализован в виде jQuery-плагина, поэтому для работы его работы необходима библиотека [jQuery](https://jquery.com/) версии не ниже 1.9.1.

[Демо-страница](https://inontran.github.io/abacus/).

[Документация](https://inontran.github.io/abacus/docs).

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

***

## API
API данного слайдера делалось на основе слайдера из библеотеки jQuery UI.
Поэтому в качестве дополнительного источника можно пользоваться [документацией](https://api.jqueryui.com/slider/) jQuery UI, но есть отличия.

| [Опции](https://inontran.github.io/abacus/docs/interfaces/abacus_interfaces.abacusoptions.html)                    | [Методы](#methods)            | [События](https://inontran.github.io/abacus/docs/interfaces/abacus_interfaces.abacusoptions.html)        |
|:------------------------------------------------------------------------------------------------------------------ |:----------------------------- |:-------------------------------------------------------------------------------------------------------- |
| [animate](https://inontran.github.io/abacus/docs/interfaces/abacus_interfaces.abacusoptions.html#animate)          | [destroy](#method-destroy)    | [change](https://inontran.github.io/abacus/docs/interfaces/abacus_interfaces.abacusoptions.html#change)  |
| [classes](https://inontran.github.io/abacus/docs/interfaces/abacus_interfaces.abacusoptions.html#classes)          | [disable](#method-disable)    | [create](https://inontran.github.io/abacus/docs/interfaces/abacus_interfaces.abacusoptions.html#create)  |
| [disabled](https://inontran.github.io/abacus/docs/interfaces/abacus_interfaces.abacusoptions.html#disabled)        | [enable](#method-enable)      | [slide](https://inontran.github.io/abacus/docs/interfaces/abacus_interfaces.abacusoptions.html#slide)    |
| [max](https://inontran.github.io/abacus/docs/interfaces/abacus_interfaces.abacusoptions.html#max)                  | [instance](#method-instance)  | [start](https://inontran.github.io/abacus/docs/interfaces/abacus_interfaces.abacusoptions.html#start)    |
| [min](https://inontran.github.io/abacus/docs/interfaces/abacus_interfaces.abacusoptions.html#min)                  | [option](#method-option)      | [stop](https://inontran.github.io/abacus/docs/interfaces/abacus_interfaces.abacusoptions.html#stop)      |
| [orientation](https://inontran.github.io/abacus/docs/interfaces/abacus_interfaces.abacusoptions.html#orientation)  | [value](#method-value)
| [range](https://inontran.github.io/abacus/docs/interfaces/abacus_interfaces.abacusoptions.html#range)              | [values](#method-values)
| [scale](https://inontran.github.io/abacus/docs/interfaces/abacus_interfaces.abacusoptions.html#scale)              | [widget](#method-widget)
| [step](https://inontran.github.io/abacus/docs/interfaces/abacus_interfaces.abacusoptions.html#step)
| [tooltip](https://inontran.github.io/abacus/docs/interfaces/abacus_interfaces.abacusoptions.html#tooltip)
| [value](https://inontran.github.io/abacus/docs/interfaces/abacus_interfaces.abacusoptions.html#value)
| [values](https://inontran.github.io/abacus/docs/interfaces/abacus_interfaces.abacusoptions.html#values)


<div id="methods">

  ### Методы

</div>

***

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

***

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

***

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

***

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

***

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

***

<div>

  #### option(optionName)

  Возвращает значение свойства слайдера, название которого соответствует ``optionName``.  

  - **optionName**  
    Тип: ``string``  
    Название свойства, которое требуется получить.
  
  **Возвращает:** ``number`` или ``string`` или ``number[]`` или ``boolean`` или ``AbacusClasses`` или ``undefined``

  **Примеры кода:**  
  Вызов метода ``option``:
  ```
  let optionValue = $('.selector').abacus('option', 'disabled');
  ```
</div>

***

<div>

  #### option(optionName, value)

  Установка значения свойства слайдера, название которого соответствует ``optionName``.  

  - **optionName**  
    Тип: ``string``  
    Название свойства, значение которого требуется обновить.  
  - **value**  
    Тип: ``string``  
    Значение, устанавливаемое для свойства.  

  **Возвращает:** ``jQuery``

  **Примеры кода:**  
  Вызов метода ``option``:
  ```
  $('.selector').abacus('option', 'disabled', true);
  ```
</div>

***

<div>

  #### option(options)

  Установка одного и более значений свойства слайдера.  

  - **options**  
    Тип: ``Object``  
    Объект, содержащий значения свойств в виде пар ключ-значение.  

  **Возвращает:** ``jQuery``

  **Примеры кода:**  
  Вызов метода ``option``:
  ```
  $('.selector').abacus('option', {disabled: true});
  ```
</div>

***

<div id="method-value">

  #### value()

  Возвращает значение слайдера.  
  **Возвращает:** ``number``

  **Примеры кода:**  
  Вызов метода ``value``:
  ```
  let value = $('.selector').abacus('value');
  ```
</div>

***

<div>

  #### value(value)

  Устанавливает значение слайдера.  

  - **value**  
    Тип: ``number``  
    Значение для установки.  

  **Возвращает:** ``jQuery``

  **Примеры кода:**  
  Вызов метода ``value``:
  ```
  $('.selector').abacus('value', 55);
  ```
</div>

***

<div id="method-values">

  #### values()

  Возвращает значения всех ручек слайдера.  
  **Возвращает:** ``number[]``

  **Примеры кода:**  
  Вызов метода ``values``:
  ```
  let values = $('.selector').abacus('values');
  ```
</div>

***

<div>

  #### values(values)

  Устанавливает значения всех ручек слайдера.  

  - **values**  
    Тип: ``number[]``  
    Массив для установки значений ручек слайдера.  

  **Возвращает:** ``jQuery``

  **Примеры кода:**  
  Вызов метода ``values``:
  ```
  $('.selector').abacus('values', [10, 25]);
  ```
</div>

***

<div id="method-widget">

  #### widget()

  Возвращает объект jQuery, содержащий слайдер.  
  **Возвращает:** ``jQuery``

  **Примеры кода:**  
  Вызов метода ``widget``:
  ```
  let widget = $('.selector').abacus('widget');
  ```
</div>

***

## Описание архитектуры слайдера

![uml/uml.svg](https://inontran.github.io/abacus/uml/uml.svg)

Слайдер разделен на слои по шаблону проектирования MVP.

Слой "Model" содержит свойства слайдера и методы для работы с этими данными.

Слой "View" занимается отрисовкой пользовательского интерфейса, реагирует на события, генерируемые пользователем. Также слой "View" поделен на подслои "subViews", которые хранят данные об элементах интерфейса слайдера.

Связующим звеном между слоями модели и отображения служит слой "Presenter". Он реагирует на сообщения от "View" и обновляет модель, и наоборот, реагирует на сообщения об обновлении модели и сообщает об этом "View", чтобы тот обновлялся.