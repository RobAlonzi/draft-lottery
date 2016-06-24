module.exports = exports = {};

let closeButton = null,
	modal = null,
    overlay = null,
    options = null;


let defaults = {
  className: 'fade-and-drop',
  closeButton: true,
  content: "",
  maxWidth: 600,
  minWidth: 280,
  overlay: true
}


exports.create = () => {
	if (arguments[0] && typeof arguments[0] === "object") {
      	options = extendDefaults(defaults, arguments[0]);
    }
}


function extendDefaults(source, properties) {
    let property;
    for (property in properties) {
      if (properties.hasOwnProperty(property)) {
        source[property] = properties[property];
      }
    }
    return source;
  }