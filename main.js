var _a;
var osPrefix = 'os_';
var support = (_a = {},
    _a[osPrefix + 'Windows'] = isSupported('Windows'),
    _a[osPrefix + 'Android'] = isSupported('Android'),
    _a[osPrefix + 'iOS'] = isSupported('iOS'),
    _a);
function isSupported(os) {
    return Math.random() > 0.7;
}
