# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Архитектура 

  MVP (Model-View-Presenter)
  * Model: `Basket`, `Catalog`, `Order`, `Product`;
  * View: `Card`, `CardPreview`, `Basket`, `Page`, `DeliveryForm`, `ContactsForm`, `Success`;
  * Presenter: `index.ts`

Взаимодействия внутри приложения происходят через события с помощью EventEmitter. Модели инициализируют события, слушатели событий в основном коде выполняют передачу данных компонентам отображения, а также вычислениями между этой передачей, и еще они меняют значения в моделях.

## Базовые компоненты

## 1. EventEmitter

Этот класс управляет событиями в проекте. Он позволяет компонентам подписываться на конкретные события (`on`), 
генерировать события (`emit`) и устанавливать глобальные обработчики событий (`onAll`).

Это критически важно для облегчения коммуникации между различными частями системы, улучшая модульность и гибкость.

Вы можете найти реализацию класса `EventEmitter` в файле [Events.ts](src/components/base/Events.ts).

## 2. Api

Этот класс облегчает взаимодействие с внешними API, позволяя приложению отправлять HTTP-запросы, такие как `GET`, `POST`, `PUT` и `DELETE`. Он необходим для интеграции внешних сервисов и получения или изменения данных с удаленных серверов. Класс инкапсулирует общий функционал для выполнения HTTP-запросов, включая обработку ответов и установку параметров запроса. Он улучшает модульность и повторное использование, предоставляя централизованный механизм взаимодействия с API.

Вы можете найти реализацию класса `Api` в файле [Api.ts](src/components/base/Api.ts).

## 3. View<T>

Этот класс служит основной компонентой для элементов, отображаемых на странице. Он инкапсулирует общий функционал для управления HTML-элементами, такой как переключение классов, установка текстового содержимого, управление видимостью и рендеринг компонентов. Предоставляя централизованный интерфейс для этих операций, он способствует организации кода, повторному использованию и обслуживанию. Эта абстракция помогает разделить заботы в архитектуре приложения, облегчая управление пользовательским интерфейсом.

- `constructor(container: HTMLElement)` - конструктор класса, принимает элемент контейнера.

### Методы:

- `render(data?: T): HTMLElement` - рендерит компонент, используя переданные данные. Возвращает элемент контейнера компонента.
- `toggleClass(element: HTMLElement, className: string, force?: boolean)` - переключает указанный класс на заданном элементе.
- `setText(element: HTMLElement, value: unknown)` - устанавливает текстовое содержимое HTML-элемента.
- `setDisabled(element: HTMLElement, state: boolean)` - устанавливает состояние отключения заданного HTML-элемента.
- `setHidden(element: HTMLElement)` - устанавливает свойство display для заданного элемента в 'none', эффективно скрывая его.
- `setVisible(element: HTMLElement)` - устанавливает видимость заданного элемента.
- `setImage(element: HTMLImageElement, src: string, alt?: string)` - устанавливает источник и альтернативный текст для элемента HTML изображения.

### Поля:

- `container: HTMLElement` - элемент контейнера компонента.

Вы можете найти реализацию класса `View` в файле [View.ts](src/components/base/View.ts).

## 4. Model<T>

Класс `Model` служит абстрактным основным для управления данными приложения. Он инкапсулирует общий функционал для инициализации и обновления состояния модели, а также генерации событий для уведомления наблюдателей о изменениях в данных. Эта абстракция помогает структурировать уровень данных приложения и способствует разделению задач.

- `constructor(data: T, events: Events)` - конструктор класса, принимает данные и события для использования моделью.

### Методы:

- `emitChanges(event: string, payload?: object)` - генерирует событие с опциональной полезной нагрузкой.

Вы можете найти реализацию класса `Model` в файле [Model.ts](src/components/base/Model.ts).

## 5. Modal

Класс `Modal` расширяет класс `View` и представляет модальный компонент в интерфейсе приложения. Он инкапсулирует логику открытия и закрытия модального окна, а также рендеринга его содержимого на основе предоставленных данных.

- `constructor(container: HTMLElement, protected events: Events)` - конструктор класса, принимает элемент контейнера и события для использования моделью.

### Методы:

- сеттер `content(value: HTMLElement): void` - устанавливает контент.
- `open(): void` - открывает модальное окно.
- `close(): void` - закрывает модальное окно.
- `render(data: ModalProps): HTMLElement` - рендер модального окна.

