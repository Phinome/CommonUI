function _renderItem(el, dataIndex) {
    var item;
    var me = this;
    var len = this.data.length;

    var insertImg = function insertImg() {
        var simg = 'src="' + item.content + '"';

        if (item.width / item.height > me.ratio) {
            simg += ' height="100%"';
        }
        else {
            simg += ' width="100%"';
        }

        el.innerHTML = '<img ' + simg + ' />';
    };

    el.innerHTML = '';
    el.style.background = '';

    if (!this.isLooping && this.data[dataIndex] === null) {
        return;
    }
    else {
        dataIndex = (dataIndex + len) % len;
        item = this.data[dataIndex];
    }

    el.className = 'blend-slider-pic';

    if (item.loaded) {
        insertImg();
    }
    else {
        var currentImage = new Image();
        currentImage.src = item.src;
        currentImage.onload = function () {
            item.width = currentImage.width;
            item.height = currentImage.height;
            insertImg();
            item.loaded = true;
        };
    }
}

function _changStyles () {
    var sliderStyles = ['blend-slider-prev', 'blend-slider-active', 'blend-slider-next'];
    this.els.forEach(function (item, index) {
        removeClass(item, sliderStyles.join('|'));
        addClass(item, sliderStyles[index]);
    });
}

function removeClass (el, cls) {
    if (hasClass(el, cls)) {
        el.className = el.className.replace(new RegExp('(\\s|^)(' + cls + ')(\\s|$)'), '$3');
    }
}

function addClass (el, cls) {
    if (!hasClass(el, cls)) {
        el.className += ' ' + cls;
    }
}

function hasClass (el, cls) {
    return el.className.match(new RegExp('(\\s|^)(' + cls + ')(\\s|$)'));
}

function unblock() {
    return !this._locking;
}

function slideTo(dataIndex, opts) {
    if (this.isAutoPlay) {
        this.pause();
    }

    if (this._locking) {
        return;
    }

    this.unblock();

}