import { WidgetContainer } from './WidgetContainer';
import { Handle } from './Handle';
import { Range } from './Range';
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
     * Объект, в котором содержится ссылка на HTML-элемент бегунка с дополнительными свойствами.
     * @type {Handle}
     * @private
     */
    private _handleItem;
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
     * @constructor
     * @this   {View}
     * @param  {HTMLAbacusElement} abacusHtmlContainer - HTML-элемент, в котором будет находиться инициализированный плагин.
     * @param  {AbacusOptions} options - Параметры настройки плагина.
     * @param  {object} data - Другие данные.
     */
    constructor(abacusHtmlContainer: HTMLAbacusElement, options?: AbacusOptions, data?: object);
    /**
     * Геттер (функция получения) ссылки объекта-обертки HTML-элемента контейнера плагина.
     * @public
     * @returns {WidgetContainer} Возвращает ссылку на объект-обертку HTML-элемента контейнера плагина.
     */
    get widgetContainer(): WidgetContainer;
    /**
     * Геттер (функция получения) ссылки объекта-обертки HTML-элемента индикатора (progress bar).
     * @public
     * @returns {Range} Возвращает ссылку на объект-обертку HTML-элемента индикатора (progress bar).
     */
    get range(): Range;
    /**
     * Геттер (функция получения) ссылки объекта-обертки HTML-элемента бегунка.
     * @public
     * @returns {Handle} Возвращает ссылку на объект-обертку HTML-элемента бегунка.
     */
    get handleItem(): Handle;
    /**
     * Функция, которая получает на входе координату клика по оси Х относительно окна браузера,
     * а возвращает количество процентов от начала (левого края) слайдера.
     * @param {number} clientX - Координата клика по оси Х относительно окна браузера.
     * @returns {number} - Количество процентов от начала (левого края) слайдера.
     */
    getPosLeftPercent(clientX: number): number;
    /**
     * Функция, которая получает на вход процент от начала слайдера,
     * а возвращает соответствующее значение кратно заданному шагу.
     * @deprecated
     * @param {number} percent - Позиция бегунка в процентах от начала слайдера.
     * @returns {number} Значение, соответствующее проценту и кратно шагу.
     */
    getPosPerStep(percent: number): number;
    /**
     * Функция, которая вычисляет позицию бегунка в процентах от начала слайдера.
     * @param {number} value - Значение слайдера.
     * @returns {number} Позиция бегунка в процентах от начала слайдера.
     */
    getPosFromValue(value: number): number;
    /**
     * Функция, которая получает на вход процент от начала слайдера,
     * а возвращает соответствующее значение.
     * @param {number} posPercent - Позиция бегунка в процентах от начала слайдера.
     * @returns {number} - Значение слайдера.
     */
    getValFromPosPercent(posPercent: number): number;
    /**
     * Функция получения и установки свойств слайдера.
     * @param {AbacusOptions | string} optionName -
     * @param {any} value -
     * @returns {}
     */
    option(optionName?: string, value?: AbacusOptions | any): any;
    /**
     * Функция обновления Вида плагина (в том числе пользовательского интерфейса).
     * @returns
     */
    updateView(): void;
    toggleDisable(off?: boolean): void;
    /**
     * Функция упаковывает в объект некоторые данные о слайдере и бегунке для обработчиков событий.
     * @private
     * @returns {EventUIData} - Объект класса EventUIData.
     */
    private _getEventUIData;
    /**
     * Функция-обертка события "abacus-change". Генерирует событие "abacus-change" и вызывает callback "change".
     * @private
     * @param {Event} event - Объект события. По умолчанию равен объекту события изменения значения слайдера.
     * @returns {boolean} - Возвращаемое значение — false, если событие отменяемое и хотя бы один из обработчиков этого события вызвал Event.preventDefault(). В ином случае — true. (Точно также, как у функции EventTarget.dispatchEvent()).
     */
    private _eventChangeWrapper;
    /**
     * Функция-обертка события "abacus-create". Генерирует событие "abacus-create" и вызывает callback "create".
     * @private
     * @param {Event} event - Объект события. По умолчанию равен объекту события инициализации плагина.
     * @returns {boolean} - Возвращаемое значение — false, если событие отменяемое и хотя бы один из обработчиков этого события вызвал Event.preventDefault(). В ином случае — true. (Точно также, как у функции EventTarget.dispatchEvent()).
     */
    private _eventCreateWrapper;
    /**
     * Функция-обертка события "abacus-slide". Генерирует событие "abacus-slide" и вызывает callback "slide".
     * @private
     * @param {Event} event - Объект события. По умолчанию равен объекту события перемещения бегунка слайдера.
     * @returns {boolean} - Возвращаемое значение — false, если событие отменяемое и хотя бы один из обработчиков этого события вызвал Event.preventDefault(). В ином случае — true. (Точно также, как у функции EventTarget.dispatchEvent()).
     */
    private _eventSlideWrapper;
    /**
     * Функция-обертка события "abacus-start". Генерирует событие "abacus-start" и вызывает callback "start".
     * @private
     * @param {Event} event - Объект события. По умолчанию равен объекту события начала перемещения бегунка слайдера.
     * @returns {boolean} - Возвращаемое значение — false, если событие отменяемое и хотя бы один из обработчиков этого события вызвал Event.preventDefault(). В ином случае — true. (Точно также, как у функции EventTarget.dispatchEvent()).
     */
    private _eventStartWrapper;
    /**
     * Функция-обертка события "abacus-stop". Генерирует событие "abacus-stop" и вызывает callback "stop".
     * @private
     * @param {Event} event - Объект события. По умолчанию равен объекту события окончания перемещения бегунка слайдера.
     * @returns {boolean} - Возвращаемое значение — false, если событие отменяемое и хотя бы один из обработчиков этого события вызвал Event.preventDefault(). В ином случае — true. (Точно также, как у функции EventTarget.dispatchEvent()).
     */
    private _eventStopWrapper;
    /**
     * Функция, обрабатывающая позицию мыши.
     * @param {MouseEvent} event - Объект события мыши.
     */
    private _mouseHandler;
    /**
     * Установка обработчиков событий.
     */
    private _bindEventListeners;
    private _handlerWidgetContainerClick;
    private _handlerHandleItemClickStart;
    private _handlerHandleItemClickMove;
    private _handlerHandleItemClickStop;
}