### Поля:

- `protected _closeButton: HTMLButtonElement` - кнопка закрытия модального окна.
- `protected _content: HTMLElement` - содержимое модального окна.

Вы можете найти реализацию класса `Modal` в файле [Modal.ts](src/components/base/Modal.ts).

## 6. Form<T>

Класс `Form` расширяет класс `View` и представляет важный компонент для управления взаимодействиями с формами в интерфейсе приложения. Он обрабатывает рендеринг формы, валидацию ввода и обработку событий.

- `constructor(protected container: HTMLFormElement, protected events: Events)` - конструктор класса, принимает элемент контейнера для формы и события для использования моделью.

### Методы:

- `protected onChange(field: keyof T, value: string): void` - метод, который вызывается при изменении значения поля..
- сеттер `set valid(value: boolean): void` - устанавливает валидность формы.
- `set errors(value: string): void` - устанавливает ошибки формы.
- `render(state: T & FormProps)` - рендерит форму.

### Поля:

- `protected submitElement: HTMLButtonElement;` - элемент кнопки.
- `protected errorsElement: HTMLElement;` - элемент вывода ошибок.

Вы можете найти реализацию класса `Form` в файле [Form.ts](src/components/base/Form.ts).

## Модели

## 1. Корзина

Модель `Basket` отвечает за функциональность корзины в приложении. Она расширяет класс `Model`, специализируясь на управлении коллекциями продуктов.

Расширяет класс `Model` интерфейсом `Product[]`, обеспечивает хранение и представление данных.

- `constructor(events: Events)` - конструктор класса, принимает события для использования моделью, инициализирует пустой массив продуктов.

### Методы:

- `getProducts(): HTMLElement[]` - возвращает массив продуктов в корзине.
- `addProduct(product: HTMLElement): void` - добавляет продукт в корзину.
- `removeProduct(productId: number): void` - удаляет продукт из корзины по его идентификатору.
- `clear(): void` - очищает корзину, удаляя все продукты.
- `getTotalAmount(): number` - вычисляет общую сумму продуктов в корзине.
- `getProductIds(): number[]` - возвращает массив идентификаторов продуктов в корзине.
- `makeOrder(): void` - осуществляет оформление заказа.

### Поля:

- `products: Product[]` - массив продуктов в корзине.

Реализация модели `Basket` находится в файле [Basket.ts](src/components/model/Basket.ts).

## 2. Каталог

Модель `Catalog` представляет каталог продуктов в приложении. Она расширяет класс `Model`, специализируясь на управлении коллекциями продуктов.

Расширяет класс `Model` интерфейсом `Product[]`, обеспечивает хранение и представление данных.

- `constructor()` - конструктор класса, принимает события для использования моделью, инициализирует пустой массив продуктов.

### Методы:

- `setProducts(products: HTMLElement[]): void` - устанавливает продукты в каталоге.

### Поля:

- `products: Product[]` - массив продуктов в каталоге.

Эта модель служит репозиторием данных о продуктах в приложении, позволяя другим компонентам взаимодействовать с ними и отображать информацию о доступных продуктах.

Реализация модели `Catalog` находится в файле [Catalog.ts](src/components/model/Catalog.ts).

## 3. Заказ

Модель `Order` представляет собой заказ в приложении, включая детали, такие как контакты, информация о доставке и заказанные продукты. Она расширяет класс `Model`, специализируясь на управлении данными, связанными с заказом.

Расширяет класс `Model` интерфейсом `Order`, обеспечивает хранение и представление данных.

- `constructor(events: Events)` - конструктор класса, принимает события для использования моделью.

### Методы:

- `setDeliveryField(field: keyof OrderFormProps,value: OrderFormProps[keyof OrderFormProps]): void` - устанавливает поля доставки.
- `setContactsField(field: keyof OrderFormProps,value: OrderFormProps[keyof OrderFormProps]): void` - устанавливает поля контактов.
- `validateDelivery(): boolean` - проверяет данные о доставке на валидность.
- `validateContacts(): boolean` - проверяет данные о контактах на валидность.

### Поля:

- `order: Contacts & Delivery` - информация о доставке.
- `products: string[]` - IDs продуктов.
- `total: number` - общая сумма заказа.
- `formErrors: Partial<Record<keyof OrderProps, string>>` - ошибки формы.

