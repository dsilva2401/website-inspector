module.exports = function ($) {
	return function (err) {
		var m = {};
		var fError = {};
		fError.ewError = true;
		fError.error = err || {};

		// Missing parameters
		m.missingParameters = function (parameters) {
			fError.details = {
				en: 'Missing parameters: ' + parameters.join(', '),
				es: 'Parametros faltantes: ' + parameters.join(', ')
			}
			return fError;
		}

		// Email already registered
		m.emailAlreadyRegistered = function () {
			fError.details = {
				en: 'Email already registered',
				es: 'Email registrado anteriormente'
			}
			return fError;
		}

		// Invalid credentials
		m.invalidCredentials = function () {
			fError.details = {
				en: 'Invalid credentials',
				es: 'Credenciales inválidas'
			}
			return fError;
		}

		// Invalid session
		m.invalidSession = function () {
			fError.details = {
				en: 'Invalid session',
				es: 'Sesión  inválida'
			}
			return fError;
		}

		// Invalid item group
		m.invalidItemGroup = function () {
			fError.details = {
				en: 'Invalid item group',
				es: 'Grupo de item inválido'
			}
			return fError;
		}


		return m;
	}
}