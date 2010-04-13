// vim: set et sw=4 ts=4 sts=4 fdm=marker ff=unix fenc=gbk nobomb:
/**
 * CoversFlow
 * @author mingcheng<i.feelinglucky#gmail.com> - http://www.gracecode.com/
 * @update log:
 *    [2010-04-08] yubo: ���� & �Ż����ִ���
 */

KISSY.add('coversflow', function(S) {
    var Y = YAHOO.util, YDOM = Y.Dom, DOM = S.DOM, Event = S.Event,
        VISIBILITY = 'visibility', CLICK = 'click',
        MAGIC_NUMBER = 90,
        MAGIC_DIVISOR = 1.25,
        EVENT_BEFORE_SWITCH = 'beforeSwitch',
        EVENT_ON_CURRENT = 'onCurrent',
        EVENT_TWEEN = 'tween',
        EVENT_FINISHED = 'finished',

        /**
         * Ĭ������
         */
        defaultConfig = {
//            flowLength: 2, // �Ǽ���״̬
//            aspectRatio: 1.964, // Aspect ratio of the ImageFlow container (width divided by height)
            //step: 150, // ������ͨ�����ø���
            width: 330, // ������Ŀ�
            height: 200, // ������ĸ�
//            offset: 0, // ���
            animSpeed: 50,  // ������������룩
            autoSwitchToMiddle: true, // �Զ��л����м�
            hasTriggers: false, // ������� panels
            circular: true
        };

    function CoversFlow(container, config) {
        var self = this;

        if (!(self instanceof CoversFlow)) {
            return new CoversFlow(container, config);
        }

        config = S.merge(defaultConfig, config || {});
        CoversFlow.superclass.constructor.call(self, container, config);
        self._initFlow();
    }
    S.extend(CoversFlow, S.Switchable);

    S.augment(CoversFlow, {
        /**
         * ���㵱ǰ�����Ӧ������������λ��
         *
         * @return Array
         */
        _adjustOffset: function(index) {
            var self = this, panels = self.panels, len = self.length,
                size = Math.floor(len / 2), result = [];


            // ������ȫ����ʼ��Ϊ 0 
            for (var i = 0; i < len; i++) {
                result[i] = 0;
            }

            // �����ұ�
            for (var i = 1, j = 0; i <= size; i++) {
                if (typeof result[index + i] != 'undefined') {
                    result[index + i] = i;
                } else {
                    result[j] = i;
                    j++;
                }
            }

            // �������
            for (var i = 1, j = len - 1; i <= size; i++) {
                if (typeof result[index - i] != 'undefined') {
                    result[index - i] = i * -1;
                } else {
                    result[j] = i * -1;
                    j--;
                }
            }

            return result;
        },

        _initFlow: function() {
            var self = this, config = self.config;
            
            self.activeIndex = -1;              // ��ǰ����λ��
            self.busy        = false;           // ����״̬
            self.curFrame    = 0;               // ��ǰ����֡
            self.targetFrame = 0;               // Ŀ�����֡
            self.zIndex      = self.length;     // ��� zIndex ֵ
            self.region = YDOM.getRegion(self.container); // ����������ʹ�С

            self.middle = {x:self.region.width/2, y:self.region.height/2}; // �е�
/*
            self.maxFocus = config.flowLength * config.step;
            self.maxHeight = self.region.height + Math.round(self.region.height / config.aspectRatio); // ���߶�
            self.middleLine = self.region.width / 2; // �м���
*/

            // �¼�ע��
            self.on(EVENT_BEFORE_SWITCH, function(ev) {
                if (self.busy) { return false; }

                var index = ev.toIndex;
                //self.perIndex = index; // Ԥ�������Ŀ��
                self.targetFrame = self.config.width;
                self.offsets = self._adjustOffset(index);
            });

            // �Զ��л����м�
            if (config.autoSwitchToMiddle && false) {
                self.switchTo(Math.floor(self.length / 2));
            } else {
                self.switchTo(0); // ��������һ��λ��
            }
        },

        _switchView: function() {
            var self = this, cfg = self.config;
            //if (self.targetFrame < self.curFrame - 1 || self.targetFrame > self.curFrame + 1) {
            if (self.targetFrame >= 0) {
                // fire onSwitch
                self._frame(self.targetFrame);
                self._timer = S.later(self._switchView, cfg.animSpeed, false, self);
                self.busy = true;
            } else {
                self.fire(EVENT_FINISHED);
                self.busy = false; // �������
            }
        },

        /**
         * ����ÿ֡����
         */
        _frame: function(frame) {
            var self = this, cfg = self.config, panels = self.panels,
                region = self.region, middle = self.middle, offsets = self.offsets,
                middleX = middle.x, middleY = middle.y;

            //console.info(frame); return;
            self.targetFrame -= 20;

            for (var index = 0, length = self.length; index < length; index++) {
                var offset = offsets[index], panel = panels[index],
                    x = Math.pow(-((offset * 50 - frame)/20), 2); // ���κ�������

                var height = cfg.height - x * 2;
                var width = cfg.width / cfg.height * height;
                var left = middleX - (width / 2) + offset * 50;
                var top = middleY - (height/2);

                DOM.css(panel, 'height', height + 'px');
                DOM.css(panel, 'width',  width + 'px');
                DOM.css(panel, 'top',    top  + 'px');
                DOM.css(panel, 'left',   left + 'px');
                DOM.css(panel, 'zIndex', length - Math.abs(offset));

                // �󶨵���¼�
                self._bindPanel(panel, index);
            }
            return;


            self.curFrame = frame; // ��ǵ�ǰ֡

            for (var index = 0, len = panels.length; index < len; index++) {
                curPanel = self.panels[index];
                curImgPos = index * -cfg.step;
                if ((curImgPos + self.maxFocus) < self.targetFrame || (curImgPos - self.maxFocus) > self.targetFrame) {
                    // ���ض���ķ���
                    DOM.css(curPanel, VISIBILITY, 'hidden');
                } else {
                    // ������������
                    var x = (Math.sqrt(10000 + frame * frame) + 100), xs = frame / x * middleLine + middleLine;
                    var height = (cfg.width / cfg.height * MAGIC_NUMBER) / x * middleLine, width = 0;

                    if (height > self.maxHeight) {
                        height = self.maxHeight;
                    }
                    width = cfg.width / cfg.height * height;

                    // ���㲢���õ�ǰλ��
                    DOM.css(curPanel, 'left', xs - (MAGIC_NUMBER / MAGIC_DIVISOR) / x * middleLine + 'px');
                    if (height && width) {
                        DOM.css(curPanel, 'height', height + 'px');
                        DOM.css(curPanel, 'width', width + 'px');
                        DOM.css(curPanel, 'top', region.height / 2 - height / 2 + 'px');
                    }
                    DOM.css(curPanel, 'zIndex', self.zIndex * 100 - Math.ceil(x));
                    DOM.css(curPanel, VISIBILITY, 'visible');

                    // �󶨵���¼�
                    self._bindPanel(curPanel, index);
                }

                self.fire(EVENT_TWEEN, { panel: curPanel, index: index });
                frame += cfg.step;
            }
        },

        /**
         * ���¼�
         */
        _bindPanel: function(curPanel, index) {
            var self = this;

            Event.remove(curPanel);

            if (self.perIndex === index) {
                Event.add(curPanel, CLICK, function() {
                    return self.fire(EVENT_ON_CURRENT, { panel: curPanel, index: index });
                });
            } else {
                Event.add(curPanel, CLICK, function(ev) {
                    ev.preventDefault();
                    self.switchTo(index);
                });
            }
        }
    });

    S.CoversFlow = CoversFlow;

});

/**
 * TODO:
 *   - ��һ���Ż��㷨�Ͳ��� api
 */