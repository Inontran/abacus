/**
 * Класс View реализует "Представление" или "Вид" паттерна проектирования MVP.
 * Соответственно, он отвечает за отрисовку интерфейса плагина, получение данных от пользователя и отображение данных,
 * находящихся в Модели.
 */
export declare class View {
    /**
     * Ссылка на Представителя, который связывает объект класса View с объектом класса Model
     * по паттерну проектирования MVP.
     * @type  {Presenter}
     * @private
     */
    private _presenter;
    /**
     * Объект, в котором содержится ссылка на корневой HTML-элемент плагина с дополнительными свойствами.
     * @type {WidgetContainer}
     * @private
     */
    private _widgetContainer;
    /**
     * Объект, в котором содержится ссылка на HTML-элемент индикатора (progress bar) с дополнительными свойствами.
     * @type {Range}
     * @private
     */
    private _range;
    /**
     * Массив, в котором содержатся объекты ручек (Handle) слайдера.
     * @type {Handle[]}
     * @private
     */
    private _handles;
    /**
     * Массив, в котором содержатся объекты подсказок (Tooltip) слайдера.
     * @type {Tooltip[]}
     * @private
     */
    private _tooltips;
    /**
     * Объект события изменения значения слайдера, как у браузерных полей ввода "input".
     * @type {CustomEvent}
     * @private
     */
    private _customEventChange;
    /**
     * Объект события инициализации плагина.
     * @type {CustomEvent}
     * @private
     */
    private _customEventCreate;
    /**
     * Объект события процесса перемещения бегунка.
     * @type {CustomEvent}
     * @private
     */
    private _customEventSlide;
    /**
     * Объект события начала перемещения бегунка.
     * @type {CustomEvent}
     * @private
     */
    private _customEventStart;
    /**
     * Объект события окончания перемещения бегунка.
     * @type {CustomEvent}
     * @private
     */
    private _customEventStop;
    /**
     * Включен или выключен слайдер. Если равен false, то включен.
     * @type {boolean}
     * @private
     */
    private _isDisabled;
    /**
     * Перемещается ли бегунок в данный момент с помощью мыши.
     * @type {boolean}
     * @private
     */
    private _isDragHandle;
    /**
     * Таймер перемещения мыши или пальца на экране.
     * @type {null | NodeJS.Timeout}
     * @private
     */
    private _handleMovingTimer;
    /**
     * Коллекция меток разметки слайдера.
     */
    private _mapScale;
    /**
     * Кэш свойств сладйера из Модели.
     */
    private _cachedAbacusProperty;
    /**
     * Если значение равно "true", то значит слайдер находиться в вертикальном состоянии.
     */
    private _isVertical;
    private _currentHandle;
    /**
     * @constructor
     * @this   {View}
     * @param  {HTMLAbacusElement} abacusHtmlContainer HTML-элемент,
     * в котором будет находиться инициализированный плагин.
     * @param  {AbacusOptions} options Параметры настройки плагина.
     * @param  {object} data Другие данные.
     */
    constructor(abacusHtmlContainer: HTMLAbacusElement, options?: AbacusOptions, data?: object);
    /**
     * Функция, которая получает на входе координату клика по оси Х относительно окна браузера,
     * а возвращает количество процентов от начала (левого края) слайдера.
     * @param {number} coordXY Координата клика по оси Х относительно окна браузера.
     * @returns {number} Количество процентов от начала (левого края) слайдера.
     */
    getPosPercent(coordXY: number): number;
    /**
     * Функция, которая получает на вход процент от начала слайдера,
     * а возвращает соответствующее значение кратно заданному шагу.
     * @deprecated
     * @param {number} percent Позиция бегунка в процентах от начала слайдера.
     * @returns {number} Значение, соответствующее проценту и кратно шагу.
     */
    getPosPerStep(percent: number): number;
    /**
     * Функция, которая вычисляет позицию бегунка в процентах от начала слайдера.
     * @param {number} value Значение слайдера.
     * @returns {number} Позиция бегунка в процентах от начала слайдера.
     */
    getPosFromValue(value: number): number;
    /**
     * Функция, которая получает на вход процент от начала слайдера,
     * а возвращает соответствующее значение.
     * @param {number} posPercent Позиция бегунка в процентах от начала слайдера.
     * @returns {number} Значение слайдера.
     */
    getValFromPosPercent(posPercent: number): number;
    /**
     * Функция получения и установки свойств слайдера.
     * @param {string} optionName Название свойства, значение которого надо получить или изменить.
     * @param {any} value Значение свойства.
     * @returns {AbacusOptions | number | string | number[] | boolean | null | AbacusClasses | undefined}
     */
    option(optionName?: string, value?: any): AbacusOptions | number | string | number[] | boolean | null | AbacusClasses | undefined;
    /**
     * Функция обновления Вида плагина (в том числе пользовательского интерфейса).
     */
    updateView(): void;
    /**
     * Функция создания или удаления ручек слайдера.
     * @private
     * @param {AbacusOptions} abacusProperty Свойства плагина.
     */
    private _createViewHandles;
    /**
     * Функция обновления ручек слайдера, а именно их местоположение.
     * @private
     * @param {AbacusOptions} abacusProperty Свойства плагина.
     */
    private _updateViewHandles;
    /**
     * Функция создания или удаления подсказок слайдера.
     * @private
     * @param {AbacusOptions} abacusProperty Свойства плагина.
     */
    private _createViewTooltips;
    /**
     * Функция обновления подсказок слайдера, а именно местоположение и текст.
     * @private
     * @param {AbacusOptions} abacusProperty Свойства плагина.
     */
    private _updateViewTooltips;
    /**
     * Функция создания или удаления индикатора (progress bar) слайдера.
     * @private
     * @param {AbacusOptions} abacusProperty Свойства плагина.
     */
    private _createViewRange;
    /**
     * Функция обновления индикатора (progress bar) слайдера, а именно местоположение и размер.
     * @private
     * @param {AbacusOptions} abacusProperty Свойства плагина.
     */
    private _updateViewRange;
    /**
     * Функция обновления индикатора (progress bar) слайдера, а именно местоположение и размер.
     * @private
     * @param {AbacusOptions} abacusProperty Свойства плагина.
     */
    private _updateClassNames;
    /**
     * Функция переключает состояние слайдера с активного на неактивный и обратно.
     * @param {boolean} off "true" значит отключить. "false" значит активировать.
     */
    toggleDisable(off?: boolean): void;
    /**
     * Функция упаковывает в объект некоторые данные о слайдере и бегунке для обработчиков событий.
     * @private
     * @returns {EventUIData} Объект класса EventUIData.
     */
    private _getEventUIData;
    /**
     * Функция-обертка события "abacus-change". Генерирует событие "abacus-change" и вызывает callback "change".
     * @private
     * @param {Event} event Объект события. По умолчанию равен объекту события изменения значения слайдера.
     * @returns {boolean} Возвращаемое значение — false, если событие отменяемое и хотя бы один из обработчиков
     * этого события вызвал Event.preventDefault(). В ином случае — true.
     * (Точно также, как у функции EventTarget.dispatchEvent()).
     */
    private _eventChangeWrapper;
    /**
     * Функция-обертка события "abacus-create". Генерирует событие "abacus-create" и вызывает callback "create".
     * @private
     * @param {Event} event Объект события. По умолчанию равен объекту события инициализации плагина.
     * @returns {boolean} Возвращаемое значение — false, если событие отменяемое и хотя бы один из обработчиков
     * этого события вызвал Event.preventDefault().
     * В ином случае — true. (Точно также, как у функции EventTarget.dispatchEvent()).
     */
    private _eventCreateWrapper;
    /**
     * Функция-обертка события "abacus-slide". Генерирует событие "abacus-slide" и вызывает callback "slide".
     * @private
     * @param {Event} event Объект события. По умолчанию равен объекту события перемещения бегунка слайдера.
     * @returns {boolean} Возвращаемое значение — false, если событие отменяемое и хотя бы один из обработчиков
     * этого события вызвал Event.preventDefault().
     * В ином случае — true. (Точно также, как у функции EventTarget.dispatchEvent()).
     */
    private _eventSlideWrapper;
    /**
     * Функция-обертка события "abacus-start". Генерирует событие "abacus-start" и вызывает callback "start".
     * @private
     * @param {Event} event Объект события. По умолчанию равен объекту события начала перемещения бегунка слайдера.
     * @returns {boolean} Возвращаемое значение — false, если событие отменяемое и хотя бы один из обработчиков
     * этого события вызвал Event.preventDefault().
     * В ином случае — true. (Точно также, как у функции EventTarget.dispatchEvent()).
     */
    private _eventStartWrapper;
    /**
     * Функция-обертка события "abacus-stop". Генерирует событие "abacus-stop" и вызывает callback "stop".
     * @private
     * @param {Event} event Объект события. По умолчанию равен объекту события окончания перемещения бегунка слайдера.
     * @returns {boolean} Возвращаемое значение — false, если событие отменяемое и хотя бы один из обработчиков
     * этого события вызвал Event.preventDefault().
     * В ином случае — true. (Точно также, как у функции EventTarget.dispatchEvent()).
     */
    private _eventStopWrapper;
    /**
     * Функция, обрабатывающая позицию мыши или касания.
     * @deprecated
     * @private
     * @param {MouseEvent | TouchEvent} event Объект события мыши или касания.
     */
    private _mouseHandler;
    /**
     * Функция, которая вычисляет, какие значения были изменены, и передает их через Представителя в Модель.
     * @private
     * @param {number} valueUnrounded Значение, полученное из позиции клика мыши или касания.
     */
    private _calcHandleValues;
    /**
     * Установка обработчиков событий.
     * @private
     */
    private _bindEventListeners;
    /**
     * Обработчик клика по слайдеру. По клику перемещает ручку слайдера.
     * @private
     */
    private _handlerWidgetContainerClick;
    /**
     * Обработчик клика по ручке слайдера. Фиксирует нажатие на ручку и генерирует событие "start".
     * @private
     */
    private _handlerHandleItemClickStart;
    /**
     * Обработчик пересещения курсора или пальца по экрану.
     * Нужен для того, чтобы вычислить, куда переместить ручку слайдера. Генерирует событие "slide".
     * @private
     */
    private _handlerHandleItemClickMove;
    /**
     * Обработчик окончание пересещения курсора или пальца по экрану.
     * Генерирует событие "stop".
     * @private
     */
    private _handlerHandleItemClickStop;
    /**
     * Создает шкалу значений и добавляет ее в слайдер.
     * @private
     */
    private _createScale;
    /**
     * Удаляет шкалу значений.
     * @private
     */
    private _removeScale;
    /**
     * Функция удаления лишних меток на шкале значений для того, чтобы они не "слипались" друг с другом.
     * @private
     */
    private _thinOutScale;
    /**
     * Функция меняет состояния меток в шкале значений.
     * @private
     */
    private _highlightMarks;
    /**
     * Функция установки обработчиков на метки шкалы значений.
     * @private
     */
    private _bindEventListenersOnMarks;
    /**
     * Установка css-свойства "transition" элементам интерфейса слайдера.
     * Первоначальное значение береться из model.abacusProperty.aniamte.
     * @private
     */
    private _setTransition;
    private _getCloneAbacusProperty;
    private _findMovedHandle;
    /**
     * Функция получения количества знаков после запятой.
     * @static
     * @param {number} x Число, у которого надо узнать количество знаков после запятой.
     * @returns {number} Количество знаков после запятой.
     */
    static countNumAfterPoint(x: number): number;
    /**
     * Функция окргуления числа до того количества знаков после запятой, сколько этих знаков у числа fractionalNum.
     * @static
     * @param {number} value Число, которое надо округлить.
     * @param {number} fractionalNum Число, у которого надо узнать количество знаков после запятой.
     * @returns {number} Округленное число.
     */
    static round(value: number, fractionalNum: number): number;
    /**
     * Функция сравнения двух массивов с произвольними примитивными значениями.
     * @static
     * @param {Array<any>} a Массив
     * @param {Array<any>} b Массив
     * @returns {boolean} Возвращает "true" если массивы одинаковые. Иначе "false".
     */
    static arrayCompare(a?: Array<any>, b?: Array<any>): boolean;
}
