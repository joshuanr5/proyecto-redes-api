/* eslint-disable no-console */
const _ = require('lodash');

function handleError(error) {
  console.error(error);

  return { error: error.message };
}

function validateBody(body, attributes, type = 'get') {
  // Verifica que el body tenga los atributos correctos, en caso que falte retorna
  // un arreglo de string indicandolos
  const attributesNotFound = [];
  let messageDetails = [];

  if (type === 'update') {
    if (_.isEmpty(body)) {
      attributesNotFound.push('');
      messageDetails.push('No se encontro ningun atributo');
      messageDetails.push(`Atributos permitidos [${attributes.join(', ')}]`);
    } else {
      _.forEach(body, (value, attribute) => {
        if (!_.includes(attributes, attribute)) {
          attributesNotFound.push(attribute);
        }
      });
      messageDetails = _.map(attributesNotFound, attribute => `Atributo ${attribute} no permitido`);
      messageDetails.push(`Atributos permitidos [${attributes.join(', ')}]`);
    }
  } else {
    _.forEach(attributes, (attribute) => {
      if (body[attribute] === undefined) {
        attributesNotFound.push(attribute);
      }
    });

    messageDetails = _.map(
      attributesNotFound,
      attribute => `Atributo '${attribute}' no encontrado`,
    );
    messageDetails.push(`Atributos necesarios [${attributes.join(', ')}]`);
  }

  return [attributesNotFound, messageDetails];
}

module.exports = { handleError, validateBody };
