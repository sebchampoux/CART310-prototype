
/**
 * Génère une chaîne "unique" pour les attributs ID des champs
 * @param {String} inputName 
 */
export function getUniqueInputId(inputName) {
	return inputName + '-' + Math.random().toString(36).substr(2, 9);
}

export function uniqueId() {
	return Math.random().toString(36).substr(2, 9);
}