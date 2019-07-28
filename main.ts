const osPrefix = 'os_';

var support  = {
    [osPrefix + 'Windows'] : isSupported('Windows'),
    [osPrefix + 'Android'] : isSupported('Android'),
    [osPrefix + 'iOS'] : isSupported('iOS')
}

function isSupported(os){

    return Math.random() > 0.7;
}