/**
 * (set val to) | (get val from) the path of res
 * @param {object} res
 * @param {string} path
 * @param {any} val
 *
 * @example
 * {}, 'a.b.c',         'hi'           => {a: {b: {c:'hi'}}}
 * {}, 'a.b.0.c',       'hi'           => {a: {b: [{c: 'hi'}]}}
 *
 * {a: {b: 2}}, 'a.b'                  => 2
 * {a: {b: 2}}, 'a.b.c.d'              => undefined
 *
 */
function resolveVal(res, path, val) {
    var field, shouldSetVal = arguments.length === 3;

    if (typeof res !== 'object') throw TypeError('`res` should be object|array');

    path = path.split('.');
    while ((field = path.shift()) && path.length) {
        res = res && res[field] || (shouldSetVal && (res[field] = path[0] >= 0 ? [] : {}) || undefined);
    }

    return shouldSetVal ? res[field] = val : res && res[field];
}

export default resolveVal
