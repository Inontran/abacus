# abacus
Слайдер (ползунок) из четвертого задания программы обучения для Metalamp (FSD). Реализован в виде jQuery-плагина, поэтому для работы его работы необходима библиотека [jQuery](https://jquery.com/) версии не ниже 1.9.1.

[Демо-страница](https://inontran.github.io/abacus/).

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

## Подключение плагина
```
<!-- Сначала на странице должен быть подключен jQuery -->
<script src="/path/to/jquery/jquery.js"></script>

<!-- Затем подключается файл с плагином -->
<script src="/path/to/plugin/abacus.js"></script>

<!-- А потом уже пользовательский скрипт, который инициализирует слайдер -->
<script>
  $('#example-wrapper').abacus();
</script>
```

P.S. Да-да, это old school, но куда деваться)

***

## Примеры инициализации плагина.
Слайдер с параметрами по умолчанию:
```
$('#example-wrapper').abacus();
```

Слайдер с пользовательским шагом изменения значения:
```
$('#example-wrapper').abacus({
  step: 10
});
```

Слайдер с двумя ручками, задающие интервал значений, и элементом-индикатором между ними:
```
$('#example-wrapper').abacus({
  range: true,
  values: [0, 100]
});
```

Слайдер с вертикальной ориентацией:
```
$('#example-wrapper').abacus({
  orientation: 'vertical'
});
```

Другие параметры слайдера можно изучить в документации.

***

## API
[Документация](https://inontran.github.io/abacus/docs).  

| [Опции](https://inontran.github.io/abacus/docs/interfaces/utils_abacusoptions.abacusoptions.html)                    | [Методы](#methods)                     | [События](https://inontran.github.io/abacus/docs/interfaces/utils_abacusoptions.abacusoptions.html)        |
|:-------------------------------------------------------------------------------------------------------------------- |:-----------------------------          |:---------------------------------------------------------------------------------------------------------- |
| [animate](https://inontran.github.io/abacus/docs/interfaces/utils_abacusoptions.abacusoptions.html#animate)          | [destroy](#method-destroy)             | [change](https://inontran.github.io/abacus/docs/interfaces/utils_abacusoptions.abacusoptions.html#change)  |
| [classes](https://inontran.github.io/abacus/docs/interfaces/utils_abacusoptions.abacusoptions.html#classes)          | [getWidget](#method-getWidget)         | [create](https://inontran.github.io/abacus/docs/interfaces/utils_abacusoptions.abacusoptions.html#create)  |
| [disabled](https://inontran.github.io/abacus/docs/interfaces/utils_abacusoptions.abacusoptions.html#disabled)        | [getProperties](#method-getProperties) | [slide](https://inontran.github.io/abacus/docs/interfaces/utils_abacusoptions.abacusoptions.html#slide)    |
| [max](https://inontran.github.io/abacus/docs/interfaces/utils_abacusoptions.abacusoptions.html#max)                  | [setProperties](#method-setProperties) | [start](https://inontran.github.io/abacus/docs/interfaces/utils_abacusoptions.abacusoptions.html#start)    |
| [min](https://inontran.github.io/abacus/docs/interfaces/utils_abacusoptions.abacusoptions.html#min)                  |                                        | [stop](https://inontran.github.io/abacus/docs/interfaces/utils_abacusoptions.abacusoptions.html#stop)      |
| [orientation](https://inontran.github.io/abacus/docs/interfaces/utils_abacusoptions.abacusoptions.html#orientation)  | 
| [range](https://inontran.github.io/abacus/docs/interfaces/utils_abacusoptions.abacusoptions.html#range)              | 
| [scale](https://inontran.github.io/abacus/docs/interfaces/utils_abacusoptions.abacusoptions.html#scale)              | 
| [step](https://inontran.github.io/abacus/docs/interfaces/utils_abacusoptions.abacusoptions.html#step)
| [tooltip](https://inontran.github.io/abacus/docs/interfaces/utils_abacusoptions.abacusoptions.html#tooltip)
| [value](https://inontran.github.io/abacus/docs/interfaces/utils_abacusoptions.abacusoptions.html#value)
| [values](https://inontran.github.io/abacus/docs/interfaces/utils_abacusoptions.abacusoptions.html#values)


<div id="methods">

  ### Методы

</div>

***

<div id="method-destroy">

  #### destroy()

  Удаляет слайдер.  

  **Пример:**  
  Вызов метода ``destroy``:
  ```
  abacusInstance = $('#example-wrapper').data('abacus');
  abacusInstance.destroy();
  ```
</div>

***

<div id="method-getWidget">

  #### getWidget()

  Возвращает объект jQuery, содержащий слайдер.  
  **Возвращает:** ``HTMLElement``

  **Пример:**  
  Вызов метода ``getWidget``:
  ```
  abacusInstance = $('#example-wrapper').data('abacus');
  let widget = abacusInstance.getWidget();
  ```
</div>

***

<div id="method-getProperties">

  #### getProperties()

  Возвращает объект, содеражащий пары ключ-значение, в которых записаны свойства слайдера.  
  **Возвращает:** ``AbacusProperties``

  **Пример:**  
  Вызов метода ``getProperties``:
  ```
  abacusInstance = $('#example-wrapper').data('abacus');
  let props = abacusInstance.getProperties();
  ```
</div>

***

<div>

  #### getProperties(optionName)

  Возвращает значение свойства слайдера, название которого соответствует ``optionName``.   

  - **optionName**  
    Тип: ``string``  
    Название свойства, которое требуется получить.

  **Возвращает:** ``number`` или ``string`` или ``number[]`` или ``boolean`` или ``AbacusClasses`` или ``undefined``

  **Пример:**  
  Вызов метода ``getProperties``:
  ```
  abacusInstance = $('#example-wrapper').data('abacus');
  let animate = abacusInstance.getProperties('animate');
  ```
</div>

***

<div id="method-setProperties">

  #### setProperties(abacusOptions)

  Установка одного и более значений свойства слайдера.  

  - **abacusOptions**  
    Тип: ``AbacusOptions``  
    Объект, содержащий значения свойств в виде пар ключ-значение.  

  **Пример:**  
  Вызов метода ``setProperties``:
  ```
  abacusInstance = $('#example-wrapper').data('abacus');
  abacusInstance.setProperties({
    isDisabled: true,
  });
  ```
</div>

***

<div>

  #### setProperties(optionName, propValue)

  Установка значения свойства слайдера, название которого соответствует ``optionName``.  

  - **optionName**  
    Тип: ``string``  
    Название свойства, значение которого требуется обновить.  
  - **propValue**  
    Тип: ``number`` или ``string`` или ``number[]`` или ``boolean`` или ``AbacusClasses``  
    Значение, устанавливаемое для свойства.  

  **Пример кода:**  
  Вызов метода ``setProperties``:
  ```
  abacusInstance = $('#example-wrapper').data('abacus');
  abacusInstance.setProperties('isDisabled', true);
  ```
</div>

***

## Описание архитектуры слайдера

![uml/uml.svg](https://inontran.github.io/abacus/uml/uml.svg)

Слайдер разделен на слои по шаблону проектирования MVP.

Слой "Model" содержит свойства слайдера и методы для работы с этими данными.

Слой "View" занимается отрисовкой пользовательского интерфейса, реагирует на события, генерируемые пользователем. Также слой "View" поделен на подслои "subViews", которые хранят данные об элементах интерфейса слайдера.

Связующим звеном между слоями модели и отображения служит слой "Presenter". Он реагирует на сообщения от "View" и обновляет модель, и наоборот, реагирует на сообщения об обновлении модели и сообщает об этом "View", чтобы тот обновлялся.