Эта модель является важным компонентом для управления процессом создания заказа в приложении, обработки ввода пользователя и проверки деталей заказа перед его отправкой.

Реализация модели `Order` находится в файле [Order.ts](src/components/model/Order.ts).



## Вид

## 1. Корзина

Компонент `Basket` представляет визуальное отображение корзины покупок в интерфейсе приложения. Он расширяет класс `View` интерфейсом 
```typescript
interface BasketProps {
	products: HTMLElement[];
	totalAmount: number;
}
```
, специализируясь на отображении и управлении отображением информации о корзине.

- `constructor(container: HTMLElement, events: Events)` - конструктор класса, принимает события для использования моделью.

### Поля:

- `listElement: HTMLElement` - список продуктов.
- `totalAmountElement: HTMLElement` - стоимость всего заказа.
- `buttonElement: HTMLButtonElement` - кнопка создания заказа.

Методы:
- сеттер `products(products: HTMLElement[]): void` - устанавливает продукты (карточки) в корзине.
- сеттер `totalAmount(value: number): void` - обновляет отображаемую общую сумму.

Этот компонент играет ключевую роль в предоставлении пользователям визуального представления их корзины покупок, позволяя просматривать и взаимодействовать с содержимым корзины.

Реализация компонента `Basket` находится в файле [Basket.ts](src/components/view/Basket.ts).

## 2. Карточка

Компонент `Card` представляет визуальную карточку, отображающую информацию о продукте в интерфейсе приложения. Он расширяет класс `View`, специализируясь на отображении и управлении отображением информации о продукте.

- `constructor(block: string, container: HTMLElement, action?: { onClick: (event: MouseEvent) => void })` - конструктор класса, принимает название блока, контейнер и опциональный экшн.

### Поля:

- `titleElement: HTMLElement` - элемент заголовка карточки.
- `priceElement: HTMLElement` - элемент отображения цены продукта.
- `buttonElement?: HTMLButtonElement` - элемент кнопки, если предусмотрено действие.
- `descriptionElement?: HTMLElement` - элемент отображения описания продукта.
- `imageElement?: HTMLImageElement` - элемент отображения изображения продукта.
- `categoryElement?: HTMLElement` - элемент отображения категории продукта.

### Методы:

- сеттер `id(value: string): void` - устанавливает идентификатор продукта.
- сеттер `id(): string` - возвращает идентификатор продукта.
- сеттер `title(value: string): void` - устанавливает название продукта.
- геттер `title(): string` - возвращает название продукта.
- сеттер `price(value: number): void` - устанавливает цену продукта.
- сеттер `image(src: string): void` - устанавливает ссылку на изображение продукта.
- `getCategoryColorClassName(category: Categories): string` - возвращает название класса цвета для указанной категории.
- сеттер `category(category: Categories): void` - устанавливает категорию продукта.
- сеттер `description(value: string): void` - устанавливает описание продукта.

Этот компонент играет ключевую роль в предоставлении пользователям визуально привлекательного представления отдельных продуктов, позволяя просматривать детали продукта и, возможно, взаимодействовать с действиями продукта.

Реализация компонента `Card` находится в файле [Card.ts](src/components/view/Card.ts).


## 3. Предпросмотр карточки

Компонент `CardPreview` расширяет компонент `Card`, добавляя дополнительный функционал для предварительного просмотра карточки продукта в интерфейсе приложения. Он добавляет возможность переключать статус кнопки, указывающей, добавлен ли продукт в корзину.

При создании экземпляра компонента `CardPreview` он наследует свойства и методы от компонента `Card` и инициализируется с дополнительным свойством `_isAddedToBasket`, чтобы отслеживать статус продукта в корзине.

- `constructor(block: string, container: HTMLElement, action?: { onClick: (event: MouseEvent) => void })` - конструктор класса, принимает название блока, контейнер и опциональный экшн.

### Поля:

- `_isAddedToBasket: boolean` - указывает, добавлен ли продукт в корзину.

### Методы:

- `toggleButtonStatus(status: boolean): void` - переключает статус кнопки.
- геттер `isAddedToBasket(): boolean` - возвращает текущий статус добавления продукта в корзину.
- сеттер `isAddedToBasket(value: boolean)` - устанавливает статус добавления продукта в корзину.
- `render(data: Product): HTMLElement` - рендерит компонент на основе данных продукта.

