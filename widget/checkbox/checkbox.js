/* globals NAMESPACE */
/* eslint-disable fecs-camelcase */
/**
 * @file checkbox 组件
 * @author dingquan
 */

'use strict';

$.widget('cmu.checkbox', {
    /**
     * 组件的默认选项，可以由多重覆盖关系
     */
    options: {
        itemSelector: '.' + NAMESPACE + 'checkbox',
        itemLabel: NAMESPACE + 'checkbox-label',
        type: 'group',
        disabled: false,
        itemSelected: NAMESPACE + 'checkbox-checked',
        itemSelectAll: NAMESPACE + 'checkbox-all'
    },
    _create: function () {

        /**
         * this.element 组件对应的单个 Zepto/jQuery 对象
         */
        var $this = this.element;

        /**
         * 经过继承的 options
         */
        var options = this.options;


        this.$group = $this.find(options.itemSelector);
        this.$label = $this.find('.' + options.itemLabel);
        this.$container = $this;

    },
    /**
     * _init 初始化的时候调用
     */
    _init: function () {
        FastClick.attach(this.element[0]);
        this._initEvent();
        this._initStatus();
    },
    _checkGroup: function (curElem) {

        var me = this;
        var EventSelected = me.$container.find('.' + me.options.itemSelected);
        var EventSelector = me.$container.find(me.options.itemSelector);

        var eventData = {
            checked: 0
        };

        if (me.options.type === 'radio') {
            EventSelected.removeClass(me.options.itemSelected);
            curElem.addClass(me.options.itemSelected);
            eventData.checked++;
        }
        else {

            var len = 0;
            // 判断有无已勾选
            EventSelector.each(function () {
                var $this = $(this);
                if (!$this.hasClass(me.options.itemSelectAll)) {
                    len++;
                    if ($this.hasClass(me.options.itemSelected)) {
                        eventData.checked++;
                    }
                }
            });

            if (curElem.hasClass(me.options.itemSelectAll)) {
                if (eventData.checked < len) {
                    EventSelector.each(function () {
                        $(this).addClass(me.options.itemSelected);
                    });
                    eventData.checked = len;
                }
                else {
                    EventSelected.removeClass(me.options.itemSelected);
                    eventData.checked = 0;
                }
            }
            else {

                if (curElem.hasClass(me.options.itemSelected)) {
                    curElem.removeClass(me.options.itemSelected);
                    eventData.checked--;
                }
                else {
                    curElem.addClass(me.options.itemSelected);
                    eventData.checked++;
                }

            }
            if (eventData.checked < len) {
                me.$container.find('.' + me.options.itemSelectAll).removeClass(me.options.itemSelected);
            }
            else {
                me.$container.find('.' + me.options.itemSelectAll).addClass(me.options.itemSelected);
            }
        }
        me._trigger('checked', null, eventData);
    },
    _initEvent: function () {

        var me = this;

        this.$group.on('click', function () {
            if ($(this).hasClass('cmu-checkbox-disabled')) {
                return false;
            }
            if (me._trigger('beforechecked', null, {})) {
                var curElem = $(this);
                me._checkGroup(curElem);
            }
        });
        this.$label.on('click', function () {
            if ($(me.$group.eq([me.$label.index($(this))])).hasClass('cmu-checkbox-disabled')) {
                return false;
            }
            if (me._trigger('beforechecked', null, {})) {
                var curElem = me.$group.eq([me.$label.index($(this))]);
                me._checkGroup(curElem);
            }
        });
    },
    _initStatus: function () {
        var me = this;
        if (me.options.disabled) {
            me._trigger('disabled', null, me);
            me.$group.addClass('cmu-checkbox-disabled');

        }
    },
    /**
     * 设置 checkbox 不可用
     *
     */
    setDisabled: function () {
        var me = this;

        if ('radio' === me.options.type) {
            me.$group.addClass('cmu-checkbox-disabled');
        }
    },
    /**
     *
     * @return {*}
     * 获取value值函数
     */
    getValues: function () {
        var $this;
        var valArr = [];
        var val;
        var elems = this.$group;
        for (var i = 0; i < elems.length; i++) {
            $this = $(elems[i]);
            if ($this.hasClass(NAMESPACE + 'checkbox-checked') || $this.hasClass(NAMESPACE + 'button-checkbox-checked') && !$this.hasClass(NAMESPACE + 'checkbox-all')) {
                val = this.options.values[i];
                valArr.push(this.options.values[i]);
            }
        }
        if (this.options.type === 'radio') {
            return val;
        }
        return valArr;
    }
});
