import './scss/styles.scss';
import { EventEmitter } from './components/Base/Events';
import { API_URL, CDN_URL } from './utils/constants';
import { ClientApi } from './components/ClientApi';
import { Product, OrderForm } from './types';
import { Modal } from './components/Base/Modal';
import { cloneTemplate, ensureElement } from './utils/utils';
import { PageUI } from './components/View/Page';
import { CardPreviewUI, CardUI } from './components/View/Card';
import { BasketUI } from './components/View/Basket';
import { SuccessUI } from './components/View/Success';
import { ContactsFormUI } from './components/View/ContactsForm';
import { DeliveryFormUI } from './components/View/DeliveryForm';
import { Basket } from './components/Model/Basket';
import { Catalog } from './components/Model/Catalog';
import { Order } from './components/Model/Order';

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const orderDeliveryTemplate = ensureElement<HTMLTemplateElement>('#order');
const orderContactFormTemplate =
	ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

const api = new ClientApi(CDN_URL, API_URL);
const eventEmitter = new EventEmitter();
const modal = new Modal(ensureElement('#modal-container'), eventEmitter);

const catalog = new Catalog(eventEmitter);
const basket = new Basket(eventEmitter);
const order = new Order(eventEmitter);
const page = new PageUI(document.body, eventEmitter);
const basketUI = new BasketUI(cloneTemplate(basketTemplate), eventEmitter);
const deliveryFormUI = new DeliveryFormUI(
	cloneTemplate(orderDeliveryTemplate),
	eventEmitter
);
const contactsFormUI = new ContactsFormUI(
	cloneTemplate(orderContactFormTemplate),
	eventEmitter
);
const successUI = new SuccessUI(cloneTemplate(successTemplate), {
	onClick: () => modal.close(),
});

const getProducts = () =>
	api
		.getProducts()
		.then((data) => catalog.setProducts(data))
		.catch(console.log);

getProducts();

eventEmitter.on('catalog:updated', (data: { products: Product[] }) => {
	page.products = data.products.map((product) => {
		return new CardUI('card', cloneTemplate(cardCatalogTemplate), {
			onClick: () => eventEmitter.emit('product:open', product),
		}).render(product);
	});
});

eventEmitter.on('product:open', (product: Product) => {
	const cardPreview = new CardPreviewUI(
		'card',
		cloneTemplate(cardPreviewTemplate),
		{
			onClick: () => {
				product.isAddedToBasket = !product.isAddedToBasket;

				if (product.isAddedToBasket) {
					eventEmitter.emit('product:add', product);
					return;
				}

				eventEmitter.emit('product:remove', product);
			},
		}
	);

	modal.render({ content: cardPreview.render(product) });
});

eventEmitter.on('product:add', (product: Product) => {
	basket.addProduct(product);
	modal.close();
});

eventEmitter.on('product:remove', (product: Product) => {
	basket.removeProduct(product);
});

eventEmitter.on('basket:update', (basket: Product[]) => {
	page.count = basket.length;
});

eventEmitter.on('basket:open', () => {
	const basketData = basket.getProducts();
	const cardBasketTemplates = basketData.map((product) => {
		return new CardUI('card', cloneTemplate(cardBasketTemplate), {
			onClick: () => {
				product.isAddedToBasket = !product.isAddedToBasket;
				eventEmitter.emit('product:remove', product);
				eventEmitter.emit('basket:open');
			},
		}).render(product);
	});

	modal.render({
		content: basketUI.render({
			products: cardBasketTemplates,
			totalAmount: basket.getTotalAmount(),
		}),
	});
});

eventEmitter.on('order:open', () => {
	order.productsIds = basket.getProductIds();
	order.total = basket.getTotalAmount();

	deliveryFormUI.resetButtonStatus();
	modal.render({
		content: deliveryFormUI.render({
			address: '',
			payment: '',
			valid: false,
			errors: [],
		}),
	});
});

eventEmitter.on(
	'order.delivery:update',
	(data: { field: keyof OrderForm; value: OrderForm[keyof OrderForm] }) => {
		order.setDeliveryField(data.field, data.value);
	}
);

eventEmitter.on('formErrors:delivery:update', (errors: Partial<OrderForm>) => {
	const { address, payment } = errors;
	deliveryFormUI.valid = !address && !payment;
	deliveryFormUI.errors = Object.values({ address, payment })
		.filter(Boolean)
		.join('; ');
});

eventEmitter.on('order.delivery:next', () => {
	modal.render({
		content: contactsFormUI.render({
			phone: '',
			email: '',
			valid: false,
			errors: [],
		}),
	});
});

eventEmitter.on('formErrors:contacts:update', (errors: Partial<OrderForm>) => {
	const { phone, email } = errors;
	contactsFormUI.valid = !phone && !email;
	contactsFormUI.errors = Object.values({ phone, email })
		.filter((i) => !!i)
		.join('; ');
});

eventEmitter.on(
	'order.contacts:update',
	(data: { field: keyof OrderForm; value: OrderForm[keyof OrderForm] }) => {
		order.setContactsField(data.field, data.value);
	}
);

eventEmitter.on('order.contacts:next', () => {
	api
		.createOrder({
			...order.order,
			total: order.total,
			items: order.productsIds,
		})
		.then(({ id, total }) => {
			basket.clear();
			modal.render({ content: successUI.render({ id, total }) });
			page.count = 0;
			getProducts();
		})
		.catch(console.log);
});

eventEmitter.on('modal:open', () => {
	page.lock = true;
});

eventEmitter.on('modal:close', () => {
	page.lock = false;
});