Этот компонент улучшает пользовательский опыт, позволяя пользователям предварительно просматривать детали продукта и легко определять, добавлен ли продукт в корзину.

Реализация компонента `CardPreview` находится в файле [Card.ts](src/components/view/Card.ts).

## 4. Форма контактов

Компонент `ContactsForm` представляет форму для ввода контактной информации в интерфейсе приложения. Он расширяет класс `Form`, специализируясь на отображении и управлении полями ввода, связанными с контактами.

При создании экземпляра компонента `ContactsForm` он инициализируется полями ввода для ввода телефонного номера и адреса электронной почты. Он предоставляет методы для установки значений этих полей ввода.

- `constructor(container: HTMLElement, events: Events)` - конструктор класса, принимает контейнер события для использования моделью.

### Методы:
- сеттер `phone(value: string): void` - устанавливает значение телефонного номера.
- сеттер `email(value: string): void` - устанавливает значение адреса электронной почты.
- `onChange(field: keyof Contacts, value: string)` - заполнение полей формы.

Этот компонент играет важную роль в обеспечении взаимодействия пользователя, предоставляя структурированную форму для ввода контактной информации.

Реализация компонента `ContactsForm` находится в файле [ContactsForm.ts](src/components/view/ContactsForm.ts).

## 5. Форма доставки

Компонент `DeliveryForm` отвечает за отображение и управление формой, связанной с информацией о доставке в интерфейсе приложения. Он расширяет класс `Form`, специализируясь на обработке полей ввода, связанных с деталями доставки.

При создании экземпляра компонента `DeliveryForm` он инициализируется полями ввода для ввода адреса доставки и информации о способе оплаты. Он предоставляет методы для установки значений этих полей ввода и переключения выбора способа оплаты.

- `constructor(container: HTMLElement, events: Events)` - конструктор класса, принимает контейнер и события для использования моделью.

### Поля:
- `paymentButtons: HTMLButtonElement[]` - элементы выбора оплаты.

### Методы:
- сеттер `address(value: string): void` - устанавливает значение адреса доставки.
- `setPaymentMethod(): void` - переключает выбор способа оплаты
- `resetButtonStatus` - сбрасывает активный класс кнопок.
- `paymentSelection(method: Payments)` - устанавливает значение способа оплаты.
- `onChange(field: keyof Contacts, value: string)` - заполнение полей формы.

Этот компонент играет важную роль в обеспечении взаимодействия пользователя, предоставляя структурированную форму для ввода деталей доставки и выбора способа оплаты.

Реализация компонента `DeliveryForm` находится в файле [DeliveryForm.ts](src/components/view/DeliveryForm.ts).

## 6. Страница

Компонент `Page` отвечает за отображение и управление основным макетом страницы в интерфейсе приложения. Он расширяет класс `View` и обрабатывает различные элементы и функциональность, связанные с макетом страницы.

- `constructor(container: HTMLElement, events: Events)` - конструктор класса, принимает контейнер и события для использования моделью.

### Поля:

- `counterElement: HTMLElement` - элемент счетчика на странице.
- `catalogElement: HTMLElement` - элемент списка продуктов на странице.
- `wrapperElement: HTMLElement` - элемент обертки страницы.
- `buttonElement: HTMLButtonElement` - кнопка корзины на странице.


### Методы:

- сеттер `count(count: number): void` - обновляет счетчик элемента на странице.
- сеттер `products(products: Product[]): void` - отображает список продуктов на странице.
- сеттер `lock(isLocked: boolean): void` - переключает состояние блокировки обертки страницы.

Реализация компонента `Page` находится в файле [Page.ts](src/components/view/Page.ts).

## 7. Успешное оформление

Компонент `Success` отвечает за отображение сообщения об успешном выполнении действия или транзакции в интерфейсе приложения. Он расширяет класс `View` и предоставляет функциональность для закрытия сообщения об успешном выполнении.

- `constructor(container: HTMLElement, events: Events)` - конструктор класса, принимает контейнер и экшн.

### Поля:

- `closeButton: HTMLButtonElement` - кнопка закрытия сообщения.
- `descriptionElement: HTMLElement` - элемент описания успешного действия.

### Методы:

- сеттер `total(value: number)` - устанавливает общее значение и обновляет элемент описания.

Реализация компонента `Success` находится в файле [Success.ts](src/components/view/Success.ts).
