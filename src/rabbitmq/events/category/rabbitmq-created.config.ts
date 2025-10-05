export const RabbitEventsCreated = {
  CATEGORY_CREATED: {
    exchange: 'admin-dashboard-exchange',
    queue: 'fila-categorys',
    routingKey: 'category.criado',
  },
  ESTABLISHMENT_CREATED: {
    exchange: 'admin-dashboard-exchange',
    queue: 'fila-establishments',
    routingKey: 'establishment.criado',
  }
};
